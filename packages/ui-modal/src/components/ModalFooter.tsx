import React from "react";
import type {FooterProps} from "../types";
import {MODAL_FOOTER} from "../types";

export const ModalFooter = ({children}: FooterProps) => (
    <div className="modal__footer">
        {children}
    </div>
);

(ModalFooter as any).$$type = MODAL_FOOTER;