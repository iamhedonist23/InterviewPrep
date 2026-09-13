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
              description: "Artificial intelligence is the broad discipline of building computer systems that perform tasks associated with reasoning, perception, language, decision making, or adaptation. Machine...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Artificial intelligence is the broad discipline of building computer systems that perform tasks associated with reasoning, perception, language, decision making, or adaptation. Machine learning is a subset of AI in which a system learns useful patterns from data rather than relying only on explicitly written rules. Deep learning is a family of machine-learning methods based on layered neural networks. Generative AI focuses on models that can create new content such as language, code, images, audio, or video.

These labels describe related but different ideas. A rule engine can be an AI system without learning from data. A classifier can be machine learning without generating content. A large language model is a model; a chatbot is an application that wraps a model with prompts, business logic, data, safety controls, and a user interface.

For an engineer, this distinction is essential. The model provides a learned capability, but the surrounding application determines how that capability is used, constrained, tested, and connected to real systems.

Keep the hierarchy clear: AI is the broad field; machine learning learns patterns from data; deep learning uses layered neural networks; generative AI produces new content. In a real system, the model is only one component. The application still owns validation, authorization, business rules, monitoring, and the user experience.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class AssistantModel:
    def generate(self, prompt):
        return "generated response"

class CustomerApp:
    def __init__(self, model):
        self.model = model

    def answer(self, question):
        prompt = "Answer clearly: " + question
        return self.model.generate(prompt)

