// generate-questions.ts
import * as fs from 'fs';

// ==================== CATEGORIES (copy from your file) ====================
const categories = [
  ["Software Developer", "Technology"],
  ["Android Developer", "Technology"],
  ["Java Developer", "Technology"],
  ["Kotlin Developer", "Technology"],
  ["Python Developer", "Technology"],
  ["JavaScript Developer", "Technology"],
  ["React Developer", "Technology"],
  ["Web Developer", "Technology"],
  ["SQL", "Technology"],
  ["QA Tester", "Technology"],
  ["Data Analyst", "Technology"],
  ["Sales", "Business"],
  ["Marketing", "Business"],
  ["Human Resources", "Business"],
  ["Customer Support", "Business"],
  ["Accountant", "Finance"],
  ["Banking", "Finance"],
  ["Finance", "Finance"],
  ["Fresher", "General"],
  ["Internship", "General"],
  ["HR", "General"],
  ["Behavioral", "General"],
  ["Situational", "General"],
  ["Presales", "Business"],
  ["Digital Marketing", "Business"],
  ["API & Web Services", "Technology"],
  ["Computer Science", "Technology"],
  ["Cybersecurity", "Technology"],
  ["Generative AI", "Technology"],
  ["Data Science", "Technology"],
  ["DevOps", "Technology"],
  ["HTML & CSS", "Technology"],
  ["Software Engineer", "Technology"],
  ["Machine Learning", "Technology"],
] as const;

