import {CSSProperties, ReactNode} from "react";
import {SortDirection, SortState} from "./sort-state";
import {Column} from "./column";
import {Entity} from "./entity";
import {ActionMenu} from "./action-menu";
import {FormField} from "./form-field";
import {PaginationMeta} from "./pagination-meta";

export type Color = 'default' | 'error' | 'success' | 'warning' | 'caution' | 'info';

export interface DataTableProps<T extends { id: string | number }> {
    columns: Column<T>[],
    data: T[],
    pagination?: PaginationMeta,
    onPaginate?: (page: number) => void,
    onSearch?: (query: string) => void,
    onSort?: (sort: SortState | null) => void,
    searchValue?: string,
    sortValue?: SortState | null,
    clientPageSize?: number | null,
    clientSearchKeys?: (keyof T)[],
    entity?: Entity,
    actionMenu?: ActionMenu<T>,
    renderMenuIcon?: () => ReactNode,
    onUpdate?: (id: string | number, values: Partial<T>) => void,
    formFields?: FormField[],
    renderSortIcon?: (direction: SortDirection, active: boolean) => ReactNode,
    emptyMessage?: string,
    striped?: boolean,
    hover?: boolean,
    style?: CSSProperties,
}