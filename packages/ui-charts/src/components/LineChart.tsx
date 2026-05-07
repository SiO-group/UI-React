import {FC, JSX, useMemo, useRef, useState} from "react";
import {ColorToken, ColorValue, LineChartProps} from "../types";
import {isColorToken} from "../utils/is-color-token";

/**
 * Displays a responsive multi-series line chart for visualizing trends over time.
 *
 * The chart supports:
 * - multiple data series
 * - optional area fills
 * - interactive tooltips
 * - grid lines and axis labels
 * - point markers
 * - automatic scaling
 *
 * Each series is rendered as an SVG path and may optionally include
 * a gradient-filled area below the line.
 *
 * Common use cases:
 * - wellbeing evolution
 * - participation trends
 * - activity monitoring
 * - KPI progression
 *
 * @param props - {@link LineChartProps}
 * @returns An interactive SVG-based line chart component
 */
export const LineChart: FC<LineChartProps> = ({
    title,
    labels,
    series,
    minValue,
    maxValue,
    height = 120,
    gridLines = 4,
    showDots = true,
    className = '',
}: LineChartProps): JSX.Element => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; items: { label: string; value: number; color: ColorValue }[] } | null>(null);

    const padding = { top: 8, right: 8, bottom: 24, left: 32 };
    const W = 400;
    const H: number = height;
    const chartW: number = W - padding.left - padding.right;
    const chartH: number = H - padding.top - padding.bottom;

    const allValues: number[] = series.flatMap(s => s.values);
    const computedMin: number = Math.min(...allValues);
    const computedMax: number = Math.max(...allValues);
    const minVal: number = minValue ?? computedMin;
    const maxVal: number = maxValue ?? computedMax;
    const range: number = Math.max(maxVal - minVal, 1);

    const toX = (i: number) => padding.left + (i / Math.max(labels.length - 1, 1)) * chartW;
    const toY = (v: number) => padding.top + chartH - ((v - minVal) / range) * chartH;

    const buildPath = (values: number[]) =>
        values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

    const buildArea = (values: number[]) => {
        const linePart = buildPath(values);
        const bottomRight = `L ${toX(values.length - 1).toFixed(1)} ${(padding.top + chartH).toFixed(1)}`;
        const bottomLeft = `L ${toX(0).toFixed(1)} ${(padding.top + chartH).toFixed(1)} Z`;
        return `${linePart} ${bottomRight} ${bottomLeft}`;
    };

    const gridVals = useMemo(() => {
        return Array.from({ length: gridLines }, (_, i) => {
            const v = minVal + (range / (gridLines - 1)) * i;
            return { v: Math.round(v), y: toY(v) };
        });
    }, [minVal, range, gridLines]);

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        const svgX = ((e.clientX - rect.left) / rect.width) * W;
        const idx = Math.round(((svgX - padding.left) / chartW) * (labels.length - 1));
        const clampedIdx = Math.max(0, Math.min(labels.length - 1, idx));
        setTooltip({
            x: toX(clampedIdx),
            y: Math.min(...series.map(s => toY(s.values[clampedIdx] ?? 0))),
            label: labels[clampedIdx],
            items: series.map(s => ({ label: s.label, value: s.values[clampedIdx] ?? 0, color: s.color })),
        });
    };

    return (
        <div className={`sio-line-chart ${className}`}>
            {title && <p className="sio-chart-title">{title}</p>}
            <div style={{ position: 'relative' }}>
                <svg
                    ref={svgRef}
                    width="100%"
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setTooltip(null)}
                    style={{ display: 'block' }}
                    role="img"
                    aria-label={title}
                >
                    <defs>
                        {series.filter(s => s.fill).map((s, i) => {
                            const isToken: boolean = isColorToken(s.color);

                            const colorClass: ColorToken | string = isToken ? s.color : '';
                            const colorStyle: ColorValue | undefined = !isToken ? s.color : undefined;

                            return (
                                <linearGradient key={i} id={`sio-line-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" className={`sio-line-fill ${colorClass}`} stopColor={colorStyle} stopOpacity={0.25} />
                                    <stop offset="100%" className={`sio-line-fill ${colorClass}`} stopColor={colorStyle} stopOpacity={0} />
                                </linearGradient>
                            )
                        })}
                    </defs>

                    {/* Grid lines */}
                    {gridVals.map((g, i) => (
                        <g key={i}>
                            <line
                                x1={padding.left} y1={g.y}
                                x2={W - padding.right} y2={g.y}
                                stroke="var(--sio-color-border)"
                                strokeWidth={0.5}
                            />
                            <text
                                x={padding.left - 4}
                                y={g.y}
                                textAnchor="end"
                                dominantBaseline="central"
                                fontSize={9}
                                fill="var(--sio-color-gray)"
                            >
                                {g.v}
                            </text>
                        </g>
                    ))}

                    {/* Area fills */}
                    {series.filter(s => s.fill).map((s, i) => (
                        <path
                            key={i}
                            d={buildArea(s.values)}
                            fill={`url(#sio-line-fill-${i})`}
                        />
                    ))}

                    {/* Lines */}
                    {series.map((s, i) => {
                        const isToken: boolean = isColorToken(s.color);

                        const colorClass: ColorToken | string = isToken ? s.color : '';
                        const colorStyle: ColorValue | undefined = !isToken ? s.color : undefined;

                        return (
                            <path
                                key={i}
                                d={buildPath(s.values)}
                                fill="none"
                                className={`sio-line-line ${colorClass}`}
                                stroke={colorStyle}
                                strokeWidth={2}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                        )
                    })}

                    {/* Dots */}
                    {showDots && series.map((s, si) =>
                        s.values.map((v, vi) => {
                            const isToken: boolean = isColorToken(s.color);

                            const colorClass: ColorToken | string = isToken ? s.color : '';
                            const colorStyle: ColorValue | undefined = !isToken ? s.color : undefined;

                            return (
                                <circle
                                    key={`${si}-${vi}`}
                                    cx={toX(vi)}
                                    cy={toY(v)}
                                    r={3}
                                    className={`sio-line-dot ${colorClass}`}
                                    fill={colorStyle}
                                />
                            )
                        })
                    )}

                    {/* Tooltip vertical line */}
                    {tooltip && (
                        <line
                            x1={tooltip.x} y1={padding.top}
                            x2={tooltip.x} y2={padding.top + chartH}
                            stroke="var(--sio-color-border)"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                        />
                    )}

                    {/* X-axis labels */}
                    {labels.map((lbl, i) => (
                        <text
                            key={i}
                            x={toX(i)}
                            y={H - 6}
                            textAnchor="middle"
                            fontSize={9}
                            fill="var(--sio-color-gray)"
                        >
                            {lbl}
                        </text>
                    ))}
                </svg>

                {/* Tooltip */}
                {tooltip && (
                    <div className="sio-line-chart__tooltip" style={{ left: `${(tooltip.x / W) * 100}%` }}>
                        <div className="sio-line-chart__tooltip-label">{tooltip.label}</div>
                        {tooltip.items.map((item, i) => {
                            const isToken: boolean = isColorToken(item.color);

                            const colorClass: ColorToken | string = isToken ? item.color : '';
                            const colorStyle: { background: ColorValue } | undefined = !isToken ? { background: item.color } : undefined;

                            return (
                                <div key={i} className="sio-line-chart__tooltip-row">
                                    <span className={`sio-line-chart__tooltip-dot ${colorClass}`} style={colorStyle} />
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Legend */}
            {series.length > 1 && (
                <div className="sio-line-chart__legend">
                    {series.map((s, i) => {
                        const isToken: boolean = isColorToken(s.color);

                        const colorClass: ColorToken | string = isToken ? s.color : '';
                        const colorStyle: { background: ColorValue } | undefined = !isToken ? { background: s.color } : undefined;

                        return (
                            <div key={i} className="sio-line-chart__legend-item">
                                <span className={`sio-line-chart__legend-line ${colorClass}`} style={colorStyle} />
                                <span>{s.label}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}