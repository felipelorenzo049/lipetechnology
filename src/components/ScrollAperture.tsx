import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SLIT = 46; // % de inset topo/baixo no estado "fenda" fechada

const ScrollAperture = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.clipPath = "inset(0% 0% 0% 0%)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh; // topo na base do viewport -> fechado
      const end = vh * 0.5; // topo no meio do viewport -> totalmente aberto
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const eased = p * p * (3 - 2 * p); // smoothstep
      const inset = (SLIT * (1 - eased)).toFixed(2);
      el.style.clipPath = `inset(${inset}% 0% ${inset}% 0%)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(46% 0% 46% 0%)",
        willChange: "clip-path",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAperture;
