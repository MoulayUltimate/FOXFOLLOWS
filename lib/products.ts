export interface Package {
  id: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  bestValue?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  packages: Package[];
  inputLabel: string;
  inputPlaceholder: string;
  features: string[];
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  services: Service[];
}

export const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    color: "#E1306C",
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    services: [
      {
        id: "followers",
        name: "Followers",
        description: "Grow your Instagram audience with real followers",
        inputLabel: "Instagram Username",
        inputPlaceholder: "@yourusername",
        features: [
          "Real & Active Followers",
          "No Password Required",
          "Instant Start",
          "24/7 Support",
          "Refill Guarantee",
        ],
        packages: [
          { id: "ig-f-500", quantity: 500, price: 5.99 },
          { id: "ig-f-1000", quantity: 1000, price: 9.99, popular: true },
          { id: "ig-f-2500", quantity: 2500, price: 22.99 },
          { id: "ig-f-5000", quantity: 5000, price: 42.99 },
          { id: "ig-f-10000", quantity: 10000, price: 79.99, bestValue: true },
          { id: "ig-f-20000", quantity: 20000, price: 149.99 },
          { id: "ig-f-50000", quantity: 50000, price: 349.99 },
        ],
      },
      {
        id: "likes",
        name: "Likes",
        description: "Boost your posts with instant likes",
        inputLabel: "Post URL",
        inputPlaceholder: "https://instagram.com/p/...",
        features: [
          "Real Engagement",
          "Fast Delivery",
          "High Quality Likes",
          "Safe & Secure",
          "No Drop Guarantee",
        ],
        packages: [
          { id: "ig-l-50", quantity: 50, price: 1.49 },
          { id: "ig-l-100", quantity: 100, price: 2.49 },
          { id: "ig-l-250", quantity: 250, price: 4.99, popular: true },
          { id: "ig-l-500", quantity: 500, price: 8.99 },
          { id: "ig-l-1000", quantity: 1000, price: 14.99 },
          { id: "ig-l-2500", quantity: 2500, price: 34.99, bestValue: true },
          { id: "ig-l-5000", quantity: 5000, price: 59.99 },
        ],
      },
      {
        id: "views",
        name: "Views",
        description: "Increase your video and reel views",
        inputLabel: "Video/Reel URL",
        inputPlaceholder: "https://instagram.com/reel/...",
        features: [
          "Real Views",
          "Instant Delivery",
          "Reels & Videos",
          "No Password Needed",
          "24/7 Support",
        ],
        packages: [
          { id: "ig-v-500", quantity: 500, price: 1.99 },
          { id: "ig-v-1000", quantity: 1000, price: 2.99 },
          { id: "ig-v-2500", quantity: 2500, price: 5.99, popular: true },
          { id: "ig-v-5000", quantity: 5000, price: 9.99 },
          { id: "ig-v-10000", quantity: 10000, price: 17.99, bestValue: true },
          { id: "ig-v-25000", quantity: 25000, price: 39.99 },
        ],
      },
      {
        id: "comments",
        name: "Comments",
        description: "Get authentic comments on your posts",
        inputLabel: "Post URL",
        inputPlaceholder: "https://instagram.com/p/...",
        features: [
          "Custom Comments Available",
          "Real Accounts",
          "Natural Delivery",
          "Safe Process",
          "Quality Guaranteed",
        ],
        packages: [
          { id: "ig-c-10", quantity: 10, price: 4.99 },
          { id: "ig-c-25", quantity: 25, price: 9.99, popular: true },
          { id: "ig-c-50", quantity: 50, price: 17.99 },
          { id: "ig-c-100", quantity: 100, price: 29.99, bestValue: true },
          { id: "ig-c-250", quantity: 250, price: 69.99 },
        ],
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "youtube",
    color: "#FF0000",
    gradient: "from-red-600 to-red-500",
    services: [
      {
        id: "subscribers",
        name: "Subscribers",
        description: "Grow your YouTube channel with real subscribers",
        inputLabel: "Channel URL",
        inputPlaceholder: "https://youtube.com/@yourchannel",
        features: [
          "Real Subscribers",
          "No Password Required",
          "Gradual Delivery",
          "Monetization Safe",
          "Lifetime Guarantee",
        ],
        packages: [
          { id: "yt-s-500", quantity: 500, price: 5.99 },
          { id: "yt-s-1000", quantity: 1000, price: 9.99, popular: true },
          { id: "yt-s-2500", quantity: 2500, price: 22.99 },
          { id: "yt-s-5000", quantity: 5000, price: 42.99 },
          { id: "yt-s-10000", quantity: 10000, price: 79.99, bestValue: true },
          { id: "yt-s-20000", quantity: 20000, price: 149.99 },
          { id: "yt-s-50000", quantity: 50000, price: 349.99 },
        ],
      },
      {
        id: "views",
        name: "Views",
        description: "Boost your video views and watch time",
        inputLabel: "Video URL",
        inputPlaceholder: "https://youtube.com/watch?v=...",
        features: [
          "High Retention Views",
          "Instant Start",
          "Safe for Monetization",
          "Global Traffic",
          "No Drop Guarantee",
        ],
        packages: [
          { id: "yt-v-500", quantity: 500, price: 4.99 },
          { id: "yt-v-1000", quantity: 1000, price: 7.99 },
          { id: "yt-v-2500", quantity: 2500, price: 14.99, popular: true },
          { id: "yt-v-5000", quantity: 5000, price: 24.99 },
          { id: "yt-v-10000", quantity: 10000, price: 44.99, bestValue: true },
          { id: "yt-v-25000", quantity: 25000, price: 99.99 },
        ],
      },
      {
        id: "likes",
        name: "Likes",
        description: "Get more likes on your YouTube videos",
        inputLabel: "Video URL",
        inputPlaceholder: "https://youtube.com/watch?v=...",
        features: [
          "Real Likes",
          "Fast Delivery",
          "High Quality",
          "No Password Needed",
          "Retention Guarantee",
        ],
        packages: [
          { id: "yt-l-50", quantity: 50, price: 3.99 },
          { id: "yt-l-100", quantity: 100, price: 6.99 },
          { id: "yt-l-250", quantity: 250, price: 12.99, popular: true },
          { id: "yt-l-500", quantity: 500, price: 22.99 },
          { id: "yt-l-1000", quantity: 1000, price: 39.99, bestValue: true },
          { id: "yt-l-2500", quantity: 2500, price: 89.99 },
        ],
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    color: "#000000",
    gradient: "from-pink-500 via-red-500 to-cyan-400",
    services: [
      {
        id: "followers",
        name: "Followers",
        description: "Grow your TikTok following quickly",
        inputLabel: "TikTok Username",
        inputPlaceholder: "@yourusername",
        features: [
          "Real TikTok Users",
          "Fast Delivery",
          "No Password Required",
          "24/7 Support",
          "Refill Guarantee",
        ],
        packages: [
          { id: "tt-f-500", quantity: 500, price: 5.99 },
          { id: "tt-f-1000", quantity: 1000, price: 9.99, popular: true },
          { id: "tt-f-2500", quantity: 2500, price: 22.99 },
          { id: "tt-f-5000", quantity: 5000, price: 42.99 },
          { id: "tt-f-10000", quantity: 10000, price: 79.99, bestValue: true },
          { id: "tt-f-20000", quantity: 20000, price: 149.99 },
          { id: "tt-f-50000", quantity: 50000, price: 349.99 },
        ],
      },
      {
        id: "likes",
        name: "Likes",
        description: "Boost your TikTok video likes",
        inputLabel: "Video URL",
        inputPlaceholder: "https://tiktok.com/@user/video/...",
        features: [
          "Real Engagement",
          "Instant Start",
          "High Quality",
          "Safe & Secure",
          "No Drop",
        ],
        packages: [
          { id: "tt-l-100", quantity: 100, price: 1.99 },
          { id: "tt-l-250", quantity: 250, price: 3.99 },
          { id: "tt-l-500", quantity: 500, price: 6.99, popular: true },
          { id: "tt-l-1000", quantity: 1000, price: 11.99 },
          { id: "tt-l-2500", quantity: 2500, price: 24.99, bestValue: true },
          { id: "tt-l-5000", quantity: 5000, price: 44.99 },
        ],
      },
      {
        id: "views",
        name: "Views",
        description: "Increase your TikTok video views",
        inputLabel: "Video URL",
        inputPlaceholder: "https://tiktok.com/@user/video/...",
        features: [
          "Real Views",
          "Fast Delivery",
          "High Retention",
          "Algorithm Boost",
          "24/7 Support",
        ],
        packages: [
          { id: "tt-v-1000", quantity: 1000, price: 1.49 },
          { id: "tt-v-2500", quantity: 2500, price: 2.99, popular: true },
          { id: "tt-v-5000", quantity: 5000, price: 4.99 },
          { id: "tt-v-10000", quantity: 10000, price: 8.99 },
          { id: "tt-v-25000", quantity: 25000, price: 19.99, bestValue: true },
          { id: "tt-v-50000", quantity: 50000, price: 34.99 },
        ],
      },
    ],
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "snapchat",
    color: "#FFFC00",
    gradient: "from-yellow-400 to-yellow-300",
    services: [
      {
        id: "followers",
        name: "Followers",
        description: "Grow your Snapchat audience",
        inputLabel: "Snapchat Username",
        inputPlaceholder: "yourusername",
        features: [
          "Real Snapchat Users",
          "No Password Required",
          "Fast Delivery",
          "Safe Process",
          "24/7 Support",
        ],
        packages: [
          { id: "sc-f-500", quantity: 500, price: 5.99 },
          { id: "sc-f-1000", quantity: 1000, price: 9.99, popular: true },
          { id: "sc-f-2500", quantity: 2500, price: 22.99 },
          { id: "sc-f-5000", quantity: 5000, price: 42.99 },
          { id: "sc-f-10000", quantity: 10000, price: 79.99, bestValue: true },
          { id: "sc-f-20000", quantity: 20000, price: 149.99 },
          { id: "sc-f-50000", quantity: 50000, price: 349.99 },
        ],
      },
      {
        id: "views",
        name: "Story Views",
        description: "Boost your Snapchat story views",
        inputLabel: "Snapchat Username",
        inputPlaceholder: "yourusername",
        features: [
          "Real Story Views",
          "Fast Delivery",
          "No Password Needed",
          "Safe & Secure",
          "Quality Guaranteed",
        ],
        packages: [
          { id: "sc-v-100", quantity: 100, price: 2.99 },
          { id: "sc-v-250", quantity: 250, price: 5.99, popular: true },
          { id: "sc-v-500", quantity: 500, price: 9.99 },
          { id: "sc-v-1000", quantity: 1000, price: 17.99, bestValue: true },
        ],
      },
    ],
  },
];

export function getPlatform(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id);
}

export function getService(platformId: string, serviceId: string): Service | undefined {
  const platform = getPlatform(platformId);
  return platform?.services.find((s) => s.id === serviceId);
}

export function formatQuantity(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
  }
  return num.toString();
}
