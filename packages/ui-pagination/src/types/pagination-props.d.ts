import {CSSProperties} from "react";

export interface PaginationProps {
    from: number;
    to: number;
    total: number;
    pageCount: number;
    currentPage: number;
    onPaginate: (page: number) => void;
    windowSize?: number;
    className?: string;
    style?: CSSProperties;
}