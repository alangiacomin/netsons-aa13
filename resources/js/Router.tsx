import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ReactNode} from "react";
import {routerRoutes, routes} from "./hooks/useRoutes.ts";

console.log(routes);
const br = createBrowserRouter(routerRoutes);

const Router = (): ReactNode => {
    return (<RouterProvider router={br}/>);
};

export default Router;
