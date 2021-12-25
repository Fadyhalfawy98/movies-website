import http from "./httpServices";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

async function login(email, password) {
    const { data: jwt } = await http.post(config.authPath, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch (e) {
        return null;
    }
}

function logout() {
    localStorage.removeItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    getCurrentUser,
    logout
}