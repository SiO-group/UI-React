import {TrendDirection} from "../types";

/**
 * Renders a small directional icon representing a trend.
 *
 * @param direction - Direction of the trend: up, down, or neutral
 * @returns SVG icon representing the trend direction
 */
export const TrendIcon = ({ direction }: { direction: TrendDirection }) => {
    if (direction === 'up') return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
    if (direction === 'down') return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 2L8 8M8 8H4M8 8V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
};