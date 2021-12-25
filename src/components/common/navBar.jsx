import {NavLink} from "react-router-dom";
import Link from "react-router-dom/Link";
import React from "react";

const NavBar = ({ user }) => {

    return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Displaying...</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/movies">
                            Movies
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">
                            Customers
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                </div>

            </div>

                <div className="navbar-nav">
                    {!user && (
                        <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/login">
                        Login
                    </NavLink>

                        <NavLink className="nav-item nav-link" to="/signup">
                        Signup
                        </NavLink>
                        </React.Fragment>
                    )}

                    {user && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/profile">
                                { user.name }
                            </NavLink>

                            <NavLink className="nav-item nav-link" to="/logout">
                                Logout
                            </NavLink>
                        </React.Fragment>
                    )}

                </div>
            </nav>
    );
}

export default NavBar;