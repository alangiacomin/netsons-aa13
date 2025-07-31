import {FC, ReactNode} from "react";
import useAuth from "../hooks/useAuth.tsx";

type SectionProps = {
    id: string;
    children?: ReactNode;
    fallbackLogin?: ReactNode;
    fallbackUnauthorized?: ReactNode;
}

const Section: FC<SectionProps> = ({id, children, fallbackLogin, fallbackUnauthorized}: SectionProps): ReactNode => {

    const {user} = useAuth();

    if (user && user.can('section-' + id)) {
        return (
            <>
                <h1 className="title">Titolo</h1>
                <h2 className="subtitle">{id}</h2>
                {children}
            </>);
    }


    if (!user) {
        return (<>{fallbackLogin}</>);
    }

    return (<>{fallbackUnauthorized}</>);
}


export default Section;
