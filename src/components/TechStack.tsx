import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// --- Inline SVG Logos ---
const ReactLogo = () => (
  <svg viewBox="0 0 256 228" className="size-7" fill="none">
    <path d="M210.483 73.824a174.61 174.61 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.986 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.99 4.76-1.53 29.151-10.08 48.442-25.838 48.442-41.42 0-14.956-18.018-30.793-46.316-40.902z" fill="currentColor"/>
    <circle cx="128" cy="113.634" r="23.844" fill="hsl(var(--background))"/>
  </svg>
);

const NextJSLogo = () => (
  <svg viewBox="0 0 180 180" className="size-7" fill="none">
    <circle cx="90" cy="90" r="85" stroke="currentColor" strokeWidth="6"/>
    <path d="M75 55v70l55-70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M115 55v40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity=".5"/>
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 256 256" className="size-7" fill="none">
    <rect width="256" height="256" rx="20" fill="currentColor"/>
    <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.259 4.492-2.906 8.048-6.796 10.669-11.67 2.621-4.874 3.932-10.86 3.932-17.958 0-5.122-.859-9.57-2.577-13.343-1.718-3.774-4.107-7.127-7.166-10.06-3.059-2.933-6.681-5.577-10.864-7.932-4.184-2.355-8.78-4.632-13.789-6.832-3.627-1.554-6.857-3.059-9.691-4.515-2.834-1.457-5.225-2.933-7.175-4.428-1.95-1.495-3.435-3.108-4.457-4.837-1.021-1.729-1.532-3.726-1.532-5.991 0-2.091.468-3.977 1.402-5.66.935-1.682 2.275-3.127 4.022-4.335 1.747-1.208 3.888-2.138 6.422-2.79 2.534-.652 5.391-.978 8.572-.978 2.274 0 4.665.198 7.175.594 2.51.396 5.038 1.012 7.584 1.848s5.024 1.907 7.432 3.213c2.407 1.306 4.618 2.86 6.632 4.663V109.5c-3.972-1.684-8.311-2.946-13.018-3.789-4.706-.842-10.049-1.264-16.028-1.264-6.535 0-12.722.691-18.56 2.073-5.838 1.382-10.96 3.534-15.366 6.455-4.406 2.921-7.893 6.681-10.461 11.28-2.569 4.599-3.853 10.094-3.853 16.486 0 8.401 2.448 15.445 7.344 21.131 4.896 5.686 12.327 10.53 22.293 14.532 3.972 1.613 7.65 3.166 11.033 4.661 3.384 1.495 6.31 3.069 8.78 4.721 2.469 1.652 4.406 3.46 5.811 5.424 1.406 1.963 2.109 4.252 2.109 6.868 0 1.918-.424 3.676-1.273 5.275-.849 1.599-2.122 2.978-3.819 4.135-1.697 1.157-3.819 2.057-6.368 2.699-2.549.643-5.553.964-9.013.964-5.903 0-11.723-1.085-17.461-3.255-5.738-2.17-11.014-5.382-15.829-9.636zM56 106.238h28.748V228h23.238V106.238H137V85H56v21.238z" fill="hsl(var(--background))"/>
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 109 113" className="size-7" fill="none">
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="currentColor" opacity=".6"/>
    <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072z" fill="currentColor"/>
  </svg>
);

const NodeJSLogo = () => (
  <svg viewBox="0 0 256 289" className="size-7" fill="none">
    <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V82.942c0-1.325-.53-2.385-1.59-2.915L128.795 18.81c-1.06-.53-2.385-.53-3.18 0L20.14 80.027c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.442-1.325 25.442-10.6V92.748c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v121.376c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 221.27 0 214.38 0 206.96V84.267c0-7.42 4.24-14.31 10.865-17.755L116.605 5.03c6.36-3.445 14.84-3.445 21.2 0l105.74 61.482c6.625 3.445 10.865 10.335 10.865 17.755V206.96c0 7.42-4.24 14.575-10.865 17.755l-105.74 61.482c-3.18 1.59-6.89 2.385-10.865 2.385l.06-.118z" fill="currentColor"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 256 154" className="size-7" fill="none">
    <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="currentColor"/>
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.722zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z"/>
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 256 256" className="size-7" fill="none">
    <rect width="256" height="256" rx="20" fill="currentColor"/>
    <path d="M117.4 110.2c0-7.7 6.3-10.7 16.7-10.7 15 0 33.9 4.5 48.9 12.6V74.4c-16.4-6.5-32.6-9.1-48.9-9.1-40 0-66.6 20.9-66.6 55.8 0 54.4 74.9 45.7 74.9 69.2 0 9.1-7.9 12.1-19 12.1-16.4 0-37.4-6.7-54-15.8v38.6c18.4 7.9 36.9 11.3 54 11.3 41 0 69.1-20.3 69.1-55.7-.1-58.7-75.1-48.3-75.1-70.6z" fill="hsl(var(--background))"/>
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 256 384" className="size-7" fill="none">
    <path d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64z" fill="currentColor" opacity=".8"/>
    <path d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64z" fill="currentColor" opacity=".6"/>
    <path d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64z" fill="currentColor" opacity=".4"/>
    <path d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64V0z" fill="currentColor" opacity=".6"/>
    <circle cx="192" cy="192" r="64" fill="currentColor"/>
  </svg>
);

