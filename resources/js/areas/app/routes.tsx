import {lazy} from "react";
import {RouteObject} from "react-router-dom";

import Layout from "./Layout.tsx";
import Register from "./Login/Register.tsx";
import Logout from "./Login/Logout.tsx";

const Fumetti = lazy(() => import("./Fumetti/Fumetti"));
const FunzioniVarie = lazy(() => import("./FunzioniVarie/FunzioniVarie"));
const Login = lazy(() => import("./Login/Login"));

const routerRoutes: RouteObject[] = [
    {
        id: "root",
        path: "/",
        element: <Layout/>,
        children: [
            {id: "index", index: true, element: <FunzioniVarie/>},
            {id: "login", path: "login", element: <Login/>},
            {id: "logout", path: "logout", element: <Logout/>},
            {id: "register", path: "register", element: <Register/>},
            {id: "fumetti", path: "fumetti", element: <Fumetti/>},
            {id: "fallback", path: "*", element: <div>404</div>},
        ],
    }
];

type RouteInfo = {
    path: string;
}

type RouteMap = Record<string, RouteInfo>;

/**
 * Crea la mappa dei path a partire dai RouteObject.
 * @param routes  array dei route (lo stesso che passi a <RouterProvider>)
 * @param base    path accumulato dai parent (default: "")
 */
const buildRouteMap = (
    routes: RouteObject[],
    base = ""
): RouteMap => {
    return routes.reduce<RouteMap>((acc, route) => {
        // calcola il path “assoluto” di questo nodo
        const current = route.index
            ? base || "/"
            : route.path === "*"
                ? `${base}*`
                : `${base}${base && !base.endsWith("/") ? "/" : ""}${route.path ?? ""}`;

        // se c’è un id lo memorizziamo
        if (route.id) {
            acc[route.id] = {path: current};
        }

        // visita eventuali figli
        if (route.children?.length) {
            Object.assign(acc, buildRouteMap(route.children, current));
        }

        return acc;
    }, {});
}

const routes: RouteMap = buildRouteMap(routerRoutes);

export {
    routerRoutes,
    routes,
};
