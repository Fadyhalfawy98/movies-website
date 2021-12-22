export const CreateKey = (movie, column) => {
    return movie._id + (column.path || column.key);
};