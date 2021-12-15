import {NavLink} from "react-router-dom";
import Link from "react-router-dom/Link";

const NavBar = () => {

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
                        <NavLink className="nav-item nav-link" to="/login">
                            Login
                        </NavLink>

                </div>

            </div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
    );
}

export default NavBar;