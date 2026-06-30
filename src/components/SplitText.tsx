import { useEffect, useRef, Fragment } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  highlight?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
  start?: string;
};

/**
 * SplitText — a heading whose words assemble one by one as it scrolls into view
 * (rise + de-blur, staggered). Words are React-rendered spans (no DOM mutation,
 * so i18n language switches stay safe); GSAP only animates transform/opacity.
 * Reduced motion renders the heading fully visible and static.
 */
export const SplitText = ({
  text,
  highlight,
  className,
  as = "h2",
  stagger = 0.045,
  start = "top 82%",
}: Props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();

  const words = [
    ...text.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: false })),
    ...(highlight ? highlight.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: true })) : []),
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const spans = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.set(spans, { opacity: 0, yPercent: 50, filter: "blur(6px)" });
      gsap.to(spans, {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, text, highlight, stagger, start]);

  const Tag = as as any;

  return (
    <Tag ref={ref} className={className}>
      {words.map((item, i) => (
        <Fragment key={`${item.w}-${i}`}>
          <span
            data-word
            className={`inline-block${item.hl ? " gradient-text" : ""}`}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {item.w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
