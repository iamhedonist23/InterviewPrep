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

const categorySeed: CategorySeed = {
  name: "Prompt Engineering",
  slug: "prompt-engineering",
  description: "A learning path for designing, testing, securing, and operating reliable prompts and LLM-powered workflows.",
  icon: "sparkles",
  sortOrder: 50,
  paths: [
    {
      name: "Beginner",
      slug: "prompt-engineering-beginner",
      description: "Build a strong foundation in prompt structure, task specification, decoding, and core prompting patterns.",
      level: StudyLevel.BEGINNER,
      modules: [
        {
          title: "Prompt Foundations and Model Behavior",
          slug: "prompt-engineering-beginner",
          description: "Build a strong foundation in prompt structure, task specification, decoding, and core prompting patterns.",
          topics: [
            {
              title: "Rise of In-Context Learning",
              slug: "rise-of-in-context-learning",
              description: "In-context learning lets a model adapt its behavior from instructions or demonstrations placed in the current request. The model is not permanently retrained; demonstrations provide temporary task evidence.",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Rise of In-Context Learning is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "In-context learning lets a model adapt its behavior from instructions or demonstrations placed in the current request. The model is not permanently retrained; the examples act as temporary evidence about the task, labels, style, and output pattern. Zero-shot gives only the task, one-shot adds one demonstration, and few-shot adds several. The key engineering question is whether the examples are correct, representative, and close enough to the new inputs to establish the intended boundary. More examples can also increase context usage and latency, so quality matters more than raw quantity.\n\nThe important mental model is that the model is conditioning its next-token predictions on the complete context it receives. A demonstration therefore acts less like permanent training and more like a temporary specification of the task. Good demonstrations reduce uncertainty about labels, boundaries, tone, and formatting. Poor demonstrations can do the opposite: one inconsistent example can introduce a pattern that competes with the intended instruction. When designing few-shot prompts, inspect examples as if they were a tiny training dataset: keep the labels correct, use representative cases, include boundary cases when useful, and keep the examples close to the target distribution.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use in classification, extraction, formatting, and domain-specific language tasks where demonstrations can clarify behavior without changing model weights.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Rise of In-Context Learning in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Rise of In-Context Learning, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Rise of In-Context Learning when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Rise of In-Context Learning is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "What Are Prompts?",
              slug: "what-are-prompts",
              description: "A prompt is the task specification supplied to a language model. It can combine an instruction, useful context, the material to process, examples, constrai",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "What Are Prompts? is best understood as a task specification with explicit success criteria. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on ambiguity, conflicting requirements, maintainability, and evaluation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A prompt is the task specification supplied to a language model. It can combine an instruction, useful context, the material to process, examples, constraints, and an output contract. Good prompt engineering is therefore closer to interface design than clever wording: every important requirement should be explicit enough that another engineer could understand what behavior is expected. The prompt should be complete enough to remove ambiguity without becoming overloaded with irrelevant information.\n\nA prompt is best treated as an interface between application intent and model behavior. The instruction describes the operation, context establishes meaning, input supplies the material to process, and output requirements define what the application can safely consume. These pieces can be separated with headings or delimiters so that changing one part does not accidentally change another. The goal is not maximum prompt length. The goal is to remove the specific ambiguities that cause incorrect interpretation, unexpected formatting, or unsupported assumptions.",
  },
  {
    title: "Worked example",
    content: "Consider turning a vague incident request into a measurable task. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use prompts as reusable application components for extraction, classification, summarization, generation, and tool orchestration.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that prompt engineering is interface design between application intent and model behavior. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain What Are Prompts? in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For What Are Prompts?, pay particular attention to ambiguity, conflicting requirements, maintainability, and evaluation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use What Are Prompts? when the task genuinely benefits from prompt design and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production turning a vague incident request into a measurable task workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that What Are Prompts? is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Instructions",
              slug: "instructions",
              description: "Instructions tell the model what operation to perform. A strong instruction uses an observable verb such as extract, classify, summarize, compare, transfor",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Instructions is best understood as a task specification with explicit success criteria. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on ambiguity, conflicting requirements, maintainability, and evaluation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Instructions tell the model what operation to perform. A strong instruction uses an observable verb such as extract, classify, summarize, compare, transform, or validate and states the scope of the task. Avoid relying on vague verbs such as “handle” or “analyze” when the desired operation can be stated precisely.\n\nA useful instruction should answer three questions: what operation should be performed, on which information, and what level of completion is expected. For example, “summarize” can mean one sentence, a detailed report, or a list of decisions unless the scope is defined. Strong instructions also avoid competing requirements. If two instructions conflict, the model may choose one based on context rather than following a deterministic priority rule. In production, keep instructions stable and put changing user data in a clearly separated input region.",
  },
  {
    title: "Worked example",
    content: "Consider turning a vague incident request into a measurable task. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use precise task verbs as the first layer of nearly every production prompt.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that prompt engineering is interface design between application intent and model behavior. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Instructions in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Instructions, pay particular attention to ambiguity, conflicting requirements, maintainability, and evaluation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Instructions when the task genuinely benefits from prompt design and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production turning a vague incident request into a measurable task workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Instructions is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Context",
              slug: "context",
              description: "Context supplies background that changes how the input should be interpreted. Useful context includes business definitions, domain terminology, policy exce",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Context is best understood as trusted instructions separated from relevant input context. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on relevance, boundaries, provenance, and context-window cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Context supplies background that changes how the input should be interpreted. Useful context includes business definitions, domain terminology, policy excerpts, schemas, audience information, and constraints. Context should be relevant: unrelated material increases cognitive and token load without necessarily improving the answer.\n\nContext should be selected according to its effect on the decision the model must make. Domain definitions, policies, schemas, examples, and relevant retrieved passages can materially improve interpretation. Irrelevant context increases token usage and can make important information harder to notice. Context also needs provenance and trust boundaries: user text and retrieved documents should not automatically be treated as authoritative instructions. A reliable application distinguishes trusted policy from untrusted content and supplies only the relevant evidence needed for the task.",
  },
  {
    title: "Worked example",
    content: "Consider a document-analysis request. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use context to define domain meaning, not to compensate for missing authoritative data that should come from a retrieval system or tool.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that data can be model-visible without being authoritative. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Context in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Context, pay particular attention to relevance, boundaries, provenance, and context-window cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Context when the task genuinely benefits from prompt structure and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document-analysis request workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Context is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Input Data",
              slug: "input-data",
              description: "Input data is the material the model must transform or inspect. Keeping the actual data distinct from instructions makes the task easier to reason about an",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Input Data is best understood as trusted instructions separated from relevant input context. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on relevance, boundaries, provenance, and context-window cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Input data is the material the model must transform or inspect. Keeping the actual data distinct from instructions makes the task easier to reason about and reduces accidental interpretation of user content as trusted policy.\n\nInput data is the object of the model operation, not the policy controlling the operation. This distinction becomes especially important when input can contain text that looks like an instruction. Explicit boundaries such as XML-like tags, Markdown headings, or labeled fields make the separation easier to reason about. The application should also normalize or validate inputs before constructing the prompt when possible. This reduces accidental ambiguity and makes logging, evaluation, and debugging easier because engineers can see exactly what data reached the model.",
  },
  {
    title: "Worked example",
    content: "Consider a document-analysis request. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use clear input boundaries whenever user-supplied, retrieved, or third-party content enters a prompt.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that data can be model-visible without being authoritative. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Input Data in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Input Data, pay particular attention to relevance, boundaries, provenance, and context-window cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Input Data when the task genuinely benefits from prompt structure and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document-analysis request workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Input Data is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Output Indicator",
              slug: "output-indicator",
              description: "Output requirements define the shape and limits of the response. A useful output contract can specify fields, allowed labels, length, ordering, tone, or a ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Output Indicator is best understood as the schema consumed by the next application component. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on schema validity, semantic validation, missing values, and recovery and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Output requirements define the shape and limits of the response. A useful output contract can specify fields, allowed labels, length, ordering, tone, or a machine-readable schema. Structured output is especially valuable when downstream software needs to validate the response.\n\nAn output contract should be designed from the perspective of the consuming application. If another service needs a status and an identifier, returning a long paragraph creates unnecessary parsing risk. Define allowed values, required fields, optional fields, and formatting expectations. When the platform supports structured outputs or schemas, use them together with application-side validation rather than assuming the model will always comply. A strong contract also defines what should happen when the requested information is unavailable, such as returning null or an explicit “unknown” state.",
  },
  {
    title: "Worked example",
    content: "Consider JSON ticket extraction. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use explicit output contracts for APIs, workflow automation, extraction, and evaluation datasets.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that valid syntax is not the same as correct meaning. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Output Indicator in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Output Indicator, pay particular attention to schema validity, semantic validation, missing values, and recovery. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Output Indicator when the task genuinely benefits from output contract and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production JSON ticket extraction workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Output Indicator is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Why Prompt Engineering Matters",
              slug: "why-prompt-engineering-matters",
              description: "Prompt engineering matters because the same model can behave differently depending on how a task is specified. Carefully designed prompts help expose ambig",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Why Prompt Engineering Matters is best understood as a task specification with explicit success criteria. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on ambiguity, conflicting requirements, maintainability, and evaluation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Prompt engineering matters because the same model can behave differently depending on how a task is specified. Carefully designed prompts help expose ambiguity, establish expected behavior, and make application features such as classification, summarization, extraction, writing assistance, and tool use more controllable. In production, a prompt should be versioned, tested against representative cases, and monitored like other application logic.\n\nPrompt engineering matters because language models are highly sensitive to task framing, context, examples, and output requirements. The same underlying model can perform well on one formulation and poorly on another because the prompt changes what behavior is made salient. This makes prompting useful not only for generating answers but also for discovering failure modes. In software development, the practical consequence is that prompts should be versioned and evaluated. A prompt change is a behavior change, so it deserves regression tests just like a change to application logic.",
  },
  {
    title: "Worked example",
    content: "Consider turning a vague incident request into a measurable task. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use evaluation-driven prompt iteration instead of relying on a single successful demonstration.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that prompt engineering is interface design between application intent and model behavior. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Why Prompt Engineering Matters in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Why Prompt Engineering Matters, pay particular attention to ambiguity, conflicting requirements, maintainability, and evaluation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Why Prompt Engineering Matters when the task genuinely benefits from prompt design and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production turning a vague incident request into a measurable task workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Why Prompt Engineering Matters is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Decoding Parameters: Temperature and Top-p",
              slug: "decoding-parameters-temperature-and-top-p",
              description: "Decoding converts a model's probability distribution over possible next tokens into an actual sequence. Temperature changes the sharpness of the distributi",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Decoding Parameters: Temperature and Top-p is best understood as the token-selection strategy. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on variation, reproducibility, latency, and task quality and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Decoding converts a model's probability distribution over possible next tokens into an actual sequence. Temperature changes the sharpness of the distribution: lower settings usually make choices more concentrated, while higher settings allow more variation. Top-p, or nucleus sampling, restricts sampling to a dynamically selected group whose cumulative probability reaches a chosen threshold. These controls affect variability, not the underlying truth of an answer.\n\nDecoding happens after the model has produced probabilities for possible next tokens. Temperature changes how sharply those probabilities are distributed, while top-p limits the candidate pool to a probability mass chosen at each step. These settings affect variability, not the underlying knowledge of the model. A low-variance configuration can make extraction more repeatable, but it cannot repair missing context or factual errors. Conversely, more sampling diversity can be useful for ideation. The right setting is therefore determined by the task and the acceptable variability of the application.",
  },
  {
    title: "Worked example",
    content: "Consider controlled extraction versus creative ideation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Tune decoding according to the task and validate the resulting behavior empirically.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that decoding changes how likely continuations are selected; it does not add knowledge. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Decoding Parameters: Temperature and Top-p in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Decoding Parameters: Temperature and Top-p, pay particular attention to variation, reproducibility, latency, and task quality. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Decoding Parameters: Temperature and Top-p when the task genuinely benefits from decoding and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production controlled extraction versus creative ideation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Decoding Parameters: Temperature and Top-p is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Temperature",
              slug: "temperature",
              description: "Temperature changes how strongly the model favors high-probability token choices during sampling. Lower temperature generally reduces variation; higher tem",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Temperature is best understood as the token-selection strategy. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on variation, reproducibility, latency, and task quality and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Temperature changes how strongly the model favors high-probability token choices during sampling. Lower temperature generally reduces variation; higher temperature generally increases variation. It cannot add missing knowledge, correct faulty context, or guarantee factual accuracy.\n\nConceptually, temperature rescales the model’s token scores before sampling. Lower values make high-probability choices dominate more strongly; higher values make lower-probability alternatives more likely to participate. This does not mean high temperature creates new knowledge, nor that low temperature guarantees truth. It changes how the model chooses among plausible continuations. For production systems, evaluate temperature empirically using representative inputs because different tasks have different tolerance for variation. Structured extraction usually benefits from stability, while brainstorming can benefit from diversity.",
  },
  {
    title: "Worked example",
    content: "Consider controlled extraction versus creative ideation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use temperature as a generation-control parameter, not as a correctness switch.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that decoding changes how likely continuations are selected; it does not add knowledge. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Temperature in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Temperature, pay particular attention to variation, reproducibility, latency, and task quality. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Temperature when the task genuinely benefits from decoding and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production controlled extraction versus creative ideation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Temperature is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Top-p",
              slug: "top-p",
              description: "Top-p keeps the smallest set of candidate tokens whose cumulative probability reaches the selected threshold and samples from that set. A lower threshold u",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Top-p is best understood as the token-selection strategy. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on variation, reproducibility, latency, and task quality and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Top-p keeps the smallest set of candidate tokens whose cumulative probability reaches the selected threshold and samples from that set. A lower threshold usually narrows the candidate pool, while a higher threshold allows more alternatives. Temperature and top-p both influence sampling diversity, so changing many decoding controls simultaneously can make experiments harder to interpret.\n\nTop-p, or nucleus sampling, dynamically selects a set of candidate tokens whose cumulative probability reaches the chosen threshold. Unlike a fixed top-k list, the number of candidates can change from one generation step to another. A small threshold generally narrows the choices, while a larger threshold allows more alternatives. Top-p is therefore another way to control generation diversity. When tuning it, change one decoding parameter at a time and compare results on the same evaluation set so that improvements can be attributed to a specific configuration.",
  },
  {
    title: "Worked example",
    content: "Consider controlled extraction versus creative ideation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use controlled A/B tests to understand whether top-p actually improves the target task.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that decoding changes how likely continuations are selected; it does not add knowledge. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Top-p in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Top-p, pay particular attention to variation, reproducibility, latency, and task quality. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Top-p when the task genuinely benefits from decoding and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production controlled extraction versus creative ideation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Top-p is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
        {
          title: "Core Task Prompting",
          slug: "prompt-engineering-beginner",
          description: "Build a strong foundation in prompt structure, task specification, decoding, and core prompting patterns.",
          topics: [
            {
              title: "Choosing Decoding Settings",
              slug: "choosing-decoding-settings",
              description: "Choose decoding behavior from the task's tolerance for variation. Extraction, classification, and deterministic-looking transformations usually benefit fro",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Choosing Decoding Settings is best understood as the token-selection strategy. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on variation, reproducibility, latency, and task quality and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Choose decoding behavior from the task's tolerance for variation. Extraction, classification, and deterministic-looking transformations usually benefit from predictable generation, while ideation and creative writing may benefit from more diversity. Even highly deterministic decoding can produce incorrect answers because generation control does not verify facts.\n\nStart from the application requirement rather than from a favorite parameter value. If the same input should normally produce the same classification or extraction, favor controlled decoding and evaluate repeatability. If the task is brainstorming, alternative wording or ideas may be desirable. Also distinguish variability from correctness: reducing sampling randomness does not validate facts, permissions, calculations, or business rules. For important workflows, combine suitable decoding with retrieval, deterministic code, schemas, validators, and application controls instead of expecting decoding settings to provide reliability by themselves.",
  },
  {
    title: "Worked example",
    content: "Consider controlled extraction versus creative ideation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat decoding settings as part of the prompt/model configuration that should be versioned.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that decoding changes how likely continuations are selected; it does not add knowledge. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Choosing Decoding Settings in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Choosing Decoding Settings, pay particular attention to variation, reproducibility, latency, and task quality. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Choosing Decoding Settings when the task genuinely benefits from decoding and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production controlled extraction versus creative ideation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Choosing Decoding Settings is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Greedy and Beam-style Decoding",
              slug: "greedy-and-beam-style-decoding",
              description: "Greedy decoding repeatedly selects the locally most likely next token. Beam-style decoding keeps multiple candidate sequences and can be useful in some seq",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Greedy and Beam-style Decoding is best understood as the token-selection strategy. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on variation, reproducibility, latency, and task quality and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Greedy decoding repeatedly selects the locally most likely next token. Beam-style decoding keeps multiple candidate sequences and can be useful in some sequence-generation tasks. These methods favor predictability, but a locally likely sequence is not automatically the best response for open-ended dialogue or creative work.\n\nGreedy decoding chooses the locally most probable next token at every step. It is simple and predictable, but local choices do not necessarily produce the best complete sequence. Beam-style decoding keeps multiple partial candidates and compares them as generation proceeds, which can help some sequence-generation tasks. These approaches are different from sampling, where controlled randomness is introduced. The broader lesson is that decoding is an algorithmic choice: a generation strategy should match the objective, whether that objective is deterministic formatting, sequence scoring, translation-like generation, or creative variation.",
  },
  {
    title: "Worked example",
    content: "Consider controlled extraction versus creative ideation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Select the decoding strategy based on the application's objective, not because one algorithm is universally superior.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that decoding changes how likely continuations are selected; it does not add knowledge. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Greedy and Beam-style Decoding in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Greedy and Beam-style Decoding, pay particular attention to variation, reproducibility, latency, and task quality. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Greedy and Beam-style Decoding when the task genuinely benefits from decoding and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production controlled extraction versus creative ideation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Greedy and Beam-style Decoding is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Basic Prompt Design",
              slug: "basic-prompt-design",
              description: "A useful prompt makes the task, audience, context, constraints, input, and output behavior explicit. The goal is not maximum length; it is minimum ambiguit",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Basic Prompt Design is best understood as a task specification with explicit success criteria. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on ambiguity, conflicting requirements, maintainability, and evaluation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A useful prompt makes the task, audience, context, constraints, input, and output behavior explicit. The goal is not maximum length; it is minimum ambiguity. Start with the simplest prompt that could work, then add a requirement only when evaluation shows a real failure that the requirement can address.\n\nBasic prompt design is the process of converting a vague request into an executable task specification. Start with the outcome, identify the required context, isolate the input, and define the expected output. Then test the prompt with both ordinary and ambiguous cases. A useful prompt is usually shorter than a prompt that tries to describe every possible situation. Each sentence should earn its place by reducing uncertainty, defining a constraint, or supplying information that the model genuinely needs.",
  },
  {
    title: "Worked example",
    content: "Consider turning a vague incident request into a measurable task. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use iterative prompt design: define expected behavior, test failures, add targeted constraints, and retest.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that prompt engineering is interface design between application intent and model behavior. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Basic Prompt Design in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Basic Prompt Design, pay particular attention to ambiguity, conflicting requirements, maintainability, and evaluation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Basic Prompt Design when the task genuinely benefits from prompt design and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production turning a vague incident request into a measurable task workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Basic Prompt Design is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Specificity",
              slug: "specificity",
              description: "Specificity means stating exactly what operation and scope the model should perform. A precise task gives the model fewer plausible interpretations and mak",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Specificity is best understood as a task specification with explicit success criteria. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on ambiguity, conflicting requirements, maintainability, and evaluation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Specificity means stating exactly what operation and scope the model should perform. A precise task gives the model fewer plausible interpretations and makes results easier to evaluate.\n\nSpecificity reduces the number of reasonable interpretations available to the model. Instead of asking for “a summary,” specify audience, length, information to preserve, and format when those details matter. Specificity should be targeted rather than excessive: adding ten constraints that never affect the result only increases maintenance cost. A practical test is to give the prompt to another engineer and ask what output they would expect. If they can reasonably imagine several incompatible outputs, the prompt still contains unresolved ambiguity.",
  },
  {
    title: "Worked example",
    content: "Consider turning a vague incident request into a measurable task. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use specific verbs, entities, boundaries, and success criteria in operational prompts.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that prompt engineering is interface design between application intent and model behavior. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Specificity in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Specificity, pay particular attention to ambiguity, conflicting requirements, maintainability, and evaluation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Specificity when the task genuinely benefits from prompt design and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production turning a vague incident request into a measurable task workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Specificity is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Context",
              slug: "context",
              description: "Context should provide only information that materially affects the task. Useful context can define domain vocabulary, policy, audience, or assumptions. Ir",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Context is best understood as trusted instructions separated from relevant input context. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on relevance, boundaries, provenance, and context-window cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Context should provide only information that materially affects the task. Useful context can define domain vocabulary, policy, audience, or assumptions. Irrelevant context consumes space and can make important instructions harder to follow.\n\nContext should be selected according to its effect on the decision the model must make. Domain definitions, policies, schemas, examples, and relevant retrieved passages can materially improve interpretation. Irrelevant context increases token usage and can make important information harder to notice. Context also needs provenance and trust boundaries: user text and retrieved documents should not automatically be treated as authoritative instructions. A reliable application distinguishes trusted policy from untrusted content and supplies only the relevant evidence needed for the task.",
  },
  {
    title: "Worked example",
    content: "Consider a document-analysis request. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use retrieval or selective context construction to keep prompts focused.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that data can be model-visible without being authoritative. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Context in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Context, pay particular attention to relevance, boundaries, provenance, and context-window cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Context when the task genuinely benefits from prompt structure and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document-analysis request workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Context is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Constraints",
              slug: "constraints",
              description: "Constraints turn broad behavior into bounded behavior. Common constraints cover length, labels, allowed assumptions, required fields, tone, prohibited acti",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Constraints is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Constraints turn broad behavior into bounded behavior. Common constraints cover length, labels, allowed assumptions, required fields, tone, prohibited actions, and edge-case handling. Constraints are most useful when they are testable.\n\nConstraints turn a general generation task into a bounded one. They can define length, allowed labels, prohibited transformations, ordering, required fields, or conditions under which the model should abstain. Good constraints are observable: an evaluator or application should be able to determine whether they were satisfied. Avoid contradictory constraints such as demanding both exhaustive detail and a strict one-sentence limit. In production, enforce critical constraints in code whenever possible because a textual instruction is not a deterministic validator.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use constraints that downstream tests can verify rather than vague requests such as “be perfect.”",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Constraints in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Constraints, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Constraints when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Constraints is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Output Format",
              slug: "output-format",
              description: "The output format is the contract between the model and the rest of the application. JSON, XML, tables, or concise fields can make parsing and validation e",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Output Format is best understood as the schema consumed by the next application component. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on schema validity, semantic validation, missing values, and recovery and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "The output format is the contract between the model and the rest of the application. JSON, XML, tables, or concise fields can make parsing and validation easier, but the application should still validate the result rather than assuming compliance.\n\nOutput formatting is especially important when model responses enter a programmatic workflow. Define the shape before generating the prompt: identify required fields, data types, allowed values, and how missing information should be represented. JSON is useful for many integrations, but valid JSON alone does not guarantee semantic correctness. The application should parse and validate the result, reject malformed or unsafe values, and decide how to recover. The model should produce the data; the application should remain responsible for accepting or rejecting it.",
  },
  {
    title: "Worked example",
    content: "Consider JSON ticket extraction. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use schemas and validators when model output enters software workflows.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that valid syntax is not the same as correct meaning. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Output Format in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Output Format, pay particular attention to schema validity, semantic validation, missing values, and recovery. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Output Format when the task genuinely benefits from output contract and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production JSON ticket extraction workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Output Format is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Delimiters",
              slug: "delimiters",
              description: "Delimiters make the boundary between trusted instructions and untrusted content visible. They do not create a perfect security boundary, but they reduce am",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Delimiters is best understood as trusted instructions separated from relevant input context. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on relevance, boundaries, provenance, and context-window cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Delimiters make the boundary between trusted instructions and untrusted content visible. They do not create a perfect security boundary, but they reduce ambiguity and provide a clear convention for the model and application.\n\nDelimiters make prompt structure visually and semantically clearer by separating instructions from data. They are useful for long documents, retrieved passages, code, user messages, and multiple input fields. A delimiter does not magically create a security boundary, because a model can still interpret text inside it. Its value is clarity and reduced ambiguity. Use stable labels such as `<customer_message>` or `BEGIN_DOCUMENT` / `END_DOCUMENT`, and make the instruction explicit about how the delimited content should be treated.",
  },
  {
    title: "Worked example",
    content: "Consider a document-analysis request. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use delimiters together with application-level authorization, tool restrictions, and validation.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that data can be model-visible without being authoritative. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Delimiters in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Delimiters, pay particular attention to relevance, boundaries, provenance, and context-window cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Delimiters when the task genuinely benefits from prompt structure and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document-analysis request workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Delimiters is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Content Summarization",
              slug: "content-summarization",
              description: "Summarization compresses source material while preserving the information that matters for the intended audience. A good prompt defines audience, length, r",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Content Summarization is best understood as source material and a target summary contract. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on coverage, factual consistency, omissions, and audience fit and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Summarization compresses source material while preserving the information that matters for the intended audience. A good prompt defines audience, length, required facts, omissions, and whether interpretation is permitted. Evaluation should check factual consistency and critical-detail coverage, not only fluency.\n\nSummarization is a transformation task in which the model must decide what information to retain and what to compress. A prompt should specify the target audience and purpose because the right summary for an executive differs from the right summary for an engineer. It is also useful to distinguish factual preservation from stylistic rewriting. For high-stakes summaries, evaluate whether important facts, qualifiers, dates, numbers, and uncertainty were preserved. A fluent summary can still be misleading if it drops a critical qualification.",
  },
  {
    title: "Worked example",
    content: "Consider incident-summary generation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use summarization for reports, tickets, documents, meetings, and knowledge workflows, with source-grounding checks where accuracy matters.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that compression is a selective transformation, so omitted qualifiers can change meaning. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Content Summarization in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Content Summarization, pay particular attention to coverage, factual consistency, omissions, and audience fit. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Content Summarization when the task genuinely benefits from summarization and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production incident-summary generation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Content Summarization is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Extractive versus Abstractive Behavior",
              slug: "extractive-versus-abstractive-behavior",
              description: "Extractive summarization emphasizes selecting important source content, while abstractive summarization allows the model to restate ideas in new wording. A",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Extractive versus Abstractive Behavior is best understood as source material and a target summary contract. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on coverage, factual consistency, omissions, and audience fit and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Extractive summarization emphasizes selecting important source content, while abstractive summarization allows the model to restate ideas in new wording. Abstractive output can be clearer, but it can also introduce unsupported details if the prompt and evaluation do not control it.\n\nExtractive summarization emphasizes selecting or shortening information that is explicitly present in the source, while abstractive summarization allows the model to restate ideas in new wording. Abstraction can make a result clearer and more compact, but it also creates more opportunity for unsupported additions or altered meaning. The choice should therefore depend on risk. Legal, compliance, and evidence-heavy workflows may need stronger preservation and verification, while ordinary internal notes may tolerate more paraphrasing.",
  },
  {
    title: "Worked example",
    content: "Consider incident-summary generation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Choose the degree of rewriting according to the risk of factual drift.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that compression is a selective transformation, so omitted qualifiers can change meaning. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Extractive versus Abstractive Behavior in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Extractive versus Abstractive Behavior, pay particular attention to coverage, factual consistency, omissions, and audience fit. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Extractive versus Abstractive Behavior when the task genuinely benefits from summarization and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production incident-summary generation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Extractive versus Abstractive Behavior is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
      ],
    },
    {
      name: "Intermediate",
      slug: "prompt-engineering-intermediate",
      description: "Learn task-specific prompting, reasoning-oriented workflows, few-shot design, program assistance, and tool interaction.",
      level: StudyLevel.INTERMEDIATE,
      modules: [
        {
          title: "Advanced Reasoning and Few-shot Methods",
          slug: "prompt-engineering-intermediate",
          description: "Learn task-specific prompting, reasoning-oriented workflows, few-shot design, program assistance, and tool interaction.",
          topics: [
            {
              title: "Summary Evaluation",
              slug: "summary-evaluation",
              description: "A useful summary evaluation checks whether required facts are present, whether statements are supported, whether the length target is respected, and whethe",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Summary Evaluation is best understood as source material and a target summary contract. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on coverage, factual consistency, omissions, and audience fit and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A useful summary evaluation checks whether required facts are present, whether statements are supported, whether the length target is respected, and whether the result remains understandable. A simple rubric can score facts, completeness, concision, and clarity independently.\n\nSummary quality cannot be judged only by fluency. Useful evaluation dimensions include coverage of important facts, factual consistency with the source, omission of critical qualifiers, relevance to the requested audience, and adherence to length or format constraints. Create a small benchmark containing ordinary documents and difficult cases such as contradictory statements, numbers, dates, and negations. Compare prompt versions against the same benchmark. This converts “the new prompt feels better” into a repeatable engineering decision.",
  },
  {
    title: "Worked example",
    content: "Consider incident-summary generation. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use fixed evaluation sets so prompt changes can be compared rather than judged from one output.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that compression is a selective transformation, so omitted qualifiers can change meaning. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Summary Evaluation in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Summary Evaluation, pay particular attention to coverage, factual consistency, omissions, and audience fit. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Summary Evaluation when the task genuinely benefits from summarization and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production incident-summary generation workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Summary Evaluation is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Question Answering with Context",
              slug: "question-answering-with-context",
              description: "Context-grounded question answering gives the model evidence and instructs it to answer from that evidence. This reduces the chance that the model fills ga",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Question Answering with Context is best understood as trusted instructions separated from relevant input context. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on relevance, boundaries, provenance, and context-window cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Context-grounded question answering gives the model evidence and instructs it to answer from that evidence. This reduces the chance that the model fills gaps with unrelated knowledge. A strong design also defines what to do when the context does not contain the answer.\n\nContext-grounded question answering works by supplying the evidence needed to answer a question instead of expecting the model to rely only on internal knowledge. The prompt should clearly distinguish the question from the supplied context and state what to do when the context does not contain an answer. This is particularly important for business documentation, policies, and product information that can change over time. Retrieval quality is part of the system: a perfect prompt cannot recover evidence that the application failed to retrieve.",
  },
  {
    title: "Worked example",
    content: "Consider a document-analysis request. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use this pattern for internal knowledge bases, policy assistants, and document Q&A.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that data can be model-visible without being authoritative. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Question Answering with Context in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Question Answering with Context, pay particular attention to relevance, boundaries, provenance, and context-window cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Question Answering with Context when the task genuinely benefits from prompt structure and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document-analysis request workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Question Answering with Context is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Grounded Answering",
              slug: "grounded-answering",
              description: "Grounded answering means the response should be supported by supplied evidence. Useful controls include limiting the answer to context, identifying missing",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Grounded Answering is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Grounded answering means the response should be supported by supplied evidence. Useful controls include limiting the answer to context, identifying missing information, preserving field names, and returning uncertainty rather than inventing facts.\n\nGrounding means constraining an answer to information supplied by an approved source or tool. A useful prompt can instruct the model to answer only from the provided material and to indicate when the evidence is insufficient. However, wording alone does not prove that the response is grounded. Production systems should track the source passages used, validate important claims where practical, and distinguish retrieved evidence from model-generated explanation. Grounding is therefore a system design problem, not merely a sentence added to a prompt.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use retrieval for external knowledge and require evidence-aware behavior for high-value answers.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Grounded Answering in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Grounded Answering, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Grounded Answering when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Grounded Answering is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Handling Unknown Answers",
              slug: "handling-unknown-answers",
              description: "A model should have an explicit behavior for insufficient evidence. A fallback such as `UNKNOWN` or `Not specified` is often safer than forcing a plausible",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Handling Unknown Answers is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A model should have an explicit behavior for insufficient evidence. A fallback such as `UNKNOWN` or `Not specified` is often safer than forcing a plausible answer. The application can then decide whether to retrieve more information or ask the user for clarification.\n\nA reliable model workflow needs an explicit behavior for missing information. If the model is told to always answer, it may fill gaps with plausible-sounding content. An abstention instruction such as “return unknown when the supplied evidence is insufficient” gives the model a safer target, but the application should also validate whether the required evidence exists. Unknown handling is especially important when users may mistake fluent language for certainty. Good systems make uncertainty an expected state rather than treating it as an exceptional failure.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use explicit unknown handling in support, compliance, policy, and extraction workflows.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Handling Unknown Answers in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Handling Unknown Answers, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Handling Unknown Answers when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Handling Unknown Answers is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Content Classification",
              slug: "content-classification",
              description: "Classification maps text or other input to predefined categories. Reliable classification depends on clear label definitions, representative examples, and ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Content Classification is best understood as an input-to-label decision boundary. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on precision, recall, boundary cases, abstention, and schema validity and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Classification maps text or other input to predefined categories. Reliable classification depends on clear label definitions, representative examples, and an output contract. If labels overlap, explain the boundary or provide examples for ambiguous cases.\n\nClassification prompts map free-form input into a controlled set of categories. The most important design choice is the boundary between labels. Labels should describe distinct concepts, and the prompt should explain ambiguous cases when they are common. Returning one allowed label is easier to validate than returning an essay. For larger systems, collect representative examples for each class and include difficult cases near category boundaries. Measure precision, recall, confusion between labels, and abstention behavior rather than relying only on a few successful demonstrations.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket routing. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use classification for ticket routing, moderation triage, document tagging, and workflow branching.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the hard part is defining category boundaries, not merely naming labels. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Content Classification in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Content Classification, pay particular attention to precision, recall, boundary cases, abstention, and schema validity. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Content Classification when the task genuinely benefits from classification and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket routing workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Content Classification is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Why Label Definitions Matter",
              slug: "why-label-definitions-matter",
              description: "A label name alone may be ambiguous. Definitions explain what belongs in each category and reduce inconsistent interpretation. Boundary examples can be esp",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Why Label Definitions Matter is best understood as an input-to-label decision boundary. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on precision, recall, boundary cases, abstention, and schema validity and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A label name alone may be ambiguous. Definitions explain what belongs in each category and reduce inconsistent interpretation. Boundary examples can be especially valuable when two categories are close.\n\nLabels that sound similar can produce inconsistent classifications unless their meanings are operationally defined. A useful label definition explains what belongs in the category and, when necessary, what should be excluded. Boundary examples are often more valuable than obvious examples because they show how the categories differ. Treat label definitions as part of the product specification. If the business changes the meaning of a label, update the prompt, examples, evaluation set, and downstream logic together.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket routing. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat label definitions and examples as part of the task specification.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the hard part is defining category boundaries, not merely naming labels. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Why Label Definitions Matter in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Why Label Definitions Matter, pay particular attention to precision, recall, boundary cases, abstention, and schema validity. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Why Label Definitions Matter when the task genuinely benefits from classification and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket routing workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Why Label Definitions Matter is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Classification with JSON",
              slug: "classification-with-json",
              description: "Structured classification output can include a label and optional explanation or metadata. A generated confidence value should not automatically be treated",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Classification with JSON is best understood as an input-to-label decision boundary. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on precision, recall, boundary cases, abstention, and schema validity and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Structured classification output can include a label and optional explanation or metadata. A generated confidence value should not automatically be treated as a calibrated probability; if confidence controls decisions, calibration must be evaluated separately.\n\nJSON classification combines a semantic decision with a machine-readable contract. The prompt should define the allowed label values and the exact fields expected. The application should still parse the result and validate every field against the schema. For example, a model might return a valid JSON object with an invalid category; syntax validation alone would not catch that. Separating syntactic validation from semantic validation makes the workflow much more reliable.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket routing. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use JSON plus schema validation for automated routing.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the hard part is defining category boundaries, not merely naming labels. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Classification with JSON in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Classification with JSON, pay particular attention to precision, recall, boundary cases, abstention, and schema validity. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Classification with JSON when the task genuinely benefits from classification and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket routing workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Classification with JSON is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Few-shot Classification",
              slug: "few-shot-classification",
              description: "Few-shot classification provides demonstrations before the new input. Good demonstrations show correct labels, output shape, and difficult boundaries. They",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Few-shot Classification is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Few-shot classification provides demonstrations before the new input. Good demonstrations show correct labels, output shape, and difficult boundaries. They should be internally consistent and relevant to the expected traffic.\n\nFew-shot classification uses demonstrations to teach the model how the application wants categories applied. Example quality matters more than simply increasing the count. Examples should cover common patterns, meaningful variations, and ambiguous boundaries without contradicting one another. The examples also consume context, so a large collection can become expensive or dilute the signal. A good workflow treats demonstrations as a curated dataset: version them, review them, and evaluate the prompt when examples are added or removed.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use a small, carefully selected demonstration set and evaluate it as part of prompt testing.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Few-shot Classification in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Few-shot Classification, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Few-shot Classification when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Few-shot Classification is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Role-playing and Style Control",
              slug: "role-playing-and-style-control",
              description: "Role prompting gives the model a behavioral frame such as audience, priorities, vocabulary, or review criteria. A role should describe observable behavior ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Role-playing and Style Control is best understood as behavioral framing plus explicit output requirements. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on observable behavior, audience, tone, and avoiding fake authority and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Role prompting gives the model a behavioral frame such as audience, priorities, vocabulary, or review criteria. A role should describe observable behavior rather than relying on a title alone, and it does not prove that the model possesses real-world credentials or authority.\n\nRole instructions can influence vocabulary, tone, level of detail, and perspective. They are most useful when the role corresponds to a concrete output requirement, such as “write for a junior developer” or “act as a concise support editor.” A role should not be used as a substitute for factual context or authorization. For example, telling a model to act as an administrator does not grant administrator permissions. Style can be controlled through explicit constraints and examples, which are usually easier to test than a vague persona.",
  },
  {
    title: "Worked example",
    content: "Consider a production API review. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use role framing to control perspective and communication style, while keeping factual and authorization decisions outside the model.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that a role changes communication behavior; it does not grant credentials or real expertise. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Role-playing and Style Control in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Role-playing and Style Control, pay particular attention to observable behavior, audience, tone, and avoiding fake authority. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Role-playing and Style Control when the task genuinely benefits from role and style control and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a production API review workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Role-playing and Style Control is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Better Role Specification",
              slug: "better-role-specification",
              description: "A useful role specification states the perspective and concrete responsibilities expected from the model. “You are an expert” is weak because expertise is ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Better Role Specification is best understood as behavioral framing plus explicit output requirements. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on observable behavior, audience, tone, and avoiding fake authority and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A useful role specification states the perspective and concrete responsibilities expected from the model. “You are an expert” is weak because expertise is not operationalized.\n\nA stronger role specification focuses on observable behavior rather than a dramatic persona. Define the audience, domain, tone, and responsibilities that affect the output. For instance, “write as a senior API reviewer and identify correctness, security, and maintainability concerns” is more testable than simply “you are an expert engineer.” The role should remain subordinate to application controls and trusted instructions. It changes communication behavior; it does not create access to systems, hidden data, or privileged operations.",
  },
  {
    title: "Worked example",
    content: "Consider a production API review. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use role descriptions as behavioral constraints, not as a substitute for domain evidence.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that a role changes communication behavior; it does not grant credentials or real expertise. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Better Role Specification in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Better Role Specification, pay particular attention to observable behavior, audience, tone, and avoiding fake authority. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Better Role Specification when the task genuinely benefits from role and style control and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a production API review workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Better Role Specification is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Code Generation",
              slug: "code-generation",
              description: "Code generation works best when the prompt supplies language, framework/version, input and output behavior, constraints, edge cases, and testing requiremen",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Code Generation is best understood as a natural-language specification translated into executable code. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on correctness, security, compilation, tests, and sandboxing and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Code generation works best when the prompt supplies language, framework/version, input and output behavior, constraints, edge cases, and testing requirements. Generated code must still be reviewed and tested because a fluent response can contain incorrect logic, unsafe operations, or outdated APIs.\n\nCode generation is more reliable when the prompt defines the language, runtime, interfaces, constraints, and expected behavior. If the generated code will be executed, treat it as untrusted output until it passes compilation, tests, security checks, and any required static analysis. A useful prompt can request tests alongside implementation, but generated tests are not independent proof of correctness because both may contain the same mistaken assumption. The safest workflow uses the model to accelerate coding while deterministic tooling remains responsible for validation.",
  },
  {
    title: "Worked example",
    content: "Consider generating a small Java utility. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use generated code as a draft that passes through compilation, tests, static analysis, and security review.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model proposes code; deterministic tooling decides whether code is acceptable. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Code Generation in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Code Generation, pay particular attention to correctness, security, compilation, tests, and sandboxing. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Code Generation when the task genuinely benefits from code generation and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production generating a small Java utility workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Code Generation is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Database Query Generation",
              slug: "database-query-generation",
              description: "SQL generation becomes more reliable when the schema, relationships, SQL dialect, and desired result are explicit. Without a schema, the model may invent t",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Database Query Generation is best understood as natural language mapped to a constrained database operation. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on schema grounding, dialect correctness, permissions, and query validation and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "SQL generation becomes more reliable when the schema, relationships, SQL dialect, and desired result are explicit. Without a schema, the model may invent table or column names.\n\nNatural-language-to-SQL systems need schema context and strong execution controls. The model must know table names, columns, relationships, and relevant business meanings, but it should not receive unnecessary secrets or unrestricted database access. Generated SQL should be parsed or checked where feasible, limited to the intended operation type, and executed with least-privilege credentials. For read-only analytics, an application can often place the model behind a constrained query service rather than giving it direct access to the production database.",
  },
  {
    title: "Worked example",
    content: "Consider an analytics query over orders. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use schema-aware prompts and validate generated queries before execution.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that language generation must be separated from database authority and execution. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Database Query Generation in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Database Query Generation, pay particular attention to schema grounding, dialect correctness, permissions, and query validation. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Database Query Generation when the task genuinely benefits from text-to-SQL and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production an analytics query over orders workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Database Query Generation is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
        {
          title: "Tools, Agents and Prompt Optimization",
          slug: "prompt-engineering-intermediate",
          description: "Learn task-specific prompting, reasoning-oriented workflows, few-shot design, program assistance, and tool interaction.",
          topics: [
            {
              title: "Code Safety",
              slug: "code-safety",
              description: "Generated code should never be trusted simply because it was produced by a model. Execute untrusted generated code in a sandbox with resource limits and re",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Code Safety is best understood as a natural-language specification translated into executable code. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on correctness, security, compilation, tests, and sandboxing and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Generated code should never be trusted simply because it was produced by a model. Execute untrusted generated code in a sandbox with resource limits and restricted dependencies, and use static checks and tests before allowing it near sensitive systems.\n\nGenerated code can be syntactically valid and still be unsafe. Risks include destructive operations, insecure dependencies, command injection, exposed credentials, excessive permissions, and logic that silently mishandles edge cases. Prompt instructions can request safe patterns, but they are not a substitute for compiler checks, tests, linters, scanners, sandboxing, and human review where risk is high. The correct mental model is that generated code is an untrusted draft that moves through the same validation pipeline as other externally produced code.",
  },
  {
    title: "Worked example",
    content: "Consider generating a small Java utility. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Keep authorization, sandboxing, and resource controls in application infrastructure rather than the prompt.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model proposes code; deterministic tooling decides whether code is acceptable. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Code Safety in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Code Safety, pay particular attention to correctness, security, compilation, tests, and sandboxing. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Code Safety when the task genuinely benefits from code generation and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production generating a small Java utility workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Code Safety is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Reasoning-oriented Prompting",
              slug: "reasoning-oriented-prompting",
              description: "Some tasks benefit from asking the model to work through a structured process before giving a result. In production, it is usually better to request an obs",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Reasoning-oriented Prompting is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Some tasks benefit from asking the model to work through a structured process before giving a result. In production, it is usually better to request an observable verification summary or explicit intermediate artifacts than to depend on exposing private internal reasoning. Reasoning instructions also do not guarantee correctness.\n\nReasoning-oriented prompting is intended to improve performance on tasks that require multiple dependent steps, such as constraint solving, planning, or multi-stage analysis. The useful part is encouraging systematic processing rather than merely requesting a long explanation. In many applications, it is enough to ask for a concise result plus a verification summary or intermediate structured fields. The model should not be expected to expose hidden internal reasoning as a security or correctness guarantee. External checks remain valuable for calculations and high-impact decisions.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use structured reasoning prompts for multi-step planning, debugging, arithmetic, and constraint problems, then verify important results independently.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Reasoning-oriented Prompting in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Reasoning-oriented Prompting, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Reasoning-oriented Prompting when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Reasoning-oriented Prompting is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "When Reasoning-oriented Prompts Help",
              slug: "when-reasoning-oriented-prompts-help",
              description: "Reasoning-oriented prompting is useful when the task contains multiple constraints or transformations that are easy to miss in a one-step answer. The benef",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "When Reasoning-oriented Prompts Help is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Reasoning-oriented prompting is useful when the task contains multiple constraints or transformations that are easy to miss in a one-step answer. The benefit comes from structuring the task, not from making every prompt verbose.\n\nThese prompts are most useful when the task contains dependencies where an early mistake affects later steps. Examples include multi-condition classification, planning, structured comparison, and transformations with several constraints. They are less useful when the task is a simple lookup, short rewrite, or deterministic calculation that software can perform directly. Before adding elaborate reasoning instructions, compare a simple prompt against a reasoning-oriented version on an evaluation set. Extra prompt complexity should be justified by measurable improvement.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use decomposition when the task has genuine intermediate structure.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain When Reasoning-oriented Prompts Help in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For When Reasoning-oriented Prompts Help, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use When Reasoning-oriented Prompts Help when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that When Reasoning-oriented Prompts Help is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "When Reasoning-oriented Prompts Are Unnecessary",
              slug: "when-reasoning-oriented-prompts-are-unnecessary",
              description: "Simple tasks such as extracting an invoice number do not need elaborate reasoning instructions. Extra generation can increase latency, cost, and irrelevant",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "When Reasoning-oriented Prompts Are Unnecessary is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Simple tasks such as extracting an invoice number do not need elaborate reasoning instructions. Extra generation can increase latency, cost, and irrelevant output without improving the target behavior.\n\nNot every task benefits from additional reasoning instructions. Asking for elaborate reasoning on a simple extraction can increase output length, cost, and opportunities for irrelevant content without improving the answer. If a deterministic function can perform the task exactly, code is generally a better tool. Prompt design should therefore minimize unnecessary work: use the simplest method that meets the quality requirement, then add reasoning or external tools when evaluation shows they are needed.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Prefer the simplest prompt that reliably passes evaluation.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain When Reasoning-oriented Prompts Are Unnecessary in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For When Reasoning-oriented Prompts Are Unnecessary, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use When Reasoning-oriented Prompts Are Unnecessary when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that When Reasoning-oriented Prompts Are Unnecessary is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Few-shot Prompting",
              slug: "few-shot-prompting",
              description: "Few-shot prompting supplies multiple demonstrations before the new input. Demonstrations teach task interpretation, formatting, labels, and boundary behavi",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Few-shot Prompting is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Few-shot prompting supplies multiple demonstrations before the new input. Demonstrations teach task interpretation, formatting, labels, and boundary behavior. The examples are temporary context, so they must be selected and formatted carefully.\n\nFew-shot prompting is a form of in-context learning where several demonstrations define how a task should be performed. The examples can communicate subtle requirements that prose does not capture, such as formatting, label boundaries, or preferred transformations. Their influence depends on relevance and consistency. A strong few-shot prompt usually keeps the task instruction separate from the demonstrations and the new input. It also evaluates examples for accidental bias, contradictory labels, and unnecessary length before they are used in production.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use few-shot prompting when examples communicate a pattern more clearly than prose.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Few-shot Prompting in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Few-shot Prompting, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Few-shot Prompting when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Few-shot Prompting is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Example Selection",
              slug: "example-selection",
              description: "Good demonstrations are correct, representative, relevant, consistent, and diverse enough to show important boundaries. Selecting examples by similarity to",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Example Selection is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Good demonstrations are correct, representative, relevant, consistent, and diverse enough to show important boundaries. Selecting examples by similarity to the new task can be more useful than simply adding more examples.\n\nExample selection should reflect the inputs the system will actually receive. Start with representative cases, then deliberately add boundary cases where the model commonly confuses categories or formats. Examples should be internally consistent and should demonstrate the desired output rather than merely describe it. If context space is limited, a smaller set of high-information examples is often better than a large random collection. Revisit the examples when production traffic changes because the most useful demonstrations depend on the target distribution.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat demonstrations like a small labeled dataset and review them systematically.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Example Selection in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Example Selection, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Example Selection when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Example Selection is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Bad Examples",
              slug: "bad-examples",
              description: "Contradictory demonstrations create an unreliable task specification. A model cannot infer a stable rule when the same or equivalent input receives incompa",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Bad Examples is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Contradictory demonstrations create an unreliable task specification. A model cannot infer a stable rule when the same or equivalent input receives incompatible labels without an explanation.\n\nA bad demonstration can teach the model an incorrect label, an unwanted formatting pattern, or an exception that was never intended. Contradictory examples are especially harmful because they make the task specification internally inconsistent. Examples can also be too complex, causing the model to imitate irrelevant details. Review demonstrations as carefully as labeled training data: verify the input, expected output, edge-case interpretation, and consistency with the current business rules.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Audit few-shot examples for contradictions before deployment.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Bad Examples in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Bad Examples, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Bad Examples when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Bad Examples is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Number of Examples",
              slug: "number-of-examples",
              description: "More demonstrations are not automatically better. Context size, cost, latency, relevance, and diminishing returns all matter. A compact set of high-informa",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Number of Examples is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "More demonstrations are not automatically better. Context size, cost, latency, relevance, and diminishing returns all matter. A compact set of high-information examples can outperform a long list of loosely related ones.\n\nThere is no universal ideal number of demonstrations. More examples can improve coverage, but they consume context and may introduce redundancy or contradictions. The right quantity is an empirical trade-off between task accuracy, context cost, latency, and maintainability. A useful experiment is to compare zero-shot, one-shot, and several few-shot configurations on the same evaluation set. Keep the smallest example set that produces the required performance with acceptable stability.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Optimize for useful coverage rather than maximum example count.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Number of Examples in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Number of Examples, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Number of Examples when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Number of Examples is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Chain-of-Thought and Zero-shot Reasoning",
              slug: "chain-of-thought-and-zero-shot-reasoning",
              description: "The course presents chain-of-thought and zero-shot reasoning as approaches for encouraging multi-step problem solving. For practical applications, the safe",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Chain-of-Thought and Zero-shot Reasoning is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "The course presents chain-of-thought and zero-shot reasoning as approaches for encouraging multi-step problem solving. For practical applications, the safer engineering pattern is to request concise intermediate artifacts or verification summaries rather than relying on private internal reasoning. Correctness still requires independent checks for important tasks.\n\nZero-shot reasoning asks the model to solve a multi-step task without demonstrations, while chain-of-thought-oriented methods encourage intermediate reasoning behavior. The engineering objective is improved problem solving, not simply producing longer answers. For applications, it is often safer to request concise intermediate artifacts that can be checked, such as assumptions, selected options, or computed values, rather than treating a narrative explanation as proof. When the task can be verified by code, use the model for interpretation and the program for exact execution.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use reasoning prompts as one component of a broader validation strategy.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Chain-of-Thought and Zero-shot Reasoning in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Chain-of-Thought and Zero-shot Reasoning, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Chain-of-Thought and Zero-shot Reasoning when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Chain-of-Thought and Zero-shot Reasoning is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Self-Consistency",
              slug: "self-consistency",
              description: "Self-consistency generates multiple candidate solutions and selects an answer based on agreement among the results. It can reduce accidental instability on",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Self-Consistency is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Self-consistency generates multiple candidate solutions and selects an answer based on agreement among the results. It can reduce accidental instability on tasks with a meaningful correct answer, but it multiplies generation cost and latency.\n\nSelf-consistency uses multiple generated attempts and looks for agreement among their final answers. The intuition is that a difficult problem may produce several reasoning paths, and correct paths may converge more often than incorrect ones. This can improve robustness on some reasoning tasks, but it increases inference cost and does not guarantee correctness. It also works best when there is a meaningful way to compare candidate answers. For production use, define when extra sampling is worth the latency and expense.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use when the task has a clear agreement criterion and extra computation is acceptable.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Self-Consistency in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Self-Consistency, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Self-Consistency when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Self-Consistency is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Generated Knowledge Prompting",
              slug: "generated-knowledge-prompting",
              description: "Generated-knowledge prompting first asks the model to produce relevant background information and then uses that material while answering the original ques",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Generated Knowledge Prompting is best understood as a multi-step task decomposed into intermediate work and verification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on verification, cost, latency, and whether deterministic tools can check the result and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Generated-knowledge prompting first asks the model to produce relevant background information and then uses that material while answering the original question. It can help organize useful concepts, but generated knowledge is not automatically verified knowledge.\n\nGenerated-knowledge prompting asks the model to first produce relevant background information and then use that material for a downstream task. The separation can help organize a complex problem, but generated knowledge is still model output and may contain unsupported claims. It should not be confused with authoritative retrieval. When facts matter, replace or supplement generated knowledge with trusted documents, databases, or tools. The technique is most useful as a reasoning aid when the generated intermediate material can be evaluated or is low-risk.",
  },
  {
    title: "Worked example",
    content: "Consider a constrained scheduling problem. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use generated knowledge mainly as a reasoning aid, not as a substitute for trusted sources.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that structured intermediate artifacts can improve reliability without treating generated reasoning as proof. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Generated Knowledge Prompting in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Generated Knowledge Prompting, pay particular attention to verification, cost, latency, and whether deterministic tools can check the result. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Generated Knowledge Prompting when the task genuinely benefits from reasoning workflow and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a constrained scheduling problem workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Generated Knowledge Prompting is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
      ],
    },
    {
      name: "Advanced",
      slug: "prompt-engineering-advanced",
      description: "Learn advanced prompt optimization, security defenses, production evaluation, and layered LLM application design.",
      level: StudyLevel.ADVANCED,
      modules: [
        {
          title: "LLM Security and Defensive Design",
          slug: "prompt-engineering-advanced",
          description: "Learn advanced prompt optimization, security defenses, production evaluation, and layered LLM application design.",
          topics: [
            {
              title: "Program-aided Language Models (PAL)",
              slug: "program-aided-language-models-pal",
              description: "Program-aided language modeling has the model translate a problem into executable code and then lets a runtime perform deterministic operations. This separ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Program-aided Language Models (PAL) is best understood as a natural-language specification translated into executable code. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on correctness, security, compilation, tests, and sandboxing and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Program-aided language modeling has the model translate a problem into executable code and then lets a runtime perform deterministic operations. This separates language understanding from exact computation and is useful for arithmetic, transformations, and structured calculations.\n\nPAL separates language interpretation from exact computation by having the model express a problem as executable code and letting a runtime calculate the result. This is valuable for arithmetic, symbolic operations, data transformations, and other tasks where software is more reliable than free-form token generation. The generated program still requires validation: syntax, imports, resource usage, and input safety must be checked before execution. PAL is therefore a delegation pattern, not permission to execute arbitrary model-generated code without controls.",
  },
  {
    title: "Worked example",
    content: "Consider generating a small Java utility. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use sandboxed runtimes for deterministic work and validate generated programs before execution.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model proposes code; deterministic tooling decides whether code is acceptable. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Program-aided Language Models (PAL) in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Program-aided Language Models (PAL), pay particular attention to correctness, security, compilation, tests, and sandboxing. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Program-aided Language Models (PAL) when the task genuinely benefits from code generation and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production generating a small Java utility workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Program-aided Language Models (PAL) is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Suitable PAL Tasks",
              slug: "suitable-pal-tasks",
              description: "PAL is a good fit for deterministic operations such as arithmetic, date calculations, structured transformations, and rule-like data processing. It is less",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Suitable PAL Tasks is best understood as a natural-language specification translated into executable code. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on correctness, security, compilation, tests, and sandboxing and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "PAL is a good fit for deterministic operations such as arithmetic, date calculations, structured transformations, and rule-like data processing. It is less useful when the task is primarily subjective language generation.\n\nPAL is a good fit when the task has a clear computational procedure that can be expressed in a safe execution environment. Examples include numerical calculations, date arithmetic, filtering structured data, and deterministic transformations. It is less appropriate when the core problem is subjective judgment or when executing generated code would introduce unacceptable security risk. The strongest designs constrain the available operations, validate inputs, and keep the runtime isolated from sensitive systems.",
  },
  {
    title: "Worked example",
    content: "Consider generating a small Java utility. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Route deterministic subproblems to code where precision matters.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model proposes code; deterministic tooling decides whether code is acceptable. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Suitable PAL Tasks in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Suitable PAL Tasks, pay particular attention to correctness, security, compilation, tests, and sandboxing. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Suitable PAL Tasks when the task genuinely benefits from code generation and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production generating a small Java utility workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Suitable PAL Tasks is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "PAL Risks",
              slug: "pal-risks",
              description: "Generated programs can contain syntax errors, unintended operations, excessive loops, or unsafe resource access. Running them with production credentials w",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "PAL Risks is best understood as a natural-language specification translated into executable code. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on correctness, security, compilation, tests, and sandboxing and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Generated programs can contain syntax errors, unintended operations, excessive loops, or unsafe resource access. Running them with production credentials would turn a generation mistake into an operational risk.\n\nThe main PAL risks come from treating generated code as trusted code. A model can generate an incorrect formula, call an unintended library, consume excessive resources, or attempt an unsafe operation. A production PAL service should use sandboxing, timeouts, resource limits, restricted libraries, and validation appropriate to the environment. The model should not receive credentials merely because the generated program needs data. Provide narrow, controlled interfaces instead of broad system access.",
  },
  {
    title: "Worked example",
    content: "Consider generating a small Java utility. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat generated programs as untrusted input and isolate their runtime.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model proposes code; deterministic tooling decides whether code is acceptable. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain PAL Risks in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For PAL Risks, pay particular attention to correctness, security, compilation, tests, and sandboxing. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use PAL Risks when the task genuinely benefits from code generation and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production generating a small Java utility workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that PAL Risks is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "ReAct — Reasoning Plus Action",
              slug: "react-reasoning-plus-action",
              description: "ReAct combines planning with external actions such as database lookups, searches, APIs, or other tools. The model observes the task, decides which action i",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "ReAct — Reasoning Plus Action is best understood as a model selecting or consuming an external capability. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on tool schemas, authorization, freshness, side effects, and error handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "ReAct combines planning with external actions such as database lookups, searches, APIs, or other tools. The model observes the task, decides which action is needed, consumes the result, and continues until it can produce an answer. This is valuable when the answer depends on current or external state.\n\nReAct-style workflows combine model reasoning with actions against external tools. Instead of generating one final answer from static context, the model can decide that it needs a lookup, perform the action, inspect the result, and continue. This makes the model useful as an orchestrator, but it also creates a larger attack surface because tool calls can have real consequences. Each tool should expose only the operations required, and the application should validate arguments and enforce authorization before execution.",
  },
  {
    title: "Worked example",
    content: "Consider checking an order before answering a customer. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use tool-enabled workflows for current information and actions, with strict permissions and validation.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model can propose actions, but application code owns permission and side effects. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain ReAct — Reasoning Plus Action in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For ReAct — Reasoning Plus Action, pay particular attention to tool schemas, authorization, freshness, side effects, and error handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use ReAct — Reasoning Plus Action when the task genuinely benefits from tool use and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production checking an order before answering a customer workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that ReAct — Reasoning Plus Action is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Tool Selection",
              slug: "tool-selection",
              description: "A tool should have a clearly defined purpose, input schema, output schema, and limitations. Tool selection is safer when the model can distinguish a read-o",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Tool Selection is best understood as a model selecting or consuming an external capability. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on tool schemas, authorization, freshness, side effects, and error handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A tool should have a clearly defined purpose, input schema, output schema, and limitations. Tool selection is safer when the model can distinguish a read-only lookup from an action that changes external state.\n\nTool selection should be explicit about what each tool is for and what inputs it accepts. A model may be capable of calling many tools, but giving it unnecessary choices increases complexity and potential failure paths. Prefer narrow tools with clear names, schemas, and side-effect descriptions. For example, “get_order_status” is safer to reason about than a generic “database_query” tool. The application can also route certain intents deterministically rather than asking the model to choose every operation.",
  },
  {
    title: "Worked example",
    content: "Consider checking an order before answering a customer. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Keep the available tool set minimal and task-relevant.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model can propose actions, but application code owns permission and side effects. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Tool Selection in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Tool Selection, pay particular attention to tool schemas, authorization, freshness, side effects, and error handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Tool Selection when the task genuinely benefits from tool use and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production checking an order before answering a customer workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Tool Selection is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Tool-result Validation",
              slug: "tool-result-validation",
              description: "Tool results should be checked before being used. Validate status, required fields, types, freshness, authorization, and explicit error information. A mode",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Tool-result Validation is best understood as a model selecting or consuming an external capability. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on tool schemas, authorization, freshness, side effects, and error handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Tool results should be checked before being used. Validate status, required fields, types, freshness, authorization, and explicit error information. A model should not assume that a malformed or stale tool response is correct.\n\nTool results should be treated as data that must be interpreted, not automatically as trusted instructions. Validate the type, required fields, freshness, and expected ranges of important results before passing them into later model steps. If a tool returns an error or incomplete data, the workflow should have an explicit recovery path. For high-impact operations, verify the result against the authoritative backend state immediately before the action rather than relying on an earlier model interpretation.",
  },
  {
    title: "Worked example",
    content: "Consider checking an order before answering a customer. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Perform critical validation in application code.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model can propose actions, but application code owns permission and side effects. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Tool-result Validation in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Tool-result Validation, pay particular attention to tool schemas, authorization, freshness, side effects, and error handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Tool-result Validation when the task genuinely benefits from tool use and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production checking an order before answering a customer workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Tool-result Validation is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Action Safety",
              slug: "action-safety",
              description: "Actions that modify external state are riskier than read-only queries. Deleting data, issuing refunds, changing permissions, sending messages, or placing o",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Action Safety is best understood as a model selecting or consuming an external capability. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on tool schemas, authorization, freshness, side effects, and error handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Actions that modify external state are riskier than read-only queries. Deleting data, issuing refunds, changing permissions, sending messages, or placing orders should require explicit authorization and appropriate confirmation.\n\nActions such as refunds, account changes, deletions, or messages to external parties require stronger controls than ordinary text generation. The model can propose or interpret an action, but the application should authenticate the user, check authorization, validate parameters, and enforce business rules. High-impact actions may also require confirmation or human approval. This separation prevents a prompt manipulation from becoming direct access to a privileged capability.",
  },
  {
    title: "Worked example",
    content: "Consider checking an order before answering a customer. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Separate decision support from state-changing authority.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the model can propose actions, but application code owns permission and side effects. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Action Safety in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Action Safety, pay particular attention to tool schemas, authorization, freshness, side effects, and error handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Action Safety when the task genuinely benefits from tool use and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production checking an order before answering a customer workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Action Safety is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Directional Stimulus Prompting",
              slug: "directional-stimulus-prompting",
              description: "Directional stimulus prompting uses a separate learned mechanism to generate hints that steer a frozen target model. The policy or hint generator is optimi",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Directional Stimulus Prompting is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Directional stimulus prompting uses a separate learned mechanism to generate hints that steer a frozen target model. The policy or hint generator is optimized for the downstream task, making the approach more sophisticated than manually writing a single prompt.\n\nDirectional stimulus prompting uses an intermediate hint or learned guidance signal to steer a model toward useful behavior without changing the underlying model parameters. The important idea is to provide a small directional cue rather than rewriting the entire task. Such hints are still part of the model input and therefore should be evaluated like other prompt components. Their value depends on whether the added signal improves the target behavior without introducing unwanted assumptions or reducing generality.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Study this as an advanced prompt-optimization architecture where the hint generator itself becomes a trainable component.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Directional Stimulus Prompting in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Directional Stimulus Prompting, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Directional Stimulus Prompting when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Directional Stimulus Prompting is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Prompt Injection",
              slug: "prompt-injection",
              description: "Prompt injection occurs when untrusted input attempts to change the behavior of a model-driven application. The attack can be direct, where the user suppli",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Prompt Injection is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Prompt injection occurs when untrusted input attempts to change the behavior of a model-driven application. The attack can be direct, where the user supplies conflicting instructions, or indirect, where hostile instructions appear in retrieved documents, web pages, or other external content. Prompt boundaries help, but they are not a complete security boundary.\n\nPrompt injection occurs when untrusted content attempts to influence the instructions or behavior of a model-driven application. The risk is especially high when a single context contains trusted instructions, user input, retrieved documents, and tool results without clear separation. An injection can attempt to override task requirements, reveal information, or trigger an unintended tool call. Defenses should assume that model input can contain adversarial text. Prompt structure helps, but authorization and sensitive operations must be enforced outside the model.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Combine delimiters with least-privilege tools, authorization outside the model, input/output validation, and adversarial testing.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Prompt Injection in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Prompt Injection, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Prompt Injection when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Prompt Injection is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Why Prompt Injection Happens",
              slug: "why-prompt-injection-happens",
              description: "Language models process instructions and data through the same natural-language interface. Without clear separation and application-level controls, untrust",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Why Prompt Injection Happens is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Language models process instructions and data through the same natural-language interface. Without clear separation and application-level controls, untrusted text can look like a new instruction.\n\nInjection is possible because the model processes instructions and ordinary text through the same language interface. Text that looks like a command can therefore compete for the model’s attention even when the application developer intended it to be data. The problem becomes more complex when external content is automatically inserted into the prompt. A secure architecture therefore separates trust levels, minimizes sensitive context, constrains tools, and validates actions rather than assuming the model will always distinguish trusted instructions perfectly.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Design the application so model-visible data never becomes authority merely because it is written imperatively.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Why Prompt Injection Happens in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Why Prompt Injection Happens, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Why Prompt Injection Happens when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Why Prompt Injection Happens is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Direct Injection",
              slug: "direct-injection",
              description: "Direct injection is an attack delivered directly by the user or another actor controlling the immediate input. It attempts to override the intended task or",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Direct Injection is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Direct injection is an attack delivered directly by the user or another actor controlling the immediate input. It attempts to override the intended task or expose protected information.\n\nDirect injection comes from the person interacting with the model, such as a user placing conflicting instructions inside a request. The attacker may try to change the task, expose hidden instructions, or persuade the system to perform an unauthorized operation. Input delimiters and explicit task boundaries can reduce confusion, but they do not provide complete protection. The application should enforce permissions and sensitive-data access independently so that even a successful behavioral manipulation cannot automatically produce a privileged side effect.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Test direct injection against every model-powered feature that accepts user text.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Direct Injection in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Direct Injection, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Direct Injection when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Direct Injection is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
        {
          title: "Production Prompt Engineering",
          slug: "prompt-engineering-advanced",
          description: "Learn advanced prompt optimization, security defenses, production evaluation, and layered LLM application design.",
          topics: [
            {
              title: "Indirect Injection",
              slug: "indirect-injection",
              description: "Indirect injection hides malicious instructions inside content the application retrieves or processes. This is particularly important for browsing, retriev",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Indirect Injection is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Indirect injection hides malicious instructions inside content the application retrieves or processes. This is particularly important for browsing, retrieval-augmented generation, document processing, and tool-using agents.\n\nIndirect injection is especially important for retrieval and agent systems because the malicious instruction can originate in content the application fetches from elsewhere. A webpage, document, support ticket, or knowledge-base entry might contain text that attempts to influence the model. The user may never see the malicious content directly. Treat retrieved material as untrusted data, keep tool permissions narrow, separate data from instructions, and validate proposed actions before execution.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat retrieved content as data and apply authorization independently of model output.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Indirect Injection in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Indirect Injection, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Indirect Injection when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Indirect Injection is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Injection Defenses",
              slug: "injection-defenses",
              description: "Injection defense requires multiple layers: delimit untrusted content, enforce authorization outside the model, restrict tool permissions, validate argumen",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Injection Defenses is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Injection defense requires multiple layers: delimit untrusted content, enforce authorization outside the model, restrict tool permissions, validate arguments, use allowlists where appropriate, avoid exposing secrets, monitor suspicious behavior, and run adversarial tests.\n\nA layered defense combines prompt structure with application controls. Useful measures include separating trusted instructions from untrusted content, limiting the information supplied to the model, using least-privilege tools, validating tool arguments, filtering or inspecting retrieved content where appropriate, and requiring confirmation for sensitive actions. Monitoring is also important because injection attempts can reveal weaknesses that were not covered by the original test set. No single prompt sentence should be considered a complete security mechanism.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use defense in depth rather than searching for one magic defensive sentence.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Injection Defenses in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Injection Defenses, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Injection Defenses when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Injection Defenses is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Prompt Leaking",
              slug: "prompt-leaking",
              description: "Prompt leaking is an attempt to extract hidden instructions or protected prompt content. The important architectural lesson is that prompts should not be t",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Prompt Leaking is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Prompt leaking is an attempt to extract hidden instructions or protected prompt content. The important architectural lesson is that prompts should not be treated as secret storage. API keys, passwords, private credentials, and unnecessary personal information belong in secure infrastructure, not model instructions.\n\nPrompt leaking is an attempt to make a model reveal hidden instructions, internal policy text, or other information that the application intended to keep private. It can happen through direct requests, role-play, or indirect manipulation. The strongest protection is not assuming that hidden prompts are secrets that the model can reliably protect. Sensitive credentials and confidential data should never be placed in prompts merely because the application hopes the model will not disclose them. Protect secrets with infrastructure and access controls.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Design prompts assuming that model-visible instructions may eventually be exposed.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Prompt Leaking in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Prompt Leaking, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Prompt Leaking when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Prompt Leaking is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Defensive Design for Prompt Leakage",
              slug: "defensive-design-for-prompt-leakage",
              description: "Reduce the impact of leakage by keeping secrets outside prompts, minimizing sensitive context, separating configuration from user-facing instructions, and ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Defensive Design for Prompt Leakage is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Reduce the impact of leakage by keeping secrets outside prompts, minimizing sensitive context, separating configuration from user-facing instructions, and enforcing authorization in application code. Prompt confidentiality should never be the only protection for a privileged operation.\n\nDefensive design begins by minimizing what needs to be hidden. Put credentials in secret-management systems, restrict access at the application layer, and avoid placing unnecessary confidential data into model context. Treat the prompt as potentially observable through model behavior. You can instruct the model not to reveal internal instructions, but that instruction should be viewed as a usability measure rather than a cryptographic boundary. Security-sensitive information requires technical access controls that do not depend on model compliance.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use secret managers and service-level authorization instead of embedding credentials in prompts.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Defensive Design for Prompt Leakage in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Defensive Design for Prompt Leakage, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Defensive Design for Prompt Leakage when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Defensive Design for Prompt Leakage is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Jailbreaking and Safety Bypass",
              slug: "jailbreaking-and-safety-bypass",
              description: "Jailbreaking describes attempts to bypass safety or moderation controls through crafted inputs. Attack families evolve, so defensive engineering should foc",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Jailbreaking and Safety Bypass is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Jailbreaking describes attempts to bypass safety or moderation controls through crafted inputs. Attack families evolve, so defensive engineering should focus on layered controls rather than memorizing particular attack strings.\n\nJailbreaking refers to attempts to make a model bypass intended safety or policy behavior. These attempts can use indirect wording, fictional framing, conflicting instructions, or long chains of manipulation. Defensive design should focus on the application’s risk model rather than trying to enumerate every possible phrase. Sensitive capabilities should have independent authorization, validation, rate limits, and monitoring. The model should not be the sole enforcement point for dangerous or high-impact operations.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Combine model safeguards with application policy, validation, monitoring, and human review for high-impact operations.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Jailbreaking and Safety Bypass in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Jailbreaking and Safety Bypass, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Jailbreaking and Safety Bypass when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Jailbreaking and Safety Bypass is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Defensive Strategy",
              slug: "defensive-strategy",
              description: "A defensive strategy uses multiple layers: input screening where appropriate, explicit model policy, least-privilege tools, output validation, policy check",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Defensive Strategy is best understood as trusted instructions interacting with untrusted model-visible content. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on prompt injection, data exposure, tool abuse, least privilege, and defense in depth and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A defensive strategy uses multiple layers: input screening where appropriate, explicit model policy, least-privilege tools, output validation, policy checks, human review for high-risk actions, logging, monitoring, adversarial testing, and rapid updates when weaknesses are found.\n\nA defensive strategy is strongest when controls are distributed across the system. Use the model for interpretation and generation, but use deterministic software for authorization, validation, calculations, and state changes. Restrict tool permissions, isolate execution environments, protect secrets outside prompts, and maintain adversarial evaluation cases. When a new attack pattern is discovered, add it to the regression suite. Security improves over time when failures become permanent test cases rather than one-off prompt patches.",
  },
  {
    title: "Worked example",
    content: "Consider a document assistant exposed to hostile text. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Never make the model the sole security boundary.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that model behavior is not a security boundary; sensitive authority must live outside the prompt. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Defensive Strategy in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Defensive Strategy, pay particular attention to prompt injection, data exposure, tool abuse, least privilege, and defense in depth. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Defensive Strategy when the task genuinely benefits from LLM security and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a document assistant exposed to hostile text workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Defensive Strategy is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Prompt Design Patterns",
              slug: "prompt-design-patterns",
              description: "Common reusable patterns include direct instruction, role plus task, context plus question, few-shot examples, structured output, task decomposition, tool ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Prompt Design Patterns is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Common reusable patterns include direct instruction, role plus task, context plus question, few-shot examples, structured output, task decomposition, tool assistance, verification fields, explicit unknown handling, and delimiters for untrusted content. Patterns are starting points, not guarantees; evaluation determines whether a pattern actually helps.\n\nReusable patterns make prompt engineering easier to maintain. Common patterns include task-plus-context-plus-input, structured extraction, grounded question answering, classification with allowed labels, few-shot demonstrations, tool-assisted reasoning, and explicit abstention. The pattern should be selected according to the failure mode being addressed. Avoid creating a giant universal prompt that attempts to cover unrelated tasks. Smaller task-specific components are usually easier to test, version, and replace when requirements change.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Choose patterns based on task requirements and failure modes.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Prompt Design Patterns in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Prompt Design Patterns, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Prompt Design Patterns when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Prompt Design Patterns is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Prompt Engineering for Production",
              slug: "prompt-engineering-for-production",
              description: "Production prompts need versioning, evaluation, regression testing, and observability. Track changes to instructions, examples, schemas, model versions, an",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Prompt Engineering for Production is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "Production prompts need versioning, evaluation, regression testing, and observability. Track changes to instructions, examples, schemas, model versions, and decoding settings. Evaluation sets should contain normal, edge, ambiguous, adversarial, long, and malformed inputs.\n\nProduction prompt engineering adds software discipline to prompt design. Store prompts under version control, define evaluation datasets, measure quality and failure rates, and regression-test changes before deployment. Track operational metrics such as latency, token usage, cost, tool failures, and structured-output validation errors. Prompts should also be compatible with the selected model and its configuration; a prompt that performs well on one model is not automatically portable to another. Production reliability comes from the whole system, not the prompt text alone.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Treat prompt changes like software changes with review and regression tests.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Prompt Engineering for Production in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Prompt Engineering for Production, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Prompt Engineering for Production when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Prompt Engineering for Production is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Prompt Quality Checklist",
              slug: "prompt-quality-checklist",
              description: "A production-ready prompt should be clear, relevant, constrained, grounded where necessary, secure against untrusted content, compatible with the selected ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Prompt Quality Checklist is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A production-ready prompt should be clear, relevant, constrained, grounded where necessary, secure against untrusted content, compatible with the selected model, and measurable through representative tests. Maintainability also matters: engineers should understand why major instructions and examples exist.\n\nA practical review should verify task clarity, relevant context, input boundaries, output requirements, decoding choices, example quality, unknown-answer behavior, and security assumptions. Then test normal, ambiguous, adversarial, and missing-data cases. For machine-readable output, test both syntax and semantics. For tool use, test invalid arguments and denied permissions. The checklist should be connected to an evaluation suite so that quality is measured consistently rather than reviewed only by reading the prompt.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use the checklist during design review and before every significant prompt release.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Prompt Quality Checklist in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Prompt Quality Checklist, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Prompt Quality Checklist when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Prompt Quality Checklist is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Fresh End-to-End Examples",
              slug: "fresh-end-to-end-examples",
              description: "End-to-end prompt design connects task definition, context, input, output rules, validation, and application controls. A customer ticket classifier can def",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Fresh End-to-End Examples is best understood as a small set of labeled examples. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on example quality, relevance, consistency, and context cost and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "End-to-end prompt design connects task definition, context, input, output rules, validation, and application controls. A customer ticket classifier can define categories and return JSON; a contract extractor can return null for missing fields; a developer assistant can follow explicit review criteria; a tool-using inventory assistant can gather current state before answering; and a calculation workflow can delegate arithmetic to code.\n\nEnd-to-end examples are valuable because real applications combine several prompt-engineering decisions at once. A support classifier might combine a precise instruction, domain context, delimited user text, a JSON contract, an abstention rule, and application-side validation. A document assistant might add retrieval and source tracking. A tool-using agent might add authorization and confirmation. Studying the complete flow makes it easier to see that prompt engineering is only one layer in a reliable AI application.",
  },
  {
    title: "Worked example",
    content: "Consider support-ticket classification. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use end-to-end exercises to learn how prompting interacts with retrieval, tools, validation, and software controls.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that treat demonstrations as temporary task evidence, not model training. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Fresh End-to-End Examples in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Fresh End-to-End Examples, pay particular attention to example quality, relevance, consistency, and context cost. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Fresh End-to-End Examples when the task genuinely benefits from demonstrations and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production support-ticket classification workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Fresh End-to-End Examples is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
            {
              title: "Master Mental Model for LLM Applications",
              slug: "master-mental-model-for-llm-applications",
              description: "A robust LLM application can be understood as five layers: task definition, prompt, model configuration, tools and verification, and application controls. ",
              estimatedMinutes: 12,sections: [
  {
    title: "Concept",
    content: "Master Mental Model for LLM Applications is best understood as a model-driven task specification. In prompt engineering, the goal is not to find a magic phrase; it is to make the intended behavior observable, testable, and appropriate for the application. For this topic, focus on quality, reliability, cost, and failure handling and distinguish what the model can influence from what the surrounding software must guarantee.",
  },
  {
    title: "Detailed explanation",
    content: "A robust LLM application can be understood as five layers: task definition, prompt, model configuration, tools and verification, and application controls. The model is only one layer. For example, a refund assistant can interpret a request, retrieve transaction status, check policy constraints with deterministic code, and require authorization before changing money.\n\nA useful architecture has five layers: task definition, prompt, model configuration, tools and verification, and application controls. The task layer defines what success means. The prompt communicates instructions and relevant context. Model configuration controls generation behavior. Tools provide current information or deterministic computation. Application controls enforce authorization, validation, monitoring, and human approval. Keeping these responsibilities separate prevents the common mistake of asking the language model to perform functions that belong in normal software.",
  },
  {
    title: "Worked example",
    content: "Consider a small production workflow. Start with a precise task, provide only the context needed to make the decision, define the expected output, and include an explicit behavior for missing or ambiguous information. Then test the same design against an ordinary case, a boundary case, and a deliberately adversarial or malformed case. The important lesson is to inspect the failure mode rather than assuming a single successful response proves the prompt works.",
  },
  {
    title: "Practical use",
    content: "Use this layered model when designing or reviewing any production AI workflow.",
  },
  {
    title: "Deep mental model",
    content: "The deeper mental model is that the prompt is one layer in a larger AI application. A model produces probabilistic language-model output conditioned on the context it receives. Prompt text can shape that conditioning, but it cannot by itself create authoritative facts, permissions, deterministic arithmetic, or guaranteed policy enforcement. Reliable systems therefore combine prompt design with retrieval or tools where needed, deterministic validation, access control, and evaluation.",
  },
  {
    title: "Interview focus",
    content: "In an interview, be ready to explain Master Mental Model for LLM Applications in terms of the problem it solves, the mechanism involved, when it helps, and its trade-offs. A strong answer should include one concrete example and one failure mode. Also explain why a prompt-only solution is insufficient when correctness, security, authorization, or deterministic computation matters.",
  },
  {
    title: "Common pitfalls",
    content: "Common mistakes include making the prompt longer without addressing a measured failure, mixing trusted instructions with untrusted data, assuming fluent output is correct, and skipping edge-case evaluation. For Master Mental Model for LLM Applications, pay particular attention to quality, reliability, cost, and failure handling. Do not treat a model instruction as a substitute for application code, schema validation, authorization, or independent verification.",
  },
  {
    title: "When to use / avoid",
    content: "Use Master Mental Model for LLM Applications when the task genuinely benefits from prompt engineering and the behavior can be evaluated. Avoid it when a simpler deterministic function, direct database query, conventional parser, or explicit business rule can solve the problem more reliably and cheaply. In either case, choose based on measured quality, latency, cost, and operational risk.",
  },
  {
    title: "Production scenario",
    content: "Imagine a production a small production workflow workflow handling thousands of requests. Version the prompt and model configuration, capture representative evaluation cases, validate outputs before downstream use, and monitor failures, latency, and cost. If the workflow can call tools or change state, enforce authentication, authorization, parameter validation, rate limits, and confirmation outside the model. A production design should have a safe fallback when evidence is missing or a tool fails.",
  },
  {
    title: "Related concepts",
    content: "Related concepts include task specification, context management, output contracts, evaluation, retrieval-augmented generation, tool calling, model configuration, prompt injection, observability, and application-level validation. The useful connection is that Master Mental Model for LLM Applications is one technique inside a broader reliability and security lifecycle.",
  },
],
            },
          ],
        },
      ],
    },
  ],
};


async function seedPromptEngineering(): Promise<void> {
  const category = await prisma.studyCategory.upsert({
    where: { name: categorySeed.name },
    update: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
    create: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
  });

  let pathCount = 0;
  let moduleCount = 0;
  let topicCount = 0;
  let sectionCount = 0;

  for (const pathSeed of categorySeed.paths) {
    const path = await prisma.studyPath.upsert({
      where: {
        categoryId_level: {
          categoryId: category.id,
          level: pathSeed.level,
        },
      },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        isPublished: true,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
      },
    });
    pathCount++;

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: {
          studyPathId_slug: {
            studyPathId: path.id,
            slug: moduleSeed.slug,
          },
        },
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
      });
      moduleCount++;

      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex++) {
        const topicSeed = moduleSeed.topics![topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

        const topic = await prisma.studyTopic.upsert({
          where: {
            categoryId_slug: {
              categoryId: category.id,
              slug: topicSlug,
            },
          },
          update: {
            moduleId: studyModule.id,
            title: topicSeed.title,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
          create: {
            categoryId: category.id,
            moduleId: studyModule.id,
            title: topicSeed.title,
            slug: topicSlug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });
        topicCount++;

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];

          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
            create: {
              id: `${topic.id}-section-${sectionIndex}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
          });
          sectionCount++;
        }
      }
    }
  }

  console.log(
    `Prompt Engineering seed complete: ${pathCount} paths, ${moduleCount} modules, ${topicCount} topics, ${sectionCount} sections.`
  );
}

seedPromptEngineering()
  .catch((error) => {
    console.error("Prompt Engineering seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
