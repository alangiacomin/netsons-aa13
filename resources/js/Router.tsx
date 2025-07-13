import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {paths as appPaths} from "./areas/app/paths";
import {ReactNode} from "react";

const br = createBrowserRouter(appPaths);

const Router = (): ReactNode => (<RouterProvider router={br}/>);

export default Router;
