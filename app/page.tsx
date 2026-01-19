import { HeroSection } from "@/components/home/hero-section";
import { PlatformCards } from "@/components/home/platform-cards";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformCards />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
