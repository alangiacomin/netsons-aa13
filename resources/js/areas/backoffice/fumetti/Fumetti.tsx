import {ReactNode, useCallback, useEffect, useState} from "react";
import {FumettoApi} from "../../../api";
import {faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {IFumetto} from "../../../types/FumettiTypes.tsx";

const Fumetti = (): ReactNode => {
    const [fumetti, setFumetti] = useState<IFumetto[] | null>(null)

    const loadFumetti = useCallback(() => {
        FumettoApi.list().then((res) => {
            setFumetti(res.map(u => ({
                Id: u.Id,
                Numero: u.Numero,
                Titolo: u.Titolo,
                DataPubblicazione: u.DataPubblicazione
            })));
        });
    }, []);


    useEffect(() => {
        loadFumetti();
    }, [loadFumetti]);

    const creaNuovo = useCallback(() => {
        FumettoApi.store({
            Numero: parseInt(Math.random().toString().substring(2, 5)),
            Titolo: "test_" + Math.random().toString(36).substring(2, 5)
        })
            .then((res) => {
                console.log(res);
                setFumetti([...(fumetti ?? []), {
                    Id: res.Id ?? 0,
                    Numero: res.Numero ?? 0,
                    Titolo: res.Titolo,
                    DataPubblicazione: undefined //res.DataPubblicazione.date
                }]);
                loadFumetti();
            });
    }, [fumetti, loadFumetti]);

    const deleteFumetto = useCallback((id: number) => {
        FumettoApi.remove(id)
            .then(() => {
                setFumetti((fumetti ?? []).filter((u) => u.Id !== id));
                loadFumetti();
            });
    }, [fumetti, loadFumetti]);

    return (
        <div className={"container"}>
            <h2>Fumetti</h2>
            <button
                className={classNames(
                    "btn btn-primary")}
                onClick={creaNuovo}>
                Crea nuovo
            </button>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Titolo</th>
                    <th scope="col">Data pubblicazione</th>
                    <th/>
                </tr>
                </thead>
                <tbody className={"table-group-divider"}>
                {!fumetti && (
                    <tr className={"text-center"}>
                        <td colSpan={5} className={"py-3"}>... loading ...</td>
                    </tr>)}
                {fumetti && fumetti.length == 0 && (
                    <tr className={"text-center"}>
                        <td colSpan={5} className={"py-3"}>Trovato nulla</td>
                    </tr>)}
                {fumetti && fumetti.map((u) => (
                    <tr key={u.Id}>
                        <th scope="row">{u.Id}</th>
                        <td>{u.Numero}</td>
                        <td>{u.Titolo}</td>
                        <td>{u.DataPubblicazione}</td>
                        <td>
                            <button className="btn btn-link btn-sm"><FontAwesomeIcon icon={faPen}/></button>
                            <button className="btn btn-link btn-sm"
                                    onClick={() => {
                                        deleteFumetto(u.Id)
                                    }}>
                                <FontAwesomeIcon icon={faTrashCan}/></button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
};

export default Fumetti;
