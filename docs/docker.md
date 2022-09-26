## How to run this repository as container (Docker)
1. Build docker image by running `docker build -t <yourusername>/monapife --build-arg BACKEND_URL=<fill with your backend url> .`
2. To start docker image, run `docker run -d -p 80:80 --name monapife <yourusername>/monapife`

Notes:
* You are required to build your own docker image due to environment variables that need injected on build process
