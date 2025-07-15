// Register.tsx
// Piccolo form di registrazione utente con Bulma e React

import {ReactNode, useState} from 'react';
import Section from '../../../components/Section.tsx';
import './Login.css'; // ri-usa lo stesso SCSS del login
import {Link} from 'react-router-dom';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Register = (): ReactNode => {
    // Stato locale per i campi del form
    const [dati, setDati] = useState({
        nome: '',
        email: '',
        password: '',
        conferma: '',
    });

    // Gestore unico dei cambiamenti
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDati(prev => ({...prev, [name]: value}));
    };

    // Invio del form
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validazioni rapide di esempio
        if (dati.password !== dati.conferma) {
            alert('Le password non coincidono');
            return;
        }

        console.log('Invio dati di registrazione:', dati);
        /*
          TODO:
          1. Valida in modo più robusto (password forte, email valida, ecc.)
          2. Effettua chiamata all’API di registrazione (fetch/axios)
          3. Gestisci risposta (successo o errori server-side)
        */
    };

    return (
        <Section title="titolo registrazione" subtitle="sottotitolo registrazione">
            <div className="login">
                <form
                    className="box"
                    onSubmit={onSubmit}
                >
                    <h1 className="title is-4 has-text-centered">Crea un account</h1>

                    {/* Nome utente */}
                    <div className="field">
                        <label className="label" htmlFor="nome">
                            Nome
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="nome"
                                type="text"
                                name="nome"
                                placeholder="Mario Rossi"
                                value={dati.nome}
                                onChange={onChange}
                                required
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser}/>
                              </span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="field">
                        <label className="label" htmlFor="email">
                            Email
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tuo@email.com"
                                value={dati.email}
                                onChange={onChange}
                                required
                            />
                            <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope}/>
              </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="field">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={dati.password}
                                onChange={onChange}
                                required
                            />
                            <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock}/>
              </span>
                        </div>
                    </div>

                    {/* Conferma password */}
                    <div className="field">
                        <label className="label" htmlFor="conferma">
                            Conferma Password
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                id="conferma"
                                type="password"
                                name="conferma"
                                placeholder="••••••••"
                                value={dati.conferma}
                                onChange={onChange}
                                required
                            />
                            <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock}/>
              </span>
                        </div>
                    </div>

                    {/* Pulsante submit */}
                    <div className="field">
                        <button className="button is-primary is-fullwidth">
                            Registrati
                        </button>
                    </div>

                    {/* Link al login */}
                    <p className="has-text-centered is-size-7 mt-3">
                        Hai già un account?{' '}
                        <Link to="/login" className="has-text-link">
                            Accedi qui
                        </Link>
                    </p>
                </form>
            </div>
        </Section>
    );
};

export default Register;
