"use client";

import React from "react"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
}

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Ellie",
    rating: 5,
    review: "Love this app!",
  },
  {
    id: "2",
    name: "Andre",
    rating: 5,
    review: "Better than all other websites and this one actually works!",
  },
  {
    id: "3",
    name: "Kay",
    rating: 5,
    review: "Great service and like that you're given a trial before paying!",
  },
  {
    id: "4",
    name: "Jason",
    rating: 5,
    review: "It actually works and all of them were legit !!",
  },
  {
    id: "5",
    name: "Bailey",
    rating: 5,
    review: "Really quick and easy",
  },
  {
    id: "6",
    name: "Marcus",
    rating: 5,
    review: "Best service I've used. Followers came within hours!",
  },
  {
    id: "7",
    name: "Sophie",
    rating: 5,
    review: "Super fast delivery and great customer support.",
  },
  {
    id: "8",
    name: "Tyler",
    rating: 5,
    review: "Finally found a legit service. Highly recommend!",
  },
];

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-transform ${interactive && hoverRating >= star ? "scale-110" : ""}`}
        >
          <Star
            className={`h-5 w-5 ${(hoverRating || rating) >= star
                ? interactive
                  ? "fill-primary text-primary"
                  : "fill-emerald-500 text-emerald-500"
                : "fill-muted text-muted-foreground"
              }`}
          />
        </button>
      ))}
    </div>
  );
}

function TrustpilotStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-6 h-6 flex items-center justify-center ${rating >= star ? "bg-emerald-500" : "bg-muted"
            }`}
        >
          <Star
            className={`h-4 w-4 ${rating >= star ? "fill-white text-white" : "fill-muted-foreground text-muted-foreground"
              }`}
          />
        </div>
      ))}
    </div>
  );
}

export function ReviewsSection({ platformName }: { platformName: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rating || !formData.review) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name,
        rating: formData.rating,
        review: formData.review,
      };
      setReviews([newReview, ...reviews]);
      setFormData({ name: "", email: "", rating: 0, review: "" });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Review Form */}
          <Card className="p-6 shadow-lg border-0 bg-card">
            <h3 className="text-xl font-semibold mb-6 text-card-foreground">Submit Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Your name
                </label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => setFormData({ ...formData, rating })}
                  interactive
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Your Review
                </label>
                <Textarea
                  placeholder="Your Review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="bg-background min-h-[120px] resize-y"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.rating || !formData.review}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold py-3"
              >
                {isSubmitting ? "SUBMITTING..." : submitted ? "REVIEW SUBMITTED!" : "SUBMIT REVIEW"}
              </Button>
            </form>
          </Card>

          {/* Reviews List */}
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="space-y-2 bg-secondary/20 p-4 rounded-xl border border-border/50">
                <TrustpilotStars rating={review.rating} />
                <p className="text-foreground font-medium">"{review.review}"</p>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  {review.name}
                  <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-medium">Verified</span>
                </p>
              </div>
            ))}

            {reviews.length > 5 && (
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4 bg-secondary/50 hover:bg-secondary border-0 text-foreground"
              >
                {showAll ? "SHOW LESS" : "SHOW ALL REVIEWS"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
