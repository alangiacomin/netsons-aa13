import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ReactNode} from "react";
import {routerRoutes as appRouterRoutes} from "./areas/app/routerRoutes.tsx";
import {routerRoutes as adminRouterRoutes} from "./areas/admin/routerRoutes.tsx";

const br = createBrowserRouter([
    ...appRouterRoutes,
    ...adminRouterRoutes,
]);

const Router = (): ReactNode => {
    return (<RouterProvider router={br}/>);
};

export default Router;
