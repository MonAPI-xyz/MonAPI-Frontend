import axios from "axios";
import { route } from "preact-router";
import { deleteUserToken, getUserToken } from "../api/auth";

// Axios Intercept 401 / 403 Unauthorized
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if ((401 === error.response.status || 403 == error.response.status) && getUserToken() !== null) {
        deleteUserToken();
        route('/login');
    }
    return Promise.reject(error);
});
