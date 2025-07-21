import {FC, ReactNode, useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {UserApi} from "../../../api";
import {IUser, useAuth} from "../../../MainProvider.tsx";

type UserProps = {
    //user?: IUser,
};

const User: FC<UserProps> = ({}: UserProps): ReactNode => {
    const userId = useLoaderData();
    const {user} = useAuth();
    const [userData, setUserData] = useState<IUser | null>(null);

    useEffect(() => {
        console.log("userId:", userId, user?.id);
        if (userId) {
            if (userId === user?.id) {
                setUserData(user);
            } else {
                setUserData(null);
                UserApi.get(userId)
                    .then((res: any) => {
                        setUserData(res);
                    })
                    .catch(() => {
                        setUserData(null);
                    });
            }
        }
    }, [userId]);

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
                                    <h5 className="card-title mb-0">{userData?.name}</h5>
                                    <small className="text-muted">{userData?.email}</small>
                                </div>
                            </div>

                            <hr/>

                            <dl className="row mb-0">
                                <dt className="col-sm-4">Username</dt>
                                <dd className="col-sm-8">{userData?.name}</dd>

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
