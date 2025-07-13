import {ReactNode, useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {pathMap} from "./paths.tsx";
import {useAuth} from "../../MainProvider.tsx";

const Navbar = (): ReactNode => {
    const navigate = useNavigate();
    const [isBurgerOpen, setisBurgerOpen] = useState(false);
    const {user} = useAuth();
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
        home: {
            path: "/",
            label: "Home",
        },
        fumetti: {
            path: "/fumetti",
            label: "Fumetti",
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
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {user && (
                                    <button
                                        className="button" onClick={() => {
                                        goToPage(pathMap.logout.path)
                                    }}>
                                        Logout
                                    </button>)}
                                {!user && (
                                    <>
                                        <button
                                            className="button" onClick={() => {
                                            goToPage(pathMap.register.path)
                                        }}>
                                            Register
                                        </button>
                                        <button
                                            className="button is-primary" onClick={() => {
                                            goToPage(pathMap.login.path)
                                        }}>
                                            Login
                                        </button>
                                    </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>);
}

export default Navbar;
