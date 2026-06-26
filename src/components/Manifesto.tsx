import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The section assembles itself as it scrolls into view: the side rails draw
  // down, a center rule traces, then the label, quote and description build in.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-mf='sideline']", { scaleY: 0, transformOrigin: "top center", duration: 0.7, stagger: 0.12 }, 0)
        .from("[data-mf='rule']", { scaleX: 0, transformOrigin: "center", duration: 0.5 }, 0.1)
        .from("[data-mf='label']", { opacity: 0, y: 16, duration: 0.5 }, 0.25)
        .from("[data-mf='quote']", { opacity: 0, y: 28, duration: 0.8 }, 0.35)
        .from("[data-mf='hl']", { opacity: 0.3, filter: "blur(6px)", duration: 0.6, clearProps: "filter" }, 0.55)
        .from("[data-mf='desc']", { opacity: 0, y: 18, duration: 0.6 }, 0.7);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="pt-12 pb-24 md:pt-16 md:pb-32 relative overflow-hidden">
      {/* Top fade from Hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <div
        data-mf="sideline"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
      />
      <div
        data-mf="sideline"
        className="absolute right-0 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent"
      />

      <div className="container mx-auto px-6 max-w-3xl text-center">
        <div className="flex justify-center mb-6">
          <span
            data-mf="rule"
            aria-hidden
            className="block h-px w-16 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, hsl(var(--accent)), transparent)" }}
          />
        </div>

        <p
          data-mf="label"
          className="font-mono text-sm text-secondary tracking-wider uppercase mb-8"
        >
          {t("manifesto.label")}
        </p>

        <blockquote
          data-mf="quote"
          className="font-headline text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 mb-8"
        >
          {t("manifesto.quote1")}{" "}
          <span data-mf="hl" className="gradient-text font-bold">
            {t("manifesto.quoteHighlight")}
          </span>
          .
        </blockquote>

        <p
          data-mf="desc"
          className="text-muted-foreground text-base md:text-lg leading-relaxed font-body"
        >
          {t("manifesto.description")}{" "}
          <span className="text-foreground font-medium">
            {t("manifesto.descriptionHighlight")}
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
