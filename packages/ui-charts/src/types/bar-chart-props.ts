import {ColorValue} from "./color-token";

/**
 * Represents a single data point within a series.
 */
export interface BarDataPoint {
    value: number;
    isCritical?: boolean;
    extraInfo?: string | null;
}

export interface NormalizedBarSeries {
    label: string;
    color: ColorValue;
    points: BarDataPoint[];
}

/**
 * Represents a single data series within a BarChart.
 */
export interface BarSeries {
    /** Label displayed in the legend and tooltips */
    label: string;
    /** Color used for the bars or stacked segments */
    color: ColorValue;
    /**
     * Numeric values for each category label.
     *
     * The index of each value corresponds to the matching index in `labels`.
     */
    values: number[] | BarDataPoint[];
}

/**
 * Props for the BarChart component.
 */
export interface BarChartProps {
    /** Optional chart title */
    title?: string;

    /** Labels displayed along the X-axis */
    labels: string[];

    /**
     * Data series displayed in the chart.
     *
     * - One series → simple chart
     * - Multiple series → grouped or stacked chart
     */
    series: BarSeries[];

    /**
     * Layout variant of the chart.
     *
     * - `simple`: single-series vertical bars
     * - `grouped`: multiple series displayed side-by-side
     * - `stacked`: multiple series stacked vertically
     *
     * Defaults to:
     * - `simple` when only one series is provided
     * - `grouped` when multiple series are provided
     */
    variant?: 'simple' | 'grouped' | 'stacked';

    /** Height of the chart area in pixels */
    height?: number;

    /** Whether numeric values should be displayed above bars */
    showValues?: boolean;

    /** Whether the legend should be displayed */
    showLegend?: boolean;

    /** Additional CSS class names */
    className?: string;
}