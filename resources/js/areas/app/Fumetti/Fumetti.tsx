import {ReactNode, useEffect} from "react";
import Section from "../../../components/Section.tsx";
import {FumettoApi} from "../../../api";

const Fumetti = (): ReactNode => {

    useEffect(() => {
        FumettoApi.list().then((res: any) => {
            console.log(res);
        });
    })

    return (
        <Section title={"titolo fumetti"} subtitle={"sottotitolo fumetti"}>
            Corpo dei fumetti
        </Section>);
};

export default Fumetti;
