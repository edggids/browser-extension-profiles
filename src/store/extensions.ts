import {type Readable, writable} from "svelte/store";
import {getExtensions} from "../api/extension.js";
import type {ExtensionModel} from "../models/ExtensionModel";
import {toasts} from "./toasts";

interface ExtensionsStore extends Readable<ExtensionModel[]> {
  refresh: () => Promise<void>;
}

function createExtensionsStore(): ExtensionsStore
{
  const { subscribe, set } = writable<ExtensionModel[]>([]);

  function refresh(){
    return getExtensions()
        .then( (extensions) => set(extensions))
        .catch((err) => toasts.error(err.message));
  }

  // load initial value
  refresh();

  return {
    subscribe,
    refresh,
  };
}

export const extensions = createExtensionsStore();
