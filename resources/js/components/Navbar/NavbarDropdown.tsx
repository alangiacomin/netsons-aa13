import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";

type NavbarDropdownProps = {
    label: ReactNode;
    children: ReactNode;
}
const NavbarDropdown: FC<NavbarDropdownProps> = ({label, children}: NavbarDropdownProps): ReactNode => {
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropRef = useRef<HTMLLIElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const locRef = useRef<string | null>(null);

    const toggleDrop = () => {
        setIsDropOpen(!isDropOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
                console.log("chiudo fuori drop");
                setIsDropOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const location = useLocation();
    useEffect(() => {
        if (locRef.current !== location.pathname) {
            locRef.current = location.pathname;
            setIsDropOpen(false);
        }
    }, [location]);

    return (
        <li className="nav-item dropdown" ref={dropRef}>
            <Link className="nav-link dropdown-toggle" to={"#"} onClick={toggleDrop}>
                {label}
            </Link>
            <ul className={classNames(
                "dropdown-menu",
                {"show": isDropOpen})}
                ref={menuRef}>
                {children}
            </ul>
        </li>);
};

export default NavbarDropdown;
