import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-body text-sm tracking-wide uppercase"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden border border-border/60 shadow-[0_8px_32px_-8px_hsl(220_78%_57%/0.2)]"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-[0_4px_24px_-4px_hsl(220_78%_57%/0.15)] flex items-center justify-center space-x-6 px-8 py-3"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-3 group p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-lg object-cover w-[120px] h-[60px] border border-border/30"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-headline font-semibold mb-0.5 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground text-xs max-w-[10rem] leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) => {
  return (
    <a
      href={href}
      {...rest}
      className="text-muted-foreground hover:text-primary transition-colors text-sm font-body py-1 block"
    >
      {children}
    </a>
  );
};
