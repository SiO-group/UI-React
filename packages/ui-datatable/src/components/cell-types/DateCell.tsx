import {Column} from "../../types";

interface DateCellProps<T extends { id: number | string }> {
    column: Column<T>;
    value: T[keyof T];
}

export const DateCell = <T extends { id: string | number }> ({
    column,
    value,
}: DateCellProps<T>) => (
    new Date(value as string)
        .toLocaleString("nl-BE", {
            timeZone: "Europe/Brussels",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            ...(column.format === "datetime"
                ? {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }
                : {}),
            hour12: false,
        })
        .replace(/\//g, "-")
);