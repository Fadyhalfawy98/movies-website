import http from "./httpServices";
import config from "../config/config.json";

export function getMovies() {
    return http.get(config.moviePath);

};

export function deleteMovie(movieId) {
    return http.delete(config.moviePath + "/" + movieId);
};