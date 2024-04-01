import type {ColorModel} from "../models/ColorModel";

export function setCurrentColor (colors: ColorModel)
{
    document.documentElement.style.setProperty('--color-current', colors.default);
    document.documentElement.style.setProperty('--color-current-light', colors.light);
    document.documentElement.style.setProperty('--color-current-darker', colors.darker);
}

export function generateCurrentColorCssVars (colors: ColorModel)
{
    return `--color-current: ${colors.default}; --color-current-light: ${colors.light}; --color-current-darker: ${colors.darker}`;
}

export function getDefaultColors (): ColorModel
{
    return { default: '#AAAAAA', light: '#fafafa', darker: '#4f4f4f' };
}
