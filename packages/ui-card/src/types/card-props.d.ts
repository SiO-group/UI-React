import {CSSProperties, ReactNode} from "react";
import type {ButtonProps, LinkProps} from "@sio-group/ui-core";

export interface CardProps {
    title?: string,
    subtitle?: string,
    addShadow?: boolean,
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
    actions?: (ButtonProps | LinkProps)[],
}

export interface HeaderProps {
    children: ReactNode
}

export interface BodyProps {
    children: ReactNode
}

export interface FooterProps {
    children: ReactNode
}