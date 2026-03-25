import {useEffect, useState} from "react";
import {Button} from "@sio-group/ui-core";
import {InlineInputCellProps} from "../../types/data-table-props";

export const InlineInputCell = <T extends { id: string | number }>({
    formField,
    item,
    value,
    updateData,
}: InlineInputCellProps<T>) => {
    const [showEdit, setShowEdit] = useState(false);
    const [fieldValue, setFieldValue] = useState(String(value));
    const [isValid, setIsValid] = useState(true)

    const handleCancel = () => {
        setShowEdit(false);
        setFieldValue(String(value));
    };

    const handleSave = async () => {
        updateData?.(item.id, {[formField.name]: fieldValue} as Partial<T>);
        setFieldValue(String(value));
        setShowEdit(false);
    };

    useEffect(() => {
        let bool: boolean = true;
        if (formField.required) {
            bool = fieldValue !== null && fieldValue !== '';
        }

        setIsValid(bool)
    }, [fieldValue]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowEdit(false);
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [setShowEdit]);

    return (
        <div className="inline-input">
            {showEdit ? (
                <form noValidate>
                    {formField.type === "select" || formField.type === "radio" ? (
                        <select
                            id={formField.name}
                            name={formField.name}
                            value={fieldValue}
                            onChange={(e) => setFieldValue(e.target.value)}
                            autoFocus={true}
                        >
                            {formField?.options?.map((option) => {
                                const val: string = typeof option === 'string' ? option : option.value;
                                const label: string = typeof option === 'string' ? option : option.label;

                                return <option value={val} key={val}>{label}</option>
                            })}
                        </select>
                    ) : (
                        <input
                            type="text"
                            id={formField.name}
                            name={formField.name}
                            value={fieldValue as string}
                            onChange={(e) => setFieldValue(e.target.value)}
                            autoFocus={true}
                        />
                    )}
                    <div className="btn-group">
                        <Button
                            type="submit"
                            variant="link"
                            color="success"
                            onClick={handleSave}
                            ariaLabel="inline edit field"
                            disabled={!isValid}
                            label="✓"
                        />
                        <Button
                            type="button"
                            variant="link"
                            color="error"
                            onClick={handleCancel}
                            ariaLabel="inline edit field"
                            label="✗"
                        />
                    </div>
                </form>
            ) : (
                <>
                    {value}
                    <Button
                        variant="link"
                        onClick={() => setShowEdit(true)}
                        ariaLabel="inline edit field"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </Button>
                </>
            )}
        </div>
    )
}