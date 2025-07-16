import {Outlet} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";


const Layout = (): ReactNode => {
    return (
        <div className="container">
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