// ==================== SUB‑TOPICS FOR EACH CATEGORY ====================
const subTopicMap: Record<string, string[]> = {
  "Software Developer": [
    "architecture", "code-review", "microservices", "observability", "deployment",
    "idempotent-api-design", "feature-flags", "api-rate-limiting", "dependency-injection",
    "event-driven-architecture", "technical-debt-triage", "distributed-systems",
    "design-patterns", "scalability", "reliability", "performance", "testing",
    "security", "cicd", "containerization", "messaging-queues", "caching",
    "database-design", "api-design", "logging", "monitoring", "alerts"
  ],
  "Android Developer": [
    "jetpack-compose", "viewmodel", "room-database", "workmanager", "coroutines",
    "flow", "lifecycle", "state-restoration", "offline-first-sync", "multi-module",
    "gradle-optimization", "performance", "security", "biometrics", "testing",
    "custom-views", "large-image-loading", "configuration-changes", "navigation",
    "dependency-injection"
  ],
  "Java Developer": [
    "jvm", "garbage-collection", "concurrency", "memory-leak", "streams", "records",
    "sealed-classes", "virtual-threads", "exception-handling", "builder-pattern",
    "equals-hashcode", "functional-interfaces", "module-system", "spring-boot",
    "transaction-management", "caching", "saga-pattern", "jwt", "performance-tuning",
    "classloading"
  ],
  "Kotlin Developer": [
    "coroutines", "flow", "sealed-classes", "extension-functions", "data-classes",
    "null-safety", "dsl", "stateflow-vs-sharedflow", "multi-platform", "delegates",
    "inline-functions", "reified-types", "compose", "testing", "structuring-viewmodel",
    "result-wrapper", "cancellation-propagation"
  ],
  "Python Developer": [
    "asyncio", "context-managers", "decorators", "generators", "type-hints",
    "virtual-env", "packaging", "django", "flask", "fastapi", "testing", "performance",
    "memory-optimization", "etl", "data-processing", "async-await", "middleware",
    "retry-decorator", "connection-pooling"
  ],
  "JavaScript Developer": [
    "event-loop", "promises", "async-await", "closures", "prototypal-inheritance",
    "debouncing-throttling", "bundling", "tree-shaking", "nodejs", "error-handling",
    "web-workers", "service-workers", "websockets", "state-machine", "race-conditions",
    "design-system-api", "custom-event-emitter", "plugin-system", "browser-compatibility"
  ],
  "React Developer": [
    "hooks", "context-api", "custom-hooks", "suspense", "error-boundaries",
    "performance-memoization", "controlled-vs-uncontrolled", "state-management",
    "testing", "component-composition", "render-props", "higher-order-components",
    "virtual-dom", "portals", "server-components", "ssr", "infinite-scroll",
    "modal-management", "stale-closures"
  ],
  "Web Developer": [
    "accessibility", "responsive-design", "css-grid-flexbox", "css-variables",
    "css-specificity", "animations", "core-web-vitals", "pwa", "csp",
    "cors", "web-components", "semantic-html", "font-loading", "caching-headers",
    "cross-browser-testing", "seo", "structured-data", "multi-language",
    "back-forward-cache", "sitemap"
  ],
  "SQL": [
    "query-optimization", "indexing", "execution-plan", "normalization",
    "denormalization", "window-functions", "cte", "transactions", "isolation-levels",
    "deadlocks", "migrations", "recursive-queries", "row-level-security",
    "audit-tables", "time-zones", "bulk-deletes", "star-schema", "slowly-changing-dimensions"
  ],
  "QA Tester": [
    "test-automation", "unit-integration-e2e", "test-data-management", "flaky-tests",
    "contract-testing", "api-testing", "performance-load-testing", "accessibility-testing",
    "exploratory-testing", "regression-testing", "test-pyramid", "page-objects",
    "ci-integration", "visual-regression", "mobile-testing", "smoke-tests",
    "third-party-dependencies"
  ],
  "Data Analyst": [
    "data-quality", "etl", "dashboards", "cohort-analysis", "funnel-analysis",
    "attribution", "ab-testing", "statistical-significance", "outlier-detection",
    "data-governance", "semantic-layer", "metric-definition", "data-visualization",
    "reporting-cadence", "stakeholder-communication", "experiment-readout",
    "incomplete-data", "conflicting-metrics"
  ],
  "Sales": [
    "discovery", "qualification", "objection-handling", "demo-customization",
    "business-case", "roi", "negotiation", "forecasting", "champion-building",
    "stakeholder-mapping", "competitive-positioning", "closing", "upselling",
    "cross-selling", "account-planning", "pricing-objections", "mutual-action-plan",
    "procurement-negotiation", "ghosting-deal", "multi-vendor-deals"
  ],
  "Marketing": [
    "content-strategy", "seo", "paid-ads", "email-marketing", "social-media",
    "brand-messaging", "campaign-measurement", "attribution", "customer-segmentation",
    "product-launch", "influencer-marketing", "cro", "analytics", "marketing-automation",
    "go-to-market", "brand-guidelines", "rebranding", "negative-feedback"
  ],
  "Human Resources": [
    "recruiting", "structured-interviews", "compensation", "performance-reviews",
    "onboarding", "diversity-inclusion", "conflict-resolution", "employee-relations",
    "policy-design", "talent-development", "retention", "culture-building",
    "time-to-hire", "engagement", "compliance", "compensation-review",
    "layoff-communication", "investigation", "pushback-handling"
  ],
  "Customer Support": [
    "ticket-triage", "escalation", "knowledge-base", "csat", "de-escalation",
    "automation", "retention", "feedback-loops", "service-recovery", "tiered-support",
    "sla", "empathy", "customer-churn", "support-macro", "product-outage",
    "multi-channel", "feedback-loop-with-product"
  ],
  "Accountant": [
    "month-end-close", "reconciliations", "revenue-recognition", "audit-support",
    "cash-flow", "expense-policy", "fixed-assets", "multi-currency", "ifrs-compliance",
    "financial-reporting", "internal-controls", "budgeting", "forecasting",
    "chart-of-accounts", "discrepancy-handling", "vendor-payment-workflow",
    "tax-position", "asset-tracking"
  ],
  "Banking": [
    "risk-assessment", "fraud-detection", "kyc-aml", "loan-underwriting",
    "credit-scoring", "regulatory-reporting", "dispute-resolution", "cross-selling",
    "compliance", "transaction-monitoring", "customer-onboarding", "fraud-escalation",
    "wire-transfer-dispute", "joint-account-dispute", "business-banking-checklist"
  ],
  "Finance": [
    "forecasting", "variance-analysis", "three-statement-model", "scenario-planning",
    "capital-investment", "working-capital", "board-reporting", "valuation",
    "ma-analysis", "roi-analysis", "budgeting", "pricing-strategy", "cost-optimization",
    "rolling-forecast", "fundraising-due-diligence", "burn-rate", "headcount-planning",
    "pricing-sensitivity"
  ],
  "Fresher": [
    "project-explanation", "learning-agility", "time-management", "asking-questions",
    "handling-ambiguity", "mistake-recovery", "confidence-building", "career-planning",
    "technical-assessment", "resume-highlights", "salary-expectations", "group-interview",
    "self-taught-skills", "personal-projects"
  ],
  "Internship": [
    "first-week", "asking-clarifying-questions", "ownership", "feedback-handling",
    "relationship-building", "documentation", "seeking-challenge", "time-management",
    "final-presentation", "conversion-to-fulltime", "comfort-zone-expansion",
    "negotiating-scope", "repetitive-tasks", "unclear-reporting-lines", "mistake-impact"
  ],
  "HR": [
    "career-gap", "salary-expectations", "weaknesses", "stress-handling",
    "long-term-goals", "industry-change", "management-style", "motivation",
    "explaining-leave", "cultural-fit", "communication-style", "constructive-criticism",
    "professional-goals", "staying-current"
  ],
  "Behavioral": [
    "disagreement-with-manager", "missed-deadline", "persuasion", "initiative",
    "learning-under-pressure", "conflict-resolution", "incomplete-information",
    "saying-no", "receiving-praise", "priorities-change", "admitting-mistake",
    "mentoring", "feedback-given", "trust-rebuilding", "data-driven-decision",
    "scope-change", "working-with-clashing-styles", "catching-own-mistake",
    "giving-feedback-to-senior", "volunteering-outside-role", "simplifying-complexity"
  ],
  "Situational": [
    "teammate-not-pulling-weight", "conflicting-instructions", "project-behind-schedule",
    "disagree-with-decision", "customer-escalation", "outside-expertise",
    "colleague-error", "speed-vs-quality", "unclear-ownership", "changing-requirements",
    "personal-commitment", "inherited-undocumented-project", "mistake-delivered",
    "extra-work-no-time", "colleague-takes-credit", "cut-corners", "newest-person-disagrees",
    "project-reassigned", "unconfident-delivery", "stakeholder-unhappy-final"
  ],
  "Presales": [
    "qualification", "objection-handling", "demo-customization", "business-case",
    "poc-management", "security-questionnaire", "incumbent-positioning", "implementation-timeline",
    "multi-stakeholder-demo", "proof-of-value", "technical-evaluation", "engineering-access",
    "competitive-stakeholders", "trial-success-plan", "unrealistic-timeline"
  ],
  "Digital Marketing": [
    "content-strategy", "google-ads", "social-media-metrics", "email-automation",
    "landing-page-optimization", "attribution-modeling", "seo-gap-analysis",
    "retargeting", "influencer-vs-paid", "email-deliverability", "cro-testing",
    "organic-social-growth", "paid-search-budget", "ad-fatigue", "utm-conventions",
    "algorithm-change", "device-conversion", "lifecycle-marketing"
  ],
  "API & Web Services": [
    "api-versioning", "graphql-security", "pagination", "webhook-design",
    "grpc-migration", "openapi-swagger", "api-gateway", "oauth2-authentication",
    "schema-validation", "api-deprecation", "partial-failures", "api-monitoring",
    "sandbox-environment", "partner-communication", "documentation-for-devs",
    "json-schema", "multi-region-failover", "large-payload-streaming"
  ],
  "Computer Science": [
    "concurrency", "data-structures", "deadlock", "consistent-hashing", "garbage-collection",
    "time-complexity", "graph-traversal", "dynamic-programming", "hashing-collisions",
    "trie-data-structure", "binary-search", "sorting-algorithms", "distributed-rate-limiter",
    "trie-autocomplete", "complexity-analysis", "consistent-snapshot", "skip-list",
    "cache-eviction-policy"
  ],
  "Cybersecurity": [
    "sql-injection", "zero-trust", "incident-response", "api-security", "password-storage",
    "threat-modeling", "penetration-testing", "phishing-awareness", "vulnerability-disclosure",
    "ci-cd-security", "container-scanning", "least-privilege", "owasp-top-10",
    "security-incident-comm", "false-positive-alerting", "rbac", "security-debt",
    "third-party-assessment", "tabletop-exercise"
  ],
  "Generative AI": [
    "hallucination", "prompt-engineering", "model-evaluation", "fine-tuning",
    "rag", "token-cost-optimization", "embedding-model-selection", "chunking-strategy",
    "hallucination-evaluation", "prompt-injection-defense", "structured-output-json",
    "multi-agent-orchestration", "eval-dataset", "user-trust", "fallback-experience",
    "cost-spikes", "multilingual-support", "feedback-loop"
  ],
  "Data Science": [
    "imbalanced-data", "recommendation-systems", "outlier-detection", "ab-testing",
    "logistic-regression", "feature-engineering", "train-test-leakage", "hyperparameter-tuning",
    "cross-validation", "shap-lime-explainability", "time-series-forecasting",
    "causal-inference", "feature-store", "model-monitoring", "model-validation",
    "stakeholder-pressure", "true-randomization", "offline-online-performance",
    "class-definitions-change", "feature-pipeline"
  ],
  "DevOps": [
    "cicd", "iac", "kubernetes-monitoring", "secrets-management", "docker-optimization",
    "gitops", "service-mesh", "observability", "multi-region-failover", "chaos-engineering",
    "blue-green-canary", "rollback-strategy", "autoscaling", "cloud-cost-optimization",
    "platform-catalog", "secrets-rotation", "cost-tagging", "multi-cloud-complexity",
    "noisy-neighbor", "golden-path"
  ],
  "HTML & CSS": [
    "flexbox", "css-grid", "aria", "css-variables", "animations", "core-web-vitals",
    "responsive-images", "font-loading", "caching-headers", "semantic-html",
    "specificity-management", "cross-browser-testing", "css-custom-properties",
    "container-queries", "specificity-debugging", "print-styles", "seo-accessibility",
    "logical-properties-rtl", "scroll-driven-animations", "scalable-css-naming",
    "design-system-spacing", "accessible-form-controls", "critical-css",
    "browser-rendering-quirks", "fluid-typography"
  ],
  "Software Engineer": [
    "code-quality", "estimation", "notification-system", "incident-response",
    "engineering-culture", "design-documents", "tech-debt", "mentoring",
    "cross-team-decision", "build-vs-buy", "technical-roadmap", "rewrite-vs-improve",
    "onboarding-curriculum", "framework-migration", "on-call-burden",
    "cross-team-dependencies", "incident-retrospective", "high-uncertainty-estimation"
  ],
  "Machine Learning": [
    "model-selection", "overfitting", "missing-data", "clustering-evaluation",
    "ml-deployment", "feature-store-design", "drift-monitoring", "ab-testing-models",
    "cold-start-recommendations", "label-noise", "imbalanced-metrics",
    "regulated-industry-interpretability", "model-card", "historical-bias",
    "ml-platform-sharing", "model-rollback", "out-of-distribution-inference",
    "labeling-guidelines"
  ]
};

