import { api } from "./api";
import type {HEXColor} from "../models/ColorModel";

export function setBadge(text: string, color: HEXColor): Promise<void>
{
  return Promise.all([
    api.action.setBadgeText({ text }),
    api.action.setBadgeBackgroundColor({ color }),
  ]).then(res => {});
}
