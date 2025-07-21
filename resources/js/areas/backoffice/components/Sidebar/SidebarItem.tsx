import {FC, ReactNode} from "react";
import {Link, useMatch} from "react-router-dom";

type SidebarItemProps = {
    to: string;
    children: ReactNode;
}
const SidebarItem: FC<SidebarItemProps> = ({to, children}: SidebarItemProps): ReactNode => {
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

export default SidebarItem;
