import {type Readable, writable} from "svelte/store";

export interface Toast {
  message: string;
  state: 'error' | 'info' | 'warning';
  // type set as NodeJS to avoid TS error, interface is the same for our needs
  timeout?: NodeJS.Timeout;
}

export type Toasts = Set<Toast>;

interface ToastStore extends Readable<Toasts> {
  clear: () => void;
  push: (toast: Toast) => void;
  close: (toast: Toast) => void;

  info: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

const TOAST_DURATION = 3000;

function createToastStore(): ToastStore
{
  const { subscribe, set, update } = writable<Toasts>(new Set);

  const push = (toast: Toast) => update((toasts) => {
    toasts.add(toast);

    toast.timeout = setTimeout(() => {
      update((toasts) => {
        toasts.delete(toast);
        return toasts;
      });
    }, TOAST_DURATION);

    return toasts;
  });

  const info = (message: string) => push({ message, state: 'info' });
  const error = (message: string) => push({ message, state: 'error' });
  const warning = (message: string) => push({ message, state: 'warning' });

  const close = (toast: Toast) => update((toasts) => {
    clearTimeout(toast.timeout);

    toasts.delete(toast);
    return toasts;
  });

  const clear = () => {
    update((toasts) => {

      toasts.forEach((toast) => {
        clearTimeout(toast.timeout);
      });

      toasts = new Set();
      return toasts;
    });

    set(new Set);
  }

  return {
    subscribe,

    push,
    close,
    clear,

    info,
    error,
    warning,
  }
}

export const toasts = createToastStore();
