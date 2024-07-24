// Module imports
import { useRef, useEffect } from "react";

// Type declarations
type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;


// Hook declaration
export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 250
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}