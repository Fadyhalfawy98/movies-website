import {Component} from "react";
import {genres, getGenres} from "../services/fakeGenreService";
import {getMovies} from "../services/fakeMovieService";
import {ListGroup} from "./listGroup";
import Pagination from "./pagination";
import {getPageData} from "../functionsJS/getPageData";
import MoviesTable from "./moviesTable";

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: genres[0],
        pageSize: 3,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    UNSAFE_componentWillMount() {
        this.setState({movies: getMovies(), genres: getGenres()})
    }

    render() {
        const {movies: allMovies, genres, selectedGenre, pageSize, currentPage, sortColumn} = this.state;

        const {length, filteredMovies} = getPageData(allMovies, selectedGenre, pageSize, currentPage, sortColumn);

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
        this.setState({ selectedGenre: genre, currentPage: 1});
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

}
