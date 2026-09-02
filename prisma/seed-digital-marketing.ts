import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics?: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
};

async function ensureCategory(category: CategorySeed) {
  const createdCategory = await prisma.studyCategory.upsert({
    where: { slug: category.slug },
    update: { name: category.name, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
    create: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      isPublished: true,
      sortOrder: category.sortOrder,
    },
  });

  for (const pathSeed of category.paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: createdCategory.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
      create: {
        categoryId: createdCategory.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: 0,
      },
    });

    for (const moduleSeed of pathSeed.modules) {
      const module = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          isPublished: true,
          sortOrder: 0,
        },
      });

      const topics = moduleSeed.topics ?? [];
      for (const topicSeed of topics) {
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: {
            title: topicSeed.title,
            moduleId: module.id,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        const sections = topicSeed.sections ?? [];
        for (let index = 0; index < sections.length; index += 1) {
          const section = sections[index];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${index}` },
            update: { title: section.title, content: section.content, sortOrder: index },
            create: {
              id: `${topic.id}-section-${index}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: index,
            },
          });
        }
      }
    }
  }
}

async function seedDigitalMarketingCategory() {
  const category: CategorySeed = {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Master digital marketing: SEO, SEM, social media, content, email, analytics, automation, and strategy.",
    icon: "DM",
    sortOrder: 22,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the fundamentals of digital marketing: channels, tactics, and basic strategy.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Digital Marketing Fundamentals",
            slug: "dm-fundamentals",
            description: "Understand the digital marketing landscape and core channels.",
            topics: [
              {
                title: "What is Digital Marketing?",
                slug: "what-is-dm",
                shortDescription: "Definition, evolution, and the marketing funnel.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Definition and Scope", content: "Digital marketing is the promotion of products or brands using electronic channels – search engines, social media, email, websites, and mobile apps. It's data‑driven, interactive, and measurable. Unlike traditional marketing, it allows real‑time optimisation and personalisation." },
                  { title: "The Marketing Funnel (Awareness to Advocacy)", content: "**Awareness**: attract attention (SEO, paid ads, content). **Interest**: engage and educate (blog posts, videos). **Consideration**: nurture leads (case studies, email). **Conversion**: close the sale (landing pages, offers). **Loyalty**: retain customers (email, support). **Advocacy**: encourage referrals (reviews, referral programs). Each stage requires different tactics." },
                  { title: "Key Digital Channels", content: "**Search (SEO/SEM)**: organic and paid search. **Social Media**: organic posts and paid ads (Facebook, Instagram, LinkedIn, TikTok). **Email**: newsletters, automation. **Content**: blogs, videos, infographics. **Display**: banner ads, retargeting. **Affiliate**: partners promoting your products. **Influencer**: leveraging industry voices." },
                ],
              },
              {
                title: "SEO Basics – Getting Found Organically",
                slug: "seo-basics",
                shortDescription: "On‑page, off‑page, and technical SEO fundamentals.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is SEO?", content: "Search Engine Optimisation is the practice of improving your website's visibility in organic (non‑paid) search results. It's about relevance (content matching user intent) and authority (trust from other sites)." },
                  { title: "On‑Page SEO – The Content Side", content: "**Title tags**: include target keywords, keep under 60 characters. **Meta descriptions**: 150‑160 characters, persuasive. **Headings**: use H1, H2, H3 to structure content. **Keyword usage**: naturally include primary and secondary keywords. **Content quality**: original, useful, comprehensive. **Internal linking**: link to related pages. **Image alt text**: describe images." },
                  { title: "Off‑Page SEO – Building Authority", content: "**Backlinks**: links from other websites. Quality > quantity. Earn links through great content, guest posts, and outreach. **Social signals**: shares and mentions, though indirect ranking factor. **Brand mentions**: even unlinked mentions help." },
                  { title: "Technical SEO – The Infrastructure", content: "**Site speed**: fast loading (Core Web Vitals). **Mobile‑friendliness**: responsive design. **Crawlability**: ensure search engines can index your pages (robots.txt, sitemap). **URL structure**: clean and descriptive. **Structured data**: schema markup for rich results." },
                ],
              },
              {
                title: "SEM and Google Ads – Paid Search",
                slug: "sem-basics",
                shortDescription: "Paid search advertising: campaigns, keywords, and bidding.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is SEM?", content: "Search Engine Marketing includes paid search ads (PPC – pay‑per‑click). You bid on keywords, and your ads appear on search engine results pages (SERPs). You pay only when someone clicks your ad." },
                  { title: "Google Ads Campaign Types", content: "**Search**: text ads on Google search. **Display**: banner ads on websites. **Shopping**: product listings with images and prices. **Video**: video ads on YouTube. **App**: promote mobile apps." },
                  { title: "Keyword Match Types", content: "**Broad**: widest reach, may show for searches that include variations. **Phrase**: shows for searches that include the phrase in order. **Exact**: only for the exact keyword. **Negative**: exclude irrelevant searches. Use exact and phrase for control; broad for discovery." },
                  { title: "Quality Score and Ad Rank", content: "Quality Score is a metric (1‑10) based on expected CTR, ad relevance, and landing page experience. Ad Rank = bid × Quality Score. A higher Quality Score lowers your cost per click and improves ad position." },
                ],
              },
              {
                title: "Social Media Marketing Basics",
                slug: "social-media-basics",
                shortDescription: "Organic content and engagement on major platforms.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Key Platforms and Their Audiences", content: "**Facebook**: broad demographic, good for B2C and community. **Instagram**: visual, younger audience, lifestyle brands. **LinkedIn**: B2B, professionals, thought leadership. **Twitter (X)**: real‑time, news, customer service. **TikTok**: short‑form video, Gen Z. **Pinterest**: inspiration, discovery." },
                  { title: "Content Strategy", content: "**Format mix**: images, videos, text, stories, carousels. **Posting frequency**: 1‑2 times per day (platform dependent). **Content calendar**: plan ahead, align with campaigns and events. **User‑generated content**: encourage and share." },
                  { title: "Engagement and Community Management", content: "Respond to comments and messages promptly. Ask questions, run polls, and host live events to foster interaction. Monitor brand mentions with social listening tools." },
                ],
              },
              {
                title: "Email Marketing Basics",
                slug: "email-basics",
                shortDescription: "Build lists, create campaigns, and measure performance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Building an Email List", content: "Use sign‑up forms on your website, pop‑ups with lead magnets (e.g., e‑books, discounts). Ensure GDPR/CCPA compliance: get explicit consent, provide unsubscribe options." },
                  { title: "Types of Email Campaigns", content: "**Newsletters**: regular updates, content. **Promotional**: offers, product launches. **Transactional**: order confirmations, receipts. **Drip campaigns**: automated sequences based on behaviour (e.g., welcome series). **Re‑engagement**: win back inactive subscribers." },
                  { title: "Key Metrics", content: "**Open rate**: percentage of recipients who open. **CTR (Click‑Through Rate)**: percentage who click a link. **Conversion rate**: percentage who take the desired action (e.g., purchase). **Unsubscribe rate**: monitor and adjust." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Advanced SEO, paid advertising, analytics, conversion optimization, and content marketing.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced SEO and Content Strategy",
            slug: "advanced-seo",
            description: "Technical SEO, link building, and content marketing at scale.",
            topics: [
              {
                title: "Technical SEO Deep Dive",
                slug: "technical-seo",
                shortDescription: "Crawl budget, Core Web Vitals, structured data, and schema markup.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Core Web Vitals", content: "Google's page experience signals: **LCP (Largest Contentful Paint)** – loading performance (<2.5s). **FID (First Input Delay)** – interactivity (<100ms). **CLS (Cumulative Layout Shift)** – visual stability (<0.1). Optimise images, reduce JavaScript, and use caching." },
                  { title: "Structured Data / Schema Markup", content: "Add schema (JSON‑LD) to help search engines understand your content. Common types: Product, Article, FAQ, How‑To, LocalBusiness. This can earn you rich snippets (stars, prices, etc.) and improve CTR." },
                  { title: "Crawl Budget and Indexing", content: "Google has a limited crawl budget for each site. Ensure your site is crawlable: fix broken links, use XML sitemaps, remove duplicate content, and set canonical tags." },
                  { title: "International SEO", content: "Use hreflang tags for multi‑language sites. Specify language and region. Use country‑specific TLDs or subdirectories (e.g., /en‑us/)." },
                ],
              },
              {
                title: "Content Marketing Strategy and Distribution",
                slug: "content-marketing",
                shortDescription: "Create and distribute valuable content to attract and retain customers.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Content Funnel Mapping", content: "**Top‑of‑funnel (Awareness)**: blogs, videos, infographics – attract traffic. **Middle‑of‑funnel (Consideration)**: case studies, white papers, webinars – build trust. **Bottom‑of‑funnel (Decision)**: product demos, free trials, testimonials – convert." },
                  { title: "Content Formats and Channels", content: "**Blog posts**: SEO‑driven, educational. **Video**: YouTube, social, website. **Podcasts**: growing medium. **Infographics**: shareable and visual. **E‑books/Whitepapers**: lead magnets. **Webinars**: interactive and high‑value." },
                  { title: "Distribution and Promotion", content: "Share content on social media, email newsletters, and paid promotion (e.g., Facebook Ads, LinkedIn Sponsored Content). Leverage influencers and guest posting to reach new audiences." },
                ],
              },
            ],
          },
          {
            title: "Paid Advertising (PPC)",
            slug: "paid-ads",
            description: "Google Ads, Facebook Ads, and advanced targeting.",
            topics: [
              {
                title: "Google Ads Advanced – Remarketing and Smart Bidding",
                slug: "google-ads-advanced",
                shortDescription: "Remarketing, dynamic ads, and smart bidding.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Remarketing (Retargeting)", content: "Show ads to users who visited your site but didn't convert. Use display or search remarketing. Set up audiences based on pages visited (e.g., abandoned cart)." },
                  { title: "Dynamic Ads", content: "Automatically show products/services users viewed. Requires a product feed (Google Merchant Center) and dynamic remarketing campaign." },
                  { title: "Smart Bidding Strategies", content: "Automated bid strategies: **Target CPA** (maximise conversions at a cost goal), **Target ROAS** (return on ad spend), **Maximise Conversions** (spend budget to get as many conversions as possible). Use with enough conversion data." },
                ],
              },
              {
                title: "Facebook and Instagram Ads",
                slug: "fb-ads",
                shortDescription: "Audience targeting, creative, and performance analysis.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Audience Targeting", content: "**Custom Audiences**: upload email lists, website visitors (via pixel), app users. **Lookalike Audiences**: find new people similar to your best customers. **Interest‑based**: target by interests, behaviours, demographics." },
                  { title: "Ad Formats", content: "**Image** (simple), **Video** (engaging), **Carousel** (multiple images/products), **Collection** (immersive shopping), **Messenger** (conversational). Choose based on objective (traffic, conversions, brand awareness)." },
                  { title: "Key Metrics", content: "**CPC** (cost per click), **CTR** (click‑through rate), **ROAS** (return on ad spend), **CVR** (conversion rate), and **frequency** (avoid ad fatigue). Use Facebook Pixel for conversion tracking." },
                ],
              },
            ],
          },
          {
            title: "Analytics and Data – Measuring What Matters",
            slug: "analytics",
            description: "Measure, interpret, and act on marketing data.",
            topics: [
              {
                title: "Google Analytics 4 (GA4)",
                slug: "ga4",
                shortDescription: "Event‑based tracking, reports, and analysis.",
                estimatedMinutes: 24,
                sections: [
                  { title: "GA4 Fundamentals", content: "GA4 is event‑driven, not session‑based like Universal Analytics. It tracks user interactions (page views, clicks, purchases) as events. It's cross‑platform (web + app)." },
                  { title: "Key Reports", content: "**Acquisition**: how users find you. **Engagement**: what they do on site. **Retention**: user loyalty. **Demographics**: audience insights. **User Explorer**: individual user journeys." },
                  { title: "Setting Up Conversions", content: "Define key events (e.g., purchase, form submission) as conversions. Use Google Tag Manager for easier setup." },
                ],
              },
              {
                title: "Conversion Rate Optimization (CRO)",
                slug: "cro",
                shortDescription: "A/B testing, user experience, and funnel analysis.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is CRO?", content: "CRO is the process of increasing the percentage of visitors who take a desired action (e.g., purchase, sign‑up). It involves user research, A/B testing, and iterative improvements." },
                  { title: "A/B Testing (Split Testing)", content: "Test variations of a page: headlines, CTAs, images, layout. Run the test with enough traffic and statistical significance. Use tools like Optimizely, VWO, or Google Optimize." },
                  { title: "Funnel Analysis", content: "Identify where users drop off in your conversion funnel (e.g., product page → cart → checkout). Optimise those steps: reduce friction, improve clarity, add trust signals." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Marketing automation, data‑driven strategy, attribution, omnichannel, and AI in marketing.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Marketing Automation and CRM",
            slug: "automation",
            description: "HubSpot, Marketo, Salesforce – lead scoring, workflows, personalization.",
            topics: [
              {
                title: "Marketing Automation Platforms",
                slug: "automation-platforms",
                shortDescription: "Lead nurturing, email workflows, and scoring.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Marketing Automation", content: "Marketing automation uses software to automate repetitive marketing tasks (emails, social media, lead nurturing). It helps personalise customer journeys at scale." },
                  { title: "Lead Scoring", content: "Assign points based on behaviour (e.g., email opens, website visits, content downloads) and demographic fit. Prioritise high‑score leads for sales." },
                  { title: "Drip Campaigns and Workflows", content: "Automated sequences triggered by user actions: welcome series, abandoned cart, re‑engagement. Use conditional logic to branch based on behaviour." },
                  { title: "Personalization", content: "Use data (location, past behaviour, purchase history) to tailor content and offers. Dynamic email content and website recommendations." },
                ],
              },
              {
                title: "Customer Journey Mapping and Omnichannel",
                slug: "customer-journey",
                shortDescription: "Map touchpoints and optimise the entire journey.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Journey Mapping?", content: "A visual representation of every interaction a customer has with your brand, from first discovery to post‑purchase. Identifies pain points and opportunities." },
                  { title: "Touchpoint Analysis", content: "List all touchpoints: ads, website, social, email, support, physical store (if any). Evaluate each for consistency and quality." },
                  { title: "Optimizing the Journey", content: "Remove friction, ensure seamless transitions between channels, and provide relevant content at each stage." },
                ],
              },
            ],
          },
          {
            title: "Advanced Analytics and Attribution",
            slug: "advanced-analytics",
            description: "Multi‑touch attribution, marketing mix modeling, and predictive analytics.",
            topics: [
              {
                title: "Attribution Models",
                slug: "attribution",
                shortDescription: "Last‑click, linear, time‑decay, position‑based, data‑driven.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why Attribution Matters", content: "Understand which channels and touchpoints drive conversions, so you can allocate budget effectively." },
                  { title: "Common Attribution Models", content: "**Last‑click**: all credit to last touchpoint (simple but biased). **First‑click**: credit to first touchpoint (good for awareness). **Linear**: equal credit to all touchpoints. **Time‑decay**: more credit to touchpoints closer to conversion. **Position‑based**: 40% first, 40% last, 20% middle. **Data‑driven**: uses machine learning to assign fractional credit." },
                  { title: "Choosing the Right Model", content: "Start with a multi‑touch model (linear or position‑based) and evolve to data‑driven with enough data. Consider your sales cycle length." },
                ],
              },
              {
                title: "Marketing Mix Modeling (MMM)",
                slug: "mmm",
                shortDescription: "Measure impact of different marketing channels on sales.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is MMM?", content: "Statistical analysis of historical data to estimate the impact of each marketing channel (TV, radio, digital) on sales. Helps in budget allocation." },
                  { title: "Key Outputs", content: "ROI by channel, diminishing returns (saturation), optimal spend levels. Requires expertise in statistics and data." },
                ],
              },
            ],
          },
          {
            title: "Influencer and Affiliate Marketing",
            slug: "influencer-affiliate",
            description: "Leverage third‑party promotion and partnerships.",
            topics: [
              {
                title: "Influencer Marketing",
                slug: "influencer",
                shortDescription: "Collaborate with influencers to reach new audiences.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Influencer Marketing?", content: "Partnering with individuals who have a following (influencers) to promote your brand. It builds trust and reaches niche audiences." },
                  { title: "Types of Influencers", content: "**Nano**: 1k‑10k, high engagement. **Micro**: 10k‑100k, niche authority. **Macro**: 100k‑1M, broad reach. **Mega**: >1M, celebrity. Choose based on goals and budget." },
                  { title: "Campaign Execution", content: "Define goals (awareness, conversions), find relevant influencers, negotiate deliverables (posts, stories, videos), and track performance (coupon codes, UTM links)." },
                ],
              },
              {
                title: "Affiliate Marketing",
                slug: "affiliate",
                shortDescription: "Revenue sharing with partners who promote your products.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Affiliate Marketing?", content: "Affiliates (publishers) promote your products and earn a commission on sales they generate. You pay only for results." },
                  { title: "Setting Up an Affiliate Program", content: "Use platforms like ShareASale, CJ Affiliate, or partner with networks. Provide creatives, tracking, and timely payments." },
                ],
              },
            ],
          },
          {
            title: "AI and Machine Learning in Marketing",
            slug: "ai-marketing",
            description: "Predictive analytics, chatbots, personalization, and generative AI.",
            topics: [
              {
                title: "AI Applications in Marketing",
                slug: "ai-applications",
                shortDescription: "Chatbots, predictive lead scoring, content generation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "AI‑Powered Chatbots", content: "Use NLP to handle customer queries 24/7, qualify leads, and provide instant responses. Can escalate to human agents when needed." },
                  { title: "Predictive Analytics", content: "Forecast customer lifetime value (CLV), churn probability, and next‑best‑action. Use historical data and machine learning." },
                  { title: "Generative AI for Content", content: "AI tools (like ChatGPT, Jasper) can generate copy, blog posts, ad variations, and even images. Speeds up content creation, but requires human review." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common Digital Marketing interview questions, case studies, and strategy scenarios.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-concepts-dm",
            description: "SEO, SEM, social media, email, and analytics.",
            topics: [
              {
                title: "SEO vs SEM – Organic vs Paid",
                slug: "seo-sem-interview",
                shortDescription: "Explain the difference and when to use each.",
                estimatedMinutes: 18,
                sections: [
                  { title: "SEO", content: "Organic, long‑term, cost‑effective, builds trust. Good for sustained traffic and authority." },
                  { title: "SEM", content: "Paid, immediate results, controllable spend, good for testing and promotions." },
                ],
              },
              {
                title: "Social Media Strategy",
                slug: "social-interview",
                shortDescription: "How would you choose which platforms to use?",
                estimatedMinutes: 18,
                sections: [
                  { title: "Audience", content: "Where does your target audience spend time? Research demographics." },
                  { title: "Content Format", content: "Which formats work best on each platform (video, images, text)?" },
                  { title: "Goals", content: "Brand awareness, engagement, traffic, conversions – align platform choice with goals." },
                ],
              },
              {
                title: "Analytics and ROI",
                slug: "analytics-interview",
                shortDescription: "How do you measure the ROI of a campaign?",
                estimatedMinutes: 20,
                sections: [
                  { title: "Metrics", content: "Revenue, CPA (cost per acquisition), ROAS (return on ad spend), ROI." },
                  { title: "Attribution", content: "Assign credit to channels using appropriate attribution models." },
                ],
              },
            ],
          },
          {
            title: "Case Studies and Scenarios",
            slug: "case-studies-dm",
            description: "Real‑world problems and solution design.",
            topics: [
              {
                title: "Plan a Product Launch Campaign",
                slug: "launch-campaign",
                shortDescription: "Develop a multi‑channel strategy.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Goals", content: "Awareness (reach), pre‑orders, sales." },
                  { title: "Channels", content: "Social media teasers, influencer partnerships, email teasers, paid ads, and a landing page." },
                  { title: "Timeline", content: "Pre‑launch (build buzz), launch (big reveal), post‑launch (retargeting)." },
                  { title: "Measurement", content: "Impressions, traffic, conversion rate, sales." },
                ],
              },
              {
                title: "Increase Website Traffic",
                slug: "increase-traffic",
                shortDescription: "Design a strategy to boost organic traffic.",
                estimatedMinutes: 24,
                sections: [
                  { title: "SEO", content: "Keyword research, content creation (blog posts, guides), technical SEO (speed, mobile)." },
                  { title: "Content", content: "Create valuable, shareable content; repurpose into videos/infographics." },
                  { title: "Distribution", content: "Social media, email outreach, guest posting, and influencer sharing." },
                ],
              },
              {
                title: "Optimize an Email Campaign",
                slug: "email-optimization",
                shortDescription: "Improve open and click‑through rates.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Subject Line", content: "A/B test, personalise, create curiosity." },
                  { title: "Content", content: "Relevant, concise, clear CTA." },
                  { title: "Segmentation", content: "Targeted messages based on behaviour, demographics." },
                  { title: "Timing", content: "Test different send times and frequencies." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Digital Marketing category seeded (ultra‑detailed)");
}

async function main() {
  await seedDigitalMarketingCategory();
}

main()
  .catch((error) => {
    console.error("Digital Marketing seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });