import {Column, DataTableHeaderProps} from "../types";
import {DefaultSortIcon} from "./DefaultSortIcon";

export const DataTableHeader = <T extends { id: string | number }>({
    columns,
    onSort,
    sortValue,
    hasActionMenu,
    renderSortIcon,
}: DataTableHeaderProps<T>) => {
    const handleSort = (column: Column<T>) => {
        if (!onSort) return;

        if (!sortValue || sortValue.name !== column.name) {
            onSort({ name: column.name, direction: 'asc' });
        } else if (sortValue.direction === 'asc') {
            onSort({ ...sortValue, direction: 'desc' });
        } else {
            onSort(null);
        }
    }

    return (
        <thead>
        <tr>
            {hasActionMenu && <th aria-label="Actions" />}
            {columns.map((column: Column<T>) => (
                <th
                    onClick={() => column.sort && handleSort(column)}
                    className={[column.className, column.sort ? 'sort' : null].filter(Boolean).join(' ')}
                    style={column.style}
                    key={String(column.name)}
                >
                    <span>
                        <span className="label">{column.label}</span>
                        {column.sort && (
                            <span className="icons">
                            {renderSortIcon ? (
                                <>
                                    {renderSortIcon('asc', sortValue?.name === column.name && sortValue?.direction === 'asc')}
                                    {renderSortIcon('desc', sortValue?.name === column.name && sortValue?.direction === 'desc')}
                                </>
                            ) : (
                                <>
                                    <DefaultSortIcon direction="asc"
                                                     active={sortValue?.name === column.name && sortValue?.direction === 'asc'}/>
                                    <DefaultSortIcon direction="desc"
                                                     active={sortValue?.name === column.name && sortValue?.direction === 'desc'}/>
                                </>
                            )}
                            </span>
                        )}
                    </span>
                </th>
            ))}
        </tr>
        </thead>
    )
}