import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

export const DisplayTable = ({ filteredMovies, columns, onSort, sortColumn }) => {

    return(
        <table className="table table-dark">
            <TableHeader
                columns={columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />

            <TableBody
                filteredMovies={filteredMovies}
                columns={columns}
            />
        </table>
    );
}