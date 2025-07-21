import {FC, ReactNode, useEffect, useState} from "react";
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

    const [fumetti, setFumetti] = useState<any[] | null>(null)

    useEffect(() => {
        FumettoApi.list().then((res: any) => {
            console.log(res);
            setFumetti(res);
        });
    }, []);

    return (
        <div className={"container"}>
            <p>Corpo dei fumetti</p>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Titolo</th>
                    <th scope="col">Data</th>
                </tr>
                </thead>
                <tbody className={"table-group-divider"}>
                {!fumetti && (
                    <tr className={"text-center"}>
                        <td colSpan={4} className={"py-3"}>... loading ...</td>
                    </tr>)}
                {fumetti && fumetti.length == 0 && (
                    <tr className={"text-center"}>
                        <td colSpan={4} className={"py-3"}>Trovato nulla</td>
                    </tr>)}
                {fumetti && fumetti.map((f) => (
                    <tr key={f.id}>
                        <th scope="row">{f.id}</th>
                        <td>{f.Numero}</td>
                        <td>{f.Titolo}</td>
                        <td>{f.DataPubblicazione}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
};

const Fumetti = () => {
    return (<RequireAuthInline>
        <Fumetti2/>
    </RequireAuthInline>);
};

export default Fumetti;
