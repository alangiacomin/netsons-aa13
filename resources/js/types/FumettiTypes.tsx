export type IFumetto = {
    Id: number;
    Numero: number;
    Titolo: string;
    DataPubblicazione: string | undefined;
    DataEsatta: boolean;
}

export type ITexUfficiale = {
    Numero: number;
    Titolo: string;
    MesePubblicazione: string;
    Anno: number;
}
