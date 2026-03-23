export interface RenderValueProps <T extends { id: string | number }> {
    value: T[keyof T];
    column: Column<T>;
    item: T;
    formFields?: FormField[];
    updateData?: (id: (string | number), values: Partial<T>) => void;
}