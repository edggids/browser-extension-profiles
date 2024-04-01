import {getDefaultColors} from "./colors";

export function getCustomProfile() {
  return {
    id: null,
    name: 'custom',
    color: getDefaultColors(),
    pinned: false,
    hash: 'unknown'
  };
}
