import React from "react";

export type ButtonType = 'button' | 'submit' | 'reset';
export type Variant = 'primary' | 'secondary' | 'link';
export type Color = 'default' | 'error' | 'success' | 'warning' | 'caution' | 'info';
export type Size = 'sm' | 'md' | 'lg';

export type BaseUiProps = {
    variant?: Variant;
    label?: string | React.ReactNode;
    color?: Color;
    size?: Size;
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    ariaHaspopup?: boolean | "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog";
    style?: React.CSSProperties;
    children?: React.ReactNode;
};