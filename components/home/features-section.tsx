import { Shield, Zap, Clock, HeadphonesIcon, RefreshCw, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Orders start processing within minutes. Watch your social media grow in real-time.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "We never ask for your password. All transactions are encrypted and secure.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to help you.",
  },
  {
    icon: RefreshCw,
    title: "Refill Guarantee",
    description:
      "Lost followers? We provide free refills to maintain your growth.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description:
      "Your information stays confidential. We value your privacy above all.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Guidance",
    description:
      "Get personalized recommendations to maximize your social media impact.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose FoxFollows?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re committed to delivering the best social media growth
            experience
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
