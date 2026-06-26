import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, forwardRef, isValidElement, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  stagger?: boolean;
  step?: number;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, y = 32, className, stagger = false, step = 0.09 }, ref) => {
    const reduced = useReducedMotion();
    if (reduced) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    if (stagger) {
      const container: Variants = {
        hidden: {},
        show: {
          transition: { staggerChildren: step, delayChildren: delay },
        },
      };
      const item: Variants = {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      };
      return (
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={className}
        >
          {Children.map(children, (child, i) =>
            isValidElement(child) ? (
              <motion.div key={i} variants={item}>
                {child}
              </motion.div>
            ) : (
              child
            ),
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  },
);
Reveal.displayName = "Reveal";

export default Reveal;
