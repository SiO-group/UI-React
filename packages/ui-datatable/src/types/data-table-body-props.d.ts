import {Column} from "./column";
import {Entity} from "./entity";
import {ActionMenu} from "./action-menu";
import {FormField} from "./form-field";
import {ReactNode} from "react";


export interface DataTableBodyProps <T extends { id: number | string }> {
    item: T;
    columns: Column<T>[];
    entity?: Entity;
    actionMenu?: ActionMenu<T>;
    formFields?: FormField[];
    updateData?: (id: string | number, values: Partial<T>) => void;
    renderMenuIcon?: () => ReactNode;
}