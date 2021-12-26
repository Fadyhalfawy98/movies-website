export let handleFilteredMovie = (allMovies, selectedGenre, searchQuery) => {
    let movies;
    const selectedGenreCondition = selectedGenre && selectedGenre._id;
    const filter = allMovies.filter(m => m.genre._id === selectedGenre._id);

    movies =  selectedGenreCondition ? filter : allMovies;

    if (searchQuery) movies = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

    return movies;
};