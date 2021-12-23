import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";
import {getGenres} from "../../services/genreService";
import {getMovie, saveMovie} from "../../services/movieService";

class MovieForm extends MainForm {
    state = {
        account: {
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
            .number()
            .integer()
            .required()
            .min(0)
            .max(100)
            .label('Number-In-Stock'),

        dailyRentalRate: Joi
            .number()
            .integer()
            .required()
            .min(0)
            .max(10)
            .label('Rate')
    };

    async componentDidMount() {
        await this.populateGenre();
        await this.populateMovie();
    }

    render() {
        const { genres } = this.state;

        return (
            <React.Fragment>

                <h1>Movie Form</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.renderFormInput("title", "Title", 'Title')}
                    {this.renderSelect("genreId", "Genre", genres)}
                    {this.renderFormInput("numberInStock", "Number In Stock", 'Stock')}
                    {this.renderFormInput("dailyRentalRate", "Rate", "Your Rating")}

                    <button className={"btn btn-outline-info"}>
                        Save
                    </button>
                </form>

            </React.Fragment>
        );
    }

    async populateGenre() {
        const {data: genres} = await getGenres();
        this.setState({ genres });
    };

    async populateMovie() {
        const { history, match } = this.props;

        try {
            const movieId = match.params.id;
            if (movieId === "new") return;

            const {data: movie} = await getMovie(movieId);
            this.setState({ account: this.mapToViewModel(movie) });
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    };

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        const { account } = this.state;
        const { history } = this.props;

        await saveMovie(account);
        return history.replace("/movies");
    };
}
export default MovieForm;