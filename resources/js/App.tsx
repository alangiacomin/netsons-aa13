import {useEffect, useState} from "react";
import MainContext from "./MainContext";
import Router from "./Router.tsx";
import axios from "axios";

const App = () => {
    const [ready, setReady] = useState<boolean>(false);

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie');   // <-- basta una volta per tab
    }

    useEffect(() => {
        csrf().then(() => {
            setReady(true);
        });
    }, []);

    return ready && (
        <MainContext.Provider value={{}}>
            <Router/>
        </MainContext.Provider>
    );
}


export default App;
