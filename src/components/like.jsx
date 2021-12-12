import React from "react";

export const Like = ({onLike, movie}) => {
    let classes = "fa fa-heart";

    if (!movie.liked)
        classes += "-o"

    return(
        <React.Fragment>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <i
                className={classes}
                style={ { cursor: "pointer"} }
                onClick={ () => onLike(movie) }
            />
        </React.Fragment>
    );};