/** basic debounce function */
export function debounce(fnc: Function, delayMs: number): Function
{
  // type set as NodeJS to avoid TS error, interface is the same for our needs
  let timeoutId:NodeJS.Timeout = null;

  return (...args) =>
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fnc(...args), delayMs);
  }
}
