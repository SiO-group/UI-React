import {FC, JSX} from "react";
import {StatCardProps} from "../types";
import {TrendIcon} from "./TrendIcon";

/**
 * Displays a compact statistic with optional icon, label, and trend indicator.
 *
 * Designed for dashboard contexts where a single value needs to be shown
 * clearly, optionally enriched with directional insight (trend).
 *
 * Compared to MetricCard, this component is more compact and focuses on
 * a single metric rather than multiple supporting statistics.
 *
 * @param props - {@link StatCardProps}
 * @returns A compact statistic card component
 */
export const StatCard: FC<StatCardProps> = ({
    title,
    value,
    label,
    icon,
    color = 'default',
    trend,
    className = '',
}: StatCardProps): JSX.Element => {
    return (
        <div className={`sio-stat-card ${className}`}>
            {icon && (
                <div
                    className={`sio-stat-card__icon ${color}`}
                    aria-hidden
                >
                    {icon}
                </div>
            )}
            <p className="sio-stat-card__title">{title}</p>
            <p className="sio-stat-card__value">{value}</p>
            {label && <p className="sio-stat-card__label">{label}</p>}
            {trend && (
                <span
                    className={`sio-stat-card__trend ${color}`}
                    aria-label={`Trend ${trend.direction}: ${trend.value}${trend.label ? ` ${trend.label}` : ''}`}
                >
                    <TrendIcon direction={trend.direction} />
                    {trend.value}
                    {trend.label && <span className="sio-stat-card__trend-label">{trend.label}</span>}
                </span>
            )}
        </div>
    );
}
