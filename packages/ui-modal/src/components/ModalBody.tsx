import type {BodyProps} from "../types";
import {MODAL_BODY} from "../types";
import {FC, ReactNode} from "react";

export const ModalBody: FC<{children: ReactNode}> = ({children}: BodyProps) => (
    <div className="modal__body">{children}</div>
);

(ModalBody as any).$$type = MODAL_BODY;