"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PlatformContent } from "@/lib/platform-content";
import {
  Star,
  Check,
  Shield,
  Zap,
  Clock,
  Users,
  Award,
  TrendingUp,
  Lock,
  RefreshCw,
  Headphones,
  ChevronRight,
  Quote,
} from "lucide-react";
import Link from "next/link";

interface InfoSectionsProps {
  content: PlatformContent;
  serviceName?: string;
}

export function InfoSections({ content, serviceName = "Followers" }: InfoSectionsProps) {
  return (
    <>
      {/* Stats Bar */}
      <section className="border-y border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: content.id === 'snapchat' ? '#000000' : content.color }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {content.whyBuyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover why thousands of creators and businesses trust FoxFollows
              to grow their {content.name} presence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.whyBuyReasons.map((reason, index) => (
              <Card
                key={index}
                className="border-border bg-card transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${content.color}15` }}
                  >
                    {index === 0 && (
                      <TrendingUp className="h-6 w-6" style={{ color: content.color }} />
                    )}
                    {index === 1 && (
                      <Users className="h-6 w-6" style={{ color: content.color }} />
                    )}
                    {index === 2 && (
                      <Award className="h-6 w-6" style={{ color: content.color }} />
                    )}
                    {index === 3 && (
                      <Clock className="h-6 w-6" style={{ color: content.color }} />
                    )}
                    {index === 4 && (
                      <Zap className="h-6 w-6" style={{ color: content.color }} />
                    )}
                    {index === 5 && (
                      <Shield className="h-6 w-6" style={{ color: content.color }} />
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              How to Buy {content.name} {serviceName}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Get started in just 4 simple steps. It only takes a few minutes!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {content.howItWorks.map((step, index) => (
              <div key={index} className="relative text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                  style={{ backgroundColor: content.color }}
                >
                  {step.step}
                </div>
                {index < content.howItWorks.length - 1 && (
                  <div className="absolute left-[60%] top-8 hidden h-0.5 w-[80%] bg-border lg:block" />
                )}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose FoxFollows?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We're not just another growth service. Here's what makes us different.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${content.color}15` }}
                >
                  <Check className="h-5 w-5" style={{ color: content.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Trust Badges */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                100% Safe & Secure
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We never ask for your password. Your account security is our top
                priority.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                30-Day Refill Guarantee
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If you experience any drop within 30 days, we'll refill your order
                for free.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                24/7 Customer Support
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our support team is available around the clock to help with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Got questions? We've got answers. If you don't see your question here,
              feel free to contact us.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">
              Still have questions? We're here to help!
            </p>
            <Link href="/contact">
              <Button variant="outline" className="gap-2 bg-transparent">
                Contact Support
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 sm:p-12"
            style={{
              background: `linear-gradient(135deg, ${content.color}20 0%, ${content.color}10 100%)`,
            }}
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Grow Your {content.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join over {content.stats[1]?.value || "100K+"} satisfied customers who
              have boosted their {content.name} presence with FoxFollows.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 text-white"
                style={{ backgroundColor: content.color }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get Started Now
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Link href="/faq">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
