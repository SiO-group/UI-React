import {ColorToken} from "./color-token";
import {ReactNode} from "react";

/**
 * Represents a secondary statistic displayed within a MetricCard.
 */
export interface HighlightStat {
    /** Value of the stat (e.g. average, deviation, trend) */
    value: string | number;

    /** Label describing the stat */
    label: string;
}

/**
 * Props for the MetricCard component.
 */
export interface MetricCardProps {
    /** Title describing the metric */
    title: string;
    /** Primary value displayed prominently */
    value: string | number;
    /** Optional unit or suffix (e.g. "%", "/ 10") */
    unit?: string;
    /**
     * Optional secondary statistics shown below the main value.
     * Common use cases: average, deviation, trend indicators.
     */
    stats?: HighlightStat[];
    /** Color theme of the card (mapped via design tokens) */
    color?: ColorToken;
    /** Optional icon displayed in the header */
    icon?: ReactNode;
    /** Additional CSS class names */
    className?: string;
}