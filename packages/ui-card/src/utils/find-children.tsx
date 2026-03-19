import React from "react";
import {isComponentType} from "./component-type";
import {CARD_BODY, CARD_FOOTER, CARD_HEADER} from "../types";

export const findChildren = (children: React.ReactNode): {header: React.JSX.Element | null, footer: React.JSX.Element | null, body: React.JSX.Element | null} => {
    let header = null;
    let body = null;
    let footer = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (isComponentType(child, CARD_HEADER)) header = child;
        if (isComponentType(child, CARD_BODY)) body = child;
        if (isComponentType(child, CARD_FOOTER)) footer = child;
    });

    return { header, body, footer }
}
