import React from "react";
import {Component} from "react";
import { ToastContainer } from "react-toastify";
import Route from "react-router-dom/Route";
import {Redirect, Switch} from "react-router-dom";
import Movies from "../components/main/movies";
import NavBar from "../components/common/navBar";
import Logout from "../components/common/logout";
import LoginForm from "../components/forms/loginForm";
import SignupForm from "../components/forms/signupForm";
import MovieForm from "../components/forms/movieForm";
import CustomersForm from "../components/forms/customersForm";
import RentalsForm from "../components/forms/rentalsForm";
import NotFoundForm from "../components/forms/notFoundForm";
import auth from "../services/authService";
import ProtectedRoute from "../components/common/protectedRoute";

export class App extends Component {

    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>

                <ToastContainer />

                <NavBar user={user} />

                <main className={"container"}>

                    <Switch>
                        {/*<Route path={"/movies/:id"} component={MovieForm} />*/}
                        <ProtectedRoute path={"/movies/:id"} component={MovieForm} />
                        {/*<Route path={"/movies"} component={Movies} />*/}
                        <Route path={"/movies"} render={props => <Movies { ...props } user={user}/>} />
                        <Route path={"/logout"} component={Logout} />
                        <Route path={"/login"} component={LoginForm} />
                        <Route path={"/signup"} component={SignupForm} />
                        {/*<Route path={"/customers"} component={CustomersForm} />*/}
                        <ProtectedRoute path={"/customers"} component={CustomersForm} />
                        {/*<Route path={"/rentals"} component={RentalsForm} />*/}
                        <ProtectedRoute path={"/rentals"} component={RentalsForm} />
                        <Route path={"/notfound"} to={NotFoundForm} />
                        <Redirect from={"/"} exact to={"/movies"} />
                        <Redirect to={"/notfound"} />
                    </Switch>

                </main>

            </React.Fragment>
        );
    }
}