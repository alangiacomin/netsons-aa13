import {Outlet} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "../app/components/Navbar/Navbar.tsx";

const Layout = (): ReactNode => {
    return (
        <div className="container">
            <h1>-- BACKOFFICE --</h1>
            <Navbar/>
            <div className={"container-fluid"}>
                <Outlet/>
            </div>
            <footer className="py-3 my-4 border-top">
                <p className="text-center text-body-secondary">© 2025 Company, Inc</p>
            </footer>
        </div>
    );
}

export default Layout;
