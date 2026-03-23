import {DataTableBodyProps} from "../types/data-table-body-props";
import {Column} from "../types";
import {ActionCell} from "./ActionCell";
import {TableCell} from "./TableCell";

export const DataTableBody = <T extends { id: string | number }> ({
    item,
    columns,
    actionMenu,
    formFields,
    updateData,
    renderMenuIcon,
}: DataTableBodyProps<T>) => {
    return (
        <tr>
            {actionMenu && (
                <ActionCell
                    actionMenu={actionMenu}
                    item={item}
                    renderMenuIcon={renderMenuIcon}
                />
            )}
            {columns.map((column: Column<T>) => (
                <TableCell
                    column={column}
                    item={item}
                    formFields={formFields}
                    updateData={updateData}
                    key={`${String(column.name)}-${item.id}`}
                />
            ))}
        </tr>
    )
}