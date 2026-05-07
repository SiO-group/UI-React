import {MetricCardProps} from "../types";
import {FC, JSX} from "react";

/**
 * Displays a primary metric with optional unit, icon, and supporting statistics.
 *
 * Designed for dashboard use cases where a single key value needs emphasis,
 * optionally enriched with contextual metrics (e.g. average, spread, trend).
 *
 * @param props - {@link MetricCardProps}
 * @returns A styled metric card component
 */
export const MetricCard: FC<MetricCardProps> = ({
    title,
    value,
    unit,
    stats = [],
    color = 'default',
    icon,
    className = '',
}: MetricCardProps): JSX.Element => {

    return (
        <div className={`sio-metric-card ${className}`}>
            <div className="sio-metric-card__header">
                {icon && (
                    <span
                        className={`sio-metric-card__icon ${color}`}
                        aria-hidden
                    >
                        {icon}
                    </span>
                )}
                <p className="sio-metric-card__title">{title}</p>
            </div>
            <div className="sio-metric-card__main">
                <span className={`sio-metric-card__value ${color}`}>
                    {value}
                </span>
                {unit && (
                    <span className="sio-metric-card__unit">{unit}</span>
                )}
            </div>
            {stats.length > 0 && (
                <div className="sio-metric-card__stats">
                    {stats.map((s, i) => (
                        <div key={i} className="sio-metric-card__stat">
                            <span className="sio-metric-card__stat-value">{s.value}</span>
                            <span className="sio-metric-card__stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}