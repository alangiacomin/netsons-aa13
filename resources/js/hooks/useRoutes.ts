import {RouteObject} from "react-router-dom";
import {routerRoutes as appRoutes} from "../areas/app/routes.tsx";
import {routerRoutes as adminRoutes} from "../areas/backoffice/routes.tsx";

type RouteInfo = {
    path: string;
}

type RouteMap = Record<string, RouteInfo>;

const prefixRouteIds = (routes: RouteObject[], prefix: string): RouteObject[] => {
    return routes.map(route => {
        const newRoute: RouteObject = {...route};

        if (route.id) {
            newRoute.id = prefix + route.id.charAt(0).toUpperCase() + route.id.slice(1);
        }

        if (route.children) {
            newRoute.children = prefixRouteIds(route.children, prefix);
        }

        return newRoute;
    });
}

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

const prefixedRoutes = [
    ...prefixRouteIds(appRoutes, 'app'),
    ...prefixRouteIds(adminRoutes, 'admin'),
];

const routes = buildRouteMap(prefixedRoutes);

export {
    prefixedRoutes as routerRoutes,
    routes,
};
