import {useEffect, useState} from "react";
import {useAuth} from "../../MainProvider.tsx";

const DebugData = () => {
    const [debug, setDebug] = useState<boolean | null>(true);
    const {user} = useAuth();

    useEffect(() => {
        const cached = localStorage.getItem('debug') as boolean | null;
        if (cached) {
            setDebug(cached);
        }
    }, []);

    useEffect(() => {
        if (debug) {
            localStorage.setItem('debug', JSON.stringify(debug));
        } else {
            if (debug === false) {
                localStorage.removeItem('debug');
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
