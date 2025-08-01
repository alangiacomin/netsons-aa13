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
                {fumetti && fumetti.map((f: IFumetto) => (
                    <tr key={f.Id}>
                        <th scope="row">{f.Id}</th>
                        <td>{f.Numero}</td>
                        <td>{f.Titolo}</td>
                        <td>{f.DataPubblicazione}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
}

export default Fumetti;
