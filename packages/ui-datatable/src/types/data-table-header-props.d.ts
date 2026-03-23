import {Column} from "./column";
import {SortDirection, SortState} from "./sort-state";
import {ReactNode} from "react";

export interface DataTableHeaderProps<T extends { id: string | number }>{
    columns: Column<T>[];
    onSort: (sort: SortState | null) => void;
    sortValue?: SortState | null;
    hasActionMenu: boolean;
    renderSortIcon?: (direction: SortDirection, active: boolean) => ReactNode,
}