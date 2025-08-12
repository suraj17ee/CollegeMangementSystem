import { Link } from "react-router-dom";
import "./NavBar.css"; // custom styles

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">CMS</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/login' className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/user' className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className="nav-link">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