// ==================== TEMPLATES ====================
const templates = [
  { q: "How would you approach {topic}?", hint: "The interviewer wants a clear, structured way of thinking about {topic}, not just a memorized answer." },
  { q: "Walk me through your strategy for {topic}.", hint: "Be structured and practical when explaining {topic}." },
  { q: "What trade-offs matter most when dealing with {topic}?", hint: "Show you understand the real-world trade-offs of {topic}." },
  { q: "How do you decide when {topic} is the right call?", hint: "Explain the conditions that make {topic} appropriate." },
  { q: "What's your process for {topic} in a production system?", hint: "Connect your approach to a real system." },
  { q: "How would you explain {topic} to a teammate who's new to it?", hint: "Simplify the concept for a junior audience." },
  { q: "What common mistakes have you seen with {topic}?", hint: "Show you've learned from past errors." },
  { q: "How would you evaluate whether {topic} is working well?", hint: "Define success metrics for {topic}." },
  { q: "What's your approach to handling {topic}?", hint: "Focus on practical steps for {topic}." },
  { q: "How would you design a solution for {topic}?", hint: "Be creative and cover edge cases." },
  { q: "Talk me through how you'd handle {topic}.", hint: "Step-by-step reasoning for {topic}." },
  { q: "What would you prioritize when {topic}?", hint: "Identify the most critical aspects of {topic}." },
];

