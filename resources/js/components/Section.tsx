import {FC, ReactNode} from "react";

interface SectionProps {
    title: string;
    subtitle: string;
    children?: ReactNode;
    className?: string;
}

const Section: FC<SectionProps> = ({title, subtitle, children}: SectionProps): ReactNode => {
    return (
        <>
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
            {children}
        </>);
}


export default Section;
