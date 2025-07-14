import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routerRoutes as appRoutes} from "./areas/app/routes.tsx";
import {ReactNode} from "react";

const br = createBrowserRouter(appRoutes);

const Router = (): ReactNode => (<RouterProvider router={br}/>);

export default Router;
