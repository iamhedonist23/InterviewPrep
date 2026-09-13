console.log("Connecting to database:", process.env.DATABASE_URL);
import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
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

function buildUltraExplanation(topic: TopicSeed, module: ModuleSeed, path: PathSeed) {
  const title = topic.title;
  const subject = topic.description;
  const lowerTitle = title.toLowerCase();
  let deepDive = `Study ${title} as a practical HR skill, not as a theoretical definition. Begin with the business problem this topic solves: ${subject}. The important question is what strategic trade‑offs it involves, what legal or ethical boundaries it must respect, and how it fits into the broader employee lifecycle.`;

  if (lowerTitle.includes("recruitment") || lowerTitle.includes("selection") || lowerTitle.includes("sourcing")) {
    deepDive += " Focus on the balance between speed, quality, and cost. Evaluate sourcing channels, structured interviewing, and assessment validity. Consider how to reduce bias, improve candidate experience, and align selection criteria with job performance. Always link recruitment metrics (time‑to‑fill, quality‑of‑hire) to business outcomes.";
  } else if (lowerTitle.includes("training") || lowerTitle.includes("development") || lowerTitle.includes("learning")) {
    deepDive += " Differentiate between training (immediate skill gap) and development (long‑term growth). Use the ADDIE model (Analysis, Design, Development, Implementation, Evaluation) as a framework. Emphasise measuring effectiveness through Kirkpatrick's four levels: reaction, learning, behaviour, results. Connect L&D investments to retention and succession planning.";
  } else if (lowerTitle.includes("performance") || lowerTitle.includes("appraisal") || lowerTitle.includes("feedback")) {
    deepDive += " Move beyond annual reviews to continuous performance management. Consider goal‑setting (SMART/OKRs), regular check‑ins, and 360‑degree feedback. Address rater bias, calibration, and the link between performance and rewards. Ensure performance management drives development, not just evaluation.";
  } else if (lowerTitle.includes("compensation") || lowerTitle.includes("benefits") || lowerTitle.includes("reward")) {
    deepDive += " Understand total rewards: base pay, variable pay (bonuses, incentives), benefits (health, retirement), and non‑monetary recognition. Analyse market data, internal equity, and legal compliance (pay equity, minimum wage). Design reward systems that motivate performance while managing costs and ensuring fairness.";
  } else if (lowerTitle.includes("employee relations") || lowerTitle.includes("discipline") || lowerTitle.includes("grievance")) {
    deepDive += " Treat employee relations as proactive engagement, not just reactive problem‑solving. Understand conflict resolution, disciplinary procedures, and grievance handling. Ensure consistency, due process, and documentation. Link to company culture and trust; a positive ER climate reduces turnover and litigation risk.";
  } else if (lowerTitle.includes("law") || lowerTitle.includes("legal") || lowerTitle.includes("compliance")) {
    deepDive += " Master the key employment laws: discrimination, harassment, wage and hour, leave entitlements, and health & safety. Understand the difference between federal, state, and local regulations. Learn how to interpret legal requirements and translate them into practical policies. Prioritise prevention through training and audits.";
  } else if (lowerTitle.includes("diversity") || lowerTitle.includes("equity") || lowerTitle.includes("inclusion") || lowerTitle.includes("dei")) {
    deepDive += " Treat DEI as a strategic imperative, not a checkbox. Analyse representation, pay gaps, and inclusion metrics. Design unbiased recruitment, promotion, and retention practices. Foster psychological safety and belonging. Understand the business case: diverse teams outperform, but only when inclusion is genuine.";
  } else if (lowerTitle.includes("analytics") || lowerTitle.includes("metrics") || lowerTitle.includes("data")) {
    deepDive += " Move from descriptive (what happened) to predictive (what will happen) and prescriptive (what to do). Identify key HR metrics: turnover, engagement, productivity, cost‑per‑hire, etc. Use data to tell a story and influence decisions. Ensure data privacy and ethical use of employee information.";
  } else if (lowerTitle.includes("strategy") || lowerTitle.includes("strategic") || lowerTitle.includes("hr planning")) {
    deepDive += " Align HR strategy with business strategy. Use the resource‑based view: people are a source of competitive advantage. Focus on workforce planning, talent pipelines, and organisational capability. Understand how HR contributes to financial performance and shareholder value.";
  } else if (lowerTitle.includes("change") || lowerTitle.includes("transformation")) {
    deepDive += " Apply change management models (Kotter, ADKAR). Address the human side of change: resistance, communication, and support. Link change initiatives to organisational culture and employee engagement. Measure adoption and business impact.";
  } else if (lowerTitle.includes("engagement") || lowerTitle.includes("retention") || lowerTitle.includes("turnover")) {
    deepDive += " Distinguish engagement from satisfaction: engagement is emotional commitment, satisfaction is contentment. Identify drivers: meaningful work, recognition, growth, leadership. Use pulse surveys, exit interviews, and stay interviews. Implement targeted retention strategies for critical roles.";
  } else if (lowerTitle.includes("international") || lowerTitle.includes("global") || lowerTitle.includes("expatriate")) {
    deepDive += " Understand the complexities of managing a global workforce: cultural differences, expatriate management, international compensation, and host‑country laws. Consider tax, immigration, and repatriation. Build cross‑cultural competence and adapt HR practices to local contexts.";
  } else if (lowerTitle.includes("od") || lowerTitle.includes("organisational development") || lowerTitle.includes("culture")) {
    deepDive += " Use OD interventions (team building, process consulting, coaching) to improve organisational health. Diagnose culture through surveys and interviews. Design interventions that align with strategy and involve employees in the change process. Measure outcomes through performance and engagement.";
  } else if (lowerTitle.includes("wellbeing") || lowerTitle.includes("wellness") || lowerTitle.includes("mental health")) {
    deepDive += " Integrate wellbeing into the employee experience: physical, mental, financial, and social. Offer EAPs, flexible work, and stress management. Understand the link between wellbeing and productivity. Promote a culture that destigmatises mental health issues.";
  } else if (lowerTitle.includes("onboarding") || lowerTitle.includes("orientation") || lowerTitle.includes("induction")) {
    deepDive += " Design onboarding as a multi‑phase process: pre‑boarding, day one, first week, first 90 days. Cover socialisation, role clarity, and connections. Use checklists, mentors, and feedback loops. Good onboarding improves retention and accelerates productivity.";
  } else if (lowerTitle.includes("succession") || lowerTitle.includes("talent") || lowerTitle.includes("career")) {
    deepDive += " Create a talent pipeline for key roles. Identify high‑potential employees and provide stretch assignments, mentoring, and development plans. Integrate succession with performance and learning. Balance internal development with external hiring.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core HR principle in one sentence.\n2. Describe a real‑world scenario where this applies.\n3. Identify the key stakeholders (employees, managers, executives) and their interests.\n4. Map the legal, ethical, and strategic implications.\n5. Practice with a case study or role‑play.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised definitions.\n- Describe the business value and risks associated with the topic.\n- Give an example of a common mistake or pitfall.\n- State how you would measure success or impact.\n- Demonstrate how you would adapt the practice to a remote/hybrid work environment.\n\n### Practice task\nCreate a small case study or scenario for **${title}** inside the **${module.title}** module of the **${path.name}** path. Outline the situation, the HR approach you would take, the expected outcomes, and how you would evaluate success.`;
}

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
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        const sections = [
          ...(topicSeed.sections ?? []),
          { title: "Ultra Explanation and Interview Guide", content: buildUltraExplanation(topicSeed, moduleSeed, pathSeed) },
        ];
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

async function seedHRCategory() {
  const hrCategory: CategorySeed = {
    name: "Human Resources (HR)",
    slug: "human-resources",
    description: "Master Human Resources from foundational principles to strategic leadership: recruitment, training, compensation, employee relations, analytics, and future‑ready practices.",
    icon: "HR",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the core functions of HR, legal basics, and the employee lifecycle.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations of HR",
            slug: "foundations",
            description: "History, roles, ethics, and the HR environment.",
            topics: [
              {
                title: "Introduction to HRM – Strategic Partner, Not Just Admin",
                slug: "intro-hr",
                description: "Evolution of HR, HR functions, and the shift to strategic HRM.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is HRM?", content: "Human Resource Management (HRM) is the strategic approach to managing people to achieve organisational goals. It covers recruitment, training, compensation, employee relations, and more. HRM has evolved from administrative 'personnel' to a strategic partner that drives business performance." },
                  { title: "Evolution of HR", content: "From welfare/personnel in the industrial era, to HRM in the 1980s, to strategic HRM today. The shift reflects the recognition that people are a source of competitive advantage." },
                  { title: "Key HR Functions", content: "Workforce planning, recruitment & selection, training & development, performance management, compensation & benefits, employee relations, and HR analytics." },
                  { title: "HR as a Strategic Partner", content: "HR must align its practices with business strategy, using metrics and data to demonstrate impact. This involves understanding the business model, industry trends, and competitive pressures." },
                ],
              },
              {
                title: "HR Ethics and Corporate Social Responsibility (CSR)",
                slug: "ethics-csr",
                description: "Ethical frameworks, dilemmas, and the role of HR in CSR.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Ethics in HR", content: "HR deals with sensitive issues: privacy, fairness, discrimination, and confidentiality. Ethical HR practices build trust and reputation. Common dilemmas: balancing organisational needs with employee rights, handling conflicts of interest." },
                  { title: "CSR and HR", content: "HR contributes to CSR through fair treatment, diversity, sustainability, and community engagement. CSR attracts talent and enhances brand." },
                  { title: "HR Codes of Conduct", content: "Many professional bodies (e.g., SHRM, CIPD) have codes of ethics. HR professionals must act with integrity and uphold the law." },
                ],
              },
              {
                title: "HR Environment – Legal, Economic, and Technological Forces",
                slug: "hr-environment",
                description: "External factors shaping HR decisions.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Legal Environment", content: "Employment laws, labour relations, health & safety, and equal opportunity. HR must stay updated on changing regulations." },
                  { title: "Economic Environment", content: "Labour market conditions, inflation, and economic cycles affect recruitment, compensation, and downsizing." },
                  { title: "Technological Environment", content: "AI, HRIS, automation, and remote work tools are transforming HR. Tech enables efficiency and data-driven decisions." },
                ],
              },
            ],
          },
          {
            title: "Recruitment and Selection",
            slug: "recruitment-selection",
            description: "Attracting and choosing the right talent.",
            topics: [
              {
                title: "Workforce Planning – Getting the Right Numbers and Skills",
                slug: "workforce-planning",
                description: "Forecasting HR demand and supply.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Workforce Planning?", content: "The process of analysing current workforce, forecasting future needs, and developing strategies to close gaps. Linked to business strategy." },
                  { title: "Demand Forecasting", content: "Quantitative (trend analysis, regression) and qualitative (expert opinion) methods. Consider turnover, growth, and new projects." },
                  { title: "Supply Analysis", content: "Internal: talent inventory, succession plans. External: labour market conditions, talent pools." },
                  { title: "Gap Analysis and Action Plans", content: "Identify surpluses or shortages. Actions: recruitment, training, redeployment, or downsizing." },
                ],
              },
              {
                title: "Recruitment – Attracting a Diverse Candidate Pool",
                slug: "recruitment",
                description: "Sourcing, branding, and recruitment strategies.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Internal vs External Recruitment", content: "Internal: promotes retention, faster. External: brings fresh ideas, broader talent pool." },
                  { title: "Sourcing Channels", content: "Job boards, social media, campus recruitment, headhunters, employee referrals, and careers pages." },
                  { title: "Employer Branding", content: "The image of the company as an employer. Attracts talent and reduces cost‑per‑hire." },
                  { title: "Diversity in Recruitment", content: "Use inclusive language, diverse interview panels, and blind recruitment to reduce bias." },
                ],
              },
              {
                title: "Selection – Choosing the Best Fit",
                slug: "selection",
                description: "Interviews, tests, and decision‑making.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Selection Process", content: "Screening (CV review), assessments (aptitude, personality), interviews (structured, unstructured), reference checks, and job offers." },
                  { title: "Structured vs Unstructured Interviews", content: "Structured is more valid and reduces bias. Use behavioural questions (STAR) to assess competencies." },
                  { title: "Assessment Centres", content: "Simulations, group exercises, and role‑plays for evaluating multiple candidates." },
                  { title: "Making the Offer", content: "Negotiation, background checks, and onboarding preparation." },
                ],
              },
            ],
          },
          {
            title: "Training and Development",
            slug: "training-development",
            description: "Building employee capabilities.",
            topics: [
              {
                title: "Training Needs Analysis (TNA)",
                slug: "tna",
                description: "Identifying performance gaps and training requirements.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Organisational Analysis", content: "Assess strategic direction, resources, and culture to identify where training is needed." },
                  { title: "Task Analysis", content: "Break down job tasks and identify required knowledge, skills, and abilities." },
                  { title: "Individual Analysis", content: "Evaluate employee performance and development needs through appraisals and surveys." },
                ],
              },
              {
                title: "Designing and Delivering Training",
                slug: "training-delivery",
                description: "Methods, evaluation, and return on investment.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Training Methods", content: "On‑the‑job, classroom, e‑learning, simulations, mentoring, and coaching. Choose based on content and audience." },
                  { title: "ADDIE Model", content: "Analysis, Design, Development, Implementation, Evaluation – a systematic approach." },
                  { title: "Kirkpatrick's Evaluation Levels", content: "Reaction, Learning, Behaviour, Results. Measure beyond satisfaction to business impact." },
                ],
              },
            ],
          },
          {
            title: "Employee Relations Basics",
            slug: "er-basics",
            description: "Managing the employment relationship and legal obligations.",
            topics: [
              {
                title: "Employment Law Fundamentals",
                slug: "employment-law",
                description: "Key legislation and compliance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Discrimination and Equal Opportunity", content: "Laws protecting against discrimination based on race, gender, age, disability, etc. (e.g., Title VII, ADEA, ADA)." },
                  { title: "Wage and Hour Laws", content: "Fair Labor Standards Act (FLSA) – minimum wage, overtime, and classification (exempt vs non‑exempt)." },
                  { title: "Leave Entitlements", content: "FMLA, sick leave, parental leave, and other mandated time off." },
                  { title: "Health and Safety", content: "OSHA regulations, workplace safety programs, and reporting." },
                ],
              },
              {
                title: "Discipline and Grievance Handling",
                slug: "discipline-grievance",
                description: "Progressive discipline and conflict resolution.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Progressive Discipline", content: "Verbal warning, written warning, suspension, termination. Ensure consistency and documentation." },
                  { title: "Grievance Procedures", content: "Formal process for employee complaints. Investigate thoroughly and impartially." },
                  { title: "Conflict Resolution", content: "Mediation, negotiation, and arbitration. Aim for early intervention." },
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
        description: "Deepen expertise in performance, compensation, HR tech, and legal compliance.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Performance Management",
            slug: "performance-management",
            description: "Setting goals, appraising, and continuous feedback.",
            topics: [
              {
                title: "Performance Management Systems",
                slug: "performance-systems",
                description: "Designing and implementing effective PM processes.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Purpose of PM", content: "Align individual goals with organisational strategy, provide feedback, identify development needs, and inform reward decisions." },
                  { title: "Goal Setting – SMART and OKRs", content: "Specific, Measurable, Achievable, Relevant, Time‑bound. OKRs (Objectives and Key Results) are popular for agile organisations." },
                  { title: "Performance Appraisal Methods", content: "Rating scales, 360‑degree feedback, forced ranking, critical incidents. Each has pros and cons." },
                  { title: "Continuous Performance Management", content: "Shift from annual reviews to regular check‑ins, real‑time feedback, and agile goal adjustments." },
                ],
              },
              {
                title: "Managing Poor Performance",
                slug: "poor-performance",
                description: "Identifying and addressing underperformance.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Causes of Poor Performance", content: "Lack of skills, motivation, resources, or personal issues. Diagnose before intervening." },
                  { title: "Performance Improvement Plans (PIPs)", content: "Structured plan with specific goals, support, and timelines. Document throughout." },
                  { title: "Legal and Ethical Considerations", content: "Ensure fairness, avoid discrimination, and follow due process." },
                ],
              },
            ],
          },
          {
            title: "Compensation and Benefits",
            slug: "compensation-benefits",
            description: "Designing total rewards packages.",
            topics: [
              {
                title: "Compensation Strategy",
                slug: "compensation-strategy",
                description: "Linking pay to business goals and market competitiveness.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Total Rewards Framework", content: "Compensation, benefits, work‑life, performance, and career development." },
                  { title: "Market Pricing", content: "Salary surveys, benchmarking, and pay ranges. Aim to be competitive yet affordable." },
                  { title: "Pay Structures", content: "Grades, bands, and step progressions. Ensure internal equity and external competitiveness." },
                ],
              },
              {
                title: "Benefits – Beyond Salary",
                slug: "benefits",
                description: "Health, retirement, and lifestyle benefits.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Mandatory Benefits", content: "Social security, workers' compensation, unemployment insurance, and health insurance (in some countries)." },
                  { title: "Voluntary Benefits", content: "Dental, vision, life insurance, wellness programs, flexible spending accounts." },
                  { title: "Benefits Communication and Education", content: "Employees need to understand their benefits to value them. Use total rewards statements." },
                ],
              },
              {
                title: "Incentives and Recognition",
                slug: "incentives",
                description: "Variable pay and non‑monetary recognition.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Short‑Term Incentives", content: "Bonuses, commissions, and profit‑sharing. Linked to performance and company results." },
                  { title: "Long‑Term Incentives", content: "Stock options, RSUs, and deferred compensation. Align with long‑term value." },
                  { title: "Employee Recognition Programs", content: "Peer‑to‑peer awards, service awards, and spot bonuses. Non‑monetary recognition (thanks, public praise) is also powerful." },
                ],
              },
            ],
          },
          {
            title: "HR Information Systems (HRIS) and Technology",
            slug: "hris-tech",
            description: "Leveraging technology for efficiency and data.",
            topics: [
              {
                title: "HRIS Fundamentals",
                slug: "hris",
                description: "Core HR systems and their modules.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What is HRIS?", content: "Software that manages HR data, payroll, time, benefits, and employee records. Examples: Workday, SAP SuccessFactors, Oracle HCM." },
                  { title: "Core Modules", content: "Employee database, payroll, time and attendance, benefits administration, recruitment, and performance management." },
                  { title: "Implementation Considerations", content: "Vendor selection, data migration, change management, and user training." },
                ],
              },
              {
                title: "HR Analytics and Metrics",
                slug: "hr-analytics",
                description: "Using data to drive decisions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Key HR Metrics", content: "Turnover rate, time‑to‑fill, cost‑per‑hire, engagement score, revenue per employee, and more." },
                  { title: "Analytics Maturity", content: "Descriptive (what happened), diagnostic (why), predictive (what will), prescriptive (what to do)." },
                  { title: "Data Storytelling", content: "Presenting HR data to leadership: visualise, contextualise, and recommend actions." },
                ],
              },
            ],
          },
          {
            title: "Employment Law and Compliance",
            slug: "employment-law-deep",
            description: "In‑depth look at regulations and risk management.",
            topics: [
              {
                title: "Anti‑Discrimination Laws",
                slug: "anti-discrimination",
                description: "Federal and state protections.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Protected Classes", content: "Race, colour, religion, sex, national origin, age, disability, genetic information, and more." },
                  { title: "Harassment and Bullying", content: "Sexual harassment, hostile work environment, and prevention through training." },
                  { title: "Accommodation and Reasonable Adjustments", content: "For disabilities, religious practices, and pregnancy." },
                ],
              },
              {
                title: "Wage and Hour Compliance",
                slug: "wage-hour",
                description: "Overtime, classification, and recordkeeping.",
                estimatedMinutes: 20,
                sections: [
                  { title: "FLSA Overview", content: "Minimum wage, overtime pay, child labour, and recordkeeping." },
                  { title: "Exempt vs Non‑Exempt", content: "Salary vs hourly; duties test for exemption. Misclassification is a major risk." },
                  { title: "Off‑the‑Clock Work", content: "Ensure all hours worked are paid. Avoid unauthorised overtime." },
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
        description: "Strategic HRM, talent management, OD, HR analytics, and global HR.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Strategic HRM",
            slug: "strategic-hrm",
            description: "Aligning HR with business strategy for competitive advantage.",
            topics: [
              {
                title: "The Resource‑Based View of HR",
                slug: "rbv-hr",
                description: "People as a source of sustainable advantage.",
                estimatedMinutes: 20,
                sections: [
                  { title: "RBV Theory", content: "Firms gain competitive advantage through resources that are valuable, rare, inimitable, and non‑substitutable (VRIN). Human capital can be a VRIN resource." },
                  { title: "HR Architecture", content: "Different HR strategies for different employee groups: strategic knowledge workers, core employees, support staff, and external partners." },
                  { title: "Linking HR to Business Outcomes", content: "Show how HR practices influence financial performance, customer satisfaction, and innovation." },
                ],
              },
              {
                title: "Strategic Workforce Planning",
                slug: "strategic-wfp",
                description: "Long‑term planning for talent and capabilities.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SWP Process", content: "Understand business strategy, assess current capabilities, forecast future needs, and develop action plans." },
                  { title: "Scenario Planning", content: "Prepare for multiple possible futures (e.g., digital disruption, economic shifts)." },
                  { title: "Talent Pipelining", content: "Build relationships with potential candidates and develop internal talent for future roles." },
                ],
              },
            ],
          },
          {
            title: "Talent Management",
            slug: "talent-management",
            description: "Acquiring, developing, and retaining top talent.",
            topics: [
              {
                title: "Succession Planning",
                slug: "succession",
                description: "Identifying and preparing future leaders.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Succession Planning?", content: "A process to identify critical roles and develop employees to fill them when they become vacant." },
                  { title: "High‑Potential Identification", content: "Use performance data, assessment centres, and manager nominations. Combine with development plans." },
                  { title: "Talent Reviews and Calibration", content: "Bring leaders together to review talent pools and ensure consistency." },
                ],
              },
              {
                title: "Career Development and Pathing",
                slug: "career-development",
                description: "Supporting employee growth.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Career Ladders vs Lattices", content: "Ladders are vertical promotions; lattices allow lateral moves for broader experience." },
                  { title: "Mentoring and Coaching", content: "Formal and informal programs to transfer knowledge and skills." },
                  { title: "Individual Development Plans (IDPs)", content: "Personalised plans with goals, activities, and timelines." },
                ],
              },
              {
                title: "Retention and Engagement",
                slug: "retention-engagement",
                description: "Keeping your best people.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Drivers of Engagement", content: "Meaningful work, supportive management, growth opportunities, recognition, and trust." },
                  { title: "Measuring Engagement", content: "Surveys (pulse, annual), interviews, and turnover analysis." },
                  { title: "Retention Strategies", content: "Competitive pay, flexible work, career development, and strong culture." },
                ],
              },
            ],
          },
          {
            title: "Organisational Development and Change",
            slug: "od-change",
            description: "Transforming organisations and culture.",
            topics: [
              {
                title: "Organisational Culture",
                slug: "org-culture",
                description: "Diagnosing and shaping culture.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Culture?", content: "Shared values, beliefs, and behaviours that shape how work gets done." },
                  { title: "Culture Models", content: "Competing Values Framework, Denison, Schein's layers." },
                  { title: "Culture Change", content: "Leadership, communication, systems, and rituals. Align with strategy." },
                ],
              },
              {
                title: "Change Management",
                slug: "change-mgmt",
                description: "Leading change effectively.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Change Models", content: "Kotter's 8‑step, ADKAR, Lewin's 3‑stage. Each offers a roadmap." },
                  { title: "Resistance and Communication", content: "Understand sources of resistance and address with clear, consistent communication." },
                  { title: "Sustaining Change", content: "Embed changes in systems, reinforce with rewards, and monitor adoption." },
                ],
              },
              {
                title: "OD Interventions",
                slug: "od-interventions",
                description: "Techniques to improve organisational effectiveness.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Team Building", content: "Improve trust, communication, and collaboration. Activities and off‑sites." },
                  { title: "Process Consultation", content: "Helping teams diagnose and solve their own problems." },
                  { title: "Appreciative Inquiry", content: "Focus on strengths and positive potential." },
                ],
              },
            ],
          },
          {
            title: "International HRM",
            slug: "ihrm",
            description: "Managing a global workforce.",
            topics: [
              {
                title: "Global Staffing and Expatriation",
                slug: "expatriation",
                description: "Deploying talent across borders.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Expatriate Management", content: "Selection, training, compensation, and repatriation. Address cultural adjustment and support." },
                  { title: "Types of Global Employees", content: "Expatriates, host‑country nationals, third‑country nationals." },
                  { title: "International Compensation", content: "Balance home‑country and host‑country pay, tax equalisation, and allowances." },
                ],
              },
              {
                title: "Cross‑Cultural HR",
                slug: "cross-cultural",
                description: "Understanding cultural differences and adapting HR practices.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Hofstede's Dimensions", content: "Power distance, individualism, masculinity, uncertainty avoidance, long‑term orientation." },
                  { title: "Adapting HR Practices", content: "Recruitment, performance, and rewards must fit local culture." },
                  { title: "Building a Global HR Mindset", content: "Cultural intelligence, flexibility, and global collaboration." },
                ],
              },
            ],
          },
          {
            title: "HR Analytics and People Analytics",
            slug: "people-analytics",
            description: "Advanced data‑driven HR decisions.",
            topics: [
              {
                title: "Predictive Analytics in HR",
                slug: "predictive-analytics",
                description: "Using models to predict turnover, performance, and hiring success.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Data Sources", content: "HRIS, performance data, engagement surveys, exit interviews, and external benchmarks." },
                  { title: "Common Models", content: "Logistic regression, decision trees, and machine learning for prediction." },
                  { title: "Ethics and Privacy", content: "Ensure transparency, consent, and avoid algorithmic bias." },
                ],
              },
              {
                title: "HR Dashboards and Reporting",
                slug: "hr-dashboards",
                description: "Visualising HR metrics for leadership.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Designing Dashboards", content: "Focus on key KPIs, use charts, and keep it simple." },
                  { title: "Storytelling with Data", content: "Present insights in a compelling narrative that drives action." },
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
        description: "Common HR interview questions, legal scenarios, and strategic case studies.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core HR Concepts",
            slug: "core-hr-interview",
            description: "Fundamental questions on HR functions and principles.",
            topics: [
              {
                title: "The HR Business Partner Model",
                slug: "hrbp-model",
                description: "Understand the HRBP role and strategic impact.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What is an HRBP?", content: "An HR Business Partner works directly with business leaders to align HR strategies with business goals. They move beyond transactional HR to strategic advisory." },
                  { title: "Key Competencies", content: "Business acumen, data literacy, change management, and relationship building." },
                  { title: "Sample Interview Question", content: "'Tell me about a time you influenced a business decision using HR data.'" },
                ],
              },
              {
                title: "HR Legal Landmines",
                slug: "legal-interview",
                description: "Common legal pitfalls and how to avoid them.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Discrimination in Hiring", content: "Be aware of adverse impact, disparate treatment, and how to validate selection tools." },
                  { title: "Misclassification", content: "Exempt vs non‑exempt; common mistakes and consequences." },
                  { title: "Handling Harassment Complaints", content: "Investigation process, confidentiality, and documentation." },
                ],
              },
            ],
          },
          {
            title: "Strategic and Behavioral Questions",
            slug: "strategic-behavioral",
            description: "Case‑based and situational questions.",
            topics: [
              {
                title: "Talent Acquisition Case Study",
                slug: "ta-case",
                description: "Design a recruitment strategy for a growth company.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Scenario", content: "A tech startup needs to double its engineering team in six months. How would you approach this?" },
                  { title: "Key Considerations", content: "Employer branding, sourcing channels, candidate experience, assessment methods, and timeline." },
                  { title: "Metrics", content: "Track time‑to‑fill, quality‑of‑hire, cost‑per‑hire, and diversity." },
                ],
              },
              {
                title: "Performance Management Dilemma",
                slug: "pm-case",
                description: "Handling a low‑performing employee with potential.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Scenario", content: "A manager complains about an employee's declining performance. The employee has been with the company for 5 years." },
                  { title: "Approach", content: "Gather data, have a coaching conversation, create a PIP, and involve HR. Consider underlying causes." },
                  { title: "Legal/HR Risk", content: "Ensure consistency, document everything, and avoid retaliation." },
                ],
              },
            ],
          },
          {
            title: "Leadership and Culture Questions",
            slug: "leadership-culture",
            description: "Questions about leading HR and shaping culture.",
            topics: [
              {
                title: "Building a High‑Performance Culture",
                slug: "culture-case",
                description: "How would you shift a culture from complacent to high‑performing?",
                estimatedMinutes: 22,
                sections: [
                  { title: "Diagnosis", content: "Surveys, focus groups, turnover data, and exit interviews." },
                  { title: "Interventions", content: "Leadership alignment, performance expectations, recognition, and communication." },
                  { title: "Sustainability", content: "Embed in systems, hiring, and succession." },
                ],
              },
              {
                title: "Leading HR Transformation",
                slug: "hr-transformation",
                description: "How would you modernise an outdated HR function?",
                estimatedMinutes: 24,
                sections: [
                  { title: "Assessment", content: "Review current processes, technology, and employee perception." },
                  { title: "Roadmap", content: "Prioritise automation, self‑service, HR analytics, and strategic partnering." },
                  { title: "Change Management", content: "Engage stakeholders, communicate vision, and train HR staff." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(hrCategory);
  console.log("✅ Human Resources (HR) category seeded (ultra‑detailed)");
}

async function main() {
  await seedHRCategory();
}

main()
  .catch((error) => {
    console.error("HR seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });