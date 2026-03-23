import React from "react";
import {isComponentType} from "./component-type";
import {MODAL_BODY, MODAL_FOOTER, MODAL_HEADER} from "../types";

export const findChildren = (children: React.ReactNode): {header: React.JSX.Element | null, footer: React.JSX.Element | null, body: React.JSX.Element | null} => {
    let header = null;
    let body = null;
    let footer = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (isComponentType(child, MODAL_HEADER)) header = child;
        if (isComponentType(child, MODAL_BODY)) body = child;
        if (isComponentType(child, MODAL_FOOTER)) footer = child;
    });

    return { header, body, footer }
}
