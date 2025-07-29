import {Outlet, useMatches} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Section from "../../components/Section.tsx";


const Layout = (): ReactNode => {
    const matches = useMatches();
    // Prende l'ultimo match, cioè la route attiva
    const lastMatch = matches[matches.length - 1];
    const sectionId = lastMatch?.handle?.sectionId;
    console.log("lastMatch", lastMatch);
    console.log("sectionId", sectionId);


    // Prepara l'outlet con o senza Section wrapper
    const content = sectionId
        ? <Section id={sectionId}><Outlet/></Section>
        : <Outlet/>;

    return (
        <div className="container">
            <Navbar/>
            <div className={"container-fluid"}>
                {content}
            </div>
            <footer className="py-3 my-4 border-top">
                <p className="text-center text-body-secondary">© 2025 Company, Inc</p>
            </footer>
        </div>
    );
}

export default Layout;
