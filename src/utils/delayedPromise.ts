/**
 * delay a promise resolution by a given amount of time
 */
export function delayedPromise<T = void>(promise: Promise<T>, delayMs: number): Promise<T>
{
  return new Promise((resolve) => {
    let endTime = Date.now() + delayMs;

    promise
      .then( r => {
        const now = Date.now();

        now >= endTime
          ? resolve(r)
          : setTimeout(() => resolve(r), endTime - now);
      })
  });
}
