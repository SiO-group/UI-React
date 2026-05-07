import {FC, JSX} from "react";
import {BarCardProps} from "../types";
import {getPercentage} from "../utils/get-percentage";

/**
 * Displays a horizontal bar with a value and optional percentage.
 *
 * If `percentage` is not provided, it is calculated using `value / max`.
 *
 * @param props - {@link BarCardProps}
 * @returns A styled bar card component
 */
export const BarCard: FC<BarCardProps> = ({
    title,
    value,
    max = 100,
    percentage,
    label,
    caption,
    color = 'default',
    className = ''
}: BarCardProps): JSX.Element => {
    const pct: number = getPercentage(percentage ?? Math.round((value / max) * 100));

    return (
        <div className={`sio-bar-card ${className}`}>
            <div className="sio-bar-card__title">{title}</div>
            <div className="sio-bar-card__value">{value}</div>
            <div className="sio-bar-card__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <div className={`sio-bar-card__fill ${color}`} style={{ width: `${pct}%` }}></div>
            </div>
            {(label || caption) && (
                <div className="sio-bar-card__footer">
                    <span>{label && label}</span>
                    <span>{caption && caption}</span>
                </div>
            )}
        </div>
    );
}