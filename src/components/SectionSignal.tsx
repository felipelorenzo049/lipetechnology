import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  width?: number;
  align?: "left" | "center";
};

/**
 * SectionNode — a luminous node that "belongs" to the global SignalThread.
 * Renders as an absolutely-positioned dot at the top-center of its nearest
 * <section>, with a thin gradient connector dropping toward the eyebrow.
 * The node lights up (scale + glow + draw connector) when the section enters
 * the viewport, simulating the signal arriving from the thread.
 *
 * Backwards-compatible: keeps the SectionSignal name + ignores legacy props
 * (width/align/className) so existing call sites work unchanged.
 */
const SectionSignal = (_props: Props) => {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [section, setSection] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const sec = anchorRef.current?.closest("section") as HTMLElement | null;
    if (!sec) return;
    const cs = getComputedStyle(sec);
    if (cs.position === "static") sec.style.position = "relative";
    setSection(sec);
  }, []);

  return (
    <>
      <span ref={anchorRef} aria-hidden className="hidden" />
      {section ? createPortal(<NodeDot section={section} />, section) : null}
    </>
  );
};

const NodeDot = ({ section }: { section: HTMLElement }) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -60% 0px", once: true });
  const on = reduced ? true : inView;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-[1] flex flex-col items-center"
      style={{ width: 2 }}
    >
      {/* Outer halo */}
      <motion.span
        initial={false}
        animate={{
          opacity: on ? 1 : 0,
          scale: on ? 1 : 0.4,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-1.5 h-5 w-5 rounded-full -translate-x-1/2 left-1/2 blur-[6px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.9) 0%, hsl(var(--primary) / 0.5) 45%, transparent 70%)",
        }}
      />
      {/* Core dot */}
      <motion.span
        initial={false}
        animate={{
          opacity: on ? 1 : 0.25,
          scale: on ? 1 : 0.6,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: on ? 0.05 : 0 }}
        className="block h-1.5 w-1.5 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)",
          boxShadow:
            "0 0 8px hsl(var(--accent) / 0.9), 0 0 18px hsl(var(--primary) / 0.45)",
        }}
      />
      {/* Connector down toward eyebrow */}
      <motion.span
        initial={false}
        animate={{ scaleY: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: on ? 0.15 : 0 }}
        className="mt-1 w-px origin-top"
        style={{
          height: 56,
          background:
            "linear-gradient(to bottom, hsl(var(--accent) / 0.9), hsl(var(--primary) / 0.5) 60%, transparent)",
        }}
      />
    </div>
  );
};

export default SectionSignal;