print(CustomerApp(AssistantModel()).answer("How do I change my email?"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply AI, Machine Learning, Deep Learning, and Generative AI to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Evolution of AI Applications",
              slug: "evolution-of-ai-applications",
              description: "The development of AI can be viewed as a progression of techniques rather than a replacement of one technology by another. Early systems relied heavily on explicit logic and rules. Later...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `The development of AI can be viewed as a progression of techniques rather than a replacement of one technology by another. Early systems relied heavily on explicit logic and rules. Later systems learned statistical relationships from data. Neural networks became increasingly practical as data, algorithms, and computing resources improved. Deep learning then produced large improvements in vision, speech, language, and generation. Modern foundation models extend the idea by learning broad capabilities that can be reused across many tasks.

The historical pattern matters because every approach has strengths. A dedicated algorithm can be faster, cheaper, easier to test, and more predictable than a general generative model. Generative systems become attractive when the problem requires flexible language, content creation, or interpretation of ambiguous input.

The important lesson is not that newer techniques always replace older ones. Different techniques solve different problem shapes. Prefer deterministic logic when rules are explicit and exact; use learned models when patterns are difficult to encode manually; use generative models when flexible content or language interaction is valuable.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
approaches = {
    "invoice_format_check": "deterministic rule",
    "email_drafting": "generative model",
    "image_classification": "specialized ML model",
    "brainstorming": "generative model",
}
for task, approach in approaches.items():
    print(task, "->", approach)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Evolution of AI Applications to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Rule-Based and Logic Systems",
              slug: "rule-based-and-logic-systems",
              description: "Rule-based AI represents knowledge explicitly. A program can contain facts, conditions, and actions such as: if a customer is verified and the requested operation is allowed, continue;...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Rule-based AI represents knowledge explicitly. A program can contain facts, conditions, and actions such as: if a customer is verified and the requested operation is allowed, continue; otherwise reject the request.

This style is valuable when rules are stable, auditable, and legally or operationally important. Its weakness appears when the number of possible situations becomes enormous or when the knowledge is difficult to express as explicit rules, as happens with natural language and visual perception.

A useful modern architecture is hybrid: let a language model interpret an ambiguous user request, but use ordinary application code to enforce permissions, limits, calculations, and transactional rules.

Rules are strongest when the policy is explicit and must be predictable or auditable. Keep high-confidence business constraints outside the model. A useful architecture lets AI interpret an ambiguous request while deterministic code makes the final authorization or calculation.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def approve_refund(customer_verified, amount, maximum):
    if not customer_verified:
        return False
    return 0 < amount <= maximum

print(approve_refund(True, 120, 500))
print(approve_refund(False, 120, 500))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Rule-Based and Logic Systems to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Early Machine Learning",
              slug: "early-machine-learning",
              description: "Early machine learning shifted part of the problem from hand-written rules to learning from experience or examples. Neural-network experiments and self-improving game-playing programs...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Early machine learning shifted part of the problem from hand-written rules to learning from experience or examples. Neural-network experiments and self-improving game-playing programs demonstrated that machines could adjust behavior from data or feedback.

The central idea remains important today: instead of programming every decision, define a learning objective and provide useful evidence. The algorithm adjusts internal parameters so that its behavior becomes better according to the objective.

This approach introduces new failure modes. A model can learn patterns that are accidental, biased, incomplete, or unrelated to the real business objective. Data collection and evaluation therefore become core engineering activities.

Learning changes software development because behavior depends on data as well as code. Always separate the learning objective from the business objective and check whether the training data actually represents the situations the system will encounter.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
training_data = [
    ("message A", "normal"),
    ("message B", "urgent"),
    ("message C", "normal"),
]
for message, label in training_data:
    print(message, label)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Early Machine Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "AI has experienced periods of high optimism followed by disappointment when available systems could not meet ambitious goals. These periods are commonly called AI winters. The practical...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `AI has experienced periods of high optimism followed by disappointment when available systems could not meet ambitious goals. These periods are commonly called AI winters.

The practical lesson is still relevant: a technology should be judged by the problem it solves, not by its popularity. A successful AI project needs a clear user problem, measurable quality criteria, realistic cost and latency targets, and a plan for handling incorrect results.

Before adding generative AI to a product, ask whether it creates real user value, whether it fits the normal workflow, what data it requires, whether the data can be safely processed, what the operating cost will be, and what happens when the output is wrong.

Use realistic evaluation before committing to an AI feature. Define measurable quality, latency, cost, privacy, and recovery requirements first. A technically impressive model is not automatically a useful product component.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
requirements = {
    "user_value": True,
    "accuracy_required": "very high",
    "creative_output": False,
    "recovery_from_error": "defined",
}
for key, value in requirements.items():
    print(key, "=", value)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply AI Winters and the Importance of Realistic Expectations to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Expert Systems",
              slug: "expert-systems",
              description: "Expert systems were a major practical form of rule-based AI. Their architecture can be understood through four pieces: a knowledge base containing domain facts, working memory containing...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Expert systems were a major practical form of rule-based AI. Their architecture can be understood through four pieces: a knowledge base containing domain facts, working memory containing information about the current case, an inference engine that applies rules, and a user interface.

The architecture is useful even in modern AI applications. For example, a generative model can interpret a natural-language request while a deterministic rules engine verifies whether the requested operation is permitted.

This separation makes the system easier to audit. The language model handles ambiguity; the authoritative application services remain responsible for decisions that must be exact.

Think in terms of knowledge, current case data, inference, and interaction. The same separation remains useful today: learned components can interpret information while deterministic services enforce authoritative rules.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
knowledge = {
    "verified": True,
    "account_type": "premium",
}

def can_access_feature(data):
    return data["verified"] and data["account_type"] == "premium"

print(can_access_feature(knowledge))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Expert Systems to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Big Data and Statistical Machine Learning",
              slug: "big-data-and-statistical-machine-learning",
              description: "The growth of the internet, sensors, transactions, public datasets, and digital applications produced enormous quantities of data. Better hardware and distributed computing made it...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `The growth of the internet, sensors, transactions, public datasets, and digital applications produced enormous quantities of data. Better hardware and distributed computing made it practical to train statistical models on these datasets.

Statistical machine learning can be used for classification, clustering, prediction, regression, computer vision, speech recognition, anomaly detection, and many other tasks.

The important engineering shift is that behavior is partly learned from examples. Consequently, the quality of the dataset becomes part of the quality of the software. Representative sampling, correct labels, removal of leakage, and realistic evaluation are essential.

More data is useful only when it is relevant and representative. Watch for noisy labels, sampling bias, duplicated records, data leakage, and a mismatch between offline evaluation data and production traffic.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
records = [
    {"temperature": 31, "machine": "A", "failure": False},
    {"temperature": 72, "machine": "B", "failure": True},
    {"temperature": 35, "machine": "A", "failure": False},
]
for record in records:
    print(record)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Big Data and Statistical Machine Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Deep Learning",
              slug: "deep-learning",
              description: "Deep learning uses multiple layers of artificial neural networks to learn increasingly useful representations. Earlier approaches often required engineers to manually construct features....",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Deep learning uses multiple layers of artificial neural networks to learn increasingly useful representations. Earlier approaches often required engineers to manually construct features. Deep networks can learn intermediate representations automatically during training.

For an image, early layers may respond to simple visual patterns and later layers can combine them into higher-level structures. For language, layered transformations can represent syntactic relationships, semantic associations, and contextual dependencies.

The rise of deep learning depended on several factors together: larger datasets, improved neural architectures, better optimization, and much greater computational capacity, including specialized accelerator hardware.

Deep networks learn internal representations through multiple transformations. Understanding the role of data, architecture, optimization, and compute is more useful than memorizing the phrase 'many layers.'

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def feature_pipeline(value):
    layer_a = value * 2
    layer_b = layer_a + 3
    layer_c = max(layer_b, 0)
    return layer_c

print(feature_pipeline(8))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Deep Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "A foundation model is broadly trained so that the resulting capabilities can support many downstream tasks. Instead of building a separate model from scratch for every application,...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A foundation model is broadly trained so that the resulting capabilities can support many downstream tasks. Instead of building a separate model from scratch for every application, developers can adapt a broad model with instructions, examples, retrieval, tools, fine-tuning, or other application techniques.

The benefit is reuse. One organization might use a language model for support, summarization, document analysis, coding assistance, and search. Each application can still have different permissions, prompts, context, evaluation datasets, and business rules.

The generality of a foundation model does not remove the need for application engineering. It makes the surrounding design even more important because the same flexible model can be used in many different ways.

A foundation model provides reusable general capabilities, but an application still supplies task instructions, current context, permissions, tools, evaluation, and domain constraints. Treat adaptation and runtime context as separate concerns.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class FoundationModel:
    def generate(self, instruction, context):
        return f"Instruction: {instruction}; Context: {context}"

model = FoundationModel()
print(model.generate("summarize", "Three incidents occurred today."))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Foundation Models to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Large Language Models",
              slug: "large-language-models",
              description: "A large language model is trained on large quantities of text using learning objectives that teach it relationships among language units. During generation, it receives an input sequence...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A large language model is trained on large quantities of text using learning objectives that teach it relationships among language units. During generation, it receives an input sequence and produces a probability distribution over possible continuations.

The model does not operate as a traditional database that retrieves a guaranteed answer for every question. Its output is generated from patterns represented in learned parameters. This explains both its impressive fluency and its potential to produce unsupported statements.

A production application should therefore distinguish language quality from factual reliability. Retrieval, validation, source attribution, deterministic checks, and human review can be added when correctness matters.

An LLM generates probable continuations rather than acting as a guaranteed factual database. Separate fluency from correctness, and add retrieval or validation when the application needs trustworthy information.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
candidates = {
    "approved": 0.62,
    "pending": 0.23,
    "rejected": 0.15,
}
print(max(candidates, key=candidates.get))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Large Language Models to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "GPT and Pretraining",
              slug: "gpt-and-pretraining",
              description: "GPT refers to a family of generative pretrained Transformer-based language models. The important ideas are that the model is first trained broadly and later adapted for useful downstream...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `GPT refers to a family of generative pretrained Transformer-based language models. The important ideas are that the model is first trained broadly and later adapted for useful downstream behavior.

Pretraining learns general statistical structure from large collections of data. Subsequent adaptation can make a model better at instruction following, conversation, coding, or domain-specific tasks.

For application developers, the important distinction is between the general capability learned during training and the application-specific context supplied at runtime. A model can be broadly trained while the application supplies current product documentation or user-specific information through prompts and retrieval.

Pretraining builds broad statistical capability from large-scale data. Runtime prompts and retrieved context provide task-specific information. Keeping these layers conceptually separate makes application architecture easier to reason about.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
base_instruction = "You are a technical support assistant."
runtime_context = "The current product version is 8.4."
prompt = base_instruction + "\\nContext: " + runtime_context
print(prompt)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply GPT and Pretraining to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Supervised Learning",
              slug: "supervised-learning",
              description: "Supervised learning trains from input-output examples. Each example contains information presented to the model and a known target. Classification predicts a category. Binary...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Supervised learning trains from input-output examples. Each example contains information presented to the model and a known target.

Classification predicts a category. Binary classification has two categories, while multiclass classification has more. Regression predicts a continuous quantity such as demand, temperature, or price.

A model must be evaluated on examples that were not used to fit its parameters. Otherwise, the evaluation can measure memorization rather than generalization.

A reliable workflow is to define the target, collect representative examples, split data appropriately, train, evaluate on unseen data, inspect errors, and iterate.

The core workflow is target definition, representative data, training, evaluation on unseen data, error analysis, and iteration. Generalization matters more than memorizing the training examples.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
samples = [
    ({"hours": 2, "practice_tests": 1}, "pass"),
    ({"hours": 8, "practice_tests": 5}, "pass"),
    ({"hours": 1, "practice_tests": 0}, "fail"),
]
for features, label in samples:
    print(features, "=>", label)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Supervised Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Unsupervised learning works without predefined target labels. The algorithm searches for useful structure in the input data. Clustering is a common example: customer records can be...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Unsupervised learning works without predefined target labels. The algorithm searches for useful structure in the input data.

Clustering is a common example: customer records can be grouped according to behavioral similarity even when nobody has manually assigned customer segments. Other applications include anomaly detection, noise reduction, representation learning, and data simplification.

Because there is no supplied correct label for each example, evaluation often requires a mixture of mathematical measures, visualization, downstream task performance, and domain expertise.

Because there is no supplied target, interpretation and evaluation require extra care. A discovered cluster is not automatically a meaningful business segment; validate whether the structure is stable and useful.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
customers = {
    "C1": [2, 3, 1],
    "C2": [3, 2, 2],
    "C3": [18, 15, 17],
    "C4": [20, 16, 18],
}
print("Possible low-activity group:", ["C1", "C2"])
print("Possible high-activity group:", ["C3", "C4"])
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Unsupervised Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Semi-Supervised Learning",
              slug: "semi-supervised-learning",
              description: "Semi-supervised learning combines a small labeled dataset with a larger unlabeled dataset. It is useful when collecting raw examples is inexpensive but obtaining high-quality human...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Semi-supervised learning combines a small labeled dataset with a larger unlabeled dataset. It is useful when collecting raw examples is inexpensive but obtaining high-quality human labels is costly.

The labeled examples provide explicit task information. The unlabeled examples can provide additional information about the structure of the input distribution.

This strategy is common in settings such as image analysis, speech, text classification, and medical applications. Its success depends on whether the unlabeled population is actually representative and whether the assumptions made by the learning method are appropriate.

The approach is attractive when labels are expensive but raw data is plentiful. Its benefit depends on assumptions about the unlabeled data, so always check whether that data comes from the same population as production inputs.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
labeled = [("img1", "defect"), ("img2", "normal")]
unlabeled = ["img3", "img4", "img5", "img6", "img7"]
print(len(labeled), "labeled examples")
print(len(unlabeled), "unlabeled examples")
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Semi-Supervised Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Reinforcement learning trains an agent through interaction with an environment. The agent observes a state, chooses an action, receives feedback, and continues from the resulting state....",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Reinforcement learning trains an agent through interaction with an environment. The agent observes a state, chooses an action, receives feedback, and continues from the resulting state.

Important terms include state, action, reward, policy, and environment. The objective is generally related to maximizing useful reward over time rather than matching a single correct label.

This makes reinforcement learning suitable for sequential decision problems such as games, robotics, dynamic control, recommendation strategies, and other settings in which today's action can affect future outcomes.

Reason in terms of state, action, reward, policy, and long-term consequences. Reward design is critical because an agent can optimize a poorly chosen reward while behaving badly according to the real objective.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
state = "robot_at_station_A"
actions = {"move_to_B": 8, "move_to_C": 3, "wait": -1}
best = max(actions, key=actions.get)
print(state, "->", best)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Reinforcement Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Self-Supervised Learning",
              slug: "self-supervised-learning",
              description: "Self-supervised learning constructs training targets from the data itself. This makes it possible to learn from enormous collections of raw examples without requiring humans to label...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Self-supervised learning constructs training targets from the data itself. This makes it possible to learn from enormous collections of raw examples without requiring humans to label every item.

For language, a training objective can ask the model to predict a hidden or subsequent token. The data already contains the answer, so the training system can automatically create many learning examples.

This approach is especially important for language, vision, and speech because raw data is abundant. The quality of the learned capability still depends on data quality, objective design, model architecture, and scale.

Self-supervision creates learning targets from the data itself. This makes large-scale pretraining possible without manually labeling every example, but the chosen objective still shapes what the model learns.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
words = ["machine", "learning", "models", "patterns"]
for position in range(1, len(words)):
    print("context:", words[:position], "target:", words[position])
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Self-Supervised Learning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "LLM Input Pipeline",
              slug: "llm-input-pipeline",
              description: "A useful high-level model of language generation contains four stages: tokenization, embedding, contextual transformation through Transformer layers, and output generation. Tokenization...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A useful high-level model of language generation contains four stages: tokenization, embedding, contextual transformation through Transformer layers, and output generation.

Tokenization converts the input into discrete units. Embedding maps those units to vectors. Transformer layers transform the vectors while allowing tokens to interact through attention. The output stage produces scores or probabilities for possible next tokens and selects a continuation according to a decoding strategy.

This simplified pipeline is valuable because it connects application concerns such as token limits and cost with the underlying computation.

Follow the data flow from text to tokens, vectors, contextual representations, probabilities, and generated tokens. This mental model explains context limits, latency, and why prompt size affects many hosted-model workflows.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
pipeline = [
    "raw user message",
    "token IDs",
    "vector representations",
    "contextual Transformer computation",
    "next-token probabilities",
    "generated output",
]
print(" -> ".join(pipeline))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply LLM Input Pipeline to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Tokenization",
              slug: "tokenization",
              description: "Tokenization divides text into units that a language model's vocabulary can represent. A token can be a complete word, part of a word, punctuation, or another subword unit. The exact...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Tokenization divides text into units that a language model's vocabulary can represent. A token can be a complete word, part of a word, punctuation, or another subword unit.

The exact token boundaries depend on the tokenizer. Therefore, character count and token count are related but not identical.

Tokenization matters in application development because token counts affect context capacity, request cost for many hosted services, latency, and how much useful information can fit into a request. Removing repeated instructions and irrelevant retrieved content can therefore improve both cost and quality.

Token count is not the same as character or word count. Tokenization affects context usage and often cost, so production systems should measure tokens with the actual tokenizer used by the selected model.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def rough_tokens(text):
    return text.replace(".", " .").replace(",", " ,").split()

message = "Order 4821 is delayed, please investigate."
tokens = rough_tokens(message)
print(tokens)
print("rough token count:", len(tokens))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Tokenization to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "An embedding represents a token or other item as a vector of numbers. The representation allows neural networks to operate on continuous values and learn relationships among items....",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `An embedding represents a token or other item as a vector of numbers. The representation allows neural networks to operate on continuous values and learn relationships among items.

Embedding dimensions should not normally be interpreted as simple human concepts. Meaning is distributed across the vector space. Similarity can emerge because related items receive representations with useful geometric relationships.

The same idea is useful outside language models. Document embeddings can support semantic search, product embeddings can support recommendation, and image embeddings can support similarity retrieval.

An embedding is useful because relationships can be represented geometrically. Similarity search works by comparing vectors, but the quality of the result depends on the embedding model, the data, and the retrieval strategy.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
vectors = {
    "tea": [0.90, 0.80, 0.20],
    "coffee": [0.88, 0.79, 0.24],
    "bicycle": [0.12, 0.22, 0.91],
}
for name, vector in vectors.items():
    print(name, vector)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Embeddings to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Contextual Meaning",
              slug: "contextual-meaning",
              description: "A token can have different meanings depending on the words around it. A word such as 'bank' can refer to a financial institution or a river edge. A useful language system therefore needs...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A token can have different meanings depending on the words around it. A word such as 'bank' can refer to a financial institution or a river edge. A useful language system therefore needs contextual processing rather than a fixed meaning attached to every token.

The early representation is enriched by later Transformer computation. Attention lets a token incorporate information from other positions in the sequence.

This is a key reason modern language systems can resolve references, track topics, and distinguish meanings that depend on surrounding text.

Meaning is often determined by surrounding tokens. This is why context-aware representations are important for language understanding and why isolated keyword matching can fail on ambiguous text.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
examples = [
    "She deposited the cheque at the bank.",
    "The hikers rested beside the river bank.",
]
for sentence in examples:
    print(sentence)
    print("Interpretation depends on context.")
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Contextual Meaning to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Transformer Layers and Self-Attention",
              slug: "transformer-layers-and-self-attention",
              description: "Transformer layers use attention to determine which other positions in a sequence should influence the representation being computed for a token. At a simplified level, each token...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Transformer layers use attention to determine which other positions in a sequence should influence the representation being computed for a token.

At a simplified level, each token produces a query, key, and value representation. Query-key comparisons produce relevance scores. Those scores are converted into weights, and the value representations are combined using the weights.

Real Transformer blocks contain additional components such as multiple attention heads, feed-forward networks, normalization, residual connections, and positional information. The simplified picture is still useful: self-attention allows every token to interact with other tokens in the same sequence.

This ability is particularly useful for long-range relationships in language.

Self-attention lets each position incorporate information from other positions. Learn the query-key-value flow first, then connect it to multi-head attention, residual connections, normalization, feed-forward layers, and positional information.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
values = {"customer": 0.8, "reported": 0.6, "failure": 0.95}
weights = {"customer": 0.3, "reported": 0.5, "failure": 0.9}
combined = sum(values[k] * weights[k] for k in values)
print("illustrative weighted value:", combined)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Transformer Layers and Self-Attention to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Next-Token Prediction and Decoding",
              slug: "next-token-prediction-and-decoding",
              description: "After contextual processing, a language model produces a probability distribution over possible next tokens. Generation chooses one token and then repeats the process using the expanded...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `After contextual processing, a language model produces a probability distribution over possible next tokens. Generation chooses one token and then repeats the process using the expanded sequence.

Choosing the most probable token is one decoding strategy. Sampling can choose among several plausible tokens and therefore introduces variation. Different decoding settings can make responses more conservative or more diverse.

This probabilistic process is central to generative behavior. It also explains why two requests with identical wording can sometimes result in different outputs and why fluent output should not automatically be treated as verified fact.

Generation repeatedly predicts a distribution for the next token. Decoding controls how that distribution becomes output, so generation settings influence consistency, diversity, and reproducibility.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
probabilities = {
    "resolved": 0.58,
    "pending": 0.27,
    "failed": 0.15,
}
print("highest probability:", max(probabilities, key=probabilities.get))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Next-Token Prediction and Decoding to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Traditional predictive systems often produce a fixed class, score, or numerical estimate. Generative systems can produce open-ended content. That changes the software contract....",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Traditional predictive systems often produce a fixed class, score, or numerical estimate. Generative systems can produce open-ended content. That changes the software contract.

Generative applications commonly have probabilistic outputs, support natural-language prompting, operate across multiple modalities, and require users to collaborate with or review the system.

The result is a new set of engineering requirements: prompts need design and testing, outputs need evaluation, user interfaces need control mechanisms, and guardrails need to handle failures that ordinary deterministic programs would not produce.

Generative systems have open-ended outputs, so the software contract changes. Evaluation must account for usefulness, factuality, safety, consistency, and the ability of users or downstream systems to recover from errors.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def traditional_output(value):
    return "PASS" if value >= 50 else "FAIL"

def generative_output(topic):
    return f"Possible ideas about {topic}: idea A, idea B, idea C"

print(traditional_output(73))
print(generative_output("weekend projects"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply What Makes Generative AI Different to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Deterministic versus Probabilistic Systems",
              slug: "deterministic-versus-probabilistic-systems",
              description: "Deterministic software is valuable when the same input and state must produce a repeatable result. Examples include validation, accounting calculations, permission checks, and...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Deterministic software is valuable when the same input and state must produce a repeatable result. Examples include validation, accounting calculations, permission checks, and transaction rules.

Probabilistic generation is valuable when there can be many acceptable responses, such as drafting, summarization, brainstorming, and conversational assistance.

The strongest production design often combines them. The model can interpret a natural-language request, while deterministic services decide whether an action is permitted and execute the authoritative operation.

Use deterministic code for operations that must be exact, repeatable, and policy-controlled. Use probabilistic generation where multiple outputs can be acceptable. Combining both usually produces a stronger production design.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def transfer(balance, amount, limit):
    if amount <= 0:
        raise ValueError("invalid amount")
    if amount > balance:
        raise ValueError("insufficient balance")
    if amount > limit:
        raise ValueError("limit exceeded")
    return balance - amount

print(transfer(5000, 700, 1000))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Deterministic versus Probabilistic Systems to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Prompt Design",
              slug: "prompt-design",
              description: "A prompt is an application interface to a generative model. It should communicate the task, relevant context, constraints, and expected result. Production prompts are often templates...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A prompt is an application interface to a generative model. It should communicate the task, relevant context, constraints, and expected result.

Production prompts are often templates rather than hand-written messages. A template can contain a system instruction, retrieved context, user input, output requirements, and explicit boundaries.

Good prompt design is measurable. Create representative test cases and compare outputs across prompt versions. Avoid stuffing every available document into the request; relevant context is usually more useful than maximum context.

A good prompt defines the task, context, constraints, and expected output. Treat prompts as versioned application assets and evaluate them against representative cases rather than judging them from one successful response.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
template = """You are a support assistant.
Task: classify the request.
Allowed labels: BILLING, ACCOUNT, TECHNICAL.
Customer: {message}
Return one label only."""

print(template.format(message="My invoice is incorrect."))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Prompt Design to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Multimodal AI",
              slug: "multimodal-ai",
              description: "Multimodal systems can work with multiple forms of information, such as text, images, audio, video, or combinations of these. A support application could accept a photograph of a damaged...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Multimodal systems can work with multiple forms of information, such as text, images, audio, video, or combinations of these.

A support application could accept a photograph of a damaged device together with a written description. A model may use both sources to draft an answer. Another application might analyze a chart image and answer a question about the values.

Each modality introduces possible errors. Image interpretation can be wrong, speech recognition can mishear names, and generated descriptions can omit details. High-impact workflows should therefore validate important information rather than treating multimodal output as authoritative.

Different modalities can complement one another, but each adds another source of uncertainty. Validate important extracted facts and avoid assuming that a model's interpretation of an image, audio clip, or video is authoritative.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
request = {
    "image": "damaged_device.png",
    "description": "The device will not charge.",
    "requested_output": "support response",
}
print(request)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Multimodal AI to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Generative AI changes how users interact with software. Instead of selecting every option through menus, users can express goals in ordinary language. This flexibility does not make...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Generative AI changes how users interact with software. Instead of selecting every option through menus, users can express goals in ordinary language.

This flexibility does not make interface design unnecessary. Users still need control, feedback, visibility, and recovery. Useful patterns include editing generated content, regenerating results, showing supporting sources, previewing actions, providing stop controls, and requiring confirmation before irreversible operations.

The AI should fit naturally into the user's workflow. Adding a chatbot merely because the technology is available can make an otherwise simple task slower and more frustrating.

Generative interfaces should give users control over uncertain output. Editing, regeneration, source visibility, previews, confirmation steps, and recovery paths are practical ways to keep the user in control.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class DraftingInterface:
    def submit(self, request):
        return {
            "draft": "Suggested response for: " + request,
            "controls": ["edit", "regenerate", "approve"]
        }

print(DraftingInterface().submit("Explain a delayed shipment"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply User Experience for Generative Applications to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Guardrails",
              slug: "guardrails",
              description: "Generative models can produce false, biased, unsafe, irrelevant, or sensitive output. Guardrails are controls that reduce the chance and impact of these failures. Important layers...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Generative models can produce false, biased, unsafe, irrelevant, or sensitive output. Guardrails are controls that reduce the chance and impact of these failures.

Important layers include authentication, authorization, input filtering, prompt structure, trusted retrieval, output validation, sensitive-data handling, tool permissions, rate limiting, logging, monitoring, and human review.

A prompt instruction alone is not a security boundary. If an action must never exceed a financial limit, enforce that limit in application code. If a user is not authorized to view a record, enforce access control before the model receives or returns the protected information.

Guardrails should be layered. Prompts can guide behavior, but security and business policies need enforcement in trusted application code. Limit model permissions and validate both inputs and outputs.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def enforce_limit(amount, limit):
    if amount > limit:
        raise PermissionError("requested operation exceeds policy")
    return True

print(enforce_limit(50, 100))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Guardrails to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Hallucination and Reliability",
              slug: "hallucination-and-reliability",
              description: "Generative models can produce statements that sound authoritative even when they are unsupported or incorrect. This behavior is often called hallucination. The risk depends on the...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Generative models can produce statements that sound authoritative even when they are unsupported or incorrect. This behavior is often called hallucination.

The risk depends on the application. Brainstorming can tolerate uncertainty, while financial, medical, legal, security, or account-management workflows may require much stronger evidence.

Mitigation techniques include retrieval from authoritative sources, structured outputs, source attribution, post-generation validation, deterministic calculations, constrained actions, and human approval.

The engineering goal is not simply to demand perfect answers from the model. The goal is to build a system in which errors are detected, contained, corrected, or escalated.

Reliability is a system property, not just a model property. Retrieval, citations, structured outputs, deterministic checks, constrained tools, monitoring, and human approval can reduce the impact of unsupported generation.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def answer_with_evidence(question, evidence):
    return {
        "question": question,
        "answer": "Use the supplied evidence.",
        "evidence": evidence,
    }

print(answer_with_evidence(
    "What is the warranty period?",
    "Warranty coverage is 24 months."
))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Hallucination and Reliability to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Hosted models are accessed through a provider's API, while self-hosted models run on infrastructure controlled by the application owner. Hosted access can reduce infrastructure and...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Hosted models are accessed through a provider's API, while self-hosted models run on infrastructure controlled by the application owner.

Hosted access can reduce infrastructure and model-serving work and can make advanced capabilities available quickly. It also introduces provider dependency, network considerations, pricing, usage limits, and data-handling questions.

Self-hosting can increase control over data and deployment but transfers responsibility for hardware, model serving, scaling, updates, monitoring, capacity planning, and operational reliability.

Choose according to privacy, latency, cost, customization, operational capability, reliability, and business requirements.

Hosted services trade infrastructure effort for provider dependency and external data-handling considerations. Self-hosting increases control but also increases operational responsibility. Compare both against the application's actual constraints.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
options = {
    "hosted": ["quick integration", "provider infrastructure"],
    "self_hosted": ["more control", "more operational responsibility"],
}
for name, properties in options.items():
    print(name, ":", ", ".join(properties))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Hosted versus Self-Hosted Models to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Cost and Token Economics",
              slug: "cost-and-token-economics",
              description: "For many hosted generative services, usage is related to the amount of input and output processed. Long prompts, large conversation histories, repeated documents, and unnecessarily long...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `For many hosted generative services, usage is related to the amount of input and output processed. Long prompts, large conversation histories, repeated documents, and unnecessarily long responses can therefore increase both cost and latency.

Optimization should focus on useful context rather than simply shortening everything. Remove duplication, summarize old conversation history when appropriate, retrieve only relevant documents, cache safe repeated work, select smaller models for simple tasks, and constrain unnecessary output.

Measure cost at the feature or workflow level. A higher-cost model may still be worthwhile if it creates substantially greater business value.

Optimize for useful context, not simply fewer tokens. Measure input and output usage, cache safe repeated work, retrieve only relevant information, and use less expensive models for tasks that do not need the strongest capability.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
usage = {
    "input": 1400,
    "output": 320,
}
total = usage["input"] + usage["output"]
print("combined usage units:", total)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Cost and Token Economics to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Privacy and Intellectual Property",
              slug: "privacy-and-intellectual-property",
              description: "AI applications can process personal information, confidential business material, proprietary documents, and user-created content. Before data is sent to a model service, the...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `AI applications can process personal information, confidential business material, proprietary documents, and user-created content. Before data is sent to a model service, the organization should understand what is transmitted, where it goes, how it is retained, and what controls apply.

Intellectual-property questions also require deliberate review. Model availability does not automatically mean every possible use of model output, reference content, or training material is unrestricted. Commercial applications should review applicable provider terms, licenses, data rights, and organizational policies.

A useful practice is to classify data before it enters prompts, retrieval systems, logs, analytics, or model-training workflows.

Classify information before it reaches prompts, retrieval stores, logs, or training workflows. Review applicable data-handling requirements, provider terms, licenses, and organizational policies before using external model services.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
data_rules = {
    "password": "never send",
    "public_document": "normally acceptable",
    "confidential_contract": "approved controls required",
}
for data, rule in data_rules.items():
    print(data, "->", rule)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Privacy and Intellectual Property to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "When Generative AI Is a Good Fit",
              slug: "when-generative-ai-is-a-good-fit",
              description: "Generative AI is a strong candidate when a task benefits from flexible language or content creation. Examples include drafting, summarization, rewriting, conversational search, document...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Generative AI is a strong candidate when a task benefits from flexible language or content creation. Examples include drafting, summarization, rewriting, conversational search, document transformation, brainstorming, coding assistance, and multimodal interpretation.

A good candidate usually has several acceptable outputs and a user or downstream system capable of checking the result.

A poor candidate is often a task where the result must be exact and a deterministic method already performs the job cheaply and reliably. For example, arithmetic, strict format validation, permission enforcement, and transactional state changes should generally remain deterministic.

The strongest candidates usually have flexible outputs and a workflow that can tolerate or check model uncertainty. Exact calculations, authorization, strict validation, and transactional state changes are generally better handled deterministically.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
tasks = {
    "summarize_meeting": "generative",
    "calculate_invoice_total": "deterministic",
    "draft_reply": "generative",
    "validate_account_id": "deterministic",
}
for task, method in tasks.items():
    print(task, "->", method)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply When Generative AI Is a Good Fit to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Customer-service assistants can help users ask questions naturally, summarize support cases, draft responses, and find relevant product information. Accuracy and privacy are critical. A...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Customer-service assistants can help users ask questions naturally, summarize support cases, draft responses, and find relevant product information.

Accuracy and privacy are critical. A safe design separates conversational interpretation from authoritative operations. The model may identify that a customer wants an order status, while a backend service retrieves the actual status.

For sensitive workflows, the application should prevent the model from inventing account information or directly performing unauthorized actions. The model should operate within explicit data and permission boundaries.

Keep customer data access and account operations in authoritative backend services. The model can interpret requests and explain results, but it should not invent account facts or bypass permissions.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class OrderService:
    def status(self, order_id):
        return {"id": order_id, "status": "SHIPPED"}

service = OrderService()
print(service.status("ORD-8042"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply AI-Enhanced Customer Service to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Generative Writing Assistance",
              slug: "generative-writing-assistance",
              description: "Writing assistants are well suited to drafting and transforming language because language generation requires broad knowledge and allows many acceptable formulations. Useful tasks...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Writing assistants are well suited to drafting and transforming language because language generation requires broad knowledge and allows many acceptable formulations.

Useful tasks include brainstorming, outlining, rewriting, grammar improvement, summarization, tone adjustment, and drafting.

The main risk is over-trust. A polished response can contain fabricated facts or references. The human should remain able to review and edit important content, and generated claims should be verified when accuracy matters.

Writing assistance is valuable because many formulations can satisfy the same goal. Keep humans in the loop for consequential content and verify factual claims, citations, and sensitive statements.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
def improve_clarity(sentence):
    return "Clearer draft: " + sentence

print(improve_clarity(
    "The release was postponed because two dependent services were unavailable."
))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Generative Writing Assistance to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Image Generation",
              slug: "image-generation",
              description: "Text-to-image systems generate visual content from learned relationships between descriptions and images. The same general request can produce different results because generation is...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Text-to-image systems generate visual content from learned relationships between descriptions and images. The same general request can produce different results because generation is probabilistic.

Creative exploration benefits from this variation, while professional workflows may require stronger controls over composition, style, consistency, and editing.

Commercial users should also consider the rights and licensing status of training sources, reference material, logos, characters, photographs, and generated assets. The technical ability to generate an image is not itself a guarantee that every use is legally unrestricted.

Image generation is useful for rapid visual exploration, but consistency, composition, editing, and rights considerations become important in professional workflows. Treat generated assets as outputs that still require review.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
image_spec = {
    "subject": "electric scooter",
    "environment": "modern city plaza",
    "composition": "product-focused",
    "lighting": "soft evening light",
}
for key, value in image_spec.items():
    print(key, "=", value)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Image Generation to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "AI Engineering",
              slug: "ai-engineering",
              description: "AI engineering is the work of turning model capabilities into dependable applications. Calling a model API is only one part of that process. A practical architecture may contain a user...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `AI engineering is the work of turning model capabilities into dependable applications. Calling a model API is only one part of that process.

A practical architecture may contain a user interface, authentication, input validation, prompt construction, retrieval or tool access, model invocation, output validation, business services, logging, monitoring, and evaluation.

The model should be treated as a probabilistic component inside a larger software system. The surrounding application should enforce rules that must always hold and should provide recovery when model output is incomplete or wrong.

AI engineering combines model calls with ordinary software engineering: APIs, validation, retrieval, tools, security, observability, evaluation, retries, fallbacks, and deployment. The model should fit inside a controlled system boundary.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class AIWorkflow:
    def run(self, user_input):
        clean = user_input.strip()
        if not clean:
            raise ValueError("empty request")
        model_result = "generated result for: " + clean
        return self.validate(model_result)

    def validate(self, result):
        if not result:
            raise ValueError("empty model result")
        return result

print(AIWorkflow().run("Summarize today's incident"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply AI Engineering to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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
              description: "Model selection should start with application requirements, not popularity. Evaluate quality on representative tasks and consider modality support, context capacity, tool use, latency,...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Model selection should start with application requirements, not popularity. Evaluate quality on representative tasks and consider modality support, context capacity, tool use, latency, cost, privacy, deployment model, availability, and operational constraints.

A model that performs well on a public benchmark may not be the best model for a particular business workflow. Build a small evaluation suite containing real examples, difficult edge cases, expected behavior, and unacceptable failure modes.

Compare candidates using the same evaluation process and keep the dataset versioned so that improvements can be measured over time.

Choose models with representative evaluations rather than reputation alone. Compare quality, latency, cost, context capacity, modalities, tool support, privacy, availability, and operational complexity using the same test suite.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
requirements = {
    "quality": "high",
    "latency_ms": 1200,
    "image_input": True,
    "budget_per_request": 0.03,
}
for key, value in requirements.items():
    print(key, value)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Model Selection to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Production Architecture",
              slug: "production-architecture",
              description: "A dependable generative application can be organized into layers. The user layer collects intent and displays results. The application layer handles authentication and workflow. A...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `A dependable generative application can be organized into layers.

The user layer collects intent and displays results. The application layer handles authentication and workflow. A context layer retrieves trusted information. The model layer performs generation. Validation and safety layers check the result. Business services remain authoritative for data and transactions. Observability records usage, failures, latency, and quality signals.

This separation makes failure handling clearer. If the model suggests an incorrect price, the product database remains authoritative. If a user lacks permission, authorization should prevent protected data from being exposed regardless of what the model requests.

A production AI system needs clear boundaries between user input, orchestration, retrieval, model execution, tools, validation, business services, storage, and observability. Design failure paths before optimizing the happy path.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
layers = [
    "user",
    "application",
    "trusted context",
    "model",
    "validation",
    "business services",
    "observability",
]
print(" -> ".join(layers))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Production Architecture to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Interview and Revision Master Section",
              slug: "interview-and-revision-master-section",
              description: "Be able to explain these ideas in your own words: AI is the broad field of intelligent computing. Machine learning learns patterns from data. Deep learning uses layered neural networks....",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Be able to explain these ideas in your own words:

AI is the broad field of intelligent computing. Machine learning learns patterns from data. Deep learning uses layered neural networks. Foundation models are broadly trained reusable models. Language models generate language from learned statistical patterns. Tokens are discrete input/output units. Embeddings are vector representations. Attention lets representations use information from other positions. Prompt engineering shapes the model's task and context. Multimodality combines different data types. Guardrails reduce unsafe or invalid behavior. Hallucination describes plausible but unsupported output.

For an interview, go beyond definitions. Explain why each concept exists, what mechanism is involved, when it is useful, what can go wrong, and how an engineer would design around the failure.

Use this topic as a structured revision pass rather than as an interview-question bank. Revisit the full learning chain: AI foundations, learning paradigms, LLM internals, prompting, safety, reliability, deployment, cost, privacy, and application architecture. For each concept, explain the input, transformation, output, trade-offs, and one realistic failure mode.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
questions = [
    "Why can a language model produce a fluent but false statement?",
    "Why does token usage matter to application design?",
    "Why are embeddings useful?",
    "What problem does self-attention solve?",
    "When should deterministic code be preferred?",
    "How would you reduce unsupported model answers?",
]
for i, question in enumerate(questions, 1):
    print(i, question)
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Interview and Revision Master Section to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
              ],
            },
            {
              title: "Capstone Project — Safe AI Support Assistant",
              slug: "capstone-project-safe-ai-support-assistant",
              description: "Build a fictional support assistant to connect the concepts into one application. The user sends a natural-language question. The application validates the request, determines the task...",
              estimatedMinutes: 12,
              sections: [
                {
                  title: "Detailed explanation",
                  content: `Build a fictional support assistant to connect the concepts into one application.

The user sends a natural-language question. The application validates the request, determines the task type, retrieves only approved product information, builds a structured prompt, asks a language model to draft an answer, validates the result, and presents it for review when necessary.

Do not allow the model to directly change account or payment state. If the user asks for an operation, the model can interpret the intent, but a normal backend service should verify authorization and execute the transaction.

Add logging for latency and usage, create an evaluation dataset, collect user feedback, and regularly test failure cases. This turns the model from a demonstration into an engineered application.

A capstone should combine the individual ideas into one controlled workflow: accept a user request, validate it, retrieve trusted information when needed, generate a response, validate the result, enforce permissions, log important events, and provide a safe recovery path. The goal is to demonstrate system thinking rather than merely calling a model.

When studying this topic, change one input in the example, predict the result before running it, and then explain why the observed result follows from the underlying mechanism.`,
                },
                {
                  title: "Example",
                  content: `\`\`\`python
class SupportAssistant:
    def classify(self, message):
        text = message.lower()
        if "invoice" in text or "payment" in text:
            return "BILLING"
        if "password" in text or "login" in text:
            return "ACCOUNT"
        if "error" in text or "crash" in text:
            return "TECHNICAL"
        return "GENERAL"

    def handle(self, message):
        category = self.classify(message)
        return {
            "category": category,
            "requires_review": category in {"BILLING", "ACCOUNT"},
        }

assistant = SupportAssistant()
print(assistant.handle("I cannot log into my account"))
\`\`\``,
                },
                {
                  title: "Practical use",
                  content: `Apply Capstone Project — Safe AI Support Assistant to a small, concrete scenario. Start with the simplest version, observe the behavior, then change one assumption and explain the difference. In a production design, connect this concept to the surrounding data flow, validation, monitoring, or user workflow rather than treating the model or algorithm as an isolated component.`,
                },
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

