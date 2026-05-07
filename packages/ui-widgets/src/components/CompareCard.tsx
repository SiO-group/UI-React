import {FC, JSX} from "react";
import {getPercentage} from "../utils/get-percentage";
import {isColorToken} from "../utils/is-color-token";
import {ColorToken, ColorValue, CompareCardProps, CompareItem} from "../types";

/**
 * Displays a comparison bar chart for multiple items.
 *
 * Each item's bar width is calculated relative to the highest value in `items`,
 * unless an explicit `percentage` is provided on the item.
 *
 * @param props - {@link CompareCardProps}
 * @returns A visual comparison card with proportional bars
 */
export const CompareCard: FC<CompareCardProps> = ({
    title,
    items,
    showValues = true,
    className = '',
}: CompareCardProps): JSX.Element => {
    const maxVal: number = Math.max(...items.map(i => i.value), 1);

    return (
        <div className={`sio-compare-card ${className}`}>
            <div className="sio-compare-card__title">{title}</div>

            <div className="sio-compare-card__rows">
                {items.map((item: CompareItem, i: number) => {
                    const pct: number = getPercentage(item.percentage ?? Math.round((item.value / maxVal) * 100));
                    const isToken: boolean = isColorToken(item.color);

                    const colorClass: ColorToken | string = isToken || !item.color ? (item.color ?? 'default') : '';
                    const colorStyle: { background: ColorValue } | undefined = (!isToken && item.color) ? { background: item.color } : undefined;

                    return (
                        <div key={i} className="sio-compare-card__row">
                            <span
                                className={`sio-compare-card__dot ${colorClass}`}
                                style={colorStyle}
                                aria-hidden
                            />
                            <span className="sio-compare-card__label">{item.label}</span>
                            <div className="sio-compare-card__bar-track">
                                <div
                                    className={`sio-compare-card__bar-fill ${colorClass}`}
                                    style={{ width: `${pct}%`, ...(colorStyle ?? {}) }}
                                />
                            </div>
                            {showValues && (
                                <span className="sio-compare-card__value">{item.value}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};