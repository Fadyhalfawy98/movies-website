import {Like} from "../common/like";
import {Component} from "react";
import {DisplayTable} from "./displayTable";
import {Link} from "react-router-dom";
import auth from "../../services/authService";

export default class MoviesTable extends Component {

    constructor(props) {
        super(props);
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    }

    render() {
        const { filteredMovies, onSort, sortColumn } = this.props;

        return(
            <DisplayTable
                filteredMovies={filteredMovies}
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    };

    columns = [
        { path: "title", label: "Title",
            content: movie => (
                <Link to={`/movies/${movie._id}/${movie.title}`}>
                    {movie.title}
                </Link>
            )},
        { path: "genre.name", label: "Genre"},
        { path: "numberInStock", label: "Stock"},
        { path: "dailyRentalRate", label: "Rate"},
        { key: "liked",
            content: movie => (
                <Like
                    onLike={ this.props.handleLike }
                    movie={ movie }
                />
            )
        }
    ];

    deleteColumn = {
        key: "delete",
        content: movie => (
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => this.props.onDelete(movie)}
            >
                Delete
            </button>
        )
    };

}