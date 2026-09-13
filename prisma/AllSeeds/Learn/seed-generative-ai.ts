import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...(topicSeed.sections ?? []), ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedGenerativeAICategory() {
  const category: CategorySeed = {
    name: "Generative AI",
    slug: "generative-ai",
    description: "Master Generative AI from basics to advanced: LLMs, transformers, prompt engineering, fine-tuning, RAG, RLHF, and deployment.",
    icon: "GAI",
    sortOrder: 20,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand what Generative AI is, how large language models work, and the basics of prompt engineering.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations of Generative AI",
            slug: "genai-foundations",
            description: "Core concepts, types of models, and use cases.",
            topics: [
              {
                title: "What is Generative AI – The Big Picture",
                slug: "what-is-genai",
                shortDescription: "Definition, history, and key applications.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Definition and Scope", content: "Generative AI refers to artificial intelligence that can create new content – text, images, audio, video, code – by learning patterns from existing data. Unlike discriminative models (which classify or predict), generative models produce original outputs. This is achieved by learning a probability distribution over the data and sampling from it." },
                  { title: "A Brief History", content: "The field began with GANs (2014) and VAEs, but truly exploded with the Transformer architecture (2017) and subsequent large language models like GPT (2018) and BERT. Diffusion models (2020) revolutionised image generation. The release of ChatGPT in 2022 brought generative AI into the mainstream." },
                  { title: "Key Model Families", content: "**Large Language Models (LLMs)**: GPT, Claude, Llama – generate text. **Diffusion Models**: Stable Diffusion, DALL‑E – generate images from text. **GANs**: Generative Adversarial Networks – used for image synthesis, style transfer. **VAEs**: Variational Autoencoders – generative models for structured data." },
                  { title: "Real‑World Applications", content: "Text generation (chatbots, copywriting), summarisation, translation, code generation (Copilot), image creation (DALL‑E), music composition, drug discovery, and synthetic data generation." },
                  { title: "How Generative Models Work – A High‑Level View", content: "They learn to model the joint distribution of the data. During generation, they sample from this distribution – often conditioned on a prompt. For LLMs, this means predicting the next token given the previous ones." },
                ],
              },
              {
                title: "Large Language Models (LLMs) – The Engine of Modern AI",
                slug: "llm-basics",
                shortDescription: "What LLMs are, how they are trained, and their capabilities.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is an LLM?", content: "A Large Language Model is a deep neural network, typically a Transformer, trained on vast amounts of text data to predict the next word/token in a sequence. They develop a statistical understanding of language, grammar, reasoning, and world knowledge." },
                  { title: "The Training Pipeline", content: "**Pre‑training**: Unsupervised learning on massive corpora (internet, books, Wikipedia) – teaches general language understanding. **Supervised Fine‑Tuning (SFT)**: Train on (instruction, response) pairs to follow instructions. **Alignment (RLHF)**: Use reinforcement learning from human feedback to make outputs safe and helpful." },
                  { title: "Capabilities and Limitations", content: "Capabilities: text generation, reasoning, Q&A, translation, code generation, summarisation, creative writing. Limitations: hallucinations (confident wrong answers), lack of true reasoning, biases from training data, limited context windows (though growing)." },
                  { title: "Popular LLMs", content: "**GPT‑4** (OpenAI), **Claude 3.5** (Anthropic), **Llama 3** (Meta), **Gemini** (Google), **Mistral** (Mistral AI), **Falcon** (TII). Each has different sizes, architectures, and license types (open vs closed)." },
                ],
              },
              {
                title: "Prompt Engineering Basics – Talk to the Model",
                slug: "prompt-engineering",
                shortDescription: "Craft effective prompts to get desired outputs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Prompt Engineering?", content: "Prompt engineering is the discipline of designing inputs (prompts) to elicit the most accurate, relevant, and useful responses from an LLM. It’s a critical skill because the model's output is highly sensitive to the prompt structure." },
                  { title: "Core Techniques", content: "**Zero‑shot**: give a direct instruction without examples (e.g., 'Summarise this article'). **Few‑shot**: provide a few examples of input‑output pairs in the prompt to guide the model. **Chain‑of‑Thought (CoT)**: ask the model to think step‑by‑step, which improves reasoning tasks." },
                  { title: "Structuring Your Prompt", content: "A good prompt often includes: **Role** (e.g., 'You are a data scientist'), **Task** (clear instruction), **Context** (relevant background information), **Input** (the data to act on), and **Output Format** (how you want the response – JSON, bullet points, etc.)." },
                  { title: "Common Pitfalls", content: "Vague or overly broad instructions; too much irrelevant context; forgetting to specify constraints (length, tone, format); not enough examples for few‑shot; assuming the model has up‑to‑date information." },
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
        description: "Dive into transformer architecture, attention mechanisms, fine‑tuning, and RAG.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Transformer and Attention – The Core Architecture",
            slug: "transformer-attention",
            description: "The architecture behind modern LLMs.",
            topics: [
              {
                title: "Transformer Architecture – The Game Changer",
                slug: "transformer-architecture",
                shortDescription: "Encoder‑decoder, self‑attention, positional encoding, feed‑forward layers.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Introduction to Transformers", content: "Introduced in the paper 'Attention Is All You Need' (Vaswani et al., 2017), the Transformer replaces recurrent layers with self‑attention and positional encodings. It processes sequences in parallel, making it far more efficient than RNNs and LSTMs." },
                  { title: "Encoder and Decoder Structure", content: "The original Transformer has an **encoder** (processes the input) and a **decoder** (generates the output). The encoder consists of alternating self‑attention and feed‑forward layers; the decoder has self‑attention, cross‑attention, and feed‑forward layers. Many modern LLMs use only the decoder (GPT) or only the encoder (BERT)." },
                  { title: "Self‑Attention in Detail", content: "For each token, self‑attention computes weighted sums of all other tokens. The weights are based on the compatibility between tokens (dot product of query and key). This allows the model to capture long‑range dependencies directly." },
                  { title: "Multi‑Head Attention", content: "Instead of a single attention head, the model uses multiple heads in parallel, each learning different relationship patterns. These are concatenated and projected." },
                  { title: "Positional Encoding", content: "Since self‑attention is order‑agnostic, we add positional encodings (sine/cosine functions) to the input embeddings to provide information about token position." },
                  { title: "Feed‑Forward Networks and Layer Normalisation", content: "After attention, a feed‑forward network (MLP) is applied per token, followed by residual connections and layer normalisation. This adds non‑linearity and stabilises training." },
                ],
              },
              {
                title: "Attention Mechanism – Query, Key, Value",
                slug: "attention-mechanism",
                shortDescription: "How attention works, QKV, and scaled dot‑product attention.",
                estimatedMinutes: 26,
                sections: [
                  { title: "The Query‑Key‑Value Model", content: "Each input token is transformed into three vectors: **Query** (what am I looking for?), **Key** (what do I offer?), and **Value** (what information do I carry?). The attention score between two tokens is the dot product of their query and key, scaled and passed through softmax to get weights. The output is a weighted sum of values." },
                  { title: "Scaled Dot‑Product Attention", content: "`Attention(Q, K, V) = softmax(Q K^T / √d_k) V`. The scaling (division by √d_k) prevents the dot products from becoming too large, which would push the softmax into regions of very small gradients." },
                  { title: "Multi‑Head Attention", content: "`MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W_O`. Each head projects Q, K, V with different matrices and performs attention; results are concatenated." },
                  { title: "Attention Visualisation", content: "Attention weights can be visualised as heatmaps to see which tokens the model focuses on. This is useful for interpretability." },
                ],
              },
              {
                title: "Fine‑Tuning and Instruction Tuning",
                slug: "fine-tuning",
                shortDescription: "Adapt pre‑trained models for specific tasks.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Fine‑Tuning?", content: "Taking a pre‑trained model and continuing training on a smaller, domain‑specific dataset. This adapts the model to a particular style, domain, or task (e.g., legal, medical, customer support)." },
                  { title: "Supervised Fine‑Tuning (SFT)", content: "The model is trained on (instruction, response) pairs. This teaches the model to follow user instructions. It's the first step after pre‑training." },
                  { title: "Parameter‑Efficient Fine‑Tuning (PEFT)", content: "Instead of updating all weights, PEFT methods update a small subset. **LoRA** (Low‑Rank Adaptation) adds trainable rank‑decomposition matrices to the attention layers. **QLoRA** quantises the base model to 4‑bit and uses LoRA. This drastically reduces compute and memory." },
                  { title: "When to Fine‑Tune vs Prompt Engineering", content: "Fine‑tune when you need consistent style, domain knowledge, or private data. Prompt engineering is cheaper and faster for dynamic tasks. Use PEFT when you need to fine‑tune but have limited resources." },
                ],
              },
              {
                title: "Retrieval‑Augmented Generation (RAG) – Grounding the Model",
                slug: "rag",
                shortDescription: "Combine retrieval with generation to ground LLM responses.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is RAG?", content: "RAG enhances LLM responses by retrieving relevant documents from a knowledge base and injecting them into the prompt. This improves factual accuracy, reduces hallucinations, and allows citing sources." },
                  { title: "RAG Architecture", content: "1. **Query**: user asks a question. 2. **Retrieval**: the query is embedded and used to find similar documents in a vector database. 3. **Augmentation**: retrieved documents are inserted into the prompt. 4. **Generation**: the LLM produces the final answer, using the documents as evidence." },
                  { title: "Vector Databases", content: "**Pinecone**, **Weaviate**, **Milvus**, **Chroma**, **Qdrant**. They store embeddings and support efficient similarity search (ANN). Choose based on scalability, cost, and managed vs self‑hosted." },
                  { title: "Advanced RAG Techniques", content: "**HyDE** – generate a hypothetical answer first, then use that to retrieve documents. **RAPTOR** – recursively summarise chunks to retrieve higher‑level context. **Self‑RAG** – the model reflects on its own retrieved content." },
                  { title: "Challenges", content: "Retrieval latency, chunk size optimisation, outdated documents, and handling irrelevant retrievals." },
                ],
              },
              {
                title: "Evaluation and Metrics – Measuring Quality",
                slug: "eval-metrics",
                shortDescription: "How to evaluate generative models.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Automatic Metrics", content: "**BLEU** and **ROUGE**: n‑gram overlap, used for translation and summarisation. **Perplexity**: measures how well the model predicts a sample (lower is better). **BERTScore**: uses contextual embeddings to measure semantic similarity. **METEOR**: better alignment with human judgment." },
                  { title: "Human Evaluation", content: "Often the gold standard – humans rate outputs for coherence, relevance, fluency, and factual correctness. Used for open‑ended tasks." },
                  { title: "LLM‑as‑a‑Judge", content: "Using a strong LLM (e.g., GPT‑4) to evaluate another model's outputs. This can scale evaluation but may introduce bias (e.g., favouring its own style)." },
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
        description: "RLHF, agents, model deployment, optimisation, diffusion models, advanced attention, MoE, and responsible AI.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Alignment and RLHF",
            slug: "rlhf",
            description: "Reinforcement Learning from Human Feedback.",
            topics: [
              {
                title: "RLHF Overview – Aligning Models with Human Values",
                slug: "rlhf-overview",
                shortDescription: "Improve model safety and helpfulness using human preferences.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why RLHF?", content: "Pre‑trained and SFT models can produce toxic, biased, or unhelpful content. RLHF steers the model to generate outputs that are more aligned with human expectations." },
                  { title: "The RLHF Pipeline", content: "1. Collect human preference data – comparators rank model outputs for a given prompt. 2. Train a **Reward Model** to predict the preferred output. 3. Use reinforcement learning (Proximal Policy Optimisation – PPO) to fine‑tune the base model to maximise reward." },
                  { title: "Reward Model Training", content: "The reward model takes a prompt and a response, and outputs a scalar reward. It is trained to rank responses according to human preferences." },
                  { title: "PPO – Proximal Policy Optimisation", content: "A policy gradient algorithm that constrains updates to prevent destructive changes. It uses a clipped surrogate objective to ensure stable training." },
                  { title: "Limitations and Alternatives", content: "RLHF is expensive, requires high‑quality human data, and can introduce new biases (e.g., reward hacking). Alternatives include Constitutional AI (self‑critique) and Direct Preference Optimisation (DPO)." },
                ],
              },
              {
                title: "Constitutional AI – Self‑Alignment",
                slug: "constitutional-ai",
                shortDescription: "Using a constitution to guide model behavior.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Idea", content: "Instead of relying solely on human feedback, Constitutional AI uses a set of principles (a 'constitution') to guide the model's self‑critique and revision. The model generates responses, critiques them against the constitution, and revises them." },
                  { title: "Two‑Step Process", content: "1. **Supervised Learning**: generate responses, critique, and revise using the constitution to create a dataset. 2. **RLHF**: use a reward model trained on the constitution‑aligned data to further refine the model." },
                  { title: "Benefits", content: "Reduces reliance on extensive human labelling and can be more scalable." },
                ],
              },
            ],
          },
          {
            title: "Diffusion Models – Generating Images",
            slug: "diffusion",
            description: "Stable Diffusion, DALL‑E, and the diffusion process.",
            topics: [
              {
                title: "What are Diffusion Models?",
                slug: "diffusion-basics",
                shortDescription: "Generate images by reversing a noise process.",
                estimatedMinutes: 26,
                sections: [
                  { title: "The Forward Process", content: "Start with a clean image and gradually add Gaussian noise over many steps until it becomes pure noise. This is a fixed Markov chain." },
                  { title: "The Reverse Process", content: "Train a neural network to predict the noise added at each step. Then, start from pure noise and iteratively denoise to generate a new image." },
                  { title: "Stable Diffusion", content: "Uses a latent diffusion model – the diffusion process is applied in a compressed latent space, making it efficient. It also uses a text encoder (CLIP) to condition the generation on text prompts." },
                  { title: "DALL‑E and Other Models", content: "DALL‑E 2 and 3 use diffusion models; DALL‑E 3 is integrated with ChatGPT. Midjourney also uses diffusion. The key is the U‑Net architecture and conditioning on text." },
                ],
              },
            ],
          },
          {
            title: "Agents and Tool Use",
            slug: "agents-tools",
            description: "Build LLM agents that can use tools and interact with the environment.",
            topics: [
              {
                title: "LLM Agents – Reasoning and Acting",
                slug: "llm-agents",
                shortDescription: "Systems that use an LLM as the core reasoning engine and can take actions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is an Agent?", content: "An LLM agent is a system where the LLM is the decision‑maker. It can call tools (APIs, functions, databases), reflect on the results, and plan multi‑step actions. This allows it to perform tasks beyond pure text generation." },
                  { title: "Agent Architecture", content: "**ReAct** (Reasoning + Acting): interleaves reasoning steps with actions. The LLM generates thoughts, acts on the environment, observes the result, and continues. This improves performance on complex tasks." },
                  { title: "Tools and Function Calling", content: "Modern LLMs support **tool calling** (e.g., OpenAI's function calling). The model can output a structured request to call a function, and the system executes it and returns the result." },
                  { title: "Frameworks", content: "**LangChain** – provides chains, agents, and memory. **AutoGPT** – autonomous agent that chains tasks. **CrewAI** – multi‑agent collaboration. **LlamaIndex** – data‑centric agent framework." },
                ],
              },
            ],
          },
          {
            title: "Advanced Attention and Efficiency",
            slug: "attention-efficiency",
            description: "FlashAttention, Grouped Query Attention, Mixture of Experts.",
            topics: [
              {
                title: "FlashAttention – Accelerating Attention",
                slug: "flashattention",
                shortDescription: "Optimised attention for faster inference.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Problem", content: "Standard attention is memory‑intensive and slow for long sequences. FlashAttention reduces memory access by tiling the computation and recomputing on the fly." },
                  { title: "How It Works", content: "It splits the attention computation into blocks that fit in fast GPU memory, avoiding expensive reads/writes to global memory. This results in 2‑4x speedup for training and inference." },
                ],
              },
              {
                title: "Grouped Query Attention (GQA)",
                slug: "gqa",
                shortDescription: "Reducing KV cache size for faster inference.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The Idea", content: "In multi‑query attention, all heads share the same key and value projections, saving memory. GQA is a compromise – keys and values are shared across groups of heads. Used in Llama 2 and 3." },
                ],
              },
              {
                title: "Mixture of Experts (MoE)",
                slug: "moe",
                shortDescription: "Scaling model size with sparse activation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is MoE?", content: "MoE replaces the feed‑forward layers with multiple expert networks and a router. For each token, only a subset of experts are activated (sparse). This allows huge models with less compute." },
                  { title: "Models Using MoE", content: "**Switch Transformer**, **GLaM**, **Mixtral** (Mistral). They achieve high performance with lower inference cost." },
                ],
              },
            ],
          },
          {
            title: "Model Deployment and Optimization",
            slug: "deployment-optimization",
            description: "Deploy LLMs efficiently with quantization, distillation, and scaling.",
            topics: [
              {
                title: "Quantization – Reducing Precision",
                slug: "quantization",
                shortDescription: "Reduce model size and speed up inference.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Quantization?", content: "Lowering the precision of weights and activations (e.g., from FP32 to INT8 or INT4). This reduces memory footprint and accelerates inference." },
                  { title: "Methods", content: "**GPTQ** – post‑training quantization with layer‑wise calibration. **AWQ** – activation‑aware weight quantisation, preserves important weights. **bitsandbytes** – used for QLoRA." },
                  { title: "Trade‑offs", content: "Quantisation can cause a slight drop in quality. Methods like AWQ and GPTQ minimise this loss." },
                ],
              },
              {
                title: "Model Distillation – Teaching Smaller Models",
                slug: "distillation",
                shortDescription: "Train a smaller model to mimic a larger one.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Distillation?", content: "A smaller 'student' model is trained to replicate the outputs of a larger 'teacher' model. The student learns the teacher's logits or soft labels, which contain more information than hard labels." },
                  { title: "Benefits", content: "Faster inference, reduced cost, and easier deployment on edge devices. Used to create compact models from giant ones (e.g., DistilBERT)." },
                ],
              },
              {
                title: "Serving LLMs – Production‑Ready",
                slug: "serving-llms",
                shortDescription: "Tools and strategies for hosting LLMs in production.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Self‑Hosted Solutions", content: "**vLLM** – high‑throughput serving with PagedAttention. **Text Generation Inference (TGI)** – from Hugging Face, supports continuous batching. **DeepSpeed** – for large‑scale inference." },
                  { title: "Cloud Services", content: "**OpenAI API**, **Anthropic API**, **AWS Bedrock**, **Azure OpenAI**, **Google Vertex AI**. They offer managed services, scaling, and security." },
                  { title: "Trade‑offs", content: "Self‑hosting gives you control but requires infrastructure. Cloud is easier but costlier for high usage." },
                ],
              },
            ],
          },
          {
            title: "Ethics, Safety, and Responsible AI",
            slug: "ethics",
            description: "Bias, safety, transparency, and regulations.",
            topics: [
              {
                title: "Bias and Fairness",
                slug: "bias-fairness",
                shortDescription: "How biases in data affect models and how to mitigate.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Sources of Bias", content: "Training data (societal biases, underrepresentation), algorithmic bias (model architecture or objective), and evaluation bias (benchmarks that favour certain groups)." },
                  { title: "Mitigation Strategies", content: "Curate diverse and balanced datasets; use debiasing techniques (e.g., adversarial training); have diverse evaluation teams; monitor outputs for fairness." },
                ],
              },
              {
                title: "Safety and Robustness – Defending Against Attacks",
                slug: "safety-robustness",
                shortDescription: "Jailbreaking, adversarial attacks, and content moderation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Jailbreaking and Prompt Injection", content: "Adversarial inputs that bypass safety filters. Techniques include role‑playing, encoding, or using multiple turns to trick the model." },
                  { title: "Defenses", content: "Safety training (RLHF), input filtering, output moderation, and adversarial training. Also, using a separate classifier to detect harmful outputs." },
                ],
              },
              {
                title: "Interpretability and Transparency",
                slug: "interpretability",
                shortDescription: "Understanding how models make decisions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Mechanistic Interpretability", content: "Studying the internal mechanisms of neural networks – identifying circuits, neurons, and attention patterns that correspond to specific behaviours." },
                  { title: "Tools and Techniques", content: "**Feature attribution** (Integrated Gradients), **Attention visualisation**, and **Probing** (train classifiers on hidden states to interpret what they represent)." },
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
        description: "Common Generative AI interview questions, including architecture, fine‑tuning, RAG, and use cases.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-concepts-genai",
            description: "Architecture, attention, and model selection.",
            topics: [
              {
                title: "Transformer and Attention",
                slug: "transformer-interview",
                shortDescription: "Explain the Transformer architecture and self‑attention.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Transformer Overview", content: "Describe encoder/decoder, self‑attention, multi‑head, positional encoding, and feed‑forward layers." },
                  { title: "QKV Mechanism", content: "Explain how queries, keys, and values work." },
                  { title: "Why Transformers Dominated", content: "Parallel processing, long‑range dependencies, and scalability." },
                ],
              },
              {
                title: "LLM Training Pipeline",
                slug: "llm-training-interview",
                shortDescription: "Pre‑training, fine‑tuning, and RLHF.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Pre‑training", content: "Massive unsupervised learning on text." },
                  { title: "Fine‑tuning", content: "SFT and PEFT." },
                  { title: "RLHF", content: "Aligning with human preferences." },
                ],
              },
            ],
          },
          {
            title: "Prompt Engineering and RAG",
            slug: "prompt-rag-interview",
            description: "Techniques for effective prompting and retrieval.",
            topics: [
              {
                title: "Zero‑shot, Few‑shot, Chain‑of‑Thought",
                slug: "prompt-techniques",
                shortDescription: "Explain and provide examples.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Zero‑shot", content: "No examples, just instruction." },
                  { title: "Few‑shot", content: "Provide examples to guide the model." },
                  { title: "CoT", content: "Ask for step‑by‑step reasoning." },
                ],
              },
              {
                title: "RAG vs Fine‑Tuning",
                slug: "rag-vs-finetune",
                shortDescription: "Trade‑offs and selection criteria.",
                estimatedMinutes: 20,
                sections: [
                  { title: "RAG", content: "Best for dynamic, up‑to‑date knowledge, lower cost." },
                  { title: "Fine‑Tuning", content: "Best for domain‑specific style/behaviour, private data." },
                ],
              },
            ],
          },
          {
            title: "Design Scenarios",
            slug: "use-cases-genai",
            description: "Design GenAI solutions for real‑world problems.",
            topics: [
              {
                title: "Design a Customer Support Chatbot with RAG",
                slug: "chatbot-design",
                shortDescription: "Handle FAQs and product queries.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Requirements", content: "Answer questions based on documentation, route to human if needed." },
                  { title: "Architecture", content: "RAG over product docs, with a guardrail for off‑topic queries." },
                  { title: "Evaluation", content: "Accuracy, user satisfaction, and cost per conversation." },
                ],
              },
              {
                title: "Design a Code‑Generation Assistant",
                slug: "code-assistant",
                shortDescription: "Generate and explain code safely.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Components", content: "LLM, code parser, execution sandbox, safety filters." },
                  { title: "Challenges", content: "Code correctness, security (SQL injection), latency." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Generative AI category seeded (ultra‑detailed)");
}

async function main() {
  await seedGenerativeAICategory();
}

main()
  .catch((error) => {
    console.error("Generative AI seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });