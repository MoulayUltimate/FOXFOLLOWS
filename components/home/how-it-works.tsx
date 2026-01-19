import { MousePointerClick, CreditCard, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose Your Package",
    description:
      "Select your platform and the service you need. We offer flexible packages for every budget.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Enter Your Details",
    description:
      "Simply provide your username or post URL. No password required, ever.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Complete Payment",
    description:
      "Pay securely with credit card or other payment methods. All transactions are encrypted.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Watch You Grow",
    description:
      "Sit back and watch your social media presence grow. Delivery starts within minutes.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full bg-border lg:block" />
              )}
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold text-primary">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
