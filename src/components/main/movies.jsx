import {Component} from "react";
import React from "react";
import {toast} from "react-toastify";
import {getGenres} from "../../services/genreService";
import {deleteMovie, getMovies} from "../../services/movieService";
import {ListGroup} from "../common/listGroup";
import Pagination from "../common/pagination";
import {getPageData} from "../../helperFunctions/getPageData";
import MoviesTable from "../table/moviesTable";
import {Link} from "react-router-dom";
import SearchBoxForm from "../forms/searchBoxForm";

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        searchQuery: "",
        selectedGenre: "",
        pageSize: 3,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{_id: "", name: "All Movies"}, ...data];

        const { data: movies } = await getMovies();

        this.setState({ movies, genres });
    }

    render() {
        const {movies: allMovies, genres, selectedGenre, pageSize, currentPage, sortColumn, searchQuery} = this.state;

        const {length, filteredMovies} = getPageData(allMovies, selectedGenre, pageSize, currentPage, sortColumn, searchQuery);

        const { user } = this.props;

        return(
            <div>

                { user &&
                    <h1>There are {length} movies in the {selectedGenre.name} database</h1>
                }

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

                { user &&
                    <React.Fragment>

                    <h1> To add a new movie click the button</h1>

                    <Link
                    to={"/movies/new"}
                    className={"btn btn-outline-info"}
                    style={{marginBottom: 20}}>
                    New Movie
                    </Link>

                    </React.Fragment>
                }

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

    handleDelete = async movie => {
        const { movies } = this.state;
        const originalMovies = movies;
        const  moviesFilter = originalMovies.filter(m => m._id !== movie._id);

        this.setState({ movies: moviesFilter });

        try { await deleteMovie(movie._id); }
        catch (e) {
            if (e.response && e.response.status === 404)
                toast.error('This post has already been deleted!');

            this.setState({ movies: originalMovies });
        }
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
