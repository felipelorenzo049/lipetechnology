import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/\\#$%&";

type Segment = { text: string; className?: string };

type Props = {
  segments: Segment[];
  /** total scramble duration in ms */
  duration?: number;
  /** ms between locking adjacent chars */
  stagger?: number;
  className?: string;
  /** restart key — change to replay */
  trigger?: string | number;
};

/**
 * Decode/terminal scramble effect: characters cycle through random glyphs and
 * lock to their final value one-by-one. Respects prefers-reduced-motion by
 * rendering the final text statically.
 */
export const ScrambleText = ({
  segments,
  duration = 1400,
  stagger = 28,
  className,
  trigger,
}: Props) => {
  const [reduced, setReduced] = useState(false);
  const [chars, setChars] = useState<string[]>(() =>
    segments.flatMap((s) => Array.from(s.text)),
  );
  const rafRef = useRef<number | null>(null);

  // Build a flat char map with segment indexes preserved for styling
  const charMap = segments.flatMap((s, segIdx) =>
    Array.from(s.text).map((ch) => ({ ch, segIdx })),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setChars(charMap.map((c) => c.ch));
      return;
    }

    const finals = charMap.map((c) => c.ch);
    const start = performance.now();
    const lockTimes = finals.map((_, i) => i * stagger);
    const total = Math.max(duration, lockTimes[lockTimes.length - 1] + 200);

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = finals.map((finalCh, i) => {
        if (finalCh === " " || finalCh === "\n") return finalCh;
        if (elapsed >= lockTimes[i] + 180) return finalCh;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      setChars(next);
      if (elapsed < total) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(finals);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, trigger]);

  // Render preserving segment styling
  let cursor = 0;
  return (
    <span className={className} aria-label={segments.map((s) => s.text).join("")}>
      {segments.map((seg, sIdx) => {
        const len = Array.from(seg.text).length;
        const slice = chars.slice(cursor, cursor + len).join("");
        cursor += len;
        return (
          <span key={sIdx} className={seg.className} aria-hidden>
            {slice}
          </span>
        );
      })}
    </span>
  );
};

export default ScrambleText;
