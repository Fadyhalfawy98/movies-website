import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";
import {signUp} from "../../services/userService";
import auth from "../../services/authService";

export default class SignupForm extends MainForm {
    state = {
        account: {email: "", password: "", confirmPassword: "", phoneNumber: "", name: ""},
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

        name: Joi
            .string()
            .required()
            .min(3)
            .label('Name'),

        confirmPassword: Joi
            .string()
            .min(5)
            .label('Confirm-Password'),

        phoneNumber: Joi
            .number()
            .integer()
            .label('Phone-Number')
    };

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>

                <h1>Sign Up here!</h1>

                <form>
                    {this.renderFormInput("email", "Email", "Email@")}
                    {this.renderFormInput("name", "Name", "Your-Name")}
                    {this.renderFormInput("password", "Password", "Password...", "password", "password")}
                    {this.renderFormInput("confirmPassword", "Confirm-Password", "Confirm-Password...", "password", "password")}
                    {this.renderFormInput("phoneNumber", "Phone-Number", "Phone-Number")}


                    {this.renderSelectGender("ChooseMenu", "", "male", "feMale", "sheMale", "Gender","Choose Gender...", "Male", "FeMale", "SheMale")}

                    {this.renderCheckBox("Agree with all conditions", "checkBox-2")}


                    <button className={"btn btn-outline-info btn-space"}
                            disabled={this.validate()}
                            onClick={this.handleSubmit}>
                        Signup
                    </button>

                    {/*{this.renderButton("btn-outline-info", "Signup", history, "/login", this.validate())}*/}
                    {this.renderButton("btn-outline-danger", "Back", history, "/login", false)}
                </form>
            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { account, errors } = this.state;
        const {history} = this.props;

        try {
            const jwt = await signUp(account);
            auth.loginWithJwt(jwt.headers["x-auth-token"]);
            history.replace("/login");
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const error = { ...errors };
                error.email = e.response.data;
                this.setState({ errors: error});
            }
        }

    }
}