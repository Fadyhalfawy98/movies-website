import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";

export default class SignupForm extends MainForm {
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
            .min(5)
            .label('Password'),

        confirmPassword: Joi
            .string()
            .required()
            .min(5)
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
            <React.Fragment>

                <h1>Sign Up here!</h1>

                <form>
                    {this.renderFormInput("email", "Email", "Email@")}
                    {this.renderFormInput("password", "Password", "Password...", "password", "password")}
                    {this.renderFormInput("confirmPassword", "Confirm-Password", "Confirm-Password...", "password", "password")}
                    {this.renderFormInput("phoneNumber", "Phone-Number", "Phone-Number")}


                    {this.renderSelectGender("ChooseMenu", "", "male", "feMale", "sheMale", "Gender","Choose Gender...", "Male", "FeMale", "SheMale")}

                    {this.renderCheckBox("Agree with all conditions", "checkBox-2")}

                    {this.renderButton("btn-outline-info", "Signup", history, "/login", this.validate())}
                    {this.renderButton("btn-outline-danger", "Back", history, "/login", false)}
                </form>
            </React.Fragment>
        );
    }
}