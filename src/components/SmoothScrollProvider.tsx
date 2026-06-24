import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // touch left native for mobile fluidity
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      // keep framer-motion useScroll + anime.js onScroll in sync
      window.dispatchEvent(new Event("scroll"));
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
