import {FC} from "react";

interface FieldErrorProps {
    errors?: string[] | undefined;
}

const FieldError: FC<FieldErrorProps> = ({errors}) =>
    (<>
        {errors?.map((e, i) => <div key={i} className={"is-size-7 has-text-warning"}>{e}</div>)}
    </>);

export default FieldError;
