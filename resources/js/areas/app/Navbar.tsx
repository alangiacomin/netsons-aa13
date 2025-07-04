import {ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";

const Navbar = (): ReactNode => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const toggleBurger = () => {
        setIsActive(!isActive);
    };
    const goToPage = (page: string) => {
        if (isActive) {
            toggleBurger();
        }
        navigate(page);
    }

    return (<>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a
                    role="button"
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded={isActive ? "true" : "false"}
                    onClick={toggleBurger}
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div
                id="navbarBasicExample"
                className={`navbar-menu ${isActive ? 'is-active' : ''}`}
            >
                <div className="navbar-start">
                    <a className="navbar-item" onClick={() => {
                        goToPage('/')
                    }}>
                        Home
                    </a>

                    <a className="navbar-item" onClick={() => {
                        goToPage('/login')
                    }}>
                        Documentation
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item is-selected">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;
