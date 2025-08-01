import {useCallback} from "react";

const mesiItaliani = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
];

function pad(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
}

const useDate = () => {
    // Da anno + mese testuale + giorno -> data aaaa-mm-gg
    const getDateString = useCallback(
        (anno: number, mese: string, giorno: number) => {
            const indexMese = mesiItaliani.indexOf(mese.toLowerCase());
            if (indexMese === -1) {
                throw new Error("Mese non valido");
            }
            const mm = pad(indexMese + 1);
            const gg = pad(giorno);
            return `${anno}-${mm}-${gg}`;
        },
        []
    );

    // Da data aaaa-mm-gg -> mese testuale italiano
    const getMeseTestuale = useCallback((data: string) => {
        const parts = data.split("-");
        if (parts.length !== 3) {
            throw new Error("Formato data non valido");
        }
        const mm = parseInt(parts[1], 10);
        if (mm < 1 || mm > 12) {
            throw new Error("Mese non valido nella data");
        }
        return mesiItaliani[mm - 1];
    }, []);

    return {getDateString, getMeseTestuale};
}


export default useDate;
