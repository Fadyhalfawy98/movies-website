import {Component} from "react";
import {RenderTable} from "../functionsJS/renderTable";
import {CreateKey} from "../functionsJS/createKey";

export default class TableBody extends Component {

    render() {
        const { filteredMovies, columns } = this.props;

        return(
            <tbody>
            {filteredMovies.map((movie, index) => (
                <tr key={movie._id}>
                    <td>{index + 1}</td>
                    {columns.map(column =>
                        <td key={CreateKey(movie, column)}>
                            { RenderTable(movie, column) }
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        );
    };
}
