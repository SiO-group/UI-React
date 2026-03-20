import {PageItem} from "../types";

export function getPaginationWindow(
    currentPage: number,
    pageCount: number,
    windowSize = 2,
): PageItem[] {
    if (pageCount <= 1) return [];

    const items: PageItem[] = [];

    const rangeStart = Math.max(2, currentPage - windowSize);
    const rangeEnd = Math.min(pageCount - 1, currentPage + windowSize);

    items.push({ type: 'page', page: 1 });
    if (rangeStart > 2) {
        items.push({ type: 'ellipsis', key: 'start' });
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
        items.push({ type: 'page', page: i });
    }

    if (rangeEnd < pageCount - 1) {
        items.push({ type: 'ellipsis', key: 'end' });
    }

    if (pageCount > 1) {
        items.push({ type: 'page', page: pageCount });
    }

    return items;
}