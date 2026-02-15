import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { AILabSection } from "@/components/ai-lab-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { InsightsSection } from "@/components/insights-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Page() {
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dkapture Agency",
    "address": [
      { "@type": "PostalAddress", "addressLocality": "Miami", "addressRegion": "FL", "addressCountry": "US" },
      { "@type": "PostalAddress", "addressLocality": "Orlando", "addressRegion": "FL", "addressCountry": "US" }
    ],
    "url": "https://dkapture.com"
  };

  return (
    <main id="main-content" className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
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
