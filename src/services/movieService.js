import http from "./httpServices";
import config from "../config/config.json";

export function getMovies() {
    return http.get(config.moviePath);

};
export function getMovie(moveId) {
    return http.get(config.moviePath + "/" + moveId);
};

export function saveMovie(movie) {
    if (movie._id){
        const body = { ...movie };
        delete body._id;
        return http.put(config.moviePath + "/" + movie._id, body);
    }

    return http.post(config.moviePath, movie);
};

export function deleteMovie(movieId) {
    return http.delete(config.moviePath + "/" + movieId);
};