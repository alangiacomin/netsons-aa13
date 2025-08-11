import {useEffect, useState} from "react";
import {FumettoApi} from "../../../api";
import {IFumetto} from "../../../types/FumettiTypes.tsx";

const Fumetti = () => {
    const [fumetti, setFumetti] = useState<IFumetto[] | null>(null);

    useEffect(() => {
        FumettoApi.list()
            .then((res) => {
                console.log(res);
                setFumetti(res as IFumetto[]);
            });
    }, []);

    return (
        <div className={"container"}>
            <p>Corpo dei fumetti 2</p>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Titolo</th>
                    <th scope="col">Data</th>
                </tr>
                </thead>
                <tbody className={"table-group-divider"}>
                {!fumetti && (
                    <tr className={"text-center"}>
                        <td colSpan={3} className={"py-3"}>... loading ...</td>
                    </tr>)}
                {fumetti && fumetti.length == 0 && (
                    <tr className={"text-center"}>
                        <td colSpan={3} className={"py-3"}>Trovato nulla</td>
                    </tr>)}
                {fumetti && fumetti.map((f: IFumetto) => (
                    <tr key={f.Id}>
                        <th scope="row">{f.Numero}</th>
                        <td>{f.Titolo}</td>
                        <td>{new Date(f.DataPubblicazione ?? 0).toLocaleDateString('it-IT',
                            f.DataEsatta
                                ? {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }
                                : {
                                    month: 'long',
                                    year: 'numeric'
                                })}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
}

export default Fumetti;
