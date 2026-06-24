import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, createScope, type Scope } from "animejs";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  width?: number;
  align?: "left" | "center";
};

/**
 * Thin circuit accent: a horizontal line with 1-2 nodes and a small branch,
 * drawn on enter via stroke-dashoffset, with a cyan signal dot traveling.
 * reduced-motion: fully drawn, no traveling dot.
 */
const SectionSignal = ({ className, width = 180, align = "left" }: Props) => {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (reduced) {
      el.querySelectorAll<SVGPathElement>("[data-line]").forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          scopeRef.current = createScope({ root: el }).add(() => {
            animate("[data-line]", {
              strokeDashoffset: [
                (_: Element, i: number) => (i === 0 ? 220 : 60),
                0,
              ],
              duration: 900,
              delay: (_: Element, i: number) => i * 150,
              ease: "outCubic",
            });
            animate("[data-signal]", {
              opacity: [0, 1, 1, 0],
              translateX: [0, width - 20],
              duration: 1800,
              delay: 400,
              loop: true,
              ease: "inOutQuad",
            });
            animate("[data-node]", {
              opacity: [0, 1],
              scale: [0.6, 1],
              duration: 500,
              delay: (_: Element, i: number) => 500 + i * 120,
              ease: "outBack",
            });
          });
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      scopeRef.current?.revert();
    };
  }, [reduced, width]);

  const h = 24;
  const w = width;
  // main line, branch up to a node
  const mainPath = `M0 ${h / 2} L${w} ${h / 2}`;
  const branchX = Math.round(w * 0.62);
  const branchPath = `M${branchX} ${h / 2} L${branchX + 14} 4`;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none select-none",
        align === "center" ? "mx-auto" : "",
        className,
      )}
      style={{ width: w, height: h }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <defs>
          <linearGradient id="ss-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <filter id="ss-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          data-line
          d={mainPath}
          stroke="url(#ss-line)"
          strokeWidth="1"
          fill="none"
          style={{ strokeDasharray: 220, strokeDashoffset: 220 }}
        />
        <path
          data-line
          d={branchPath}
          stroke="hsl(var(--accent))"
          strokeOpacity="0.55"
          strokeWidth="1"
          fill="none"
          style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
        />
        <circle
          data-node
          cx={branchX + 14}
          cy={4}
          r={2}
          fill="hsl(var(--accent))"
          filter="url(#ss-glow)"
          style={{ opacity: 0 }}
        />
        <circle
          data-node
          cx={w - 2}
          cy={h / 2}
          r={2.5}
          fill="hsl(var(--primary))"
          filter="url(#ss-glow)"
          style={{ opacity: 0 }}
        />
        <circle
          data-signal
          cx={0}
          cy={h / 2}
          r={2.5}
          fill="hsl(var(--accent))"
          filter="url(#ss-glow)"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
};

export default SectionSignal;
