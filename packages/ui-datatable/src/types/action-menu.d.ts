import {ReactNode} from "react";

export type ActionMenuType = 'inline' | 'dropdown';

export interface Action <T extends { id: string | number }> {
    name: string;
    label: string;
    icon?: ReactNode;
    onClick: (item: T) => void
}

export interface ActionMenu <T extends { id: string | number }> {
    type: ActionMenuType;
    actions: Action<T>[];
}