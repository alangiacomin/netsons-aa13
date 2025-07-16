import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {UserApi} from "./api";

export interface IUser {
    id: string;
    email: string;
    name: string;
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

    // Recupero tutte le info dallo storage, utili per avere l'app "pronta" appena arriva l'utente
    // Questo è comodo se BE non risponde, così sfrutta le info offline
    // Al momento c'è solo lo user, ma in futuro si può aumentare
    useEffect(() => {
        const userCached = sessionStorage.getItem('auth_user');
        if (userCached) {
            setUser(JSON.parse(userCached) as IUser);
        }
        setReady(true);
    }, []);


    // Aggiornamento tramite BE dell'utente veramente connesso
    useEffect(() => {
        UserApi.get()
            .then((res: any) => {
                setUser(res as IUser);
            });
    }, []);

    // Salva in localStorage le info aggiornate
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('auth_user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('auth_user');
        }
    }, [user]);

    return (
        <MainContext.Provider value={{user, setUser}}>
            {ready && children}
        </MainContext.Provider>
    );
};


export const useAuth = () => {
    const ctx = useContext(MainContext);
    if (!ctx) throw new Error('useAuth deve essere usato dentro <MainProvider>');
    return ctx;
};


export default MainProvider;
