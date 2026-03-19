import React from "react";
import {Card} from "../components/Card";
import {CARD_BODY, CARD_FOOTER} from "../types";

export const isCardForm = (element: React.ReactElement): boolean => {
    const type = element.type as any;
    const isForm: boolean = type.displayName === 'Form' || type.name === 'Form';
    if (!isForm) return false;

    const { container, buttonContainer } = element.props as any;

    const usesModalBody: boolean = container === Card.Body || (container?.type?.$$type === CARD_BODY);
    const usesModalFooter: boolean = buttonContainer === Card.Footer || (buttonContainer?.type?.$$type === CARD_FOOTER);

    return (usesModalBody || usesModalFooter);
};