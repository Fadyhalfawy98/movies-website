import {genres} from "../services/fakeGenreService";

export let handleFilteredMovie = (allMovies, selectedGenre) => {
    let movies;
    if(selectedGenre === genres[0])
        movies = allMovies;
    else if(selectedGenre === genres[4])
        movies = allMovies.filter(movie => true === movie.liked);
    else
        movies = allMovies.filter(movie => selectedGenre._id === movie.genre._id);

    return movies;
};