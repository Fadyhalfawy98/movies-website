export const TableHeader = props => {

    const { columns } = props;

    return(
        <thead>
        <tr>
            <th>#</th>
            { columns.map((column) =>
                <th key={column.path}>
                    {column.label}
                </th>
            )}
        </tr>
        </thead>
    );}