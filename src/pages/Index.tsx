import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import SectionCTA from "@/components/SectionCTA";
import KPIs from "@/components/KPIs";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GradientBackground } from "@/components/ui/gradient-background";
import { ConnectedBackground } from "@/components/ui/connected-background";


const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [location.hash]);

  return (
    <GradientBackground
      className="min-h-screen text-foreground overflow-x-hidden"
      animationDuration={12}
      overlay
      overlayOpacity={0.75}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <ConnectedBackground className="h-full w-full" />
      </div>
      <div className="relative z-10">
      <Navbar />

      <Hero />
      <Manifesto />
      <KPIs />
      <Services />
      <SectionCTA textKey="ctaSections.afterServices" highlightKey="ctaSections.afterServicesHighlight" />
      <Portfolio preview />
      <SectionCTA textKey="ctaSections.afterPortfolio" highlightKey="ctaSections.afterPortfolioHighlight" />
      <Process />
      <TechStack />
      <Testimonials />
      <SectionCTA textKey="ctaSections.afterTestimonials" highlightKey="ctaSections.afterTestimonialsHighlight" />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </GradientBackground>
  );
};

export default Index;
