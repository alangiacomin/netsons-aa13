import {Outlet, useMatches} from "react-router-dom";
import {ReactNode} from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Section from "../../components/Section.tsx";
import Login from "./Login/Login.tsx";

// import Login from "./Login/Login.tsx";


interface CustomHandle {
    sectionId?: string;
}


const Layout = (): ReactNode => {
    const matches = useMatches();
    const lastMatch = matches[matches.length - 1];
    const sectionId = (lastMatch?.handle as CustomHandle)?.sectionId;
    console.log("lastMatch", lastMatch);
    console.log("sectionId", sectionId);


    const fallbackLogin =
        <Login redirectTo={location.pathname}/>
    ;

    const fallbackUnauthorized =
        <div className="py-3 my-4 border-top">
            <p className="text-center text-body-secondary">!! NON SEI AUTORIZZATO !!</p>
        </div>
    ;


    // Prepara l'outlet con o senza Section wrapper
    const content = sectionId
        ? <Section id={sectionId} fallbackLogin={fallbackLogin} fallbackUnauthorized={fallbackUnauthorized}>
            <Outlet/>
        </Section>
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
