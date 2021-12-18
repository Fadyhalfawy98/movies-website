import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";
import {getGenres} from "../../services/fakeGenreService";
import {getMovie, saveMovie} from "../../services/fakeMovieService";

class MovieForm extends MainForm {
    state = {
        movies: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""},
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),

        title: Joi
            .string()
            .required()
            .label('Title'),

        genreId: Joi
            .string()
            .required()
            .label('Genre'),

        numberInStock: Joi
            .string()
            .required()
            .min(0)
            .max(100)
            .label('Number-In-Stock'),

        dailyRentalRate: Joi
            .string()
            .required()
            .min(0)
            .max(10)
            .label('Rate')
    };

    componentDidMount() {
        const { history, match } = this.props;

        const genres = getGenres();
        this.setState({ genres });

        const movieId = match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) return history.replace("/notfound");

        this.setState({ movies: this.mapToViewModel(movie) })
    }

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>

                <h1>Movie Form</h1>

                <form onSubmit={this.doSubmit}>
                    {this.renderFormInput("title", "Title", 'Title')}
                    {this.renderSelect("genreId", "Genre", this.schema.genres)}
                    {this.renderFormInput("numberInStock", "Number In Stock", 'Stock')}
                    {this.renderFormInput("dailyRenderRate", "Rate", 'Your Rating')}

                    {this.renderButton("btn-outline-info", "Save", history, "/movies", this.validate())}
                </form>

            </React.Fragment>
        );
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = () => {
        const { movies } = this.state;
        const {history} = this.props;

        saveMovie(movies);

        history.push("/movies");
    };
}
export default MovieForm;