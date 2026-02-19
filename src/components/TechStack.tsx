import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

// --- Inline SVG Logos ---
const ReactLogo = () => (
  <svg viewBox="0 0 256 228" className="size-10" fill="none">
    <path d="M210.483 73.824a174.61 174.61 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.986 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.99 4.76-1.53 29.151-10.08 48.442-25.838 48.442-41.42 0-14.956-18.018-30.793-46.316-40.902zm-33.462 36.294c-.636 1.949-1.318 3.912-2.042 5.882a200.756 200.756 0 0 0-10.178-17.636 201.932 201.932 0 0 0 12.22-.254zm-24.118 42.36a358.03 358.03 0 0 1-7.37 10.9 355.78 355.78 0 0 1-13.123-.158 352.53 352.53 0 0 1-12.895-5.135 350.39 350.39 0 0 1-7.093-11.08 352.53 352.53 0 0 1 5.568-12.37 353.93 353.93 0 0 1 7.132-10.834 352.39 352.39 0 0 1 12.986.207 349.64 349.64 0 0 1 12.743 5.207 346.3 346.3 0 0 1 6.89 10.937 354.5 354.5 0 0 1-4.838 12.326zm11.141-8.763a207.07 207.07 0 0 1 2.202 6.19c-2.04.564-4.123 1.09-6.242 1.574a312.4 312.4 0 0 0 4.04-7.764zm-28.027 27.565c-2.397-2.63-4.788-5.478-7.138-8.535a318.29 318.29 0 0 0 7.246.198 272.236 272.236 0 0 0 7.401-.28 189.18 189.18 0 0 1-7.509 8.617zm-27.89-14.283a199.06 199.06 0 0 1-6.103-1.588 191.53 191.53 0 0 0 3.915-7.529 323.71 323.71 0 0 0 2.188 9.117zm-4.654-29.675a308.99 308.99 0 0 0-3.803-7.38 195.37 195.37 0 0 1 5.899-1.557 295.39 295.39 0 0 0-2.096 8.937zm14.076-27.927c2.452 2.7 4.9 5.624 7.305 8.77a325.79 325.79 0 0 0-7.546-.213 317.08 317.08 0 0 0-7.093.227 235.64 235.64 0 0 1 7.334-8.784zm-35.801 8.02c-5.5-9.47-9.504-18.45-11.726-26.396-1.986-7.1-2.632-13.084-1.86-17.58.695-4.05 2.472-6.905 5.352-8.568 6.34-3.66 19.37-1.016 34.89 8.39a150.65 150.65 0 0 1 3.798 2.36 288.76 288.76 0 0 0-9.453 10.52 293.68 293.68 0 0 0-10.59 3.487c-.39 1.616-.74 3.217-1.052 4.796-3.648 18.477-1.546 34.252 4.45 42.632a181.76 181.76 0 0 1-4.94-4.58c-3.632-3.517-6.79-7.253-8.87-10.26v-5.3zm-20.463 59.897c-1.8-.507-3.563-1.04-5.283-1.598-24.608-7.98-40.236-20.685-40.236-31.625 0-11.474 16.998-24.973 43.37-33.247a125.72 125.72 0 0 1 8.577-2.664 293.15 293.15 0 0 0 4.982 14.135 293.14 293.14 0 0 0-5.35 14.316 133.77 133.77 0 0 1-6.06 40.683zm67.75 48.547c-15.108 13.707-30.364 21.066-40.208 15.403-10.259-5.902-13.403-23.716-8.752-47.298a147.87 147.87 0 0 1 1.75-7.928 296.86 296.86 0 0 0 14.644 3.47 289.69 289.69 0 0 0 10.758 12.992 125.38 125.38 0 0 1-4.605 4.284c-4.58 3.94-8.71 6.72-12.103 8.448l6.516 3.76zM128 167.577c3.2 0 6.374-.13 9.517-.372a315.6 315.6 0 0 0 5.4 8.078c-4.983.39-9.997.587-14.917.587s-9.934-.198-14.917-.587a315.6 315.6 0 0 0 5.4-8.078c3.143.241 6.317.372 9.517.372zm43.057-23.013c5.057 24.186 1.718 42.562-8.6 48.507-10.747 6.196-28.283-1.468-44.636-18.577a125.38 125.38 0 0 1-4.107-4.517 287.55 287.55 0 0 0 10.6-12.838 299.99 299.99 0 0 0 14.88-3.423 132.46 132.46 0 0 1 1.442 6.384c1.656 8.78 1.744 16.455.496 22.069l7.925-4.573zm27.244-35.164c25.018 8.318 41.699 21.502 41.699 32.267 0 11.542-18.146 25.568-44.798 33.822a125.72 125.72 0 0 1-4.116 1.318 296.41 296.41 0 0 0-5.176-13.98 283.23 283.23 0 0 0 5.003-14.15c1.924-.503 3.81-1.04 5.655-1.606z" fill="hsl(var(--primary))"/>
    <circle cx="128" cy="113.634" r="23.844" fill="hsl(var(--primary))"/>
  </svg>
);

