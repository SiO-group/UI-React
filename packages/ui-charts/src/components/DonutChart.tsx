import {FC, JSX, useMemo} from "react";
import {ColorToken, ColorValue, DonutChartProps, DonutSlice} from "../types";
import {isColorToken} from "../utils/is-color-token";

/**

 * Displays a donut chart for visualizing proportional data distribution.
 *
 * Each slice represents a percentage of the total value and is rendered
 * as an SVG arc segment within a circular ring.
 *
 * Features include:
 * - configurable ring size and thickness
 * - optional center labels
 * - percentage legend
 * - semantic or custom colors
 *
 * Designed for analytics dashboards, reporting interfaces and KPI summaries.
 *
 * @param props - {@link DonutChartProps}
 * @returns A donut chart visualization component
 */
export const DonutChart: FC<DonutChartProps> = ({
    title,
    slices,
    radius = 52,
    thickness = 18,
    centerLabel,
    centerSublabel,
    showLegend = true,
    className = '',
}: DonutChartProps): JSX.Element => {
    const total: number = useMemo(() => slices.reduce((s, d) => s + d.value, 0), [slices]);
    const circumference: number = 2 * Math.PI * radius;
    const size: number = (radius + thickness / 2 + 2) * 2;
    const cx: number = size / 2;
    const cy: number = size / 2;

    // Build arc segments
    const segments = useMemo(() => {
        let offset: number = -circumference / 4; // start at top (12 o'clock)
        return slices.map((s: DonutSlice) => {
            const dash: number = (s.value / total) * circumference;

            const seg = { ...s, dash, gap: circumference - dash, offset };
            offset -= dash;
            return seg;
        });
    }, [slices, total, circumference]);

    const displayCenter: string = centerLabel ?? total.toLocaleString();

    return (
        <div className={`sio-donut ${className}`}>
            {title && <p className="sio-chart-title">{title}</p>}
            <div className="sio-donut__inner">
                <div className="sio-donut__ring" style={{ width: size, height: size }}>
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
                        <circle
                            cx={cx} cy={cy} r={radius}
                            fill="none"
                            stroke="var(--sio-color-light-gray)"
                            strokeWidth={thickness}
                        />
                        {segments.map((seg, i) => {
                            const isToken: boolean = isColorToken(seg.color);

                            const colorClass: ColorToken | string = isToken || !seg.color ? (seg.color ?? 'default') : '';
                            const colorStyle: ColorValue | undefined = (!isToken && seg.color) ? seg.color : undefined;

                            return (
                                <circle
                                    key={i}
                                    cx={cx} cy={cy} r={radius}
                                    fill="none"
                                    className={`sio-donut__ring--segment ${colorClass}`}
                                    stroke={colorStyle}
                                    strokeWidth={thickness}
                                    strokeDasharray={`${seg.dash} ${seg.gap}`}
                                    strokeDashoffset={seg.offset}
                                />
                            )
                        })}
                    </svg>
                    <div className="sio-donut__center">
                        <span className="sio-donut__center-value">{displayCenter}</span>
                        {(centerSublabel || !centerLabel) && (
                            <span className="sio-donut__center-sub">{centerSublabel ?? 'totaal'}</span>
                        )}
                    </div>
                </div>
                {showLegend && (
                    <div className="sio-donut__legend">
                        {slices.map((s, i) => {
                            const pct = Math.round((s.value / total) * 100);
                            const isToken: boolean = isColorToken(s.color);

                            const colorClass: ColorToken | string = isToken || !s.color ? (s.color ?? 'default') : '';
                            const colorStyle: { background: ColorValue } | undefined = (!isToken && s.color) ? { background: s.color } : undefined;

                            return (
                                <div key={i} className="sio-donut__legend-item">
                                    <span className={`sio-donut__legend-dot ${colorClass}`} style={colorStyle} />
                                    <span className="sio-donut__legend-label">{s.label}</span>
                                    <span className="sio-donut__legend-pct">{pct}%</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}