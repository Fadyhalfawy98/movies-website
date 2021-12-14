import _ from "lodash";

export const RenderTable = (movie, column) => {
    if(column.content) return column.content(movie);

    return _.get(movie, column.path);
};