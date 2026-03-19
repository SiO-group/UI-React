import {Children, isValidElement} from "react";
import {FallbackBodyProps} from "../types";
import {CardBody} from "../components/CardBody";
import {CardHeader} from "../components/CardHeader";

export const createFallbackBody = ({children}: FallbackBodyProps) => {
    const body = Children.toArray(children).filter((child) => {
        if (!isValidElement(child)) return true;
        return child.type !== CardHeader
    })

    return (
        <CardBody>
            {body}
        </CardBody>
    )
}