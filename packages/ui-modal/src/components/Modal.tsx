import {
    Children,
    isValidElement,
    ReactElement,
    ReactPortal,
    useEffect,
    useMemo,
    useRef
} from "react";
import {createPortal} from "react-dom";
import {ModalBody} from "./ModalBody";
import {findChildren} from "../utils/find-children";
import {createFallbackHeader} from "../utils/create-fallback-header";
import {createFallbackFooter} from "../utils/create-fallback-footer";
import {createModalClasses} from "../utils/create-modal-classes";
import {ModalFooter} from "./ModalFooter";
import {ModalHeader} from "./ModalHeader";
import {ModalComponent, ModalProps} from "../types";
import {createFallbackBody} from "../utils/create-fallback-body";
import {isModalForm} from "../utils/is-modal-form";

export const Modal: ModalComponent = ({
    show = false,
    close,
    children,
    portalTarget = '#modal-root',
    className,
    style,
    title,
    subtitle,
    showClose = true,
    closeOnEsc = true,
    closeOnBackdrop = true,
    actions,
    size = 'md',
}: ModalProps): ReactPortal | null => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const classes: string = createModalClasses({size, className});

    let { header, body, footer } = findChildren(children);
    const modalForm = Children.toArray(children).find(
        child => isValidElement(child) && isModalForm(child)
    ) as ReactElement | undefined;

    if (!header && (title || subtitle || showClose)) header = createFallbackHeader({ title, subtitle, showClose, close });
    if (!body && !modalForm) body = createFallbackBody({children});
    if (!footer && (actions?.length || showClose)) footer = createFallbackFooter({actions, showClose, close});

    const target = useMemo(() => {
        if (typeof portalTarget === "string") {
            return document.querySelector(portalTarget) ?? document.body;
        }

        return portalTarget ?? document.body;
    }, [portalTarget]);

    useEffect(() => {
        if (!show || !closeOnEsc) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") close?.();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [show, close, closeOnEsc]);

    useEffect(() => { if (show) { dialogRef.current?.focus(); } }, [show]);

    if (!show) return null;

    return createPortal(
        <div className="modal" onClick={() => closeOnBackdrop && close?.()}>
            <div
                ref={dialogRef}
                className={`modal__dialog${classes ? ` ${classes}` : ''}`}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                style={style}
                onClick={e => e.stopPropagation()}
            >
                {header}
                {modalForm
                    ? children
                    : (
                        <>
                            {body}
                            {footer}
                        </>
                    )}
            </div>
        </div>
    , target)
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;