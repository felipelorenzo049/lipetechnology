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

const Index = () => {
  return (
    <GradientBackground
      className="min-h-screen text-foreground overflow-x-hidden"
      animationDuration={12}
      overlay
      overlayOpacity={0.75}
    >
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
