import {Like} from "./like";
import {TableHeader} from "./tableHeader";

export const MoviesTable = props => {
    const { filteredMovies, onDelete, handleLike } = props;

    const columns = [
        { path: "title", label: "Title"},
        { path: "genre", label: "Genre"},
        { path: "numberInStock", label: "Stock"},
        { path: "dailyRentalRate", label: "Rate"}
        ]

    return(
        <table className="table table-dark">

            <TableHeader
                columns={columns}
            />

            <tbody>
            {filteredMovies.map((movie, index) => (
                <tr key={movie._id}>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>

                    <td>{<Like
                        onLike={ handleLike }
                        movie={ movie }
                    />}</td>

                    <td><button
                        onClick={() => onDelete(movie)}
                        className={"btn btn-outline-danger btn-sm"}>
                        Delete
                    </button></td>
                </tr>
            ))}

            </tbody>

        </table>
    );
}