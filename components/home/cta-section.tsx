import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FoxLogo } from "@/components/fox-logo";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FoxLogo className="mx-auto h-16 w-16" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Ready to Grow Your Social Media?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Join over 100,000 satisfied customers who have boosted their online
          presence with FoxFollows. Start growing today!
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 text-base"
          >
            <Link href="/instagram">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 border-primary-foreground/20 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
