"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoxLogo } from "@/components/fox-logo";
import { getPlatformIcon } from "@/components/platform-icons";
import { platforms } from "@/lib/products";
import { ArrowRight, Shield, Zap, Users, Star, Loader2 } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedService, setSelectedService] = useState("followers");
  const [username, setUsername] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  const platform = platforms.find((p) => p.id === selectedPlatform);
  const services = platform?.services || [];

  const handleGetStarted = () => {
    setIsNavigating(true);
    if (username.trim()) {
      router.push(
        `/${selectedPlatform}?service=${selectedService}&username=${encodeURIComponent(username.trim())}`
      );
    } else {
      router.push(`/${selectedPlatform}?service=${selectedService}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <FoxLogo className="h-5 w-5" />
            <span>Trusted by 100,000+ customers</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Grow Your Social Media{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Like a Fox
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            FoxFollows delivers real followers, likes, comments & views for
            Instagram, YouTube, TikTok & Snapchat. Fast, safe, and affordable.
          </p>

          {/* Quick Order Form */}
          <div className="mt-10 w-full max-w-2xl">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl shadow-primary/5">
              <p className="mb-4 text-sm font-medium text-foreground">
                Start your order in seconds
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Select
                  value={selectedPlatform}
                  onValueChange={(value) => {
                    setSelectedPlatform(value);
                    const newPlatform = platforms.find((p) => p.id === value);
                    if (newPlatform?.services[0]) {
                      setSelectedService(newPlatform.services[0].id);
                    }
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        <span className="flex items-center gap-2">
                          {getPlatformIcon(p.id, "h-4 w-4")}
                          {p.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Enter your username or URL"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1"
                />

                <Button
                  onClick={handleGetStarted}
                  disabled={isNavigating}
                  size="lg"
                  className="gap-2 whitespace-nowrap"
                >
                  {isNavigating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Real Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
