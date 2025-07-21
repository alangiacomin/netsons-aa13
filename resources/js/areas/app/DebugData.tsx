import {useEffect, useState} from "react";
import {useAuth} from "../../MainProvider.tsx";

const DebugData = () => {
    const [debug, setDebug] = useState<boolean | null>(null);
    const {user} = useAuth();

    useEffect(() => {
        const cached = sessionStorage.getItem('debug');
        setDebug(cached !== null
            ? JSON.parse(cached) as boolean
            : false);
    }, []);

    useEffect(() => {
        if (debug !== null) {
            sessionStorage.setItem('debug', JSON.stringify(debug));
        }
    }, [debug]);

    return debug !== null && (debug ? (
        <div className={"debug-data m-5"}>
            <button className={"btn btn-link small"} onClick={() => setDebug(false)}>Chiudi</button>
            <p>User: {user?.name}</p>
        </div>
    ) : <button className={"btn btn-link small"} onClick={() => setDebug(true)}>Debug</button>);
}

export default DebugData;
