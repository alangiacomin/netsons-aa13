import {RouteObject} from "react-router-dom";

import Layout from "./Layout.tsx";
import Register from "./Login/Register.tsx";
import Logout from "./Login/Logout.tsx";
import User from "./User/User.tsx";
import FunzioniVarie from "./FunzioniVarie/FunzioniVarie.tsx";
import Login from "./Login/Login.tsx";
import Fumetti from "./Fumetti/Fumetti.tsx";

const routes: RouteObject[] = [
    {
        id: "root",
        path: "/",
        element: <Layout/>,
        children: [
            {id: "index", index: true, element: <FunzioniVarie/>},
            {id: "login", path: "login", element: <Login/>},
            {id: "logout", path: "logout", element: <Logout/>},
            {id: "register", path: "register", element: <Register/>},
            {id: "fumetti", path: "fumetti", element: <Fumetti/>, handle: {sectionId: 'fumetti'}},
            {id: "fumetti2", path: "fumetti2", element: <Fumetti/>, handle: {sectionId: 'fumetti2'}},
            {id: "user", path: "user", element: <User/>},
            {id: "fallback", path: "*", element: <div>404</div>},
        ],
    }
];

export {
    routes as routerRoutes,
};
