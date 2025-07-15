import {ChangeEvent, FC, FormEvent, ReactNode, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faEnvelope, faLock, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserApi} from "../../../api";
import classNames from "classnames";
import FieldError from "./FieldError";
import {useAuth} from "../../../MainProvider.tsx";
import {routes} from "../routes.tsx";
import './Login.css';

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

    // Gestore generico per ambedue i campi
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredenziali((prev) => ({...prev, [name]: value}));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //setErrors(null);
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
        <form onSubmit={onSubmit} className="mt-5">
            <div className={"row justify-content-center"}>
                <div className={"col-12 col-md-6 col-lg-4"}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope}/></span>
                            <input
                                className={classNames(
                                    "form-control",
                                    {"is-invalid": !!errors?.email}
                                )}
                                id="email"
                                type="text"
                                name="email"
                                placeholder="tuo@email.com"
                                value={credenziali.email}
                                onChange={onChange}
                            />
                        </div>
                        <FieldError errors={errors?.email}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                            <input
                                className={classNames(
                                    "form-control",
                                    {"is-invalid": !!errors?.password}
                                )}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={credenziali.password}
                                onChange={onChange}
                            />
                        </div>
                        <FieldError errors={errors?.password}/>
                    </div>

                    <button
                        type={"submit"}
                        className={classNames(
                            "btn btn-primary",
                            "d-block mx-auto w-50")}
                        disabled={isFetching || !!user}>
                        {isFetching ? (<FontAwesomeIcon icon={faSpinner}/>) : "Entra"}
                    </button>
                    <p className="mt-3 small text-center">
                        Nuovo su questo sito?{' '}
                        <Link to="/register" className="has-text-link">
                            Crea un account
                        </Link>
                    </p>
                </div>
            </div>
        </form>);
};

export default Login;
