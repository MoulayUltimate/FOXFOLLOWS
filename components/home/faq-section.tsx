"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqs = [
  {
    question: "Is it safe to buy followers and likes?",
    answer:
      "Yes, absolutely! We use safe and secure methods that comply with platform guidelines. We never ask for your password, and all our services are delivered gradually to appear natural.",
  },
  {
    question: "How fast will I receive my order?",
    answer:
      "Most orders start processing within 0-1 hour after payment confirmation. The delivery speed depends on the package size, but we always ensure a natural delivery rate.",
  },
  {
    question: "Do I need to provide my password?",
    answer:
      "No, never! We only need your public username or the URL of your post/video. We will never ask for your password or any sensitive login information.",
  },
  {
    question: "Are the followers and likes real?",
    answer:
      "We provide high-quality followers and engagement from real accounts. While some may be inactive over time, we offer refill guarantees to maintain your numbers.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and various secure payment methods through our payment processor. All transactions are encrypted and secure.",
  },
  {
    question: "What if I don't receive my order?",
    answer:
      "We have a 100% delivery guarantee. If your order is not delivered within the promised timeframe, contact our support team for a full refund or re-delivery.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <Link href="/faq" className="text-primary hover:underline">
              View all FAQs
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
