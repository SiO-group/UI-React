import {ColorToken} from "./color-token";

/**
 * Props for the BarCard component.
 */
export interface BarCardProps {
    /** Title displayed at the top of the card */
    title: string;
    /** Main numeric value shown in the card */
    value: number;
    /** Maximum value used to calculate percentage (default: 100) */
    max?: number;
    /** Explicit percentage (overrides calculated value if provided) */
    percentage?: number;
    /** Left footer label (e.g. "Active users") */
    label?: string;
    /** Right footer caption (e.g. "Last 30 days") */
    caption?: string;
    /** Visual color variant of the bar */
    color?: ColorToken;
    /** Additional CSS class names */
    className?: string;
}
