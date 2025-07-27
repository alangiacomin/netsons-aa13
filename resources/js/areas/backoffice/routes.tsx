import {RouteObject} from "react-router-dom";

import Layout from "./Layout.tsx";
import Users from "./users/Users.tsx";

const routes: RouteObject[] = [
    {
        id: "root",
        path: "/admin",
        element: <Layout/>,
        children: [
            {id: "index", index: true, element: <div>qui admin</div>},
            {id: "users", path: "users", element: <Users/>},
            {id: "fallback", path: "*", element: <div>admin 404</div>},
        ],
    }
];

export {
    routes as routerRoutes,
};