// New logos
const VercelLogo = () => (
  <svg viewBox="0 0 256 222" className="size-7" fill="currentColor">
    <path d="M128 0L256 221.705H0L128 0z"/>
  </svg>
);

const FramerMotionLogo = () => (
  <svg viewBox="0 0 256 384" className="size-7" fill="currentColor">
    <path d="M0 0h256v128H128L0 0z"/>
    <path d="M0 128h128l128 128H128V384L0 256V128z"/>
  </svg>
);

const N8NLogo = () => (
  <svg viewBox="0 0 256 256" className="size-7" fill="none">
    <rect width="256" height="256" rx="40" fill="currentColor"/>
    <text x="128" y="148" textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--background))" fontSize="100" fontWeight="bold" fontFamily="sans-serif">n8n</text>
  </svg>
);

const LovableLogo = () => (
  <svg viewBox="0 0 256 256" className="size-7" fill="none">
    <path d="M128 230c-5.5 0-10.2-2-14.2-5.9L36.5 147.8C16.1 127.4 16.1 94.6 36.5 74.2c20.4-20.4 53.2-20.4 73.6 0L128 92.1l17.9-17.9c20.4-20.4 53.2-20.4 73.6 0 20.4 20.4 20.4 53.2 0 73.6l-77.3 76.3c-4 3.9-8.7 5.9-14.2 5.9z" fill="currentColor"/>
  </svg>
);

const techs = [
  { name: "React", Logo: ReactLogo },
  { name: "Next.js", Logo: NextJSLogo },
  { name: "TypeScript", Logo: TypeScriptLogo },
  { name: "Supabase", Logo: SupabaseLogo },
  { name: "Node.js", Logo: NodeJSLogo },
  { name: "Tailwind CSS", Logo: TailwindLogo },
  { name: "OpenAI", Logo: OpenAILogo },
  { name: "Stripe", Logo: StripeLogo },
  { name: "Figma", Logo: FigmaLogo },
  { name: "Vercel", Logo: VercelLogo },
  { name: "Framer Motion", Logo: FramerMotionLogo },
  { name: "N8N", Logo: N8NLogo },
  { name: "Lovable", Logo: LovableLogo },
];

// Concentric rings distribution
const rings = [
  { radius: 240, mobileRadius: 145, items: [techs[0], techs[1], techs[2], techs[3], techs[4], techs[5]] },
  { radius: 160, mobileRadius: 95, items: [techs[6], techs[7], techs[8], techs[9]] },
  { radius: 85, mobileRadius: 52, items: [techs[10], techs[11], techs[12]] },
];

const IntegrationCard = ({ children, className, isCenter = false, name }: { children: React.ReactNode; className?: string; isCenter?: boolean; name?: string }) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl flex items-center justify-center border shadow-md transition-all duration-300 hover:scale-110",
        isCenter
          ? "size-20 border-primary/40 bg-primary/10 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]"
          : "size-14 border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_15px_-4px_hsl(var(--primary)/0.2)]",
        className
      )}
    >
      <div className={cn("flex items-center justify-center", isCenter ? "text-primary" : "")}>
        {children}
      </div>
      {name && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {name}
        </span>
      )}
    </div>
  );
};

