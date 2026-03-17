import React from "react";
import type {HeaderProps} from "../types";
import {MODAL_HEADER} from "../types";

export const ModalHeader = ({children, showClose = true, close}: HeaderProps) => (
    <div className="modal__header">
        {children}

        {showClose ? (
            <button onClick={close} aria-label="sluiten">
                &#215;
            </button>
        ) : null}
    </div>
);

(ModalHeader as any).$$type = MODAL_HEADER;