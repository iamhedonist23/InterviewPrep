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
  let deepDive = `Study ${title} as a practical systems engineering practice, not as a theoretical definition. Begin with the system lifecycle stage this addresses: ${subject}. The critical questions are: what are the inputs and outputs, which stakeholders are involved, what are the key decision gates, and how does this activity reduce overall project risk?`;

  if (lowerTitle.includes("requirement") || lowerTitle.includes("elicitation") || lowerTitle.includes("traceability")) {
    deepDive += " Requirements are the foundation of system design. Distinguish between stakeholder needs (what the user wants) and system requirements (what the system must do). Ensure every requirement is SMART: Specific, Measurable, Achievable, Relevant, and Testable. Build a bidirectional traceability matrix (RTM) that links requirements to design elements, test cases, and verification methods—missing traceability is the root cause of most project overruns.";
  } else if (lowerTitle.includes("v&v") || lowerTitle.includes("verification") || lowerTitle.includes("validation")) {
    deepDive += " Verification (building the system right) ensures compliance with specifications; Validation (building the right system) ensures it meets user needs. Both must be planned from day one. Use the 'V‑Model' to align verification/validation activities with each level of system decomposition. For verification, use methods: Inspection, Analysis, Demonstration, and Test (IADT). Validation typically involves operational testing and user acceptance.";
  } else if (lowerTitle.includes("architecture") || lowerTitle.includes("functional") || lowerTitle.includes("physical")) {
    deepDive += " Architecture defines the system's structure, behavior, and key properties. Separate functional architecture (what the system does) from physical architecture (how it is built). Use architectural views (e.g., OPM, UML/SysML) to communicate with different stakeholders. Evaluate alternatives using trade‑off analysis based on quality attributes (performance, reliability, cost, maintainability) and select the architecture that best balances these attributes.";
  } else if (lowerTitle.includes("interface") || lowerTitle.includes("icd") || lowerTitle.includes("n2")) {
    deepDive += " Interfaces are the primary source of integration failure. Define interfaces in an Interface Control Document (ICD) specifying physical, functional, and environmental characteristics. Use N² (N‑squared) diagrams to map all interface relationships between components. Ensure interface requirements are verified before integration. Changes to an interface must be strictly configuration‑controlled.";
  } else if (lowerTitle.includes("mbse") || lowerTitle.includes("model-based") || lowerTitle.includes("sysml")) {
    deepDive += " MBSE shifts the paradigm from document‑centric to model‑centric engineering. Models become the single source of truth, enabling consistency, traceability, and simulation. Master the four pillars of SysML: Structure (Block Definition, Internal Block), Behavior (Activity, Sequence, State Machine), Requirements, and Parametrics (for performance constraints). Adopt a modeling framework like OOSEM or Harmony. The primary value is early validation through simulation and automated document generation.";
  } else if (lowerTitle.includes("integration") || lowerTitle.includes("test") || lowerTitle.includes("acceptance")) {
    deepDive += " Integration is the process of assembling subsystems and verifying their interfaces. Choose a strategy: Big Bang (all at once) or Incremental (Top‑down, Bottom‑up, or Sandwich). Test planning must start early—define test cases based on requirements, and distinguish between unit, integration, system, and acceptance testing. Acceptance criteria must be clearly defined and agreed with the customer before test execution.";
  } else if (lowerTitle.includes("risk") || lowerTitle.includes("mitigation") || lowerTitle.includes("contingency")) {
    deepDive += " Risk management is proactive problem prevention. Identify risks (technical, schedule, cost, safety), analyse their probability and impact (using a 5x5 matrix), and plan responses: Avoid (eliminate), Transfer (insure/outsource), Mitigate (reduce probability/impact), or Accept (contingency plan). Continuously monitor and update the risk register throughout the lifecycle.";
  } else if (lowerTitle.includes("reliability") || lowerTitle.includes("availability") || lowerTitle.includes("maintainability") || lowerTitle.includes("rams") || lowerTitle.includes("safety")) {
    deepDive += " RAMS (Reliability, Availability, Maintainability, Safety) are critical quality attributes for mission‑critical systems. Reliability uses probabilistic models (MTBF, failure rates). Availability depends on reliability and maintainability (MTTR). Safety involves hazard analysis (e.g., FMEA, Fault Tree Analysis) and defining safety integrity levels. These attributes must be allocated down to the component level and verified through testing and analysis.";
  } else if (lowerTitle.includes("lifecycle") || lowerTitle.includes("v-model") || lowerTitle.includes("waterfall") || lowerTitle.includes("agile")) {
    deepDive += " The system lifecycle provides the framework for managing complexity. Understand the typical stages: Concept, Development, Production, Utilization, and Retirement. The V‑Model is a classic representation that ties system decomposition (left side) to integration and verification (right side). Agile systems engineering applies iterative development to complex systems, focusing on continuous stakeholder feedback and incremental delivery of capabilities.";
  } else if (lowerTitle.includes("hsi") || lowerTitle.includes("human") || lowerTitle.includes("ergonomic") || lowerTitle.includes("manpower")) {
    deepDive += " Human Systems Integration ensures that human capabilities and limitations are considered throughout design. This covers ergonomics (physical interaction), manpower (number of personnel), personnel (skills and training), human factors engineering (workload, situation awareness), and health hazards. Early HSI analysis prevents costly redesigns and increases system effectiveness.";
  } else if (lowerTitle.includes("configuration") || lowerTitle.includes("baseline") || lowerTitle.includes("change")) {
    deepDive += " Configuration Management maintains the integrity of system artifacts over time. Establish baselines (functional, allocated, product) at key milestones. Control changes through a formal review board (CCB) and impact analysis. Maintain version control for all documents, models, and code. Without strong CM, you lose traceability and the ability to reproduce system versions.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core SE principle in one sentence.\n2. Map it to a specific stage of the system lifecycle.\n3. Identify the key inputs, outputs, and stakeholders.\n4. Describe a real‑world scenario where this practice saved a project.\n5. Practice with a case study (e.g., aerospace, automotive, defense).\n\n### Interview‑ready checklist\n- Explain the concept without using memorised jargon.\n- Describe the trade‑offs and risks if this practice is neglected.\n- Give a concrete example of how you would apply it on a project.\n- State how you would measure success (KPIs, metrics).\n- Explain how you would sell this practice to non‑engineering stakeholders.\n\n### Practice task\nCreate a small case study for **${title}** inside the **${module.title}** module of the **${path.name}** path. Outline a scenario, the approach you would take, the expected deliverables, and the validation method you would use.`;
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

async function seedSystemEngineeringCategory() {
  const seCategory: CategorySeed = {
    name: "Systems Engineering",
    slug: "systems-engineering",
    description: "Master Systems Engineering from foundational principles to advanced MBSE, V&V, RAMS, and digital transformation. Covers the entire system lifecycle and interdisciplinary integration.",
    icon: "SE",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Foundations of systems thinking, lifecycle models, and requirements engineering.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations of Systems Engineering",
            slug: "se-foundations",
            description: "What is SE, systems thinking, and the standard lifecycle.",
            topics: [
              {
                title: "What is Systems Engineering? – An Interdisciplinary Approach",
                slug: "intro-se",
                description: "Definition, history, and the holistic nature of SE.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition of SE", content: "Systems Engineering is an interdisciplinary field that focuses on how to design, integrate, and manage complex systems over their entire lifecycles. It ensures all stakeholder needs are addressed and that the system performs its intended function effectively." },
                  { title: "History and Evolution", content: "Originated in the 1950s with large defence and space projects (e.g., Apollo program). It has since expanded to aerospace, automotive, healthcare, and software." },
                  { title: "Why SE?", content: "Complex systems involve many subsystems and stakeholders. SE provides a structured approach to handle complexity, reduce risk, and avoid costly late‑stage changes." },
                ],
              },
              {
                title: "Systems Thinking – Seeing the Big Picture",
                slug: "systems-thinking",
                description: "Emergence, interconnections, and feedback loops.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Holism vs Reductionism", content: "Systems thinking emphasizes that a system's behaviour emerges from the interactions of its components, not just the components themselves. You cannot understand a system by studying its parts in isolation." },
                  { title: "Key Concepts", content: "Emergence (properties that appear only at higher levels), interconnections (relationships between components), and feedback loops (positive/negative reinforcement)." },
                  { title: "Application to SE", content: "When designing a system, constantly consider how changes in one subsystem affect others and the overall system goals." },
                ],
              },
              {
                title: "The System Lifecycle – From Concept to Retirement",
                slug: "lifecycle",
                description: "Stages: concept, development, production, utilization, and retirement.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Lifecycle Stages (ISO/IEC 15288)", content: "**Concept** – identify stakeholder needs and feasibility. **Development** – design and build the system. **Production** – manufacture and deploy. **Utilization** – operate and maintain. **Retirement** – dispose or repurpose." },
                  { title: "Decision Gates", content: "Milestones where progress is reviewed and funding is approved. Example: System Requirements Review (SRR), Preliminary Design Review (PDR), Critical Design Review (CDR)." },
                  { title: "The V‑Model", content: "A graphical representation where the left side shows decomposition (requirements → system design → component design) and the right side shows integration and verification (component test → integration test → system verification → validation)." },
                ],
              },
              {
                title: "Key SE Standards – ISO/IEC 15288 and EIA‑632",
                slug: "se-standards",
                description: "Overview of the main standards guiding SE processes.",
                estimatedMinutes: 18,
                sections: [
                  { title: "ISO/IEC 15288", content: "Establishes a common framework for the lifecycle. Defines processes in four categories: Agreement, Enterprise, Project, and Technical." },
                  { title: "EIA‑632", content: "US standard for engineering a system. Focuses on the technical processes: stakeholder requirements, system requirements, architecture, design, implementation, and verification." },
                ],
              },
            ],
          },
          {
            title: "Requirements Engineering Basics",
            slug: "req-engineering",
            description: "Eliciting, documenting, and managing requirements.",
            topics: [
              {
                title: "Types of Requirements – Functional, Non‑Functional, and Constraints",
                slug: "req-types",
                description: "Differentiating requirement categories.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Functional Requirements", content: "Describe what the system must do (e.g., 'The system shall authenticate users using multi‑factor authentication')." },
                  { title: "Non‑Functional Requirements", content: "Describe quality attributes: performance ('response time < 200ms'), reliability ('uptime > 99.9%'), security, usability." },
                  { title: "Constraints", content: "Boundary conditions, such as budget, regulatory compliance ('must comply with GDPR'), or reuse of existing components." },
                ],
              },
              {
                title: "Elicitation Techniques – How to Gather Requirements",
                slug: "elicitation",
                description: "Interviews, workshops, observation, and prototyping.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Stakeholder Identification", content: "Identify all parties with an interest: end‑users, operators, maintainers, regulators, buyers, and developers." },
                  { title: "Common Techniques", content: "**Interviews** (structured/unstructured), **Workshops/JAD** (group consensus), **Observation** (see how users actually work), **Prototyping** (discover needs via trial), and **Document Analysis** (existing systems)." },
                ],
              },
              {
                title: "Writing Good Requirements – SMART and Verifiable",
                slug: "writing-reqs",
                description: "Principles of clear, testable requirements.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SMART Criteria", content: "**S**pecific – unambiguous. **M**easurable – quantifiable. **A**chievable – realistic. **R**elevant – aligns with goals. **T**ime‑bound – has a deadline or priority." },
                  { title: "Verifiability", content: "Every requirement must be verifiable by inspection, analysis, demonstration, or test. If you cannot test it, it is not a good requirement." },
                  { title: "Common Pitfalls", content: "Vague language ('user‑friendly', 'robust'), mixing requirements with design, and including unnecessary implementation details." },
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
        description: "System architecture, interface management, V&V, integration, and risk management.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "System Architecture and Design",
            slug: "architecture-design",
            description: "Functional and physical architecture, interfaces, and trade‑off analysis.",
            topics: [
              {
                title: "Functional vs Physical Architecture – What vs How",
                slug: "func-phys-arch",
                description: "Distinguishing system behavior from its physical implementation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Functional Architecture", content: "Describes the system's logical functions and data flows, independent of technology. Uses block diagrams and data flow diagrams (DFDs)." },
                  { title: "Physical Architecture", content: "Describes how functions are allocated to physical components (hardware, software, people). Uses component diagrams and allocation matrices." },
                  { title: "Mapping Between Them", content: "Use a functional‑to‑physical allocation matrix to ensure every function is assigned to a physical component and vice versa." },
                ],
              },
              {
                title: "Interface Management – The Art of Integration",
                slug: "interface-mgmt",
                description: "ICDs, N² diagrams, and interface compatibility.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why Interfaces Matter", content: "Most integration failures occur at interfaces. An interface is the boundary where two subsystems exchange energy, material, or data." },
                  { title: "Interface Control Document (ICD)", content: "A formal document defining the physical (connectors, signals), functional (protocols, messages), and environmental (temp, vibration) characteristics of each interface." },
                  { title: "N² (N‑squared) Diagrams", content: "A matrix showing interfaces between system elements. The diagonal holds the elements, and off‑diagonal cells describe the interface characteristics." },
                ],
              },
              {
                title: "Trade‑off Analysis – Making Informed Decisions",
                slug: "tradeoff",
                description: "Pugh matrix, weighted decision matrix, and cost‑benefit.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Identifying Alternatives", content: "Generate multiple architectural or design alternatives based on different technologies or allocation strategies." },
                  { title: "Weighted Decision Matrix", content: "List criteria (cost, performance, reliability), assign weights, score each alternative, and calculate a weighted total. This makes the trade‑off transparent." },
                  { title: "Pugh Matrix", content: "Compare alternatives against a baseline. Mark each as better (+), worse (−), or same (S). Sum the scores to identify the preferred option." },
                ],
              },
            ],
          },
          {
            title: "Verification and Validation (V&V)",
            slug: "vandv",
            description: "Proving compliance and satisfying stakeholder needs.",
            topics: [
              {
                title: "Verification vs Validation – The Fundamental Distinction",
                slug: "verif-vs-valid",
                description: "Building the system right vs building the right system.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Verification", content: "Confirms that the product meets its specified requirements. Answer: 'Did we build it correctly?'" },
                  { title: "Validation", content: "Confirms that the product fulfills its intended use in the operational environment. Answer: 'Did we build the right thing?'" },
                  { title: "V‑Model Alignment", content: "Verification activities align with the left (design) side, while validation aligns with the right (integration) side and the final operational test." },
                ],
              },
              {
                title: "Verification Methods – IADT (Inspection, Analysis, Demonstration, Test)",
                slug: "verif-methods",
                description: "The four primary verification methods.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Inspection", content: "Visual examination of documents, drawings, or physical parts (e.g., code reviews, safety inspections)." },
                  { title: "Analysis", content: "Use calculations, simulations, or modeling to verify performance (e.g., thermal analysis, stress analysis)." },
                  { title: "Demonstration", content: "Show that the system can perform a function in a controlled environment (e.g., boot sequence, basic operation)." },
                  { title: "Test", content: "Formally exercise the system with specified inputs and compare results to expected outputs (e.g., acceptance tests, flight tests)." },
                ],
              },
              {
                title: "Traceability Matrix – Linking Requirements to Verification",
                slug: "traceability",
                description: "Building and using a Requirements Traceability Matrix (RTM).",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is RTM?", content: "A document that links requirements to design, development, and verification artifacts. Ensures no requirement is overlooked and no test is created without a requirement." },
                  { title: "Bidirectional Traceability", content: "Forward: requirement → design → verification. Backward: verification → requirement. This enables impact analysis when requirements change." },
                  { title: "Tools", content: "Often managed in specialized tools like DOORS, JIRA (with add‑ons), or even Excel for smaller projects." },
                ],
              },
            ],
          },
          {
            title: "Integration, Test, and Risk Management",
            slug: "integration-test",
            description: "Strategies for assembling and testing the system while managing risks.",
            topics: [
              {
                title: "Integration Strategies – Incremental vs Big Bang",
                slug: "integration-strategies",
                description: "Top‑down, bottom‑up, and sandwich integration.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Big Bang Integration", content: "Assemble all components at once and test. High risk—if a problem occurs, it is hard to localize. Rarely used." },
                  { title: "Top‑Down Integration", content: "Start with the top‑level modules and add lower‑level stubs. Early validation of core interfaces. Good for UI‑driven systems." },
                  { title: "Bottom‑Up Integration", content: "Start with low‑level components and test upward using drivers. Good when low‑level modules are stable." },
                  { title: "Sandwich Integration", content: "Combine top‑down and bottom‑up simultaneously. Reduces integration time but requires more coordination." },
                ],
              },
              {
                title: "Risk Management – Identifying and Mitigating Technical Risks",
                slug: "risk-mgmt",
                description: "Risk identification, analysis, and mitigation planning.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Risk Management Process", content: "**Identify** (brainstorm risks), **Analyze** (assess probability & impact), **Plan** (define responses), **Monitor** (track and update)." },
                  { title: "Risk Matrix (5x5)", content: "Plot probability (Very Low → Very High) vs Impact (Very Low → Very High). Risks in the high/high zone require immediate action." },
                  { title: "Risk Handling Strategies", content: "**Avoid** – eliminate the cause. **Transfer** – insurance/outsource. **Mitigate** – reduce probability or impact. **Accept** – monitor and have a contingency plan." },
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
        description: "MBSE, SysML, RAMS, HSI, Agile SE, and digital twins.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Model‑Based Systems Engineering (MBSE)",
            slug: "mbse",
            description: "Transitioning from documents to models, SysML, and MBSE frameworks.",
            topics: [
              {
                title: "MBSE – The Shift from Documents to Models",
                slug: "intro-mbse",
                description: "Why MBSE is transforming systems engineering.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is MBSE?", content: "MBSE uses formalized models as the primary means of information exchange among stakeholders. The model becomes the single source of truth for requirements, architecture, design, and analysis." },
                  { title: "Benefits", content: "Consistency (no conflicting documents), traceability (requirements linked to design and V&V), early simulation, automated document generation, and improved communication." },
                  { title: "Adoption Challenges", content: "High learning curve, tool cost, cultural resistance, and the need for robust modeling standards." },
                ],
              },
              {
                title: "SysML – The Standard Modeling Language",
                slug: "sysml",
                description: "The nine SysML diagram types and their use.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Structure Diagrams", content: "**Block Definition Diagram (BDD)** – hierarchy of system blocks. **Internal Block Diagram (IBD)** – internal parts and their connections (ports, interfaces)." },
                  { title: "Behavior Diagrams", content: "**Activity Diagram** – flow of control/data. **Sequence Diagram** – temporal interactions. **State Machine Diagram** – states and transitions." },
                  { title: "Requirements & Parametrics", content: "**Requirement Diagram** – capture requirements and relationships. **Parametric Diagram** – constraints for performance, mass, power, etc." },
                  { title: "Allocation Tables", content: "Used to map functions to components, and requirements to design elements." },
                ],
              },
              {
                title: "MBSE Frameworks and Tools",
                slug: "mbse-tools",
                description: "MagicDraw, Cameo, Rhapsody, and OOSEM/Harmony.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Popular Tools", content: "**MagicDraw/Cameo** – leading commercial tool. **IBM Rhapsody** – another major platform. **Capella** – open‑source, based on Arcadia. **Sparx EA** – more affordable." },
                  { title: "Frameworks/Methods", content: "**OOSEM** (Object‑Oriented Systems Engineering Method) – integrates with SysML. **Harmony** – IBM's method, includes an agile process." },
                ],
              },
            ],
          },
          {
            title: "RAMS and Human Systems Integration (HSI)",
            slug: "rams-hsi",
            description: "Reliability, availability, maintainability, safety, and human factors.",
            topics: [
              {
                title: "Reliability, Availability, Maintainability, and Safety (RAMS)",
                slug: "rams",
                description: "Probabilistic analysis of system performance and safety.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Reliability", content: "The probability that a system performs its required function under stated conditions for a specified period. Measured by MTBF (Mean Time Between Failures) and failure rate." },
                  { title: "Availability", content: "The percentage of time the system is operational. A = MTBF / (MTBF + MTTR). It depends on both reliability and maintainability." },
                  { title: "Maintainability", content: "The ease and speed with which a system can be restored to operation. Measured by MTTR (Mean Time To Repair)." },
                  { title: "Safety", content: "Absence of catastrophic risk. Uses hazard analysis, FMEA (Failure Mode Effects Analysis), and Fault Tree Analysis (FTA) to identify and mitigate hazards." },
                ],
              },
              {
                title: "Human Systems Integration (HSI)",
                slug: "hsi",
                description: "Ergonomics, manpower, personnel, and human factors.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Domains of HSI", content: "**Ergonomics** – physical design (displays, controls). **Manpower** – number of personnel required. **Personnel** – skills and training. **Human Factors** – cognitive workload, situation awareness." },
                  { title: "Why HSI Matters", content: "Poor HSI leads to human error, accidents, and low productivity. Approximately 70% of system failures are attributed to human error." },
                  { title: "Integration with Engineering", content: "HSI must be integrated from the concept stage. Use task analysis and user‑centered design to inform system requirements." },
                ],
              },
            ],
          },
          {
            title: "Agile SE, System of Systems, and Digital Transformation",
            slug: "agile-sos-digital",
            description: "Modern approaches to complex, evolving systems.",
            topics: [
              {
                title: "Agile Systems Engineering",
                slug: "agile-se",
                description: "Applying agile principles to system development.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Agile Principles", content: "Focus on incremental delivery, continuous stakeholder feedback, and cross‑functional teams." },
                  { title: "Agile in the V‑Model", content: "Run multiple V‑model iterations (mini‑cycles) to deliver capabilities incrementally. Each increment goes through requirements, design, build, and test." },
                  { title: "Challenges", content: "Hardware and physical systems have longer lead times. Adapt by using rapid prototyping, modular design, and early integration." },
                ],
              },
              {
                title: "System of Systems (SoS) – The Ultimate Complexity",
                slug: "sos",
                description: "When the system is a collection of independent systems.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition", content: "A System of Systems is a set of independent systems that collaborate to achieve a common goal. Each constituent system has its own management, lifecycle, and purpose." },
                  { title: "Types of SoS", content: "**Directed** – centrally managed. **Collaborative** – voluntary agreements. **Virtual** – no central authority, emergent behavior." },
                  { title: "Engineering SoS", content: "Focus on interfaces, interoperability, data sharing, and governance. Use of standards and middleware is critical." },
                ],
              },
              {
                title: "Digital Twin and Digital Thread",
                slug: "digital-twin",
                description: "Virtual representations across the lifecycle.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Digital Twin", content: "A virtual replica of a physical system that is updated with real‑time data. Used for simulation, monitoring, and predictive maintenance." },
                  { title: "Digital Thread", content: "The flow of data across the lifecycle, connecting models, simulations, and physical test data. It provides an end‑to‑end traceability chain." },
                  { title: "Benefits", content: "Enables 'what‑if' analysis, reduces physical testing costs, and allows for continuous improvement based on operational data." },
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
        description: "Common systems engineering questions, case studies, and technical scenarios.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Technical Concepts",
            slug: "core-se-interview",
            description: "Foundational questions on requirements, V&V, and design.",
            topics: [
              {
                title: "The Requirements Crisis – How to Handle Changing Requirements",
                slug: "req-change-interview",
                description: "Dealing with scope creep and evolving stakeholder needs.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Scenario", content: "Your customer requests a major new feature halfway through development. How do you handle it?" },
                  { title: "Process", content: "1. Perform impact analysis (cost, schedule, risk). 2. Submit a formal change request to the CCB. 3. Negotiate scope vs time/cost trade‑offs. 4. Update the requirements baseline and traceability matrix." },
                  { title: "Interview Tip", content: "Emphasize that you welcome change but manage it with a structured process—never bypass the formal change control." },
                ],
              },
              {
                title: "V&V Case Study – Testing a Flight Control System",
                slug: "vandv-case",
                description: "How would you verify and validate a safety‑critical system?",
                estimatedMinutes: 24,
                sections: [
                  { title: "Context", content: "A flight control system for a UAV. Describe your V&V plan." },
                  { title: "Verification Plan", content: "Inspection (code standards), Analysis (stability simulations), Demonstration (test bench), Test (hardware‑in‑the‑loop, flight tests)." },
                  { title: "Validation Plan", content: "Stakeholder demonstrations, operational scenario testing (takeoff, landing, emergency procedures)." },
                  { title: "Key Insight", content: "Prioritise tests based on criticality. Show a traceability matrix linking each requirement to its verification/validation method." },
                ],
              },
            ],
          },
          {
            title: "Advanced Concepts and Case Studies",
            slug: "advanced-se-interview",
            description: "MBSE, RAMS, and architecting questions.",
            topics: [
              {
                title: "MBSE – Convincing Leadership to Adopt It",
                slug: "mbse-adoption",
                description: "How would you pitch MBSE to your management?",
                estimatedMinutes: 22,
                sections: [
                  { title: "Your Pitch", content: "Focus on ROI: MBSE reduces rework by 30‑50%, improves communication, enables early simulation, and provides automated documentation. It also makes it easier to handle requirements changes." },
                  { title: "Implementation Roadmap", content: "Start with a pilot project, select a standard framework (e.g., OOSEM), provide extensive training, and choose a tool that integrates with existing tools." },
                ],
              },
              {
                title: "Trade‑off Analysis – Designing a Satellite Communication Link",
                slug: "tradeoff-case",
                description: "Make a design decision using a weighted matrix.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Scenario", content: "You must choose between three antenna designs for a communication satellite. Criteria: Gain, Weight, Power, Cost, Reliability." },
                  { title: "Approach", content: "Assign weights based on mission priorities (e.g., Gain and Reliability are critical). Score each option. Discuss the rationale and sensitivity analysis." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(seCategory);
  console.log("✅ Systems Engineering category seeded (ultra‑detailed)");
}

async function main() {
  await seedSystemEngineeringCategory();
}

main()
  .catch((error) => {
    console.error("Systems Engineering seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });