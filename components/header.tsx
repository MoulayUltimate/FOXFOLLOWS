"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { FoxLogo } from "@/components/fox-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";

const platforms = [
  { name: "Instagram", href: "/instagram" },
  { name: "YouTube", href: "/youtube" },
  { name: "TikTok", href: "/tiktok" },
  { name: "Snapchat", href: "/snapchat" },
];

export function Header() {
  const { itemCount, total } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <FoxLogo className="h-9 w-9" />
          <span className="text-xl font-bold text-foreground">
            Fox<span className="text-primary">Follows</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                Services <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {platforms.map((platform) => (
                <DropdownMenuItem key={platform.name} asChild>
                  <Link href={platform.href} className="w-full cursor-pointer">
                    {platform.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/checkout">
            <Button
              variant="outline"
              size="sm"
              className="relative flex items-center gap-2 bg-transparent"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">
                ${total.toFixed(2)}
              </span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FoxLogo className="h-6 w-6" />
                  FoxFollows
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Services
                </p>
                {platforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.href}
                    onClick={() => setMobileOpen(false)}
                    className="pl-2 text-lg font-medium transition-colors hover:text-primary"
                  >
                    {platform.name}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
