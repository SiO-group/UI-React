import {FC, JSX, useMemo} from "react";
import {isColorToken} from "../utils/is-color-token";
import {BarChartProps, BarSeries, ColorToken, ColorValue} from "../types";
import {BarDataPoint, NormalizedBarSeries} from "../types/bar-chart-props";

export const BarChart: FC<BarChartProps> = ({
    title,
    labels,
    series,
    variant = series.length === 1 ? 'simple' : 'grouped',
    height = 140,
    showValues = false,
    showLegend = true,
    className = '',
}: BarChartProps): JSX.Element => {
    const normalizePoint = (v: number | BarDataPoint): BarDataPoint =>
        typeof v === 'number' ? { value: v } : v;

    const normalizedSeries: NormalizedBarSeries[] = useMemo(() =>
            series.map(sr => ({
                ...sr,
                points: sr.values.map(normalizePoint),
            }))
        , [series]);

    const maxVal: number = useMemo(() => {
        if (variant === 'stacked') {
            return Math.max(...labels.map((_, ci) =>
                normalizedSeries.reduce((s, sr) => s + (sr.points[ci]?.value ?? 0), 0)
            ));
        }
        return Math.max(...normalizedSeries.flatMap(sr => sr.points.map(p => p.value)));
    }, [normalizedSeries, labels, variant]);

    const barHeight = (v: number) => Math.round((v / maxVal) * (height - 16));

    return (
        <div className={`sio-bar-chart ${className}`}>
            {title && <div className="sio-chart-title">{title}</div>}

            <div className="sio-bar-chart__area" style={{ height }}>
                {labels.map((lbl, ci) => {
                    const colValues: number[] = normalizedSeries.map((sr: NormalizedBarSeries): number => sr.points[ci].value ?? 0);

                    if (variant === 'stacked') {
                        const colTotal: number = colValues.reduce((a, b) => a + b, 0);

                        return (
                            <div key={ci} className="sio-bar-chart__col">
                                <div className="sio-bar-chart__stack" style={{ height: barHeight(colTotal) }}>
                                    {[...normalizedSeries].reverse().map((sr: NormalizedBarSeries, si: number) => {
                                        const v: number = sr.points[ci].value ?? 0;
                                        const pct: number = colTotal > 0 ? (v / colTotal) * 100 : 0;
                                        const isToken: boolean = isColorToken(sr.color);

                                        const colorClass: ColorToken | string = isToken || !sr.color ? (sr.color ?? 'default') : '';
                                        const colorStyle: { background: ColorValue } | undefined = (!isToken && sr.color) ? { background: sr.color } : undefined;

                                        return (
                                            <div
                                                key={si}
                                                className={`sio-bar-chart__seg ${colorClass}`}
                                                style={{ height: `${pct}%`, ...(colorStyle ?? {}) }}
                                                title={`${sr.label}: ${v}`}
                                            />
                                        );
                                    })}
                                </div>
                                {showValues && <span className="sio-bar-chart__val">{colTotal}</span>}
                                <span className="sio-bar-chart__lbl">{lbl}</span>
                            </div>
                        );
                    }

                    if (variant === 'grouped') {
                        return (
                            <div key={ci} className="sio-bar-chart__col">
                                <div className="sio-bar-chart__group">
                                    {normalizedSeries.map((sr: NormalizedBarSeries, si: number) => {
                                        const point: BarDataPoint = sr.points[ci];
                                        const isToken: boolean = isColorToken(sr.color);

                                        const colorClass: ColorToken | string = isToken || !sr.color ? (sr.color ?? 'default') : '';
                                        const colorStyle: { background: ColorValue } | undefined = (!isToken && sr.color) ? { background: sr.color } : undefined;

                                        return (
                                            <>
                                                <div
                                                    key={si}
                                                    className={`sio-bar-chart__bar ${colorClass}`}
                                                    style={{ height: barHeight(point.value), ...(colorStyle ?? {}) }}
                                                    title={`${sr.label}: ${point.value}`}
                                                />

                                                {point.isCritical && (
                                                    <div className="sio-bar-chart__critical" title="Kritiek signaal">
                                                        ⚠
                                                    </div>
                                                )}

                                                {point.extraInfo && (
                                                    <div className="sio-bar-chart__referral" title={point.extraInfo}>
                                                        I
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                                <span className="sio-bar-chart__lbl">{lbl}</span>
                            </div>
                        );
                    }

                    // simple
                    const point: BarDataPoint = normalizedSeries[0]?.points[ci] ?? 0;
                    const isToken: boolean = isColorToken(series[0]?.color);

                    const colorClass: ColorToken | string = isToken || !series[0]?.color ? (series[0]?.color ?? 'default') : '';
                    const colorStyle: { background: ColorValue } | undefined = (!isToken && series[0]?.color) ? { background: series[0]?.color } : undefined;
                    return (
                        <div key={ci} className="sio-bar-chart__col">
                            {showValues && <span className="sio-bar-chart__val">{point.value}</span>}
                            <div className="sio-bar-chart__group">
                                <div
                                    className={`sio-bar-chart__bar sio-bar-chart__bar--simple ${colorClass}`}
                                    style={{ height: barHeight(point.value), ...(colorStyle ?? {}) }}
                                    title={`${lbl}: ${point.value}`}
                                />

                                {point.isCritical && (
                                    <div className="sio-bar-chart__critical" title="Kritiek signaal">
                                        ⚠
                                    </div>
                                )}

                                {point.extraInfo && (
                                    <div className="sio-bar-chart__referral" title={point.extraInfo}>
                                        I
                                    </div>
                                )}
                            </div>
                            <span className="sio-bar-chart__lbl">{lbl}</span>
                        </div>
                    );
                })}
            </div>

            {showLegend && series.length > 1 && (
                <div className="sio-bar-chart__legend">
                    {series.map((sr: BarSeries, i: number) => {
                        const isToken: boolean = isColorToken(sr.color);

                        const colorClass: ColorToken | string = isToken || !sr.color ? (sr.color ?? 'default') : '';
                        const colorStyle: { background: ColorValue } | undefined = (!isToken && sr.color) ? { background: sr.color } : undefined;

                        return (
                            <div key={i} className="sio-bar-chart__legend-item">
                                <span className={`sio-bar-chart__legend-dot ${colorClass}`} style={colorStyle}/>
                                <span>{sr.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};