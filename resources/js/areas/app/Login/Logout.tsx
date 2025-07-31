import {ReactNode, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Logout.css';
import {UserApi} from "../../../api";
import useAuth from "../../../hooks/useAuth.tsx";
import routes from "../../../routes.ts";

const Logout = (): ReactNode => {

    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const redirectToHome = useCallback(() => {
        navigate(routes.app.index, {replace: true});
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
    }, [redirectToHome, setUser, user]);

    return (<div className={"logout"}>... logout in corso ...</div>);
};

export default Logout;