const NextJSLogo = () => (
  <svg viewBox="0 0 180 180" className="size-10" fill="none">
    <circle cx="90" cy="90" r="85" stroke="hsl(var(--foreground))" strokeWidth="6"/>
    <path d="M75 55v70l55-70" stroke="hsl(var(--foreground))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M115 55v40" stroke="url(#next-grad)" strokeWidth="8" strokeLinecap="round"/>
    <defs><linearGradient id="next-grad" x1="115" y1="55" x2="115" y2="95"><stop stopColor="hsl(var(--foreground))"/><stop offset="1" stopColor="hsl(var(--foreground))" stopOpacity="0"/></linearGradient></defs>
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 256 256" className="size-10" fill="none">
    <rect width="256" height="256" rx="20" fill="hsl(var(--primary))"/>
    <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.259 4.492-2.906 8.048-6.796 10.669-11.67 2.621-4.874 3.932-10.86 3.932-17.958 0-5.122-.859-9.57-2.577-13.343-1.718-3.774-4.107-7.127-7.166-10.06-3.059-2.933-6.681-5.577-10.864-7.932-4.184-2.355-8.78-4.632-13.789-6.832-3.627-1.554-6.857-3.059-9.691-4.515-2.834-1.457-5.225-2.933-7.175-4.428-1.95-1.495-3.435-3.108-4.457-4.837-1.021-1.729-1.532-3.726-1.532-5.991 0-2.091.468-3.977 1.402-5.66.935-1.682 2.275-3.127 4.022-4.335 1.747-1.208 3.888-2.138 6.422-2.79 2.534-.652 5.391-.978 8.572-.978 2.274 0 4.665.198 7.175.594 2.51.396 5.038 1.012 7.584 1.848s5.024 1.907 7.432 3.213c2.407 1.306 4.618 2.86 6.632 4.663V109.5c-3.972-1.684-8.311-2.946-13.018-3.789-4.706-.842-10.049-1.264-16.028-1.264-6.535 0-12.722.691-18.56 2.073-5.838 1.382-10.96 3.534-15.366 6.455-4.406 2.921-7.893 6.681-10.461 11.28-2.569 4.599-3.853 10.094-3.853 16.486 0 8.401 2.448 15.445 7.344 21.131 4.896 5.686 12.327 10.53 22.293 14.532 3.972 1.613 7.65 3.166 11.033 4.661 3.384 1.495 6.31 3.069 8.78 4.721 2.469 1.652 4.406 3.46 5.811 5.424 1.406 1.963 2.109 4.252 2.109 6.868 0 1.918-.424 3.676-1.273 5.275-.849 1.599-2.122 2.978-3.819 4.135-1.697 1.157-3.819 2.057-6.368 2.699-2.549.643-5.553.964-9.013.964-5.903 0-11.723-1.085-17.461-3.255-5.738-2.17-11.014-5.382-15.829-9.636zM56 106.238h28.748V228h23.238V106.238H137V85H56v21.238z" fill="hsl(var(--primary-foreground))"/>
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 109 113" className="size-10" fill="none">
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb1)"/>
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb2)" fillOpacity=".2"/>
    <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072z" fill="hsl(var(--primary))"/>
    <defs>
      <linearGradient id="sb1" x1="53.974" y1="54.974" x2="94.163" y2="71.829"><stop stopColor="hsl(var(--primary))" stopOpacity=".6"/><stop offset="1" stopColor="hsl(var(--primary))"/></linearGradient>
      <linearGradient id="sb2" x1="36.156" y1="30.578" x2="54.484" y2="72.263"><stop/><stop offset="1" stopOpacity="0"/></linearGradient>
    </defs>
  </svg>
);

