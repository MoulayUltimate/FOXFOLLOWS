import { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ | FoxFollows",
  description: "Frequently asked questions about FoxFollows services, delivery, payments, and more.",
};

const generalFaqs = [
  {
    question: "What is FoxFollows?",
    answer:
      "FoxFollows is a social media growth service that helps you increase your followers, likes, views, and comments on platforms like Instagram, YouTube, TikTok, and Snapchat. We provide real engagement to help boost your online presence.",
  },
  {
    question: "Is it safe to buy followers and likes?",
    answer:
      "Yes, our services are designed to be safe for your account. We use gradual delivery methods that mimic organic growth, and we never ask for your password. Your account credentials remain secure at all times.",
  },
  {
    question: "Are the followers and likes real?",
    answer:
      "We provide high-quality followers and engagement from real accounts. While some accounts may become inactive over time, we offer a refill guarantee to maintain your numbers.",
  },
  {
    question: "Will I get banned for using your services?",
    answer:
      "We have never had a customer report being banned as a result of using our services. Our delivery methods are designed to appear natural and comply with platform guidelines.",
  },
];

const orderFaqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply choose your platform, select a package, enter your username or post URL, and complete the payment. No password required! Your order will start processing automatically.",
  },
  {
    question: "Do I need to give you my password?",
    answer:
      "Absolutely not! We never ask for your password. All we need is your public username or the URL of the content you want to boost. Your account security is our priority.",
  },
  {
    question: "Does my account need to be public?",
    answer:
      "Yes, your account must be set to public for us to deliver your order. If your account is private, we won't be able to complete the delivery.",
  },
  {
    question: "Can I split my order between multiple posts?",
    answer:
      "Each order is for a single username or URL. If you want to boost multiple posts or accounts, you'll need to place separate orders for each.",
  },
];

const deliveryFaqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders start within 0-1 hours after payment confirmation. Full delivery time depends on the order size - smaller orders complete within hours, while larger orders may take 1-3 days for gradual, natural-looking delivery.",
  },
  {
    question: "Why is delivery gradual?",
    answer:
      "Gradual delivery helps your growth appear organic and natural. Sudden spikes in followers or likes can look suspicious. Our delivery method protects your account while providing lasting results.",
  },
  {
    question: "What if my order isn't delivered?",
    answer:
      "We guarantee 100% delivery or your money back. If your order isn't delivered within the promised timeframe, contact our support team for a full refund or re-delivery.",
  },
  {
    question: "Can I track my order?",
    answer:
      "You can monitor your follower/like count to see progress. If you have questions about your order status, contact our support team with your order ID.",
  },
];

const paymentFaqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and various secure payment methods through our payment processor. All transactions are encrypted and secure.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, all payments are processed through secure, PCI-compliant payment processors. We never store your complete credit card information on our servers.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer refunds in cases where we cannot deliver your order. Please see our Refund Policy for full details on eligibility and how to request a refund.",
  },
  {
    question: "Do you offer any discounts?",
    answer:
      "We occasionally offer promotional discounts. Subscribe to our newsletter or follow us on social media to stay updated on special offers.",
  },
];

const supportFaqs = [
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@foxfollows.com or through our contact form. We typically respond within 24 hours.",
  },
  {
    question: "What is the refill guarantee?",
    answer:
      "If you experience a drop in followers or likes within 30 days of delivery, contact our support team for a free refill. This ensures you maintain your desired count.",
  },
  {
    question: "What if I entered the wrong username?",
    answer:
      "Contact our support team immediately with your order ID. If delivery hasn't started yet, we may be able to update the username. Once delivery begins, changes may not be possible.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {/* General Questions */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              General Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {generalFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`general-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Ordering */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Ordering
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {orderFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`order-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Delivery
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {deliveryFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`delivery-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Payment */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Payment & Refunds
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {paymentFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`payment-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Support
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {supportFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`support-${index}`}
                  className="rounded-lg border border-border px-4"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-xl bg-primary/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Still have questions?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Our support team is here to help you 24/7
          </p>
          <Button asChild className="mt-4">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
