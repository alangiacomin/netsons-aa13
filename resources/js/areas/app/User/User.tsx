import {FC, ReactNode, useEffect} from "react";
import useAuth from "../../../hooks/useAuth.tsx";

const User: FC = (): ReactNode => {
    const {user} = useAuth();

    useEffect(() => {
        console.log("user component:", user);
    }, [user]);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <img src="https://placehold.co/80x80.png?text=Foto" alt="Foto Profilo"
                                     className="rounded-circle me-3"/>
                                <div>
                                    <h5 className="card-title mb-0">{user?.name}</h5>
                                    <small className="text-muted">{user?.email}</small>
                                </div>
                            </div>

                            <hr/>

                            <dl className="row mb-0">
                                <dt className="col-sm-4">Username</dt>
                                <dd className="col-sm-8">{user?.name}</dd>

                                <dt className="col-sm-4">Ruolo</dt>
                                <dd className="col-sm-8">Amministratore</dd>

                                <dt className="col-sm-4">Registrato il</dt>
                                <dd className="col-sm-8">17 luglio 2025</dd>

                                <dt className="col-sm-4">Stato</dt>
                                <dd className="col-sm-8">Attivo</dd>
                            </dl>

                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-outline-primary">Modifica</button>
                                <button className="btn btn-outline-danger">Disattiva</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default User;
