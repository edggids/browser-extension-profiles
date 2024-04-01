import {expect, test, vi} from "vitest";
import {debounce} from "./debounce";

test('debounced function is called after specified delay', async () => {
  const fn = vi.fn();
  const debouncedFn = debounce(fn, 100);

  debouncedFn();

  expect(fn).not.toBeCalled();

  await new Promise(r => setTimeout(r, 150));
  expect(fn).toBeCalled();
});

test('debounced function is not called if delay has not passed', async () => {
  const fn = vi.fn();
  const debouncedFn = debounce(fn, 100);

  debouncedFn();

  await new Promise(r => setTimeout(r, 50));
  expect(fn).not.toBeCalled();
});

test('debounced function is called only once for multiple calls within delay', async () => {
  const fn = vi.fn();
  const debouncedFn = debounce(fn, 100);

  debouncedFn();
  debouncedFn();
  debouncedFn();

  await new Promise(r => setTimeout(r, 150));
  expect(fn).toBeCalledTimes(1);
});
