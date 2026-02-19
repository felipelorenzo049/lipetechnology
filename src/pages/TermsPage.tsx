import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GradientBackground } from "@/components/ui/gradient-background";
import { useTranslation } from "react-i18next";

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <GradientBackground
      className="min-h-screen text-foreground overflow-x-hidden"
      animationDuration={12}
      overlay
      overlayOpacity={0.75}
    >
      <Navbar />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">
            {t("terms.title")}
          </h1>
          <div className="prose prose-invert prose-sm max-w-none font-body space-y-6 text-foreground/80">
            {(t("terms.sections", { returnObjects: true }) as Array<{ heading: string; content: string }>).map((s, i) => (
              <div key={i}>
                <h2 className="font-headline text-lg font-semibold text-foreground mt-8 mb-3">{s.heading}</h2>
                <p className="leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs font-body mt-12">{t("terms.lastUpdated")}</p>
        </div>
      </section>
      <Footer />
    </GradientBackground>
  );
};

export default TermsPage;
