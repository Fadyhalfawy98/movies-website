import http from "./httpServices";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.jtw(getJwt());

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

function getJwt() {
    return localStorage.getItem(tokenKey);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

const auth = {
    login,
    loginWithJwt,
    getCurrentUser,
    logout
}

export default auth;