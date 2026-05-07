import {ColorValue} from "./color-token";

/**
 * Props for the GaugeChart component.
 */
export interface GaugeChartProps {
    /** Optional chart title */
    title?: string;

    /** Current value displayed by the gauge */
    value: number;

    /**
     * Minimum value of the gauge range.
     *
     * @default 0
     */
    min?: number;

    /**
     * Maximum value of the gauge range.
     *
     * @default 100
     */
    max?: number;

    /**
     * Color of the filled gauge arc.
     *
     * Accepts any valid CSS color value.
     *
     * @default "default"
     */
    color?: ColorValue;

    /**
     * Optional unit suffix displayed after the value.
     *
     * Examples:
     * - "%"
     * - "/ 10"
     * - "ms"
     */
    unit?: string;

    /**
     * Optional custom label displayed in the center of the gauge.
     *
     * Defaults to the formatted value + unit.
     */
    centerLabel?: string;

    /**
     * Overall size of the SVG in pixels.
     *
     * @default 180
     */
    size?: number;

    /**
     * Thickness of the gauge arc in pixels.
     *
     * @default 16
     */
    thickness?: number;

    /** Additional CSS class names */
    className?: string;
}