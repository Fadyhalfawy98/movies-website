import React from "react";
import Joi from "joi-browser";
import Form from "./form";

export default class SignupForm extends Form {
    state = {
        account: {email: "", password: "", confirmPassword: "", phoneNumber: ""},
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
            .label('Password'),

        confirmPassword: Joi
            .string()
            .required()
            .label('Confirm-Password'),

        phoneNumber: Joi
            .number()
            .integer()
            .required()
            .label('Phone-Number')
    };

    render() {
        const { history } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderFormInput("email", "Email", "Email@")}
                {this.renderFormInput("password", "Password", "Password...", "password")}
                {this.renderFormInput("confirmPassword", "Confirm-Password", "Confirm-Password...", "password")}
                {this.renderFormInput("phoneNumber", "Phone-Number", "Phone-Number")}


                {this.renderSelectGender("ChooseMenu", "", "male", "feMale", "sheMale", "Gender","Choose Gender...", "Male", "FeMale", "SheMale")}

                {this.renderCheckBox("Agree with all conditions", "checkBox-2")}

                {this.renderButton("btn-outline-info", "Signup", history, "/login")}
                {this.renderButton("btn-outline-danger", "Back", history, "/login")}
            </form>
        );
    }
}