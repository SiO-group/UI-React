import {Column} from "./column";
import {FormField} from "./form-field";

export interface TableCellProps <T extends { id: string | number }> {
    column: Column<T>;
    item: T;
    formFields?: FormField[];
    updateData?: (id: string | number, values: Partial<T>) => void;
}