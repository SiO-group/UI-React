import {Button} from "@sio-group/ui-core";
import {BooleanCellProps} from "../../types/data-table-props";

export const BooleanCell = <T extends { id: string | number }> ({
    column,
    value,
    item,
    updateData,
}: BooleanCellProps<T>) => (
    <Button
        color={value ? "success" : "error"}
        variant={column.format === "button" ? "primary" : "link"}
        onClick={() =>
            updateData?.(item.id, {
                [column.name]: !value
            } as Partial<T>)
        }
        ariaLabel={String(column.name)}
    >
        {value ? '✓' : '✗'}
    </Button>
);