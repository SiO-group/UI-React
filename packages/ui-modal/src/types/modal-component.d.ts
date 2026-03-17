import {FC} from "react";
import {ModalHeader} from "../components/ModalHeader";
import {ModalBody} from "../components/ModalBody";
import {ModalFooter} from "../components/ModalFooter";
import {ModalProps} from "./modal-props";

export type ModalComponent = FC<ModalProps> & {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
    Footer: typeof ModalFooter;
};