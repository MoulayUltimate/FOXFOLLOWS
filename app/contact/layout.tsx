import React from "react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | FoxFollows",
  description: "Get in touch with FoxFollows support team. We're here to help 24/7.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
