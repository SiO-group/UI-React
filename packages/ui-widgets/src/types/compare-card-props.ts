import {ColorToken, ColorValue} from "./color-token";

/**
 * Represents a single item in the comparison chart.
 */
export interface CompareItem {
    /** Label displayed next to the bar */
    label: string;
    /** Numeric value used for comparison */
    value: number;
    /**
     * Optional percentage override.
     * If not provided, percentage is calculated relative to the highest value in the list.
     */
    percentage?: number;
    /** Color of the bar and indicator (can be a token or raw CSS value) */
    color?: ColorToken | ColorValue;
}

/**
 * Props for the CompareCard component.
 */
export interface CompareCardProps {
    /** Title displayed at the top of the card */
    title: string;
    /** List of items to compare */
    items: CompareItem[];
    /** Whether to display numeric values next to bars (default: true) */
    showValues?: boolean;
    /** Additional CSS class names */
    className?: string;
}