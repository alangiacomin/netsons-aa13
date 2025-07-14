import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {UserApi} from "./api";
import axios from 'axios';

export interface IUser {
    id: string;
    email: string;
    name: string;
}

interface IMainContext {
    loading: boolean;
    user: IUser | null;
    setUser: (u: IUser | null) => void;
}

const MainContext = createContext<IMainContext | undefined>(undefined);

type ProviderProps = {
    children: ReactNode;
}

const SplashScreen = () => {
    return (<div className={"splashscreen"}>... sto caricando il sito...</div>);
}

const MainProvider: FC<ProviderProps> = ({children}: ProviderProps): ReactNode => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie');
    }

    // Recupero tutte le info dallo storage, utili per avere l'app "pronta" appena arriva l'utente
    // Questo è comodo se BE non risponde, così sfrutta le info offline
    // Al momento c'è solo lo user, ma in futuro si può aumentare
    useEffect(() => {
        const userCached = localStorage.getItem('auth_user');
        if (userCached) {
            setUser(JSON.parse(userCached) as IUser);
        }
    }, []);

    const appPronta = () => {

        //setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 0);
    };

    // Aggiornamento tramite BE dell'utente veramente connesso
    useEffect(() => {
        csrf()
            .then(() => {
                UserApi.get()
                    .then((res: any) => {
                        setUser(res as IUser);
                    })
                    .finally(() => {
                        appPronta();
                    })
            })
            .catch(() => {
                appPronta();
            });
    }, []);

    // Salva in localStorage le info aggiornate
    useEffect(() => {
        if (user) {
            localStorage.setItem('auth_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('auth_user');
        }
    }, [user]);

    useEffect(() => {
        console.log('provider user:', user);
    }, [user]);

    return (
        <MainContext.Provider value={{user, setUser, loading}}>
            {loading ? <SplashScreen/> : children}
        </MainContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(MainContext);
    if (!ctx) throw new Error('useAuth deve essere usato dentro <MainProvider>');
    return ctx;
};


export default MainProvider;
