import React from "react";
import {Component} from "react";
import FormInput from "./formInput";
import CheckBoxForm from "./checkBoxForm";
import Joi from "joi-browser";
import SelectGender from "./selectGender";
import HandleButtonTransfer from "../functionsJS/handleButtonTransfer";

export default class SignupForm extends Component {
    state = {
        account: {email: "", password: "", confirmPassword: "", phoneNumber: ""},
        errors: {}
    }

    render() {
        const { account, errors } = this.state;

        const { history } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <FormInput
                    name="email"
                    type="text"
                    value={account.email}
                    onChange={this.handleChange}
                    label="Email"
                    placeHolder="Email@"
                    error={errors.email}
                />

                <FormInput
                    name="password"
                    type="password"
                    value={account.password}
                    onChange={this.handleChange}
                    label="Password"
                    placeHolder="Password"
                    error={errors.password}
                />

                <FormInput
                    name="confirmPassword"
                    type="password"
                    value={account.confirmPassword}
                    onChange={this.handleChange}
                    label="Confirm-Password"
                    placeHolder="Confirm-Password"
                    error={errors.confirmPassword}
                />

                <FormInput
                    name="phoneNumber"
                    type="text"
                    value={account.phoneNumber}
                    onChange={this.handleChange}
                    label="Phone-Number"
                    placeHolder="Phone-Number"
                    error={errors.phoneNumber}
                />

                <SelectGender
                    id={"ChooseMenu"}
                    value1={""}
                    value2={"male"}
                    value3={"feMale"}
                    value4={"sheMale"}
                    label={"Gender"}
                    label1={"Choose Gender..."}
                    label2={"Male"}
                    label3={"FeMale"}
                    label4={"SheMale"}
                />

                <CheckBoxForm
                    label="Remember me"
                    id="CheckBox"
                />

                <button className="btn btn-outline-info btn-space"
                        disabled={this.validate()}
                        onClick={() => HandleButtonTransfer(history, "/login")}

                >SingUp</button>

                <button className="btn btn-outline-danger"
                        onClick={() => HandleButtonTransfer(history, "/login")}
                >Back</button>
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