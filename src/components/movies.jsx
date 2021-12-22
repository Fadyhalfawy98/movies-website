import {Component} from "react";
import React from "react";
import {genres, getGenres} from "../services/fakeGenreService";
import {getMovies} from "../services/fakeMovieService";
import {ListGroup} from "./common/listGroup";
import Pagination from "./common/pagination";
import {getPageData} from "../helperFunctions/getPageData";
import MoviesTable from "./table/moviesTable";
import {Link} from "react-router-dom";
import SearchBoxForm from "./forms/searchBoxForm";

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        searchQuery: "",
        selectedGenre: genres[0],
        pageSize: 3,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    UNSAFE_componentWillMount() {
        this.setState({movies: getMovies(), genres: getGenres()})
    }

    render() {
        const {movies: allMovies, genres, selectedGenre, pageSize, currentPage, sortColumn, searchQuery} = this.state;

        const {length, filteredMovies} = getPageData(allMovies, selectedGenre, pageSize, currentPage, sortColumn, searchQuery);

        return(
            <div>

                <h1>There are {length} movies in the {selectedGenre.name}</h1>

                <div className="row">

                    <div className="col-3">

                        <ListGroup
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectedGenre={this.handleSelectedGenre}
                        />

                    </div>

                    <div className="col">
                        <SearchBoxForm
                            value={searchQuery}
                            onChange={this.handleSearch}
                        />
                        <MoviesTable
                            filteredMovies={filteredMovies}
                            onDelete={this.handleDelete}
                            handleLike={this.handleLike}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                        />

                        <Pagination
                            pageSize={pageSize}
                            length={length}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>

                <h1> To add a new movie click the button</h1>

                <Link
                    to={"/movies/new"}
                    className={"btn btn-outline-info"}
                    style={ { marginBottom: 20 } }>
                    New Movie
                </Link>

            </div>
        );
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    handleSelectedGenre = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1});
    };

    handlePageChange = page => {
        this.setState({ currentPage: page});
    };

    handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
    }

}
