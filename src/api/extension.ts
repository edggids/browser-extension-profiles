import { api } from "./api";
import {getCurrentAppId} from "./currentApp";
import type {ExtensionModel} from "../models/ExtensionModel";

export function getExtensions(): Promise<chrome.management.ExtensionInfo[]>
{
    return api.management.getAll();
}

export function setExtensionState(extensionId, enabled): Promise<void>
{
  return api.management.setEnabled(extensionId, enabled);
}

export function getActiveExtensionIds(excludeSelf = true): Promise<Set<ExtensionModel['id']>>
{
  return getExtensions()
    .then(extensions => {
      const ids = new Set<string>();

      extensions.forEach(extension => {
        if (extension.enabled && (!excludeSelf || extension.id !== getCurrentAppId())) {
          ids.add(extension.id);
        }
      });

      return ids;
    });
}
