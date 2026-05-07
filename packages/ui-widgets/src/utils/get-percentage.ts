export const getPercentage = (value: number): number =>
    Math.min(100, Math.max(0, value));