// ==================== CONTEXTS (used to vary questions) ====================
const contexts = [
  "for a small team",
  "when requirements are unclear",
  "under a tight deadline",
  "with a focus on accessibility",
  "with limited operational budget",
  "when a previous solution failed",
  "for a high-risk release",
  "when explaining your decision to a non-specialist",
  "while mentoring a junior teammate",
  "after measuring an unexpected result",
  "for a large‑scale production system",
  "with strict security and compliance requirements",
  "when scalability is a critical concern",
  "for a global team with distributed members",
];

// ==================== THE SITUATIONAL CONTEXTS FROM YOUR ORIGINAL FILE ====================
// We keep this exactly as you had it.
const situationalContexts = [
  "for a small team",
  "when requirements are unclear",
  "under a tight deadline",
  "with a focus on accessibility",
  "with limited operational budget",
  "when a previous solution failed",
  "for a high-risk release",
  "when explaining your decision to a non-specialist",
  "while mentoring a junior teammate",
  "after measuring an unexpected result",
  "for a large‑scale production system",
  "with strict security and compliance requirements",
  "when scalability is a critical concern",
  "for a global team with distributed members",
] as const;

// ==================== GENERATION LOGIC ====================

function generateIdealAnswer(topic: string): string {
  const parts = [
    `I would start by clarifying the specific constraints around ${topic} – scale, risk tolerance, and existing systems.`,
    `Then I would break ${topic} down into the concrete decisions involved, weigh the trade-offs of each, and pick the option that best fits the constraints at hand.`,
    `I would also look at how similar problems have been solved elsewhere on the team before tackling ${topic} from scratch.`,
    `After implementation, I would measure the outcomes against the defined success criteria and iterate based on feedback.`,
    `Finally, I would document the approach and share learnings with the wider team.`,
  ];
  const shuffled = parts.sort(() => 0.5 - Math.random());
  const count = 2 + Math.floor(Math.random() * 3);
  return shuffled.slice(0, count).join(' ');
}

