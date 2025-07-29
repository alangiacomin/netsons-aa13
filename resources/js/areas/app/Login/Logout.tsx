import {ReactNode, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Logout.css';
import {UserApi} from "../../../api";
import {routes} from "../../../hooks/useRoutes.ts";
import useAuth from "../../../hooks/useAuth.tsx";

const Logout = (): ReactNode => {

    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const redirectToHome = useCallback(() => {
        navigate(routes.appRoot.path, {replace: true});
    }, [navigate]);

    useEffect(() => {
        if (!user) {
            redirectToHome();
            return;
        }
        UserApi.logout()
            .then(() => {
                setUser(null);
                redirectToHome();
            });
    }, []);

    return (<div className={"logout"}>... logout in corso ...</div>);
};

export default Logout;
