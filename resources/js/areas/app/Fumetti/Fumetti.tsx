import {FC, ReactNode, useEffect} from "react";
import {FumettoApi} from "../../../api";
import {useAuth} from "../../../MainProvider.tsx";
import {useLocation} from "react-router-dom";
import Login from "../Login/Login.tsx";


interface Props {
    children: ReactNode;          // ciò che vuoi proteggere (es. <Fumetti />)
}

const RequireAuthInline: FC<Props> = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        // Non loggato: mostro direttamente il login,
        // passando il path corrente per il redirect post-login
        return <Login redirectTo={location.pathname}/>;
    }

    // Loggato: mostro il contenuto protetto
    return <>{children}</>;
}


const Fumetti2 = (): ReactNode => {

    useEffect(() => {
        FumettoApi.list().then((res: any) => {
            console.log(res);
        });
    }, []);

    return (
        <div className={"container"}>
            Corpo dei fumetti
        </div>);
};

const Fumetti = () => {
    return (<RequireAuthInline>
        <Fumetti2/>
    </RequireAuthInline>);
};

export default Fumetti;
