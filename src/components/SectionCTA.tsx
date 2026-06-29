import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionCTAProps {
  textKey: string;
  highlightKey: string;
  href?: string;
}

const SectionCTA = ({ textKey, highlightKey, href = "#contato" }: SectionCTAProps) => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const scrollTo = () => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Assembles as it scrolls into view: a signal rule draws, the line rises,
  // then the button pops in.
  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-cta='rule']", { scaleX: 0, transformOrigin: "center", duration: 0.5 }, 0)
        .from("[data-cta='text']", { opacity: 0, y: 16, duration: 0.5 }, 0.12)
        .from("[data-cta='btn']", { opacity: 0, y: 12, scale: 0.94, duration: 0.5, ease: "back.out(1.6)", clearProps: "transform,opacity" }, 0.28);
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="text-center py-12">
      <div data-cta="rule" className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <p data-cta="text" className="font-body text-muted-foreground text-lg mb-4">
        {t(textKey)}{" "}
        <span className="text-foreground font-semibold">{t(highlightKey)}</span>
      </p>
      <button
        data-cta="btn"
        onClick={scrollTo}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold font-body hover:bg-secondary/90 transition-all hover:shadow-[0_0_20px_-4px_hsl(168_55%_44%/0.4)] uppercase tracking-wide text-sm group"
      >
        {t("cta.getQuote")}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default SectionCTA;
