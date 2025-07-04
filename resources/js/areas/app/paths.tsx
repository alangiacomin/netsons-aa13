import {ReactNode} from "react";
import Layout from "./Layout.tsx";
import FunzioniVarie from "./FunzioniVarie/FunzioniVarie.tsx";
import Login from "./Login/Login.tsx";


const paths: { path: string, element: ReactNode, children: { path: string, element: ReactNode }[] } = {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "",
            element: <FunzioniVarie/>,
        },
        {
            path: "login",
            element: <Login/>,
        },
        {
            path: "*",
            element: <div>404</div>,
        },
    ],
};

export {
    paths
};
