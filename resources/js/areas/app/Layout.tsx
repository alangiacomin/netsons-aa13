import {Outlet, useLocation} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";
import {useAuth} from "../../MainProvider.tsx";

const DebugData = () => {
    const isDebug = true;
    const {user} = useAuth();
    const location = useLocation();

    return isDebug && (
        <div className={"debug-data"}>
            <p>User: {user?.name}</p>
            <p>Location: {location.pathname}</p>
        </div>
    );
}

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
            <DebugData/>
        </div>
    );
}

export default Layout;
