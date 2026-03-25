import {Modal} from "./Modal";
import {ConfirmationProps} from "../types";

export const Confirmation = ({
    show,
    onCancel,
    onConfirm,
    portalTarget,
    title,
    subtitle,
    body,
    confirmLabel = 'Bevestig',
    cancelLabel = 'Annuleer',
    confirmColor = 'error',
    cancelColor = 'default',
}: ConfirmationProps) => {
    return (
        <Modal
            show={show}
            close={onCancel}
            portalTarget={portalTarget}
            showClose={false}
            closeOnEsc={false}
            closeOnBackdrop={false}
            actions={[
                { type: 'button', color: cancelColor, className: "btn-block", onClick: onCancel, label: cancelLabel },
                { type: 'button', color: confirmColor, className: "btn-block", onClick: onConfirm, label: confirmLabel },
            ]}
            size="sm"
            className="confirmation"
            subtitle={subtitle}
            title={title}
        >
            {body}
        </Modal>
    )
}