import {ReactNode, useState} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../areas/app/routes.tsx";
import {useAuth} from "../../MainProvider.tsx";
import classNames from "classnames";
import NavbarItem from "./NavbarItem.tsx";
import NavbarDropdown from "./NavbarDropdown.tsx";
import NavbarDropdownItem from "./NavbarDropdownItem.tsx";
import NavbarDropdownDivider from "./NavbarDropdownDivider.tsx";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = (): ReactNode => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {user} = useAuth();
    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

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
                        {Object.entries(navConfig).map(([key, n]) => (
                            <NavbarItem key={key} to={n.path}>
                                {n.label}
                            </NavbarItem>))}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavbarDropdown label={(
                            <span><FontAwesomeIcon icon={faUser}/> {user ? user.name : "User"} </span>)}>
                            {user && (
                                <>
                                    <NavbarDropdownItem to={"#"}>Azione</NavbarDropdownItem>
                                    <NavbarDropdownItem to={"#"}>Seconda azione</NavbarDropdownItem>
                                    <NavbarDropdownDivider/>
                                    <NavbarDropdownItem to={routes.logout.path}>Logout</NavbarDropdownItem>
                                </>
                            )}
                            {!user && (
                                <>
                                    <NavbarDropdownItem to={routes.login.path}>Login</NavbarDropdownItem>
                                    <NavbarDropdownItem to={routes.register.path}>Register</NavbarDropdownItem>
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
