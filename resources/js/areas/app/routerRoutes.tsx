import {RouteObject} from "react-router-dom";

import Layout from "./Layout.tsx";
import Fumetti from "./Fumetti/Fumetti.tsx";
import User from "./User/User.tsx";
import Register from "./Login/Register.tsx";
import Logout from "./Login/Logout.tsx";
import Login from "./Login/Login.tsx";
import FunzioniVarie from "./FunzioniVarie/FunzioniVarie.tsx";
import routes from "../../routes.tsx";

export const routerRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <FunzioniVarie/>},
            {path: routes.app.login, element: <Login/>},
            {path: routes.app.logout, element: <Logout/>},
            {path: routes.app.register, element: <Register/>},
            {path: routes.app.fumetti, element: <Fumetti/>, handle: {sectionId: "fumetti"}},
            {path: routes.app.fumetti2, element: <Fumetti/>, handle: {sectionId: "fumetti2"}},
            {path: routes.app.user, element: <User/>},
            {path: "*", element: <div>non c'è 404</div>},
        ],
    },
];
