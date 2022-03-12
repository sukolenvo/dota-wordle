import {useAppSelector} from "../../app/hooks";
import {getResult} from "./heroSlice";

export function Result() {
    const result = useAppSelector(getResult)
    if (result === undefined) {
        return (<div></div>)
    }
    if (result === "win") {
        return (
            <div>
                <h1>Well done!</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Better luck next time!</h1>
        </div>
    )
}