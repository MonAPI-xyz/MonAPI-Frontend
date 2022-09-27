# Pull official base image
FROM node:14.20-alpine3.15

# Store arguments for build environment
ARG BACKEND_URL

# Install nginx
RUN apk add --update nginx gcc musl-dev
RUN rm /etc/nginx/http.d/default.conf
COPY nginx/default.conf /etc/nginx/http.d/monapife.conf

# Create directory for the app
RUN mkdir -p /home/monapife
WORKDIR /home/monapife

# Copy and install depedency
COPY package.json /home/monapife
RUN npm install

# Copy file and build production
COPY . /home/monapife
RUN PREACT_APP_BACKEND_URL=${BACKEND_URL} \ 
    npm run build 

# Copy build file to www folder
RUN mkdir -p /var/www/monapife
RUN cp -r build/. /var/www/monapife

# Remove repository files
RUN rm -rf /home/monapife

# Expose nginx port and run service
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]