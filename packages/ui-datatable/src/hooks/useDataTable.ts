import {useMemo, useState} from "react";
import {UseDataTableProps} from "../types/use-data-table-props";
import {UseDataTableReturn} from "../types/use-data-table-return";
import {SortState} from "../types";

export const useDataTable = <T extends { id: string | number }>({
    data,
    pagination,
    onSearch,
    onSort,
    onPaginate,
    searchValue,
    sortValue,
    clientPageSize,
    clientSearchKeys
}: UseDataTableProps<T>): UseDataTableReturn<T> => {
    const isControlled: boolean = pagination !== undefined;

    const showPagination: boolean = isControlled ? !!onPaginate : !!clientPageSize;
    const showSearch: boolean = isControlled ? !!onSearch : !!clientSearchKeys?.length;

    const [clientSearch, setClientSearch] = useState('');
    const [clientSort, setClientSort] = useState<SortState<T> | null>(null);
    const [clientPage, setClientPage] = useState(1);

    const handleSearch = (query: string) => {
        if (isControlled) {
            onSearch?.(query);
        } else {
            setClientSearch(query);
            setClientPage(1);
        }
    }

    const handleSort = (sort: SortState<T> | null) => {
        if (isControlled) {
            onSort?.(sort);
        } else {
            setClientSort(sort);
        }
    }

    const handlePaginate = (page: number) => {
        if (isControlled) {
            onPaginate?.(page);
        } else {
            setClientPage(page);
        }
    }

    const processedData = useMemo(() => {
        if (isControlled) return data;

        let result = [...data];

        if (clientSearch && clientSearchKeys?.length) {
            result = result.filter((item) =>
                clientSearchKeys.some((key) =>
                    String(item[key]).toLowerCase().includes(clientSearch.toLowerCase())
                )
            );
        }

        if (clientSort) {
            result.sort((a: T, b: T) => {
                const aVal: string = String(a[clientSort.name]);
                const bVal: string = String(b[clientSort.name]);
                return clientSort.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }

        return result;
    }, [data, clientSearch, clientSort, isControlled]);

    const paginationMeta = useMemo(() => {
        if (isControlled || !clientPageSize) return pagination;

        const pageSize: number = clientPageSize;
        const total: number = processedData.length;
        const pageCount: number = Math.ceil(total / pageSize);
        const from: number = (clientPage - 1) * pageSize;

        return {
            currentPage: clientPage,
            pageCount,
            total,
            from: from + 1,
            to: Math.min(from + pageSize, total)
        };
    }, [isControlled, pagination, processedData, clientPage, clientPageSize]);

    const pagedData = useMemo(() => {
        if (isControlled || !clientPageSize) return data;

        const pageSize: number = clientPageSize;
        const from: number = (clientPage - 1) * pageSize;
        return processedData.slice(from, from + pageSize);
    }, [isControlled, processedData, clientPage, clientPageSize]);

    return {
        pagedData,
        paginationMeta,
        showPagination,
        showSearch,
        handleSearch,
        handleSort,
        handlePaginate,
        currentSort: isControlled ? sortValue : clientSort,
        currentSearch: isControlled ? searchValue : clientSearch,
    }
}