import {useEffect, useState} from "react";
import MainProvider from "./MainProvider.tsx";
import Router from "./Router.tsx";

const App = () => {
    const [ready, setReady] = useState<boolean>(false);

    const csrf = async () => {
        // await axios.get('/sanctum/csrf-cookie');
    }
    useEffect(() => {
        csrf().then(() => {
            setReady(true);
        });
    }, []);

    return ready && (
        <MainProvider>
            <Router/>
        </MainProvider>
    );
}


export default App;
