import _ from "lodash";

export let paginate = (movies, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return _(movies)
        .slice(startIndex)
        .take(pageSize)
        .value();
};