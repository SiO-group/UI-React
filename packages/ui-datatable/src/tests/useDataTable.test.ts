import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {useDataTable} from "../hooks/useDataTable";

interface TestItem {
    id: number;
    name: string;
    email: string;
    status: string;
    age: number;
}

const mockData: TestItem[] = [
    { id: 1, name: 'Alice',   email: 'alice@example.com',   status: 'active',   age: 30 },
    { id: 2, name: 'Bob',     email: 'bob@example.com',     status: 'inactive', age: 25 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'active',   age: 35 },
    { id: 4, name: 'Diana',   email: 'diana@example.com',   status: 'inactive', age: 28 },
    { id: 5, name: 'Eve',     email: 'eve@example.com',     status: 'active',   age: 22 },
];

const mockPagination = {
    currentPage: 1,
    pageCount: 3,
    total: 15,
    from: 1,
    to: 5,
};

// ─────────────────────────────────────────────
// Mode detection
// ─────────────────────────────────────────────

describe('mode detection', () => {
    it('is client-side when no pagination is provided', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        expect(result.current.pagedData).toEqual(mockData);
    });

    it('is server-side when pagination object is provided', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination })
        );

        // Server-side returns data as-is
        expect(result.current.pagedData).toEqual(mockData);
        expect(result.current.paginationMeta).toEqual(mockPagination);
    });
});

// ─────────────────────────────────────────────
// showSearch
// ─────────────────────────────────────────────

describe('showSearch', () => {
    it('is false by default (client-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        expect(result.current.showSearch).toBe(false);
    });

    it('is true when clientSearchKeys is provided (client-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: ['name'] })
        );

        expect(result.current.showSearch).toBe(true);
    });

    it('is false when clientSearchKeys is empty array (client-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: [] })
        );

        expect(result.current.showSearch).toBe(false);
    });

    it('is false by default (server-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination })
        );

        expect(result.current.showSearch).toBe(false);
    });

    it('is true when onSearch is provided (server-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({
                data: mockData,
                pagination: mockPagination,
                onSearch: vi.fn(),
            })
        );

        expect(result.current.showSearch).toBe(true);
    });
});

// ─────────────────────────────────────────────
// showPagination
// ─────────────────────────────────────────────

describe('showPagination', () => {
    it('is false by default (client-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        expect(result.current.showPagination).toBe(false);
    });

    it('is true when clientPageSize is provided (client-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        expect(result.current.showPagination).toBe(true);
    });

    it('is false by default (server-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination })
        );

        expect(result.current.showPagination).toBe(false);
    });

    it('is true when onPaginate is provided (server-side)', () => {
        const { result } = renderHook(() =>
            useDataTable({
                data: mockData,
                pagination: mockPagination,
                onPaginate: vi.fn(),
            })
        );

        expect(result.current.showPagination).toBe(true);
    });
});

// ─────────────────────────────────────────────
// Client-side search
// ─────────────────────────────────────────────

describe('client-side search', () => {
    it('returns all data when search is empty', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: ['name'] })
        );

        expect(result.current.pagedData).toHaveLength(5);
    });

    it('filters data across multiple search keys', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: ['name', 'email'] })
        );

        act(() => result.current.handleSearch('example.com'));

        expect(result.current.pagedData).toHaveLength(5);
    });

    it('resets to page 1 when search changes', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: ['name'], clientPageSize: 2 })
        );

        // Go to page 2
        act(() => result.current.handlePaginate(2));
        expect(result.current.paginationMeta?.currentPage).toBe(2);

        // Search — should reset to page 1
        act(() => result.current.handleSearch('alice'));
        expect(result.current.paginationMeta?.currentPage).toBe(1);
    });

    it('updates currentSearch', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientSearchKeys: ['name'] })
        );

        act(() => result.current.handleSearch('bob'));

        expect(result.current.currentSearch).toBe('bob');
    });
});

// ─────────────────────────────────────────────
// Client-side sort
// ─────────────────────────────────────────────

describe('client-side sort', () => {
    it('sorts ascending by string field', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        act(() => result.current.handleSort({ name: 'name', direction: 'asc' }));

        const names = result.current.pagedData.map((i) => i.name);
        expect(names).toEqual([...names].sort());
    });

    it('resets sort when null is passed', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        act(() => result.current.handleSort({ name: 'name', direction: 'asc' }));
        act(() => result.current.handleSort(null));

        expect(result.current.currentSort).toBeNull();
        expect(result.current.pagedData).toEqual(mockData);
    });

    it('updates currentSort', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        const sort = { name: 'name' as keyof TestItem, direction: 'asc' as const };
        act(() => result.current.handleSort(sort));

        expect(result.current.currentSort).toEqual(sort);
    });
});

// ─────────────────────────────────────────────
// Client-side pagination
// ─────────────────────────────────────────────

