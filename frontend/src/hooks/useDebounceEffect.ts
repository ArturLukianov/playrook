import { useEffect, useRef } from 'react';

export function useDebounceEffect<T>(
  value: T,
  callback: (value: T) => void,
  delay: number = 3000,
  areEqual: (a: T, b: T) => boolean = (a, b) => a === b
) {
  const timeoutRef = useRef<number | null>(null);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    // Skip if value hasn't actually changed
    if (areEqual(value, previousValueRef.current)) return;

    // Update previous value and clear existing timeout
    previousValueRef.current = value;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set new timeout
    timeoutRef.current = window.setTimeout(() => {
      callback(value);
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, callback, areEqual]);
}
