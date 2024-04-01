import {toasts} from "./toasts";
import {getDefaultColors} from "../utils/colors";
import {getColorOptions} from "../api/colorOptions";
import {type Readable, writable} from "svelte/store";
import type {ColorOption} from "../models/ColorOption";

interface ColorOptionsStore extends Readable<ColorOption[]> {
  refresh: () => void;
  defaultColor: () => ColorOption;
}

function createColorOptionsStore(): ColorOptionsStore
{
  const { subscribe, set } = writable<ColorOption[]>([]);
  const defaultColor:ColorOption = { name: 'default', color: getDefaultColors() };

  const refresh = async () => {
    getColorOptions()
      .then( options => set(options) )
      .catch((err) => toasts.error(err.message));
  }

  refresh();

  return {
    subscribe,

    refresh,
    defaultColor: () => defaultColor,
  };
}

export const colorOptions = createColorOptionsStore();
