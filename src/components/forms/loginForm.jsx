import React from "react";
import Joi from "joi-browser";
import auth from "../../services/authService";
import MainForm from "./mainForm";
import {Redirect} from "react-router-dom";

export default class LoginForm extends MainForm {
    state = {
        data: {email: "", password: "" },
        errors: {}
    }

    schema = {
        email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label('Email'),

        password: Joi
            .string()
            .required()
            .min(5)
            .label('Password')
    };

    render() {
        const { history } = this.props;

        if (auth.getCurrentUser()) return <Redirect to={"/"} />;

        return (
            <React.Fragment>

                <h1>Login</h1>

                <form>
                    {this.renderFormInput("email", "Email", 'Email@')}
                    {this.renderFormInput("password", "Password", 'password...', "Password")}

                    {this.renderCheckBox("Remember me", "checkBox")}

                    {/*{this.renderButton("btn-outline-info", "Login", history, "/movies", this.validate())}*/}
                    <button className={"btn btn-outline-info btn-space"}
                            disabled={this.validate()}
                            onClick={this.handleSubmit}>
                        Login
                    </button>

                    {this.renderButton("btn-outline-danger", "Forget-Password", history, "/signup", false)}
                </form>

            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { data, errors } = this.state;
        const { location } = this.props;


        try {
            await auth.login(data.email, data.password);

            const { state } = location;

            window.location = state ? state.from.pathname : "/";
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const error = {...errors};
                error.email = e.response.data;
                this.setState({errors: error});
            }
        }
    }
}