import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionSignal from "@/components/SectionSignal";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Video, CreditCard, Layers, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_ITEMS = [
  { key: "realtime", Icon: Radio },
  { key: "stream", Icon: Video },
  { key: "payments", Icon: CreditCard },
  { key: "lots", Icon: Layers },
] as const;

const HorseBidSpotlight = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [4, -4]);
  const y = reduced ? 0 : rawY;
  const rotate = reduced ? 0 : rawRotate;

  // Mockup "builds itself" on enter
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-hb='glow']", { opacity: 0, duration: 0.6 }, 0)
        .from("[data-hb='frame']", { opacity: 0, y: 40, scale: 0.96, duration: 0.7 }, 0)
        .from("[data-hb='chrome']", { opacity: 0, y: -10, duration: 0.4 }, "-=0.35")
        .from("[data-hb='video']", { opacity: 0, scale: 0.94, duration: 0.6 }, "-=0.15")
        .from("[data-hb='live']", { opacity: 0, scale: 0.5, duration: 0.45, ease: "back.out(2)" }, "-=0.25")
        .from("[data-hb='bidders']", { opacity: 0, x: 12, duration: 0.4 }, "-=0.3")
        .from("[data-hb='time']", { opacity: 0, y: 10, duration: 0.4 }, "-=0.3")
        .from("[data-hb='lot']", { opacity: 0, y: 10, duration: 0.4 }, "-=0.3")
        .from("[data-hb='bid']", { opacity: 0, x: 24, duration: 0.5 }, "-=0.35")
        .from("[data-hb='nextbid']", { opacity: 0, y: 12, duration: 0.4 }, "-=0.3")
        .from("[data-hb='rows'] > *", { opacity: 0, x: 16, duration: 0.4, stagger: 0.1 }, "-=0.25");
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Animated bid counter
  const [bid, setBid] = useState(48200);
  const [bidders, setBidders] = useState(127);
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => {
      setBid((b) => b + Math.floor(Math.random() * 500) + 100);
      setBidders((n) =>
        Math.max(80, Math.min(220, n + (Math.random() > 0.5 ? 1 : -1))),
      );
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  // Time left ticker
  const [secs, setSecs] = useState(184);
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(
      () => setSecs((s) => (s > 0 ? s - 1 : 240)),
      1000,
    );
    return () => window.clearInterval(id);
  }, [reduced, inView]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="horsebid"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute left-1/2 -top-12 h-24 w-px bg-gradient-to-b from-transparent via-accent/50 to-accent/0"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3"><SectionSignal width={150} /></div>
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 ${
                      reduced ? "" : "animate-ping"
                    }`}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <p className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.3em] uppercase">
                  {t("horsebidSpotlight.eyebrow")}
                </p>
              </div>

              <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight mb-3">
                <span className="gradient-text">
                  {t("horsebidSpotlight.title")}
                </span>
              </h2>
              <p className="font-mono text-xs text-muted-foreground/80 tracking-widest uppercase mb-6">
                {t("horsebidSpotlight.tagline")}
              </p>

              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {t("horsebidSpotlight.description")}
              </p>

              <ul className="space-y-3 mb-10">
                {FEATURE_ITEMS.map(({ key, Icon }, idx) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 border border-accent/20 text-accent shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-body text-sm md:text-base text-foreground/90">
                      {t(`horsebidSpotlight.features.${key}`)}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
                style={{
                  boxShadow: "0 10px 40px -10px hsl(var(--accent) / 0.5)",
                }}
              >
                <span>{t("horsebidSpotlight.cta")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
            <motion.div
              ref={mockRef}
              style={{ y, rotate }}
              className="relative will-change-transform"
            >
              <div
                data-hb="glow"
                aria-hidden
                className="absolute -inset-10 rounded-[2rem] blur-3xl opacity-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, hsl(var(--accent) / 0.35), transparent 70%)",
                }}
              />

              <div data-hb="frame" className="relative glass rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
                <div data-hb="chrome" className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-background/40">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <div className="ml-4 flex-1">
                    <div className="font-mono text-[10px] text-muted-foreground/70 px-3 py-1 rounded bg-background/60 border border-border/40 inline-block">
                      horsebid.app/live
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-7 bg-gradient-to-br from-background/60 to-card/40">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 md:col-span-3">
                      <div data-hb="video" className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-gradient-to-br from-primary/15 via-background to-accent/10">
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, hsl(var(--foreground) / 0.06) 0 1px, transparent 1px 3px)",
                          }}
                        />
                        <div className="absolute inset-0 flex items-end justify-center pb-6">
                          <div
                            className="h-2/3 w-2/3 rounded-full blur-2xl opacity-40"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                        </div>

                        <div data-hb="live" className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-3 py-1 border border-accent/40">
                          <span className="relative flex h-2 w-2">
                            <span
                              className={`absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 ${
                                reduced ? "" : "animate-ping"
                              }`}
                            />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                          </span>
                          <span className="font-mono text-[10px] tracking-widest text-foreground">
                            {t("horsebidSpotlight.mock.live")}
                          </span>
                        </div>

                        <div data-hb="bidders" className="absolute top-3 right-3 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"].map(
                              (c, i) => (
                                <span
                                  key={i}
                                  className="h-6 w-6 rounded-full border-2 border-background"
                                  style={{ background: c }}
                                />
                              ),
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-foreground/80">
                            {bidders} {t("horsebidSpotlight.mock.bidders")}
                          </span>
                        </div>

                        <div data-hb="time" className="absolute bottom-3 left-3 rounded-md bg-background/70 backdrop-blur px-3 py-1.5 border border-border/50">
                          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                            {t("horsebidSpotlight.mock.timeLeft")}
                          </p>
                          <p className="font-mono text-lg font-semibold text-accent tabular-nums">
                            {mm}:{ss}
                          </p>
                        </div>
                      </div>

                      <div data-hb="lot" className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                            {t("horsebidSpotlight.mock.lotLabel")}
                          </p>
                          <p className="font-headline text-lg font-bold text-foreground">
                            {t("horsebidSpotlight.mock.lotName")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-5 md:col-span-2 flex flex-col gap-4">
                      <div data-hb="bid" className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {t("horsebidSpotlight.mock.currentBid")}
                        </p>
                        <motion.p
                          key={bid}
                          initial={reduced ? false : { y: -6, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.35 }}
                          className="font-mono text-3xl font-bold gradient-text tabular-nums mt-1"
                        >
                          R$ {bid.toLocaleString("pt-BR")}
                        </motion.p>
                      </div>

                      <button
                        data-hb="nextbid"
                        type="button"
                        className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 font-mono text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
                        style={{
                          boxShadow: "0 8px 32px -10px hsl(var(--accent) / 0.6)",
                        }}
                      >
                        {t("horsebidSpotlight.mock.nextBid")} · R$ {(bid + 500).toLocaleString("pt-BR")}
                      </button>

                      <div data-hb="rows" className="space-y-2">
                        {[
                          { name: "M. R.", amount: bid - 500, c: "hsl(var(--accent))" },
                          { name: "J. S.", amount: bid - 1200, c: "hsl(var(--primary))" },
                          { name: "A. P.", amount: bid - 2400, c: "hsl(var(--secondary))" },
                        ].map((b, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/40 px-3 py-2"
                          >
                            <span
                              className="h-6 w-6 rounded-full shrink-0"
                              style={{ background: b.c }}
                            />
                            <span className="font-mono text-xs text-foreground/80 flex-1">
                              {b.name}
                            </span>
                            <span className="font-mono text-xs tabular-nums text-muted-foreground">
                              R$ {b.amount.toLocaleString("pt-BR")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorseBidSpotlight;