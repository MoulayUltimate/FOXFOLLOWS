"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/cart-provider";
import { toast } from "sonner";
import type { Platform, Service, Package } from "@/lib/products";
import { formatQuantity } from "@/lib/products";
import { Check, ShoppingCart, Zap, Shield, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageSelectorProps {
  platform: Platform;
  initialService?: string;
  initialUsername?: string;
}

export function PackageSelector({
  platform,
  initialService,
  initialUsername,
}: PackageSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const [selectedService, setSelectedService] = useState<Service>(
    platform.services.find((s) => s.id === initialService) ||
    platform.services[0]
  );
  const [selectedPackage, setSelectedPackage] = useState<Package>(
    selectedService.packages.find((p) => p.popular) || selectedService.packages[2]
  );
  const [username, setUsername] = useState(initialUsername || "");

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const usernameParam = searchParams.get("username");

    if (serviceParam) {
      const service = platform.services.find((s) => s.id === serviceParam);
      if (service) {
        setSelectedService(service);
        setSelectedPackage(
          service.packages.find((p) => p.popular) || service.packages[2]
        );
      }
    }

    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [searchParams, platform.services]);

  const handleServiceChange = (service: Service) => {
    setSelectedService(service);
    setSelectedPackage(
      service.packages.find((p) => p.popular) || service.packages[2]
    );
  };

  const handleAddToCart = () => {
    if (!username.trim()) {
      toast.error("Please enter your username or URL");
      return;
    }

    addItem({
      id: `${Date.now()}-${selectedPackage.id}`,
      platform: platform.name,
      service: selectedService.name,
      quantity: selectedPackage.quantity,
      price: selectedPackage.price,
      username: username.trim(),
      link: username.trim(),
      platformId: platform.id,
      serviceId: selectedService.id,
      packageId: selectedPackage.id,
    });

    toast.success(`Added ${formatQuantity(selectedPackage.quantity)} ${selectedService.name} to cart`);
    router.push("/checkout");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Package Selection */}
      <div>
        {/* Service Tabs */}
        <div className="mb-6">
          <Label className="mb-2 block text-sm font-medium">Select Service</Label>
          <div className="flex flex-wrap gap-2">
            {platform.services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(service)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedService.id === service.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <div className="mb-6">
          <Label className="mb-2 block text-sm font-medium">
            Select Package
          </Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {selectedService.packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={cn(
                  "relative flex flex-col items-center rounded-xl border-2 p-4 transition-all",
                  selectedPackage.id === pkg.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    POPULAR
                  </span>
                )}
                {pkg.bestValue && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    BEST VALUE
                  </span>
                )}
                <span className="text-lg font-bold text-foreground">
                  {formatQuantity(pkg.quantity)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedService.name}
                </span>
                <span className="mt-2 text-lg font-bold text-primary">
                  ${pkg.price.toFixed(2)}
                </span>
                {selectedPackage.id === pkg.id && (
                  <div className="absolute right-2 top-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Username Input */}
        <div className="mb-6">
          <Label htmlFor="username" className="mb-2 block text-sm font-medium">
            {selectedService.inputLabel}
          </Label>
          <Input
            id="username"
            type="text"
            placeholder={selectedService.inputPlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 text-base"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Make sure your profile is set to public
          </p>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full gap-2 text-base"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart - ${selectedPackage.price.toFixed(2)}
        </Button>
      </div>

      {/* Right Column - Order Summary & Features */}
      <div>
        {/* Order Summary Card */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform</span>
              <span className="font-medium text-foreground">
                {platform.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-foreground">
                {selectedService.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium text-foreground">
                {formatQuantity(selectedPackage.quantity)}
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">
                  ${selectedPackage.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            What You Get
          </h3>
          <ul className="space-y-3">
            {selectedService.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">
              Instant Start
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-xs font-medium text-foreground">
              Secure Payment
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-xs font-medium text-foreground">
              24/7 Support
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-xs font-medium text-foreground">
              4.9/5 Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
