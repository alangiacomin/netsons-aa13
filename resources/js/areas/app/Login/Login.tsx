import {ChangeEvent, FC, FormEvent, ReactNode, useState} from "react";
import Section from "../../../components/Section";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserApi} from "../../../api";
import classNames from "classnames";
import FieldError from "./FieldError";
import {useAuth} from "../../../MainProvider.tsx";
import {routes} from "../routes.tsx";

type ErrorsType = {
    email?: string[],
    password?: string[]
}

interface LoginProps {
    redirectTo?: string;
}

const Login: FC<LoginProps> = ({redirectTo}: LoginProps): ReactNode => {
    // Stato locale per gestire i dati dell’utente
    const [credenziali, setCredenziali] = useState({
        email: 'admin@example.com',
        password: 'password123',
    });
    const [errors, setErrors] = useState<ErrorsType | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const {user, setUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = (location.state as { from?: Location })?.from || redirectTo || {pathname: routes.root.path};
    console.log('from:', from);


    // Gestore generico per ambedue i campi
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredenziali((prev) => ({...prev, [name]: value}));
    };

    // Qui potresti chiamare la tua API di autenticazione
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(null);
        setIsFetching(true);
        UserApi.login(credenziali)
            .then((res: any) => {
                setUser(res);
                navigate(from, {replace: true});

            })
            .catch((err: any) => {
                setErrors(err.body.errors);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };


    return (
        <Section title={"titolo login"} subtitle={"sottotitolo login"}>
            <div className={"login"}>
                <form className="box" style={{maxWidth: 460, margin: 'auto'}} onSubmit={onSubmit}>
                    <h1 className="title is-4 has-text-centered">Accedi</h1>

                    {/* Campo e-mail */}
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="email"
                                type="text"
                                name="email"
                                placeholder="tuo@email.com"
                                value={credenziali.email}
                                onChange={onChange}
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </span>
                        </div>
                        <FieldError errors={errors?.email}/>
                    </div>

                    {/* Campo password */}
                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={credenziali.password}
                                onChange={onChange}
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faLock}/>
                            </span>
                        </div>
                        <FieldError errors={errors?.password}/>
                    </div>

                    {/* Pulsante submit */}
                    <div className="field">
                        <button
                            className={classNames(["button", "is-primary", "is-fullwidth", {"is-loading": isFetching}])}
                            disabled={!!user}>
                            Entra
                        </button>
                    </div>

                    {/* Invito alla registrazione */}
                    <p className="has-text-centered is-size-7 mt-3">
                        Nuovo su questo sito?{' '}
                        <Link to="/register" className="has-text-link">
                            Crea un account
                        </Link>
                    </p>
                </form>
            </div>
        </Section>);
};

export default Login;
