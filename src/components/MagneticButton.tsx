import { useRef, ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

/**
 * Subtle magnetic hover effect. Translates the button slightly toward the
 * cursor. Disabled automatically by prefers-reduced-motion (handled via
 * CSS transition; reduced users still get a normal button).
 */
export const MagneticButton = ({ children, onClick, className, strength = 0.25 }: Props) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
