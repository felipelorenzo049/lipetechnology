import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SignalThread — a single vertical gradient SVG path that runs behind
 * the entire page, with a luminous pulse traveling along it synced to
 * scroll progress (0 at top → 1 at bottom). Lightweight: one SVG, one
 * rAF tied to scroll, transform/opacity only.
 */
const SignalThread = () => {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const drawRef = useRef<SVGPathElement | null>(null);
  const [pageHeight, setPageHeight] = useState(0);

  // Track total document height so SVG spans the page.
  useEffect(() => {
    const measure = () => setPageHeight(document.documentElement.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Draw-in on mount
  useEffect(() => {
    const el = drawRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    if (reduced) {
      el.style.strokeDashoffset = "0";
      return;
    }
    el.style.strokeDashoffset = `${len}`;
    el.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: 1800, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" },
    );
  }, [reduced, pageHeight]);

  // Scroll-synced pulse
  useEffect(() => {
    if (reduced) return;
    const path = pathRef.current;
    const pulse = pulseRef.current;
    if (!path || !pulse) return;

    let raf = 0;
    let length = path.getTotalLength();
    const recomputeLen = () => { length = path.getTotalLength(); };
    recomputeLen();

    const update = () => {
      raf = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const t = Math.max(0, Math.min(1, scrollTop / max));
      const pt = path.getPointAtLength(t * length);
      pulse.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      // Fade pulse near the very top so it doesn't clash with the navbar.
      const fade = Math.min(1, Math.max(0, (t - 0.02) / 0.06));
      pulse.setAttribute("opacity", String(0.95 * fade));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { recomputeLen(); update(); });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, pageHeight]);

  // Straight vertical thread — guarantees centered nodes sit exactly on it.
  const W = 200;
  const H = Math.max(pageHeight, 1200);
  const cx = W / 2;
  const d = `M ${cx} 0 L ${cx} ${H}`;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0"
      style={{ height: H }}
    >
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="signal-thread-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B7DE8" stopOpacity="0" />
            <stop offset="4%" stopColor="#3B7DE8" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#3B7DE8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#2BB8A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
          </linearGradient>

          <filter id="signal-thread-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft halo behind the thread */}
        <path
          d={d}
          fill="none"
          stroke="url(#signal-thread-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.18"
          vectorEffect="non-scaling-stroke"
        />
        {/* Main thread (drawable) */}
        <path
          ref={(el) => { pathRef.current = el; drawRef.current = el; }}
          d={d}
          fill="none"
          stroke="url(#signal-thread-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Scroll-synced pulse */}
        <g filter="url(#signal-thread-glow)">
          <circle
            ref={pulseRef}
            r="5"
            fill="hsl(var(--accent))"
            opacity={reduced ? 0 : 0.95}
          />
        </g>
      </svg>
    </div>
  );
};

export default SignalThread;
