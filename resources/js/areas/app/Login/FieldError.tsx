import {FC} from "react";

interface FieldErrorProps {
    errors?: string[] | undefined;
}

const FieldError: FC<FieldErrorProps> = ({errors}) =>
    (<div className={"small text-danger"}>
        {errors?.map((e, i) => <div key={i}>{e}</div>)}
    </div>);

export default FieldError;
