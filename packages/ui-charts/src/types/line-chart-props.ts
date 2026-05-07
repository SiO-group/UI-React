import {ColorValue} from "./color-token";

/**
 * Represents a single data series within a LineChart.
 */
export interface LineSeries {
    /** Label displayed in the legend and tooltip */
    label: string;

    /**
     * Numeric values plotted on the chart.
     *
     * The index of each value corresponds to the matching index in `labels`.
     */
    values: number[];

    /**
     * Color used for the line, dots and optional fill.
     *
     * Supports semantic color tokens and custom CSS color values.
     */
    color: ColorValue;

    /**
     * Whether the area below the line should be filled.
     *
     * @default false
     */
    fill?: boolean;
}

/**
 * Props for the LineChart component.
 */
export interface LineChartProps {
    /** Optional chart title */
    title?: string;

    /** Labels displayed along the X-axis */
    labels: string[];

    /** Data series rendered within the chart */
    series: LineSeries[];

    /**
     * Optional fixed minimum Y-axis value.
     * Defaults to the lowest value found in the dataset.
     */
    minValue?: number;

    /**
     * Optional fixed maximum Y-axis value.
     * Defaults to the highest value found in the dataset.
     */
    maxValue?: number;

    /**
     * Height of the chart SVG in pixels.
     *
     * @default 120
     */
    height?: number;

    /**
     * Number of horizontal grid lines displayed in the chart.
     *
     * @default 4
     */
    gridLines?: number;

    /**
     * Whether data point markers should be displayed.
     *
     * @default true
     */
    showDots?: boolean;

    /** Additional CSS class names */
    className?: string;
}