import {ModalHeader} from "../components/ModalHeader";
import {FallbackHeaderProps} from "../types";

export const createFallbackHeader = ({ title, subtitle, showClose, close }: FallbackHeaderProps) => {
    return (
        <ModalHeader showClose={showClose} close={close}>
            <h2>{title ? title : "Modal window"}</h2>
            {subtitle ? <h3>{subtitle}</h3> : null}
        </ModalHeader>
    )
}