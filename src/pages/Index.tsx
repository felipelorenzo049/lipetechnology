import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
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
      <Services />
      <Portfolio preview />
      <Process />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </GradientBackground>
  );
};

export default Index;
