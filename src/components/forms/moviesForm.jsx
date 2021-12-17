import React from "react";
import MainForm from "./mainForm";

class MoviesForm extends MainForm {
    render() {
        const {match, history} = this.props;
        return(
            <React.Fragment>

                <h1> Movie id = {match.params.id} and name is = { match.params.title } </h1>

                {this.renderButton("btn-outline-info", "Save", false, history, "/movies")}

            </React.Fragment>

        );
}

}

export default MoviesForm;