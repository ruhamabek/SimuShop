// hooks/useDebouncedCallback.ts
import { useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  dependencies: any[],
  timeout: number
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
