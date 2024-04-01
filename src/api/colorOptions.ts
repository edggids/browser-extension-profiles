import storage from "./storage";
import type {ColorOption} from "../models/ColorOption";

export const colorOptionStorageKey = "color_options";

export function getColorOptions(): Promise<ColorOption[]>
{
    return storage.get<ColorOption[]>(colorOptionStorageKey, []);
}
