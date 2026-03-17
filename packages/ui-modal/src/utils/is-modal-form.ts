import React from "react";
import {Modal} from "../components/Modal";
import {MODAL_BODY, MODAL_FOOTER} from "../types";

export const isModalForm = (element: React.ReactElement): boolean => {
    const type = element.type as any;
    const isForm: boolean = type.displayName === 'Form' || type.name === 'Form';
    if (!isForm) return false;

    const { container, buttonContainer } = element.props as any;

    const usesModalBody: boolean = container === Modal.Body || (container?.type?.$$type === MODAL_BODY);
    const usesModalFooter: boolean = buttonContainer === Modal.Footer || (buttonContainer?.type?.$$type === MODAL_FOOTER);

    return (usesModalBody || usesModalFooter);
};