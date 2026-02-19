import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { GradientBackground } from "@/components/ui/gradient-background";

const PortfolioPage = () => {
  return (
    <GradientBackground
      className="min-h-screen text-foreground overflow-x-hidden"
      animationDuration={12}
      overlay
      overlayOpacity={0.75}
    >
      <Navbar />
      <div className="pt-24">
        <Portfolio />
      </div>
      <Footer />
    </GradientBackground>
  );
};

export default PortfolioPage;
