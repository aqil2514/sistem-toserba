import { useEffect } from "react";

export const useShortcut = (
  callback: () => void,
  {
    key,
    ctrl = false,
    alt = false,
    shift = false,
  }: { key: string; ctrl?: boolean; alt?: boolean; shift?: boolean }
) => {
  useEffect(() => {

    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.altKey === alt &&
        e.shiftKey === shift
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback, key, ctrl, alt, shift]);
};
