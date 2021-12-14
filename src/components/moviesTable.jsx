import {Like} from "./like";
import {Component} from "react";
import {DisplayTable} from "./displayTable";

export default class MoviesTable extends Component {
    render() {
        const { filteredMovies, onDelete, handleLike, onSort, sortColumn } = this.props;

        const columns = [
            { path: "title", label: "Title"},
            { path: "genre.name", label: "Genre"},
            { path: "numberInStock", label: "Stock"},
            { path: "dailyRentalRate", label: "Rate"},

            { key: "liked",
                content: movie => (
                    <Like
                        onLike={ handleLike }
                        movie={ movie }
                    />
                )},

            { key: "delete",
                content: movie => (
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(movie)}
                    >
                        Delete
                    </button>
                )}
        ]

        return(
            <DisplayTable
                filteredMovies={filteredMovies}
                columns={columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    };
}