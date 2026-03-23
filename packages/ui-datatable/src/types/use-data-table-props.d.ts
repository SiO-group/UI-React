import {SortState} from "./sort-state";
import {PaginationMeta} from "./pagination-meta";

export interface UseDataTableProps <T extends { id: number | string }>{
    data: T[],
    pagination?: PaginationMeta,
    onSearch?: (query: string) => void,
    onSort?: (sort: SortState | null) => void,
    onPaginate?: (page: number) => void,
    searchValue?: string,
    sortValue?: SortState | null,
    clientPageSize?: number | null,
    clientSearchKeys?: (keyof T)[],
}