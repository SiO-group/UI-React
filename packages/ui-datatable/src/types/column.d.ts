import {CSSProperties} from "react";

export interface Column<T extends { id: number | string }> {
    name: keyof T;
    label: string;
    className?: string;
    style?: CSSProperties;
    sort?: boolean;
    format?: 'boolean' | 'button' | 'datetime' | 'date' | 'pill' | 'email' | { key: string };
}