import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, createDrawable, createMotionPath } from "animejs";

/**
 * HeroCore — "signal lab" reactor SVG. Concentric circuit rings, nodes,
 * traveling light signals, subtle mouse-driven 3D tilt. Sits BEHIND the
 * hero headline. Respects prefers-reduced-motion and pauses when hidden.
 */
const RINGS = [
  { r: 90, dash: false, dur: 60, dir: 1 },
  { r: 140, dash: true, dur: 90, dir: -1 },
  { r: 195, dash: false, dur: 120, dir: 1 },
  { r: 255, dash: true, dur: 160, dir: -1 },
];

// Polar -> cartesian (cx=cy=300)
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: 300 + r * Math.cos(a), y: 300 + r * Math.sin(a) };
};

// Pre-baked nodes at ring/angle intersections
const NODES: { x: number; y: number; r: number }[] = [];
RINGS.forEach((ring, i) => {
  const count = 4 + i * 2;
  for (let k = 0; k < count; k++) {
    const angle = (360 / count) * k + (i % 2 === 0 ? 0 : 22);
    const p = polar(ring.r, angle);
    NODES.push({ ...p, r: 2.4 });
  }
});

// Connector lines between a handful of nodes (sparse, elegant)
const CONNECTIONS: [number, number][] = [
  [0, 6], [2, 10], [4, 14], [8, 18], [12, 22], [16, 26], [1, 20], [5, 24],
].filter(([a, b]) => a < NODES.length && b < NODES.length) as [number, number][];

const HeroCore = () => {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const ringRefs = useRef<(SVGGElement | null)[]>([]);
  const signal1Ref = useRef<SVGCircleElement | null>(null);
  const signal2Ref = useRef<SVGCircleElement | null>(null);
  const path1Ref = useRef<SVGCircleElement | null>(null);
  const path2Ref = useRef<SVGCircleElement | null>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  // Spin rings + traveling signals
  useEffect(() => {
    if (reduced) return;
    const anims: any[] = [];

    ringRefs.current.forEach((el, i) => {
      if (!el) return;
      const { dur, dir } = RINGS[i];
      anims.push(
        animate(el, {
          rotate: dir > 0 ? "+=360" : "-=360",
          duration: dur * 1000,
          ease: "linear",
          loop: true,
        }),
      );
    });

    // Draw rings progressively on mount
    ringRefs.current.forEach((el) => {
      if (!el) return;
      const circle = el.querySelector("circle");
      if (!circle) return;
      const drawable = createDrawable(circle as any);
      anims.push(
        animate(drawable, { draw: ["0 0", "0 1"], duration: 1600, ease: "outQuart" }),
      );
    });

    // Signals traveling along ring paths
    if (path1Ref.current && signal1Ref.current) {
      const mp = createMotionPath(path1Ref.current as any);
      anims.push(
        animate(signal1Ref.current, {
          ...mp,
          duration: 7000,
          ease: "linear",
          loop: true,
        }),
      );
    }
    if (path2Ref.current && signal2Ref.current) {
      const mp = createMotionPath(path2Ref.current as any);
      anims.push(
        animate(signal2Ref.current, {
          ...mp,
          duration: 11000,
          ease: "linear",
          loop: true,
        }),
      );
    }

    // Node pulse
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      anims.push(
        animate(el, {
          opacity: [0.5, 1, 0.5],
          duration: 2200 + (i % 5) * 250,
          ease: "inOutSine",
          loop: true,
        }),
      );
    });

    // Pause when tab hidden
    const onVis = () => {
      anims.forEach((a) => (document.hidden ? a.pause?.() : a.play?.()));
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      anims.forEach((a) => a.pause?.());
    };
  }, [reduced]);

  // Mouse tilt
  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        if (tiltRef.current) {
          tiltRef.current.style.transform = `perspective(1200px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
        }
        setMouse({ x: 300 + x * 200, y: 300 + y * 200 });
      });
    };
    const onLeave = () => {
      if (tiltRef.current) tiltRef.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
      setMouse(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  // Node glow based on cursor proximity
  useEffect(() => {
    if (!mouse) {
      nodeRefs.current.forEach((n) => { if (n) n.style.filter = ""; });
      return;
    }
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const node = NODES[i];
      const d = Math.hypot(node.x - mouse.x, node.y - mouse.y);
      if (d < 80) {
        const k = 1 - d / 80;
        n.setAttribute("r", String(2.4 + k * 3.2));
        n.style.filter = `drop-shadow(0 0 ${4 + k * 14}px hsl(var(--accent) / ${0.6 + k * 0.4}))`;
      } else {
        n.setAttribute("r", "2.4");
        n.style.filter = "";
      }
    });
  }, [mouse]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <div
        ref={tiltRef}
        className="relative w-[min(92vw,720px)] aspect-square opacity-[0.38] md:opacity-[0.45] transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.45" />
              <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
            <filter id="signal-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central core glow */}
          <circle cx="300" cy="300" r="60" fill="url(#core-grad)" />
          <circle cx="300" cy="300" r="6" fill="hsl(var(--accent))" filter="url(#signal-glow)" opacity="0.9" />

          {/* Connector lines (static, subtle) */}
          <g stroke="hsl(var(--primary) / 0.18)" strokeWidth="0.7">
            {CONNECTIONS.map(([a, b], i) => (
              <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
            ))}
          </g>

          {/* Rings (each in its own <g> for rotation) */}
          {RINGS.map((ring, i) => (
            <g
              key={i}
              ref={(el) => (ringRefs.current[i] = el)}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle
                cx="300"
                cy="300"
                r={ring.r}
                fill="none"
                stroke="url(#ring-grad)"
                strokeOpacity={0.55}
                strokeWidth={ring.dash ? 0.9 : 1.1}
                strokeDasharray={ring.dash ? "3 7" : "none"}
              />
            </g>
          ))}

          {/* Hidden paths the signals follow */}
          <circle ref={path1Ref} cx="300" cy="300" r={140} fill="none" stroke="none" />
          <circle ref={path2Ref} cx="300" cy="300" r={255} fill="none" stroke="none" />

          {/* Nodes */}
          <g fill="hsl(var(--accent))">
            {NODES.map((n, i) => (
              <circle
                key={i}
                ref={(el) => (nodeRefs.current[i] = el)}
                cx={n.x}
                cy={n.y}
                r={n.r}
                opacity={0.7}
              />
            ))}
          </g>

          {/* Traveling light signals */}
          {!reduced && (
            <>
              <circle
                ref={signal1Ref}
                r="4"
                fill="hsl(var(--accent))"
                filter="url(#signal-glow)"
              />
              <circle
                ref={signal2Ref}
                r="3"
                fill="hsl(var(--secondary))"
                filter="url(#signal-glow)"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default HeroCore;
