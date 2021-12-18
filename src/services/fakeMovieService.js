import {genres} from "./fakeGenreService";

const movies = [
    {
        _id: "1",
        title: "Terminator",
        genre: { _id: "1", name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        liked: false
    },
    {
        _id: "2",
        title: "Die Hard",
        genre: { _id: "1", name: "Action" },
        numberInStock: 5,
        dailyRentalRate: 2.5,
        liked: false
    },
    {
        _id: "3",
        title: "Get Out",
        genre: { _id: "3", name: "Thriller" },
        numberInStock: 8,
        dailyRentalRate: 3.5,
        liked: false
    },
    {
        _id: "4",
        title: "Trip to Italy",
        genre: { _id: "2", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        liked: false
    },
    {
        _id: "5",
        title: "Airplane",
        genre: { _id: "2", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        liked: false
    },
    {
        _id: "6",
        title: "Wedding Crashers",
        genre: { _id: "2", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        liked: false
    },
    {
        _id: "7",
        title: "Gone Girl",
        genre: { _id: "3", name: "Thriller" },
        numberInStock: 7,
        dailyRentalRate: 4.5,
        liked: false
    },
    {
        _id: "8",
        title: "The Sixth Sense",
        genre: { _id: "3", name: "Thriller" },
        numberInStock: 4,
        dailyRentalRate: 3.5,
        liked: false
    },
    {
        _id: "9",
        title: "The Avengers",
        genre: { _id: "1", name: "Action" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        liked: false
    }
];

export function getMovies() {
    return movies;
}

export function getMovie(id) {
    return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
    let movieInDb = movies.find(m => m._id === movie._id) || {};
    movieInDb.title = movie.title;
    movieInDb.genre = genres.find(g => g._id === movie.genre._id);
    movieInDb.numberInStock = movie.numberInStock;
    movieInDb.dailyRentalRate = movie.dailyRentalRate;

    if (!movieInDb._id) {
        movieInDb._id = Date.now().toString();
        movies.push(movieInDb);
    }

    return movieInDb;
}
