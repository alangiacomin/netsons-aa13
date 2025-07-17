import {useEffect, useState} from "react";
import {useAuth} from "../../MainProvider.tsx";

const DebugData = () => {
    const [debug, setDebug] = useState<boolean | null>(true);
    const {user} = useAuth();

    useEffect(() => {
        const cached = sessionStorage.getItem('debug') as boolean | null;
        if (cached) {
            setDebug(cached);
        }
    }, []);

    useEffect(() => {
        if (debug) {
            sessionStorage.setItem('debug', JSON.stringify(true));
        } else {
            if (debug === false) {
                sessionStorage.removeItem('debug');
            }
        }
    }, [debug]);

    return debug ? (
        <div className={"debug-data"}>
            <button className={"btn btn-link small"} onClick={() => setDebug(false)}>Chiudi</button>
            <p>User: {user?.name}</p>
        </div>
    ) : <button className={"btn btn-link small"} onClick={() => setDebug(true)}>Debug</button>;
}

export default DebugData;
