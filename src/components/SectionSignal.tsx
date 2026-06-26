import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  width?: number;
  align?: "left" | "center";
};

/**
 * SectionSignal — visible inline gradient rule + portal'd luminous node
 * anchored to the section top-center. Both light up together when the
 * section enters the viewport, drawing the signal from the global thread.
 *
 * Inline rule: thin gradient bar (scaleX 0→1) sitting near the eyebrow.
 * Portal node: glowing dot + downward connector at section top center.
 *
 * Backwards-compatible: legacy props (width/align/className) accepted.
 */
const SectionSignal = ({ width = 96, align = "left", className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [section, setSection] = useState<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "-10% 0px -20% 0px", once: true });
  const on = reduced ? true : inView;

  useEffect(() => {
    const sec = ref.current?.closest("section") as HTMLElement | null;
    if (!sec) return;
    const cs = getComputedStyle(sec);
    if (cs.position === "static") sec.style.position = "relative";
    setSection(sec);
  }, []);

  return (
    <>
      <motion.span
        ref={ref}
        aria-hidden
        initial={false}
        animate={{ scaleX: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`block h-px ${align === "center" ? "mx-auto" : ""} ${className}`}
        style={{
          width,
          transformOrigin: align === "center" ? "center" : "left",
          background:
            "linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--primary)) 55%, hsl(var(--secondary)) 100%)",
          boxShadow: "0 0 12px hsl(var(--accent) / 0.45)",
        }}
      />
      {section ? createPortal(<NodeDot on={on} />, section) : null}
    </>
  );
};

const NodeDot = ({ on }: { on: boolean }) => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-[1] flex flex-col items-center"
      style={{ width: 2 }}
    >
      <motion.span
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-1.5 h-5 w-5 rounded-full -translate-x-1/2 left-1/2 blur-[6px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.9) 0%, hsl(var(--primary) / 0.5) 45%, transparent 70%)",
        }}
      />
      <motion.span
        initial={false}
        animate={{ opacity: on ? 1 : 0.25, scale: on ? 1 : 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: on ? 0.05 : 0 }}
        className="block h-1.5 w-1.5 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)",
          boxShadow:
            "0 0 8px hsl(var(--accent) / 0.9), 0 0 18px hsl(var(--primary) / 0.45)",
        }}
      />
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
