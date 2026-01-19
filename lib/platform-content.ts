export interface PlatformContent {
  id: string;
  name: string;
  color: string;
  heroTitle: string;
  heroSubtitle: string;
  whyBuyTitle: string;
  whyBuyReasons: {
    title: string;
    description: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    name: string;
    username: string;
    avatar: string;
    rating: number;
    text: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const platformContent: Record<string, PlatformContent> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    heroTitle: "Buy Instagram Followers with Instant Delivery",
    heroSubtitle:
      "At FoxFollows, you can buy Instagram followers quickly, safely, and easily with just a few clicks. See our deals below! Rated world's #1 IG service.",
    whyBuyTitle: "Why Buy Instagram Followers from FoxFollows?",
    whyBuyReasons: [
      {
        title: "Boost Your Credibility Instantly",
        description:
          "A higher follower count makes your Instagram profile appear more established and trustworthy. When people see you have thousands of followers, they're more likely to follow you too, creating a snowball effect of organic growth.",
      },
      {
        title: "Increase Your Engagement Rate",
        description:
          "More followers means more potential likes, comments, and shares on your content. This increased engagement signals to Instagram's algorithm that your content is valuable, pushing it to more users' feeds and explore pages.",
      },
      {
        title: "Attract Brand Partnerships",
        description:
          "Brands look for influencers with substantial followings. By boosting your follower count, you become more attractive to brands looking for partnerships, sponsorships, and collaboration opportunities.",
      },
      {
        title: "Save Months of Effort",
        description:
          "Building an Instagram following organically can take years. Our service helps you skip the waiting game and jumpstart your growth instantly, so you can focus on creating great content instead of worrying about numbers.",
      },
      {
        title: "Beat the Instagram Algorithm",
        description:
          "Instagram's algorithm favors accounts with higher engagement and follower counts. By purchasing followers, you give your account the boost it needs to be discovered by more users organically.",
      },
      {
        title: "100% Safe and Secure",
        description:
          "We never ask for your password and use safe, gradual delivery methods to protect your account. Your privacy and account security are our top priorities.",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Choose Your Package",
        description:
          "Select the number of Instagram followers you want. We offer packages ranging from 100 to 100,000 followers to suit any budget and goal.",
      },
      {
        step: 2,
        title: "Enter Your Username",
        description:
          "Simply provide your Instagram username. We never ask for your password or any sensitive information. Your account must be public for delivery.",
      },
      {
        step: 3,
        title: "Complete Payment",
        description:
          "Pay securely with your credit card, debit card, or other payment methods. All transactions are encrypted and secure.",
      },
      {
        step: 4,
        title: "Watch Your Followers Grow",
        description:
          "Sit back and relax as your follower count starts increasing within minutes. Most orders are completed within 24-72 hours.",
      },
    ],
    benefits: [
      {
        title: "Real-Looking Profiles",
        description:
          "Our followers come from accounts with profile pictures, posts, and bios, making them indistinguishable from organic followers.",
      },
      {
        title: "Gradual Delivery",
        description:
          "We deliver followers gradually over time to ensure natural-looking growth that won't trigger Instagram's spam detection.",
      },
      {
        title: "No Password Required",
        description:
          "We only need your username. Your login credentials stay with you, keeping your account completely secure.",
      },
      {
        title: "24/7 Customer Support",
        description:
          "Our support team is available around the clock to answer questions and resolve any issues you might have.",
      },
      {
        title: "Refill Guarantee",
        description:
          "If you experience any drop in followers within 30 days, we'll refill them for free, no questions asked.",
      },
      {
        title: "Instant Start",
        description:
          "Most orders begin processing within minutes of payment, so you'll see results almost immediately.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to buy Instagram followers?",
        answer:
          "Yes, buying Instagram followers from FoxFollows is completely safe. We use secure delivery methods and never ask for your password. We've delivered millions of followers without a single account issue.",
      },
      {
        question: "Will my account get banned?",
        answer:
          "No. Instagram doesn't ban accounts for having followers. We deliver followers gradually and naturally to ensure your account stays safe. We've been in business for years with zero account bans.",
      },
      {
        question: "How fast will I receive my followers?",
        answer:
          "Most orders start within 0-1 hours and complete within 24-72 hours depending on the package size. Larger orders may take longer to ensure natural-looking growth.",
      },
      {
        question: "Do I need to provide my password?",
        answer:
          "Absolutely not. We only need your Instagram username. Never share your password with any service. If a service asks for your password, it's a red flag.",
      },
      {
        question: "Are the followers real people?",
        answer:
          "Our followers come from real accounts with profile pictures, posts, and activity. While they may not engage with your content like organic followers, they provide the social proof you need.",
      },
      {
        question: "What if followers drop after delivery?",
        answer:
          "We offer a 30-day refill guarantee. If you notice any drop in followers, simply contact our support team and we'll refill them for free.",
      },
      {
        question: "Can I buy followers for a private account?",
        answer:
          "No, your Instagram account must be set to public for us to deliver followers. You can set it back to private after delivery is complete.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Yes, we offer refunds for undelivered orders. If we can't deliver your followers for any reason, you'll receive a full refund. Check our refund policy for details.",
      },
    ],
    testimonials: [
      {
        name: "Sarah M.",
        username: "@sarahstyle",
        avatar: "S",
        rating: 5,
        text: "I was skeptical at first, but FoxFollows delivered exactly what they promised. My follower count went from 2k to 12k in just a week, and I've already gotten two brand deals!",
      },
      {
        name: "Mike T.",
        username: "@miketravels",
        avatar: "M",
        rating: 5,
        text: "Best service I've used. The followers look real, delivery was fast, and their support team is super responsive. Highly recommend!",
      },
      {
        name: "Jessica R.",
        username: "@jessicafitness",
        avatar: "J",
        rating: 5,
        text: "I've tried other services before and they were terrible. FoxFollows is different - quality followers, great prices, and they actually deliver what they promise.",
      },
      {
        name: "David K.",
        username: "@davidcreates",
        avatar: "D",
        rating: 5,
        text: "Started with 500 followers to test, loved the results, and came back for 10k more. My engagement has actually improved since buying!",
      },
    ],
    stats: [
      { label: "Followers Delivered", value: "50M+" },
      { label: "Happy Customers", value: "100K+" },
      { label: "Countries Served", value: "150+" },
      { label: "Years in Business", value: "5+" },
    ],
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    heroTitle: "Buy YouTube Subscribers with Instant Delivery",
    heroSubtitle:
      "Grow your YouTube channel with real subscribers, views, and likes. Safe, fast, and affordable. Start building your YouTube empire today!",
    whyBuyTitle: "Why Buy YouTube Subscribers from FoxFollows?",
    whyBuyReasons: [
      {
        title: "Unlock Monetization Faster",
        description:
          "YouTube requires 1,000 subscribers and 4,000 watch hours to monetize. Buying subscribers helps you reach this milestone faster so you can start earning from your content.",
      },
      {
        title: "Boost Your Channel's Credibility",
        description:
          "Viewers are more likely to subscribe to channels that already have a substantial subscriber base. A higher count makes your channel appear more professional and trustworthy.",
      },
      {
        title: "Improve Search Rankings",
        description:
          "YouTube's algorithm considers subscriber count when ranking videos. More subscribers means better visibility in search results and recommendations.",
      },
      {
        title: "Attract Organic Subscribers",
        description:
          "Social proof is powerful. When viewers see you have thousands of subscribers, they're more likely to subscribe themselves, creating organic growth.",
      },
      {
        title: "Get Brand Deals Sooner",
        description:
          "Brands look at subscriber counts when choosing creators to partner with. A larger subscriber base opens doors to sponsorships and collaborations.",
      },
      {
        title: "Safe and Compliant",
        description:
          "Our delivery methods are designed to be safe and compliant with YouTube's terms. We use gradual delivery to ensure natural-looking growth.",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Select Your Package",
        description:
          "Choose the number of subscribers, views, or likes you want. We have packages for every budget and goal.",
      },
      {
        step: 2,
        title: "Enter Your Channel URL",
        description:
          "Provide your YouTube channel or video URL. We never ask for your login credentials or password.",
      },
      {
        step: 3,
        title: "Secure Checkout",
        description:
          "Complete your purchase using our secure payment system. We accept all major credit cards and payment methods.",
      },
      {
        step: 4,
        title: "Receive Your Subscribers",
        description:
          "Watch your subscriber count grow within hours. Most orders are fully delivered within 24-72 hours.",
      },
    ],
    benefits: [
      {
        title: "High Retention Subscribers",
        description:
          "Our subscribers stick around. We focus on quality over quantity to ensure your subscriber count stays stable.",
      },
      {
        title: "Views That Count",
        description:
          "Our views come from real devices and count towards your watch time, helping you reach monetization faster.",
      },
      {
        title: "No Password Needed",
        description:
          "We only need your channel or video URL. Your account credentials are never required.",
      },
      {
        title: "Money-Back Guarantee",
        description:
          "If we can't deliver your order, you get a full refund. We stand behind our service 100%.",
      },
      {
        title: "Drip-Feed Delivery",
        description:
          "We deliver subscribers gradually to mimic natural growth patterns and keep your channel safe.",
      },
      {
        title: "Dedicated Support",
        description:
          "Our YouTube specialists are available 24/7 to help you choose the right package and answer questions.",
      },
    ],
    faqs: [
      {
        question: "Is buying YouTube subscribers safe?",
        answer:
          "Yes, when done correctly. We use safe delivery methods and gradual delivery to ensure your channel stays in good standing. We've helped thousands of creators grow without issues.",
      },
      {
        question: "Will buying subscribers help me get monetized?",
        answer:
          "Buying subscribers helps you reach the 1,000 subscriber requirement faster. However, you'll still need 4,000 watch hours, which our views packages can help with.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Most orders begin within 1-2 hours and complete within 24-72 hours. Larger orders may be delivered over several days for natural-looking growth.",
      },
      {
        question: "Do subscribers watch my videos?",
        answer:
          "Purchased subscribers are primarily for boosting your subscriber count and social proof. For watch time, we recommend our views packages.",
      },
      {
        question: "What if my subscriber count drops?",
        answer:
          "We offer a 30-day refill guarantee. If you experience any significant drop, contact us and we'll refill your order for free.",
      },
      {
        question: "Can I buy subscribers for any channel?",
        answer:
          "You can purchase for your own channel or as a gift for another channel. The channel must be public and in good standing.",
      },
    ],
    testimonials: [
      {
        name: "Alex Gaming",
        username: "@alexgaming",
        avatar: "A",
        rating: 5,
        text: "Hit 1k subscribers and got monetized within 2 months of using FoxFollows. The subscribers look real and my channel is growing faster than ever!",
      },
      {
        name: "Tech Reviews",
        username: "@techreviews",
        avatar: "T",
        rating: 5,
        text: "Great service! I bought 5k subscribers and they were all delivered within 48 hours. My videos are getting more views now too.",
      },
      {
        name: "Cooking with Lisa",
        username: "@cookingwithlisa",
        avatar: "L",
        rating: 5,
        text: "Was stuck at 800 subscribers for months. FoxFollows helped me break through and now I'm getting brand deals!",
      },
      {
        name: "Fitness Pro",
        username: "@fitnesspro",
        avatar: "F",
        rating: 5,
        text: "The views and subscribers are high quality. Support team is helpful too. Will definitely use again!",
      },
    ],
    stats: [
      { label: "Subscribers Delivered", value: "25M+" },
      { label: "Channels Grown", value: "75K+" },
      { label: "Views Delivered", value: "500M+" },
      { label: "Satisfaction Rate", value: "99%" },
    ],
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    color: "#000000",
    heroTitle: "Buy TikTok Followers with Instant Delivery",
    heroSubtitle:
      "Go viral on TikTok with more followers, likes, and views. The fastest way to grow your TikTok presence and reach millions of viewers!",
    whyBuyTitle: "Why Buy TikTok Followers from FoxFollows?",
    whyBuyReasons: [
      {
        title: "Go Viral Faster",
        description:
          "TikTok's algorithm favors accounts with high engagement and follower counts. More followers means your videos are more likely to land on the For You page.",
      },
      {
        title: "Build Social Proof",
        description:
          "When users see you have thousands of followers, they're more likely to follow you and engage with your content. It's the snowball effect in action.",
      },
      {
        title: "Attract Brand Partnerships",
        description:
          "Brands are flocking to TikTok for influencer marketing. A larger follower count makes you more attractive to brands looking for creators to partner with.",
      },
      {
        title: "Join the Creator Fund",
        description:
          "TikTok's Creator Fund requires at least 10,000 followers. Buying followers helps you reach this threshold faster so you can start earning.",
      },
      {
        title: "Beat Your Competition",
        description:
          "TikTok is highly competitive. Giving your account a boost helps you stand out from millions of other creators trying to get noticed.",
      },
      {
        title: "Risk-Free Growth",
        description:
          "Our delivery methods are safe and won't put your account at risk. We've helped thousands of TikTokers grow without any issues.",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Pick Your Package",
        description:
          "Choose from our range of TikTok followers, likes, or views packages. We have options for every budget.",
      },
      {
        step: 2,
        title: "Share Your Username",
        description:
          "Enter your TikTok username. That's all we need - no password or login required.",
      },
      {
        step: 3,
        title: "Complete Purchase",
        description:
          "Pay securely and your order will begin processing immediately.",
      },
      {
        step: 4,
        title: "Go Viral",
        description:
          "Watch your follower count and engagement skyrocket within hours!",
      },
    ],
    benefits: [
      {
        title: "Real-Looking Followers",
        description:
          "Our TikTok followers have profile pictures, videos, and activity that makes them indistinguishable from organic followers.",
      },
      {
        title: "Fast Delivery",
        description:
          "TikTok moves fast, and so do we. Most orders start within minutes and complete within 24 hours.",
      },
      {
        title: "Engagement Boost",
        description:
          "More followers leads to more visibility, which leads to more organic engagement on your videos.",
      },
      {
        title: "Safe Methods",
        description:
          "We use TikTok-safe delivery methods to ensure your account stays in good standing.",
      },
      {
        title: "Affordable Pricing",
        description:
          "Our TikTok packages are competitively priced so you can grow without breaking the bank.",
      },
      {
        title: "Expert Support",
        description:
          "Our TikTok growth experts are available 24/7 to help you maximize your results.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to buy TikTok followers?",
        answer:
          "Yes! We use safe delivery methods that comply with TikTok's guidelines. We've delivered millions of followers without any account issues.",
      },
      {
        question: "Will buying followers help me go viral?",
        answer:
          "Having more followers increases your chances of landing on the For You page. Combined with great content, purchased followers can definitely help you go viral.",
      },
      {
        question: "How quickly will I receive my followers?",
        answer:
          "Most TikTok orders begin within minutes and are completed within 24-48 hours. We prioritize fast delivery because we know TikTok moves quickly!",
      },
      {
        question: "Do you need my TikTok password?",
        answer:
          "Never! We only need your TikTok username. Never share your password with any growth service.",
      },
      {
        question: "Will the followers engage with my content?",
        answer:
          "Purchased followers are primarily for boosting your follower count and social proof. For engagement, we recommend combining followers with our likes and views packages.",
      },
      {
        question: "Can I buy followers for a private account?",
        answer:
          "Your TikTok account must be public for us to deliver followers. You can set it back to private after delivery if you prefer.",
      },
    ],
    testimonials: [
      {
        name: "Dance Queen",
        username: "@dancequeen",
        avatar: "D",
        rating: 5,
        text: "Went from 5k to 50k followers in a month! My videos are getting way more views now and I even got my first brand deal!",
      },
      {
        name: "Comedy King",
        username: "@comedyking",
        avatar: "C",
        rating: 5,
        text: "FoxFollows is legit! Fast delivery, real-looking followers, and great support. My TikTok is blowing up!",
      },
      {
        name: "Beauty Tips",
        username: "@beautytips",
        avatar: "B",
        rating: 5,
        text: "Best investment I've made for my TikTok. The followers helped me get into the Creator Fund!",
      },
      {
        name: "Foodie Adventures",
        username: "@foodieadventures",
        avatar: "F",
        rating: 5,
        text: "Super fast delivery and the followers actually look real. Already ordered twice and will order again!",
      },
    ],
    stats: [
      { label: "TikTok Followers Delivered", value: "100M+" },
      { label: "Creators Helped", value: "200K+" },
      { label: "Views Generated", value: "1B+" },
      { label: "Countries Reached", value: "180+" },
    ],
  },
  snapchat: {
    id: "snapchat",
    name: "Snapchat",
    color: "#FFFC00",
    heroTitle: "Buy Snapchat Followers with Instant Delivery",
    heroSubtitle:
      "Grow your Snapchat audience with real followers and views. Boost your Snap Score and become a Snapchat star today!",
    whyBuyTitle: "Why Buy Snapchat Followers from FoxFollows?",
    whyBuyReasons: [
      {
        title: "Boost Your Snap Score",
        description:
          "A higher Snap Score makes your profile look more popular and active. More followers contribute to a higher score and better credibility.",
      },
      {
        title: "Grow Your Spotlight Reach",
        description:
          "Snapchat Spotlight rewards popular creators. More followers means more views on your Spotlight content and potential earnings.",
      },
      {
        title: "Increase Story Views",
        description:
          "More followers means more people watching your stories. This increased visibility helps you build a loyal audience.",
      },
      {
        title: "Attract Subscribers",
        description:
          "Snapchat's subscription feature lets fans pay for exclusive content. More followers increases your potential subscriber base.",
      },
      {
        title: "Stand Out on Discover",
        description:
          "Snapchat's Discover page features popular creators. A larger following increases your chances of being featured.",
      },
      {
        title: "Safe and Discreet",
        description:
          "We deliver followers safely and discreetly. No one will know you bought followers - they'll just see your growing popularity.",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Select a Package",
        description:
          "Choose the number of Snapchat followers or views you want from our affordable packages.",
      },
      {
        step: 2,
        title: "Enter Your Username",
        description:
          "Provide your Snapchat username. We never ask for passwords or personal information.",
      },
      {
        step: 3,
        title: "Pay Securely",
        description:
          "Complete your order with our encrypted payment system. Your information is always protected.",
      },
      {
        step: 4,
        title: "Watch Your Growth",
        description:
          "See your Snapchat following grow within hours as we deliver your order.",
      },
    ],
    benefits: [
      {
        title: "Quality Followers",
        description:
          "Our Snapchat followers come from active-looking accounts that blend in with organic followers.",
      },
      {
        title: "Quick Turnaround",
        description:
          "Most Snapchat orders are completed within 24-48 hours for fast results.",
      },
      {
        title: "Story Views Included",
        description:
          "Our followers can help boost your story views, increasing your overall engagement.",
      },
      {
        title: "No Password Required",
        description:
          "We only need your username. Your account stays completely secure.",
      },
      {
        title: "Refill Protection",
        description:
          "If you experience any drop, we'll refill your order free of charge within 30 days.",
      },
      {
        title: "Friendly Support",
        description:
          "Our team is here to help you grow your Snapchat the right way.",
      },
    ],
    faqs: [
      {
        question: "Is buying Snapchat followers safe?",
        answer:
          "Yes, our service is completely safe. We use secure delivery methods and never access your account directly. Your Snapchat stays protected.",
      },
      {
        question: "Will this increase my Snap Score?",
        answer:
          "Having more followers and increased activity can contribute to a higher Snap Score over time.",
      },
      {
        question: "How fast is delivery?",
        answer:
          "Most Snapchat orders begin within a few hours and are completed within 24-48 hours.",
      },
      {
        question: "Do you need my Snapchat password?",
        answer:
          "No, we never ask for your password. We only need your public username to deliver followers.",
      },
      {
        question: "Can followers see my private snaps?",
        answer:
          "No, purchased followers only add to your follower count. They don't have access to your private snaps unless you add them as friends.",
      },
      {
        question: "Do you offer Snapchat views?",
        answer:
          "Yes! We offer story views and Spotlight views in addition to followers. Check our Snapchat packages for details.",
      },
    ],
    testimonials: [
      {
        name: "Snap Star",
        username: "@snapstar",
        avatar: "S",
        rating: 5,
        text: "Finally found a service that delivers real Snapchat followers. My story views have tripled since using FoxFollows!",
      },
      {
        name: "Daily Snaps",
        username: "@dailysnaps",
        avatar: "D",
        rating: 5,
        text: "Great service and fast delivery. My Snap Score went up and I'm getting more friend requests now.",
      },
      {
        name: "Snap Creator",
        username: "@snapcreator",
        avatar: "C",
        rating: 5,
        text: "The followers look real and the support team is super helpful. Definitely recommend FoxFollows!",
      },
      {
        name: "Snap Life",
        username: "@snaplife",
        avatar: "L",
        rating: 5,
        text: "Been using FoxFollows for months. Consistent quality and reliable service every time.",
      },
    ],
    stats: [
      { label: "Snapchat Followers Delivered", value: "15M+" },
      { label: "Happy Snappers", value: "50K+" },
      { label: "Story Views Delivered", value: "100M+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
  },
};

export function getPlatformContent(platformId: string): PlatformContent | null {
  return platformContent[platformId] || null;
}
