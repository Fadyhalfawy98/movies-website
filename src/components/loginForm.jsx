import React from "react";
import {Component} from "react";
import HandleSubmit from "../functionsJS/handleSubmit";
import FormInput from "./formInput";
import CheckBoxForm from "./checkBoxForm";

export default class LoginForm extends Component {
    state = {
        account: {email: "", password: "" }
    }

    render() {
        const { account } = this.state;

        return (
            <form onSubmit={HandleSubmit}>
                <FormInput
                    name="email"
                    value={account.email}
                    onChange={this.handleChange}
                    label="Email"
                    placeHolder="Email@"

                />

                <FormInput
                    name="password"
                    value={account.password}
                    onChange={this.handleChange}
                    label="Password"
                    placeHolder="Password"
                />

                <CheckBoxForm
                    label="Remember me"
                    id="Check1"
                />

                <button className="btn btn-outline-info btn-space">Login</button>

                <button className="btn btn-outline-danger">Forget Password</button>
            </form>
        );
    }

    handleChange = ({ currentTarget: target }) => {
        const account = {...this.state.account};
        account[target.name] = target.value;
        this.setState({ account })
    }
}