import {ReactNode} from "react";
import {ColorToken} from "./color-token";

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface Trend {
    direction: TrendDirection;
    value: string | number;
    label?: string;
}

/**
 * Props for the StatCard component.
 */
export interface StatCardProps {
    /** Short descriptive title of the statistic */
    title: string;
    /** Primary value displayed prominently */
    value: string | number;
    /** Optional supporting label or context below the value */
    label?: string;
    /**
     * Optional icon displayed inside a colored badge.
     * Accepts any ReactNode (typically an SVG icon).
     */
    icon?: ReactNode;
    /**
     * Color theme of the card.
     * Always explicitly provided by the parent (no internal inference).
     */
    color?: ColorToken;
    /**
     * Optional trend indicator (e.g. growth, decline, neutral).
     * Typically used to show evolution over time.
     */
    trend?: Trend;
    /** Additional CSS class names */
    className?: string;
}