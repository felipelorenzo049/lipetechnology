import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, y = 16, className }, ref) => {
    const reduced = useReducedMotion();
    if (reduced) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  },
);
Reveal.displayName = "Reveal";

export default Reveal;
