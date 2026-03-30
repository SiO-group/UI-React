import React from "react";
import {Modal} from "../components/Modal";
import {MODAL_BODY, MODAL_FOOTER} from "../types";

export const isModalForm = (element: React.ReactElement): boolean => {
    const type = element.type as any;
    const isForm: boolean = type.displayName === 'Form' || type.name === 'Form';
    if (!isForm) return false;

    const { container, buttonContainer } = element.props as any;

    const usesBody: boolean = usesModalBody(container);
    const usesFooter: boolean = usesModalFooter(buttonContainer);

    return (usesBody || usesFooter);
};

const usesModalBody = (container: any): boolean => {
    if (!container) return false;

    if (container === Modal.Body || container?.type?.$$type === MODAL_BODY) return true;

    if (typeof container === 'function') {
        const funcStr: string = container.toString();
        return funcStr.includes('Modal.Body') || funcStr.includes('ModalBody');
    }

    return false
}

const usesModalFooter = (container: any): boolean => {
    if (!container) return false;

    if (container === Modal.Footer || container?.type?.$$type === MODAL_FOOTER) return true;

    if (typeof container === 'function') {
        const funcStr: string = container.toString();
        return funcStr.includes('Modal.Footer') || funcStr.includes('ModalFooter');
    }

    return false
}