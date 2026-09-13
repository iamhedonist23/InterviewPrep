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
  name: "Generative AI & Machine Learning",
  slug: "generative-ai-machine-learning",
  description: "A focused learning path covering AI foundations, machine learning, generative AI, LLM internals, safety, reliability, and production AI engineering.",
  icon: "🤖",
  sortOrder: 20,
  paths: [
    {
      name: "Beginner",
      slug: "beginner",
      description: "AI and machine learning foundations, core generative AI concepts, and the basic LLM pipeline.",
      level: StudyLevel.BEGINNER,
      modules: [
        {
          title: "AI Foundations",
          slug: "ai-foundations",
          description: "Learn ai foundations through focused explanations and runnable examples.",
          topics: [
            {
              title: "AI, Machine Learning, Deep Learning, and Generative AI",
              slug: "ai-machine-learning-deep-learning-and-generative-ai",
              description: "AI is the broad field; machine learning learns patterns from data; deep learning uses multilayer neural networks; generative AI produces new content. These categories overlap, but they are not interchangeable.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI is the broad field; machine learning learns patterns from data; deep learning uses multilayer neural networks; generative AI produces new content. These categories overlap, but they are not interchangeable. A chatbot is an application, while an LLM is a model used by that application.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A useful hierarchy is AI → machine learning → deep learning, with generative AI describing systems that generate content rather than a strict child category of every deep-learning system. Machine learning can solve classification or regression without generating anything. Deep learning can perform recognition or prediction. Generative models learn distributions or representations that allow them to produce new sequences, images, audio, or other artifacts. In production, the distinction matters because the model is only one component: application code still handles identity, authorization, data access, business rules, validation, observability, and recovery.`,
                },
                {
                  title: "Worked example",
                  content: `Consider an employee-support application. A deterministic rule can verify whether an employee may access a document; an ML classifier can route the request; an LLM can draft an explanation; retrieval can provide current policy text. Each component solves a different part of the problem.`,
                },
                {
                  title: "Practical use",
                  content: `Map a real feature into four layers: deterministic application logic, learned predictive model, generative model, and surrounding infrastructure. Explain why each layer exists and which layer is authoritative.`,
                },
                {
                  title: "Deep mental model",
                  content: `Think of AI as a toolbox, not a single technology. The further a component moves from explicit rules toward learned generation, the more the system needs evaluation, uncertainty handling, and runtime controls.`,
                },
                {
                  title: "Interview focus",
                  content: `Be ready to distinguish AI, ML, deep learning, generative AI, foundation models, LLMs, and AI applications. A strong answer explains that a model's capability does not replace application-level authorization or validation.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not claim that every AI system learns, that every generative model is an LLM, or that a chatbot itself is the model. Do not put authoritative permissions or financial calculations under probabilistic generation.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use deterministic logic for exact rules, supervised ML for learned predictions, and generative models when flexible content or language interaction creates value. Avoid a generative model when a small deterministic function solves the problem more reliably.`,
                },
                {
                  title: "Production scenario",
                  content: `A support platform can combine retrieval, an LLM, deterministic policy checks, logging, rate limits, and human escalation. The model drafts; trusted services decide what data may be exposed and which actions may execute.`,
                },
                {
                  title: "Related concepts",
                  content: `Machine learning paradigms, neural networks, foundation models, LLMs, prompting, retrieval-augmented generation, evaluation, guardrails, and AI system architecture.`,
                }
              ],
            },
            {
              title: "Evolution of AI Applications",
              slug: "evolution-of-ai-applications",
              description: "AI applications evolved from explicit rules toward statistical learning, deep learning, and foundation-model-based systems.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI applications evolved from explicit rules toward statistical learning, deep learning, and foundation-model-based systems. Newer approaches did not make deterministic software obsolete; they expanded the range of problems software can address.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Rule systems are strongest when domain knowledge can be written explicitly. Statistical ML learns patterns from examples. Deep learning improved representation learning for complex inputs such as images, speech, and text. Foundation models generalize across many tasks and can be adapted at runtime. Each transition brought new capabilities and new failure modes, so technology selection should follow the problem rather than fashion.`,
                },
                {
                  title: "Worked example",
                  content: `An invoice pipeline might use deterministic parsing for a known file format, ML for anomaly detection, and a generative model to explain an anomaly to an operator.`,
                },
                {
                  title: "Practical use",
                  content: `For one business process, design a rule-only version first, then identify the exact step where learned behavior would add value.`,
                },
                {
                  title: "Deep mental model",
                  content: `The historical progression is a shift in where knowledge lives: hand-written rules, learned parameters, and increasingly reusable pretrained representations.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why AI history is not simply a linear replacement of rules by neural networks. Discuss data, compute, generalization, auditability, and failure modes.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not equate newer with better. A large model can be slower, more expensive, less predictable, and harder to validate than a small algorithm.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Choose the simplest technique that meets quality requirements. Escalate to ML or generative AI when explicit logic becomes brittle or the task genuinely requires learned or open-ended behavior.`,
                },
                {
                  title: "Production scenario",
                  content: `Use deterministic workflows around probabilistic components: classify or generate where flexibility helps, but validate schema, permissions, amounts, and state transitions with ordinary software.`,
                },
                {
                  title: "Related concepts",
                  content: `Expert systems, statistical learning, deep learning, foundation models, model selection, evaluation, and production architecture.`,
                }
              ],
            },
            {
              title: "Rule-Based and Logic Systems",
              slug: "rule-based-and-logic-systems",
              description: "A rule-based system represents domain knowledge explicitly as facts, conditions, and actions.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `A rule-based system represents domain knowledge explicitly as facts, conditions, and actions.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A rule engine evaluates known facts against rules such as IF condition THEN action. This is attractive when policies are explicit, deterministic, explainable, and frequently audited. The weakness is combinatorial growth: as exceptions interact, rule sets become difficult to maintain. A hybrid design can let an AI model interpret ambiguous input while deterministic rules remain authoritative for policy.`,
                },
                {
                  title: "Worked example",
                  content: `A refund service can check \`verifiedCustomer\`, \`amount > 0\`, and \`amount <= policyLimit\` before permitting an operation. The decision can be logged with the exact rules that fired.`,
                },
                {
                  title: "Practical use",
                  content: `Write three rules for a support workflow and test normal, conflicting, missing-data, and boundary cases.`,
                },
                {
                  title: "Deep mental model",
                  content: `Rules are executable policy. Their value comes from predictable state transitions, not from sounding intelligent.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss forward chaining, rule evaluation, explainability, and why business-critical constraints should not depend solely on model instructions.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Avoid contradictory rules without precedence, hidden side effects, and placing rapidly changing natural-language knowledge into hard-coded conditions.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use rules for authorization, limits, validation, calculations, and deterministic workflows. Avoid them when the input is highly ambiguous or the rule space changes faster than it can be maintained.`,
                },
                {
                  title: "Production scenario",
                  content: `A customer-service assistant can interpret a request with an LLM, but a policy service determines whether the customer is eligible for a refund and records the decision.`,
                },
                {
                  title: "Related concepts",
                  content: `Expert systems, decision tables, authorization, guardrails, deterministic systems, and hybrid AI architecture.`,
                }
              ],
            },
            {
              title: "Early Machine Learning",
              slug: "early-machine-learning",
              description: "Early machine learning moved part of software behavior from hand-written rules to parameters learned from examples or feedback.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Early machine learning moved part of software behavior from hand-written rules to parameters learned from examples or feedback.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The fundamental change is that engineers specify an objective and learning procedure rather than enumerating every decision. The model can discover statistical relationships, but it can also learn irrelevant or biased correlations. Data collection, feature design, evaluation, and generalization therefore become software-engineering concerns.`,
                },
                {
                  title: "Worked example",
                  content: `A message classifier can learn from labeled examples of normal and urgent messages instead of maintaining hundreds of keyword rules.`,
                },
                {
                  title: "Practical use",
                  content: `Take a rule-based classifier and list which examples would be required to train an equivalent learned model.`,
                },
                {
                  title: "Deep mental model",
                  content: `Code defines how learning happens; data defines much of what behavior is learned.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain the difference between training a model and writing a deterministic rule, especially in terms of generalization and failure modes.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not assume more training examples automatically produce better behavior. Leakage, biased sampling, noisy labels, and target mismatch can dominate model quality.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use learning when patterns are difficult to encode explicitly and enough representative data exists. Avoid it when a transparent rule solves the task reliably.`,
                },
                {
                  title: "Production scenario",
                  content: `An ML classifier can route support tickets, while a deterministic fallback handles malformed requests and a monitoring system tracks distribution drift.`,
                },
                {
                  title: "Related concepts",
                  content: `Supervised learning, statistical ML, deep learning, data quality, evaluation, and model monitoring.`,
                }
              ],
            },
          ],
        },
        {
          title: "Machine Learning Foundations",
          slug: "machine-learning-foundations",
          description: "Learn machine learning foundations through focused explanations and runnable examples.",
          topics: [
            {
              title: "AI Winters and the Importance of Realistic Expectations",
              slug: "ai-winters-and-the-importance-of-realistic-expectations",
              description: "AI winters are periods when expectations and investment fell after AI systems failed to meet ambitious promises. The engineering lesson is to validate value instead of assuming technology alone creates it.",
              estimatedMinutes: 18,
              sections: [
                {
                  title: "Concept",
                  content: `AI winters are periods when expectations and investment fell after AI systems failed to meet ambitious promises. The engineering lesson is to validate value instead of assuming technology alone creates it.`,
                },
                {
                  title: "Detailed explanation",
                  content: `AI projects fail for many reasons: unclear objectives, unrealistic evaluation, insufficient data, high operating cost, poor workflow integration, or unreliable outputs. A useful AI project begins with a measurable user problem and explicit quality, latency, cost, privacy, and recovery requirements.`,
                },
                {
                  title: "Worked example",
                  content: `If a support assistant saves agents only five seconds per case but introduces frequent factual errors, the feature may have negative value despite impressive demos.`,
                },
                {
                  title: "Practical use",
                  content: `Define success metrics for an AI feature before selecting a model.`,
                },
                {
                  title: "Deep mental model",
                  content: `A model benchmark measures capability; a product metric measures usefulness. They are related but not identical.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss why an excellent model can still produce a failed AI product.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Avoid demo-driven development, single-example evaluation, and ignoring operational cost or human review.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use AI when it improves a measurable workflow. Avoid it when the task is already solved more cheaply and reliably by deterministic software.`,
                },
                {
                  title: "Production scenario",
                  content: `Run an offline evaluation set, pilot with real users, monitor quality and cost, and maintain a fallback path before broad rollout.`,
                },
                {
                  title: "Related concepts",
                  content: `Evaluation, model selection, cost economics, UX, observability, and production AI.`,
                }
              ],
            },
            {
              title: "Expert Systems",
              slug: "expert-systems",
              description: "An expert system separates domain knowledge from an inference mechanism that applies rules to a current case.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `An expert system separates domain knowledge from an inference mechanism that applies rules to a current case.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A classic architecture contains a knowledge base, working memory, inference engine, and interaction layer. The separation makes reasoning explicit and auditable. Modern hybrid systems preserve the same idea by combining probabilistic interpretation with deterministic policy and workflow services.`,
                },
                {
                  title: "Worked example",
                  content: `A feature-access service can keep customer facts in working memory and apply explicit eligibility rules through an inference function.`,
                },
                {
                  title: "Practical use",
                  content: `Separate facts from rules in a small decision problem, then identify where an inference engine would operate.`,
                },
                {
                  title: "Deep mental model",
                  content: `Facts describe the case; rules describe allowed reasoning; the engine determines which rules apply.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why expert systems were useful and why rule maintenance becomes difficult at scale.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not treat a large rule table as equivalent to learned intelligence, and do not allow untrusted model output to become authoritative facts without validation.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use expert-system patterns when rules are explicit and auditability matters.`,
                },
                {
                  title: "Production scenario",
                  content: `A lending workflow can use a model to extract information from documents while an authoritative policy engine determines eligibility.`,
                },
                {
                  title: "Related concepts",
                  content: `Rule engines, decision tables, knowledge bases, guardrails, and hybrid systems.`,
                }
              ],
            },
            {
              title: "Big Data and Statistical Machine Learning",
              slug: "big-data-and-statistical-machine-learning",
              description: "Large datasets made statistical learning useful at scales where manual rules or small samples were insufficient, but data volume alone does not guarantee better models.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Large datasets made statistical learning useful at scales where manual rules or small samples were insufficient, but data volume alone does not guarantee better models.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Statistical ML depends on representative data, meaningful targets, suitable features or representations, and honest evaluation. Distributed storage and compute can make training practical for large datasets, but duplicated records, leakage, biased sampling, and label errors can make a huge dataset misleading.`,
                },
                {
                  title: "Worked example",
                  content: `A machine-failure model may learn from temperature, vibration, and maintenance history. If records from the future leak into training, the offline score can look excellent while production performance collapses.`,
                },
                {
                  title: "Practical use",
                  content: `Audit a hypothetical dataset for leakage, duplicates, missing labels, and distribution mismatch before training.`,
                },
                {
                  title: "Deep mental model",
                  content: `The model learns from the evidence you provide, not from the business meaning you intended.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why representative data and leakage prevention matter more than raw dataset size.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Confusing correlation with causation, random-splitting time-dependent data, and ignoring class imbalance.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use statistical learning when measurable patterns exist and representative data is available.`,
                },
                {
                  title: "Production scenario",
                  content: `Build a reproducible data pipeline, version training data, validate schemas, evaluate on realistic holdouts, and monitor drift after deployment.`,
                },
                {
                  title: "Related concepts",
                  content: `Supervised learning, evaluation, feature engineering, data leakage, drift, and MLOps.`,
                }
              ],
            },
            {
              title: "Deep Learning",
              slug: "deep-learning",
              description: "Deep learning uses multilayer neural networks to learn representations and transformations from data.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Deep learning uses multilayer neural networks to learn representations and transformations from data.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A neural network applies parameterized transformations, nonlinearities, and learned weights. During training, a loss function measures error and optimization adjusts parameters, typically through gradients. Depth allows representations to be composed, but performance depends on architecture, data, optimization, regularization, and compute.`,
                },
                {
                  title: "Worked example",
                  content: `An image model may learn low-level visual patterns in early layers and combine them into increasingly task-specific representations in later layers.`,
                },
                {
                  title: "Practical use",
                  content: `Draw a three-layer network and label input, parameters, activations, loss, and gradient flow.`,
                },
                {
                  title: "Deep mental model",
                  content: `Training is an optimization loop: predict → measure loss → compute gradients → update parameters → repeat.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain forward pass, loss, backpropagation, gradient descent, overfitting, and why deep learning needs substantial data/compute in many applications.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not describe deep learning as simply 'many layers' without discussing learned parameters and optimization. Do not assume training accuracy proves generalization.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use deep learning for complex high-dimensional patterns such as vision, speech, and language. Avoid it for trivial deterministic logic.`,
                },
                {
                  title: "Production scenario",
                  content: `Use versioned training data and model artifacts, reproducible training, accelerator-aware serving, latency monitoring, and rollback capability.`,
                },
                {
                  title: "Related concepts",
                  content: `Neural networks, optimization, embeddings, Transformers, regularization, and model serving.`,
                }
              ],
            },
          ],
        },
        {
          title: "LLM Foundations",
          slug: "llm-foundations",
          description: "Learn llm foundations through focused explanations and runnable examples.",
          topics: [
            {
              title: "Foundation Models",
              slug: "foundation-models",
              description: "A foundation model is broadly trained so its learned capabilities can be adapted to many downstream tasks.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `A foundation model is broadly trained so its learned capabilities can be adapted to many downstream tasks.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Foundation models shift effort from training a separate model for every task toward reusing a broadly pretrained model. Adaptation can happen through prompting, retrieval, tool use, fine-tuning, or other techniques. The model remains a component; application-specific permissions, context, evaluation, and business logic live around it.`,
                },
                {
                  title: "Worked example",
                  content: `One foundation model can support summarization, coding assistance, document analysis, and support chat when each application supplies different instructions and context.`,
                },
                {
                  title: "Practical use",
                  content: `For one product, list which requirements belong in the base model and which belong in application logic.`,
                },
                {
                  title: "Deep mental model",
                  content: `Think of a foundation model as a general capability layer; runtime context turns that capability into a task-specific system.`,
                },
                {
                  title: "Interview focus",
                  content: `Define foundation model and distinguish pretraining from downstream adaptation.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming broad pretraining means current knowledge, domain correctness, or guaranteed factuality.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use foundation models when multiple tasks benefit from shared general capability and the adaptation cost is acceptable.`,
                },
                {
                  title: "Production scenario",
                  content: `Version prompts, retrieval indexes, model identifiers, evaluation sets, and application policies independently so each can change safely.`,
                },
                {
                  title: "Related concepts",
                  content: `Pretraining, LLMs, prompting, fine-tuning, embeddings, RAG, and model selection.`,
                }
              ],
            },
            {
              title: "Large Language Models",
              slug: "large-language-models",
              description: "An LLM generates language by modeling relationships among tokens and producing a probability distribution over possible continuations.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `An LLM generates language by modeling relationships among tokens and producing a probability distribution over possible continuations.`,
                },
                {
                  title: "Detailed explanation",
                  content: `During generation, the model processes the supplied context and produces scores for candidate next tokens. The output is generated from learned parameters rather than retrieved from a guaranteed factual database. This explains both fluency and the possibility of unsupported statements. Reliability therefore comes from the full system, including retrieval, validation, constrained tools, and evaluation.`,
                },
                {
                  title: "Worked example",
                  content: `If the model assigns probabilities to \`approved\`, \`pending\`, and \`rejected\`, decoding chooses one according to the selected strategy and then the process repeats with the new token.`,
                },
                {
                  title: "Practical use",
                  content: `Trace three generation steps and distinguish model probabilities from the final text returned to a user.`,
                },
                {
                  title: "Deep mental model",
                  content: `LLM generation is an iterative probabilistic loop over tokens, not a single lookup operation.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain next-token prediction, context, parameters, decoding, and why fluent output is not proof of truth.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Calling an LLM a database, assuming it always retrieves facts, or treating temperature as a factuality control.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use LLMs for language-heavy tasks with tolerance for probabilistic output and appropriate validation.`,
                },
                {
                  title: "Production scenario",
                  content: `Add retrieval for current facts, structured output validation, rate limits, tracing, content controls, and human escalation for high-impact cases.`,
                },
                {
                  title: "Related concepts",
                  content: `Tokenization, Transformers, attention, decoding, prompting, RAG, and hallucination.`,
                }
              ],
            },
            {
              title: "GPT and Pretraining",
              slug: "gpt-and-pretraining",
              description: "GPT refers to generative pretrained Transformer-based language-model families. Pretraining builds broad statistical capability before application-specific adaptation.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `GPT refers to generative pretrained Transformer-based language-model families. Pretraining builds broad statistical capability before application-specific adaptation.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Pretraining learns parameters from large-scale data using an objective defined by the training procedure. Later stages can improve instruction following or specialize behavior. Runtime prompts and retrieved context are separate from what was learned during pretraining. This distinction is important because application data that is current today may not be part of the model's pretrained parameters.`,
                },
                {
                  title: "Worked example",
                  content: `A support application can provide a base instruction plus current product documentation at runtime instead of assuming the model's pretrained knowledge contains the latest policy.`,
                },
                {
                  title: "Practical use",
                  content: `Separate a system's pretrained capability, runtime prompt, retrieved context, and tool results on an architecture diagram.`,
                },
                {
                  title: "Deep mental model",
                  content: `Pretraining creates reusable capability; runtime context supplies the information needed for a particular request.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain what pretraining means and why runtime context is not the same as changing model parameters.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Do not imply that every GPT model has identical architecture, training data, context limits, or capabilities.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use pretrained models when broad language capability is valuable; use adaptation techniques when general behavior is insufficient.`,
                },
                {
                  title: "Production scenario",
                  content: `Track model version and prompt version separately, and evaluate each model upgrade because behavior can change even when application code does not.`,
                },
                {
                  title: "Related concepts",
                  content: `Foundation models, Transformers, self-supervised learning, tokenization, fine-tuning, and evaluation.`,
                }
              ],
            },
            {
              title: "Supervised Learning",
              slug: "supervised-learning",
              description: "Supervised learning learns a mapping from inputs to known target labels or values.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Supervised learning learns a mapping from inputs to known target labels or values.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Training examples contain features and a target. Classification predicts categories; regression predicts continuous values. The central engineering concern is generalization: evaluation must use data that represents unseen production cases. Splitting strategy depends on the data-generating process; time-dependent problems often require chronological validation rather than random shuffling.`,
                },
                {
                  title: "Worked example",
                  content: `A support-routing model can learn from historical ticket text paired with the correct queue. A separate evaluation set measures performance on tickets not used for fitting.`,
                },
                {
                  title: "Practical use",
                  content: `Given a dataset, identify input features, target, train/validation/test strategy, and an appropriate metric.`,
                },
                {
                  title: "Deep mental model",
                  content: `The model is learning a rule from examples; the test set asks whether that learned rule transfers beyond the examples it saw.`,
                },
                {
                  title: "Interview focus",
                  content: `Distinguish classification and regression, training and evaluation, overfitting and underfitting, and data leakage.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Using the test set repeatedly for tuning, leaking target information into features, and optimizing a metric that does not reflect business cost.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use supervised learning when reliable labels or targets exist and prediction quality can be measured.`,
                },
                {
                  title: "Production scenario",
                  content: `Monitor prediction distributions, error rates, delayed ground truth, drift, and performance by important segments.`,
                },
                {
                  title: "Related concepts",
                  content: `Loss functions, evaluation metrics, cross-validation, overfitting, leakage, and model monitoring.`,
                }
              ],
            },
          ],
        },
        {
          title: "Core Generative AI Concepts",
          slug: "core-generative-ai-concepts",
          description: "Learn core generative ai concepts through focused explanations and runnable examples.",
          topics: [
            {
              title: "Unsupervised Learning",
              slug: "unsupervised-learning",
              description: "Unsupervised learning searches for structure in data without predefined target labels.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Unsupervised learning searches for structure in data without predefined target labels.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Clustering, dimensionality reduction, and representation learning are common examples. Because there is no single supplied correct answer, evaluation often combines mathematical measures, visualization, stability, and domain usefulness. A discovered cluster is not automatically a meaningful business segment.`,
                },
                {
                  title: "Worked example",
                  content: `Customer vectors can be grouped into low- and high-activity regions, but the resulting groups must be checked for stability and business meaning.`,
                },
                {
                  title: "Practical use",
                  content: `Cluster a small dataset conceptually, then ask whether the clusters remain meaningful after changing scale or distance assumptions.`,
                },
                {
                  title: "Deep mental model",
                  content: `Unsupervised learning discovers structure under an objective; it does not discover objective business truth automatically.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain clustering, why scaling matters, and why evaluation is harder without labels.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Treating arbitrary clusters as facts, ignoring feature scaling, and selecting a cluster count without a reason.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use it for exploration, segmentation, anomaly analysis, or representation discovery. Avoid it when the real task has a well-defined target that supervised learning can model.`,
                },
                {
                  title: "Production scenario",
                  content: `Version preprocessing and clustering parameters, monitor population shifts, and validate that segments remain useful over time.`,
                },
                {
                  title: "Related concepts",
                  content: `Clustering, dimensionality reduction, embeddings, anomaly detection, and evaluation.`,
                }
              ],
            },
            {
              title: "Semi-Supervised Learning",
              slug: "semi-supervised-learning",
              description: "Semi-supervised learning combines a smaller labeled dataset with a larger unlabeled dataset.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Semi-supervised learning combines a smaller labeled dataset with a larger unlabeled dataset.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The labeled portion provides explicit task information while unlabeled examples can contribute information about input structure, depending on the method's assumptions. The approach is useful when labels are expensive but raw data is plentiful. Unlabeled data must still be representative; adding more unrelated data can hurt rather than help.`,
                },
                {
                  title: "Worked example",
                  content: `A defect-detection project may have 2,000 manually labeled images and 200,000 unlabeled factory images. A semi-supervised method can use both while keeping a clean labeled evaluation set.`,
                },
                {
                  title: "Practical use",
                  content: `Design a data split that prevents unlabeled production data from accidentally contaminating a benchmark.`,
                },
                {
                  title: "Deep mental model",
                  content: `Labels tell the model what task matters; unlabeled data can tell it what the input population looks like.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why semi-supervised learning is useful and what assumptions make it succeed or fail.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Treating pseudo-labels as ground truth, allowing evaluation examples into training, and ignoring population mismatch.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use it when high-quality labels are expensive and representative unlabeled data is abundant.`,
                },
                {
                  title: "Production scenario",
                  content: `Continuously sample uncertain predictions for human labeling and keep a protected evaluation set that is never used for training.`,
                },
                {
                  title: "Related concepts",
                  content: `Supervised learning, self-supervised learning, pseudo-labeling, active learning, and evaluation.`,
                }
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Intermediate",
      slug: "intermediate",
      description: "LLM mechanics, generation, prompting, multimodality, safety, reliability, and model operations.",
      level: StudyLevel.INTERMEDIATE,
      modules: [
        {
          title: "Learning Paradigms",
          slug: "learning-paradigms",
          description: "Learn learning paradigms through focused explanations and runnable examples.",
          topics: [
            {
              title: "Reinforcement Learning",
              slug: "reinforcement-learning",
              description: "Reinforcement learning learns through interaction with an environment using states, actions, rewards, and policies.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Reinforcement learning learns through interaction with an environment using states, actions, rewards, and policies.`,
                },
                {
                  title: "Detailed explanation",
                  content: `An agent observes a state, chooses an action, receives a reward, and transitions to another state. The objective concerns cumulative future reward, so an action that looks bad immediately can still be useful later. Reward design is critical because an agent can optimize a proxy objective while violating the real business intent.`,
                },
                {
                  title: "Worked example",
                  content: `A warehouse robot may receive positive reward for reaching a destination efficiently and penalties for collisions or unnecessary movement.`,
                },
                {
                  title: "Practical use",
                  content: `Define the state, action space, reward, and failure condition for a simple sequential problem.`,
                },
                {
                  title: "Deep mental model",
                  content: `RL is about consequences over time, not merely matching an input to a known label.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain policy, reward, exploration versus exploitation, and why reward specification can cause unintended behavior.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Poor reward shaping, unsafe exploration, sparse feedback, and evaluating only short-term reward.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use RL for sequential decisions where actions affect future states and meaningful feedback exists. Avoid it when a supervised or deterministic solution is sufficient.`,
                },
                {
                  title: "Production scenario",
                  content: `Constrain actions with hard safety checks, simulate before deployment, monitor reward and real-world outcomes, and keep a safe fallback.`,
                },
                {
                  title: "Related concepts",
                  content: `Markov decision processes, policies, value functions, exploration, simulation, and control.`,
                }
              ],
            },
            {
              title: "Self-Supervised Learning",
              slug: "self-supervised-learning",
              description: "Self-supervised learning creates training targets from the data itself, allowing models to learn from large collections without manual labels for every example.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Self-supervised learning creates training targets from the data itself, allowing models to learn from large collections without manual labels for every example.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Language models can be trained by predicting hidden or subsequent tokens. Vision systems can use transformations or masked portions of inputs. The key point is that the target is generated from the input data by the training procedure. The objective strongly influences which representations the model learns.`,
                },
                {
                  title: "Worked example",
                  content: `Given \`machine learning models\`, a next-token objective can use \`machine learning\` as context and \`models\` as the target.`,
                },
                {
                  title: "Practical use",
                  content: `Create three self-supervised training examples from a paragraph and identify the automatically generated target.`,
                },
                {
                  title: "Deep mental model",
                  content: `Self-supervision turns raw data into its own training signal.`,
                },
                {
                  title: "Interview focus",
                  content: `Differentiate self-supervised, supervised, and unsupervised learning.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Calling self-supervised learning label-free without explaining that a training target still exists; confusing the pretraining objective with downstream evaluation.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use it when large quantities of raw data exist and useful predictive or reconstruction objectives can be defined.`,
                },
                {
                  title: "Production scenario",
                  content: `Filter and deduplicate training data, track data provenance, and evaluate whether the pretraining objective transfers to downstream tasks.`,
                },
                {
                  title: "Related concepts",
                  content: `Pretraining, language modeling, embeddings, foundation models, and representation learning.`,
                }
              ],
            },
            {
              title: "LLM Input Pipeline",
              slug: "llm-input-pipeline",
              description: "A simplified LLM request path is text or other input → token IDs → vector representations → Transformer computation → output scores → decoding.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `A simplified LLM request path is text or other input → token IDs → vector representations → Transformer computation → output scores → decoding.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Tokenization converts input into vocabulary units. Embeddings represent tokens as vectors. Transformer blocks repeatedly transform these representations using attention and feed-forward computation, with residual and normalization mechanisms in practical architectures. The final representation is converted into logits or probabilities for possible next tokens, and a decoding strategy selects output tokens.`,
                },
                {
                  title: "Worked example",
                  content: `For a short request, draw \`text → [token IDs] → [vectors] → attention blocks → logits → selected token\`, then append the selected token and repeat.`,
                },
                {
                  title: "Practical use",
                  content: `Trace where context length, latency, and token usage enter this pipeline.`,
                },
                {
                  title: "Deep mental model",
                  content: `Every generated token requires another pass through the model's generation process; the growing sequence becomes part of the next context.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain tokenization, embeddings, attention, logits, and decoding in the correct order.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Saying the model directly 'looks up the answer' or confusing embeddings with final generated text.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use this pipeline as the core mental model when reasoning about LLM latency, context limits, and generation.`,
                },
                {
                  title: "Production scenario",
                  content: `Track token counts, request latency, model version, failures, and truncation behavior at the API boundary.`,
                },
                {
                  title: "Related concepts",
                  content: `Tokenization, embeddings, Transformers, attention, logits, decoding, and context windows.`,
                }
              ],
            },
            {
              title: "Tokenization",
              slug: "tokenization",
              description: "Tokenization maps raw input into discrete units that a particular model vocabulary can represent.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Tokenization maps raw input into discrete units that a particular model vocabulary can represent.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A token may correspond to a whole word, subword fragment, punctuation mark, whitespace-related unit, or another vocabulary item. Token boundaries depend on the tokenizer, so character count and token count are not interchangeable. Tokenization affects context usage and, for many hosted services, cost and latency.`,
                },
                {
                  title: "Worked example",
                  content: `The string \`unhappiness\` may be represented as several subword units depending on the tokenizer. A production application should measure with the actual tokenizer rather than a rough word-count heuristic.`,
                },
                {
                  title: "Practical use",
                  content: `Compare short English, code, numbers, and multilingual text and observe why simple character-to-token ratios are unreliable.`,
                },
                {
                  title: "Deep mental model",
                  content: `The model does not receive your text as characters; it receives token IDs defined by its tokenizer.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why token count differs from word count and why tokenizer choice matters.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Hard-coding a universal tokens-per-word rule, ignoring truncation, and counting tokens with a different tokenizer than the deployed model.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Measure tokens when budgeting context, cost, latency, or request limits.`,
                },
                {
                  title: "Production scenario",
                  content: `Budget input and output tokens, truncate or summarize safely, and record actual usage for cost analysis.`,
                },
                {
                  title: "Related concepts",
                  content: `Embeddings, context windows, prompting, cost economics, batching, and model APIs.`,
                }
              ],
            },
          ],
        },
        {
          title: "LLM Internals",
          slug: "llm-internals",
          description: "Learn llm internals through focused explanations and runnable examples.",
          topics: [
            {
              title: "Embeddings",
              slug: "embeddings",
              description: "An embedding represents an item such as a token, sentence, document, product, or image as a vector in a learned or engineered space.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `An embedding represents an item such as a token, sentence, document, product, or image as a vector in a learned or engineered space.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The useful property is that relationships can be represented geometrically. Similarity can be estimated with measures such as cosine similarity or distance, but the result depends on the embedding model and the data distribution. An embedding dimension is not normally a single human-interpretable concept; information is distributed across dimensions.`,
                },
                {
                  title: "Worked example",
                  content: `Suppose support documents are embedded into vectors. A query embedding can be compared against document vectors to retrieve semantically related material even when the wording differs.`,
                },
                {
                  title: "Practical use",
                  content: `Explain why \`refund my money\` can be close to \`request a reimbursement\` even when the strings share few words.`,
                },
                {
                  title: "Deep mental model",
                  content: `Embeddings turn discrete or complex objects into coordinates that make certain relationships easier to compute.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain embeddings, vector similarity, cosine similarity, and why embedding quality affects retrieval.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming nearest vector always means factual relevance, ignoring normalization/distance choice, or mixing incompatible embedding spaces.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use embeddings for semantic retrieval, clustering, recommendation, similarity, or matching.`,
                },
                {
                  title: "Production scenario",
                  content: `Version the embedding model, re-embed when changing models, store metadata with vectors, and evaluate retrieval quality with real queries.`,
                },
                {
                  title: "Related concepts",
                  content: `Vector databases, semantic search, RAG, tokenization, similarity metrics, and clustering.`,
                }
              ],
            },
            {
              title: "Contextual Meaning",
              slug: "contextual-meaning",
              description: "Language meaning often depends on surrounding context, so useful representations must incorporate information from neighboring tokens.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Language meaning often depends on surrounding context, so useful representations must incorporate information from neighboring tokens.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The word \`bank\` can refer to a financial institution or a river edge. Contextual Transformer computation allows token representations to be influenced by other positions. This is why modern language systems can distinguish meanings that keyword matching alone cannot.`,
                },
                {
                  title: "Worked example",
                  content: `Compare \`She deposited the cheque at the bank\` with \`The hikers sat beside the river bank\`. The surrounding words change the likely interpretation of \`bank\`.`,
                },
                {
                  title: "Practical use",
                  content: `Find three ambiguous words and list the context signals needed to disambiguate them.`,
                },
                {
                  title: "Deep mental model",
                  content: `A token's useful representation is contextual rather than a permanent dictionary definition.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why contextual representations improve language understanding and how attention contributes.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming one embedding vector always has one fixed meaning regardless of context.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use contextual language models for ambiguity, references, semantic interpretation, and language-heavy tasks.`,
                },
                {
                  title: "Production scenario",
                  content: `Provide sufficient but relevant context and evaluate ambiguous, adversarial, and domain-specific inputs.`,
                },
                {
                  title: "Related concepts",
                  content: `Attention, Transformers, embeddings, tokenization, semantic search, and language modeling.`,
                }
              ],
            },
            {
              title: "Transformer Layers and Self-Attention",
              slug: "transformer-layers-and-self-attention",
              description: "Self-attention lets each token compute how strongly information from other positions should influence its representation.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Self-attention lets each token compute how strongly information from other positions should influence its representation.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Each position is projected into query, key, and value representations. Query-key compatibility produces attention scores; normalized weights determine how value vectors are combined. Practical Transformer blocks also contain multiple heads, feed-forward networks, residual connections, normalization, and positional information. Attention is powerful because it provides direct interactions between positions in the context.`,
                },
                {
                  title: "Worked example",
                  content: `For \`The server returned an error because it was unavailable\`, attention can help the representation of \`it\` incorporate information from relevant earlier tokens. This is a conceptual illustration, not a guarantee of a single attention head performing a specific linguistic role.`,
                },
                {
                  title: "Practical use",
                  content: `Draw a three-token sequence and label Q, K, V, attention scores, normalized weights, and weighted value sum.`,
                },
                {
                  title: "Deep mental model",
                  content: `Attention is a content-dependent routing mechanism: each position asks which other positions are useful right now.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain Q/K/V, softmax-normalized attention weights, multi-head attention, residual connections, and positional information.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Saying attention simply 'finds the most important word', assuming one head has one fixed semantic meaning, or omitting computational cost.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use the Transformer mental model when explaining contextualization, long-range dependencies, and LLM architecture.`,
                },
                {
                  title: "Production scenario",
                  content: `Model size and sequence length affect latency and compute. Monitor context sizes and choose architectures/models appropriate to the workload.`,
                },
                {
                  title: "Related concepts",
                  content: `Transformers, embeddings, positional encoding, feed-forward networks, normalization, and decoding.`,
                }
              ],
            },
            {
              title: "Next-Token Prediction and Decoding",
              slug: "next-token-prediction-and-decoding",
              description: "At generation time, a language model produces scores or probabilities for possible next tokens, and a decoding strategy turns that distribution into output.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `At generation time, a language model produces scores or probabilities for possible next tokens, and a decoding strategy turns that distribution into output.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Greedy decoding selects the highest-probability token. Sampling can introduce variation by drawing from a probability distribution, often after transformations such as temperature or top-p filtering. These controls affect diversity and reproducibility but do not independently guarantee factual correctness.`,
                },
                {
                  title: "Worked example",
                  content: `If probabilities are \`resolved=.58\`, \`pending=.27\`, \`failed=.15\`, greedy decoding selects \`resolved\`; a sampling strategy may choose another token depending on its configured distribution.`,
                },
                {
                  title: "Practical use",
                  content: `Compare greedy selection with sampling conceptually and explain what changes when the probability distribution is flatter.`,
                },
                {
                  title: "Deep mental model",
                  content: `Generation is a repeated decision loop: produce distribution → choose token → append token → repeat until a stopping condition.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain logits, probabilities, greedy decoding, sampling, temperature, top-p, and why decoding does not fix knowledge errors.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Claiming temperature makes a model more truthful, or that the highest-probability token is always the correct answer.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use conservative decoding for structured/repeatable tasks and more varied sampling when diversity is useful.`,
                },
                {
                  title: "Production scenario",
                  content: `Define stopping behavior, maximum output length, structured-output validation, and evaluation across representative prompts.`,
                },
                {
                  title: "Related concepts",
                  content: `LLMs, softmax, logits, tokenization, structured generation, and evaluation.`,
                }
              ],
            },
          ],
        },
        {
          title: "Generation and Application Design",
          slug: "generation-and-application-design",
          description: "Learn generation and application design through focused explanations and runnable examples.",
          topics: [
            {
              title: "What Makes Generative AI Different",
              slug: "what-makes-generative-ai-different",
              description: "Generative AI produces open-ended outputs, so the software contract must handle uncertainty, variation, and user review.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Generative AI produces open-ended outputs, so the software contract must handle uncertainty, variation, and user review.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A traditional program may return a fixed class or exact calculation. A generative system can produce many plausible outputs for the same intent. That creates new requirements for evaluation, output validation, UX, safety, source grounding, and recovery. The system should be designed around acceptable behavior rather than assuming a single exact string.`,
                },
                {
                  title: "Worked example",
                  content: `A tax calculator should return an authoritative number from deterministic rules, while a generative assistant can explain the result in natural language after the number has been computed.`,
                },
                {
                  title: "Practical use",
                  content: `Take a deterministic feature and a generative feature and compare their input/output contracts.`,
                },
                {
                  title: "Deep mental model",
                  content: `Generative output is a distribution of possibilities, so downstream software must define what counts as acceptable.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain how probabilistic output changes testing, UX, monitoring, and system design.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Using exact string assertions for inherently variable output, or letting generated text directly execute sensitive actions.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use generation for drafting, transformation, summarization, and flexible interaction; avoid it for exact calculations or authoritative state changes.`,
                },
                {
                  title: "Production scenario",
                  content: `Separate generation from execution. Validate structured fields and require confirmation for consequential actions.`,
                },
                {
                  title: "Related concepts",
                  content: `Probabilistic systems, prompting, evaluation, guardrails, UX, and tool calling.`,
                }
              ],
            },
            {
              title: "Deterministic versus Probabilistic Systems",
              slug: "deterministic-versus-probabilistic-systems",
              description: "Deterministic systems aim for predictable results from the same state; probabilistic systems may produce different valid outputs.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Deterministic systems aim for predictable results from the same state; probabilistic systems may produce different valid outputs.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Deterministic code is ideal for permissions, calculations, state transitions, and validation. Probabilistic models are useful when multiple outputs can be acceptable and the task depends on ambiguous language or patterns. Production systems often combine both: AI interprets or proposes, trusted code validates and executes.`,
                },
                {
                  title: "Worked example",
                  content: `A model can interpret \`move 700 dollars to savings\`, but the banking service should verify balance, authorization, limits, and transaction state before execution.`,
                },
                {
                  title: "Practical use",
                  content: `Mark every component of an AI workflow as deterministic, probabilistic, or a boundary between the two.`,
                },
                {
                  title: "Deep mental model",
                  content: `Treat probabilistic output as an untrusted proposal until the system has verified whatever matters for the action.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain where deterministic boundaries should exist in an AI-enabled transaction workflow.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Using prompts as authorization, trusting generated amounts, and failing to define a fallback.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Combine both approaches whenever AI adds interpretation but exact business outcomes are required.`,
                },
                {
                  title: "Production scenario",
                  content: `Use schemas, authorization checks, idempotency, transactional services, audit logs, and human confirmation where appropriate.`,
                },
                {
                  title: "Related concepts",
                  content: `Guardrails, tool use, function calling, validation, authorization, and AI architecture.`,
                }
              ],
            },
            {
              title: "Prompt Design",
              slug: "prompt-design",
              description: "A production prompt communicates task, context, constraints, and output expectations to a generative model.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `A production prompt communicates task, context, constraints, and output expectations to a generative model.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Prompts should be treated as versioned application assets. A useful prompt separates trusted instructions from untrusted user content, supplies only relevant context, and specifies output requirements appropriate to the task. Prompt quality should be evaluated across a representative dataset rather than judged from one successful response.`,
                },
                {
                  title: "Worked example",
                  content: `A support classifier can specify allowed labels and require exactly one label, while placing the customer message in a clearly delimited variable.`,
                },
                {
                  title: "Practical use",
                  content: `Rewrite a vague prompt by adding task, context, constraints, output format, and failure behavior.`,
                },
                {
                  title: "Deep mental model",
                  content: `Prompting is interface design for a probabilistic component, not magic wording.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss zero-shot/few-shot prompting, structured outputs, prompt injection, and evaluation.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Overlong prompts, contradictory instructions, leaking secrets into context, and assuming prompt instructions are security controls.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use explicit templates, examples, schemas, and relevant context when they improve measurable performance.`,
                },
                {
                  title: "Production scenario",
                  content: `Version prompts, run regression evaluations, log safe metadata, and test adversarial and ambiguous inputs before deployment.`,
                },
                {
                  title: "Related concepts",
                  content: `RAG, prompt injection, structured outputs, evaluation, context windows, and guardrails.`,
                }
              ],
            },
            {
              title: "Multimodal AI",
              slug: "multimodal-ai",
              description: "Multimodal AI combines multiple input or output modalities such as text, images, audio, and video.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Multimodal AI combines multiple input or output modalities such as text, images, audio, and video.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A multimodal application may combine a photograph with a text description, or use audio and text together. Each modality has its own preprocessing and error modes. The important engineering principle is to identify which information is authoritative and validate high-impact extracted facts.`,
                },
                {
                  title: "Worked example",
                  content: `A device-support workflow can accept a photo of a damaged connector plus a written symptom. The model can draft troubleshooting steps, but a technician or deterministic diagnostic system may still verify critical findings.`,
                },
                {
                  title: "Practical use",
                  content: `Design a multimodal request and list the failure modes for each modality.`,
                },
                {
                  title: "Deep mental model",
                  content: `Adding a modality adds information but also adds another uncertainty surface.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain multimodal input, fusion at a high level, and why multimodal output still needs validation.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming image understanding is perfect, ignoring OCR/speech errors, and using generated descriptions as authoritative evidence.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use multimodal systems when combining modalities materially improves task performance.`,
                },
                {
                  title: "Production scenario",
                  content: `Store modality provenance, validate extracted facts, control file sizes/types, and monitor errors separately by modality.`,
                },
                {
                  title: "Related concepts",
                  content: `Vision models, speech recognition, embeddings, context, UX, and safety.`,
                }
              ],
            },
          ],
        },
        {
          title: "Safety and Reliability",
          slug: "safety-and-reliability",
          description: "Learn safety and reliability through focused explanations and runnable examples.",
          topics: [
            {
              title: "User Experience for Generative Applications",
              slug: "user-experience-for-generative-applications",
              description: "Generative UX should preserve user control because output can be useful, uncertain, variable, or wrong.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Generative UX should preserve user control because output can be useful, uncertain, variable, or wrong.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Good interfaces let users inspect, edit, regenerate, reject, and recover from generated content. For actions with side effects, preview and confirmation are often more appropriate than silent execution. Source visibility can improve trust when the system is grounded in retrieved information.`,
                },
                {
                  title: "Worked example",
                  content: `An email assistant can show a draft with edit and regenerate controls, while sending the message remains a user-confirmed action.`,
                },
                {
                  title: "Practical use",
                  content: `Sketch the happy path and failure/recovery path for an AI writing feature.`,
                },
                {
                  title: "Deep mental model",
                  content: `The interface is part of the reliability system: it determines whether users can catch and recover from model errors.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss human-in-the-loop UX, confirmation, source attribution, and graceful failure.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Anthropomorphic claims, hiding uncertainty, auto-executing consequential actions, and making regeneration the only recovery option.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use generative UI where flexibility helps; keep deterministic workflows for simple, repetitive operations.`,
                },
                {
                  title: "Production scenario",
                  content: `Measure task completion, edit rate, rejection rate, latency, user corrections, and safety incidents—not just model response quality.`,
                },
                {
                  title: "Related concepts",
                  content: `Human-in-the-loop, guardrails, hallucination, evaluation, accessibility, and workflow design.`,
                }
              ],
            },
            {
              title: "Guardrails",
              slug: "guardrails",
              description: "Guardrails are layered controls that reduce the probability or impact of unsafe, incorrect, unauthorized, or unwanted AI behavior.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Guardrails are layered controls that reduce the probability or impact of unsafe, incorrect, unauthorized, or unwanted AI behavior.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Effective guardrails operate at multiple layers: identity and authorization, input validation, context selection, prompt structure, tool permissions, output validation, rate limiting, monitoring, and human review. A prompt can guide behavior but is not a security boundary. Authoritative policies belong in trusted application code.`,
                },
                {
                  title: "Worked example",
                  content: `Before a model can trigger a refund tool, the backend should authenticate the user, verify authorization, validate the amount, enforce business limits, and log the operation.`,
                },
                {
                  title: "Practical use",
                  content: `Threat-model an AI agent and place at least one control before input, during model/tool interaction, and after output.`,
                },
                {
                  title: "Deep mental model",
                  content: `Security comes from constrained capabilities and trusted enforcement, not from asking the model to behave.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain prompt injection, least privilege, output validation, and why model instructions cannot replace authorization.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Relying on system prompts alone, giving tools excessive permissions, and validating only the model's natural-language response.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use layered guardrails whenever model output can affect users, data, tools, or external systems.`,
                },
                {
                  title: "Production scenario",
                  content: `Implement least-privilege credentials, allowlisted tools, parameter validation, rate limits, audit logs, and kill switches.`,
                },
                {
                  title: "Related concepts",
                  content: `Prompt injection, authorization, tool calling, privacy, monitoring, and secure architecture.`,
                }
              ],
            },
            {
              title: "Hallucination and Reliability",
              slug: "hallucination-and-reliability",
              description: "Hallucination describes generated content that is unsupported, incorrect, or presented with unjustified confidence.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Hallucination describes generated content that is unsupported, incorrect, or presented with unjustified confidence.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The risk varies by task. Creative drafting can tolerate some uncertainty; account management, finance, legal, security, and other high-impact workflows require stronger controls. Mitigation is a system-design problem: retrieve authoritative information, constrain actions, validate outputs, cite evidence where appropriate, and escalate when confidence or evidence is insufficient.`,
                },
                {
                  title: "Worked example",
                  content: `A warranty assistant should retrieve the current warranty policy and cite the relevant passage rather than relying only on model memory.`,
                },
                {
                  title: "Practical use",
                  content: `For five sample questions, decide whether the system needs retrieval, deterministic validation, human review, or none of these.`,
                },
                {
                  title: "Deep mental model",
                  content: `Reliability is a property of the complete pipeline, not a single model score.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain why hallucinations happen at a high level and how RAG, validation, structured outputs, and human review reduce risk.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Treating confidence-like wording as factual confidence, adding irrelevant retrieval, and assuming citations automatically make an answer correct.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use stronger grounding and verification as the cost of error increases.`,
                },
                {
                  title: "Production scenario",
                  content: `Track unsupported-answer rate, citation correctness, retrieval recall, escalation rate, and user corrections.`,
                },
                {
                  title: "Related concepts",
                  content: `RAG, evaluation, guardrails, source attribution, uncertainty, and observability.`,
                }
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Advanced",
      slug: "advanced",
      description: "Production architecture, economics, privacy, engineering, model selection, and end-to-end AI system design.",
      level: StudyLevel.ADVANCED,
      modules: [
        {
          title: "Model Operations",
          slug: "model-operations",
          description: "Learn model operations through focused explanations and runnable examples.",
          topics: [
            {
              title: "Hosted versus Self-Hosted Models",
              slug: "hosted-versus-self-hosted-models",
              description: "Hosted models trade infrastructure responsibility for provider dependency; self-hosted models trade that dependency for greater operational control.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Hosted models trade infrastructure responsibility for provider dependency; self-hosted models trade that dependency for greater operational control.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Hosted APIs can reduce serving complexity and provide rapid access to advanced capabilities, but introduce network dependency, provider pricing, limits, availability considerations, and data-handling requirements. Self-hosting gives more control over deployment and data paths but requires capacity planning, model serving, scaling, upgrades, monitoring, and hardware management.`,
                },
                {
                  title: "Worked example",
                  content: `A prototype may use a hosted API for speed, while a regulated workload may investigate self-hosting if its privacy and operational requirements justify the additional complexity.`,
                },
                {
                  title: "Practical use",
                  content: `Score both approaches against privacy, latency, cost, customization, availability, and engineering capacity.`,
                },
                {
                  title: "Deep mental model",
                  content: `The decision moves operational responsibility between your team and the provider; it does not remove that responsibility.`,
                },
                {
                  title: "Interview focus",
                  content: `Compare latency, cost, privacy, scalability, vendor lock-in, and operational burden.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Comparing only API price against hardware price, ignoring engineering labor, or assuming self-hosting automatically means better privacy.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Choose hosted for speed and reduced ops; consider self-hosting when control, customization, or specific deployment constraints justify it.`,
                },
                {
                  title: "Production scenario",
                  content: `Run a benchmark using realistic traffic and include model serving, observability, failover, data governance, and capacity costs.`,
                },
                {
                  title: "Related concepts",
                  content: `Model selection, cost economics, privacy, inference serving, scaling, and architecture.`,
                }
              ],
            },
            {
              title: "Cost and Token Economics",
              slug: "cost-and-token-economics",
              description: "AI cost is influenced by model choice, input/output volume, request frequency, and architecture; token usage is one important cost driver for many hosted LLM services.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI cost is influenced by model choice, input/output volume, request frequency, and architecture; token usage is one important cost driver for many hosted LLM services.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Long prompts, repeated history, unnecessary retrieved documents, and verbose outputs can increase cost and latency. Optimization should preserve useful context rather than blindly minimizing tokens. Common techniques include retrieval filtering, summarization, caching safe results, smaller models for simple tasks, batching where supported, and output constraints. Actual pricing is provider- and model-specific and should be measured from current provider documentation.`,
                },
                {
                  title: "Worked example",
                  content: `If a workflow sends the same 20-page policy on every request, retrieving only the relevant sections can reduce input volume while improving focus.`,
                },
                {
                  title: "Practical use",
                  content: `Estimate cost per task from requests per user, average input/output usage, model price, and traffic volume.`,
                },
                {
                  title: "Deep mental model",
                  content: `The real unit of economics is often a completed workflow, not a single model call.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain token-based cost, model routing, caching, and why a cheaper model can increase total cost if it causes retries or poor outcomes.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Using stale pricing assumptions, ignoring retries, and optimizing token count without measuring quality.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Optimize aggressively for high-volume workflows; preserve stronger models when their quality materially improves business outcomes.`,
                },
                {
                  title: "Production scenario",
                  content: `Track cost per request, cost per successful task, token distribution, retry rate, cache hit rate, and model mix.`,
                },
                {
                  title: "Related concepts",
                  content: `Tokenization, model routing, caching, latency, batching, and unit economics.`,
                }
              ],
            },
            {
              title: "Privacy and Intellectual Property",
              slug: "privacy-and-intellectual-property",
              description: "AI systems can process sensitive information and copyrighted or licensed material, so data governance must be designed into the pipeline.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI systems can process sensitive information and copyrighted or licensed material, so data governance must be designed into the pipeline.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Privacy and intellectual-property questions depend on the data, jurisdiction, contracts, provider terms, and intended use. Engineering controls include data minimization, access control, retention limits, redaction where appropriate, encryption, provenance tracking, and clear rules about what data may enter prompts, retrieval indexes, logs, or training pipelines. Legal review may be required for high-risk use cases.`,
                },
                {
                  title: "Worked example",
                  content: `A support system can redact unnecessary personal identifiers before sending a request to an external model and restrict retrieval to documents the authenticated user is allowed to access.`,
                },
                {
                  title: "Practical use",
                  content: `Trace a sensitive document from ingestion to retrieval, model request, logs, storage, and deletion, and identify every place data could leak.`,
                },
                {
                  title: "Deep mental model",
                  content: `Privacy is a data-flow property. Protecting the database is insufficient if the same data is copied into prompts, logs, caches, or third-party services.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss data minimization, access control, retention, provenance, and why legal requirements vary by context.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming a model provider's generic policy answers every legal question, logging raw prompts indefinitely, or retrieving documents without user-level authorization.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Apply stricter controls whenever personal, confidential, proprietary, or regulated data is involved.`,
                },
                {
                  title: "Production scenario",
                  content: `Use a documented data classification policy, least-privilege retrieval, configurable retention, audit logs, and provider contracts reviewed by the appropriate teams.`,
                },
                {
                  title: "Related concepts",
                  content: `Security, RAG authorization, governance, data lineage, compliance, and threat modeling.`,
                }
              ],
            },
            {
              title: "When Generative AI Is a Good Fit",
              slug: "when-generative-ai-is-a-good-fit",
              description: "Generative AI is a good fit when flexible language or content generation creates measurable value and the system can tolerate or control probabilistic output.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Generative AI is a good fit when flexible language or content generation creates measurable value and the system can tolerate or control probabilistic output.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Strong candidates include drafting, summarization, transformation, conversational interfaces, code assistance, and synthesis of unstructured information. Weak candidates include exact calculations, hard authorization decisions, and simple deterministic transformations. The right choice depends on error cost, data availability, user workflow, latency, cost, and validation options.`,
                },
                {
                  title: "Worked example",
                  content: `Generating a first draft of a support response is a strong fit; calculating an invoice total should remain deterministic.`,
                },
                {
                  title: "Practical use",
                  content: `Evaluate ten candidate product features and classify each as deterministic, ML, generative, or hybrid.`,
                },
                {
                  title: "Deep mental model",
                  content: `The question is not 'Can a model do this?' but 'Does generation improve the complete workflow enough to justify its uncertainty and cost?'`,
                },
                {
                  title: "Interview focus",
                  content: `Give a framework for deciding whether to use generative AI and discuss alternatives.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Starting from a model and searching for a problem, ignoring simpler solutions, and measuring demo quality instead of task outcomes.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Prefer generation for high-variance language tasks; avoid it for exact, safety-critical, or easily automated logic unless tightly constrained.`,
                },
                {
                  title: "Production scenario",
                  content: `Prototype against representative tasks, establish acceptance criteria, measure human correction, and keep a deterministic fallback where possible.`,
                },
                {
                  title: "Related concepts",
                  content: `Model selection, evaluation, UX, cost economics, deterministic systems, and architecture.`,
                }
              ],
            },
          ],
        },
        {
          title: "AI Product Applications",
          slug: "ai-product-applications",
          description: "Learn ai product applications through focused explanations and runnable examples.",
          topics: [
            {
              title: "AI-Enhanced Customer Service",
              slug: "ai-enhanced-customer-service",
              description: "AI can improve customer service by helping agents or customers retrieve information, summarize cases, classify requests, and draft responses.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI can improve customer service by helping agents or customers retrieve information, summarize cases, classify requests, and draft responses.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A robust support architecture separates retrieval and policy from generation. The model can interpret intent and draft language, while authorization controls which customer records are visible and trusted services execute account changes. Human escalation remains important for ambiguous or high-impact cases.`,
                },
                {
                  title: "Worked example",
                  content: `A support assistant retrieves the customer's eligible product documentation and case history, drafts a response, cites the sources, and lets an agent approve before sending.`,
                },
                {
                  title: "Practical use",
                  content: `Design the flow for authentication, retrieval, generation, review, and escalation.`,
                },
                {
                  title: "Deep mental model",
                  content: `The assistant should reduce cognitive work without becoming an uncontrolled decision-maker.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss RAG, access control, hallucination mitigation, agent assist, and evaluation metrics.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Cross-customer data leakage, unsupported policy claims, and auto-executing account changes.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use AI for summarization, drafting, classification, search assistance, and repetitive agent workflows.`,
                },
                {
                  title: "Production scenario",
                  content: `Measure resolution time, first-contact resolution, escalation accuracy, correction rate, groundedness, and customer satisfaction.`,
                },
                {
                  title: "Related concepts",
                  content: `RAG, guardrails, UX, embeddings, authorization, and observability.`,
                }
              ],
            },
            {
              title: "Generative Writing Assistance",
              slug: "generative-writing-assistance",
              description: "Generative writing tools transform or create text while keeping a human or downstream process responsible for final acceptance.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Generative writing tools transform or create text while keeping a human or downstream process responsible for final acceptance.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Useful operations include drafting, rewriting, summarizing, tone transformation, outlining, and extracting structured information. Quality should be evaluated for factual preservation, instruction following, style, and unintended changes. For professional content, source material and user edits remain important.`,
                },
                {
                  title: "Worked example",
                  content: `A support agent can provide bullet points and ask for a concise customer response. The system can draft text while preserving named facts and leaving unsupported details out.`,
                },
                {
                  title: "Practical use",
                  content: `Compare a generated rewrite against the source and mark factual changes separately from stylistic changes.`,
                },
                {
                  title: "Deep mental model",
                  content: `Writing assistance is a constrained transformation problem when source facts must survive unchanged.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss prompt constraints, factual preservation, evaluation, and human review.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Inventing facts, changing numbers or names, and assuming polished language means correct content.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use for drafting and transformation when a person can review the result; add stronger controls when text has legal or financial consequences.`,
                },
                {
                  title: "Production scenario",
                  content: `Store source and generated versions separately, provide diff/review UI, and evaluate factual preservation on representative examples.`,
                },
                {
                  title: "Related concepts",
                  content: `Prompt design, evaluation, UX, hallucination, structured outputs, and content governance.`,
                }
              ],
            },
            {
              title: "Image Generation",
              slug: "image-generation",
              description: "Image generation models produce images from learned representations conditioned on inputs such as text or reference images.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Image generation models produce images from learned representations conditioned on inputs such as text or reference images.`,
                },
                {
                  title: "Detailed explanation",
                  content: `Generative image systems can support concept exploration, marketing variations, mockups, and creative workflows. Output can vary and may contain visual or semantic errors. The engineering problem includes prompt conditioning, reference control, resolution, latency, moderation, provenance, and intellectual-property considerations.`,
                },
                {
                  title: "Worked example",
                  content: `A product team can generate several packaging concepts from a textual brief, then have a designer select and refine the best direction.`,
                },
                {
                  title: "Practical use",
                  content: `Define quality criteria for composition, text rendering, brand constraints, and prohibited content before evaluating generated images.`,
                },
                {
                  title: "Deep mental model",
                  content: `Image generation is a probabilistic synthesis process, not a guaranteed rendering of every instruction.`,
                },
                {
                  title: "Interview focus",
                  content: `Discuss conditioning, variability, evaluation, safety, and why generated imagery needs review.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Assuming exact text or geometry will always render correctly, ignoring licensing/provenance questions, and using generated assets without review in high-stakes contexts.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use for ideation and controlled creative production; use deterministic design tools when exact geometry or typography is mandatory.`,
                },
                {
                  title: "Production scenario",
                  content: `Add moderation, brand review, provenance metadata where applicable, asset versioning, and human approval before publication.`,
                },
                {
                  title: "Related concepts",
                  content: `Multimodal AI, diffusion-style generation, prompt design, safety, provenance, and UX.`,
                }
              ],
            },
            {
              title: "AI Engineering",
              slug: "ai-engineering",
              description: "AI engineering is the discipline of turning model capabilities into reliable software products through data, prompts, retrieval, tools, evaluation, security, and operations.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `AI engineering is the discipline of turning model capabilities into reliable software products through data, prompts, retrieval, tools, evaluation, security, and operations.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The model is only one dependency. AI engineering covers input preparation, context construction, model invocation, structured outputs, tool integration, evaluation, observability, cost control, and failure handling. Unlike ordinary deterministic software, model behavior can change with model versions, prompts, data, and runtime context, so regression evaluation is essential.`,
                },
                {
                  title: "Worked example",
                  content: `An enterprise assistant may contain authentication, document retrieval, prompt construction, LLM invocation, output parsing, tool authorization, logging, evaluation, and fallback paths.`,
                },
                {
                  title: "Practical use",
                  content: `Draw an end-to-end AI feature and label every boundary where deterministic validation or monitoring is needed.`,
                },
                {
                  title: "Deep mental model",
                  content: `AI engineering is systems engineering around a probabilistic component.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain evaluation, RAG, tool calling, prompt versioning, observability, cost, and security as one architecture.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Only tuning prompts, skipping evaluation, coupling business logic to model text, and lacking rollback/fallback mechanisms.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use disciplined AI engineering practices for any production feature whose behavior depends on models.`,
                },
                {
                  title: "Production scenario",
                  content: `Build versioned prompts, tests, eval datasets, tracing, model routing, guardrails, and deployment rollback into the lifecycle.`,
                },
                {
                  title: "Related concepts",
                  content: `MLOps, LLMOps, RAG, evaluation, security, model selection, and observability.`,
                }
              ],
            },
          ],
        },
        {
          title: "AI Engineering",
          slug: "ai-engineering",
          description: "Learn ai engineering through focused explanations and runnable examples.",
          topics: [
            {
              title: "Model Selection",
              slug: "model-selection",
              description: "Model selection is choosing a model based on the application's quality, latency, cost, context, modality, privacy, and operational requirements.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Model selection is choosing a model based on the application's quality, latency, cost, context, modality, privacy, and operational requirements.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A larger or newer model is not automatically the best choice. Evaluate candidate models on representative tasks, including failure cases. Consider input/output limits, tool or structured-output support, throughput, latency, cost, deployment constraints, and provider availability. Use the smallest model that meets the required quality when economics matter.`,
                },
                {
                  title: "Worked example",
                  content: `A routing workflow might use a small classifier for intent detection and reserve a stronger LLM for difficult free-form requests.`,
                },
                {
                  title: "Practical use",
                  content: `Create a scorecard for three candidate models using quality, latency, cost, and reliability weights.`,
                },
                {
                  title: "Deep mental model",
                  content: `Model choice is an optimization problem under constraints, not a popularity contest.`,
                },
                {
                  title: "Interview focus",
                  content: `Explain benchmark versus task-specific evaluation and why production metrics matter.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Using public benchmarks as the only evidence, ignoring tail latency, and selecting a model before defining acceptance criteria.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Compare models whenever quality, cost, latency, or capability requirements are material.`,
                },
                {
                  title: "Production scenario",
                  content: `Run offline evals, shadow traffic where appropriate, canary releases, and monitor quality/cost before changing the default model.`,
                },
                {
                  title: "Related concepts",
                  content: `Cost economics, evaluation, model routing, latency, benchmarking, and deployment.`,
                }
              ],
            },
            {
              title: "Production Architecture",
              slug: "production-architecture",
              description: "Production AI architecture surrounds model inference with identity, data access, context construction, validation, observability, and recovery mechanisms.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `Production AI architecture surrounds model inference with identity, data access, context construction, validation, observability, and recovery mechanisms.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A typical request path may include API authentication, input validation, retrieval, prompt/context construction, model invocation, output parsing, tool authorization, response filtering, logging, and feedback collection. Stateful workflows may also need queues, caches, rate limits, retries, idempotency, and asynchronous processing.`,
                },
                {
                  title: "Worked example",
                  content: `A support request can authenticate the user, retrieve authorized documents, generate an answer, validate structured fields, and return citations while recording trace metadata.`,
                },
                {
                  title: "Practical use",
                  content: `Draw the architecture and identify where each failure can occur and how the system recovers.`,
                },
                {
                  title: "Deep mental model",
                  content: `Reliability emerges from boundaries around the model: every uncertain component needs an appropriate control.`,
                },
                {
                  title: "Interview focus",
                  content: `Design an AI assistant with RAG, caching, rate limits, observability, authorization, and failure handling.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Single point of failure, unlimited context, unbounded retries, missing authorization on retrieval, and no model fallback.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use layered architecture for production AI rather than direct browser-to-model calls.`,
                },
                {
                  title: "Production scenario",
                  content: `Combine stateless APIs, secure retrieval, model gateway/routing, validation, tracing, quotas, queues where needed, and rollback.`,
                },
                {
                  title: "Related concepts",
                  content: `RAG, guardrails, AI engineering, scalability, caching, observability, and security.`,
                }
              ],
            },
            {
              title: "Interview and Revision Master Section",
              slug: "interview-and-revision-master-section",
              description: "Strong AI interviews test whether you can explain concepts, make trade-offs, reason about failure modes, and design reliable systems—not merely define terms.",
              estimatedMinutes: 18,
              sections: [
                {
                  title: "Concept",
                  content: `Strong AI interviews test whether you can explain concepts, make trade-offs, reason about failure modes, and design reliable systems—not merely define terms.`,
                },
                {
                  title: "Detailed explanation",
                  content: `A reusable answer structure is: define the concept, explain the mechanism, give a concrete example, state trade-offs, identify failure modes, and connect it to production. For system-design questions, establish requirements before selecting a model or architecture.`,
                },
                {
                  title: "Worked example",
                  content: `For 'design a customer-support assistant,' discuss users and data first, then retrieval, model choice, authorization, guardrails, evaluation, latency, cost, and fallback.`,
                },
                {
                  title: "Practical use",
                  content: `Answer an AI design question aloud using the sequence: requirements → architecture → model → data/context → safety → evaluation → operations.`,
                },
                {
                  title: "Deep mental model",
                  content: `Interview reasoning is about making assumptions explicit and defending them.`,
                },
                {
                  title: "Interview focus",
                  content: `Prepare comparisons: supervised vs unsupervised, self-supervised vs supervised, RAG vs fine-tuning, hosted vs self-hosted, deterministic vs probabilistic, and small vs large models.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Giving vendor-specific claims without qualification, skipping requirements, confusing model capability with product reliability, and using buzzwords without mechanisms.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use this framework whenever an interview asks 'why', 'how', 'which approach', or 'design a system'.`,
                },
                {
                  title: "Production scenario",
                  content: `A good interview answer should resemble a production review: requirements, trade-offs, failure handling, observability, and measurable success criteria.`,
                },
                {
                  title: "Related concepts",
                  content: `All preceding AI/ML/LLM concepts, system design, behavioral trade-offs, and evaluation.`,
                }
              ],
            },
            {
              title: "Capstone Project — Safe AI Support Assistant",
              slug: "capstone-project-safe-ai-support-assistant",
              description: "A safe AI support assistant combines retrieval, generation, authorization, validation, observability, and human escalation into one end-to-end system.",
              estimatedMinutes: 20,
              sections: [
                {
                  title: "Concept",
                  content: `A safe AI support assistant combines retrieval, generation, authorization, validation, observability, and human escalation into one end-to-end system.`,
                },
                {
                  title: "Detailed explanation",
                  content: `The assistant should authenticate the user, retrieve only documents and records they are authorized to access, construct relevant context, invoke the model, validate the output, and present the answer with evidence when appropriate. It should not let generated text bypass business rules. High-impact actions should use constrained tools and explicit confirmation.`,
                },
                {
                  title: "Worked example",
                  content: `A customer asks about warranty coverage. The system authenticates the customer, retrieves the current warranty policy and permitted case information, generates a concise answer with source references, and offers escalation if the evidence is insufficient.`,
                },
                {
                  title: "Practical use",
                  content: `Implement the capstone in phases: deterministic mock retrieval → model integration → structured output → authorization → evaluation → monitoring → failure simulation.`,
                },
                {
                  title: "Deep mental model",
                  content: `The model is the reasoning/generation component; the application remains the authority over identity, data access, state, and side effects.`,
                },
                {
                  title: "Interview focus",
                  content: `Be prepared to defend the architecture, threat model, evaluation plan, cost model, and fallback strategy.`,
                },
                {
                  title: "Common pitfalls",
                  content: `Prompt-only security, cross-user retrieval leakage, trusting unsupported answers, exposing raw internal documents, and auto-executing account changes.`,
                },
                {
                  title: "When to use / avoid",
                  content: `Use the architecture as a reference implementation for learning production AI patterns. Avoid copying it unchanged into a real regulated system without domain-specific security and legal review.`,
                },
                {
                  title: "Production scenario",
                  content: `Add authentication, authorization-aware retrieval, rate limiting, prompt-injection defenses, output validation, audit logging, evaluation datasets, human escalation, and operational dashboards.`,
                },
                {
                  title: "Related concepts",
                  content: `RAG, embeddings, guardrails, prompt injection, UX, model selection, production architecture, and AI engineering.`,
                }
              ],
            },
          ],
        },
      ],
    },
  ],
};

async function main() {
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

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];

          await prisma.studyTopicSection.upsert({
            where: {
              id: `${topic.id}-section-${sectionIndex}`,
            },
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

        topicCount++;
      }
    }
  }

  console.log(`Seeded ${topicCount} topics and ${sectionCount} sections.`);
}

main()
  .catch((error) => {
    console.error("Generative AI & Machine Learning seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

