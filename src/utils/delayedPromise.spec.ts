import {expect, test} from "vitest";
import {delayedPromise} from "./delayedPromise";

function createPromise<T>(value: T, duration: number) {
  return new Promise<T>(resolve => {
    setTimeout(() => resolve(value), duration);
  });
}

function inDelayRange(startTime: number, endTime: number, delay: number) {
  const elapsedTime = endTime - startTime;
  return elapsedTime >= delay && elapsedTime < (delay * 1.1);
}

test('should return the promise result', async () => {
  const promise = Promise.resolve(1);
  const delayed = delayedPromise(promise, 10);

  expect(await delayed).toBe(1);
});

test('should delay an immediately resolving promise', async () => {
  const startTime = Date.now();
  const delay = 250;

  const promise = delayedPromise(Promise.resolve('success'), delay);
  const result = await promise;

  expect(result).toBe('success');
  expect(inDelayRange(startTime, Date.now(), delay)).toBe(true);
});

test('should delay a promise that takes time to resolve', async () => {
  const startTime = Date.now();
  const delay = 250;

  const promise = delayedPromise(createPromise('success', 150), delay);
  const result = await promise;

  expect(result).toBe('success');
  expect(inDelayRange(startTime, Date.now(), delay)).toBe(true);
});
