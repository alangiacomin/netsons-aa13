import {FC, ReactNode} from "react";
import {useLocation} from "react-router-dom";
import Login from "../areas/app/Login/Login.tsx";
import useAuth from "../hooks/useAuth.tsx";

type SectionProps = {
    id: string;
    children?: ReactNode;
}

const Section: FC<SectionProps> = ({id, children}: SectionProps): ReactNode => {

    const {user} = useAuth();
    const location = useLocation();

    if (user && user.can('section-' + id)) {
        return (
            <>
                <h1 className="title">Titolo</h1>
                <h2 className="subtitle">{id}</h2>
                {children}
            </>);
    }


    if (!user) {
        return <Login redirectTo={location.pathname}/>;
    }

    return (
        <div>NON SEI AUTORIZZATO</div>
    )

}


export default Section;
