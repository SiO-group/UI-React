import React from "react";
import {BaseUiProps, ButtonType} from "./base-ui-props";

export type ButtonProps = BaseUiProps & {
    type?: ButtonType;
    onClick?: (e: React.MouseEvent) => void;
};