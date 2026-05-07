import {FC, JSX, useMemo} from "react";
import {isColorToken} from "../utils/is-color-token";
import {BarChartProps, BarSeries, ColorToken, ColorValue} from "../types";

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
    const maxVal: number = useMemo(() => {
        if (variant === 'stacked') {
            return Math.max(...labels.map((_, ci) =>
                series.reduce((s, sr) => s + (sr.values[ci] ?? 0), 0)
            ));
        }
        return Math.max(...series.flatMap(sr => sr.values));
    }, [series, labels, variant]);

    const barHeight = (v: number) => Math.round((v / maxVal) * (height - 16));

    return (
        <div className={`sio-bar-chart ${className}`}>
            {title && <div className="sio-chart-title">{title}</div>}

            <div className="sio-bar-chart__area" style={{ height }}>
                {labels.map((lbl, ci) => {
                    const colValues: number[] = series.map((sr: BarSeries) => sr.values[ci] ?? 0);

                    if (variant === 'stacked') {
                        const colTotal: number = colValues.reduce((a, b) => a + b, 0);

                        return (
                            <div key={ci} className="sio-bar-chart__col">
                                <div className="sio-bar-chart__stack" style={{ height: barHeight(colTotal) }}>
                                    {[...series].reverse().map((sr: BarSeries, si: number) => {
                                        const v: number = sr.values[ci] ?? 0;
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
                                    {series.map((sr: BarSeries, si: number) => {
                                        const v: number = sr.values[ci] ?? 0;
                                        const isToken: boolean = isColorToken(sr.color);

                                        const colorClass: ColorToken | string = isToken || !sr.color ? (sr.color ?? 'default') : '';
                                        const colorStyle: { background: ColorValue } | undefined = (!isToken && sr.color) ? { background: sr.color } : undefined;

                                        return (
                                            <div
                                                key={si}
                                                className={`sio-bar-chart__bar ${colorClass}`}
                                                style={{ height: barHeight(v), ...(colorStyle ?? {}) }}
                                                title={`${sr.label}: ${v}`}
                                            />
                                        );
                                    })}
                                </div>
                                <span className="sio-bar-chart__lbl">{lbl}</span>
                            </div>
                        );
                    }

                    // simple
                    const v: number = series[0]?.values[ci] ?? 0;
                    const isToken: boolean = isColorToken(series[0]?.color);

                    const colorClass: ColorToken | string = isToken || !series[0]?.color ? (series[0]?.color ?? 'default') : '';
                    const colorStyle: { background: ColorValue } | undefined = (!isToken && series[0]?.color) ? { background: series[0]?.color } : undefined;
                    return (
                        <div key={ci} className="sio-bar-chart__col">
                            {showValues && <span className="sio-bar-chart__val">{v}</span>}
                            <div className="sio-bar-chart__group">
                                <div
                                    className={`sio-bar-chart__bar sio-bar-chart__bar--simple ${colorClass}`}
                                    style={{ height: barHeight(v), ...(colorStyle ?? {}) }}
                                    title={`${lbl}: ${v}`}
                                />
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