import { Metadata } from "next";
import { FoxLogo } from "@/components/fox-logo";
import { Shield, Users, Zap, Award, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | FoxFollows",
  description: "Learn about FoxFollows and our mission to help you grow your social media presence.",
};

const stats = [
  { label: "Happy Customers", value: "100K+" },
  { label: "Orders Delivered", value: "500K+" },
  { label: "Years in Business", value: "5+" },
  { label: "Customer Rating", value: "4.9/5" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your security is our priority. We never ask for passwords and use encrypted payments.",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    description:
      "Fast delivery times with consistent, reliable service you can count on.",
  },
  {
    icon: Users,
    title: "Real Results",
    description:
      "We deliver genuine engagement from real accounts to help you grow authentically.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We prioritize quality over quantity, ensuring every order meets our high standards.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help with any questions or issues.",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description:
      "Your success is our success. We go above and beyond to ensure your satisfaction.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FoxLogo className="mx-auto h-20 w-20" />
        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          About FoxFollows
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          FoxFollows is a leading social media growth service, helping
          individuals and businesses build their online presence since 2021. We
          believe everyone deserves the opportunity to be seen and heard in the
          digital world.
        </p>
      </section>

      {/* Stats Section */}
      <section className="mt-16 bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Our Story
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              FoxFollows was founded with a simple mission: to help creators,
              businesses, and individuals grow their social media presence in a
              safe, affordable, and effective way.
            </p>
            <p>
              We understand the challenges of building an audience from scratch.
              The algorithms often favor accounts that already have engagement,
              making it difficult for newcomers to get noticed. That&apos;s
              where we come in.
            </p>
            <p>
              Our team of social media experts has developed proven strategies
              to help you jumpstart your growth. We partner with a network of
              real users to deliver genuine engagement that helps boost your
              visibility and credibility.
            </p>
            <p>
              Over the years, we&apos;ve helped over 100,000 customers achieve
              their social media goals, from aspiring influencers to established
              brands. We&apos;re proud to be a trusted partner in their success
              stories.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Our Values
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground">Disclaimer</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            FoxFollows is not affiliated with, endorsed by, or sponsored by
            Instagram, YouTube, TikTok, Snapchat, or any other social media
            platform. All trademarks and logos belong to their respective
            owners.
          </p>
        </div>
      </section>
    </div>
  );
}
