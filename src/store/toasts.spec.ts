import { get } from 'svelte/store';
import { toasts, type Toast } from './toasts';
import {beforeEach, describe, expect, it} from "vitest";

describe("ToastStore", () => {
  let toast: Toast;

  beforeEach(() => {
    toast = { message: 'Test', state: 'info' };

    toasts.clear();
  });

  it("should add toast to store", () => {
    toasts.push(toast);

    expect(get(toasts).has(toast)).toBe(true);
  });

  it("should remove toast from store", () => {
    toasts.push(toast);
    toasts.close(toast);

    expect(get(toasts).has(toast)).toBe(false);
  });

  it("should clear all toasts from store", () => {
    toasts.push(toast);
    toasts.clear();

    expect(get(toasts).size).toBe(0);
  });

  it("should add info toast to store", () => {
    toasts.info('Info message');

    const toastStore = get(toasts);

    expect(toastStore.size).toBe(1);
    expect([...toastStore][0].state).toBe('info');
  });

  it("should add error toast to store", () => {
    toasts.error('Error message');

    const toastStore = get(toasts);

    expect(toastStore.size).toBe(1);
    expect([...toastStore][0].state).toBe('error');
  });

  it("should add warning toast to store", () => {
    toasts.warning('Warning message');

    const toastStore = get(toasts);

    expect(toastStore.size).toBe(1);
    expect([...toastStore][0].state).toBe('warning');
  });
});
