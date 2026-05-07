export const COLOR_TOKENS: ColorToken[] = ['success', 'caution', 'warning', 'danger', 'info', 'default'];

export type ColorToken = 'success' | 'caution' | 'warning' | 'danger' | 'info' | 'default';

export type ColorValue =
    | ColorToken
    | `#${string}`
    | `rgb(${string})`
    | `hsl(${string})`
    | `var(--${string})`;