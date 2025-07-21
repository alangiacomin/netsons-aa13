import {FC, ReactNode} from "react";
import {Link} from "react-router-dom";

type NavbarDropdownItemProps = {
    to: string;
    children: ReactNode;
}
const NavbarDropdownItem: FC<NavbarDropdownItemProps> = ({to, children}: NavbarDropdownItemProps): ReactNode => {
    return (
        <li>
            <Link
                className={`dropdown-item`}
                to={to}>
                {children}
            </Link>
        </li>);
};

export default NavbarDropdownItem;
