import InputForm from "./inputForm";
import React, {Component} from "react";
import CheckBoxForm from "./checkBoxForm";
import Joi from "joi-browser";
import HandleButtonTransfer from "../../helperFunctions/handleButtonTransfer";
import SelectForm from "./selectForm";
import SelectGenderForm from "./selectGenderForm";

class MainForm extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate() {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);

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
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: target }) => {
        const { data, errors } = this.state;
        const getErrors = { ...errors };
        const errorMessage = this.validateProperty(target);
        if (errorMessage) getErrors[target.name] = errorMessage;
        else delete getErrors[target.name];

        const getData = {...data};
        getData[target.name] = target.value;
        this.setState({ data: getData, errors: getErrors });
    }

    handleClickButton = (history, path, label) => {
        if (path === "/movies") {
            const errors = this.validate();
            this.setState({errors: errors || {}});
            if (errors) return;
        }

        HandleButtonTransfer(history, path, label);
    };

    renderFormInput(name, label, placeHolder, type="text") {
        const { data, errors } = this.state;

        return(
            <InputForm
                name={name}
                type={type}
                value={data[name]}
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

    renderButton(style, label, history, path, disabled= true) {
        return(
        <button className={"btn " + style + " btn-space"}
                disabled={disabled}
                onClick={() => this.handleClickButton(history, path, label)}>
            {label}
        </button>
        );
    }

    renderSelect(name, label, options) {
        const {data, errors} = this.state;

        return(
            <SelectForm
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                options={options}
                error={errors[name]}
            />
        );
    }

    renderSelectGender(id, value1, value2, value3, value4, label, label1, label2, label3, label4) {
        return(
            <SelectGenderForm
                id={id}
                value1={value1}
                value2={value2}
                value3={value3}
                value4={value4}
                label={label}
                label1={label1}
                label2={label2}
                label3={label3}
                label4={label4}
            />
        );
    }

}

export default MainForm;