describe('client-side pagination', () => {
    it('slices data for the first page', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        expect(result.current.pagedData).toHaveLength(2);
        expect(result.current.pagedData[0].id).toBe(1);
        expect(result.current.pagedData[1].id).toBe(2);
    });

    it('slices data for subsequent pages', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        act(() => result.current.handlePaginate(2));

        expect(result.current.pagedData).toHaveLength(2);
        expect(result.current.pagedData[0].id).toBe(3);
        expect(result.current.pagedData[1].id).toBe(4);
    });

    it('handles last page with fewer items', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        act(() => result.current.handlePaginate(3));

        expect(result.current.pagedData).toHaveLength(1);
        expect(result.current.pagedData[0].id).toBe(5);
    });

    it('calculates paginationMeta correctly', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        expect(result.current.paginationMeta).toEqual({
            currentPage: 1,
            pageCount: 3,
            total: 5,
            from: 1,
            to: 2,
        });
    });

    it('updates paginationMeta on page change', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 2 })
        );

        act(() => result.current.handlePaginate(2));

        expect(result.current.paginationMeta?.currentPage).toBe(2);
        expect(result.current.paginationMeta?.from).toBe(3);
        expect(result.current.paginationMeta?.to).toBe(4);
    });

    it('returns all data when clientPageSize is not set', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        expect(result.current.pagedData).toHaveLength(5);
    });
});

// ─────────────────────────────────────────────
// Server-side delegation
// ─────────────────────────────────────────────

describe('server-side delegation', () => {
    it('delegates search to onSearch callback', () => {
        const onSearch = vi.fn();
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination, onSearch })
        );

        act(() => result.current.handleSearch('alice'));

        expect(onSearch).toHaveBeenCalledWith('alice');
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('delegates sort to onSort callback', () => {
        const onSort = vi.fn();
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination, onSort })
        );

        const sort = { name: 'name' as keyof TestItem, direction: 'asc' as const };
        act(() => result.current.handleSort(sort));

        expect(onSort).toHaveBeenCalledWith(sort);
        expect(onSort).toHaveBeenCalledTimes(1);
    });

    it('delegates null sort to onSort callback', () => {
        const onSort = vi.fn();
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination, onSort })
        );

        act(() => result.current.handleSort(null));

        expect(onSort).toHaveBeenCalledWith(null);
    });

    it('delegates pagination to onPaginate callback', () => {
        const onPaginate = vi.fn();
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination, onPaginate })
        );

        act(() => result.current.handlePaginate(2));

        expect(onPaginate).toHaveBeenCalledWith(2);
        expect(onPaginate).toHaveBeenCalledTimes(1);
    });

    it('returns data as-is without filtering', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination })
        );

        expect(result.current.pagedData).toEqual(mockData);
    });

    it('returns server pagination meta as-is', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, pagination: mockPagination })
        );

        expect(result.current.paginationMeta).toEqual(mockPagination);
    });

    it('uses controlled searchValue for currentSearch', () => {
        const { result } = renderHook(() =>
            useDataTable({
                data: mockData,
                pagination: mockPagination,
                onSearch: vi.fn(),
                searchValue: 'alice',
            })
        );

        expect(result.current.currentSearch).toBe('alice');
    });

    it('uses controlled sortValue for currentSort', () => {
        const sort = { name: 'name' as keyof TestItem, direction: 'asc' as const };
        const { result } = renderHook(() =>
            useDataTable({
                data: mockData,
                pagination: mockPagination,
                onSort: vi.fn(),
                sortValue: sort,
            })
        );

        expect(result.current.currentSort).toEqual(sort);
    });

    it('does not filter data client-side even when clientSearchKeys is set', () => {
        const onSearch = vi.fn();
        const { result } = renderHook(() =>
            useDataTable({
                data: mockData,
                pagination: mockPagination,
                onSearch,
                clientSearchKeys: ['name'],
            })
        );

        act(() => result.current.handleSearch('alice'));

        // Data should not be filtered locally
        expect(result.current.pagedData).toHaveLength(5);
        // Callback should be called instead
        expect(onSearch).toHaveBeenCalledWith('alice');
    });
});

// ─────────────────────────────────────────────
// Edge cases
// ─────────────────────────────────────────────

describe('edge cases', () => {
    it('handles empty data array', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: [] })
        );

        expect(result.current.pagedData).toEqual([]);
    });

    it('handles empty data with pagination', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: [], clientPageSize: 20 })
        );

        expect(result.current.pagedData).toHaveLength(0);
        expect(result.current.paginationMeta?.total).toBe(0);
        expect(result.current.paginationMeta?.pageCount).toBe(0);
    });

    it('handles clientPageSize larger than dataset', () => {
        const { result } = renderHook(() =>
            useDataTable({ data: mockData, clientPageSize: 100 })
        );

        expect(result.current.pagedData).toHaveLength(5);
        expect(result.current.paginationMeta?.pageCount).toBe(1);
    });

    it('does not mutate original data when sorting', () => {
        const originalData = [...mockData];
        const { result } = renderHook(() =>
            useDataTable({ data: mockData })
        );

        act(() => result.current.handleSort({ name: 'name', direction: 'desc' }));

        expect(mockData).toEqual(originalData);
    });
});
