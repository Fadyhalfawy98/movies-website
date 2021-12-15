import React from "react";
import {Component} from "react";
import Movies from "../components/movies";
import Route from "react-router-dom/Route";
import Customers from "../components/customers";
import Rentals from "../components/rentals";
import {Redirect, Switch} from "react-router-dom";
import NavBar from "../components/navBar";
import MoviesForm from "../components/moviesForm";
import ErrorFound from "../components/errorFound";

export class App extends Component {
    render() {
        return (
            <React.Fragment>

            <NavBar />

            <main className={"container"}>

                <Switch>
                    <Route path={"/movies/:id/:title?"} component={MoviesForm} />
                    <Route path={"/movies"} component={Movies} />
                    <Route path={"/customers"} component={Customers} />
                    <Route path={"/rentals"} component={Rentals} />
                    <Route path={"/notfound"} to={ErrorFound} />
                    <Redirect from={"/"} exact to={"/movies"} />
                    <Redirect to={"/notfound"} />
                </Switch>

            </main>

            </React.Fragment>
        );
    }
}