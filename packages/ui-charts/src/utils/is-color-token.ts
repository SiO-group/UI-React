import {COLOR_TOKENS, ColorToken, ColorValue} from "../types/color-token";

export const isColorToken = (value?: ColorValue): boolean => {
    return !!value && COLOR_TOKENS.includes(value as ColorToken)
}