import {Column} from "../../types";
import {Button} from "@sio-group/ui-core";

interface BooleanCellProps<T extends { id: number | string }> {
    item: T;
    column: Column<T>;
    value: T[keyof T];
    updateData?: (id: string | number, values: Partial<T>) => void;
}

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