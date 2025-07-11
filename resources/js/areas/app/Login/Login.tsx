import {ReactNode} from "react";
import Section from "../../../components/Section.tsx";
import './Login.scss';

const Login = (): ReactNode => (
    <Section title={"titolo login"} subtitle={"sottotitolo login"}>
        <div className={"login"}>
            Corpo del login
        </div>
    </Section>);

export default Login;
