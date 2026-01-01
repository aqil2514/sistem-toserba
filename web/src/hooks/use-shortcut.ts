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
    // console.log("Shortcut hook mounted");

    const handler = (e: KeyboardEvent) => {
      // console.log(
      //   "Key pressed:",
      //   e.key,
      //   "ctrl:",
      //   e.ctrlKey,
      //   "alt:",
      //   e.altKey,
      //   "shift:",
      //   e.shiftKey
      // );
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.altKey === alt &&
        e.shiftKey === shift
      ) {
        e.preventDefault();
        // console.log("Shortcut triggered");
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback, key, ctrl, alt, shift]);
};
