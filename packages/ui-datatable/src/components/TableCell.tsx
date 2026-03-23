import {TableCellProps} from "../types";
import {renderValue} from "../utils/render-value";

export const TableCell = <T extends { id: number | string }> ({
    column,
    item,
    formFields,
    updateData,
}: TableCellProps<T>) => {
    const cellValue: T[keyof T] = item[column.name];

    return (
        <td className={column.className ?? ''}>
            {renderValue({value: cellValue, column, item, formFields, updateData})}
        </td>
    );
}