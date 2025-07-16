import {FC, ReactNode} from "react";
import {Link, useMatch} from "react-router-dom";

type NavbarItemProps = {
    to: string;
    children: ReactNode;
}
const NavbarItem: FC<NavbarItemProps> = ({to, children}: NavbarItemProps): ReactNode => {
    const isActive = useMatch(to);
    return (
        <li className="nav-item">
            <Link
                className={`nav-link ${isActive ? 'active' : ''}`}
                to={to}>
                {children}
            </Link>
        </li>);
};

export default NavbarItem;
