import {Component} from "react";
import Movies from "../components/movies";

export class App extends Component {
    render() {
        return (
            <main className={"container"}>
                <Movies />
            </main>
        );
    }
}