import {handleFilteredMovie} from "./handleSelectedGenre";
import _ from "lodash";
import {paginate} from "./paginate";

export const getPageData = (allMovies, selectedGenre, pageSize, currentPage) => {
    const moviesFiltered = handleFilteredMovie(allMovies, selectedGenre);

    // const moviesSorted = _.orderBy(moviesFiltered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(moviesFiltered, pageSize, currentPage);

    return ({ length: moviesFiltered.length, data: movies });
}
