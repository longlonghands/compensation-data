/**
 * Waits specific amount of time for a function to fulfill (kind of Async timer)
 *
 * @param {number} timeout
 * @param {function} check
 * @return {Promise<void>}
 */
export async function waitUntil(timeout: number, check: () => boolean, checkInterval = 100) {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (check()) {
        clearInterval(timer);
        resolve(undefined);
      }
    }, checkInterval);
    setTimeout(() => {
      clearInterval(timer);
      reject();
    }, timeout);
  });
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
