import {Color} from "../types/data-table-props";

export const isPillValue = (val: unknown): val is { label: string, status: Color } =>
    typeof val === 'object' &&
    val !== null &&
    'status' in val &&
    'label' in val;
