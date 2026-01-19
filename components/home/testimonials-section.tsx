import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fashion Influencer",
    content:
      "FoxFollows helped me grow my Instagram from 5K to 50K followers. The quality is amazing and delivery was super fast!",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "Mike R.",
    role: "YouTuber",
    content:
      "Best service I've used for YouTube growth. Real subscribers that actually engage with my content. Highly recommend!",
    rating: 5,
    platform: "YouTube",
  },
  {
    name: "Emma L.",
    role: "Content Creator",
    content:
      "My TikTok videos started going viral after using FoxFollows. The views are real and the engagement is incredible.",
    rating: 5,
    platform: "TikTok",
  },
  {
    name: "James K.",
    role: "Business Owner",
    content:
      "Professional service with great customer support. They helped me boost my business presence across all platforms.",
    rating: 5,
    platform: "Multiple",
  },
  {
    name: "Lisa T.",
    role: "Artist",
    content:
      "I was skeptical at first, but FoxFollows delivered exactly what they promised. My art page is growing steadily now!",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "David P.",
    role: "Fitness Coach",
    content:
      "The refill guarantee gives me peace of mind. Whenever I lose a few followers, they top it up automatically.",
    rating: 5,
    platform: "Instagram",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Thousands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about FoxFollows
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {testimonial.platform}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
