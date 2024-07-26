import { useEffect, useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: any[]) => void>(callback: T, propsDelay?: number): ((...args: Parameters<T>) => void) => {
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef<number | null>(null);  
  const delay = propsDelay ?? 2000;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (lastCallTimeRef.current === null || (now - lastCallTimeRef.current) >= delay) {
      callbackRef.current(...args);
      lastCallTimeRef.current = now;
    }
  }, [delay]);

  return throttledCallback;
};