import {SortState} from "./sort-state";
import {PaginationMeta} from "./pagination-meta";

export interface UseDataTableReturn <T extends { id: number | string }>{
    pagedData: T[],
    paginationMeta?: PaginationMeta,
    showPagination: boolean,
    showSearch: boolean,
    handleSearch: (query: string) => void,
    handleSort: (sort: SortState | null) => void,
    handlePaginate: (page: number) => void,
    currentSort?: SortState | null,
    currentSearch?: string | null,
}