const NodeJSLogo = () => (
  <svg viewBox="0 0 256 289" className="size-10" fill="none">
    <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V82.942c0-1.325-.53-2.385-1.59-2.915L128.795 18.81c-1.06-.53-2.385-.53-3.18 0L20.14 80.027c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.442-1.325 25.442-10.6V92.748c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v121.376c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 221.27 0 214.38 0 206.96V84.267c0-7.42 4.24-14.31 10.865-17.755L116.605 5.03c6.36-3.445 14.84-3.445 21.2 0l105.74 61.482c6.625 3.445 10.865 10.335 10.865 17.755V206.96c0 7.42-4.24 14.575-10.865 17.755l-105.74 61.482c-3.18 1.59-6.89 2.385-10.865 2.385l.06-.118z" fill="hsl(var(--primary))"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 256 154" className="size-10" fill="none">
    <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="hsl(var(--primary))"/>
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="size-10" fill="hsl(var(--primary))">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.722zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z"/>
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 256 256" className="size-10" fill="none">
    <rect width="256" height="256" rx="20" fill="hsl(var(--primary))"/>
    <path d="M117.4 110.2c0-7.7 6.3-10.7 16.7-10.7 15 0 33.9 4.5 48.9 12.6V74.4c-16.4-6.5-32.6-9.1-48.9-9.1-40 0-66.6 20.9-66.6 55.8 0 54.4 74.9 45.7 74.9 69.2 0 9.1-7.9 12.1-19 12.1-16.4 0-37.4-6.7-54-15.8v38.6c18.4 7.9 36.9 11.3 54 11.3 41 0 69.1-20.3 69.1-55.7-.1-58.7-75.1-48.3-75.1-70.6z" fill="hsl(var(--primary-foreground))"/>
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 256 384" className="size-10" fill="none">
    <path d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64z" fill="hsl(var(--primary))" opacity=".8"/>
    <path d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64z" fill="hsl(var(--primary))" opacity=".6"/>
    <path d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64z" fill="hsl(var(--primary))" opacity=".4"/>
    <path d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64V0z" fill="hsl(var(--primary))" opacity=".6"/>
    <circle cx="192" cy="192" r="64" fill="hsl(var(--primary))"/>
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
];

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

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("techstack.techLabel")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("techstack.techTitle")}{" "}
            <span className="gradient-text">{t("techstack.techHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-24">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 hover:glow-primary transition-all group"
            >
              <div className="p-3 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-colors">
                <tech.Logo />
              </div>
              <span className="font-mono text-sm text-foreground/80 font-medium">{tech.name}</span>
            </motion.div>
          ))}
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
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.criteria")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.diyBuilders")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.tradAgency")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">
                  <span className="gradient-text font-bold">LIPE</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonKeys.map((key) => {
                const row = comparisonData[key];
                return (
                  <tr key={key} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-body font-medium">{t(`techstack.${key}`)}</td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.diy} /></div></td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.agency} /></div></td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.lipe} /></div></td>
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
