import { HeroSection } from "@/components/home/hero-section";
import { QuickOrderSection } from "@/components/home/quick-order-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ReviewsSection } from "@/components/product/reviews-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { ServiceInfoSection } from "@/components/home/service-info-section";
import { instagramFollowersContent, instagramLikesContent, instagramViewsContent } from "@/lib/buzzoid-content";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickOrderSection />

      {/* Buzzoid-style Services Section */}
      <section className="py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">FoxFollows Services</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">
            Amplify your social media impact with FoxFollows's comprehensive Instagram and TikTok services.
            Our user-friendly platform delivers real followers, likes, views, and comments in just a few clicks.
            Experience rapid, secure growth for your accounts with our top-rated engagement packages.
          </p>
        </div>

        <ServiceInfoSection {...instagramFollowersContent} />
        <ServiceInfoSection {...instagramLikesContent} reversed />
        <ServiceInfoSection {...instagramViewsContent} />
      </section>

      <HowItWorks />
      <FeaturesSection />
      <ReviewsSection platformName="FoxFollows" />
      <FAQSection />
      <CTASection />
    </>
  );
}
