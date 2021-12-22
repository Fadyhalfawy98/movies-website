import {handleFilteredMovie} from "./handleSelectedGenre";
import _ from "lodash";
import {paginate} from "./paginate";

export const getPageData = (allMovies, selectedGenre, pageSize, currentPage, sortColumn, searchQuery) => {
    let filtered = allMovies;

    const moviesFiltered = handleFilteredMovie(filtered, selectedGenre, searchQuery);

    const moviesSorted = _.orderBy(moviesFiltered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(moviesSorted, pageSize, currentPage);

    return ({ length: moviesFiltered.length, filteredMovies: movies });
}
