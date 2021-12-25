import http from "./httpServices";
import config from "../config/config.json";

export function signUp(user) {
    return http.post(config.userPath, {
        email: user.email,
        password: user.password,
        name: user.name
    });
};