function generateQuestions() {
  const generated = new Set<string>();
  const result: Array<[string, string, string, string, string]> = [];

  for (const [catName] of categories) {
    const topicsForCat = subTopicMap[catName] || [];
    for (const topic of topicsForCat) {
      for (const tpl of templates) {
        let question = tpl.q.replace(/\{topic\}/g, topic);
        // Randomly add a context to ~30% of questions
        if (Math.random() > 0.7) {
          const ctx = contexts[Math.floor(Math.random() * contexts.length)];
          question += ` ${ctx}`;
        }
        const hint = tpl.hint.replace(/\{topic\}/g, topic);
        const answer = generateIdealAnswer(topic);
        const normalized = question.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!generated.has(normalized)) {
          generated.add(normalized);
          result.push([catName, question, topic, hint, answer]);
        }
      }
    }
  }

  console.log(`✅ Generated ${result.length} unique questions.`);
  return result;
}

// ==================== OUTPUT FILE ====================

function generateFileContent(questions: Array<[string, string, string, string, string]>) {
  const categoriesStr = categories.map(c => `  ["${c[0]}", "${c[1]}"]`).join(',\n');
  const topicsStr = questions.map(q => {
    const [cat, qText, sub, hint, answer] = q;
    const escapedQ = qText.replace(/"/g, '\\"');
    const escapedHint = hint.replace(/"/g, '\\"');
    const escapedAnswer = answer.replace(/"/g, '\\"');
    return `  ["${cat}", "${escapedQ}", "${sub}", "${escapedHint}", "${escapedAnswer}"]`;
  }).join(',\n');

  const situationalContextsStr = situationalContexts.map(c => `  "${c}"`).join(',\n');

  return `// Auto‑generated question data file with ${questions.length} unique questions.
// Generated by generate-questions.ts – do not edit manually.

// ---- Categories ----
export const categories = [
${categoriesStr}
] as const;

// ---- Topics ----
export const topics = [
${topicsStr}
] as const;

// ---- Situational contexts (kept for compatibility) ----
export const situationalContexts = [
${situationalContextsStr}
] as const;

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
`;
}

// ==================== MAIN ====================

const questions = generateQuestions();
const fileContent = generateFileContent(questions);
fs.writeFileSync('generated-questions-data.ts', fileContent, 'utf8');
console.log('📄 File written: generated-questions-data.ts');