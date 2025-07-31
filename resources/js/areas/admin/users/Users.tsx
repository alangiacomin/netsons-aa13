import {ReactNode, useCallback, useEffect, useState} from "react";
import {UserApi} from "../../../api";
import {faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth.tsx";
import {IUser} from "../../../types/UserTypes.tsx";

const Users = (): ReactNode => {
    const [users, setUsers] = useState<Partial<IUser>[] | null>(null)
    const {user} = useAuth();

    const loadUsers = useCallback(() => {
        UserApi.list().then((res) => {
            setUsers(res.map(u => ({
                id: u.id,
                email: u.email,
                name: u.name
            })));
        });
    }, []);


    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const creaNuovo = useCallback(() => {
        UserApi.store({name: "nome", email: "test_" + Math.random().toString(36).substring(2, 5) + "@example.com"})
            .then((res) => {
                setUsers([...(users ?? []), {
                    id: res.id ?? 0,
                    email: res.email ?? "",
                    name: res.name ?? ""
                }]);
                loadUsers();
            });
    }, [loadUsers, users]);

    const deleteUser = useCallback((id: number) => {
        UserApi.destroy(id)
            .then(() => {
                setUsers((users ?? []).filter((u) => u.id !== id));
                loadUsers();
            });
    }, [loadUsers, users]);

    return (
        <div className={"container"}>
            <h2>Utenti</h2>
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
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th/>
                </tr>
                </thead>
                <tbody className={"table-group-divider"}>
                {!users && (
                    <tr className={"text-center"}>
                        <td colSpan={4} className={"py-3"}>... loading ...</td>
                    </tr>)}
                {users && users.length == 0 && (
                    <tr className={"text-center"}>
                        <td colSpan={4} className={"py-3"}>Trovato nulla</td>
                    </tr>)}
                {users && users.map((u) => (
                    <tr key={u.id}>
                        <th scope="row">{u.id}</th>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                            <button className="btn btn-link btn-sm"><FontAwesomeIcon icon={faPen}/></button>
                            <button className="btn btn-link btn-sm" disabled={!user || user.id === u.id}
                                    onClick={() => {
                                        if (u.id) {
                                            deleteUser(u.id)
                                        }
                                    }}>
                                <FontAwesomeIcon icon={faTrashCan}/></button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
};

export default Users;
