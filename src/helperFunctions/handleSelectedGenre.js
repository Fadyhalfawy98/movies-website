import {genres} from "../services/fakeGenreService";

export let handleFilteredMovie = (allMovies, selectedGenre, searchQuery) => {
    let movies;
    if(selectedGenre === genres[0] || searchQuery === "")
        movies = allMovies;
    else if(selectedGenre === genres[4])
        movies = allMovies.filter(movie => true === movie.liked);
    else if (searchQuery){
        movies = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    else
        movies = allMovies.filter(movie => selectedGenre._id === movie.genre._id);

    return movies;
};