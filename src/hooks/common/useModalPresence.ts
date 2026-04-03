import { useEffect, useRef, useState } from "react";

export function useModalPresence(open: boolean, durationMs = 220) {
  const [rendered, setRendered] = useState(open);
  const [entered, setEntered] = useState(false);
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeRef.current !== null) {
      window.clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    if (open) {
      //모달 진입 애니메이션을 위해 열릴 때 즉시 랜더 상태를 켜야함
      //eslint-disable-next-line react-hooks/set-state-in-effect
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
        if (timeRef.current !== null) {
          window.clearTimeout(timeRef.current);
          timeRef.current = null;
        }
      };
    }
  }, [open, durationMs]);

  return { rendered, entered };
}
