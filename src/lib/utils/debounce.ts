// $lib/utils/debounce.ts

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Creates a debounced async function that cancels previous invocations
 * and only executes the latest one after the delay.
 *
 * @param func - The async function to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced async function
 */
export function debounceAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
  let timeoutId: ReturnType<typeof setTimeout>;
  let currentController: AbortController | null = null;

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
    // Cancel previous timeout
    clearTimeout(timeoutId);

    // Abort previous request if it's still running
    if (currentController) {
      currentController.abort();
    }

    // Create new abort controller for this request
    currentController = new AbortController();
    const controller = currentController;

    return new Promise<Awaited<ReturnType<T>> | undefined>((resolve) => {
      timeoutId = setTimeout(async () => {
        try {
          // Check if this request was aborted
          if (controller.signal.aborted) {
            resolve(undefined);
            return;
          }

          const result = await func(...args) as Awaited<ReturnType<T>>;

          // Only resolve if this request wasn't aborted
          if (!controller.signal.aborted) {
            resolve(result);
          }
        } catch (error) {
          // Only reject if this wasn't an abort
          if (!controller.signal.aborted) {
            throw error;
          }
          resolve(undefined);
        }
      }, delay);
    });
  };
}
