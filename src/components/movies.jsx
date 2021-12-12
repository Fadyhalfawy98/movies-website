import {Component} from "react";
import {genres, getGenres} from "../services/fakeGenreService";
import {getMovies} from "../services/fakeMovieService";
import {Like} from "./like";
import {ListGroup} from "./listGroup";
import Pagination from "./pagination";
import {getPageData} from "../functionsJS/getPageData";

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: genres[0],
        pageSize: 3,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({movies: getMovies(), genres: getGenres()})
    }

    render() {
        const {movies: allMovies, genres, selectedGenre, pageSize, currentPage} = this.state;

        const {length, data} = getPageData(allMovies, selectedGenre, pageSize, currentPage);

        return(

            <div>
                <div className={"row m-2"}>

                    <div className={"col-lg-3"}>

                        <ListGroup
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectedGenre={this.handleSelectedGenre}
                        />

                    </div>

                    <div className="col">

                    <h1>There are {length} movies in the {selectedGenre.name}</h1>

                    <table className="table table-dark">

                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((movie, index) => (
                            <tr key={movie._id}>
                                <td>{index + 1}</td>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>

                                <td>{<Like
                                    onLike={this.handleLike}
                                    movie={movie}
                                />}</td>

                                <td><button
                                    onClick={() => this.handleDelete(movie)}
                                    className={"btn btn-outline-danger btn-sm"}>
                                    Delete
                                </button></td>
                            </tr>
                        ))}

                        </tbody>

                    </table>
                 </div>

                </div>

                <Pagination
                    pageSize={pageSize}
                    length={length}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />

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

}
