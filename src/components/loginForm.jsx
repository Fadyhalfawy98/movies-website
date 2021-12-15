import {Component} from "react";
import HandleSubmit from "../functionsJS/handleSubmit";

export default class LoginForm extends Component {
    render() {
        return (
            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input id="email"
                           className="form-control"
                           aria-describedby="emailHelp"
                           placeholder="Email@"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password"
                           className="form-control"
                           placeholder="Password"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox"
                           className="form-check-input"
                           id="Check1"/>
                    <label className="form-check-label"
                           htmlFor="Check1">Remember me</label>
                </div>
                <button className="btn btn-outline-info btn-space">Login</button>
                
                <button className="btn btn-outline-danger">Forget Password</button>
            </form>
        );
    }
}