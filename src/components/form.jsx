import FormInput from "./formInput";
import React, {Component} from "react";
import CheckBoxForm from "./checkBoxForm";
import Joi from "joi-browser";
import HandleButtonTransfer from "../functionsJS/handleButtonTransfer";

class Form extends Component {
    state = {
        account: {},
        errors: {}
    };

    validate() {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.account, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty = ( { name, value } ) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    };

    handleChange = ({ currentTarget: target }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        const account = {...this.state.account};
        account[target.name] = target.value;
        this.setState({ account, errors })
    }

    handleClickButton = (history, path) => {
        if (path === "/movies") {
            const errors = this.validate();
            this.setState({errors: errors || {}});
            if (errors) return;
        }

        HandleButtonTransfer(history, path);
    };

    renderFormInput(name, label, placeHolder, type="text") {
        const { account, errors } = this.state;

        return(
            <FormInput
                name={name}
                type={type}
                value={account[name]}
                onChange={this.handleChange}
                label={label}
                placeholder={placeHolder}
                error={errors[name]}
            />
        );
    }

    renderCheckBox(label, id) {
        return(
            <CheckBoxForm
                label={label}
                id={id}
            />
        );
    }

    renderButton(style, label, history, path) {
        return(
        <button className={"btn " + style + " btn-space"}
                disabled={this.validate()}
                onClick={() => this.handleClickButton(history, path)}>
            {label}
        </button>
        );
    }

}

export default Form;