import {RouteObject} from "react-router-dom";

import routes from "../../routes.ts";
import Layout from "./Layout.tsx";
import Users from "./users/Users.tsx";
import Fumetti from "./fumetti/Fumetti.tsx";

export const routerRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <Layout/>,
        children: [
            {index: true, element: <div>Siamo nella home admin</div>},
            {path: routes.admin.users, element: <Users/>},
            {path: routes.admin.fumetti, element: <Fumetti/>},
            {path: "*", element: <div>admin 404</div>},
        ],
    },
];
