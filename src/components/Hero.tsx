import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleText } from "@/components/ScrambleText";
import { MagneticButton } from "@/components/MagneticButton";
import SignalCore from "@/components/SignalCore";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(bloomRef.current, { opacity: 0, scale: 0.6, duration: 1.2, ease: "power2.out" }, 0)
        .from("[data-hero='line']", { scaleX: 0, transformOrigin: "center", duration: 0.7 }, 0.1)
        .from("[data-hero='eyebrow']", { opacity: 0, y: 14, duration: 0.7 }, "<")
        .from("[data-hero='headline']", { opacity: 0, y: 26, duration: 0.9 }, "-=0.35")
        .from("[data-hero='subhead']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from("[data-hero='cta'] > *", { opacity: 0, y: 18, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from("[data-hero='scroll']", { opacity: 0, duration: 0.6 }, "-=0.2");

      // Scroll-out scene (no pin — keeps the scroll honest, no dead-zone
      // spacer). The headline swells slightly and the content lifts + fades
      // late as the hero scrolls away while the bloom recedes.

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.5 },
          defaults: { ease: "none" },
        })
        .to("[data-hero='headline']", { scale: 1.05, duration: 1 }, 0)
        .to("[data-hero='content']", { yPercent: -10, duration: 1 }, 0)
        .to("[data-hero='eyebrow']", { opacity: 0, duration: 0.3 }, 0.08)
        .to("[data-hero='content']", { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7)
        .to(bloomRef.current, { scale: 0.85, opacity: 0.4, yPercent: -6, duration: 1 }, 0);

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (fine.matches && parallaxRef.current) {
        const xTo = gsap.quickTo(parallaxRef.current, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(parallaxRef.current, "y", { duration: 0.7, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
          const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
          xTo(dx * 10);
          yTo(dy * 8);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-24 md:pt-32 md:pb-20"
    >
      <div
        ref={bloomRef}
        data-hero="bloom"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,760px)] h-[min(90vw,760px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.18) 0%, hsl(var(--secondary) / 0.12) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <SignalCore />

      <div data-hero="content" className="relative z-10 w-full">
        <div ref={parallaxRef} className="container mx-auto px-6 text-center max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span data-hero="line" className="h-px w-10 bg-accent/60" />
            <span
              data-hero="eyebrow"
              className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.32em] uppercase"
            >
              {t("hero.badge")}
            </span>
            <span data-hero="line" className="h-px w-10 bg-accent/60" />
          </div>

          <h1
            data-hero="headline"
            className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.92] tracking-[-0.035em] mb-10"
          >
            <ScrambleText
              trigger={i18n.language}
              duration={1400}
              stagger={22}
              segments={[
                { text: t("hero.title1") + " " },
                { text: t("hero.titleHighlight"), className: "gradient-text italic" },
                { text: " " + t("hero.title2") },
              ]}
            />
          </h1>

          <p
            data-hero="subhead"
            className="text-base md:text-lg text-muted-foreground/90 max-w-xl mx-auto mb-14 font-body leading-relaxed"
          >
            {t("hero.subtitle")}
          </p>

          <div data-hero="cta" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={() => scrollTo("#portfolio")}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
            >
              {t("hero.ctaProjects")}
              <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#contato")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-accent/40 text-foreground font-medium hover:bg-accent/10 hover:border-accent"
            >
              <MessageCircle size={18} />
              {t("hero.ctaContact")}
            </MagneticButton>
          </div>
        </div>
      </div>


      <div data-hero="scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
