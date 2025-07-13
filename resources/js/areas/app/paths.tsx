import {lazy} from "react";
import {RouteObject} from "react-router-dom";

import Layout from "./Layout.tsx";
import Register from "./Login/Register.tsx";

const Fumetti = lazy(() => import("./Fumetti/Fumetti"));
const FunzioniVarie = lazy(() => import("./FunzioniVarie/FunzioniVarie"));
const Login = lazy(() => import("./Login/Login"));

const paths: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <FunzioniVarie/>},
            {path: "login", element: <Login/>},
            {path: "register", element: <Register/>},
            {path: "fumetti", element: <Fumetti/>},
            {path: "*", element: <div>404</div>},
        ],
    }
];

export {
    paths
};
