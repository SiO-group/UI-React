import {ColorValue} from "./color-token";

/**
 * Represents a single segment within a DonutChart.
 */
export interface DonutSlice {
    /** Label displayed in the legend */
    label: string;

    /** Numeric value represented by the segment */
    value: number;

    /**
     * Color of the segment.
     *
     * Accepts any valid CSS color value
     * (e.g. hex, rgb, hsl or CSS variable).
     */
    color: ColorValue;
}

/**
 * Props for the DonutChart component.
 */
export interface DonutChartProps {
    /** Optional chart title */
    title?: string;

    /** Segments displayed within the donut chart */
    slices: DonutSlice[];

    /**
     * Outer radius of the donut ring in pixels.
     *
     * @default 52
     */
    radius?: number;

    /**
     * Thickness of the donut ring in pixels.
     *
     * @default 18
     */
    thickness?: number;

    /**
     * Optional custom center label.
     *
     * Defaults to the total sum of all slice values.
     */
    centerLabel?: string;

    /**
     * Optional sublabel displayed below the center label.
     *
     * Defaults to `"totaal"` when no custom center label is provided.
     */
    centerSublabel?: string;

    /**
     * Whether the legend should be displayed.
     *
     * @default true
     */
    showLegend?: boolean;

    /** Additional CSS class names */
    className?: string;
}