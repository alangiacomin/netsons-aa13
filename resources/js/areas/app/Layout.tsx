import {Outlet} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";

const Layout = (): ReactNode => {
    return (<>
        <section className="hero is-small">
            <div className={"container"}>
                <div className="hero-body">
                    <p className="title">Hero title</p>
                    <p className="subtitle">Hero subtitle</p>
                </div>
            </div>
        </section>
        <section className="section">
            <div className={"container"}>
                <Navbar/>
            </div>
        </section>
        <section className="section">
            <div className={"container"}>
                <Outlet/>
            </div>
        </section>
        <footer className="footer">
            <div className={"container"}>
                <div className="content has-text-centered">
                    <p>
                        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>.
                        The source code is
                        licensed <a href="https://opensource.org/license/mit">MIT</a>.
                        The website content is
                        licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0//">CC BY NC SA 4.0</a>.
                    </p>
                </div>
            </div>
        </footer>
    </>);
}

export default Layout;
