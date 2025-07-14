import {ReactNode, useCallback, useEffect} from "react";
import {useAuth} from "../../../MainProvider.tsx";
import {useNavigate} from "react-router-dom";
import './Logout.scss';
import {UserApi} from "../../../api";
import {routes} from "../routes.tsx";

const Logout = (): ReactNode => {

    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const redirectToHome = useCallback(() => {
        navigate(routes.root.path, {replace: true});
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

    return (<div className={"logout"}>... logout in corso...</div>);
};

export default Logout;
