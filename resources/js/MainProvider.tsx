import {createContext, FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {UserApi} from "./api";

export interface IUser {
    id: number;
    email: string;
    name: string;
    isSuperAdmin: boolean;
    permissions: string[];
    can: (p: string) => boolean;
}

interface IMainContext {
    user: IUser | null;
    setUser: (u: IUser | null) => void;
}

const MainContext = createContext<IMainContext | undefined>(undefined);

type ProviderProps = {
    children: ReactNode;
}

const MainProvider: FC<ProviderProps> = ({children}: ProviderProps): ReactNode => {
    const [ready, setReady] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    const buildUser = (raw: Partial<Omit<IUser, 'can'>>): IUser | null => {
        if (!raw) {
            return null;
        }

        return ({
            id: raw.id ?? 0,
            email: raw.email ?? '',
            name: raw.name ?? '',
            isSuperAdmin: raw.isSuperAdmin ?? false,
            permissions: raw.permissions ?? [],
            can: (perm: string) => (raw.isSuperAdmin ?? false) || (raw.permissions ?? []).includes(perm),
        });
    };

    const setBuildedUser = useCallback((u: IUser | null) => {
        setUser(!u ? u : buildUser(u as IUser));
    }, []);

    // Recupero tutte le info dallo storage, utili per avere l'app "pronta" appena arriva l'utente
    // Questo è comodo se BE non risponde, così sfrutta le info offline
    // Al momento c'è solo lo user, ma in futuro si può aumentare
    useEffect(() => {
        const userCached = sessionStorage.getItem('auth_user');
        if (userCached) {
            // setUser(JSON.parse(userCached) as IUser);
            const parsed = JSON.parse(userCached);
            setUser(buildUser(parsed));
        }
        setReady(true);
    }, []);

    // Aggiornamento tramite BE dell'utente veramente connesso
    useEffect(() => {
        UserApi.authenticated()
            .then((res: Partial<IUser>) => {
                //setUser(res as IUser);
                setUser(buildUser(res));
                console.log("user authenticated:", res);
            });
    }, []);

    // Salva in localStorage le info aggiornate
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('auth_user', JSON.stringify(user));
            console.log("USER", user);
        } else {
            sessionStorage.removeItem('auth_user');
            console.log("USER");
        }
    }, [user]);

    return (
        <MainContext.Provider value={{user, setUser: setBuildedUser}}>
            {ready && children}
        </MainContext.Provider>
    );
};

export default MainProvider;
export {MainContext};
