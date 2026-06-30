import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SignalThread — a vertical "signal" wire behind the whole page. A dim base
 * wire runs the full height (the uncharged future); a bright "charged" segment
 * fills from the top down to the current scroll position — the signal travels
 * DOWN with you — with a luminous pulse riding its leading edge. Pin-free,
 * scroll-linked via rAF, transform/opacity/stroke only.
 */
const SignalThread = () => {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement | null>(null); // geometry source
  const chargeRef = useRef<SVGPathElement | null>(null); // bright charged overlay
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const [pageHeight, setPageHeight] = useState(0);

  // Track total document height so the SVG spans the page.
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

  // Charged segment fills top -> scroll position; pulse rides its edge.
  useEffect(() => {
    const path = pathRef.current;
    const charge = chargeRef.current;
    const pulse = pulseRef.current;
    if (!path || !charge) return;

    let length = path.getTotalLength();
    charge.style.strokeDasharray = `${length}`;

    if (reduced) {
      charge.style.strokeDashoffset = "0";
      if (pulse) pulse.setAttribute("opacity", "0");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const t = Math.max(0, Math.min(1, scrollTop / max));
      charge.style.strokeDashoffset = `${length * (1 - t)}`;
      if (pulse) {
        const pt = path.getPointAtLength(t * length);
        pulse.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        const fade = Math.min(1, Math.max(0, (t - 0.01) / 0.05));
        pulse.setAttribute("opacity", String(0.95 * fade));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      length = path.getTotalLength();
      charge.style.strokeDasharray = `${length}`;
      update();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
            <stop offset="0%" stopColor="#3B7DE8" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#2BB8A0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.95" />
          </linearGradient>

          <filter id="signal-thread-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dim base wire (uncharged), full height */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.1"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Charged segment (bright), fills top -> scroll position */}
        <path
          ref={chargeRef}
          d={d}
          fill="none"
          stroke="url(#signal-thread-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Pulse at the charged edge */}
        <g filter="url(#signal-thread-glow)">
          <circle ref={pulseRef} r="5" fill="hsl(var(--accent))" opacity={0} />
        </g>
      </svg>
    </div>
  );
};

export default SignalThread;
