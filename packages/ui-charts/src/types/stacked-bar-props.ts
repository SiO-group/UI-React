import {ColorValue} from "./color-token";

/**
 * Represents a single segment within a StackedBar.
 */
export interface StackedBarSegment {
    /** Label displayed in the legend and tooltip */
    label: string;

    /** Numeric value represented by the segment */
    value: number;

    /**
     * Color of the segment.
     *
     * Supports semantic color tokens and custom CSS color values.
     */
    color: ColorValue;
}

/**
 * Props for the StackedBar component.
 */
export interface StackedBarProps {
    /** Optional title displayed above the stacked bar */
    title?: string;

    /** Segments rendered within the stacked bar */
    segments: StackedBarSegment[];

    /**
     * Height of the stacked bar in pixels.
     *
     * @default 24
     */
    height?: number;

    /**
     * Whether the legend should be displayed.
     *
     * @default true
     */
    showLegend?: boolean;

    /**
     * Whether percentage values should be displayed in the legend.
     *
     * @default true
     */
    showPercentages?: boolean;

    /** Additional CSS class names */
    className?: string;
}