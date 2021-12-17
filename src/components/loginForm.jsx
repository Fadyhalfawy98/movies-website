import React from "react";
import Joi from "joi-browser";
import Form from "./form";

export default class LoginForm extends Form {
    state = {
        account: {email: "", password: "" },
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
            .label('Password')
    };

    render() {
        const { history } = this.props;

        return (
            <form>
                {this.renderFormInput("email", "Email", 'Email@')}
                {this.renderFormInput("password", "Password", 'password...', "Password")}

                {this.renderCheckBox("Remember me", "checkBox")}

                {this.renderButton("btn-outline-info", "Login", history, "/movies")}
                {this.renderButton("btn-outline-danger", "Forget-Password", history, "/signup")}
            </form>
        );
    }
}