const comparisonKeys = ["customization", "speed", "cost", "techQuality", "storytelling", "continuousSupport"];
const comparisonData: Record<string, { diy: number; agency: number; lipe: number }> = {
  customization: { diy: 1, agency: 3, lipe: 5 },
  speed: { diy: 4, agency: 2, lipe: 4 },
  cost: { diy: 4, agency: 1, lipe: 3 },
  techQuality: { diy: 2, agency: 4, lipe: 5 },
  storytelling: { diy: 1, agency: 3, lipe: 5 },
  continuousSupport: { diy: 1, agency: 3, lipe: 5 },
};

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-accent text-accent" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const TechStack = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        {/* Concentric Arc Integration Layout */}
        <div className="flex flex-col items-center mb-24">
          {/* Circular arc container */}
          <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[560px] md:h-[560px] mb-12">
            {/* Glowing concentric arc backgrounds with orbital tracks */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Outer ring glow + dashed orbit track */}
              <div className="absolute w-[290px] h-[290px] md:w-[480px] md:h-[480px] rounded-full border border-dashed border-primary/10 animate-glow-ring-1" />
              <div className="absolute w-[480px] h-[480px] md:w-[560px] md:h-[560px] rounded-full border border-border/20 bg-gradient-to-b from-primary/5 to-secondary/5 animate-glow-ring-1" />
              {/* Middle ring glow + dashed orbit track */}
              <div className="absolute w-[190px] h-[190px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-primary/10 animate-glow-ring-2" />
              <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-border/15 bg-gradient-to-b from-primary/5 to-transparent animate-glow-ring-2" />
              {/* Inner ring glow + dashed orbit track */}
              <div className="absolute w-[104px] h-[104px] md:w-[170px] md:h-[170px] rounded-full border border-dashed border-primary/15 animate-glow-ring-3" />
              <div className="absolute w-[170px] h-[170px] md:w-[250px] md:h-[250px] rounded-full border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent animate-glow-ring-3" />
            </div>

            {/* Individual orbiting logos — chained transforms */}
            {rings.map((ring, ringIndex) => {
              const animationNames = ["orbit-ring-1", "orbit-ring-2", "orbit-ring-3"];
              const durations = [120, 90, 60];

              return ring.items.map((tech, i) => {
                const globalIndex = rings.slice(0, ringIndex).reduce((acc, rr) => acc + rr.items.length, 0) + i;
                const delay = -(i / ring.items.length) * durations[ringIndex];

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.1 + globalIndex * 0.06, type: "spring", stiffness: 200 }}
                    className="absolute left-1/2 top-1/2 z-10 orbit-logo -ml-[22px] -mt-[22px] md:-ml-[28px] md:-mt-[28px]"
                    style={{
                      animation: `${animationNames[ringIndex]} ${durations[ringIndex]}s linear infinite`,
                      animationDelay: `${delay}s`,
                      animationPlayState: inView ? "running" : "paused",
                    }}
                  >
                    <IntegrationCard name={tech.name} className="size-11 md:size-14 hover:!scale-125 hover:shadow-[0_0_25px_-4px_hsl(var(--primary)/0.4)] transition-all duration-300">
                      <tech.Logo />
                    </IntegrationCard>
                  </motion.div>
                );
              });
            })}

            {/* Center LIPE logo with breathing glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
              className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="animate-breathe lipe-glow">
                <span className="font-headline font-bold tracking-widest gradient-text text-2xl md:text-3xl select-none">LIPE</span>
              </div>
            </motion.div>
          </div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center max-w-xl"
          >
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              {t("techstack.techTitle")}{" "}
              <span className="gradient-text">{t("techstack.techHighlight")}</span>
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              {t("techstack.techSubtitle")}
            </p>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold font-body hover:bg-primary/10 hover:border-primary/40 transition-all hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)] uppercase tracking-wide text-sm group"
            >
              {t("cta.getQuote")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-2xl md:text-3xl font-bold">
            {t("techstack.comparisonTitle")}{" "}
            <span className="gradient-text">{t("techstack.comparisonHighlight")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <table className="w-full min-w-[500px] glass rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-4 px-5 font-body text-sm text-muted-foreground font-medium">{t("techstack.criteria")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium bg-primary/5 border-l border-primary/10">
                  <span className="gradient-text font-bold">LIPE</span>
                </th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.diyBuilders")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.tradAgency")}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonKeys.map((key) => {
                const row = comparisonData[key];
                return (
                  <tr key={key} className="border-b border-border/30 transition-colors hover:bg-primary/[0.03]">
                    <td className="py-3.5 px-5 text-sm font-body font-medium">{t(`techstack.${key}`)}</td>
                    <td className="py-3.5 px-4 text-center"><div className="flex justify-center"><Stars count={row.diy} /></div></td>
                    <td className="py-3.5 px-4 text-center"><div className="flex justify-center"><Stars count={row.agency} /></div></td>
                    <td className="py-3.5 px-4 text-center bg-primary/5 border-l border-primary/10"><div className="flex justify-center"><Stars count={row.lipe} /></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
