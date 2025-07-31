import {ReactNode} from "react";
import SidebarItem from "./SidebarItem.tsx";
import routes from "../../../../routes.ts";

const Sidebar = (): ReactNode => {

    const navConfig = {
        home: {
            path: routes.admin.index,
            label: "Home",
        },
        utenti: {
            path: routes.admin.users,
            label: "Utenti",
        },
        fumetti: {
            path: routes.admin.fumetti,
            label: "Fumetti",
        }
    };

    return (
        <ul className="nav flex-column">
            {Object.entries(navConfig).map(([key, n]) => (
                <SidebarItem key={key} to={n.path}>
                    {n.label}
                </SidebarItem>))}
            <SidebarItem to={routes.app.index}>
                <span className="small">&lt; Torna al sito</span>
            </SidebarItem>
        </ul>
    );
}

export default Sidebar;
