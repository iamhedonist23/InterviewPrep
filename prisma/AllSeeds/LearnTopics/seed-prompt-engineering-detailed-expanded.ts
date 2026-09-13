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
              description: "In-context learning lets a model adapt its behavior from instructions or demonstrations placed in the current request. The model is not permanently retrain",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "In-context learning lets a model adapt its behavior from instructions or demonstrations placed in the current request. The model is not permanently retrained; the examples act as temporary evidence about the task, labels, style, and output pattern. Zero-shot gives only the task, one-shot adds one demonstration, and few-shot adds several. The key engineering question is whether the examples are correct, representative, and close enough to the new inputs to establish the intended boundary. More examples can also increase context usage and latency, so quality matters more than raw quantity.\n\nThe important mental model is that the model is conditioning its next-token predictions on the complete context it receives. A demonstration therefore acts less like permanent training and more like a temporary specification of the task. Good demonstrations reduce uncertainty about labels, boundaries, tone, and formatting. Poor demonstrations can do the opposite: one inconsistent example can introduce a pattern that competes with the intended instruction. When designing few-shot prompts, inspect examples as if they were a tiny training dataset: keep the labels correct, use representative cases, include boundary cases when useful, and keep the examples close to the target distribution.",
                },
                {
                  title: "Example",
                  content: "A support team wants to classify messages as urgent or normal. Instead of only saying “classify this,” the prompt shows three consistent examples, including one borderline case, and then supplies the new message. The model now has both the label definitions and examples of how the boundary should be applied.",
                },
                {
                  title: "Practical use",
                  content: "Use in classification, extraction, formatting, and domain-specific language tasks where demonstrations can clarify behavior without changing model weights.",
                },
              ],
            },
            {
              title: "What Are Prompts?",
              slug: "what-are-prompts",
              description: "A prompt is the task specification supplied to a language model. It can combine an instruction, useful context, the material to process, examples, constrai",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A prompt is the task specification supplied to a language model. It can combine an instruction, useful context, the material to process, examples, constraints, and an output contract. Good prompt engineering is therefore closer to interface design than clever wording: every important requirement should be explicit enough that another engineer could understand what behavior is expected. The prompt should be complete enough to remove ambiguity without becoming overloaded with irrelevant information.\n\nA prompt is best treated as an interface between application intent and model behavior. The instruction describes the operation, context establishes meaning, input supplies the material to process, and output requirements define what the application can safely consume. These pieces can be separated with headings or delimiters so that changing one part does not accidentally change another. The goal is not maximum prompt length. The goal is to remove the specific ambiguities that cause incorrect interpretation, unexpected formatting, or unsupported assumptions.",
                },
                {
                  title: "Example",
                  content: "For invoice extraction, specify the task, explain that invoice IDs begin with INV-, provide the invoice text inside a delimiter, and require JSON with `invoice_id`, `total`, and `currency`. This is much easier for software to validate than an unrestricted paragraph.",
                },
                {
                  title: "Practical use",
                  content: "Use prompts as reusable application components for extraction, classification, summarization, generation, and tool orchestration.",
                },
              ],
            },
            {
              title: "Instructions",
              slug: "instructions",
              description: "Instructions tell the model what operation to perform. A strong instruction uses an observable verb such as extract, classify, summarize, compare, transfor",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Instructions tell the model what operation to perform. A strong instruction uses an observable verb such as extract, classify, summarize, compare, transform, or validate and states the scope of the task. Avoid relying on vague verbs such as âhandleâ or âanalyzeâ when the desired operation can be stated precisely.\n\nA useful instruction should answer three questions: what operation should be performed, on which information, and what level of completion is expected. For example, “summarize” can mean one sentence, a detailed report, or a list of decisions unless the scope is defined. Strong instructions also avoid competing requirements. If two instructions conflict, the model may choose one based on context rather than following a deterministic priority rule. In production, keep instructions stable and put changing user data in a clearly separated input region.",
                },
                {
                  title: "Example",
                  content: "For a support message, use “Classify the message as billing, account, technical, delivery, or other. Return exactly one label.” rather than “Analyze this customer issue.”",
                },
                {
                  title: "Practical use",
                  content: "Use precise task verbs as the first layer of nearly every production prompt.",
                },
              ],
            },
            {
              title: "Context",
              slug: "context",
              description: "Context supplies background that changes how the input should be interpreted. Useful context includes business definitions, domain terminology, policy exce",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Context supplies background that changes how the input should be interpreted. Useful context includes business definitions, domain terminology, policy excerpts, schemas, audience information, and constraints. Context should be relevant: unrelated material increases cognitive and token load without necessarily improving the answer.\n\nContext should be selected according to its effect on the decision the model must make. Domain definitions, policies, schemas, examples, and relevant retrieved passages can materially improve interpretation. Irrelevant context increases token usage and can make important information harder to notice. Context also needs provenance and trust boundaries: user text and retrieved documents should not automatically be treated as authoritative instructions. A reliable application distinguishes trusted policy from untrusted content and supplies only the relevant evidence needed for the task.",
                },
                {
                  title: "Example",
                  content: "If a model reviews an API incident, provide the service's SLO and severity definitions so “high impact” has an application-specific meaning.",
                },
                {
                  title: "Practical use",
                  content: "Use context to define domain meaning, not to compensate for missing authoritative data that should come from a retrieval system or tool.",
                },
              ],
            },
            {
              title: "Input Data",
              slug: "input-data",
              description: "Input data is the material the model must transform or inspect. Keeping the actual data distinct from instructions makes the task easier to reason about an",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Input data is the material the model must transform or inspect. Keeping the actual data distinct from instructions makes the task easier to reason about and reduces accidental interpretation of user content as trusted policy.\n\nInput data is the object of the model operation, not the policy controlling the operation. This distinction becomes especially important when input can contain text that looks like an instruction. Explicit boundaries such as XML-like tags, Markdown headings, or labeled fields make the separation easier to reason about. The application should also normalize or validate inputs before constructing the prompt when possible. This reduces accidental ambiguity and makes logging, evaluation, and debugging easier because engineers can see exactly what data reached the model.",
                },
                {
                  title: "Example",
                  content: "Place a customer message between `<<<message>>>` and `<<<end message>>>` and tell the model to classify only the enclosed text.",
                },
                {
                  title: "Practical use",
                  content: "Use clear input boundaries whenever user-supplied, retrieved, or third-party content enters a prompt.",
                },
              ],
            },
            {
              title: "Output Indicator",
              slug: "output-indicator",
              description: "Output requirements define the shape and limits of the response. A useful output contract can specify fields, allowed labels, length, ordering, tone, or a ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Output requirements define the shape and limits of the response. A useful output contract can specify fields, allowed labels, length, ordering, tone, or a machine-readable schema. Structured output is especially valuable when downstream software needs to validate the response.\n\nAn output contract should be designed from the perspective of the consuming application. If another service needs a status and an identifier, returning a long paragraph creates unnecessary parsing risk. Define allowed values, required fields, optional fields, and formatting expectations. When the platform supports structured outputs or schemas, use them together with application-side validation rather than assuming the model will always comply. A strong contract also defines what should happen when the requested information is unavailable, such as returning null or an explicit “unknown” state.",
                },
                {
                  title: "Example",
                  content: "Require `{\"priority\":\"high|medium|low\",\"reason\":\"string\"}` for a ticket classifier instead of accepting arbitrary prose.",
                },
                {
                  title: "Practical use",
                  content: "Use explicit output contracts for APIs, workflow automation, extraction, and evaluation datasets.",
                },
              ],
            },
            {
              title: "Why Prompt Engineering Matters",
              slug: "why-prompt-engineering-matters",
              description: "Prompt engineering matters because the same model can behave differently depending on how a task is specified. Carefully designed prompts help expose ambig",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Prompt engineering matters because the same model can behave differently depending on how a task is specified. Carefully designed prompts help expose ambiguity, establish expected behavior, and make application features such as classification, summarization, extraction, writing assistance, and tool use more controllable. In production, a prompt should be versioned, tested against representative cases, and monitored like other application logic.\n\nPrompt engineering matters because language models are highly sensitive to task framing, context, examples, and output requirements. The same underlying model can perform well on one formulation and poorly on another because the prompt changes what behavior is made salient. This makes prompting useful not only for generating answers but also for discovering failure modes. In software development, the practical consequence is that prompts should be versioned and evaluated. A prompt change is a behavior change, so it deserves regression tests just like a change to application logic.",
                },
                {
                  title: "Example",
                  content: "Take a vague support classifier and add label definitions, an output schema, boundary examples, and a fallback for uncertain cases. The improvement comes from reducing degrees of freedom rather than from simply making the prompt longer.",
                },
                {
                  title: "Practical use",
                  content: "Use evaluation-driven prompt iteration instead of relying on a single successful demonstration.",
                },
              ],
            },
            {
              title: "Decoding Parameters: Temperature and Top-p",
              slug: "decoding-parameters-temperature-and-top-p",
              description: "Decoding converts a model's probability distribution over possible next tokens into an actual sequence. Temperature changes the sharpness of the distributi",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Decoding converts a model's probability distribution over possible next tokens into an actual sequence. Temperature changes the sharpness of the distribution: lower settings usually make choices more concentrated, while higher settings allow more variation. Top-p, or nucleus sampling, restricts sampling to a dynamically selected group whose cumulative probability reaches a chosen threshold. These controls affect variability, not the underlying truth of an answer.\n\nDecoding happens after the model has produced probabilities for possible next tokens. Temperature changes how sharply those probabilities are distributed, while top-p limits the candidate pool to a probability mass chosen at each step. These settings affect variability, not the underlying knowledge of the model. A low-variance configuration can make extraction more repeatable, but it cannot repair missing context or factual errors. Conversely, more sampling diversity can be useful for ideation. The right setting is therefore determined by the task and the acceptable variability of the application.",
                },
                {
                  title: "Example",
                  content: "For a fixed-label extraction workflow, use conservative decoding so formatting is more stable. For brainstorming product names, allow more diversity. Compare outputs on a fixed evaluation set rather than assuming a setting is universally best.",
                },
                {
                  title: "Practical use",
                  content: "Tune decoding according to the task and validate the resulting behavior empirically.",
                },
              ],
            },
            {
              title: "Temperature",
              slug: "temperature",
              description: "Temperature changes how strongly the model favors high-probability token choices during sampling. Lower temperature generally reduces variation; higher tem",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Temperature changes how strongly the model favors high-probability token choices during sampling. Lower temperature generally reduces variation; higher temperature generally increases variation. It cannot add missing knowledge, correct faulty context, or guarantee factual accuracy.\n\nConceptually, temperature rescales the model’s token scores before sampling. Lower values make high-probability choices dominate more strongly; higher values make lower-probability alternatives more likely to participate. This does not mean high temperature creates new knowledge, nor that low temperature guarantees truth. It changes how the model chooses among plausible continuations. For production systems, evaluate temperature empirically using representative inputs because different tasks have different tolerance for variation. Structured extraction usually benefits from stability, while brainstorming can benefit from diversity.",
                },
                {
                  title: "Example",
                  content: "Run the same short creative prompt multiple times at conservative and more exploratory settings and compare diversity. For JSON extraction, prioritize stable formatting over stylistic variety.",
                },
                {
                  title: "Practical use",
                  content: "Use temperature as a generation-control parameter, not as a correctness switch.",
                },
              ],
            },
            {
              title: "Top-p",
              slug: "top-p",
              description: "Top-p keeps the smallest set of candidate tokens whose cumulative probability reaches the selected threshold and samples from that set. A lower threshold u",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Top-p keeps the smallest set of candidate tokens whose cumulative probability reaches the selected threshold and samples from that set. A lower threshold usually narrows the candidate pool, while a higher threshold allows more alternatives. Temperature and top-p both influence sampling diversity, so changing many decoding controls simultaneously can make experiments harder to interpret.\n\nTop-p, or nucleus sampling, dynamically selects a set of candidate tokens whose cumulative probability reaches the chosen threshold. Unlike a fixed top-k list, the number of candidates can change from one generation step to another. A small threshold generally narrows the choices, while a larger threshold allows more alternatives. Top-p is therefore another way to control generation diversity. When tuning it, change one decoding parameter at a time and compare results on the same evaluation set so that improvements can be attributed to a specific configuration.",
                },
                {
                  title: "Example",
                  content: "If candidate probabilities are 0.55, 0.25, 0.12, 0.05, and 0.03, a top-p of 0.80 retains the first two candidates because they already reach the threshold.",
                },
                {
                  title: "Practical use",
                  content: "Use controlled A/B tests to understand whether top-p actually improves the target task.",
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
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Choose decoding behavior from the task's tolerance for variation. Extraction, classification, and deterministic-looking transformations usually benefit from predictable generation, while ideation and creative writing may benefit from more diversity. Even highly deterministic decoding can produce incorrect answers because generation control does not verify facts.\n\nStart from the application requirement rather than from a favorite parameter value. If the same input should normally produce the same classification or extraction, favor controlled decoding and evaluate repeatability. If the task is brainstorming, alternative wording or ideas may be desirable. Also distinguish variability from correctness: reducing sampling randomness does not validate facts, permissions, calculations, or business rules. For important workflows, combine suitable decoding with retrieval, deterministic code, schemas, validators, and application controls instead of expecting decoding settings to provide reliability by themselves.",
                },
                {
                  title: "Example",
                  content: "For a product-title generator, compare a conservative configuration for consistency with a more exploratory configuration for variety, then select based on human or automated evaluation.",
                },
                {
                  title: "Practical use",
                  content: "Treat decoding settings as part of the prompt/model configuration that should be versioned.",
                },
              ],
            },
            {
              title: "Greedy and Beam-style Decoding",
              slug: "greedy-and-beam-style-decoding",
              description: "Greedy decoding repeatedly selects the locally most likely next token. Beam-style decoding keeps multiple candidate sequences and can be useful in some seq",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Greedy decoding repeatedly selects the locally most likely next token. Beam-style decoding keeps multiple candidate sequences and can be useful in some sequence-generation tasks. These methods favor predictability, but a locally likely sequence is not automatically the best response for open-ended dialogue or creative work.\n\nGreedy decoding chooses the locally most probable next token at every step. It is simple and predictable, but local choices do not necessarily produce the best complete sequence. Beam-style decoding keeps multiple partial candidates and compares them as generation proceeds, which can help some sequence-generation tasks. These approaches are different from sampling, where controlled randomness is introduced. The broader lesson is that decoding is an algorithmic choice: a generation strategy should match the objective, whether that objective is deterministic formatting, sequence scoring, translation-like generation, or creative variation.",
                },
                {
                  title: "Example",
                  content: "For a constrained text transformation, predictable decoding may be desirable. For brainstorming, excessive determinism can produce repetitive results.",
                },
                {
                  title: "Practical use",
                  content: "Select the decoding strategy based on the application's objective, not because one algorithm is universally superior.",
                },
              ],
            },
            {
              title: "Basic Prompt Design",
              slug: "basic-prompt-design",
              description: "A useful prompt makes the task, audience, context, constraints, input, and output behavior explicit. The goal is not maximum length; it is minimum ambiguit",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A useful prompt makes the task, audience, context, constraints, input, and output behavior explicit. The goal is not maximum length; it is minimum ambiguity. Start with the simplest prompt that could work, then add a requirement only when evaluation shows a real failure that the requirement can address.\n\nBasic prompt design is the process of converting a vague request into an executable task specification. Start with the outcome, identify the required context, isolate the input, and define the expected output. Then test the prompt with both ordinary and ambiguous cases. A useful prompt is usually shorter than a prompt that tries to describe every possible situation. Each sentence should earn its place by reducing uncertainty, defining a constraint, or supplying information that the model genuinely needs.",
                },
                {
                  title: "Example",
                  content: "Turn “Analyze this incident” into “Identify the three highest-impact risks, rank them, and return one mitigation for each.” The second prompt creates a measurable output.",
                },
                {
                  title: "Practical use",
                  content: "Use iterative prompt design: define expected behavior, test failures, add targeted constraints, and retest.",
                },
              ],
            },
            {
              title: "Specificity",
              slug: "specificity",
              description: "Specificity means stating exactly what operation and scope the model should perform. A precise task gives the model fewer plausible interpretations and mak",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Specificity means stating exactly what operation and scope the model should perform. A precise task gives the model fewer plausible interpretations and makes results easier to evaluate.\n\nSpecificity reduces the number of reasonable interpretations available to the model. Instead of asking for “a summary,” specify audience, length, information to preserve, and format when those details matter. Specificity should be targeted rather than excessive: adding ten constraints that never affect the result only increases maintenance cost. A practical test is to give the prompt to another engineer and ask what output they would expect. If they can reasonably imagine several incompatible outputs, the prompt still contains unresolved ambiguity.",
                },
                {
                  title: "Example",
                  content: "Instead of “Review this log,” ask “Identify authentication failures occurring after 10:00 UTC and return timestamp, endpoint, and error code.”",
                },
                {
                  title: "Practical use",
                  content: "Use specific verbs, entities, boundaries, and success criteria in operational prompts.",
                },
              ],
            },
            {
              title: "Context",
              slug: "context",
              description: "Context should provide only information that materially affects the task. Useful context can define domain vocabulary, policy, audience, or assumptions. Ir",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Context should provide only information that materially affects the task. Useful context can define domain vocabulary, policy, audience, or assumptions. Irrelevant context consumes space and can make important instructions harder to follow.\n\nContext should be selected according to its effect on the decision the model must make. Domain definitions, policies, schemas, examples, and relevant retrieved passages can materially improve interpretation. Irrelevant context increases token usage and can make important information harder to notice. Context also needs provenance and trust boundaries: user text and retrieved documents should not automatically be treated as authoritative instructions. A reliable application distinguishes trusted policy from untrusted content and supplies only the relevant evidence needed for the task.",
                },
                {
                  title: "Example",
                  content: "For a Java code review, include the target Java version and concurrency requirements, but do not paste unrelated deployment documentation.",
                },
                {
                  title: "Practical use",
                  content: "Use retrieval or selective context construction to keep prompts focused.",
                },
              ],
            },
            {
              title: "Constraints",
              slug: "constraints",
              description: "Constraints turn broad behavior into bounded behavior. Common constraints cover length, labels, allowed assumptions, required fields, tone, prohibited acti",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Constraints turn broad behavior into bounded behavior. Common constraints cover length, labels, allowed assumptions, required fields, tone, prohibited actions, and edge-case handling. Constraints are most useful when they are testable.\n\nConstraints turn a general generation task into a bounded one. They can define length, allowed labels, prohibited transformations, ordering, required fields, or conditions under which the model should abstain. Good constraints are observable: an evaluator or application should be able to determine whether they were satisfied. Avoid contradictory constraints such as demanding both exhaustive detail and a strict one-sentence limit. In production, enforce critical constraints in code whenever possible because a textual instruction is not a deterministic validator.",
                },
                {
                  title: "Example",
                  content: "For an expense classifier, specify that only `travel`, `food`, `software`, or `other` are valid labels and that missing evidence must produce `other`.",
                },
                {
                  title: "Practical use",
                  content: "Use constraints that downstream tests can verify rather than vague requests such as “be perfect.”",
                },
              ],
            },
            {
              title: "Output Format",
              slug: "output-format",
              description: "The output format is the contract between the model and the rest of the application. JSON, XML, tables, or concise fields can make parsing and validation e",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "The output format is the contract between the model and the rest of the application. JSON, XML, tables, or concise fields can make parsing and validation easier, but the application should still validate the result rather than assuming compliance.\n\nOutput formatting is especially important when model responses enter a programmatic workflow. Define the shape before generating the prompt: identify required fields, data types, allowed values, and how missing information should be represented. JSON is useful for many integrations, but valid JSON alone does not guarantee semantic correctness. The application should parse and validate the result, reject malformed or unsafe values, and decide how to recover. The model should produce the data; the application should remain responsible for accepting or rejecting it.",
                },
                {
                  title: "Example",
                  content: "Request `{\"sku\":\"...\",\"quantity\":0}` for inventory extraction and reject responses where quantity is not an integer.",
                },
                {
                  title: "Practical use",
                  content: "Use schemas and validators when model output enters software workflows.",
                },
              ],
            },
            {
              title: "Delimiters",
              slug: "delimiters",
              description: "Delimiters make the boundary between trusted instructions and untrusted content visible. They do not create a perfect security boundary, but they reduce am",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Delimiters make the boundary between trusted instructions and untrusted content visible. They do not create a perfect security boundary, but they reduce ambiguity and provide a clear convention for the model and application.\n\nDelimiters make prompt structure visually and semantically clearer by separating instructions from data. They are useful for long documents, retrieved passages, code, user messages, and multiple input fields. A delimiter does not magically create a security boundary, because a model can still interpret text inside it. Its value is clarity and reduced ambiguity. Use stable labels such as `<customer_message>` or `BEGIN_DOCUMENT` / `END_DOCUMENT`, and make the instruction explicit about how the delimited content should be treated.",
                },
                {
                  title: "Example",
                  content: "Wrap retrieved text in `<document>...</document>` and explicitly state that the document is data to analyze, not instructions to follow.",
                },
                {
                  title: "Practical use",
                  content: "Use delimiters together with application-level authorization, tool restrictions, and validation.",
                },
              ],
            },
            {
              title: "Content Summarization",
              slug: "content-summarization",
              description: "Summarization compresses source material while preserving the information that matters for the intended audience. A good prompt defines audience, length, r",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Summarization compresses source material while preserving the information that matters for the intended audience. A good prompt defines audience, length, required facts, omissions, and whether interpretation is permitted. Evaluation should check factual consistency and critical-detail coverage, not only fluency.\n\nSummarization is a transformation task in which the model must decide what information to retain and what to compress. A prompt should specify the target audience and purpose because the right summary for an executive differs from the right summary for an engineer. It is also useful to distinguish factual preservation from stylistic rewriting. For high-stakes summaries, evaluate whether important facts, qualifiers, dates, numbers, and uncertainty were preserved. A fluent summary can still be misleading if it drops a critical qualification.",
                },
                {
                  title: "Example",
                  content: "Ask for a four-bullet incident summary containing root cause, customer impact, duration, and corrective action, while forbidding unsupported additions.",
                },
                {
                  title: "Practical use",
                  content: "Use summarization for reports, tickets, documents, meetings, and knowledge workflows, with source-grounding checks where accuracy matters.",
                },
              ],
            },
            {
              title: "Extractive versus Abstractive Behavior",
              slug: "extractive-versus-abstractive-behavior",
              description: "Extractive summarization emphasizes selecting important source content, while abstractive summarization allows the model to restate ideas in new wording. A",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Extractive summarization emphasizes selecting important source content, while abstractive summarization allows the model to restate ideas in new wording. Abstractive output can be clearer, but it can also introduce unsupported details if the prompt and evaluation do not control it.\n\nExtractive summarization emphasizes selecting or shortening information that is explicitly present in the source, while abstractive summarization allows the model to restate ideas in new wording. Abstraction can make a result clearer and more compact, but it also creates more opportunity for unsupported additions or altered meaning. The choice should therefore depend on risk. Legal, compliance, and evidence-heavy workflows may need stronger preservation and verification, while ordinary internal notes may tolerate more paraphrasing.",
                },
                {
                  title: "Example",
                  content: "For a legal policy digest, require key clauses to stay traceable to the source and separately allow a plain-language explanation that does not add new obligations.",
                },
                {
                  title: "Practical use",
                  content: "Choose the degree of rewriting according to the risk of factual drift.",
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
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A useful summary evaluation checks whether required facts are present, whether statements are supported, whether the length target is respected, and whether the result remains understandable. A simple rubric can score facts, completeness, concision, and clarity independently.\n\nSummary quality cannot be judged only by fluency. Useful evaluation dimensions include coverage of important facts, factual consistency with the source, omission of critical qualifiers, relevance to the requested audience, and adherence to length or format constraints. Create a small benchmark containing ordinary documents and difficult cases such as contradictory statements, numbers, dates, and negations. Compare prompt versions against the same benchmark. This converts “the new prompt feels better” into a repeatable engineering decision.",
                },
                {
                  title: "Example",
                  content: "Evaluate ten generated incident summaries against a checklist: root cause present, impact present, duration present, action present, no unsupported claims.",
                },
                {
                  title: "Practical use",
                  content: "Use fixed evaluation sets so prompt changes can be compared rather than judged from one output.",
                },
              ],
            },
            {
              title: "Question Answering with Context",
              slug: "question-answering-with-context",
              description: "Context-grounded question answering gives the model evidence and instructs it to answer from that evidence. This reduces the chance that the model fills ga",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Context-grounded question answering gives the model evidence and instructs it to answer from that evidence. This reduces the chance that the model fills gaps with unrelated knowledge. A strong design also defines what to do when the context does not contain the answer.\n\nContext-grounded question answering works by supplying the evidence needed to answer a question instead of expecting the model to rely only on internal knowledge. The prompt should clearly distinguish the question from the supplied context and state what to do when the context does not contain an answer. This is particularly important for business documentation, policies, and product information that can change over time. Retrieval quality is part of the system: a perfect prompt cannot recover evidence that the application failed to retrieve.",
                },
                {
                  title: "Example",
                  content: "Provide a product policy saying the premium plan includes five seats and ask “How many seats are included?” Require the answer to use only the supplied policy.",
                },
                {
                  title: "Practical use",
                  content: "Use this pattern for internal knowledge bases, policy assistants, and document Q&A.",
                },
              ],
            },
            {
              title: "Grounded Answering",
              slug: "grounded-answering",
              description: "Grounded answering means the response should be supported by supplied evidence. Useful controls include limiting the answer to context, identifying missing",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Grounded answering means the response should be supported by supplied evidence. Useful controls include limiting the answer to context, identifying missing information, preserving field names, and returning uncertainty rather than inventing facts.\n\nGrounding means constraining an answer to information supplied by an approved source or tool. A useful prompt can instruct the model to answer only from the provided material and to indicate when the evidence is insufficient. However, wording alone does not prove that the response is grounded. Production systems should track the source passages used, validate important claims where practical, and distinguish retrieved evidence from model-generated explanation. Grounding is therefore a system design problem, not merely a sentence added to a prompt.",
                },
                {
                  title: "Example",
                  content: "For a configuration assistant, supply the current deployment manifest and ask which memory limit is configured. If the field is absent, return `Not specified`.",
                },
                {
                  title: "Practical use",
                  content: "Use retrieval for external knowledge and require evidence-aware behavior for high-value answers.",
                },
              ],
            },
            {
              title: "Handling Unknown Answers",
              slug: "handling-unknown-answers",
              description: "A model should have an explicit behavior for insufficient evidence. A fallback such as `UNKNOWN` or `Not specified` is often safer than forcing a plausible",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A model should have an explicit behavior for insufficient evidence. A fallback such as `UNKNOWN` or `Not specified` is often safer than forcing a plausible answer. The application can then decide whether to retrieve more information or ask the user for clarification.\n\nA reliable model workflow needs an explicit behavior for missing information. If the model is told to always answer, it may fill gaps with plausible-sounding content. An abstention instruction such as “return unknown when the supplied evidence is insufficient” gives the model a safer target, but the application should also validate whether the required evidence exists. Unknown handling is especially important when users may mistake fluent language for certainty. Good systems make uncertainty an expected state rather than treating it as an exceptional failure.",
                },
                {
                  title: "Example",
                  content: "If a contract excerpt contains a renewal period but no cancellation notice, return `null` for the missing field rather than estimating a number.",
                },
                {
                  title: "Practical use",
                  content: "Use explicit unknown handling in support, compliance, policy, and extraction workflows.",
                },
              ],
            },
            {
              title: "Content Classification",
              slug: "content-classification",
              description: "Classification maps text or other input to predefined categories. Reliable classification depends on clear label definitions, representative examples, and ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Classification maps text or other input to predefined categories. Reliable classification depends on clear label definitions, representative examples, and an output contract. If labels overlap, explain the boundary or provide examples for ambiguous cases.\n\nClassification prompts map free-form input into a controlled set of categories. The most important design choice is the boundary between labels. Labels should describe distinct concepts, and the prompt should explain ambiguous cases when they are common. Returning one allowed label is easier to validate than returning an essay. For larger systems, collect representative examples for each class and include difficult cases near category boundaries. Measure precision, recall, confusion between labels, and abstention behavior rather than relying only on a few successful demonstrations.",
                },
                {
                  title: "Example",
                  content: "Route messages into `billing`, `technical`, `account`, `delivery`, or `other`, with each label defined by the type of issue it represents.",
                },
                {
                  title: "Practical use",
                  content: "Use classification for ticket routing, moderation triage, document tagging, and workflow branching.",
                },
              ],
            },
            {
              title: "Why Label Definitions Matter",
              slug: "why-label-definitions-matter",
              description: "A label name alone may be ambiguous. Definitions explain what belongs in each category and reduce inconsistent interpretation. Boundary examples can be esp",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A label name alone may be ambiguous. Definitions explain what belongs in each category and reduce inconsistent interpretation. Boundary examples can be especially valuable when two categories are close.\n\nLabels that sound similar can produce inconsistent classifications unless their meanings are operationally defined. A useful label definition explains what belongs in the category and, when necessary, what should be excluded. Boundary examples are often more valuable than obvious examples because they show how the categories differ. Treat label definitions as part of the product specification. If the business changes the meaning of a label, update the prompt, examples, evaluation set, and downstream logic together.",
                },
                {
                  title: "Example",
                  content: "Define `account` as login, profile, password, or permissions, while `technical` covers application crashes and broken features. A message about a failed login can then be classified consistently.",
                },
                {
                  title: "Practical use",
                  content: "Treat label definitions and examples as part of the task specification.",
                },
              ],
            },
            {
              title: "Classification with JSON",
              slug: "classification-with-json",
              description: "Structured classification output can include a label and optional explanation or metadata. A generated confidence value should not automatically be treated",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Structured classification output can include a label and optional explanation or metadata. A generated confidence value should not automatically be treated as a calibrated probability; if confidence controls decisions, calibration must be evaluated separately.\n\nJSON classification combines a semantic decision with a machine-readable contract. The prompt should define the allowed label values and the exact fields expected. The application should still parse the result and validate every field against the schema. For example, a model might return a valid JSON object with an invalid category; syntax validation alone would not catch that. Separating syntactic validation from semantic validation makes the workflow much more reliable.",
                },
                {
                  title: "Example",
                  content: "Return `{\"label\":\"billing\",\"reason\":\"duplicate charge\"}` and validate that `label` is one of the allowed values.",
                },
                {
                  title: "Practical use",
                  content: "Use JSON plus schema validation for automated routing.",
                },
              ],
            },
            {
              title: "Few-shot Classification",
              slug: "few-shot-classification",
              description: "Few-shot classification provides demonstrations before the new input. Good demonstrations show correct labels, output shape, and difficult boundaries. They",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Few-shot classification provides demonstrations before the new input. Good demonstrations show correct labels, output shape, and difficult boundaries. They should be internally consistent and relevant to the expected traffic.\n\nFew-shot classification uses demonstrations to teach the model how the application wants categories applied. Example quality matters more than simply increasing the count. Examples should cover common patterns, meaningful variations, and ambiguous boundaries without contradicting one another. The examples also consume context, so a large collection can become expensive or dilute the signal. A good workflow treats demonstrations as a curated dataset: version them, review them, and evaluate the prompt when examples are added or removed.",
                },
                {
                  title: "Example",
                  content: "Show examples for a failed login, a page crash after login, and a duplicate payment before classifying a new customer message.",
                },
                {
                  title: "Practical use",
                  content: "Use a small, carefully selected demonstration set and evaluate it as part of prompt testing.",
                },
              ],
            },
            {
              title: "Role-playing and Style Control",
              slug: "role-playing-and-style-control",
              description: "Role prompting gives the model a behavioral frame such as audience, priorities, vocabulary, or review criteria. A role should describe observable behavior ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Role prompting gives the model a behavioral frame such as audience, priorities, vocabulary, or review criteria. A role should describe observable behavior rather than relying on a title alone, and it does not prove that the model possesses real-world credentials or authority.\n\nRole instructions can influence vocabulary, tone, level of detail, and perspective. They are most useful when the role corresponds to a concrete output requirement, such as “write for a junior developer” or “act as a concise support editor.” A role should not be used as a substitute for factual context or authorization. For example, telling a model to act as an administrator does not grant administrator permissions. Style can be controlled through explicit constraints and examples, which are usually easier to test than a vague persona.",
                },
                {
                  title: "Example",
                  content: "Ask the model to review an API as a production backend engineer, focusing on reliability, security, scaling, and maintainability.",
                },
                {
                  title: "Practical use",
                  content: "Use role framing to control perspective and communication style, while keeping factual and authorization decisions outside the model.",
                },
              ],
            },
            {
              title: "Better Role Specification",
              slug: "better-role-specification",
              description: "A useful role specification states the perspective and concrete responsibilities expected from the model. “You are an expert” is weak because expertise is ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A useful role specification states the perspective and concrete responsibilities expected from the model. âYou are an expertâ is weak because expertise is not operationalized.\n\nA stronger role specification focuses on observable behavior rather than a dramatic persona. Define the audience, domain, tone, and responsibilities that affect the output. For instance, “write as a senior API reviewer and identify correctness, security, and maintainability concerns” is more testable than simply “you are an expert engineer.” The role should remain subordinate to application controls and trusted instructions. It changes communication behavior; it does not create access to systems, hidden data, or privileged operations.",
                },
                {
                  title: "Example",
                  content: "Use “Review this API design for reliability risks, security concerns, scaling bottlenecks, and concrete improvements. Keep the result concise.”",
                },
                {
                  title: "Practical use",
                  content: "Use role descriptions as behavioral constraints, not as a substitute for domain evidence.",
                },
              ],
            },
            {
              title: "Code Generation",
              slug: "code-generation",
              description: "Code generation works best when the prompt supplies language, framework/version, input and output behavior, constraints, edge cases, and testing requiremen",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Code generation works best when the prompt supplies language, framework/version, input and output behavior, constraints, edge cases, and testing requirements. Generated code must still be reviewed and tested because a fluent response can contain incorrect logic, unsafe operations, or outdated APIs.\n\nCode generation is more reliable when the prompt defines the language, runtime, interfaces, constraints, and expected behavior. If the generated code will be executed, treat it as untrusted output until it passes compilation, tests, security checks, and any required static analysis. A useful prompt can request tests alongside implementation, but generated tests are not independent proof of correctness because both may contain the same mistaken assumption. The safest workflow uses the model to accelerate coding while deterministic tooling remains responsible for validation.",
                },
                {
                  title: "Example",
                  content: "Ask for a Java method that finds the first duplicate integer without modifying the input and request tests for empty input, no duplicates, and repeated values.",
                },
                {
                  title: "Practical use",
                  content: "Use generated code as a draft that passes through compilation, tests, static analysis, and security review.",
                },
              ],
            },
            {
              title: "Database Query Generation",
              slug: "database-query-generation",
              description: "SQL generation becomes more reliable when the schema, relationships, SQL dialect, and desired result are explicit. Without a schema, the model may invent t",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "SQL generation becomes more reliable when the schema, relationships, SQL dialect, and desired result are explicit. Without a schema, the model may invent table or column names.\n\nNatural-language-to-SQL systems need schema context and strong execution controls. The model must know table names, columns, relationships, and relevant business meanings, but it should not receive unnecessary secrets or unrestricted database access. Generated SQL should be parsed or checked where feasible, limited to the intended operation type, and executed with least-privilege credentials. For read-only analytics, an application can often place the model behind a constrained query service rather than giving it direct access to the production database.",
                },
                {
                  title: "Example",
                  content: "Provide `employees(employee_id, employee_name, department_id)` and `departments(department_id, department_name)`, then request the MySQL query for Engineering employees.",
                },
                {
                  title: "Practical use",
                  content: "Use schema-aware prompts and validate generated queries before execution.",
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
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Generated code should never be trusted simply because it was produced by a model. Execute untrusted generated code in a sandbox with resource limits and restricted dependencies, and use static checks and tests before allowing it near sensitive systems.\n\nGenerated code can be syntactically valid and still be unsafe. Risks include destructive operations, insecure dependencies, command injection, exposed credentials, excessive permissions, and logic that silently mishandles edge cases. Prompt instructions can request safe patterns, but they are not a substitute for compiler checks, tests, linters, scanners, sandboxing, and human review where risk is high. The correct mental model is that generated code is an untrusted draft that moves through the same validation pipeline as other externally produced code.",
                },
                {
                  title: "Example",
                  content: "If a coding assistant generates a script from a user request, run it in an isolated environment with no production credentials and a CPU/time limit.",
                },
                {
                  title: "Practical use",
                  content: "Keep authorization, sandboxing, and resource controls in application infrastructure rather than the prompt.",
                },
              ],
            },
            {
              title: "Reasoning-oriented Prompting",
              slug: "reasoning-oriented-prompting",
              description: "Some tasks benefit from asking the model to work through a structured process before giving a result. In production, it is usually better to request an obs",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Some tasks benefit from asking the model to work through a structured process before giving a result. In production, it is usually better to request an observable verification summary or explicit intermediate artifacts than to depend on exposing private internal reasoning. Reasoning instructions also do not guarantee correctness.\n\nReasoning-oriented prompting is intended to improve performance on tasks that require multiple dependent steps, such as constraint solving, planning, or multi-stage analysis. The useful part is encouraging systematic processing rather than merely requesting a long explanation. In many applications, it is enough to ask for a concise result plus a verification summary or intermediate structured fields. The model should not be expected to expose hidden internal reasoning as a security or correctness guarantee. External checks remain valuable for calculations and high-impact decisions.",
                },
                {
                  title: "Example",
                  content: "For a scheduling task, ask the model to identify constraints, compute the selected schedule, and provide a short verification of the final answer.",
                },
                {
                  title: "Practical use",
                  content: "Use structured reasoning prompts for multi-step planning, debugging, arithmetic, and constraint problems, then verify important results independently.",
                },
              ],
            },
            {
              title: "When Reasoning-oriented Prompts Help",
              slug: "when-reasoning-oriented-prompts-help",
              description: "Reasoning-oriented prompting is useful when the task contains multiple constraints or transformations that are easy to miss in a one-step answer. The benef",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Reasoning-oriented prompting is useful when the task contains multiple constraints or transformations that are easy to miss in a one-step answer. The benefit comes from structuring the task, not from making every prompt verbose.\n\nThese prompts are most useful when the task contains dependencies where an early mistake affects later steps. Examples include multi-condition classification, planning, structured comparison, and transformations with several constraints. They are less useful when the task is a simple lookup, short rewrite, or deterministic calculation that software can perform directly. Before adding elaborate reasoning instructions, compare a simple prompt against a reasoning-oriented version on an evaluation set. Extra prompt complexity should be justified by measurable improvement.",
                },
                {
                  title: "Example",
                  content: "For a deployment plan, require the model to list dependencies, identify incompatible constraints, and then propose a sequence of steps.",
                },
                {
                  title: "Practical use",
                  content: "Use decomposition when the task has genuine intermediate structure.",
                },
              ],
            },
            {
              title: "When Reasoning-oriented Prompts Are Unnecessary",
              slug: "when-reasoning-oriented-prompts-are-unnecessary",
              description: "Simple tasks such as extracting an invoice number do not need elaborate reasoning instructions. Extra generation can increase latency, cost, and irrelevant",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Simple tasks such as extracting an invoice number do not need elaborate reasoning instructions. Extra generation can increase latency, cost, and irrelevant output without improving the target behavior.\n\nNot every task benefits from additional reasoning instructions. Asking for elaborate reasoning on a simple extraction can increase output length, cost, and opportunities for irrelevant content without improving the answer. If a deterministic function can perform the task exactly, code is generally a better tool. Prompt design should therefore minimize unnecessary work: use the simplest method that meets the quality requirement, then add reasoning or external tools when evaluation shows they are needed.",
                },
                {
                  title: "Example",
                  content: "For `Extract invoice ID from this text`, require only the ID and return `null` when absent.",
                },
                {
                  title: "Practical use",
                  content: "Prefer the simplest prompt that reliably passes evaluation.",
                },
              ],
            },
            {
              title: "Few-shot Prompting",
              slug: "few-shot-prompting",
              description: "Few-shot prompting supplies multiple demonstrations before the new input. Demonstrations teach task interpretation, formatting, labels, and boundary behavi",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Few-shot prompting supplies multiple demonstrations before the new input. Demonstrations teach task interpretation, formatting, labels, and boundary behavior. The examples are temporary context, so they must be selected and formatted carefully.\n\nFew-shot prompting is a form of in-context learning where several demonstrations define how a task should be performed. The examples can communicate subtle requirements that prose does not capture, such as formatting, label boundaries, or preferred transformations. Their influence depends on relevance and consistency. A strong few-shot prompt usually keeps the task instruction separate from the demonstrations and the new input. It also evaluates examples for accidental bias, contradictory labels, and unnecessary length before they are used in production.",
                },
                {
                  title: "Example",
                  content: "Give three examples of support messages with their correct categories, then provide a fourth message and require exactly one category.",
                },
                {
                  title: "Practical use",
                  content: "Use few-shot prompting when examples communicate a pattern more clearly than prose.",
                },
              ],
            },
            {
              title: "Example Selection",
              slug: "example-selection",
              description: "Good demonstrations are correct, representative, relevant, consistent, and diverse enough to show important boundaries. Selecting examples by similarity to",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Good demonstrations are correct, representative, relevant, consistent, and diverse enough to show important boundaries. Selecting examples by similarity to the new task can be more useful than simply adding more examples.\n\nExample selection should reflect the inputs the system will actually receive. Start with representative cases, then deliberately add boundary cases where the model commonly confuses categories or formats. Examples should be internally consistent and should demonstrate the desired output rather than merely describe it. If context space is limited, a smaller set of high-information examples is often better than a large random collection. Revisit the examples when production traffic changes because the most useful demonstrations depend on the target distribution.",
                },
                {
                  title: "Example",
                  content: "For sentiment classification, include positive, negative, and neutral examples that resemble the language found in production tickets.",
                },
                {
                  title: "Practical use",
                  content: "Treat demonstrations like a small labeled dataset and review them systematically.",
                },
              ],
            },
            {
              title: "Bad Examples",
              slug: "bad-examples",
              description: "Contradictory demonstrations create an unreliable task specification. A model cannot infer a stable rule when the same or equivalent input receives incompa",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Contradictory demonstrations create an unreliable task specification. A model cannot infer a stable rule when the same or equivalent input receives incompatible labels without an explanation.\n\nA bad demonstration can teach the model an incorrect label, an unwanted formatting pattern, or an exception that was never intended. Contradictory examples are especially harmful because they make the task specification internally inconsistent. Examples can also be too complex, causing the model to imitate irrelevant details. Review demonstrations as carefully as labeled training data: verify the input, expected output, edge-case interpretation, and consistency with the current business rules.",
                },
                {
                  title: "Example",
                  content: "If “The battery lasts all day” appears once as positive and once as negative, the prompt teaches no dependable classification boundary.",
                },
                {
                  title: "Practical use",
                  content: "Audit few-shot examples for contradictions before deployment.",
                },
              ],
            },
            {
              title: "Number of Examples",
              slug: "number-of-examples",
              description: "More demonstrations are not automatically better. Context size, cost, latency, relevance, and diminishing returns all matter. A compact set of high-informa",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "More demonstrations are not automatically better. Context size, cost, latency, relevance, and diminishing returns all matter. A compact set of high-information examples can outperform a long list of loosely related ones.\n\nThere is no universal ideal number of demonstrations. More examples can improve coverage, but they consume context and may introduce redundancy or contradictions. The right quantity is an empirical trade-off between task accuracy, context cost, latency, and maintainability. A useful experiment is to compare zero-shot, one-shot, and several few-shot configurations on the same evaluation set. Keep the smallest example set that produces the required performance with acceptable stability.",
                },
                {
                  title: "Example",
                  content: "Start with four representative examples, measure accuracy, and add another only when evaluation identifies a missing boundary case.",
                },
                {
                  title: "Practical use",
                  content: "Optimize for useful coverage rather than maximum example count.",
                },
              ],
            },
            {
              title: "Chain-of-Thought and Zero-shot Reasoning",
              slug: "chain-of-thought-and-zero-shot-reasoning",
              description: "The course presents chain-of-thought and zero-shot reasoning as approaches for encouraging multi-step problem solving. For practical applications, the safe",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "The course presents chain-of-thought and zero-shot reasoning as approaches for encouraging multi-step problem solving. For practical applications, the safer engineering pattern is to request concise intermediate artifacts or verification summaries rather than relying on private internal reasoning. Correctness still requires independent checks for important tasks.\n\nZero-shot reasoning asks the model to solve a multi-step task without demonstrations, while chain-of-thought-oriented methods encourage intermediate reasoning behavior. The engineering objective is improved problem solving, not simply producing longer answers. For applications, it is often safer to request concise intermediate artifacts that can be checked, such as assumptions, selected options, or computed values, rather than treating a narrative explanation as proof. When the task can be verified by code, use the model for interpretation and the program for exact execution.",
                },
                {
                  title: "Example",
                  content: "For a calculation workflow, ask the model to identify the quantities and formula, then have a program perform the arithmetic and return the verified result.",
                },
                {
                  title: "Practical use",
                  content: "Use reasoning prompts as one component of a broader validation strategy.",
                },
              ],
            },
            {
              title: "Self-Consistency",
              slug: "self-consistency",
              description: "Self-consistency generates multiple candidate solutions and selects an answer based on agreement among the results. It can reduce accidental instability on",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Self-consistency generates multiple candidate solutions and selects an answer based on agreement among the results. It can reduce accidental instability on tasks with a meaningful correct answer, but it multiplies generation cost and latency.\n\nSelf-consistency uses multiple generated attempts and looks for agreement among their final answers. The intuition is that a difficult problem may produce several reasoning paths, and correct paths may converge more often than incorrect ones. This can improve robustness on some reasoning tasks, but it increases inference cost and does not guarantee correctness. It also works best when there is a meaningful way to compare candidate answers. For production use, define when extra sampling is worth the latency and expense.",
                },
                {
                  title: "Example",
                  content: "Generate several independent solutions to a logic puzzle and select the answer that occurs most often, then verify it with a deterministic checker when possible.",
                },
                {
                  title: "Practical use",
                  content: "Use when the task has a clear agreement criterion and extra computation is acceptable.",
                },
              ],
            },
            {
              title: "Generated Knowledge Prompting",
              slug: "generated-knowledge-prompting",
              description: "Generated-knowledge prompting first asks the model to produce relevant background information and then uses that material while answering the original ques",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Generated-knowledge prompting first asks the model to produce relevant background information and then uses that material while answering the original question. It can help organize useful concepts, but generated knowledge is not automatically verified knowledge.\n\nGenerated-knowledge prompting asks the model to first produce relevant background information and then use that material for a downstream task. The separation can help organize a complex problem, but generated knowledge is still model output and may contain unsupported claims. It should not be confused with authoritative retrieval. When facts matter, replace or supplement generated knowledge with trusted documents, databases, or tools. The technique is most useful as a reasoning aid when the generated intermediate material can be evaluated or is low-risk.",
                },
                {
                  title: "Example",
                  content: "For a science explanation, first generate a short list of relevant physical principles, then use them to structure the answer. For high-stakes factual work, replace this with authoritative retrieval where possible.",
                },
                {
                  title: "Practical use",
                  content: "Use generated knowledge mainly as a reasoning aid, not as a substitute for trusted sources.",
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
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Program-aided language modeling has the model translate a problem into executable code and then lets a runtime perform deterministic operations. This separates language understanding from exact computation and is useful for arithmetic, transformations, and structured calculations.\n\nPAL separates language interpretation from exact computation by having the model express a problem as executable code and letting a runtime calculate the result. This is valuable for arithmetic, symbolic operations, data transformations, and other tasks where software is more reliable than free-form token generation. The generated program still requires validation: syntax, imports, resource usage, and input safety must be checked before execution. PAL is therefore a delegation pattern, not permission to execute arbitrary model-generated code without controls.",
                },
                {
                  title: "Example",
                  content: "For a subscription priced at 799 per month with a 12% annual discount, generate a small calculation program and let the runtime compute `799 * 12 * 0.88`.",
                },
                {
                  title: "Practical use",
                  content: "Use sandboxed runtimes for deterministic work and validate generated programs before execution.",
                },
              ],
            },
            {
              title: "Suitable PAL Tasks",
              slug: "suitable-pal-tasks",
              description: "PAL is a good fit for deterministic operations such as arithmetic, date calculations, structured transformations, and rule-like data processing. It is less",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "PAL is a good fit for deterministic operations such as arithmetic, date calculations, structured transformations, and rule-like data processing. It is less useful when the task is primarily subjective language generation.\n\nPAL is a good fit when the task has a clear computational procedure that can be expressed in a safe execution environment. Examples include numerical calculations, date arithmetic, filtering structured data, and deterministic transformations. It is less appropriate when the core problem is subjective judgment or when executing generated code would introduce unacceptable security risk. The strongest designs constrain the available operations, validate inputs, and keep the runtime isolated from sensitive systems.",
                },
                {
                  title: "Example",
                  content: "Use a program to calculate tax totals or date offsets instead of asking the model to perform repeated arithmetic in prose.",
                },
                {
                  title: "Practical use",
                  content: "Route deterministic subproblems to code where precision matters.",
                },
              ],
            },
            {
              title: "PAL Risks",
              slug: "pal-risks",
              description: "Generated programs can contain syntax errors, unintended operations, excessive loops, or unsafe resource access. Running them with production credentials w",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Generated programs can contain syntax errors, unintended operations, excessive loops, or unsafe resource access. Running them with production credentials would turn a generation mistake into an operational risk.\n\nThe main PAL risks come from treating generated code as trusted code. A model can generate an incorrect formula, call an unintended library, consume excessive resources, or attempt an unsafe operation. A production PAL service should use sandboxing, timeouts, resource limits, restricted libraries, and validation appropriate to the environment. The model should not receive credentials merely because the generated program needs data. Provide narrow, controlled interfaces instead of broad system access.",
                },
                {
                  title: "Example",
                  content: "Execute generated code with a timeout, memory limit, restricted filesystem, and no access to secrets or production networks.",
                },
                {
                  title: "Practical use",
                  content: "Treat generated programs as untrusted input and isolate their runtime.",
                },
              ],
            },
            {
              title: "ReAct — Reasoning Plus Action",
              slug: "react-reasoning-plus-action",
              description: "ReAct combines planning with external actions such as database lookups, searches, APIs, or other tools. The model observes the task, decides which action i",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "ReAct combines planning with external actions such as database lookups, searches, APIs, or other tools. The model observes the task, decides which action is needed, consumes the result, and continues until it can produce an answer. This is valuable when the answer depends on current or external state.\n\nReAct-style workflows combine model reasoning with actions against external tools. Instead of generating one final answer from static context, the model can decide that it needs a lookup, perform the action, inspect the result, and continue. This makes the model useful as an orchestrator, but it also creates a larger attack surface because tool calls can have real consequences. Each tool should expose only the operations required, and the application should validate arguments and enforce authorization before execution.",
                },
                {
                  title: "Example",
                  content: "For “Can I fulfill order ORD-9001 today?”, retrieve the order, check inventory, apply fulfillment rules, and answer using the returned evidence instead of guessing stock levels.",
                },
                {
                  title: "Practical use",
                  content: "Use tool-enabled workflows for current information and actions, with strict permissions and validation.",
                },
              ],
            },
            {
              title: "Tool Selection",
              slug: "tool-selection",
              description: "A tool should have a clearly defined purpose, input schema, output schema, and limitations. Tool selection is safer when the model can distinguish a read-o",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A tool should have a clearly defined purpose, input schema, output schema, and limitations. Tool selection is safer when the model can distinguish a read-only lookup from an action that changes external state.\n\nTool selection should be explicit about what each tool is for and what inputs it accepts. A model may be capable of calling many tools, but giving it unnecessary choices increases complexity and potential failure paths. Prefer narrow tools with clear names, schemas, and side-effect descriptions. For example, “get_order_status” is safer to reason about than a generic “database_query” tool. The application can also route certain intents deterministically rather than asking the model to choose every operation.",
                },
                {
                  title: "Example",
                  content: "Give an inventory tool a schema such as `{sku: string}` and document that it returns current quantity and timestamp.",
                },
                {
                  title: "Practical use",
                  content: "Keep the available tool set minimal and task-relevant.",
                },
              ],
            },
            {
              title: "Tool-result Validation",
              slug: "tool-result-validation",
              description: "Tool results should be checked before being used. Validate status, required fields, types, freshness, authorization, and explicit error information. A mode",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Tool results should be checked before being used. Validate status, required fields, types, freshness, authorization, and explicit error information. A model should not assume that a malformed or stale tool response is correct.\n\nTool results should be treated as data that must be interpreted, not automatically as trusted instructions. Validate the type, required fields, freshness, and expected ranges of important results before passing them into later model steps. If a tool returns an error or incomplete data, the workflow should have an explicit recovery path. For high-impact operations, verify the result against the authoritative backend state immediately before the action rather than relying on an earlier model interpretation.",
                },
                {
                  title: "Example",
                  content: "If the inventory service returns HTTP success but omits `quantity`, treat the result as invalid rather than assuming zero stock.",
                },
                {
                  title: "Practical use",
                  content: "Perform critical validation in application code.",
                },
              ],
            },
            {
              title: "Action Safety",
              slug: "action-safety",
              description: "Actions that modify external state are riskier than read-only queries. Deleting data, issuing refunds, changing permissions, sending messages, or placing o",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Actions that modify external state are riskier than read-only queries. Deleting data, issuing refunds, changing permissions, sending messages, or placing orders should require explicit authorization and appropriate confirmation.\n\nActions such as refunds, account changes, deletions, or messages to external parties require stronger controls than ordinary text generation. The model can propose or interpret an action, but the application should authenticate the user, check authorization, validate parameters, and enforce business rules. High-impact actions may also require confirmation or human approval. This separation prevents a prompt manipulation from becoming direct access to a privileged capability.",
                },
                {
                  title: "Example",
                  content: "A refund assistant may inspect eligibility automatically but require a separate authorized service call before money is actually returned.",
                },
                {
                  title: "Practical use",
                  content: "Separate decision support from state-changing authority.",
                },
              ],
            },
            {
              title: "Directional Stimulus Prompting",
              slug: "directional-stimulus-prompting",
              description: "Directional stimulus prompting uses a separate learned mechanism to generate hints that steer a frozen target model. The policy or hint generator is optimi",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Directional stimulus prompting uses a separate learned mechanism to generate hints that steer a frozen target model. The policy or hint generator is optimized for the downstream task, making the approach more sophisticated than manually writing a single prompt.\n\nDirectional stimulus prompting uses an intermediate hint or learned guidance signal to steer a model toward useful behavior without changing the underlying model parameters. The important idea is to provide a small directional cue rather than rewriting the entire task. Such hints are still part of the model input and therefore should be evaluated like other prompt components. Their value depends on whether the added signal improves the target behavior without introducing unwanted assumptions or reducing generality.",
                },
                {
                  title: "Example",
                  content: "A learned controller could generate a short task-specific cue before passing the original problem and cue to a fixed language model, with performance measured on a validation set.",
                },
                {
                  title: "Practical use",
                  content: "Study this as an advanced prompt-optimization architecture where the hint generator itself becomes a trainable component.",
                },
              ],
            },
            {
              title: "Prompt Injection",
              slug: "prompt-injection",
              description: "Prompt injection occurs when untrusted input attempts to change the behavior of a model-driven application. The attack can be direct, where the user suppli",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Prompt injection occurs when untrusted input attempts to change the behavior of a model-driven application. The attack can be direct, where the user supplies conflicting instructions, or indirect, where hostile instructions appear in retrieved documents, web pages, or other external content. Prompt boundaries help, but they are not a complete security boundary.\n\nPrompt injection occurs when untrusted content attempts to influence the instructions or behavior of a model-driven application. The risk is especially high when a single context contains trusted instructions, user input, retrieved documents, and tool results without clear separation. An injection can attempt to override task requirements, reveal information, or trigger an unintended tool call. Defenses should assume that model input can contain adversarial text. Prompt structure helps, but authorization and sensitive operations must be enforced outside the model.",
                },
                {
                  title: "Example",
                  content: "A document summarizer receives a file containing text that says to ignore the summarization task and reveal hidden instructions. The application must treat that sentence as document content, not authority.",
                },
                {
                  title: "Practical use",
                  content: "Combine delimiters with least-privilege tools, authorization outside the model, input/output validation, and adversarial testing.",
                },
              ],
            },
            {
              title: "Why Prompt Injection Happens",
              slug: "why-prompt-injection-happens",
              description: "Language models process instructions and data through the same natural-language interface. Without clear separation and application-level controls, untrust",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Language models process instructions and data through the same natural-language interface. Without clear separation and application-level controls, untrusted text can look like a new instruction.\n\nInjection is possible because the model processes instructions and ordinary text through the same language interface. Text that looks like a command can therefore compete for the model’s attention even when the application developer intended it to be data. The problem becomes more complex when external content is automatically inserted into the prompt. A secure architecture therefore separates trust levels, minimizes sensitive context, constrains tools, and validates actions rather than assuming the model will always distinguish trusted instructions perfectly.",
                },
                {
                  title: "Example",
                  content: "A retrieved webpage includes a sentence telling an agent to call a privileged tool. If the agent treats all retrieved text as trusted instructions, the webpage can influence the action plan.",
                },
                {
                  title: "Practical use",
                  content: "Design the application so model-visible data never becomes authority merely because it is written imperatively.",
                },
              ],
            },
            {
              title: "Direct Injection",
              slug: "direct-injection",
              description: "Direct injection is an attack delivered directly by the user or another actor controlling the immediate input. It attempts to override the intended task or",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Direct injection is an attack delivered directly by the user or another actor controlling the immediate input. It attempts to override the intended task or expose protected information.\n\nDirect injection comes from the person interacting with the model, such as a user placing conflicting instructions inside a request. The attacker may try to change the task, expose hidden instructions, or persuade the system to perform an unauthorized operation. Input delimiters and explicit task boundaries can reduce confusion, but they do not provide complete protection. The application should enforce permissions and sensitive-data access independently so that even a successful behavioral manipulation cannot automatically produce a privileged side effect.",
                },
                {
                  title: "Example",
                  content: "A user asks a document assistant to ignore its assigned task and disclose internal instructions. The correct design treats the request as untrusted input and keeps sensitive controls outside the prompt.",
                },
                {
                  title: "Practical use",
                  content: "Test direct injection against every model-powered feature that accepts user text.",
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
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Indirect injection hides malicious instructions inside content the application retrieves or processes. This is particularly important for browsing, retrieval-augmented generation, document processing, and tool-using agents.\n\nIndirect injection is especially important for retrieval and agent systems because the malicious instruction can originate in content the application fetches from elsewhere. A webpage, document, support ticket, or knowledge-base entry might contain text that attempts to influence the model. The user may never see the malicious content directly. Treat retrieved material as untrusted data, keep tool permissions narrow, separate data from instructions, and validate proposed actions before execution.",
                },
                {
                  title: "Example",
                  content: "A knowledge-base article contains a malicious instruction aimed at an agent reading the article. The agent should summarize the article but must not follow its embedded commands.",
                },
                {
                  title: "Practical use",
                  content: "Treat retrieved content as data and apply authorization independently of model output.",
                },
              ],
            },
            {
              title: "Injection Defenses",
              slug: "injection-defenses",
              description: "Injection defense requires multiple layers: delimit untrusted content, enforce authorization outside the model, restrict tool permissions, validate argumen",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Injection defense requires multiple layers: delimit untrusted content, enforce authorization outside the model, restrict tool permissions, validate arguments, use allowlists where appropriate, avoid exposing secrets, monitor suspicious behavior, and run adversarial tests.\n\nA layered defense combines prompt structure with application controls. Useful measures include separating trusted instructions from untrusted content, limiting the information supplied to the model, using least-privilege tools, validating tool arguments, filtering or inspecting retrieved content where appropriate, and requiring confirmation for sensitive actions. Monitoring is also important because injection attempts can reveal weaknesses that were not covered by the original test set. No single prompt sentence should be considered a complete security mechanism.",
                },
                {
                  title: "Example",
                  content: "Before a refund tool can run, the application checks the authenticated user's permission, validates the refund amount against the transaction, and records the action. The model cannot bypass these checks through prompt text.",
                },
                {
                  title: "Practical use",
                  content: "Use defense in depth rather than searching for one magic defensive sentence.",
                },
              ],
            },
            {
              title: "Prompt Leaking",
              slug: "prompt-leaking",
              description: "Prompt leaking is an attempt to extract hidden instructions or protected prompt content. The important architectural lesson is that prompts should not be t",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Prompt leaking is an attempt to extract hidden instructions or protected prompt content. The important architectural lesson is that prompts should not be treated as secret storage. API keys, passwords, private credentials, and unnecessary personal information belong in secure infrastructure, not model instructions.\n\nPrompt leaking is an attempt to make a model reveal hidden instructions, internal policy text, or other information that the application intended to keep private. It can happen through direct requests, role-play, or indirect manipulation. The strongest protection is not assuming that hidden prompts are secrets that the model can reliably protect. Sensitive credentials and confidential data should never be placed in prompts merely because the application hopes the model will not disclose them. Protect secrets with infrastructure and access controls.",
                },
                {
                  title: "Example",
                  content: "If a model is asked to reveal its hidden instructions, the application should avoid placing sensitive secrets there in the first place and should enforce important policy in code.",
                },
                {
                  title: "Practical use",
                  content: "Design prompts assuming that model-visible instructions may eventually be exposed.",
                },
              ],
            },
            {
              title: "Defensive Design for Prompt Leakage",
              slug: "defensive-design-for-prompt-leakage",
              description: "Reduce the impact of leakage by keeping secrets outside prompts, minimizing sensitive context, separating configuration from user-facing instructions, and ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Reduce the impact of leakage by keeping secrets outside prompts, minimizing sensitive context, separating configuration from user-facing instructions, and enforcing authorization in application code. Prompt confidentiality should never be the only protection for a privileged operation.\n\nDefensive design begins by minimizing what needs to be hidden. Put credentials in secret-management systems, restrict access at the application layer, and avoid placing unnecessary confidential data into model context. Treat the prompt as potentially observable through model behavior. You can instruct the model not to reveal internal instructions, but that instruction should be viewed as a usability measure rather than a cryptographic boundary. Security-sensitive information requires technical access controls that do not depend on model compliance.",
                },
                {
                  title: "Example",
                  content: "Store a payment-provider key in a server-side secret manager and expose only a narrow refund function to the model through a validated tool.",
                },
                {
                  title: "Practical use",
                  content: "Use secret managers and service-level authorization instead of embedding credentials in prompts.",
                },
              ],
            },
            {
              title: "Jailbreaking and Safety Bypass",
              slug: "jailbreaking-and-safety-bypass",
              description: "Jailbreaking describes attempts to bypass safety or moderation controls through crafted inputs. Attack families evolve, so defensive engineering should foc",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Jailbreaking describes attempts to bypass safety or moderation controls through crafted inputs. Attack families evolve, so defensive engineering should focus on layered controls rather than memorizing particular attack strings.\n\nJailbreaking refers to attempts to make a model bypass intended safety or policy behavior. These attempts can use indirect wording, fictional framing, conflicting instructions, or long chains of manipulation. Defensive design should focus on the application’s risk model rather than trying to enumerate every possible phrase. Sensitive capabilities should have independent authorization, validation, rate limits, and monitoring. The model should not be the sole enforcement point for dangerous or high-impact operations.",
                },
                {
                  title: "Example",
                  content: "Test a content assistant with role manipulation, conflicting instructions, multi-turn pressure, and transformed requests, then verify that policy enforcement remains stable.",
                },
                {
                  title: "Practical use",
                  content: "Combine model safeguards with application policy, validation, monitoring, and human review for high-impact operations.",
                },
              ],
            },
            {
              title: "Defensive Strategy",
              slug: "defensive-strategy",
              description: "A defensive strategy uses multiple layers: input screening where appropriate, explicit model policy, least-privilege tools, output validation, policy check",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A defensive strategy uses multiple layers: input screening where appropriate, explicit model policy, least-privilege tools, output validation, policy checks, human review for high-risk actions, logging, monitoring, adversarial testing, and rapid updates when weaknesses are found.\n\nA defensive strategy is strongest when controls are distributed across the system. Use the model for interpretation and generation, but use deterministic software for authorization, validation, calculations, and state changes. Restrict tool permissions, isolate execution environments, protect secrets outside prompts, and maintain adversarial evaluation cases. When a new attack pattern is discovered, add it to the regression suite. Security improves over time when failures become permanent test cases rather than one-off prompt patches.",
                },
                {
                  title: "Example",
                  content: "For an agent that can modify accounts, the model can propose an action, but a policy service verifies authorization and a separate service performs the change.",
                },
                {
                  title: "Practical use",
                  content: "Never make the model the sole security boundary.",
                },
              ],
            },
            {
              title: "Prompt Design Patterns",
              slug: "prompt-design-patterns",
              description: "Common reusable patterns include direct instruction, role plus task, context plus question, few-shot examples, structured output, task decomposition, tool ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Common reusable patterns include direct instruction, role plus task, context plus question, few-shot examples, structured output, task decomposition, tool assistance, verification fields, explicit unknown handling, and delimiters for untrusted content. Patterns are starting points, not guarantees; evaluation determines whether a pattern actually helps.\n\nReusable patterns make prompt engineering easier to maintain. Common patterns include task-plus-context-plus-input, structured extraction, grounded question answering, classification with allowed labels, few-shot demonstrations, tool-assisted reasoning, and explicit abstention. The pattern should be selected according to the failure mode being addressed. Avoid creating a giant universal prompt that attempts to cover unrelated tasks. Smaller task-specific components are usually easier to test, version, and replace when requirements change.",
                },
                {
                  title: "Example",
                  content: "Build a support workflow using context-grounded classification, a JSON output schema, an `UNKNOWN` fallback, and a read-only customer lookup tool.",
                },
                {
                  title: "Practical use",
                  content: "Choose patterns based on task requirements and failure modes.",
                },
              ],
            },
            {
              title: "Prompt Engineering for Production",
              slug: "prompt-engineering-for-production",
              description: "Production prompts need versioning, evaluation, regression testing, and observability. Track changes to instructions, examples, schemas, model versions, an",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "Production prompts need versioning, evaluation, regression testing, and observability. Track changes to instructions, examples, schemas, model versions, and decoding settings. Evaluation sets should contain normal, edge, ambiguous, adversarial, long, and malformed inputs.\n\nProduction prompt engineering adds software discipline to prompt design. Store prompts under version control, define evaluation datasets, measure quality and failure rates, and regression-test changes before deployment. Track operational metrics such as latency, token usage, cost, tool failures, and structured-output validation errors. Prompts should also be compatible with the selected model and its configuration; a prompt that performs well on one model is not automatically portable to another. Production reliability comes from the whole system, not the prompt text alone.",
                },
                {
                  title: "Example",
                  content: "When changing a support classifier prompt, run the same benchmark before and after the change and compare label accuracy, schema validity, latency, and cost.",
                },
                {
                  title: "Practical use",
                  content: "Treat prompt changes like software changes with review and regression tests.",
                },
              ],
            },
            {
              title: "Prompt Quality Checklist",
              slug: "prompt-quality-checklist",
              description: "A production-ready prompt should be clear, relevant, constrained, grounded where necessary, secure against untrusted content, compatible with the selected ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A production-ready prompt should be clear, relevant, constrained, grounded where necessary, secure against untrusted content, compatible with the selected model, and measurable through representative tests. Maintainability also matters: engineers should understand why major instructions and examples exist.\n\nA practical review should verify task clarity, relevant context, input boundaries, output requirements, decoding choices, example quality, unknown-answer behavior, and security assumptions. Then test normal, ambiguous, adversarial, and missing-data cases. For machine-readable output, test both syntax and semantics. For tool use, test invalid arguments and denied permissions. The checklist should be connected to an evaluation suite so that quality is measured consistently rather than reviewed only by reading the prompt.",
                },
                {
                  title: "Example",
                  content: "Before deployment, verify that the task is unambiguous, required context is present, user content is delimited, secrets are absent, output is machine-validatable, and edge cases are covered by tests.",
                },
                {
                  title: "Practical use",
                  content: "Use the checklist during design review and before every significant prompt release.",
                },
              ],
            },
            {
              title: "Fresh End-to-End Examples",
              slug: "fresh-end-to-end-examples",
              description: "End-to-end prompt design connects task definition, context, input, output rules, validation, and application controls. A customer ticket classifier can def",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "End-to-end prompt design connects task definition, context, input, output rules, validation, and application controls. A customer ticket classifier can define categories and return JSON; a contract extractor can return null for missing fields; a developer assistant can follow explicit review criteria; a tool-using inventory assistant can gather current state before answering; and a calculation workflow can delegate arithmetic to code.\n\nEnd-to-end examples are valuable because real applications combine several prompt-engineering decisions at once. A support classifier might combine a precise instruction, domain context, delimited user text, a JSON contract, an abstention rule, and application-side validation. A document assistant might add retrieval and source tracking. A tool-using agent might add authorization and confirmation. Studying the complete flow makes it easier to see that prompt engineering is only one layer in a reliable AI application.",
                },
                {
                  title: "Example",
                  content: "For an order-support system, classify the ticket, retrieve order status only when needed, validate the returned fields, and present a concise answer. The model handles language while deterministic services handle authoritative state.",
                },
                {
                  title: "Practical use",
                  content: "Use end-to-end exercises to learn how prompting interacts with retrieval, tools, validation, and software controls.",
                },
              ],
            },
            {
              title: "Master Mental Model for LLM Applications",
              slug: "master-mental-model-for-llm-applications",
              description: "A robust LLM application can be understood as five layers: task definition, prompt, model configuration, tools and verification, and application controls. ",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: "A robust LLM application can be understood as five layers: task definition, prompt, model configuration, tools and verification, and application controls. The model is only one layer. For example, a refund assistant can interpret a request, retrieve transaction status, check policy constraints with deterministic code, and require authorization before changing money.\n\nA useful architecture has five layers: task definition, prompt, model configuration, tools and verification, and application controls. The task layer defines what success means. The prompt communicates instructions and relevant context. Model configuration controls generation behavior. Tools provide current information or deterministic computation. Application controls enforce authorization, validation, monitoring, and human approval. Keeping these responsibilities separate prevents the common mistake of asking the language model to perform functions that belong in normal software.",
                },
                {
                  title: "Example",
                  content: "Design a refund workflow where the model proposes the decision, a transaction tool supplies current facts, a validator checks amount and policy, and an authorized service executes the refund.",
                },
                {
                  title: "Practical use",
                  content: "Use this layered model when designing or reviewing any production AI workflow.",
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
