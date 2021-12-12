import React from "react";

export const ListGroup = ({genres, selectedGenre, onSelectedGenre}) => {
    return(
        <ul className="list-group">
            {genres.map(genre =>
                <li
                    href="#"
                    style={ { cursor: "pointer"}  }
                    key={genre._id}
                    className={selectedGenre === genre ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                    onClick={() => onSelectedGenre(genre)}
                >
                { genre.name }
            </li>)}
        </ul>
    );};