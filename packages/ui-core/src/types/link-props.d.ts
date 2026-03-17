import React from "react";
import {BaseUiProps} from "./base-ui-props";

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'color'> &
    BaseUiProps & {
    to: string;
    navigate?: (to: string) => void;
    external?: boolean;
    onClick?: (e: React.MouseEvent) => void;
};