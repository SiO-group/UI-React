import {SortDirection} from "../types";

export const DefaultSortIcon = ({
    direction,
    active,
}: { direction: SortDirection, active: boolean }) => (
    <span
        style={{ opacity: active ? 1 : 0.3, fontSize: '0.7em' }}
        aria-hidden="true"
    >
    {direction === 'asc' ? '▲' : '▼'}
  </span>
);
