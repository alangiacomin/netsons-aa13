import {ReactNode, useCallback, useEffect} from "react";
import {useAuth} from "../../../MainProvider.tsx";
import {useNavigate} from "react-router-dom";
import './Logout.css';
import {UserApi} from "../../../api";
import {routes} from "../../../hooks/useRoutes.ts";

const Logout = (): ReactNode => {

    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const redirectToHome = useCallback(() => {
        navigate(routes.appRoot.path, {replace: true});
    }, []);

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
