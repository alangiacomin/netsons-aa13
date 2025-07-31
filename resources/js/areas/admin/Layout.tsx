import {Outlet} from "react-router-dom";
import {ReactNode} from "react";
import "./Layout.css";
import Sidebar from "./components/Sidebar/Sidebar.tsx";

const Layout = (): ReactNode => {
    return (
        <div className="container-fluid d-flex">
            <div className={"sidebar"}>
                <Sidebar/>
            </div>
            <div className={"content"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
