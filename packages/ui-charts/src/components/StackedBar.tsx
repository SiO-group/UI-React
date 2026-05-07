import {FC, JSX, useMemo} from "react";
import {ColorToken, ColorValue, StackedBarProps} from "../types";
import {isColorToken} from "../utils/is-color-token";

/**
 * Displays a horizontal stacked bar visualizing proportional distribution.
 *
 * Each segment represents a percentage of the total value and is rendered
 * as part of a continuous horizontal bar.
 *
 * Features include:
 * - percentage-based segment sizing
 * - optional legend
 * - optional percentage indicators
 * - semantic and custom color support
 *
 * Common use cases:
 * - category distribution
 * - participation breakdowns
 * - status overviews
 * - composition visualizations
 *
 * @param props - {@link StackedBarProps}
 * @returns A proportional stacked bar visualization component
 */
export const StackedBar: FC<StackedBarProps> = ({
    title,
    segments,
    height = 24,
    showLegend = true,
    showPercentages = true,
    className = '',
}: StackedBarProps): JSX.Element => {
    const total = useMemo(() => segments.reduce((s, d) => s + d.value, 0), [segments]);

    return (
        <div className={`sio-stacked-bar ${className}`}>
            {title && <p className="sio-chart-title">{title}</p>}
            <div
                className="sio-stacked-bar__track"
                style={{ height }}
                role="img"
                aria-label={title}
            >
                {segments.map((seg, i) => {
                    const pct = total > 0 ? (seg.value / total) * 100 : 0;
                    const isToken: boolean = isColorToken(seg.color);

                    const colorClass: ColorToken | string = isToken || !seg.color ? (seg.color ?? 'default') : '';
                    const colorStyle: { background: ColorValue } | undefined = (!isToken && seg.color) ? { background: seg.color } : undefined;

                    return (
                        <div
                            key={i}
                            className={`sio-stacked-bar__seg ${colorClass}`}
                            style={{ width: `${pct}%`, ...(colorStyle ?? {}) }}
                            title={`${seg.label}: ${seg.value} (${Math.round(pct)}%)`}
                        />
                    );
                })}
            </div>
            {showLegend && (
                <div className="sio-stacked-bar__legend">
                    {segments.map((seg, i) => {
                        const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
                        const isToken: boolean = isColorToken(seg.color);

                        const colorClass: ColorToken | string = isToken || !seg.color ? (seg.color ?? 'default') : '';
                        const colorStyle: { background: ColorValue } | undefined = (!isToken && seg.color) ? { background: seg.color } : undefined;

                        return (
                            <div key={i} className="sio-stacked-bar__legend-item">
                                <span className={`sio-stacked-bar__legend-dot ${colorClass}`} style={colorStyle} />
                                <span className="sio-stacked-bar__legend-label">{seg.label}</span>
                                {showPercentages && (
                                    <span className="sio-stacked-bar__legend-pct">{pct}%</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}