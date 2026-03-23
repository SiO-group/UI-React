export type SortDirection = 'asc' | 'desc';

export interface SortState<T extends { id: string | number }> {
    name: keyof T;
    direction: SortDirection;
}