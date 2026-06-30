import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SignalThread — a subtle vertical "signal" wire behind the page: a dim base
 * wire full-height, with a bright segment that charges from the top down to the
 * current scroll position. Background accent only — pin-free, scroll-linked rAF.
 */
const SignalThread = () => {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement | null>(null);
  const chargeRef = useRef<SVGPathElement | null>(null);
  const [pageHeight, setPageHeight] = useState(0);

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

  useEffect(() => {
    const path = pathRef.current;
    const charge = chargeRef.current;
    if (!path || !charge) return;
    let length = path.getTotalLength();
    charge.style.strokeDasharray = `${length}`;
    if (reduced) {
      charge.style.strokeDashoffset = "0";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const t = Math.max(0, Math.min(1, scrollTop / max));
      charge.style.strokeDashoffset = `${length * (1 - t)}`;
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
            <stop offset="0%" stopColor="#3B7DE8" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#2BB8A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.08"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={chargeRef}
          d={d}
          fill="none"
          stroke="url(#signal-thread-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default SignalThread;
