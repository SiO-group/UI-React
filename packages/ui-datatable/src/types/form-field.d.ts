export type FormFieldType = 'text' | 'radio' | 'select';

export interface FormField {
    name: string;
    type: FormFieldType;
    options?: { label: string; value: string }[] | string[];
    required?: boolean;
}