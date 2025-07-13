import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

export interface IUser {
    id: string;
    email: string;
    name: string;
    token: string;          // se ti torna un JWT o simile
}

interface IAuthContext {
    user: IUser | null;
    setUser: (u: IUser | null) => void;
    //login: (u: IUser) => void;
    //logout: () => void;
    loading: boolean;       // utile se devi aspettare il refresh di un token
}

const MainContext = createContext<IAuthContext | undefined>(undefined);

interface Props {
    children: ReactNode;          // ciò che vuoi proteggere (es. <Fumetti />)
}

const MainProvider: FC<Props> = ({children}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    // On mount: prova a recuperare l’utente dal localStorage (persistenza semplice)
    useEffect(() => {
        const raw = localStorage.getItem('auth_user');
        if (raw) {
            setUser(JSON.parse(raw) as IUser);
        }
        setLoading(false);
    }, []);

    // Salva in localStorage ad ogni variazione
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

    /* funzioni esposte */
    // const login = (u: IUser) => setUser(u);
    // const logout = () => setUser(null);

    return (
        <MainContext.Provider value={{user, setUser, loading}}>
            {children}
        </MainContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(MainContext);
    if (!ctx) throw new Error('useAuth deve essere usato dentro <MainProvider>');
    return ctx;
};


export default MainProvider;
