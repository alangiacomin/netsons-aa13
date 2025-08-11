import {ReactNode, useCallback, useEffect, useState} from "react";
import {FumettoApi} from "../../../api";
import {faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {IFumetto, ITexUfficiale} from "../../../types/FumettiTypes.tsx";
import useDate from "../../../hooks/useDate.ts";

const Fumetti = (): ReactNode => {
    const [fumetti, setFumetti] = useState<IFumetto[] | null>(null);
    const [mancanti, setMancanti] = useState<ITexUfficiale[] | null>(null);
    const [selezionati, setSelezionati] = useState<ITexUfficiale[]>([]);

    const {getDateString} = useDate();

    const loadFumetti = useCallback(() => {
        FumettoApi.list().then((res) => {
            setFumetti(res.map((u) => ({
                Id: u.Id,
                Numero: u.Numero,
                Titolo: u.Titolo,
                DataPubblicazione: u.DataPubblicazione,
                DataEsatta: u.DataEsatta,
            })));
        });
        FumettoApi.getApiFumettiGetListMancanti().then((res) => {
            setMancanti(res.map((u) => ({
                Numero: u.Numero,
                Titolo: u.Titolo,
                MesePubblicazione: u.MesePubblicazione,
                Anno: u.Anno,
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
                    Titolo: res.Titolo ?? '',
                    DataPubblicazione: res.DataPubblicazione,
                    DataEsatta: res.DataEsatta ?? false,
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

    const addFumetto = useCallback((fumetto: ITexUfficiale) => {
        FumettoApi.store({
            Titolo: fumetto.Titolo ?? '',
            Numero: fumetto.Numero,
            DataPubblicazione: getDateString(fumetto.Anno, fumetto.MesePubblicazione, 1),
            DataEsatta: false,
        }).then((res) => {
                setFumetti((prev) => {
                    return [...(prev ?? []), {
                        Id: res.Id ?? 0,
                        Numero: res.Numero ?? 0,
                        Titolo: res.Titolo ?? '',
                        DataPubblicazione: res.DataPubblicazione ?? '',
                        DataEsatta: res.DataEsatta ?? false,
                    }];
                });
                setMancanti((prev) => {
                    return prev
                        ? prev.filter((u) => u.Numero !== fumetto.Numero)
                        : null;
                });
        });
    }, [getDateString]);

    const addFumetti = useCallback(() => {
        if (selezionati.length > 0) {
            selezionati.forEach(f => {
                addFumetto(f, false);
            });
            setSelezionati([]);
        }
    }, [addFumetto, selezionati]);

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
                    <th scope="col">Numero</th>
                    <th scope="col">Titolo</th>
                    <th scope="col">Data pubblicazione</th>
                    <th/>
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
                {fumetti && fumetti.map((u) => (
                    <tr key={u.Numero}>
                        <th scope="row">{u.Numero}</th>
                        <td>{u.Titolo}</td>
                        <td>
                            {u.DataEsatta
                                ? new Date(u.DataPubblicazione ?? 0).toLocaleString('it-IT', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })
                                : new Date(u.DataPubblicazione ?? 0).toLocaleString('it-IT', {
                                    month: 'long',
                                    year: 'numeric'
                                })
                            }
                        </td>
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
            <h2>Mancanti</h2>
            <button className="btn btn-link btn-sm"
                    type="button"
                    onClick={() => {
                        addFumetti();
                    }}
                    disabled={selezionati.length == 0}
            >
                Aggiungi selezionati
            </button>
            <form>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={mancanti?.length === selezionati.length && mancanti?.length > 0}
                                onChange={(e) => {
                                    if ((e.target as HTMLInputElement).checked) {
                                        setSelezionati(mancanti ?? []);
                                    } else {
                                        setSelezionati([]);
                                    }
                                }}
                            />
                        </th>
                        <th scope="col">Numero</th>
                        <th scope="col">Titolo</th>
                        <th scope="col">Pubblicazione</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className={"table-group-divider"}>
                    {!mancanti && (
                        <tr className={"text-center"}>
                            <td colSpan={5} className={"py-3"}>... loading ...</td>
                        </tr>)}
                    {mancanti && mancanti.length == 0 && (
                        <tr className={"text-center"}>
                            <td colSpan={5} className={"py-3"}>Trovato nulla</td>
                        </tr>)}
                    {mancanti && mancanti.map((u) => (
                        <tr key={u.Numero}>
                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selezionati.some(item => item.Numero === u.Numero)}
                                    onChange={(e) => {
                                        if ((e.target as HTMLInputElement).checked) {
                                            setSelezionati((prev) => [...prev, u]);
                                        } else {
                                            setSelezionati((prev) => prev.filter(item => item.Numero !== u.Numero));
                                        }
                                    }}
                                />
                            </td>
                            <td>{u.Numero}</td>
                            <td>{u.Titolo}</td>
                            <td>{u.MesePubblicazione} {u.Anno}</td>
                            <td>
                                <button className="btn btn-link btn-sm"
                                        type="button"
                                        onClick={() => {
                                            addFumetto(u)
                                        }}>
                                    Aggiungi
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Fumetti;
