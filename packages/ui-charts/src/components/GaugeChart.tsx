import {FC, JSX} from "react";
import {GaugeChartProps} from "../types/gauge-chart-props";
import {isColorToken} from "../utils/is-color-token";
import {ColorToken, ColorValue} from "../types";

/**
 * Displays a semi-circular gauge chart representing a value within a range.
 *
 * The component visualizes progress or intensity using:
 * - a background track
 * - a filled arc
 * - a directional needle
 *
 * Features include:
 * - configurable min/max ranges
 * - animated arc rendering
 * - custom center labels
 * - unit formatting
 * - responsive SVG sizing
 *
 * Common use cases:
 * - wellbeing scores
 * - participation percentages
 * - performance indicators
 * - system utilization metrics
 *
 * @param props - {@link GaugeChartProps}
 * @returns A semi-circular gauge visualization component
 */
export const GaugeChart: FC<GaugeChartProps> = ({
    title,
    value,
    min = 0,
    max = 100,
    color = 'default',
    unit = '',
    centerLabel,
    size = 180,
    thickness = 16,
    className = '',
}: GaugeChartProps): JSX.Element => {
    const r: number = (size - thickness) / 2 - 2;
    const cx: number = size / 2;
    const cy: number = size / 2;

    // Semi-circle arc: π × r
    const arcLength: number = Math.PI * r;
    const range: number = Math.max(max - min, 1);
    const pct: number = Math.min(1, Math.max(0, (value - min) / range));
    const filled: number = pct * arcLength;
    const gap: number = arcLength - filled;

    // Needle angle: from -180deg (left) to 0deg (right), -90deg = top
    const angleDeg: number = -180 + pct * 180;
    const angleRad: number = (angleDeg * Math.PI) / 180;
    const needleLen: number = r - thickness / 2 - 4;
    const nx: number = cx + needleLen * Math.cos(angleRad);
    const ny: number = cy + needleLen * Math.sin(angleRad);

    const displayVal: string = centerLabel ?? `${value}${unit}`;

    const isToken: boolean = isColorToken(color);
    const colorClass: ColorToken | string = isToken ? color : '';
    const colorStyle: ColorValue | undefined = !isToken ? color : undefined;

    return (
        <div className={`sio-gauge ${className}`}>
            {title && <p className="sio-chart-title">{title}</p>}
            <div className="sio-gauge__wrap">
                <svg
                    width={size}
                    height={size / 2 + thickness + 16}
                    viewBox={`0 0 ${size} ${size / 2 + thickness + 16}`}
                    role="img"
                    aria-label={`${title ?? 'Gauge'}: ${displayVal}`}
                >
                    {/* Track */}
                    <path
                        d={`M ${thickness / 2 + 2} ${cy} A ${r} ${r} 0 0 1 ${size - thickness / 2 - 2} ${cy}`}
                        fill="none"
                        stroke="var(--sio-color-light-gray)"
                        strokeWidth={thickness}
                        strokeLinecap="round"
                    />
                    {/* Filled arc */}
                    <path
                        d={`M ${thickness / 2 + 2} ${cy} A ${r} ${r} 0 0 1 ${size - thickness / 2 - 2} ${cy}`}
                        fill="none"
                        className={`sio-gauge__fill ${colorClass}`}
                        stroke={colorStyle}
                        strokeWidth={thickness}
                        strokeLinecap="round"
                        strokeDasharray={`${filled} ${gap}`}
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                    {/* Needle */}
                    <line
                        x1={cx} y1={cy}
                        x2={nx} y2={ny}
                        stroke="var(--sio-color-gray)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        opacity={0.35}
                    />
                    <circle cx={cx} cy={cy} r={4} fill="var(--sio-color-gray)" opacity={0.35} />
                    {/* Min/Max labels */}
                    <text x={thickness / 2 + 2} y={cy + thickness + 12} textAnchor="middle" fontSize={10} fill="var(--sio-color-gray)">{min}</text>
                    <text x={size - thickness / 2 - 2} y={cy + thickness + 12} textAnchor="middle" fontSize={10} fill="var(--sio-color-gray)">{max}</text>
                </svg>
                <div className="sio-gauge__center">
                    <span className="sio-gauge__value">{displayVal}</span>
                </div>
            </div>
        </div>
    );
}