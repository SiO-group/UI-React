import {Children, isValidElement} from "react";
import {FallbackBodyProps} from "../types/fallback-props";
import {ModalBody} from "../components/ModalBody";
import {ModalHeader} from "../components/ModalHeader";
import {ModalFooter} from "../components/ModalFooter";

export const createFallbackBody = ({children}: FallbackBodyProps) => {
    const body = Children.toArray(children).filter((child) => {
        if (!isValidElement(child)) return true;
        return child.type !== ModalHeader && child.type !== ModalFooter
    })

    return (
        <ModalBody>
            {body}
        </ModalBody>
    )
}