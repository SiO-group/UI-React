import {CSSProperties, ReactNode} from "react";
import type {LinkProps, ButtonProps} from "@sio-group/ui-core";

export type Color = 'default' | 'error' | 'success' | 'warning';

export interface ModalProps {
    show: boolean,
    close: () => void,
    children?: ReactNode,
    portalTarget?: string | HTMLElement,
    className?: string,
    style?: CSSProperties,
    title?: string,
    subtitle?: string,
    showClose?: boolean,
    closeOnEsc?:  boolean,
    closeOnBackdrop?: boolean,
    actions?: (ButtonProps | LinkProps)[],
    size?: 'sm' | 'md' | 'lg',
}

export interface ConfirmationProps {
    show: boolean,
    onCancel,
    onConfirm,
    portalTarget?: string | HTMLElement,
    title?: string,
    subtitle?: string,
    body?: ReactNode,
    confirmLabel?: string,
    cancelLabel?: string,
    confirmColor?: Color,
    cancelColor?: Color,
}

export interface HeaderProps {
    showClose?: boolean,
    close?: () => void,
    children: ReactNode
}

export interface BodyProps {
    children: ReactNode
}

export interface FooterProps {
    children: ReactNode
}