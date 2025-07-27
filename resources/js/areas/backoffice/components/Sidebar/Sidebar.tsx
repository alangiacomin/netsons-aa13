import {ReactNode} from "react";
import SidebarItem from "./SidebarItem.tsx";
import {routes} from "../../../../hooks/useRoutes.ts";

const Sidebar = (): ReactNode => {

    const navConfig = {
        home: {
            path: routes.adminRoot.path,
            label: "Home",
        },
        utenti: {
            path: routes.adminUsers.path,
            label: "Utenti",
        },
        fumetti: {
            path: routes.adminFumetti.path,
            label: "Fumetti",
        }
    };

    return (
        <ul className="nav flex-column">
            {Object.entries(navConfig).map(([key, n]) => (
                <SidebarItem key={key} to={n.path}>
                    {n.label}
                </SidebarItem>))}
            <SidebarItem to={routes.appRoot.path}>
                <span className="small">&lt; Torna al sito</span>
            </SidebarItem>
        </ul>
    );
}

export default Sidebar;
