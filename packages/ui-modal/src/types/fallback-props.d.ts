import {ReactNode} from "react";
import {ButtonProps, LinkProps} from "@sio-group/ui-core";

export interface FallbackHeaderProps {
    title?: string,
    subtitle?: string,
    showClose: boolean,
    close?: () => void
}

export interface FallbackBodyProps {
    children: ReactNode
}

export interface FallbackFooterProps {
    actions?: (ButtonProps | LinkProps)[]
    showClose?: boolean,
    close?: () => void,
}