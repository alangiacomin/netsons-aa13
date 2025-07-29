import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth.tsx";


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
    return (
        <div className="debug-data position-fixed bottom-0 start-0 w-100 border-top p-3">
            {debug !== null && (
                <div className="d-flex justify-content-between align-items-start">
                    {debug ? (
                        <>
                            <div>
                                <div>User: {user?.name}</div>
                            </div>
                            <button className="btn btn-link" onClick={() => setDebug(false)}>
                                <span className="small">Chiudi</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div></div>
                            {/* placeholder per la sinistra */}
                            <button className="btn btn-link" onClick={() => setDebug(true)}>
                                <span className="small">Debug</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default DebugData;
