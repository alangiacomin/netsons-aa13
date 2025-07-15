import {ReactNode, useState} from "react";
import {Link, useMatch, useNavigate} from "react-router-dom";
import {routes} from "./routes.tsx";
import {useAuth} from "../../MainProvider.tsx";
import classNames from "classnames";

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
            path: routes.root.path,
            label: "Home",
        },
        fumetti: {
            path: routes.fumetti.path,
            label: "Fumetti",
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={navConfig.home.path}>Navbar</Link>
                <button className="navbar-toggler" type="button" onClick={toggleBurger}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={classNames("navbar-collapse", {"collapse": !isBurgerOpen})} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {Object.entries(navConfig).map(([key, n]) => {
                            const isActive = useMatch(n.path);
                            return (
                                <li className="nav-item"
                                    key={key}>
                                    <Link
                                        key={key}
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                        to={n.path}>
                                        {n.label}
                                    </Link>
                                </li>);
                        })}
                    </ul>
                    <div className="d-flex">
                        {user && (
                            <button
                                className="btn btn-light" onClick={() => {
                                goToPage(routes.logout.path)
                            }}>
                                Logout
                            </button>)}
                        {!user && (
                            <>
                                <button
                                    className="btn btn-outline-light" onClick={() => {
                                    goToPage(routes.register.path)
                                }}>
                                    Register
                                </button>
                                <button
                                    className="btn btn-light" onClick={() => {
                                    goToPage(routes.login.path)
                                }}>
                                    Login
                                </button>
                            </>)}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
