import React from "react";
import {Component} from "react";
import FormInput from "./formInput";
import CheckBoxForm from "./checkBoxForm";
import Joi from "joi-browser";

export default class LoginForm extends Component {
    state = {
        account: {email: "", password: "" },
        errors: {}
    }

    render() {
        const { account, errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <FormInput
                    name="email"
                    value={account.email}
                    onChange={this.handleChange}
                    label="Email"
                    placeHolder="Email@"
                    error={errors.email}
                />

                <FormInput
                    name="password"
                    value={account.password}
                    onChange={this.handleChange}
                    label="Password"
                    placeHolder="Password"
                    error={errors.password}
                />

                <CheckBoxForm
                    label="Remember me"
                    id="Check1"
                />

                <button className="btn btn-outline-info btn-space"
                        disabled={this.validate()}

                >Login</button>

                <button className="btn btn-outline-danger"
                        disabled={this.validate()}
                >Forget Password</button>
            </form>
        );
    }

    handleChange = ({ currentTarget: target }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        const account = {...this.state.account};
        account[target.name] = target.value;
        this.setState({ account, errors })
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    };

    schema = {
        email: Joi.string()
            .required()
            .label('Email'),

        password: Joi.string()
            .required()
            .label('Password')
    };

    validate = () => {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.account, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    };

    validateProperty = ( { name, value } ) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    };

}