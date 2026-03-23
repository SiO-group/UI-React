import {Column, FormField} from "../types";
import {EmptyCell} from "../components/cell-types/EmptyCell";
import {BooleanCell} from "../components/cell-types/BooleanCell";
import {Link, Pill} from "@sio-group/ui-core";
import {renderObject} from "./render-object";
import {DateCell} from "../components/cell-types/DateCell";
import {isPillValue} from "./is-pill-value";
import {InlineInputCell} from "../components/cell-types/InlineInputCell";

interface RenderValueProps <T extends { id: string | number }> {
    value: T[keyof T];
    column: Column<T>;
    item: T;
    formFields?: FormField[];
    updateData?: (id: (string | number), values: Partial<T>) => void;
}

export const renderValue = <T extends { id: string | number }> ({value, column, item, formFields, updateData}: RenderValueProps<T>) => {
    const formatKey: string | undefined = typeof column.format === 'object' ? column.format.key : undefined;

    const formField: FormField | undefined = formFields?.find((f: FormField): boolean => f.name === column.name);
    if (formField) {
        return (
            <InlineInputCell
                column={column}
                value={value}
                item={item}
                formField={formField}
                updateData={updateData}
            />
        );
    }

    if (value === null || value === undefined) return <EmptyCell />;
    if (Array.isArray(value) && !value.length) return <EmptyCell />;

    if (column.format === "boolean" || column.format === "button") {
        return (
            <BooleanCell
                column={column}
                value={value}
                item={item}
                updateData={updateData}
            />
        );
    }

    if (column.format === "datetime" || column.format === "date") {
        return (
            <DateCell
                column={column}
                value={value}
            />
        );
    }

    if (column.format === "pill" && isPillValue(value)) {
        return <Pill status={value.status} label={value.label} />;
    }

    if (column.format === "email") {
        return <Link to={`mailto:${value}`}>{String(value)}</Link>
    }

    if (Array.isArray(value)) {
        return (
            <>
                {(value as Array<Record<string, unknown> | string>).map((x, i) => (
                    <div key={i}>
                        {typeof x === 'object' && x !== null
                            ? formatKey
                                ? String((x as Record<string, unknown>)[formatKey] ?? '')
                                : renderObject(x)
                            : String(x)
                        }
                    </div>
                ))}
            </>
        )
    }

    if (typeof value === 'object') {
        return formatKey
            ? String((value as Record<string, unknown>)[formatKey] ?? '')
            : renderObject(value as Record<string, unknown>);
    }

    return String(value)
}