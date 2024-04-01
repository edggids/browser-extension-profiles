import type {ExtensionModel} from "../models/ExtensionModel";

export const EXTENSION_SOURCES = {
  CHROME: "chrome",
  EDGE: "edge",
  LOCAL: "local",
} as const;

const EXTENSION_SOURCES_HOSTNAME = {
  "clients2.google.com": EXTENSION_SOURCES.CHROME,
  "edge.microsoft.com": EXTENSION_SOURCES.EDGE,
}

export function getExtensionSource(extension: ExtensionModel): typeof EXTENSION_SOURCES[keyof typeof EXTENSION_SOURCES]
{
  try{
    const hostname = new URL(extension.updateUrl).hostname;

    return EXTENSION_SOURCES_HOSTNAME[hostname] || EXTENSION_SOURCES.LOCAL;
  }
  catch(e) {
    return EXTENSION_SOURCES.LOCAL;
  }
}
