import {ReactNode, useState} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import NavbarItem from "./NavbarItem.tsx";
import NavbarDropdown from "./NavbarDropdown.tsx";
import NavbarDropdownItem from "./NavbarDropdownItem.tsx";
import NavbarDropdownDivider from "./NavbarDropdownDivider.tsx";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAuth from "../../../../hooks/useAuth.tsx";
import routes from "../../../../routes.ts";

const Navbar = (): ReactNode => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {user} = useAuth();
    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const navConfig = {
        home: {
            path: routes.app.index,
            label: "Home",
        },
        fumetti: {
            path: routes.app.fumetti,
            label: "Fumetti",
        },
        fumetti2: {
            path: routes.app.fumetti2,
            label: "Fumetti2",
        }
    };

    /**
     * Rimpiazza i parametri dinamici nel path (es: /user/:id)
     */
    const buildPath = (template: string, params: Record<string, string | number>): string => {
        return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
            const value = params[key];
            if (value === undefined) {
                throw new Error(`Parametro mancante: ${key}`);
            }
            return String(value);
        });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={navConfig.home.path}>Navbar</Link>
                <button className="navbar-toggler" type="button" onClick={toggleBurger}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={classNames("navbar-collapse", {"collapse": !isBurgerOpen})} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {Object.entries(navConfig).map(([key, n]) => (
                            <NavbarItem key={key} to={n.path}>
                                {n.label}
                            </NavbarItem>))}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user && (
                            <>
                                <NavbarItem to={routes.admin.index}>Admin</NavbarItem>
                                <NavbarItem to={routes.app.logout}>Logout</NavbarItem>
                            </>)}
                        {!user && (
                            <>
                                <NavbarItem to={routes.app.login}>Login</NavbarItem>
                            </>)}
                        <span>___</span>
                        <NavbarDropdown label={(
                            <span><FontAwesomeIcon icon={faUser}/> {user ? user.name : ""} </span>)}>
                            {user && (
                                <>
                                    <NavbarDropdownItem
                                        to={buildPath(routes.app.user, {id: user.id})}>User</NavbarDropdownItem>
                                    <NavbarDropdownItem
                                        to={buildPath(routes.app.user, {id: 2})}>User 2</NavbarDropdownItem>
                                    <NavbarDropdownDivider/>
                                    <NavbarDropdownItem to={routes.app.logout}>Logout</NavbarDropdownItem>
                                </>
                            )}
                            {!user && (
                                <>
                                    <NavbarDropdownItem to={routes.app.login}>Login</NavbarDropdownItem>
                                    <NavbarDropdownItem to={routes.app.register}>Register</NavbarDropdownItem>
                                </>
                            )}
                        </NavbarDropdown>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
