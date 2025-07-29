import {useContext} from "react";
import {MainContext} from "../MainProvider.tsx";

const useAuth = () => {
    const ctx = useContext(MainContext);
    if (!ctx) throw new Error('useAuth deve essere usato dentro <MainProvider>');
    return ctx;
};

export default useAuth;
