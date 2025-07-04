import {useEffect, useState} from "react";
import MainContext from "./MainContext";
import Router from "./Router.tsx";

const App = () => {
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return ready && (
        <MainContext.Provider value={{}}>
            <Router/>
        </MainContext.Provider>
    );
}


export default App;
