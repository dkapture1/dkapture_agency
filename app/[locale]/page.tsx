import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { AILabSection } from "@/components/ai-lab-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { InsightsSection } from "@/components/insights-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AILabSection />
      <PortfolioSection />
      <InsightsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
