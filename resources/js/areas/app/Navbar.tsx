import {ReactNode, useState} from "react";
import {Link, useMatch, useNavigate} from "react-router-dom";
import {routes} from "./routes.tsx";
import {useAuth} from "../../MainProvider.tsx";

const Navbar = (): ReactNode => {
    const navigate = useNavigate();
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {user} = useAuth();
    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
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
                                <Link
                                    key={key}
                                    className={`navbar-item ${isActive ? 'is-active' : ''}`}
                                    to={n.path}>
                                    {n.label}
                                </Link>);
                        })}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {user && (
                                    <button
                                        className="button" onClick={() => {
                                        goToPage(routes.logout.path)
                                    }}>
                                        Logout
                                    </button>)}
                                {!user && (
                                    <>
                                        <button
                                            className="button" onClick={() => {
                                            goToPage(routes.register.path)
                                        }}>
                                            Register
                                        </button>
                                        <button
                                            className="button is-primary" onClick={() => {
                                            goToPage(routes.login.path)
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
