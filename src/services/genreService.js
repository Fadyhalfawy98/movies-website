import http from "./httpServices";
import config from "../config/config.json";

export function getGenres() {
    return http.get(config.genrePath);
}