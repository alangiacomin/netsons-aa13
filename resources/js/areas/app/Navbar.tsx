import {ReactNode, useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";

const Navbar = (): ReactNode => {
    const navigate = useNavigate();
    const [isBurgerOpen, setisBurgerOpen] = useState(false);
    const toggleBurger = () => {
        setisBurgerOpen(!isBurgerOpen);
    };
    const goToPage = (page: string) => {
        if (isBurgerOpen) {
            toggleBurger();
        }
        navigate(page);
    }

    const navConfig = {
        home:
            {
                path: "/",
                label: "Home",
            },
        login: {
            path: "/login",
            label: "Login",
        }
    };

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a
                        role="button"
                        className={`navbar-burger burger ${isBurgerOpen ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded={isBurgerOpen ? "true" : "false"}
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
                    className={`navbar-menu ${isBurgerOpen ? 'is-active' : ''}`}
                >
                    <div className="navbar-start">
                        {Object.entries(navConfig).map(([key, n]) => {
                            const isActive = useMatch(n.path);
                            return (
                                <a key={key} className={`navbar-item ${isActive ? 'is-active' : ''}`} onClick={() => {
                                    goToPage(n.path)
                                }}>
                                    {n.label}
                                </a>);
                        })}


                        {/*<div className="navbar-item has-dropdown is-hoverable">*/}
                        {/*    <a className="navbar-link">*/}
                        {/*        More*/}
                        {/*    </a>*/}

                        {/*    <div className="navbar-dropdown">*/}
                        {/*        <a className="navbar-item">*/}
                        {/*            About*/}
                        {/*        </a>*/}
                        {/*        <a className="navbar-item is-selected">*/}
                        {/*            Jobs*/}
                        {/*        </a>*/}
                        {/*        <a className="navbar-item">*/}
                        {/*            Contact*/}
                        {/*        </a>*/}
                        {/*        <hr className="navbar-divider"/>*/}
                        {/*        <a className="navbar-item">*/}
                        {/*            Report an issue*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button" onClick={() => {
                                    goToPage(navConfig.login.path)
                                }}>
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
