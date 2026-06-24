import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin cyan scroll-progress bar fixed to the top of the viewport.
 * Uses transform only; respects prefers-reduced-motion via spring with
 * minimal stiffness for users without reduced motion preference.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.7)] pointer-events-none"
    />
  );
};

export default ScrollProgress;
