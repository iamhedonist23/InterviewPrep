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

async function seedPresalesCategory() {
  const category: CategorySeed = {
    name: "Presales",
    slug: "presales",
    description: "Master the art of presales: discovery, solution design, demonstrations, RFPs, and customer engagement.",
    icon: "PS",
    sortOrder: 16,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the fundamentals of presales: roles, discovery, and solution positioning.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Presales Fundamentals",
            slug: "presales-fundamentals",
            description: "What presales is, key responsibilities, and initial client engagement.",
            topics: [
              {
                title: "Introduction to Presales – The Bridge Between Sales and Delivery",
                slug: "intro-presales",
                shortDescription: "Role, responsibilities, and the presales lifecycle.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Presales?", content: "Presales (or presales consulting) is the phase before a sale where you understand customer needs, propose solutions, demonstrate value, and build trust. It bridges technical capabilities with business outcomes. Presales professionals are part consultant, part salesperson, and part technical expert." },
                  { title: "Key Responsibilities", content: "**Discovery**: uncover needs, pain points, budget, authority, timeline (BANT). **Solution Design**: architect a solution that fits technical, business, and operational constraints. **Demonstrations**: show how the product solves specific problems. **RFPs/RFIs**: respond to formal requests with compelling, compliant proposals. **Proof of Concept (PoC)**: validate the solution in the customer's environment. **Handover**: ensure the delivery team has everything they need to succeed." },
                  { title: "Presales vs Sales – The Partnership", content: "Sales focuses on closing deals, managing relationships, and negotiating. Presales focuses on technical credibility, solution fit, and demonstrating value. Both must collaborate closely: Sales brings the relationship and commercial strategy; Presales brings expertise and trust. A strong partnership is the key to winning complex deals." },
                  { title: "The Presales Lifecycle", content: "1. **Lead Qualification** – is there a fit? 2. **Discovery** – deep dive into customer needs, challenges, and decision criteria. 3. **Solution Proposal** – design a tailored solution. 4. **Demo/PoC** – prove the solution works. 5. **RFP/RFI Response** – formal proposal. 6. **Handover** – transition to delivery. Each step builds on the previous." },
                ],
              },
              {
                title: "Discovery and Needs Analysis – The Foundation",
                slug: "discovery",
                shortDescription: "How to uncover customer needs, pain points, and decision criteria.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Discovery Goals", content: "Understand the customer's business, technical environment, challenges, goals, budget, timeline, and decision process. Build a complete picture of their current state, desired future state, and the gap between them. Discovery is not just about asking questions – it's about active listening and uncovering unspoken needs." },
                  { title: "Discovery Frameworks", content: "**BANT**: Budget, Authority, Need, Timeline. **SPICED**: Situation, Pain, Impact, Critical Event, Decision. **MEDDIC**: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion. Use these to structure your questions and qualify the opportunity." },
                  { title: "Discovery Question Bank", content: "Open‑ended questions: 'Can you walk me through your current process?', 'What are the top three challenges you're facing?', 'What would a successful outcome look like?', 'Who else is involved in the decision?', 'What is your timeline?', 'What budget do you have in mind?' – Ask, listen, and paraphrase to confirm understanding." },
                  { title: "Active Listening – The Key Skill", content: "Listen more than you talk. Paraphrase to confirm understanding. Take notes. Show empathy. Identify both explicit needs (stated) and unspoken ones (implied by frustration, urgency, or silence). Use pauses to let the customer think and share more." },
                  { title: "Documenting Discovery", content: "Create a Discovery Summary document that captures the key findings – challenges, goals, decision criteria, timeline, budget, and stakeholders. Share it with the customer to validate your understanding. This builds trust and aligns expectations." },
                ],
              },
              {
                title: "Solution Positioning and Value Propositions",
                slug: "solution-positioning",
                shortDescription: "Tailor your solution to the customer's specific needs and create compelling value propositions.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Value Proposition Canvas", content: "Map customer jobs (what they need to get done), pains (frustrations, risks), and gains (desired outcomes) to your product's features and benefits. Articulate how you relieve pain and create gains. Use this canvas to build a customer‑centric value proposition." },
                  { title: "Differentiation – What Makes You Unique", content: "Identify what makes your solution different: technology, pricing, partnerships, support, ecosystem, or customer success. Frame it around customer outcomes, not product features. For example, 'Our platform reduces integration time by 40%' is stronger than 'We have a REST API'." },
                  { title: "Tailoring the Message", content: "Use discovery insights to customise every pitch, demo, and proposal. Avoid generic templates. Address the specific business context, industry regulations, and technical constraints of the customer. Use their language and examples." },
                  { title: "Elevator Pitch", content: "Craft a concise 60‑second pitch that states the problem, your solution, and the key benefit. Use it in initial calls and introductions. Example: 'We help e‑commerce companies reduce checkout abandonment by 20% with our one‑click payment solution.'" },
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
        description: "Master demos, PoCs, RFP responses, competitive positioning, and value selling.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Demonstrations and Proof of Concept",
            slug: "demos-poc",
            description: "Design and deliver impactful product demos and PoCs.",
            topics: [
              {
                title: "Demo Design Principles – Tell a Story",
                slug: "demo-design",
                shortDescription: "Structure and storyboard your demo for maximum impact.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Story‑based Demos", content: "Structure your demo as a story: context (the customer's challenge), conflict (the pain), resolution (your solution). Use a real customer scenario from discovery. Start with a 'day in the life' of the user, then show how your solution transforms it." },
                  { title: "Demo Scripting – Prepare, Don't Memorise", content: "Write a script that covers key user journeys, showcases the most relevant features, and anticipates questions. Practice transitions, but don't read from a script – speak naturally. Use a demo environment that is clean, fast, and configured for the customer." },
                  { title: "Customization – Make It Personal", content: "Tailor data, industry language, and workflows to the customer. If possible, use their actual data or a close proxy. Show how your solution fits their specific use case, not generic examples." },
                  { title: "Demo Best Practices", content: "Keep it interactive (ask for input), focus on business outcomes, not features, and handle objections gracefully. Always practice – a dry run with a colleague can reveal gaps. Record your demo and review it." },
                  { title: "Handling Challenging Audiences", content: "For technical audiences, dive into architecture and APIs; for business audiences, focus on outcomes and ROI. If interrupted, acknowledge the question and offer to answer it later if it's off‑topic." },
                ],
              },
              {
                title: "Managing Proof of Concept (PoC)",
                slug: "poc-management",
                shortDescription: "Plan, execute, and win PoCs.",
                estimatedMinutes: 26,
                sections: [
                  { title: "PoC Planning – Set Up for Success", content: "Define success criteria with the customer. Scope the work, timeline, and required resources. Document assumptions and constraints. Get sign‑off on the plan to avoid scope creep." },
                  { title: "Execution – Deliver and Communicate", content: "Set up the environment, configure the solution, and involve customer stakeholders. Provide training and support. Communicate progress regularly – send status updates and hold weekly check‑ins." },
                  { title: "Evaluation and Sign‑off", content: "Track progress against criteria. Schedule a final review where you demonstrate the results. If successful, document the outcome and prepare a proposal for the next phase. Celebrate successes and learn from failures." },
                  { title: "Common Pitfalls", content: "Overpromising (scope too large), underestimating complexity, poor communication, and not involving the right stakeholders. Avoid these by staying aligned, transparent, and focused on the defined success criteria." },
                ],
              },
              {
                title: "RFP / RFI Responses – Winning Bids",
                slug: "rfp-rfi",
                shortDescription: "Strategies for responding to formal requests for proposal.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Understanding RFP/RFI", content: "RFI (Request for Information) is a preliminary inquiry to gather options. RFP (Request for Proposal) is a formal bid with detailed requirements. Both require structured, compelling responses." },
                  { title: "Analysis – Read the Room", content: "Read the RFP thoroughly. Identify mandatory requirements, evaluation criteria, and decision timeline. Highlight areas where you excel and where you need to be careful. Understand the customer's hot buttons." },
                  { title: "Response Strategy", content: "Tailor responses to show compliance and differentiation. Use discovery insights to frame your answers. Include case studies, references, and ROI calculations. Make it easy for the evaluator to score you highly." },
                  { title: "Coordination and Pricing", content: "Involve legal, finance, and technical teams. Use a project plan with deadlines. Be transparent about pricing – show value vs cost. Use tiered pricing or options to give flexibility." },
                ],
              },
              {
                title: "Competitive Intelligence and Positioning",
                slug: "competitive-intel",
                shortDescription: "Understand competitors and position your solution effectively.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Competitive Research – Know Your Rivals", content: "Gather intel on competitors: their products, pricing, strengths, weaknesses, and recent wins. Use public resources (websites, reviews), customer feedback, and internal teams (sales, delivery)." },
                  { title: "SWOT Analysis – Self and Competitors", content: "Assess your solution's Strengths, Weaknesses, Opportunities, and Threats relative to competitors. Use this to shape your positioning." },
                  { title: "Win/Loss Analysis – Learn from History", content: "Review past deals – why did you win or lose? Capture lessons learned and adjust your approach. Ask customers why they chose you or not." },
                  { title: "Battle Cards – Ready for Any Challenge", content: "Create concise cards for each competitor: key differentiators, common objections, and counter‑arguments. Share with the sales team." },
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
        description: "Complex solution design, influencing strategy, leading presales teams, and value selling.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced Presales Strategy",
            slug: "advanced-strategy",
            description: "Influence decision‑makers, design complex solutions, and build a presales organisation.",
            topics: [
              {
                title: "Solution Architecture in Presales – Designing for Enterprise",
                slug: "solution-architecture",
                shortDescription: "Design end‑to‑end solutions that align with enterprise landscapes.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Enterprise Architecture – The Big Picture", content: "Understand how your solution fits within the customer's existing infrastructure, integrations, security, and governance. Map the current and future state. Consider compliance (GDPR, HIPAA, SOC2)." },
                  { title: "Integration Points", content: "Map data flows, APIs, and third‑party systems. Use integration diagrams. Identify potential challenges (legacy systems, data quality) and propose solutions." },
                  { title: "Scalability and Performance", content: "Address how the solution will scale with the customer's growth. Consider peak loads, high availability, disaster recovery, and performance testing." },
                  { title: "Data Migration", content: "Plan how existing data will be moved or mapped to the new system. Include ETL processes, data cleansing, and validation." },
                ],
              },
              {
                title: "Value Selling and ROI – The Business Case",
                slug: "value-selling",
                shortDescription: "Quantify business value and build a compelling ROI.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why Value Selling Matters", content: "Customers buy outcomes, not features. Value selling focuses on the business impact – cost savings, revenue increase, efficiency gains, risk reduction. Build a business case that shows a clear ROI." },
                  { title: "Building an ROI Model", content: "Identify key metrics: time saved, cost reduction, revenue uplift. Example: 'Our platform reduces manual data entry by 80%, saving 10 hours per week per employee – equivalent to $X per year.' Use customer data and benchmarks." },
                  { title: "Total Cost of Ownership (TCO)", content: "Compare your solution's TCO with alternatives (competitors, in‑house development, do‑nothing). Include hardware, software, maintenance, support, training, and migration costs." },
                  { title: "Presenting the Business Case", content: "Frame it around the customer's goals. Use simple language, visuals, and a clear 'before and after' comparison. Address risks and mitigation." },
                ],
              },
              {
                title: "Negotiation and Influencing – Winning the Deal",
                slug: "negotiation",
                shortDescription: "Negotiate terms and influence procurement.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Principles of Negotiation", content: "Focus on interests, not positions. Aim for win‑win. Prepare BATNA (Best Alternative to a Negotiated Agreement). Know your leverage." },
                  { title: "Stakeholder Mapping", content: "Identify decision‑makers, influencers, blockers, and champions. Engage each appropriately. A champion can advocate for you internally." },
                  { title: "Handling Objections", content: "Listen, acknowledge, then respond with facts. Turn objections into opportunities – 'That's a great point, let me show you how we address that.'" },
                ],
              },
              {
                title: "Leading a Presales Team – Building an Organisation",
                slug: "leading-presales",
                shortDescription: "Recruit, mentor, and scale a presales organisation.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Team Structure and Roles", content: "Decide on roles: presales engineers, solution architects, demo specialists, and proposal writers. Define responsibilities and career paths." },
                  { title: "Talent Development – Hire and Grow", content: "Hire for both technical skills and communication. Create a mentorship program. Provide training on product, sales, and soft skills." },
                  { title: "Performance Metrics", content: "Track win rate, demo quality, customer satisfaction, and efficiency (time spent vs deal value). Use these to coach and improve." },
                  { title: "Cross‑functional Collaboration", content: "Partner with product, marketing, and sales to align messaging and strategy. Share insights from the field." },
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
        description: "Common presales interview questions, role‑play scenarios, and case studies.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Presales Concepts",
            slug: "core-concepts",
            description: "Questions on discovery, demos, RFPs, and competitive positioning.",
            topics: [
              {
                title: "Discovery Questions – Uncovering Needs",
                slug: "discovery-interview",
                shortDescription: "How to conduct discovery and uncover needs.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Example Questions", content: "'Tell me about a discovery call you led. What did you ask and what did you uncover?' – Be ready to demonstrate a structured approach (BANT, SPICED)." },
                  { title: "Role‑play", content: "You might be asked to role‑play a discovery call with an interviewer. Prepare a list of probing questions and practice active listening." },
                ],
              },
              {
                title: "Demo Scenarios – Crafting the Perfect Demo",
                slug: "demo-interview",
                shortDescription: "How to design and deliver a compelling demo.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Structuring a Demo", content: "Explain how you would prepare for a demo, what you would include (story, key features, value), and how you would handle interruptions." },
                  { title: "Handling Challenging Audiences", content: "Tips for when the audience is distracted, technical, or skeptical. For technical audiences, dive into details; for business, focus on outcomes." },
                ],
              },
              {
                title: "RFP and Bid Management",
                slug: "rfp-interview",
                shortDescription: "How to respond to formal proposals.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Strategy", content: "How do you prioritise which RFPs to pursue? What does a winning response look like? (Compliance, differentiation, value)." },
                ],
              },
            ],
          },
          {
            title: "Soft Skills and Leadership",
            slug: "soft-skills",
            description: "Communication, empathy, conflict resolution, and leadership.",
            topics: [
              {
                title: "Effective Communication",
                slug: "communication",
                shortDescription: "Tailor your message to different audiences.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Technical vs Business Audience", content: "Speak the language of the listener. For business, focus on outcomes; for technical, dive into architecture." },
                  { title: "Storytelling", content: "Use stories to make your points memorable – start with a problem, introduce the solution, show the impact." },
                ],
              },
              {
                title: "Handling Difficult Situations",
                slug: "difficult-situations",
                shortDescription: "Objections, tough questions, and last‑minute changes.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Objection Handling Framework", content: "Listen, Empathize, Clarify, Respond, Confirm." },
                  { title: "Managing Scope Creep", content: "Set expectations early and manage changes through formal processes." },
                ],
              },
            ],
          },
          {
            title: "Case Studies – Real‑World Scenarios",
            slug: "case-studies",
            description: "Presales case studies and scenario‑based questions.",
            topics: [
              {
                title: "Design a Solution for a Retailer",
                slug: "retail-solution",
                shortDescription: "Work through a typical presales scenario.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Scenario", content: "A retailer wants to modernise its e‑commerce platform. They have high traffic, legacy systems, and need personalisation." },
                  { title: "Discovery Questions", content: "What would you ask to understand their challenges and goals? (Traffic patterns, current system limitations, budget, timeline)." },
                  { title: "Solution Proposal", content: "Sketch a high‑level solution architecture, key features (AI‑based recommendations, headless CMS), and integration points." },
                  { title: "Demo Approach", content: "What would you show in a demo to address their specific pain points? (Personalised homepage, fast checkout, mobile responsiveness)." },
                ],
              },
              {
                title: "Design a Solution for a Healthcare Provider",
                slug: "healthcare-solution",
                shortDescription: "Address compliance, security, and integration.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Scenario", content: "A healthcare provider needs a patient management system that is HIPAA‑compliant, integrates with EHR, and improves patient engagement." },
                  { title: "Discovery", content: "Questions about data sensitivity, integration points, user roles, and compliance." },
                  { title: "Solution", content: "HIPAA‑compliant cloud platform, FHIR APIs, patient portal, and analytics." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Presales category seeded (ultra‑detailed)");
}

async function main() {
  await seedPresalesCategory();
}

main()
  .catch((error) => {
    console.error("Presales seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });