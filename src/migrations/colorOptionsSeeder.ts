import type {Migration} from "./migrationsHandler";
import type {ColorOption} from "../models/ColorOption";
import {colorOptionStorageKey} from "../api/colorOptions";

const colors: ColorOption[] = [
  { name: "ocean", color: { default: '#319EDB', light: '#F4FBFF', darker: '#1772A5' } },
  { name: "green", color: { default: '#48A68A', light: '#F2F9F7', darker: '#318B70' } },
  { name: "orange", color: { default: '#e99d09', light: '#fff6e5', darker: '#d99b24' } },
  { name: "purple", color: { default: '#A000D8', light: '#fdeefd', darker: '#7E07A8' } },
  { name: "cherry", color: { default: '#bb5874', light: '#eddadf', darker: '#a80734' } },
  { name: "neon", color: { default: '#7bad2a', light: '#f8fbf3', darker: '#659f0a' } },
  { name: "seaweed", color: { default: '#0fada5', light: '#f1f7f7', darker: '#0c8780' } },
  { name: "night", color: { default: '#102693', light: '#f4f5f7', darker: '#051563' } },
  { name: "rust", color: { default: '#74720a', light: '#fffff4', darker: '#5a5807' } },
  { name: "sun", color: { default: '#c3b50a', light: '#fffdf4', darker: '#b99c12' } },
  { name: "pink", color: { default: '#d7199c', light: '#fff4fc', darker: '#bb0883' } },
];

const migration: Migration = {
  up: (storage) => storage.set(colorOptionStorageKey, colors),
  down: (storage) => storage.remove(colorOptionStorageKey),
}

export default migration;
