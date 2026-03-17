import {CSSProperties, ReactNode} from "react";
import type {LinkProps, ButtonProps} from "@sio-group/ui-core";

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