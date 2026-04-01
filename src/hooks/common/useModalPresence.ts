import { useEffect, useRef, useState } from "react";

export function useModalPresence(open: boolean, durationMs = 220) {
  const [rendered, setRendered] = useState(open);
  const [entered, setEntered] = useState(false);
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeRef.current) {
      window.clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => {
        setEntered(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      const raf = requestAnimationFrame(() => {
        setEntered((prev) => (prev ? false : prev));
      });
      timeRef.current = window.setTimeout(() => {
        setRendered(false);
        timeRef.current = null;
      }, durationMs);
      return () => {
        cancelAnimationFrame(raf);
        if (timeRef.current) {
          window.clearTimeout(timeRef.current);
        }
      };
    }
  }, [open, durationMs]);

  return { rendered, entered };
}
