import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type SectionSeed = { title: string; content: string; };
type TopicSeed = { title: string; slug: string; description: string; estimatedMinutes: number; sections: SectionSeed[]; };
type ModuleSeed = { title: string; slug: string; description: string; topics: TopicSeed[]; };
type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[]; };
type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number; paths: PathSeed[]; };

const modules: ModuleSeed[] = [
  {
    title: "Spring AI Foundations",
    slug: "spring-ai-foundations",
    description: "Learn Spring AI Foundations through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "What Spring AI is",
        slug: "what-spring-ai-is",
        description: "Spring AI is a Spring ecosystem project designed to make it easier for Java and Spring developers to build applications that use AI models. The central...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI is a Spring ecosystem project designed to make it easier for Java and\nSpring developers to build applications that use AI models.\n\nThe central problem is not simply \"how do I call an LLM?\"\n\nA real application often needs to connect:\n\n```text\nUser\n  |\n  v\nSpring application\n  |\n  +---- AI model\n  |\n  +---- company database\n  |\n  +---- APIs\n  |\n  +---- documents\n  |\n  +---- vector database\n  |\n  +---- tools and business services\n```\nSpring AI provides abstractions so that application code does not have to be\ncompletely tied to one AI provider.\n\nFor example, an application can use a ChatModel abstraction instead of directly\nbuilding every integration around one vendor SDK.\n\n**Why This Matters**\n\nWithout an abstraction layer, an application can become tightly coupled to:\n\n- Provider-specific request classes\n- Provider-specific response classes\n- Provider-specific configuration\n- Provider-specific streaming APIs\n- Provider-specific tool-calling mechanisms\nSpring AI attempts to put a common Spring-friendly API in front of these\ncapabilities.\n\nSpring AI describes the project's central integration problem as:\n\nConnecting enterprise data and APIs with AI models.\n\n**Important Mindset**\n\nSpring AI is not itself an AI model.\n\nIt is an application framework and abstraction layer that helps Spring developers\nwork with AI models and AI application patterns.",
          },
          {
            title: "Example",
            content: "```text\nUser\n  |\n  v\nSpring application\n  |\n  +---- AI model\n  |\n  +---- company database\n  |\n  +---- APIs\n  |\n  +---- documents\n  |\n  +---- vector database\n  |\n  +---- tools and business services\n```",
          },
          {
            title: "Practical use",
            content: "Use **What Spring AI is** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Spring AI architecture and design philosophy",
        slug: "spring-ai-architecture-and-design-philosophy",
        description: "Spring AI follows several important design ideas. **1.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI follows several important design ideas.\n\n**1. Portability**\n\nThe same conceptual API can be used with multiple model providers.\n\nExample:\n\n```text\nChatClient\n    |\n    v\nChatModel abstraction\n    |\n    +---- OpenAI\n    +---- Anthropic\n    +---- Google\n    +---- Mistral\n    +---- Ollama\n    +---- Bedrock\n    +---- other providers\n```\nThe exact model capabilities can differ, but the application can keep a\nprovider-neutral programming model for common operations.\n\n**2. Composability**\n\nSpring AI features can be combined.\n\nA single application can use:\n\n```java\nChatClient\n    +\nChat memory\n    +\nRAG\n    +\nTool calling\n    +\nObservability\n```\n\n**3. Spring Boot Integration**\n\nConfiguration and dependency management follow familiar Spring Boot patterns.\n\n**4. Model-Specific Escape Hatches**\n\nPortability does not mean every provider-specific feature disappears.\n\nWhen an application needs provider-specific functionality, Spring AI allows\ndevelopers to access model-specific options and capabilities.",
          },
          {
            title: "Example",
            content: "```text\nChatClient\n    |\n    v\nChatModel abstraction\n    |\n    +---- OpenAI\n    +---- Anthropic\n    +---- Google\n    +---- Mistral\n    +---- Ollama\n    +---- Bedrock\n    +---- other providers\n```",
          },
          {
            title: "Practical use",
            content: "Use **Spring AI architecture and design philosophy** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Supported AI model types",
        slug: "supported-ai-model-types",
        description: "Spring AI works with several categories of AI models. **Chat Models** Input usually consists of messages or prompts.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI works with several categories of AI models.\n\n**Chat Models**\n\nInput usually consists of messages or prompts.\n\nOutput is generated conversational content.\n\nTypical use:\n\nQuestion -> Chat model -> Answer\n\n**Embedding Models**\n\nInput is converted into numerical vectors.\n\nTypical use:\n\nDocument -> embedding vector -> vector database\n\n**Image Models**\n\nGenerate images from prompts.\n\nTypical use:\n\nText description -> image model -> generated image\n\n**Transcription Models**\n\nConvert audio to text.\n\nTypical use:\n\nAudio -> speech-to-text model -> text\n\n**Text-To-Speech Models**\n\nConvert text to spoken audio.\n\nTypical use:\n\nText -> TTS model -> audio\n\n**Moderation Models**\n\nCan be used to assess generated or submitted content according to a model's\nmoderation capabilities.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Supported AI model types** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Typical use:",
          },
        ],
      },
      {
        title: "Provider portability",
        slug: "provider-portability",
        description: "A major Spring AI idea is to separate: Application-level AI logic from Provider-specific implementation. Suppose an application has: The application is...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A major Spring AI idea is to separate:\n\nApplication-level AI logic\nfrom\nProvider-specific implementation.\nSuppose an application has:\n\n```java\nString answer = chatClient.prompt()\n    .user(\"Explain dependency injection\")\n    .call()\n    .content();\n```\nThe application is expressing what it wants to do.\n\nThe actual model provider can be configured separately.\n\nThis makes it easier to:\n\n- switch models\n- compare providers\n- use different models for different tasks\n- implement fallback strategies\n- test against local models\n- reduce vendor lock-in\n\n**Portability Has Limits**\n\nDifferent models support different capabilities.\n\nFor example:\n\n- Model A -> text only\n- Model B -> text + image\n- Model C -> text + image + audio\n- Model D -> local execution\nTherefore, portable application code should rely on capabilities common to the\nchosen models, while provider-specific features should be isolated.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Provider portability** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Provider portability** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Spring AI and Spring Boot",
        slug: "spring-ai-and-spring-boot",
        description: "Spring AI is designed to fit naturally into Spring Boot applications. Typical application: Spring Boot auto-configuration can create required...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI is designed to fit naturally into Spring Boot applications.\n\nTypical application:\n\n```text\nSpring Boot application\n      |\n      +---- Controller\n      |\n      +---- Service\n      |\n      +---- ChatClient\n      |\n      +---- ChatModel\n      |\n      +---- VectorStore\n      |\n      +---- database\n      |\n      +---- external AI provider\n```\nSpring Boot auto-configuration can create required infrastructure when the\nappropriate Spring AI dependencies and configuration are present.",
          },
          {
            title: "Example",
            content: "```text\nSpring Boot application\n      |\n      +---- Controller\n      |\n      +---- Service\n      |\n      +---- ChatClient\n      |\n      +---- ChatModel\n      |\n      +---- VectorStore\n      |\n      +---- database\n      |\n      +---- external AI provider\n```",
          },
          {
            title: "Practical use",
            content: "Use **Spring AI and Spring Boot** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Getting started and project setup",
        slug: "getting-started-and-project-setup",
        description: "The Spring AI reference currently describes Spring AI 2.0.x as supporting Spring Boot 4.0.x and 4.1.x. A typical project can be created through Spring...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The Spring AI reference currently describes Spring AI 2.0.x as supporting\nSpring Boot 4.0.x and 4.1.x.\n\nA typical project can be created through Spring Initializr.\n\nGeneral flow:\n\n```java\n1. Create a Spring Boot project.\n2. Select the desired Spring AI model or vector-store dependencies.\n3. Configure credentials.\n4. Create application components.\n5. Inject ChatClient or another Spring AI abstraction.\n6. Call the AI service.\n```",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Getting started and project setup** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Getting started and project setup** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Dependency management and BOM",
        slug: "dependency-management-and-bom",
        description: "Spring AI provides a Bill of Materials (BOM). The purpose of a BOM is to keep compatible versions of Spring AI modules aligned.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides a Bill of Materials (BOM).\n\nThe purpose of a BOM is to keep compatible versions of Spring AI modules aligned.\n\nConceptually:\n\n```text\nspring-ai-bom\n     |\n     +---- model module\n     +---- vector store module\n     +---- supporting modules\n```\nUsing the BOM avoids manually assigning unrelated versions to every Spring AI\ndependency.\n\nFor production projects, version management should be deliberate and consistent.",
          },
          {
            title: "Example",
            content: "```text\nspring-ai-bom\n     |\n     +---- model module\n     +---- vector store module\n     +---- supporting modules\n```",
          },
          {
            title: "Practical use",
            content: "Use **Dependency management and BOM** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "AI Concepts",
    slug: "ai-concepts",
    description: "Learn AI Concepts through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "AI models",
        slug: "ai-models",
        description: "An AI model is a computational system trained to recognize patterns and generate or transform information. For application developers, the important...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An AI model is a computational system trained to recognize patterns and generate\nor transform information.\n\nFor application developers, the important question is not only:\n\n\"Which model is smartest?\"\nIt is:\n\n\"Which model is appropriate for this workload?\"\nConsider:\n\n- input modality\n- output modality\n- reasoning quality\n- latency\n- cost\n- context window\n- tool support\n- structured output support\n- streaming\n- deployment model\n- privacy requirements",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **AI models** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **AI models** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Prompts",
        slug: "prompts",
        description: "A prompt is the input given to an AI model. A prompt can contain more than one piece of text.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A prompt is the input given to an AI model.\n\nA prompt can contain more than one piece of text.\n\nCommon message roles include:\n\n- System\n- User\n- Assistant\n- Tool-related messages\n\n**System Message**\n\nDefines behavior or context.\n\nExample:\n\n- You are a Java expert.\n- Explain concepts using simple examples.\n\n**User Message**\n\nContains the user's actual request.\n\nExample:\n\nExplain dependency injection.\nThe model combines these messages according to the provider's API semantics.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompts** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompts** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Prompt templates",
        slug: "prompt-templates",
        description: "Prompt templates allow dynamic values to be inserted into reusable instructions. Example: \"Explain {topic} for a {experienceLevel} developer.\" Runtime...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Prompt templates allow dynamic values to be inserted into reusable instructions.\n\nExample:\n\n\"Explain {topic} for a {experienceLevel} developer.\"\nRuntime values:\n\n- topic = \"Spring Security\"\n- experienceLevel = \"beginner\"\nRendered prompt:\n\nExplain Spring Security for a beginner developer.\nSpring AI uses StringTemplate for prompt template functionality.\n\n**Why Templates Help**\n\nWithout templates, applications often create strings manually.\n\nWith templates:\n\n- fixed instruction\n- +\n- runtime variables\n- =\n- consistent prompt\nThis improves maintainability and makes prompts easier to reuse.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompt templates** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompt templates** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Messages and message roles",
        slug: "messages-and-message-roles",
        description: "Spring AI represents model input using messages. A message contains content and a role/type.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI represents model input using messages.\n\nA message contains content and a role/type.\n\nThe role tells the model how the message should be interpreted.\n\nFor example:\n\n- System:\n- You are a helpful Java assistant.\n- User:\n- Explain Spring AI.\n- Assistant:\n- Previous generated response.\nThis structure becomes particularly important for:\n\n- conversation history\n- multimodal input\n- tool calling\n- chat memory\n- RAG",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Messages and message roles** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Messages and message roles** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tokens and context windows",
        slug: "tokens-and-context-windows",
        description: "AI models process tokens rather than raw human words. A token can represent part of a word, a complete word, punctuation, or another piece of text...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "AI models process tokens rather than raw human words.\n\nA token can represent part of a word, a complete word, punctuation, or another\npiece of text depending on the tokenizer.\n\n**Token Usage Matters For Three Reasons**\n\n1. Cost\n\nMany hosted models charge according to input/output token usage.\n\n2. Context limits\n\nA model can process only a bounded amount of context per request.\n\n3. Performance\n\nVery large prompts can increase latency and processing cost.\n\nExample:\n\n- User question\n- +\n- system instructions\n- +\n- chat history\n- +\n- retrieved documents\n- +\n- tool results\n- =\n- total context\nIf everything is included blindly, the application can exceed the model's\ncontext window.\n\nThis is one reason RAG retrieval and document chunking are important.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tokens and context windows** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tokens and context windows** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Embeddings",
        slug: "embeddings",
        description: "An embedding is a numerical representation of information. Example: \"Spring Boot is a Java framework.\" might be transformed conceptually into: [0.12,...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An embedding is a numerical representation of information.\n\nExample:\n\n\"Spring Boot is a Java framework.\"\nmight be transformed conceptually into:\n\n[0.12, -0.48, 0.91, ... ]\nThe vector itself is not meant to be read by humans.\n\nIts purpose is to represent semantic characteristics in a mathematical space.\n\nSIMILARITY\n\nSuppose:\n\n- Document A = \"Spring Boot REST API\"\n- Query      = \"How do I create REST endpoints?\"\nTheir embeddings may be relatively close because their meanings are related.\n\nThis enables semantic search.\n\n**Embedding Dimension**\n\nThe number of values in the vector is its dimensionality.\n\nExample:\n\n```text\n[0.1, 0.4, -0.2, ...]\n <---- many dimensions ---->\n```\nThe dimensionality must be compatible with the vector-store configuration.\n\nIMPORTANT\n\nAn embedding model is not the same as a chat model.\n\nChat model:\n\nprompt -> generated response\nEmbedding model:\n\ntext/document -> vector",
          },
          {
            title: "Example",
            content: "```text\n[0.1, 0.4, -0.2, ...]\n <---- many dimensions ---->\n```",
          },
          {
            title: "Practical use",
            content: "This enables semantic search.",
          },
        ],
      },
      {
        title: "Structured output",
        slug: "structured-output",
        description: "AI models commonly return text. But applications often need an actual Java object.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "AI models commonly return text.\n\nBut applications often need an actual Java object.\n\nExample desired result:\n\n```java\nclass Product {\n    String name;\n    double price;\n}\n```\nA model might return:\n\n- {\n- \"name\": \"Laptop\",\n- \"price\": 999.0\n- }\n\nThat response is initially text.\n\nThe application still needs to convert it into:\n\nProduct\nSpring AI provides structured output converters for this purpose.\n\nImportant implementations include:\n\n```java\nBeanOutputConverter\nMapOutputConverter\nListOutputConverter\n```\n\n**Structured Output Is Not Magic**\n\nA model can still generate malformed or unexpected output.\n\nTherefore applications should consider:\n\n- schema constraints\n- validation\n- conversion failures\n- retries\n- model support\n- error handling",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Structured output** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Structured output** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Bringing enterprise data and APIs to AI",
        slug: "bringing-enterprise-data-and-apis-to-ai",
        description: "A pretrained model does not automatically know the current contents of your private database. For example: The application must explicitly provide access.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A pretrained model does not automatically know the current contents of your\nprivate database.\n\nFor example:\n\n```text\nCompany database\n    |\n    X\n    |\nPublic model knowledge\n```\nThe application must explicitly provide access.\n\nThree broad strategies are:\n\n- 1. Fine-tuning\n- 2. Prompt augmentation / context injection\n- 3. Tool calling\nFine-tuning changes model behavior through additional training.\n\nPrompt augmentation supplies relevant data as context.\n\nTool calling allows the model to request application-controlled operations.",
          },
          {
            title: "Example",
            content: "```text\nCompany database\n    |\n    X\n    |\nPublic model knowledge\n```",
          },
          {
            title: "Practical use",
            content: "Use **Bringing enterprise data and APIs to AI** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Fine-tuning vs prompt augmentation vs RAG",
        slug: "fine-tuning-vs-prompt-augmentation-vs-rag",
        description: "FINE-TUNING Use when changing model behavior or specialization is the objective. It is not simply a database lookup mechanism.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "FINE-TUNING\n\nUse when changing model behavior or specialization is the objective.\n\nIt is not simply a database lookup mechanism.\n\n**Prompt Augmentation**\n\nPlace relevant information into the model's context.\n\nProblem:\n\nContext windows are limited.\nRAG\n\nRetrieve only relevant pieces of information and place them into the prompt.\n\nThis is often much more practical for frequently changing business knowledge.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Fine-tuning vs prompt augmentation vs RAG** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Fine-tuning vs prompt augmentation vs RAG** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Retrieval Augmented Generation",
        slug: "retrieval-augmented-generation",
        description: "RAG stands for Retrieval Augmented Generation. Basic flow: The model generates the answer using retrieved context.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "RAG stands for Retrieval Augmented Generation.\n\nBasic flow:\n\n```text\nDocuments\n   |\n   v\nRead\n   |\n   v\nSplit\n   |\n   v\nEmbed\n   |\n   v\nVector Store\n   |\n   |  similarity search\n   v\nRelevant documents\n   |\n   v\nPrompt + context\n   |\n   v\nChat Model\n   |\n   v\nAnswer\n```\nThe model generates the answer using retrieved context.\n\n**Why Rag Works**\n\nInstead of giving the model an entire document collection, retrieve the pieces\nthat are most relevant to the user's question.",
          },
          {
            title: "Example",
            content: "```text\nDocuments\n   |\n   v\nRead\n   |\n   v\nSplit\n   |\n   v\nEmbed\n   |\n   v\nVector Store\n   |\n   |  similarity search\n   v\nRelevant documents\n   |\n   v\nPrompt + context\n   |\n   v\nChat Model\n   |\n   v\nAnswer\n```",
          },
          {
            title: "Practical use",
            content: "Use **Retrieval Augmented Generation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool calling",
        slug: "tool-calling",
        description: "Tool calling allows an AI model to request application-defined operations. Examples: - getWeather(city) - findCustomer(id) - getAccountBalance(id) -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tool calling allows an AI model to request application-defined operations.\n\nExamples:\n\n- getWeather(city)\n- findCustomer(id)\n- getAccountBalance(id)\n- searchProducts(query)\n- sendEmail(to, body)\nThe model does not directly receive unrestricted access to the underlying API.\n\nThe application owns tool execution.\n\nTypical flow:\n\n```text\nUser request\n   |\n   v\nChatClient\n   |\n   v\nAI model\n   |\n   | \"I need tool X with arguments Y\"\n   v\nSpring AI tool mechanism\n   |\n   v\nApplication function\n   |\n   v\nTool result\n   |\n   v\nAI model\n   |\n   v\nFinal response\n```\nThis pattern is a foundation for agentic applications.",
          },
          {
            title: "Example",
            content: "```text\nUser request\n   |\n   v\nChatClient\n   |\n   v\nAI model\n   |\n   | \"I need tool X with arguments Y\"\n   v\nSpring AI tool mechanism\n   |\n   v\nApplication function\n   |\n   v\nTool result\n   |\n   v\nAI model\n   |\n   v\nFinal response\n```",
          },
          {
            title: "Practical use",
            content: "Use **Tool calling** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Evaluating AI responses",
        slug: "evaluating-ai-responses",
        description: "An AI application should not assume every generated response is correct. Evaluation can consider: - - relevance - - coherence - - factual correctness -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An AI application should not assume every generated response is correct.\n\nEvaluation can consider:\n\n- relevance\n- coherence\n- factual correctness\n- alignment with the user's request\n- grounding in supplied data\nSpring AI provides an Evaluator API for response evaluation strategies.\n\nEvaluation becomes particularly important for:\n\n- RAG\n- customer-facing assistants\n- document Q&A\n- compliance-sensitive systems\n- production AI systems",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Evaluating AI responses** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Evaluating AI responses** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Core Model APIs",
    slug: "core-model-apis",
    description: "Learn Core Model APIs through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Generic Model API",
        slug: "generic-model-api",
        description: "Spring AI builds specialized model APIs on top of generic model abstractions. The important design idea is: This allows common application patterns...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI builds specialized model APIs on top of generic model abstractions.\n\nThe important design idea is:\n\n```text\ncommon model contract\n      |\n      +---- Chat\n      +---- Embedding\n      +---- Image\n      +---- other model types\n```\nThis allows common application patterns while still supporting model-specific\nimplementations.",
          },
          {
            title: "Example",
            content: "```text\ncommon model contract\n      |\n      +---- Chat\n      +---- Embedding\n      +---- Image\n      +---- other model types\n```",
          },
          {
            title: "Practical use",
            content: "Use **Generic Model API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Chat Model API",
        slug: "chat-model-api",
        description: "The Chat Model API provides a portable abstraction for chat completion. Core concepts include: Basic conceptual flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The Chat Model API provides a portable abstraction for chat completion.\n\nCore concepts include:\n\n```java\nChatModel\nStreamingChatModel\nPrompt\nMessage\nChatOptions\nChatResponse\nGeneration\n```\nBasic conceptual flow:\n\n```text\nPrompt\n  |\n  v\nChatModel\n  |\n  v\nChatResponse\n  |\n  v\nGeneration\n  |\n  v\nAssistantMessage\n```",
          },
          {
            title: "Example",
            content: "```text\nPrompt\n  |\n  v\nChatModel\n  |\n  v\nChatResponse\n  |\n  v\nGeneration\n  |\n  v\nAssistantMessage\n```",
          },
          {
            title: "Practical use",
            content: "Use **Chat Model API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ChatModel and StreamingChatModel",
        slug: "chatmodel-and-streamingchatmodel",
        description: "ChatModel supports normal completion requests. Conceptually: ChatResponse response = chatModel.call(prompt); StreamingChatModel supports responses...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatModel supports normal completion requests.\n\nConceptually:\n\nChatResponse response = chatModel.call(prompt);\nStreamingChatModel supports responses delivered progressively.\n\nStreaming is useful for interactive applications where users should see output\nas it is generated rather than waiting for the complete response.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ChatModel and StreamingChatModel** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Streaming is useful for interactive applications where users should see output\nas it is generated rather than waiting for the complete response.",
          },
        ],
      },
      {
        title: "Prompt, Message, ChatOptions and ChatResponse",
        slug: "prompt-message-chatoptions-and-chatresponse",
        description: "PROMPT Represents the model input. It contains messages and optional chat options.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "PROMPT\n\nRepresents the model input.\n\nIt contains messages and optional chat options.\n\nMESSAGE\n\nRepresents one unit of conversational input/output.\n\nCHATOPTIONS\n\nContains portable generation parameters such as:\n\n- model\n- temperature\n- max tokens\n- top-p\n- top-k\n- stop sequences\n- frequency penalty\n- presence penalty\nNot every provider necessarily implements every option identically.\n\nCHATRESPONSE\n\nRepresents the standardized model response.\n\nIt can contain one or more generations and metadata.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompt, Message, ChatOptions and ChatResponse** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompt, Message, ChatOptions and ChatResponse** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Chat model configuration",
        slug: "chat-model-configuration",
        description: "Spring AI allows defaults to be configured when the application starts. Runtime requests can then override appropriate options.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI allows defaults to be configured when the application starts.\n\nRuntime requests can then override appropriate options.\n\nThink of this as:\n\n- startup defaults\n- +\n- request-specific customization\nThis is useful when most requests use the same model configuration but a few\nrequests require different behavior.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Chat model configuration** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "- startup defaults\n- +\n- request-specific customization\nThis is useful when most requests use the same model configuration but a few\nrequests require different behavior.",
          },
        ],
      },
      {
        title: "Chat model provider portability",
        slug: "chat-model-provider-portability",
        description: "The official comparison documentation tracks capabilities such as: - Multimodality - Tool/function calling - Streaming - Retry - Observability -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The official comparison documentation tracks capabilities such as:\n\n- Multimodality\n- Tool/function calling\n- Streaming\n- Retry\n- Observability\n- Built-in JSON\n- Local deployment\n- OpenAI API compatibility\nThis comparison is important because \"supports ChatModel\" does not mean all\nproviders have identical features.\n\nAlways check capability requirements before selecting a provider.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Chat model provider portability** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Chat model provider portability** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Chat model comparison",
        slug: "chat-model-comparison",
        description: "The current stable documentation lists providers/integrations including: - Anthropic Claude - DeepSeek - Google GenAI - Groq - Mistral AI - MiniMax -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The current stable documentation lists providers/integrations including:\n\n- Anthropic Claude\n- DeepSeek\n- Google GenAI\n- Groq\n- Mistral AI\n- MiniMax\n- NVIDIA\n- Ollama\n- OpenAI\nAmazon Bedrock also provides access to supported models through its integration.\n\nCapabilities vary by provider and model.\n\nExamples of questions to ask:\n\n- Does the model support images?\n- Does it support tool calling?\n- Does it support streaming?\n- Does it support structured JSON?\n- Can it run locally?\n- Is it OpenAI API compatible?\n- Does Spring AI expose observability for it?",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Chat model comparison** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Chat model comparison** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Embedding Model API",
        slug: "embedding-model-api",
        description: "The EmbeddingModel abstraction provides a portable interface for turning text or document content into vectors. Important operations conceptually...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The EmbeddingModel abstraction provides a portable interface for turning text\nor document content into vectors.\n\nImportant operations conceptually include:\n\n- embed(String)\n- embed(Document)\n- embedForResponse(...)\n- dimensions()\nThe API wraps embedding input and output in:\n\n- EmbeddingRequest\n- EmbeddingResponse\n- Embedding\nThe result is typically a floating-point vector.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Embedding Model API** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Embedding Model API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Image Model API",
        slug: "image-model-api",
        description: "The Image Model API provides a portable interface for image generation. Important concepts: - ImageModel - ImagePrompt - ImageResponse -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The Image Model API provides a portable interface for image generation.\n\nImportant concepts:\n\n- ImageModel\n- ImagePrompt\n- ImageResponse\n- ImageGeneration\n- Image metadata\n\nImageResponse can contain multiple generated images.\n\nThe abstraction allows applications to work with different image model\nimplementations using a common API.\n\nAvailable implementations in the Spring AI reference include:\n\n- OpenAI Image Generation\n- Stability AI Image Generation\n- Google GenAI Image Generation",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Image Model API** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Image Model API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Audio Models",
        slug: "audio-models",
        description: "Spring AI supports two important audio categories: - Speech-to-Text - Text-to-Speech Speech-to-Text: Audio -> text Text-to-Speech: Text -> audio These...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI supports two important audio categories:\n\n- Speech-to-Text\n- Text-to-Speech\n\nSpeech-to-Text:\n\nAudio -> text\nText-to-Speech:\n\nText -> audio\nThese capabilities can be combined with chat models to build voice-oriented\napplications.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Audio Models** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Audio Models** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Speech-to-Text",
        slug: "speech-to-text",
        description: "Speech-to-Text, also called transcription, converts spoken audio into text. Typical architecture: The text can then be stored, searched, summarized, or...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Speech-to-Text, also called transcription, converts spoken audio into text.\n\nTypical architecture:\n\n```text\nmicrophone/file\n    |\n    v\ntranscription model\n    |\n    v\ntext\n    |\n    v\nChatClient\n    |\n    v\nresponse\n```\nThe text can then be stored, searched, summarized, or sent to another model.",
          },
          {
            title: "Example",
            content: "```text\nmicrophone/file\n    |\n    v\ntranscription model\n    |\n    v\ntext\n    |\n    v\nChatClient\n    |\n    v\nresponse\n```",
          },
          {
            title: "Practical use",
            content: "Use **Speech-to-Text** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Text-to-Speech",
        slug: "text-to-speech",
        description: "Text-to-Speech converts generated text into spoken audio. Typical flow: This enables voice assistants and accessibility-oriented applications.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Text-to-Speech converts generated text into spoken audio.\n\nTypical flow:\n\n```text\nUser\n  |\n  v\nChat model\n  |\n  v\nText response\n  |\n  v\nTTS model\n  |\n  v\nAudio\n```\nThis enables voice assistants and accessibility-oriented applications.",
          },
          {
            title: "Example",
            content: "```text\nUser\n  |\n  v\nChat model\n  |\n  v\nText response\n  |\n  v\nTTS model\n  |\n  v\nAudio\n```",
          },
          {
            title: "Practical use",
            content: "```text\nUser\n  |\n  v\nChat model\n  |\n  v\nText response\n  |\n  v\nTTS model\n  |\n  v\nAudio\n```\nThis enables voice assistants and accessibility-oriented applications.",
          },
        ],
      },
      {
        title: "Multimodality",
        slug: "multimodality",
        description: "Multimodal AI means an AI model can work with multiple input modalities. Examples: - text - image - audio - video - documents Spring AI's Message API...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Multimodal AI means an AI model can work with multiple input modalities.\n\nExamples:\n\n- text\n- image\n- audio\n- video\n- documents\nSpring AI's Message API supports media content.\n\nConceptually:\n\n```text\nUserMessage\n    |\n    +---- text\n    |\n    +---- media\n             |\n             +---- image\n             +---- audio\n             +---- video\n             +---- other supported media\n```\nExample:\n\n- User asks:\n- \"Explain this image.\"\n- Message:\n- text = \"Explain this image\"\n- media = image.png\nNot every model supports every modality.\n\nAlways check provider/model capability.",
          },
          {
            title: "Example",
            content: "```text\nUserMessage\n    |\n    +---- text\n    |\n    +---- media\n             |\n             +---- image\n             +---- audio\n             +---- video\n             +---- other supported media\n```",
          },
          {
            title: "Practical use",
            content: "Use **Multimodality** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Chat Application Development",
    slug: "chat-application-development",
    description: "Learn Chat Application Development through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "ChatClient API",
        slug: "chatclient-api",
        description: "ChatClient is a higher-level, fluent API for communicating with chat models. It is intentionally similar in style to Spring developers' experience with...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatClient is a higher-level, fluent API for communicating with chat models.\n\nIt is intentionally similar in style to Spring developers' experience with\nWebClient or RestClient.\n\nSimple example:\n\n```java\n@RestController\nclass AiController {\n\n    private final ChatClient chatClient;\n\n    AiController(ChatClient.Builder builder) {\n        this.chatClient = builder.build();\n    }\n\n    @GetMapping(\"/ai\")\n    String ask(String question) {\n        return chatClient.prompt()\n                .user(question)\n                .call()\n                .content();\n    }\n}\n```\nThis is one of the most useful entry points for normal Spring AI applications.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ChatClient API** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ChatClient API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Creating ChatClient",
        slug: "creating-chatclient",
        description: "Spring Boot can auto-configure a ChatClient.Builder when the required model integration is present. You can then build: ChatClient client =...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring Boot can auto-configure a ChatClient.Builder when the required model\nintegration is present.\n\nYou can then build:\n\nChatClient client = builder.build();\nThe client can also be created programmatically when more control is needed.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Creating ChatClient** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Creating ChatClient** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "User and system messages",
        slug: "user-and-system-messages",
        description: "ChatClient supports structured prompt construction. Example: The system message establishes behavior.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatClient supports structured prompt construction.\n\nExample:\n\n```java\nchatClient.prompt()\n    .system(\"You are a Java expert.\")\n    .user(\"Explain Spring AI.\")\n    .call()\n    .content();\n```\nThe system message establishes behavior.\n\nThe user message supplies the task.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **User and system messages** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **User and system messages** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Runtime prompt customization",
        slug: "runtime-prompt-customization",
        description: "A reusable client can have default configuration. Individual calls can add or override: - system instructions - user content - advisor parameters -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A reusable client can have default configuration.\n\nIndividual calls can add or override:\n\n- system instructions\n- user content\n- advisor parameters\n- tools\n- model options\nThis is useful for applications serving many different request types.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Runtime prompt customization** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "- system instructions\n- user content\n- advisor parameters\n- tools\n- model options\nThis is useful for applications serving many different request types.",
          },
        ],
      },
      {
        title: "Synchronous calls",
        slug: "synchronous-calls",
        description: "The normal synchronous pattern is: The application waits for the model response and then continues. This is simple and suitable for: - REST endpoints -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The normal synchronous pattern is:\n\n```java\n.call()\n.content()\n```\nThe application waits for the model response and then continues.\n\nThis is simple and suitable for:\n\n- REST endpoints\n- background jobs\n- command-line applications\n- non-streaming workflows",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Synchronous calls** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Synchronous calls** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Streaming responses",
        slug: "streaming-responses",
        description: "Streaming returns generated content progressively. This is useful for: - chat interfaces - long answers - interactive assistants Conceptually:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Streaming returns generated content progressively.\n\nThis is useful for:\n\n- chat interfaces\n- long answers\n- interactive assistants\nConceptually:\n\n```text\nrequest\n  |\n  v\nmodel\n  |\n  +--> token/content chunk\n  +--> token/content chunk\n  +--> token/content chunk\n  +--> ...\n  |\n  v\ncomplete response\n```",
          },
          {
            title: "Example",
            content: "```text\nrequest\n  |\n  v\nmodel\n  |\n  +--> token/content chunk\n  +--> token/content chunk\n  +--> token/content chunk\n  +--> ...\n  |\n  v\ncomplete response\n```",
          },
          {
            title: "Practical use",
            content: "This is useful for:",
          },
        ],
      },
      {
        title: "Multiple chat models",
        slug: "multiple-chat-models",
        description: "An application may need several models. Examples: - Model A -> complex reasoning - Model B -> inexpensive classification - Model C -> fast response -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An application may need several models.\n\nExamples:\n\n- Model A -> complex reasoning\n- Model B -> inexpensive classification\n- Model C -> fast response\n- Model D -> specialized coding\nUse cases include:\n\n- task-based routing\n- fallback\n- A/B testing\n- user-selected models\n- specialized workloads\n\nThe application should make model selection explicit rather than assuming every\nmodel has identical capabilities.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Multiple chat models** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "- Model A -> complex reasoning\n- Model B -> inexpensive classification\n- Model C -> fast response\n- Model D -> specialized coding\nUse cases include:",
          },
        ],
      },
      {
        title: "Chat memory",
        slug: "chat-memory",
        description: "Chat memory stores conversation history. Without memory: - User: My name is Alex.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Chat memory stores conversation history.\n\nWithout memory:\n\n- User: My name is Alex.\n- Assistant: Nice to meet you.\n- User: What is my name?\nThe model may not know the previous message unless history is supplied.\n\nWith memory:\n\n```text\nconversation id\n    |\n    v\nstored messages\n    |\n    v\ncurrent request\n    |\n    v\nmodel\n```\nSpring AI provides ChatMemory abstractions.",
          },
          {
            title: "Example",
            content: "```text\nconversation id\n    |\n    v\nstored messages\n    |\n    v\ncurrent request\n    |\n    v\nmodel\n```",
          },
          {
            title: "Practical use",
            content: "Use **Chat memory** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Chat memory repositories",
        slug: "chat-memory-repositories",
        description: "the Spring AI reference describes MessageWindowChatMemory as a built-in implementation. It maintains a bounded message window.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "the Spring AI reference describes MessageWindowChatMemory as a built-in\nimplementation.\n\nIt maintains a bounded message window.\n\nThe memory repository abstraction can be backed by different storage mechanisms,\nincluding implementations for:\n\n- In-memory\n- JDBC\n- Cassandra\n- Neo4j\n- MongoDB\n- Redis\n\nThe choice depends on whether memory should survive application restarts and\nwhether the application is distributed.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Chat memory repositories** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Chat memory repositories** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "RAG through ChatClient",
        slug: "rag-through-chatclient",
        description: "ChatClient can combine advisors for memory and RAG. Conceptual example: The memory advisor can supply conversation context.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatClient can combine advisors for memory and RAG.\n\nConceptual example:\n\n```text\nChatClient\n   |\n   +---- MessageChatMemoryAdvisor\n   |\n   +---- QuestionAnswerAdvisor\n   |\n   +---- ChatModel\n```\nThe memory advisor can supply conversation context.\n\nThe RAG advisor can retrieve relevant documents.\n\nThe model then receives a richer prompt.",
          },
          {
            title: "Example",
            content: "```text\nChatClient\n   |\n   +---- MessageChatMemoryAdvisor\n   |\n   +---- QuestionAnswerAdvisor\n   |\n   +---- ChatModel\n```",
          },
          {
            title: "Practical use",
            content: "Use **RAG through ChatClient** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Logging and advisors",
        slug: "logging-and-advisors",
        description: "Advisors can be used to observe or transform requests. A logging advisor can help inspect: - request - response However, production logging must be...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Advisors can be used to observe or transform requests.\n\nA logging advisor can help inspect:\n\n- request\n- response\nHowever, production logging must be designed carefully because prompts and\nresponses can contain sensitive information.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Logging and advisors** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Logging and advisors** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Prompt Engineering And Structured Output",
    slug: "prompt-engineering-and-structured-output",
    description: "Learn Prompt Engineering And Structured Output through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Prompt engineering fundamentals",
        slug: "prompt-engineering-fundamentals",
        description: "Prompt engineering means designing model instructions intentionally. Good prompts generally provide: - context - task - constraints - expected output -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Prompt engineering means designing model instructions intentionally.\n\nGood prompts generally provide:\n\n- context\n- task\n- constraints\n- expected output\n- relevant data\nWeak:\n\n\"Explain Java.\"\nBetter:\n\n- \"Explain Java dependency injection to a developer with two years of\n- experience. Use one simple example, one production example, and list\n- three common mistakes.\"\nThe goal is not merely making prompts longer.\n\nThe goal is making them clearer and more useful.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompt engineering fundamentals** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompt engineering fundamentals** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Prompt templates",
        slug: "prompt-templates-45",
        description: "Templates separate stable instructions from changing values. Example: Explain {topic} for a {level} developer.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Templates separate stable instructions from changing values.\n\nExample:\n\nExplain {topic} for a {level} developer.\nThis allows one template to serve:\n\n- Java / beginner\n- Spring AI / intermediate\n- RAG / advanced",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompt templates** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompt templates** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Structured output converters",
        slug: "structured-output-converters",
        description: "Structured output converters help transform model-generated text into useful application structures. Available converter concepts include: A converter...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Structured output converters help transform model-generated text into useful\napplication structures.\n\nAvailable converter concepts include:\n\n```java\nBeanOutputConverter\nMapOutputConverter\nListOutputConverter\n```\nA converter typically combines:\n\n- output-format instructions\n- +\n- model response\n- +\n- conversion logic",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Structured output converters** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Structured output converters** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "BeanOutputConverter",
        slug: "beanoutputconverter",
        description: "BeanOutputConverter targets a Java type. Example: The converter can provide format instructions based on the target structure and convert compatible...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "BeanOutputConverter targets a Java type.\n\nExample:\n\n```java\nclass Movie {\n    String title;\n    int year;\n}\n```\nThe converter can provide format instructions based on the target structure\nand convert compatible model output into a Java object.\n\nThis is useful when AI output feeds directly into business logic.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **BeanOutputConverter** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful when AI output feeds directly into business logic.",
          },
        ],
      },
      {
        title: "MapOutputConverter",
        slug: "mapoutputconverter",
        description: "MapOutputConverter is useful when the application wants structured key/value data rather than a fixed Java class. Conceptually:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MapOutputConverter is useful when the application wants structured key/value\ndata rather than a fixed Java class.\n\nConceptually:\n\n```text\nmodel text\n   |\n   v\nJSON object\n   |\n   v\nMap<String, Object>\n```",
          },
          {
            title: "Example",
            content: "```text\nmodel text\n   |\n   v\nJSON object\n   |\n   v\nMap<String, Object>\n```",
          },
          {
            title: "Practical use",
            content: "Use **MapOutputConverter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ListOutputConverter",
        slug: "listoutputconverter",
        description: "ListOutputConverter is useful when the model should produce a list. Example request: \"Return five Java topics.\" Desired application representation:...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ListOutputConverter is useful when the model should produce a list.\n\nExample request:\n\n\"Return five Java topics.\"\nDesired application representation:\n\nList<String>\nThe application still needs to handle conversion failures.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ListOutputConverter** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ListOutputConverter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Schema-oriented output",
        slug: "schema-oriented-output",
        description: "When structured data is required, applications should think in terms of a contract. For example: - Product: - name: string - price: number - available:...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "When structured data is required, applications should think in terms of a\ncontract.\n\nFor example:\n\n- Product:\n- name: string\n- price: number\n- available: boolean\nThis is more reliable than simply telling the model:\n\n\"Give me JSON.\"\nStructured output mechanisms can provide stronger formatting guidance, but\nmodel output should still be validated.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Schema-oriented output** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Schema-oriented output** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Reliability considerations",
        slug: "reliability-considerations",
        description: "Never assume generated output is automatically trustworthy. Possible failures: - malformed JSON - missing field - wrong type - extra field -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Never assume generated output is automatically trustworthy.\n\nPossible failures:\n\n- malformed JSON\n- missing field\n- wrong type\n- extra field\n- hallucinated value\n- incomplete response\nProduction applications should validate structured results before using them.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Reliability considerations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Reliability considerations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Advisors",
    slug: "advisors",
    description: "Learn Advisors through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Advisors API",
        slug: "advisors-api",
        description: "Advisors are reusable components that can inspect and modify AI requests and responses. They are useful for implementing recurring AI application patterns.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Advisors are reusable components that can inspect and modify AI requests and\nresponses.\n\nThey are useful for implementing recurring AI application patterns.\n\nExamples:\n\n- memory\n- RAG\n- logging\n- tool calling\n- prompt transformation\n- reasoning strategies\nInstead of putting all logic inside a controller, advisors let the behavior\nbe composed around the model interaction.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Advisors API** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "They are useful for implementing recurring AI application patterns.",
          },
        ],
      },
      {
        title: "Advisor chain",
        slug: "advisor-chain",
        description: "Multiple advisors can form a chain. Conceptually: Order matters.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Multiple advisors can form a chain.\n\nConceptually:\n\n```text\nRequest\n  |\n  v\nAdvisor A\n  |\n  v\nAdvisor B\n  |\n  v\nAdvisor C\n  |\n  v\nChat model\n  |\n  v\nResponse\n  |\n  v\nAdvisor C\n  |\n  v\nAdvisor B\n  |\n  v\nAdvisor A\n  |\n  v\nCaller\n```\nOrder matters.\n\nFor example, memory may need to execute before RAG retrieval.",
          },
          {
            title: "Example",
            content: "```text\nRequest\n  |\n  v\nAdvisor A\n  |\n  v\nAdvisor B\n  |\n  v\nAdvisor C\n  |\n  v\nChat model\n  |\n  v\nResponse\n  |\n  v\nAdvisor C\n  |\n  v\nAdvisor B\n  |\n  v\nAdvisor A\n  |\n  v\nCaller\n```",
          },
          {
            title: "Practical use",
            content: "Use **Advisor chain** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "CallAdvisor",
        slug: "calladvisor",
        description: "CallAdvisor is used for non-streaming calls. The advisor can: - inspect request - modify request - invoke the next advisor - inspect response -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "CallAdvisor is used for non-streaming calls.\n\nThe advisor can:\n\n- inspect request\n- modify request\n- invoke the next advisor\n- inspect response\n- transform response\n- stop or reject processing",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **CallAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **CallAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "StreamAdvisor",
        slug: "streamadvisor",
        description: "StreamAdvisor handles streaming interactions. It allows reusable logic to participate in streaming request/response flows.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "StreamAdvisor handles streaming interactions.\n\nIt allows reusable logic to participate in streaming request/response flows.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **StreamAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **StreamAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Advisor ordering",
        slug: "advisor-ordering",
        description: "Advisor ordering controls execution sequence. Example: Changing the order can change application behavior.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Advisor ordering controls execution sequence.\n\nExample:\n\n```text\nMemory\n  |\n  v\nRAG\n  |\n  v\nTool calling\n  |\n  v\nModel\n```\nChanging the order can change application behavior.\n\nAlways document important advisor ordering decisions.",
          },
          {
            title: "Example",
            content: "```text\nMemory\n  |\n  v\nRAG\n  |\n  v\nTool calling\n  |\n  v\nModel\n```",
          },
          {
            title: "Practical use",
            content: "Use **Advisor ordering** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MessageChatMemoryAdvisor",
        slug: "messagechatmemoryadvisor",
        description: "This advisor retrieves conversation history and adds it to the prompt. It is useful for conversational applications.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "This advisor retrieves conversation history and adds it to the prompt.\n\nIt is useful for conversational applications.\n\nImportant detail:\n\nA conversation identifier is needed to know which memory belongs to the\ncurrent conversation.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MessageChatMemoryAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It is useful for conversational applications.",
          },
        ],
      },
      {
        title: "VectorStoreChatMemoryAdvisor",
        slug: "vectorstorechatmemoryadvisor",
        description: "This advisor uses a vector store as a memory mechanism. Instead of simply keeping a sequential message window, the system can retrieve relevant...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "This advisor uses a vector store as a memory mechanism.\n\nInstead of simply keeping a sequential message window, the system can retrieve\nrelevant historical information through vector search.\n\nThis is useful when the conversation history becomes large and relevance-based\nretrieval is more useful than simply keeping the newest messages.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **VectorStoreChatMemoryAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful when the conversation history becomes large and relevance-based\nretrieval is more useful than simply keeping the newest messages.",
          },
        ],
      },
      {
        title: "QuestionAnswerAdvisor",
        slug: "questionansweradvisor",
        description: "QuestionAnswerAdvisor provides a straightforward RAG pattern. Typical flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "QuestionAnswerAdvisor provides a straightforward RAG pattern.\n\nTypical flow:\n\n```text\nuser question\n   |\n   v\nvector similarity search\n   |\n   v\nrelevant documents\n   |\n   v\naugmented prompt\n   |\n   v\nchat model\n```",
          },
          {
            title: "Example",
            content: "```text\nuser question\n   |\n   v\nvector similarity search\n   |\n   v\nrelevant documents\n   |\n   v\naugmented prompt\n   |\n   v\nchat model\n```",
          },
          {
            title: "Practical use",
            content: "Use **QuestionAnswerAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "RetrievalAugmentationAdvisor",
        slug: "retrievalaugmentationadvisor",
        description: "RetrievalAugmentationAdvisor supports more modular RAG flows. It is useful when the application needs greater control over: - query transformation -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "RetrievalAugmentationAdvisor supports more modular RAG flows.\n\nIt is useful when the application needs greater control over:\n\n- query transformation\n- retrieval\n- post-processing\n- context selection\n- prompt augmentation\nThis is preferable when a simple similarity-search advisor is not sufficient.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **RetrievalAugmentationAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **RetrievalAugmentationAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ReReadingAdvisor",
        slug: "rereadingadvisor",
        description: "ReReadingAdvisor implements a re-reading strategy intended to improve reasoning by having the model reconsider the input. It is an example of an...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ReReadingAdvisor implements a re-reading strategy intended to improve reasoning\nby having the model reconsider the input.\n\nIt is an example of an advisor that modifies the interaction pattern rather\nthan simply retrieving data.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ReReadingAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ReReadingAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ToolCallingAdvisor",
        slug: "toolcallingadvisor",
        description: "ToolCallingAdvisor manages the tool-calling loop in the ChatClient architecture. The high-level flow is:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ToolCallingAdvisor manages the tool-calling loop in the ChatClient architecture.\n\nThe high-level flow is:\n\n```text\nrequest\n  |\n  v\nmodel\n  |\n  | tool call?\n  v\nToolCallingManager\n  |\n  v\nToolCallback\n  |\n  v\ntool result\n  |\n  v\nmodel\n  |\n  v\nfinal response\n```",
          },
          {
            title: "Example",
            content: "```text\nrequest\n  |\n  v\nmodel\n  |\n  | tool call?\n  v\nToolCallingManager\n  |\n  v\nToolCallback\n  |\n  v\ntool result\n  |\n  v\nmodel\n  |\n  v\nfinal response\n```",
          },
          {
            title: "Practical use",
            content: "Use **ToolCallingAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Custom advisors",
        slug: "custom-advisors",
        description: "A custom advisor can implement application-specific behavior. Possible examples: - Add tenant information - Add security context - Rewrite a prompt -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A custom advisor can implement application-specific behavior.\n\nPossible examples:\n\n- Add tenant information\n- Add security context\n- Rewrite a prompt\n- Record business metrics\n- Add custom retrieval\n- Enforce request policies\n- Remove sensitive fields\nA custom advisor should have one clear responsibility.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Custom advisors** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Custom advisors** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Advisor observability",
        slug: "advisor-observability",
        description: "Advisors participate in Spring AI observability. This allows teams to understand: - how long an advisor took - which advisor executed - ordering -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Advisors participate in Spring AI observability.\n\nThis allows teams to understand:\n\n- how long an advisor took\n- which advisor executed\n- ordering\n- related tracing information\nThis becomes important when a request passes through many AI processing steps.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Advisor observability** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Advisor observability** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Tool Calling And Agentic Applications",
    slug: "tool-calling-and-agentic-applications",
    description: "Learn Tool Calling And Agentic Applications through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "What tool calling means",
        slug: "what-tool-calling-means",
        description: "Tool calling allows a model to request application-defined functions. It changes the application from: \"AI only generates text\" to: \"AI can request...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tool calling allows a model to request application-defined functions.\n\nIt changes the application from:\n\n\"AI only generates text\"\nto:\n\n\"AI can request controlled operations.\"\nExamples:\n\n- Query a database\n- Search a product catalog\n- Check weather\n- Create an order\n- Retrieve account information\nThe application remains responsible for execution.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **What tool calling means** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **What tool calling means** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool calling architecture",
        slug: "tool-calling-architecture",
        description: "Spring AI 2.x makes the tool-calling loop a first-class component of the ChatClient advisor chain. High-level flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI 2.x makes the tool-calling loop a first-class component of the\nChatClient advisor chain.\n\nHigh-level flow:\n\n```java\n1. Define tools.\n2. Register tools with ChatClient.\n3. Send request.\n4. Model decides whether to call a tool.\n5. ToolCallingManager executes the selected callback.\n6. Tool result is added to the conversation.\n7. Model receives the result.\n8. Loop continues until no more tool calls are requested.\n```",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tool calling architecture** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tool calling architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Defining tools with @Tool",
        slug: "defining-tools-with-tool",
        description: "A method can be exposed as a tool using @Tool. Example: The description is important.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A method can be exposed as a tool using @Tool.\n\nExample:\n\n```java\nclass WeatherTools {\n\n    @Tool(description = \"Get current weather for a city\")\n    public String getWeather(String city) {\n        return weatherService.fetch(city);\n    }\n}\n```\nThe description is important.\n\nThe model uses the description to understand when the tool should be called.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Defining tools with @Tool** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Defining tools with @Tool** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "@ToolParam",
        slug: "toolparam",
        description: "Tool parameters should also be described when necessary. Example: A well-described parameter helps the model construct correct tool arguments.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tool parameters should also be described when necessary.\n\nExample:\n\n```java\n@Tool(description = \"Get weather for a city\")\npublic String getWeather(\n    @ToolParam(description = \"City name\") String city) {\n\n    return weatherService.fetch(city);\n}\n```\nA well-described parameter helps the model construct correct tool arguments.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **@ToolParam** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **@ToolParam** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MethodToolCallback",
        slug: "methodtoolcallback",
        description: "MethodToolCallback provides programmatic control over method-backed tools. It is useful when: - - the source method is not yours - - registration is...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MethodToolCallback provides programmatic control over method-backed tools.\n\nIt is useful when:\n\n- the source method is not yours\n- registration is dynamic\n- tool definitions need to be constructed at runtime",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MethodToolCallback** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MethodToolCallback** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "FunctionToolCallback",
        slug: "functiontoolcallback",
        description: "FunctionToolCallback can expose: - Function - Supplier - Consumer - BiFunction - lambdas - method references Example concept:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "FunctionToolCallback can expose:\n\n- Function\n- Supplier\n- Consumer\n- BiFunction\n- lambdas\n- method references\nExample concept:\n\n```java\nFunctionToolCallback.builder(\n    \"currentWeather\",\n    weatherService::getWeather\n)\n.description(\"Get the weather\")\n.inputType(WeatherRequest.class)\n.build();\n```",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **FunctionToolCallback** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **FunctionToolCallback** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ToolCallback beans",
        slug: "toolcallback-beans",
        description: "ToolCallback objects can be Spring beans. This allows normal Spring dependency injection and configuration.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ToolCallback objects can be Spring beans.\n\nThis allows normal Spring dependency injection and configuration.\n\nThe tool can then be explicitly supplied to ChatClient.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ToolCallback beans** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ToolCallback beans** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Passing tools to ChatClient",
        slug: "passing-tools-to-chatclient",
        description: "Tools can be supplied for one request: Or configured as defaults: Per-call tools are useful when only certain operations should be available for a...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tools can be supplied for one request:\n\n```java\nchatClient.prompt(...)\n    .tools(weatherTools)\n    .call();\n```\nOr configured as defaults:\n\n```java\nChatClient.builder(chatModel)\n    .defaultTools(weatherTools)\n    .build();\n```\nPer-call tools are useful when only certain operations should be available for\na specific request.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Passing tools to ChatClient** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Passing tools to ChatClient** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Default tools vs per-call tools",
        slug: "default-tools-vs-per-call-tools",
        description: "Default tools are available to every request created from that client. This is convenient for safe, frequently needed tools.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Default tools are available to every request created from that client.\n\nThis is convenient for safe, frequently needed tools.\n\nHowever, destructive or high-risk operations should generally not be globally\navailable.\n\nExamples of high-risk operations:\n\n- deleteCustomer()\n- transferMoney()\n- cancelOrder()\n- sendExternalEmail()\nThese should have explicit authorization and careful registration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Default tools vs per-call tools** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Default tools vs per-call tools** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool calling loop",
        slug: "tool-calling-loop",
        description: "The loop is: This loop can continue more than once.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The loop is:\n\n```text\nRequest\n   |\n   v\nModel\n   |\n   +---- normal response ----> finish\n   |\n   +---- tool request\n            |\n            v\n       execute tool\n            |\n            v\n       tool result\n            |\n            v\n          model\n            |\n         repeat\n```\nThis loop can continue more than once.",
          },
          {
            title: "Example",
            content: "```text\nRequest\n   |\n   v\nModel\n   |\n   +---- normal response ----> finish\n   |\n   +---- tool request\n            |\n            v\n       execute tool\n            |\n            v\n       tool result\n            |\n            v\n          model\n            |\n         repeat\n```",
          },
          {
            title: "Practical use",
            content: "Use **Tool calling loop** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool results and model iteration",
        slug: "tool-results-and-model-iteration",
        description: "The model receives the tool result as additional conversation context. It can then: - - answer the user - - call another tool - - revise the reasoning...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The model receives the tool result as additional conversation context.\n\nIt can then:\n\n- answer the user\n- call another tool\n- revise the reasoning\n- request additional information\nThis is the basis of multi-step agentic behavior.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tool results and model iteration** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tool results and model iteration** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Security boundaries",
        slug: "security-boundaries",
        description: "A critical security principle: The model does not receive unrestricted access to your application APIs. The application owns the execution mechanism.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A critical security principle:\n\nThe model does not receive unrestricted access to your application APIs.\n\nThe application owns the execution mechanism.\n\nStill, the application must validate:\n\n- tool arguments\n- authorization\n- tenant boundaries\n- user permissions\n- destructive actions\n- external side effects\nNever assume that because a model requested a tool, the action is automatically\nauthorized.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Security boundaries** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Security boundaries** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool calling with different models",
        slug: "tool-calling-with-different-models",
        description: "Tool calling support varies by provider and model. Before enabling tools, verify: - tool/function support - input schema support - streaming behavior -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tool calling support varies by provider and model.\n\nBefore enabling tools, verify:\n\n- tool/function support\n- input schema support\n- streaming behavior\n- structured output behavior\n- model-specific limitations",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tool calling with different models** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tool calling with different models** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Vector Stores",
    slug: "vector-stores",
    description: "Learn Vector Stores through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "What a vector database is",
        slug: "what-a-vector-database-is",
        description: "A vector database stores vector representations and supports similarity search. Traditional database query: WHERE name = 'Spring' Vector search: Find...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A vector database stores vector representations and supports similarity search.\n\nTraditional database query:\n\nWHERE name = 'Spring'\nVector search:\n\nFind vectors most similar to the query vector.\nThis is useful when exact keyword matching is insufficient.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **What a vector database is** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Find vectors most similar to the query vector.\nThis is useful when exact keyword matching is insufficient.",
          },
        ],
      },
      {
        title: "VectorStore abstraction",
        slug: "vectorstore-abstraction",
        description: "Spring AI provides the VectorStore abstraction. Conceptual operations: - add(documents) - delete(ids) - delete(filter) - similaritySearch(query) -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides the VectorStore abstraction.\n\nConceptual operations:\n\n- add(documents)\n- delete(ids)\n- delete(filter)\n- similaritySearch(query)\n- similaritySearch(searchRequest)\n\nThis allows application code to use different vector database implementations\nwith a consistent API.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **VectorStore abstraction** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **VectorStore abstraction** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Document model",
        slug: "document-model",
        description: "A Document represents retrievable content. Conceptually it contains: - id - text/content - metadata - optional media information Metadata can contain...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A Document represents retrievable content.\n\nConceptually it contains:\n\n- id\n- text/content\n- metadata\n- optional media information\nMetadata can contain useful information such as:\n\n- source\n- page\n- category\n- tenant\n- author\n- timestamp",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Document model** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Document model** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Adding documents",
        slug: "adding-documents",
        description: "The ingestion pipeline typically creates Documents and stores them. Flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The ingestion pipeline typically creates Documents and stores them.\n\nFlow:\n\n```text\nraw content\n   |\n   v\nDocument\n   |\n   v\nembedding\n   |\n   v\nvector store\n```",
          },
          {
            title: "Example",
            content: "```text\nraw content\n   |\n   v\nDocument\n   |\n   v\nembedding\n   |\n   v\nvector store\n```",
          },
          {
            title: "Practical use",
            content: "Use **Adding documents** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Deleting documents",
        slug: "deleting-documents",
        description: "Documents can be removed by identifiers or filters. Deletion is important when source information changes.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Documents can be removed by identifiers or filters.\n\nDeletion is important when source information changes.\n\nFor example:\n\n```text\nOld policy document\n    |\n    X\nremove from vector store\n    |\n    v\nNew policy document\n    |\n    v\ningest\n```",
          },
          {
            title: "Example",
            content: "```text\nOld policy document\n    |\n    X\nremove from vector store\n    |\n    v\nNew policy document\n    |\n    v\ningest\n```",
          },
          {
            title: "Practical use",
            content: "Use **Deleting documents** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Similarity search",
        slug: "similarity-search",
        description: "A similarity search takes a query and returns relevant documents. Example: - Query: - \"How do I configure Redis caching?\" Vector store: - [document...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A similarity search takes a query and returns relevant documents.\n\nExample:\n\n- Query:\n- \"How do I configure Redis caching?\"\nVector store:\n\n- [document about Redis configuration]\n- [document about Spring caching]\n- [document about unrelated Kafka]\n- ...\n\nSimilarity ranking attempts to return the most relevant content.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Similarity search** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Similarity search** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "SearchRequest",
        slug: "searchrequest",
        description: "SearchRequest provides structured control over similarity search. Applications can use it to express: - query - top-K - similarity threshold - metadata...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "SearchRequest provides structured control over similarity search.\n\nApplications can use it to express:\n\n- query\n- top-K\n- similarity threshold\n- metadata filter\n\nThis is more flexible than a simple string query.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **SearchRequest** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **SearchRequest** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Metadata filtering",
        slug: "metadata-filtering",
        description: "Metadata filters allow retrieval to be restricted. Example: category = \"spring-security\" Then a query for: \"authentication\" can be restricted to...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Metadata filters allow retrieval to be restricted.\n\nExample:\n\ncategory = \"spring-security\"\nThen a query for:\n\n\"authentication\"\ncan be restricted to security documents.\n\nThis is extremely useful in multi-tenant or multi-domain applications.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Metadata filtering** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Metadata filtering** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Similarity and relevance",
        slug: "similarity-and-relevance",
        description: "A vector search does not guarantee that every returned document is useful. Applications can improve retrieval through: - top-K tuning - similarity...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A vector search does not guarantee that every returned document is useful.\n\nApplications can improve retrieval through:\n\n- top-K tuning\n- similarity thresholds\n- metadata filters\n- better chunking\n- better embeddings\n- query transformation\n- reranking strategies",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Similarity and relevance** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Similarity and relevance** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Vector store selection",
        slug: "vector-store-selection",
        description: "Choose a vector store based on: - existing infrastructure - scale - latency - operational expertise - cloud environment - filtering needs - cost -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Choose a vector store based on:\n\n- existing infrastructure\n- scale\n- latency\n- operational expertise\n- cloud environment\n- filtering needs\n- cost\n- transactional requirements\nThere is no universal best vector database.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Vector store selection** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Vector store selection** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Vector database implementations",
        slug: "vector-database-implementations",
        description: "The current Spring AI documentation lists integrations including: - Apache Cassandra - Azure Vector Search - Chroma - Elasticsearch - GemFire - MariaDB...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The current Spring AI documentation lists integrations including:\n\n- Apache Cassandra\n- Azure Vector Search\n- Chroma\n- Elasticsearch\n- GemFire\n- MariaDB\n- Milvus\n- MongoDB Atlas\n- Neo4j\n- OpenSearch\n- Oracle\n- PostgreSQL / PGVector\n- Pinecone\n- Qdrant\n- Redis\n- Typesense\n- Weaviate\n- AWS S3 Vector Store\n\nEach implementation has its own setup and provider-specific properties.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Vector database implementations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Vector database implementations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "PostgreSQL/PGVector",
        slug: "postgresql-pgvector",
        description: "PGVector adds vector capabilities to PostgreSQL. This is attractive when an organization already uses PostgreSQL.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "PGVector adds vector capabilities to PostgreSQL.\n\nThis is attractive when an organization already uses PostgreSQL.\n\nTypical architecture:\n\n```text\nSpring AI\n   |\n   v\nPgVectorStore\n   |\n   v\nPostgreSQL + vector extension\n```\nThe database can store:\n\n- document content\n- metadata\n- embeddings\nThe vector dimension must match the embedding model.",
          },
          {
            title: "Example",
            content: "```text\nSpring AI\n   |\n   v\nPgVectorStore\n   |\n   v\nPostgreSQL + vector extension\n```",
          },
          {
            title: "Practical use",
            content: "This is attractive when an organization already uses PostgreSQL.",
          },
        ],
      },
      {
        title: "Redis",
        slug: "redis",
        description: "Redis can store and search vectors alongside application data. Important configuration concepts include: - distance metric - vector algorithm - HNSW...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Redis can store and search vectors alongside application data.\n\nImportant configuration concepts include:\n\n- distance metric\n- vector algorithm\n- HNSW parameters\n- index name\n- key prefix\n\nRedis can be useful when the application already relies heavily on Redis.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Redis** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "- distance metric\n- vector algorithm\n- HNSW parameters\n- index name\n- key prefix\n\nRedis can be useful when the application already relies heavily on Redis.",
          },
        ],
      },
      {
        title: "Elasticsearch",
        slug: "elasticsearch",
        description: "Elasticsearch is a search and analytics platform with vector search capabilities. It can be useful when an application already needs: - full-text...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Elasticsearch is a search and analytics platform with vector search capabilities.\n\nIt can be useful when an application already needs:\n\n- full-text search\n- filtering\n- analytics\n- vector search\n\nThis allows hybrid search architectures.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Elasticsearch** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It can be useful when an application already needs:",
          },
        ],
      },
      {
        title: "Cassandra",
        slug: "cassandra",
        description: "Cassandra provides distributed storage and vector similarity capabilities. It can be useful for systems requiring: - high availability - distributed...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Cassandra provides distributed storage and vector similarity capabilities.\n\nIt can be useful for systems requiring:\n\n- high availability\n- distributed operation\n- large-scale data\n\nSpring AI provides a Cassandra VectorStore implementation.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Cassandra** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It can be useful for systems requiring:",
          },
        ],
      },
      {
        title: "MongoDB Atlas",
        slug: "mongodb-atlas",
        description: "MongoDB Atlas can store document-oriented application data and vector data. This is useful when the application's existing domain data is already...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MongoDB Atlas can store document-oriented application data and vector data.\n\nThis is useful when the application's existing domain data is already stored\nin MongoDB.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MongoDB Atlas** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful when the application's existing domain data is already stored\nin MongoDB.",
          },
        ],
      },
      {
        title: "Neo4j",
        slug: "neo4j",
        description: "Neo4j is a graph database. Its combination with vector search can be useful when applications need both: - semantic similarity - graph relationships...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Neo4j is a graph database.\n\nIts combination with vector search can be useful when applications need both:\n\n- semantic similarity\n- graph relationships\nExamples:\n\n- recommendation systems\n- knowledge graphs\n- relationship-aware retrieval",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Neo4j** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Its combination with vector search can be useful when applications need both:",
          },
        ],
      },
      {
        title: "OpenSearch",
        slug: "opensearch",
        description: "OpenSearch provides search capabilities and vector search. It can be a useful choice for applications already using OpenSearch for traditional search.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "OpenSearch provides search capabilities and vector search.\n\nIt can be a useful choice for applications already using OpenSearch for\ntraditional search.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **OpenSearch** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **OpenSearch** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Chroma",
        slug: "chroma",
        description: "Chroma is commonly used for AI-oriented vector storage and experimentation. It can be appropriate for development and smaller application architectures.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Chroma is commonly used for AI-oriented vector storage and experimentation.\n\nIt can be appropriate for development and smaller application architectures.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Chroma** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Chroma** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Milvus",
        slug: "milvus",
        description: "Milvus is a vector database designed specifically for vector search workloads. It is useful when vector search is a primary data requirement.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Milvus is a vector database designed specifically for vector search workloads.\n\nIt is useful when vector search is a primary data requirement.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Milvus** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Milvus** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Pinecone",
        slug: "pinecone",
        description: "Pinecone is a managed vector database service. A managed vector store can reduce the operational work required to run the vector infrastructure yourself.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Pinecone is a managed vector database service.\n\nA managed vector store can reduce the operational work required to run the\nvector infrastructure yourself.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Pinecone** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Pinecone** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Qdrant",
        slug: "qdrant",
        description: "Qdrant is a vector search engine focused on similarity search and metadata filtering. It is commonly used for semantic retrieval workloads.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Qdrant is a vector search engine focused on similarity search and metadata\nfiltering.\n\nIt is commonly used for semantic retrieval workloads.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Qdrant** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Qdrant** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Weaviate",
        slug: "weaviate",
        description: "Weaviate is a vector database that supports semantic retrieval and related AI-oriented search capabilities.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Weaviate is a vector database that supports semantic retrieval and related\nAI-oriented search capabilities.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Weaviate** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Weaviate** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MariaDB",
        slug: "mariadb",
        description: "MariaDB can provide vector capabilities while allowing organizations to continue using a familiar relational database ecosystem.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MariaDB can provide vector capabilities while allowing organizations to\ncontinue using a familiar relational database ecosystem.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MariaDB** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MariaDB** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Azure Vector Search",
        slug: "azure-vector-search",
        description: "Azure Vector Search is useful for applications already operating within the Azure ecosystem. Consider: - cloud identity - Azure networking - managed...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Azure Vector Search is useful for applications already operating within the\nAzure ecosystem.\n\nConsider:\n\n- cloud identity\n- Azure networking\n- managed infrastructure\n- integration with existing Azure services",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Azure Vector Search** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Azure Vector Search is useful for applications already operating within the\nAzure ecosystem.",
          },
        ],
      },
      {
        title: "Oracle",
        slug: "oracle",
        description: "Oracle's vector capabilities allow vector data and similarity search to be used alongside Oracle database infrastructure. This can be valuable in...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Oracle's vector capabilities allow vector data and similarity search to be\nused alongside Oracle database infrastructure.\n\nThis can be valuable in enterprise environments already standardized on Oracle.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Oracle** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Oracle** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "GemFire",
        slug: "gemfire",
        description: "GemFire is a distributed in-memory data platform. Its vector capabilities allow vector similarity search while retaining the distributed...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "GemFire is a distributed in-memory data platform.\n\nIts vector capabilities allow vector similarity search while retaining the\ndistributed characteristics of GemFire.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **GemFire** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **GemFire** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Typesense",
        slug: "typesense",
        description: "Typesense is a search engine optimized for fast search experiences and also provides vector search. It can be useful when traditional search and vector...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Typesense is a search engine optimized for fast search experiences and also\nprovides vector search.\n\nIt can be useful when traditional search and vector search need to coexist.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Typesense** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It can be useful when traditional search and vector search need to coexist.",
          },
        ],
      },
      {
        title: "S3 Vector Store",
        slug: "s3-vector-store",
        description: "AWS S3 Vector Store provides a serverless approach to storing and querying vectors at scale. The integration can store vectors and associated metadata...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "AWS S3 Vector Store provides a serverless approach to storing and querying\nvectors at scale.\n\nThe integration can store vectors and associated metadata and perform vector\nsearches.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **S3 Vector Store** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **S3 Vector Store** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "RAG And Data Engineering",
    slug: "rag-and-data-engineering",
    description: "Learn RAG And Data Engineering through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "RAG fundamentals",
        slug: "rag-fundamentals",
        description: "RAG combines retrieval with generation. Without RAG: With RAG:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "RAG combines retrieval with generation.\n\nWithout RAG:\n\n```text\nUser question\n   |\n   v\nModel\n   |\n   v\nAnswer\n```\nWith RAG:\n\n```text\nUser question\n   |\n   v\nRetrieve relevant data\n   |\n   v\nAdd context\n   |\n   v\nModel\n   |\n   v\nGrounded answer\n```",
          },
          {
            title: "Example",
            content: "```text\nUser question\n   |\n   v\nModel\n   |\n   v\nAnswer\n```",
          },
          {
            title: "Practical use",
            content: "Use **RAG fundamentals** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "RAG architecture",
        slug: "rag-architecture",
        description: "A complete RAG system has two major phases. **Offline / Ingestion:** **Online / Query:**",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A complete RAG system has two major phases.\n\n**Offline / Ingestion:**\n\n```text\ndocuments\n   |\n   v\nreaders\n   |\n   v\ntransformers\n   |\n   v\nchunks\n   |\n   v\nembeddings\n   |\n   v\nvector store\n```\n\n**Online / Query:**\n\n```text\nuser question\n   |\n   v\nembedding/search\n   |\n   v\nrelevant chunks\n   |\n   v\nprompt augmentation\n   |\n   v\nchat model\n   |\n   v\nanswer\n```",
          },
          {
            title: "Example",
            content: "```text\ndocuments\n   |\n   v\nreaders\n   |\n   v\ntransformers\n   |\n   v\nchunks\n   |\n   v\nembeddings\n   |\n   v\nvector store\n```",
          },
          {
            title: "Practical use",
            content: "Use **RAG architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Ingestion pipeline",
        slug: "ingestion-pipeline",
        description: "Ingestion converts raw information into retrievable documents. Typical stages: - Read - Transform - Write This is the ETL pattern.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Ingestion converts raw information into retrievable documents.\n\nTypical stages:\n\n- Read\n- Transform\n- Write\n\nThis is the ETL pattern.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Ingestion pipeline** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Ingestion pipeline** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Document",
        slug: "document",
        description: "A Document is the core unit moving through the ETL pipeline. It can contain: - text - metadata - media Metadata is especially important because...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A Document is the core unit moving through the ETL pipeline.\n\nIt can contain:\n\n- text\n- metadata\n- media\n\nMetadata is especially important because retrieval often needs filters.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Document** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Document** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "DocumentReader",
        slug: "documentreader",
        description: "DocumentReader obtains Documents from an external source. Conceptually: Examples include readers for: - PDF - text - HTML - Markdown - web resources -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "DocumentReader obtains Documents from an external source.\n\nConceptually:\n\n```text\nsource\n   |\n   v\nDocumentReader\n   |\n   v\nList<Document>\n```\nExamples include readers for:\n\n- PDF\n- text\n- HTML\n- Markdown\n- web resources\n- other supported formats",
          },
          {
            title: "Example",
            content: "```text\nsource\n   |\n   v\nDocumentReader\n   |\n   v\nList<Document>\n```",
          },
          {
            title: "Practical use",
            content: "Use **DocumentReader** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "DocumentTransformer",
        slug: "documenttransformer",
        description: "A DocumentTransformer changes documents before storage. Typical transformations: - splitting - cleanup - normalization - metadata enrichment - chunking",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A DocumentTransformer changes documents before storage.\n\nTypical transformations:\n\n- splitting\n- cleanup\n- normalization\n- metadata enrichment\n- chunking",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **DocumentTransformer** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **DocumentTransformer** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "DocumentWriter",
        slug: "documentwriter",
        description: "DocumentWriter represents the final stage. Typical writer: VectorStore Flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "DocumentWriter represents the final stage.\n\nTypical writer:\n\nVectorStore\nFlow:\n\n```text\nDocument\n   |\n   v\nembedding\n   |\n   v\nVectorStore\n```",
          },
          {
            title: "Example",
            content: "```text\nDocument\n   |\n   v\nembedding\n   |\n   v\nVectorStore\n```",
          },
          {
            title: "Practical use",
            content: "Use **DocumentWriter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ETL pipeline",
        slug: "etl-pipeline",
        description: "Spring AI's ETL framework provides: - DocumentReader - DocumentTransformer - DocumentWriter A simple conceptual pipeline is: - writer.write( -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI's ETL framework provides:\n\n- DocumentReader\n- DocumentTransformer\n- DocumentWriter\nA simple conceptual pipeline is:\n\n- writer.write(\n- transformer.transform(\n- reader.read()\n- )\n- );\n\nThis separation makes ingestion components reusable.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ETL pipeline** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ETL pipeline** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "PDF document reading",
        slug: "pdf-document-reading",
        description: "PDF readers can convert document pages/content into Spring AI Documents. A common RAG workflow is:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "PDF readers can convert document pages/content into Spring AI Documents.\n\nA common RAG workflow is:\n\n```text\nPDF\n  |\n  v\nPagePdfDocumentReader\n  |\n  v\nDocuments\n  |\n  v\nsplitter\n  |\n  v\nVectorStore\n```",
          },
          {
            title: "Example",
            content: "```text\nPDF\n  |\n  v\nPagePdfDocumentReader\n  |\n  v\nDocuments\n  |\n  v\nsplitter\n  |\n  v\nVectorStore\n```",
          },
          {
            title: "Practical use",
            content: "Use **PDF document reading** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Text document reading",
        slug: "text-document-reading",
        description: "Text readers can turn a text resource into a Document. Important consideration: Reading an entire large file into one Document may not be appropriate...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Text readers can turn a text resource into a Document.\n\nImportant consideration:\n\nReading an entire large file into one Document may not be appropriate for\nretrieval.\n\nUse a splitter when the content needs to be divided.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Text document reading** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Text document reading** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "HTML document reading",
        slug: "html-document-reading",
        description: "HTML readers can extract content according to selectors and configuration. Useful metadata can include: - title - source URL - links - selected element...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "HTML readers can extract content according to selectors and configuration.\n\nUseful metadata can include:\n\n- title\n- source URL\n- links\n- selected element information\nHTML cleanup is important because navigation, advertisements, scripts, and\nlayout elements can otherwise become retrieval noise.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **HTML document reading** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **HTML document reading** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Markdown document reading",
        slug: "markdown-document-reading",
        description: "Markdown readers convert Markdown content into Documents. Markdown is useful for: - documentation - README files - technical knowledge bases",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Markdown readers convert Markdown content into Documents.\n\nMarkdown is useful for:\n\n- documentation\n- README files\n- technical knowledge bases",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Markdown document reading** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Markdown is useful for:",
          },
        ],
      },
      {
        title: "Document splitting",
        slug: "document-splitting",
        description: "Chunking is one of the most important RAG decisions. Bad: - split randomly in the middle of a paragraph - split in the middle of code - split tables...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Chunking is one of the most important RAG decisions.\n\nBad:\n\n- split randomly in the middle of a paragraph\n- split in the middle of code\n- split tables incorrectly\nBetter:\n\n- preserve semantic boundaries first\n- then enforce manageable chunk sizes\nThe goal is:\n\n- enough context\n- without wasting tokens",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Document splitting** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Document splitting** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "TokenTextSplitter",
        slug: "tokentextsplitter",
        description: "TokenTextSplitter is a transformer designed to split content according to token-oriented limits. Conceptually: The exact chunking configuration should...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "TokenTextSplitter is a transformer designed to split content according to\ntoken-oriented limits.\n\nConceptually:\n\n```text\nlarge document\n   |\n   v\nTokenTextSplitter\n   |\n   +---- chunk 1\n   +---- chunk 2\n   +---- chunk 3\n   +---- ...\n```\nThe exact chunking configuration should be tuned to the model and content.",
          },
          {
            title: "Example",
            content: "```text\nlarge document\n   |\n   v\nTokenTextSplitter\n   |\n   +---- chunk 1\n   +---- chunk 2\n   +---- chunk 3\n   +---- ...\n```",
          },
          {
            title: "Practical use",
            content: "Use **TokenTextSplitter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Metadata",
        slug: "metadata",
        description: "Metadata is additional information associated with a document. Examples: - source = handbook.pdf - page = 12 - department = finance - tenant = companyA...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Metadata is additional information associated with a document.\n\nExamples:\n\n- source = handbook.pdf\n- page = 12\n- department = finance\n- tenant = companyA\n- category = security\n\nMetadata supports:\n\n- filtering\n- debugging\n- citations\n- authorization\n- document management",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Metadata** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Metadata** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Vector storage",
        slug: "vector-storage",
        description: "After splitting: Each stored record typically associates: - vector - text/content - metadata - identifier",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "After splitting:\n\n```text\nchunk\n   |\n   v\nembedding\n   |\n   v\nvector store\n```\nEach stored record typically associates:\n\n- vector\n- text/content\n- metadata\n- identifier",
          },
          {
            title: "Example",
            content: "```text\nchunk\n   |\n   v\nembedding\n   |\n   v\nvector store\n```",
          },
          {
            title: "Practical use",
            content: "Use **Vector storage** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Retrieval",
        slug: "retrieval",
        description: "At query time: The retrieval stage should be measured separately from generation. If the correct document is never retrieved, even a powerful model may...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "At query time:\n\n```text\nquestion\n   |\n   v\nembedding / search\n   |\n   v\ntop relevant documents\n```\nThe retrieval stage should be measured separately from generation.\n\nIf the correct document is never retrieved, even a powerful model may produce\na poor answer.",
          },
          {
            title: "Example",
            content: "```text\nquestion\n   |\n   v\nembedding / search\n   |\n   v\ntop relevant documents\n```",
          },
          {
            title: "Practical use",
            content: "Use **Retrieval** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Context assembly",
        slug: "context-assembly",
        description: "Retrieved documents are assembled into model context. Conceptually: - System instructions - + - conversation history - + - user question - + -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Retrieved documents are assembled into model context.\n\nConceptually:\n\n- System instructions\n- +\n- conversation history\n- +\n- user question\n- +\n- retrieved context\n- =\n- model prompt\n\nToo much context can hurt performance and increase cost.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Context assembly** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Context assembly** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "QuestionAnswerAdvisor",
        slug: "questionansweradvisor-125",
        description: "QuestionAnswerAdvisor is a convenient RAG advisor. It uses a vector store to retrieve relevant information and augment the model interaction.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "QuestionAnswerAdvisor is a convenient RAG advisor.\n\nIt uses a vector store to retrieve relevant information and augment the model\ninteraction.\n\nIt is useful for straightforward documentation Q&A.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **QuestionAnswerAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It is useful for straightforward documentation Q&A.",
          },
        ],
      },
      {
        title: "RetrievalAugmentationAdvisor",
        slug: "retrievalaugmentationadvisor-126",
        description: "RetrievalAugmentationAdvisor is more modular. It is appropriate when the application needs a configurable retrieval pipeline.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "RetrievalAugmentationAdvisor is more modular.\n\nIt is appropriate when the application needs a configurable retrieval pipeline.\n\nPotential stages include:\n\n- query transformation\n- retrieval\n- document post-processing\n- context selection\n- prompt augmentation",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **RetrievalAugmentationAdvisor** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **RetrievalAugmentationAdvisor** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "RAG quality and failure modes",
        slug: "rag-quality-and-failure-modes",
        description: "Common RAG failures: 1. Wrong chunk size 2.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Common RAG failures:\n\n1. Wrong chunk size\n2. Poor embedding model\n3. Missing metadata\n4. Incorrect similarity threshold\n5. Too many retrieved documents\n6. Too few retrieved documents\n7. Duplicate chunks\n8. Stale documents\n9. Query wording mismatch\n10. Poor source cleanup\n\nRAG quality is therefore an engineering problem, not just a model-selection\nproblem.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **RAG quality and failure modes** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **RAG quality and failure modes** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "MCP",
    slug: "mcp",
    description: "Learn MCP through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "What MCP is",
        slug: "what-mcp-is",
        description: "MCP stands for Model Context Protocol. It standardizes how AI applications interact with external tools and resources.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MCP stands for Model Context Protocol.\n\nIt standardizes how AI applications interact with external tools and resources.\n\nThink of MCP as a protocol boundary between:\n\n```text\nAI application\n    |\n    v\nstandardized MCP interface\n    |\n    +---- tools\n    +---- resources\n    +---- prompts\n    |\n    v\nexternal system\n```\nSpring AI supports both consuming MCP servers and exposing Spring services\nthrough MCP.",
          },
          {
            title: "Example",
            content: "```text\nAI application\n    |\n    v\nstandardized MCP interface\n    |\n    +---- tools\n    +---- resources\n    +---- prompts\n    |\n    v\nexternal system\n```",
          },
          {
            title: "Practical use",
            content: "Use **What MCP is** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP architecture",
        slug: "mcp-architecture",
        description: "MCP commonly has: The MCP Java SDK provides the Java implementation used by Spring AI.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MCP commonly has:\n\n```text\nClient\n  |\n  v\nSession / protocol\n  |\n  v\nServer\n  |\n  +---- Tools\n  +---- Resources\n  +---- Prompts\n```\nThe MCP Java SDK provides the Java implementation used by Spring AI.",
          },
          {
            title: "Example",
            content: "```text\nClient\n  |\n  v\nSession / protocol\n  |\n  v\nServer\n  |\n  +---- Tools\n  +---- Resources\n  +---- Prompts\n```",
          },
          {
            title: "Practical use",
            content: "Use **MCP architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP Java SDK",
        slug: "mcp-java-sdk",
        description: "The MCP Java implementation separates responsibilities into layers. Important capabilities include: - tool discovery - tool execution - resource access...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The MCP Java implementation separates responsibilities into layers.\n\nImportant capabilities include:\n\n- tool discovery\n- tool execution\n- resource access\n- prompt interaction\n- capability negotiation\n- notifications\n- synchronous operations\n- asynchronous operations",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP Java SDK** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP Java SDK** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP clients",
        slug: "mcp-clients",
        description: "An MCP client connects an AI application to one or more MCP servers. The client can discover tools and other capabilities exposed by the server.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An MCP client connects an AI application to one or more MCP servers.\n\nThe client can discover tools and other capabilities exposed by the server.\n\nSpring AI provides Boot integration to simplify this configuration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP clients** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP clients** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP servers",
        slug: "mcp-servers",
        description: "An MCP server exposes capabilities to clients. A server can expose: - tools - resources - prompts Example:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An MCP server exposes capabilities to clients.\n\nA server can expose:\n\n- tools\n- resources\n- prompts\n\nExample:\n\n```text\nWeather MCP server\n    |\n    +---- getWeather\n    +---- getForecast\n```",
          },
          {
            title: "Example",
            content: "```text\nWeather MCP server\n    |\n    +---- getWeather\n    +---- getForecast\n```",
          },
          {
            title: "Practical use",
            content: "Use **MCP servers** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP tools",
        slug: "mcp-tools",
        description: "MCP tools are executable operations. They allow an AI application to request actions or retrieve information through a standardized protocol.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MCP tools are executable operations.\n\nThey allow an AI application to request actions or retrieve information through\na standardized protocol.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP tools** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP tools** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP resources",
        slug: "mcp-resources",
        description: "Resources represent data accessible through the MCP protocol. Examples can include: - files - documents - database-backed resources - other application...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Resources represent data accessible through the MCP protocol.\n\nExamples can include:\n\n- files\n- documents\n- database-backed resources\n- other application information",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP resources** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP resources** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP prompts",
        slug: "mcp-prompts",
        description: "MCP servers can expose reusable prompt templates. This allows prompt behavior to be shared through the protocol.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MCP servers can expose reusable prompt templates.\n\nThis allows prompt behavior to be shared through the protocol.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP prompts** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP prompts** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP transports",
        slug: "mcp-transports",
        description: "The current Spring AI MCP support includes multiple transport approaches. Important options include: - STDIO - SSE - Streamable HTTP - Stateless...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The current Spring AI MCP support includes multiple transport approaches.\n\nImportant options include:\n\n- STDIO\n- SSE\n- Streamable HTTP\n- Stateless Streamable HTTP\n\nTransport selection depends on deployment architecture.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP transports** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP transports** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "STDIO",
        slug: "stdio",
        description: "STDIO is process-based communication. It is useful for local MCP servers that run alongside or are launched by a client process.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "STDIO is process-based communication.\n\nIt is useful for local MCP servers that run alongside or are launched by a\nclient process.\n\nBecause it is not network-accessible in the same way as an HTTP endpoint,\nits security model differs from network transports.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **STDIO** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It is useful for local MCP servers that run alongside or are launched by a\nclient process.",
          },
        ],
      },
      {
        title: "SSE",
        slug: "sse",
        description: "Server-Sent Events can be used for HTTP-based MCP communication. The current Spring AI documentation notes that SSE-based server configuration has been...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Server-Sent Events can be used for HTTP-based MCP communication.\n\nThe current Spring AI documentation notes that SSE-based server configuration\nhas been superseded in some 2.0 server scenarios by Streamable HTTP.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **SSE** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **SSE** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Streamable HTTP",
        slug: "streamable-http",
        description: "Streamable HTTP provides an HTTP-based MCP transport suitable for networked applications. Spring AI supports it through WebMVC and WebFlux starter...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Streamable HTTP provides an HTTP-based MCP transport suitable for networked\napplications.\n\nSpring AI supports it through WebMVC and WebFlux starter configurations.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Streamable HTTP** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Streamable HTTP** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Stateless Streamable HTTP",
        slug: "stateless-streamable-http",
        description: "Stateless transport is useful when the server architecture should avoid maintaining protocol session state in the same way as a stateful server.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Stateless transport is useful when the server architecture should avoid\nmaintaining protocol session state in the same way as a stateful server.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Stateless Streamable HTTP** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Stateless Streamable HTTP** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP annotations",
        slug: "mcp-annotations",
        description: "Spring AI provides annotation-based MCP development. Important server-side annotations include: Client-side annotations include capabilities such as:...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides annotation-based MCP development.\n\nImportant server-side annotations include:\n\n```java\n@McpTool\n@McpResource\n@McpPrompt\n@McpComplete\n```\nClient-side annotations include capabilities such as:\n\n```java\n@McpLogging\n@McpSampling\n@McpElicitation\n@McpProgress\n```\nAnnotations reduce boilerplate and support declarative MCP application design.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP annotations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP annotations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP Boot Starters",
        slug: "mcp-boot-starters",
        description: "Spring AI provides Boot starters for MCP clients and servers. The goal is to integrate MCP with normal Spring Boot auto-configuration.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides Boot starters for MCP clients and servers.\n\nThe goal is to integrate MCP with normal Spring Boot auto-configuration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP Boot Starters** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP Boot Starters** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP client starter",
        slug: "mcp-client-starter",
        description: "The MCP client starter supports: - multiple client instances - automatic initialization - STDIO - HTTP/SSE - Streamable HTTP - tool filtering -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The MCP client starter supports:\n\n- multiple client instances\n- automatic initialization\n- STDIO\n- HTTP/SSE\n- Streamable HTTP\n- tool filtering\n- tool-name prefixing\n- lifecycle management\n- custom client creation",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP client starter** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP client starter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP server starter",
        slug: "mcp-server-starter",
        description: "The server starter supports: - tools - resources - prompts - different transports - synchronous operation - asynchronous operation - annotation scanning",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The server starter supports:\n\n- tools\n- resources\n- prompts\n- different transports\n- synchronous operation\n- asynchronous operation\n- annotation scanning",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP server starter** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP server starter** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Security considerations",
        slug: "security-considerations",
        description: "A network-exposed MCP server can expose powerful capabilities. the Spring AI reference warns that HTTP-based MCP server transports can expose JSON-RPC...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A network-exposed MCP server can expose powerful capabilities.\n\nthe Spring AI reference warns that HTTP-based MCP server transports can\nexpose JSON-RPC endpoints without authentication/authorization by default.\n\nTherefore:\n\n- localhost-only\n- is not the same as\n- public production endpoint\nBefore exposing an MCP server externally, place an appropriate security\nboundary in front of it.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Security considerations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Security considerations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP and Spring AI tools",
        slug: "mcp-and-spring-ai-tools",
        description: "Spring AI can bridge MCP tools into its tool execution framework. Conceptually: This lets MCP capabilities participate in normal Spring AI tool calling.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI can bridge MCP tools into its tool execution framework.\n\nConceptually:\n\n```text\nMCP server\n   |\n   v\nMCP client\n   |\n   v\nToolCallback\n   |\n   v\nChatClient\n   |\n   v\nAI model\n```\nThis lets MCP capabilities participate in normal Spring AI tool calling.",
          },
          {
            title: "Example",
            content: "```text\nMCP server\n   |\n   v\nMCP client\n   |\n   v\nToolCallback\n   |\n   v\nChatClient\n   |\n   v\nAI model\n```",
          },
          {
            title: "Practical use",
            content: "Use **MCP and Spring AI tools** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP application patterns",
        slug: "mcp-application-patterns",
        description: "Useful MCP patterns include: - AI assistant + weather server - AI assistant + filesystem server - AI assistant + database server - AI assistant +...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Useful MCP patterns include:\n\n- AI assistant + weather server\n- AI assistant + filesystem server\n- AI assistant + database server\n- AI assistant + enterprise APIs\n- AI assistant + search service\nThe advantage is standardization of the integration boundary.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MCP application patterns** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MCP application patterns** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Observability And Evaluation",
    slug: "observability-and-evaluation",
    description: "Learn Observability And Evaluation through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Spring AI observability",
        slug: "spring-ai-observability",
        description: "Spring AI integrates with Spring observability mechanisms. Core components can expose metrics and tracing information for:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI integrates with Spring observability mechanisms.\n\nCore components can expose metrics and tracing information for:\n\n```java\nChatClient\nAdvisors\nChatModel\nEmbeddingModel\nImageModel\nVectorStore\nTool calling\n```",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Spring AI observability** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Spring AI observability** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Metrics",
        slug: "metrics",
        description: "Metrics help answer questions such as: - How many model calls occurred? - How many tokens were consumed?",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Metrics help answer questions such as:\n\n- How many model calls occurred?\n- How many tokens were consumed?\n- How long did requests take?\n- Which model is used most?\n- How often are tools called?\nToken usage is especially important because AI costs are often correlated with\ninput and output token volume.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Metrics** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Metrics** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tracing",
        slug: "tracing",
        description: "Tracing connects related operations. Example: Distributed tracing can make this chain easier to debug.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tracing connects related operations.\n\nExample:\n\n```text\nHTTP request\n   |\n   v\nController\n   |\n   v\nChatClient\n   |\n   v\nAdvisor\n   |\n   v\nChatModel\n   |\n   v\nTool\n   |\n   v\nDatabase\n```\nDistributed tracing can make this chain easier to debug.",
          },
          {
            title: "Example",
            content: "```text\nHTTP request\n   |\n   v\nController\n   |\n   v\nChatClient\n   |\n   v\nAdvisor\n   |\n   v\nChatModel\n   |\n   v\nTool\n   |\n   v\nDatabase\n```",
          },
          {
            title: "Practical use",
            content: "Use **Tracing** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ChatClient observations",
        slug: "chatclient-observations",
        description: "ChatClient observations can measure invocation time and propagate tracing information. Additional contextual information can include: - streaming...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatClient observations can measure invocation time and propagate tracing\ninformation.\n\nAdditional contextual information can include:\n\n- streaming status\n- advisors\n- conversation ID\n- tool names",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ChatClient observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ChatClient observations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Advisor observations",
        slug: "advisor-observations",
        description: "Advisor observations track execution of advisors. This is useful for understanding: - advisor latency - chain order - slow retrieval - slow custom logic",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Advisor observations track execution of advisors.\n\nThis is useful for understanding:\n\n- advisor latency\n- chain order\n- slow retrieval\n- slow custom logic",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Advisor observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful for understanding:",
          },
        ],
      },
      {
        title: "ChatModel observations",
        slug: "chatmodel-observations",
        description: "ChatModel observations can capture: - model - provider - request options - response model - token usage - finish reason These measurements are valuable...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ChatModel observations can capture:\n\n- model\n- provider\n- request options\n- response model\n- token usage\n- finish reason\nThese measurements are valuable for production monitoring.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ChatModel observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ChatModel observations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Tool observations",
        slug: "tool-observations",
        description: "Tool observations can record: - tool name - tool type - tool call ID - execution timing Tool arguments/results are not exported by default because they...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Tool observations can record:\n\n- tool name\n- tool type\n- tool call ID\n- execution timing\nTool arguments/results are not exported by default because they may contain\nsensitive information.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tool observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tool observations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Embedding observations",
        slug: "embedding-observations",
        description: "Embedding operations can expose model and token usage observations. the Spring AI reference notes provider-specific observability support for certain...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Embedding operations can expose model and token usage observations.\n\nthe Spring AI reference notes provider-specific observability support for\ncertain embedding implementations.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Embedding observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Embedding observations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Image model observations",
        slug: "image-model-observations",
        description: "Image model operations can also participate in observability. the Spring AI reference notes provider-specific support.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Image model operations can also participate in observability.\n\nthe Spring AI reference notes provider-specific support.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Image model observations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Image model observations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Prompt/completion logging",
        slug: "prompt-completion-logging",
        description: "Prompt and completion data can be large and sensitive. Logging them can help debugging, but should be disabled unless there is a clear reason and an...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Prompt and completion data can be large and sensitive.\n\nLogging them can help debugging, but should be disabled unless there is a\nclear reason and an appropriate data-protection strategy.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Prompt/completion logging** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Prompt/completion logging** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Sensitive-data considerations",
        slug: "sensitive-data-considerations",
        description: "AI prompts may contain: Never enable verbose prompt logging in production without understanding the privacy and security implications.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "AI prompts may contain:\n\n```java\npasswords\ncustomer data\nfinancial information\nprivate documents\ninternal business information\n```\nNever enable verbose prompt logging in production without understanding the\nprivacy and security implications.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Sensitive-data considerations** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Sensitive-data considerations** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Token usage metrics",
        slug: "token-usage-metrics",
        description: "Useful token metrics include: - input tokens - output tokens - total tokens Token monitoring helps control: - cost - latency - context usage",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Useful token metrics include:\n\n- input tokens\n- output tokens\n- total tokens\nToken monitoring helps control:\n\n- cost\n- latency\n- context usage",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Token usage metrics** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Token usage metrics** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "AI response evaluation",
        slug: "ai-response-evaluation",
        description: "AI output should be evaluated according to application requirements. Useful dimensions: - relevance - coherence - factual correctness - groundedness -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "AI output should be evaluated according to application requirements.\n\nUseful dimensions:\n\n- relevance\n- coherence\n- factual correctness\n- groundedness\n- alignment with source data",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **AI response evaluation** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **AI response evaluation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Evaluator API",
        slug: "evaluator-api",
        description: "Spring AI provides an Evaluator API for response evaluation. An evaluator can receive: - user input - generated response - reference/context and...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides an Evaluator API for response evaluation.\n\nAn evaluator can receive:\n\n- user input\n- generated response\n- reference/context\nand produce an assessment.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Evaluator API** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Evaluator API** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Relevance, coherence and correctness",
        slug: "relevance-coherence-and-correctness",
        description: "RELEVANCE Does the response answer the question? COHERENCE Is the answer internally understandable and consistent?",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "RELEVANCE\n\nDoes the response answer the question?\n\nCOHERENCE\n\nIs the answer internally understandable and consistent?\n\n**Factual Correctness**\n\nIs the information correct?\n\nGROUNDEDNESS\n\nFor RAG systems, is the answer supported by retrieved information?",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Relevance, coherence and correctness** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Relevance, coherence and correctness** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Evaluation with reference data",
        slug: "evaluation-with-reference-data",
        description: "A useful evaluation approach is: This can help detect hallucinated or irrelevant answers.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A useful evaluation approach is:\n\n```text\nQuestion\n   +\nGenerated answer\n   +\nreference context\n   |\n   v\nevaluator\n   |\n   v\nscore / assessment\n```\nThis can help detect hallucinated or irrelevant answers.",
          },
          {
            title: "Example",
            content: "```text\nQuestion\n   +\nGenerated answer\n   +\nreference context\n   |\n   v\nevaluator\n   |\n   v\nscore / assessment\n```",
          },
          {
            title: "Practical use",
            content: "Use **Evaluation with reference data** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Spring Boot Integration",
    slug: "spring-boot-integration",
    description: "Learn Spring Boot Integration through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Auto-configuration",
        slug: "auto-configuration",
        description: "Spring AI uses Spring Boot auto-configuration to simplify setup. When the appropriate dependency and configuration are present, Spring Boot can create...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI uses Spring Boot auto-configuration to simplify setup.\n\nWhen the appropriate dependency and configuration are present, Spring Boot can\ncreate the required model/vector infrastructure.\n\nThis is similar to the normal Spring Boot development model:\n\n- dependency\n- +\n- properties\n- =\n- configured bean",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Auto-configuration** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Auto-configuration** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Spring AI starters",
        slug: "spring-ai-starters",
        description: "Starters simplify dependency selection. Examples conceptually include starters for: - chat models - embeddings - image models - vector stores - MCP -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Starters simplify dependency selection.\n\nExamples conceptually include starters for:\n\n- chat models\n- embeddings\n- image models\n- vector stores\n- MCP\n- other AI components\nThe exact artifact names depend on the current Spring AI release and integration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Spring AI starters** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Spring AI starters** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Configuration properties",
        slug: "configuration-properties",
        description: "Spring AI configuration typically uses Spring Boot properties. Example concept: spring.ai.<provider>.<component>....",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI configuration typically uses Spring Boot properties.\n\nExample concept:\n\nspring.ai.<provider>.<component>....\nConfiguration can include:\n\n- API keys\n- base URLs\n- model names\n- timeouts\n- default generation options\n- vector store settings",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Configuration properties** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Configuration properties** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "API keys and environment variables",
        slug: "api-keys-and-environment-variables",
        description: "API keys should not be hard-coded in source code. Prefer: - environment variables - secret managers - secure configuration systems Example: - spring: -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "API keys should not be hard-coded in source code.\n\nPrefer:\n\n- environment variables\n- secret managers\n- secure configuration systems\nExample:\n\n- spring:\n- ai:\n- openai:\n- api-key: ${OPENAI_API_KEY}\n\nThis keeps credentials outside source code.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **API keys and environment variables** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **API keys and environment variables** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Model-specific configuration",
        slug: "model-specific-configuration",
        description: "Provider-specific configuration may include: - model - temperature - max tokens - base URL - organization/project information - provider-specific...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Provider-specific configuration may include:\n\n- model\n- temperature\n- max tokens\n- base URL\n- organization/project information\n- provider-specific features\n\nKeep provider-specific configuration isolated when portability matters.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Model-specific configuration** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Model-specific configuration** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Runtime overrides",
        slug: "runtime-overrides",
        description: "Startup defaults can be overridden at runtime. This is useful for: - different temperatures - model routing - task-specific settings - user-selected models",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Startup defaults can be overridden at runtime.\n\nThis is useful for:\n\n- different temperatures\n- model routing\n- task-specific settings\n- user-selected models",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Runtime overrides** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful for:",
          },
        ],
      },
      {
        title: "Dependency version management",
        slug: "dependency-version-management",
        description: "Use the Spring AI BOM to keep modules aligned. Avoid mixing arbitrary versions of Spring AI modules.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Use the Spring AI BOM to keep modules aligned.\n\nAvoid mixing arbitrary versions of Spring AI modules.\n\nWhen upgrading:\n\n- check migration notes\n- check renamed starters\n- check deprecated APIs\n- check provider changes\n- run integration tests",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Dependency version management** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Dependency version management** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Application architecture",
        slug: "application-architecture",
        description: "A production Spring AI application can use layers such as: Keep AI integration code separate from core business logic where practical.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A production Spring AI application can use layers such as:\n\n```text\nController\n    |\n    v\nAI Application Service\n    |\n    +---- ChatClient\n    |\n    +---- Advisors\n    |\n    +---- Tools\n    |\n    +---- VectorStore\n    |\n    +---- domain services\n    |\n    +---- databases\n```\nKeep AI integration code separate from core business logic where practical.",
          },
          {
            title: "Example",
            content: "```text\nController\n    |\n    v\nAI Application Service\n    |\n    +---- ChatClient\n    |\n    +---- Advisors\n    |\n    +---- Tools\n    |\n    +---- VectorStore\n    |\n    +---- domain services\n    |\n    +---- databases\n```",
          },
          {
            title: "Practical use",
            content: "Use **Application architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Model Provider Integrations",
    slug: "model-provider-integrations",
    description: "Learn Model Provider Integrations through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "OpenAI",
        slug: "openai",
        description: "OpenAI integration supports chat models and other AI capabilities. the Spring AI reference includes support for: - text - vision - audio - tool calling...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "OpenAI integration supports chat models and other AI capabilities.\n\nthe Spring AI reference includes support for:\n\n- text\n- vision\n- audio\n- tool calling\n- streaming\n- structured output capabilities\n\nOpenAI image generation is also supported.\n\nCredentials should be provided securely through configuration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **OpenAI** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **OpenAI** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Anthropic",
        slug: "anthropic",
        description: "Anthropic Claude models can be integrated through Spring AI. The current comparison documents multimodal input such as text, PDF and image for...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Anthropic Claude models can be integrated through Spring AI.\n\nThe current comparison documents multimodal input such as text, PDF and image\nfor supported Claude models, along with tool calling and streaming.\n\nAlways verify the exact model capability before relying on it.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Anthropic** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Anthropic** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Google GenAI",
        slug: "google-genai",
        description: "Google GenAI integration supports Gemini-family model capabilities. The documentation describes multimodal input including: - text - PDF - image -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Google GenAI integration supports Gemini-family model capabilities.\n\nThe documentation describes multimodal input including:\n\n- text\n- PDF\n- image\n- audio\n- video\n\nGoogle GenAI also has image-generation integration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Google GenAI** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Google GenAI** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Amazon Bedrock",
        slug: "amazon-bedrock",
        description: "Amazon Bedrock provides access to multiple foundation models through AWS. Spring AI provides Bedrock integrations, including Converse API support.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Amazon Bedrock provides access to multiple foundation models through AWS.\n\nSpring AI provides Bedrock integrations, including Converse API support.\n\nThis is useful for organizations already using AWS infrastructure, identity,\nnetworking, and governance.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Amazon Bedrock** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "This is useful for organizations already using AWS infrastructure, identity,\nnetworking, and governance.",
          },
        ],
      },
      {
        title: "Mistral AI",
        slug: "mistral-ai",
        description: "Spring AI provides Mistral integrations. The current comparison describes support for text/image/audio multimodality for supported models, tool...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI provides Mistral integrations.\n\nThe current comparison describes support for text/image/audio multimodality\nfor supported models, tool calling, streaming and OpenAI-compatible behavior\nwhere applicable.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Mistral AI** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Mistral AI** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Ollama",
        slug: "ollama",
        description: "Ollama enables local model execution. This can be valuable for: - development - privacy-sensitive workloads - offline environments - experimentation...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Ollama enables local model execution.\n\nThis can be valuable for:\n\n- development\n- privacy-sensitive workloads\n- offline environments\n- experimentation\nLocal execution does not automatically mean unlimited performance.\n\nHardware capacity still matters.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Ollama** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Ollama** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "DeepSeek",
        slug: "deepseek",
        description: "The current comparison includes DeepSeek through an OpenAI-compatible integration pattern. This makes it possible to use compatible request semantics...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The current comparison includes DeepSeek through an OpenAI-compatible integration\npattern.\n\nThis makes it possible to use compatible request semantics while retaining the\nSpring AI abstraction.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **DeepSeek** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **DeepSeek** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Groq",
        slug: "groq",
        description: "Groq is represented in the current comparison as an OpenAI-compatible provider. It can be useful when low-latency inference is a priority.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Groq is represented in the current comparison as an OpenAI-compatible provider.\n\nIt can be useful when low-latency inference is a priority.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Groq** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "It can be useful when low-latency inference is a priority.",
          },
        ],
      },
      {
        title: "NVIDIA",
        slug: "nvidia",
        description: "NVIDIA integration is represented through an OpenAI-compatible pattern for supported services/models.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "NVIDIA integration is represented through an OpenAI-compatible pattern for\nsupported services/models.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **NVIDIA** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **NVIDIA** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MiniMax",
        slug: "minimax",
        description: "The current Spring AI comparison includes MiniMax through an Anthropic-compatible integration pattern. Capability support should be checked against the...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "The current Spring AI comparison includes MiniMax through an\nAnthropic-compatible integration pattern.\n\nCapability support should be checked against the exact model.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **MiniMax** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **MiniMax** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "OpenAI-compatible providers",
        slug: "openai-compatible-providers",
        description: "Some providers expose APIs compatible with OpenAI request/response patterns. This can reduce integration effort.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Some providers expose APIs compatible with OpenAI request/response patterns.\n\nThis can reduce integration effort.\n\nHowever:\n\nAPI compatibility != identical model behavior\nAlways verify:\n\n- tool calling\n- streaming\n- JSON\n- multimodality\n- error semantics\n- model options",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **OpenAI-compatible providers** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **OpenAI-compatible providers** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Local model deployment",
        slug: "local-model-deployment",
        description: "Local deployment is useful when: - privacy is important - internet access is restricted - predictable infrastructure is required - experimentation is...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Local deployment is useful when:\n\n- privacy is important\n- internet access is restricted\n- predictable infrastructure is required\n- experimentation is needed\nOllama is one of the integrations listed for local deployment.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Local model deployment** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Local model deployment** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Image And Multimodal Applications",
    slug: "image-and-multimodal-applications",
    description: "Learn Image And Multimodal Applications through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Image generation architecture",
        slug: "image-generation-architecture",
        description: "Image generation has its own model abstraction. Conceptually:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Image generation has its own model abstraction.\n\nConceptually:\n\n```text\nImagePrompt\n   |\n   v\nImageModel\n   |\n   v\nImageResponse\n   |\n   v\nImageGeneration\n```",
          },
          {
            title: "Example",
            content: "```text\nImagePrompt\n   |\n   v\nImageModel\n   |\n   v\nImageResponse\n   |\n   v\nImageGeneration\n```",
          },
          {
            title: "Practical use",
            content: "Use **Image generation architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ImagePrompt",
        slug: "imageprompt",
        description: "ImagePrompt carries the image-generation request. It can include prompt text and image-specific options.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ImagePrompt carries the image-generation request.\n\nIt can include prompt text and image-specific options.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ImagePrompt** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ImagePrompt** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ImageResponse",
        slug: "imageresponse",
        description: "ImageResponse contains generated image results and response metadata. It may contain multiple ImageGeneration results.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ImageResponse contains generated image results and response metadata.\n\nIt may contain multiple ImageGeneration results.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ImageResponse** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ImageResponse** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "ImageGeneration",
        slug: "imagegeneration",
        description: "ImageGeneration represents an individual generated image plus related metadata.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "ImageGeneration represents an individual generated image plus related metadata.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **ImageGeneration** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **ImageGeneration** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "OpenAI image generation",
        slug: "openai-image-generation",
        description: "Spring AI supports OpenAI image generation. Configuration includes secure API-key management and the OpenAI image model starter.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI supports OpenAI image generation.\n\nConfiguration includes secure API-key management and the OpenAI image model\nstarter.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **OpenAI image generation** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **OpenAI image generation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Google GenAI image generation",
        slug: "google-genai-image-generation",
        description: "Google GenAI provides image generation capabilities through Gemini image models. Authentication can use Google AI developer credentials or Vertex AI...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Google GenAI provides image generation capabilities through Gemini image models.\n\nAuthentication can use Google AI developer credentials or Vertex AI depending\non the deployment approach.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Google GenAI image generation** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Google GenAI image generation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Stability AI image generation",
        slug: "stability-ai-image-generation",
        description: "Spring AI also provides an ImageModel implementation for Stability AI image generation.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Spring AI also provides an ImageModel implementation for Stability AI image\ngeneration.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Stability AI image generation** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Stability AI image generation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Multimodal messages",
        slug: "multimodal-messages",
        description: "A multimodal UserMessage can contain: - text - media Media can represent supported: - image - audio - video The exact capabilities depend on the model...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A multimodal UserMessage can contain:\n\n- text\n- media\n\nMedia can represent supported:\n\n- image\n- audio\n- video\n\nThe exact capabilities depend on the model provider.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Multimodal messages** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Multimodal messages** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Image input",
        slug: "image-input",
        description: "A typical image question: - text: - \"What is shown in this image?\" - media: - image.png The model can combine the text instruction with the image input.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A typical image question:\n\n- text:\n- \"What is shown in this image?\"\n- media:\n- image.png\nThe model can combine the text instruction with the image input.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Image input** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Image input** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Audio input",
        slug: "audio-input",
        description: "Supported multimodal models can accept audio where the provider exposes that capability. Audio may also be processed separately through transcription...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Supported multimodal models can accept audio where the provider exposes that\ncapability.\n\nAudio may also be processed separately through transcription models.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Audio input** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Audio input** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Video and document input",
        slug: "video-and-document-input",
        description: "Some modern multimodal providers support video and document-style inputs. Spring AI exposes media abstractions, but actual support depends on the model.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Some modern multimodal providers support video and document-style inputs.\n\nSpring AI exposes media abstractions, but actual support depends on the model.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Video and document input** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Video and document input** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Model capability differences",
        slug: "model-capability-differences",
        description: "Do not design an application around a modality without checking support. Example: - Model A: - text only - Model B: - text + image - Model C: - text +...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Do not design an application around a modality without checking support.\n\nExample:\n\n- Model A:\n- text only\n- Model B:\n- text + image\n- Model C:\n- text + image + audio + video\n\nPortable application architecture should account for these differences.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Model capability differences** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Model capability differences** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Practical Application Patterns",
    slug: "practical-application-patterns",
    description: "Learn Practical Application Patterns through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Simple chatbot",
        slug: "simple-chatbot",
        description: "A minimal chatbot can use: Example:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A minimal chatbot can use:\n\n```text\nController\n   |\n   v\nChatClient\n   |\n   v\nChatModel\n```\nExample:\n\n```java\n@GetMapping(\"/chat\")\nString chat(String message) {\n    return chatClient.prompt()\n        .user(message)\n        .call()\n        .content();\n}\n```",
          },
          {
            title: "Example",
            content: "```text\nController\n   |\n   v\nChatClient\n   |\n   v\nChatModel\n```",
          },
          {
            title: "Practical use",
            content: "Use **Simple chatbot** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Streaming chatbot",
        slug: "streaming-chatbot",
        description: "For a better user experience, use streaming. Flow:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "For a better user experience, use streaming.\n\nFlow:\n\n```text\nuser\n  |\n  v\nChatClient\n  |\n  v\nstream response\n  |\n  +--> partial content\n  +--> partial content\n  +--> partial content\n```",
          },
          {
            title: "Example",
            content: "```text\nuser\n  |\n  v\nChatClient\n  |\n  v\nstream response\n  |\n  +--> partial content\n  +--> partial content\n  +--> partial content\n```",
          },
          {
            title: "Practical use",
            content: "Use **Streaming chatbot** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Stateful chatbot",
        slug: "stateful-chatbot",
        description: "Add chat memory. Flow: Use a conversation ID to separate users/conversations.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Add chat memory.\n\nFlow:\n\n```text\nuser\n  |\n  v\nmemory retrieval\n  |\n  v\ncurrent question\n  |\n  v\nmodel\n  |\n  v\nsave conversation\n```\nUse a conversation ID to separate users/conversations.",
          },
          {
            title: "Example",
            content: "```text\nuser\n  |\n  v\nmemory retrieval\n  |\n  v\ncurrent question\n  |\n  v\nmodel\n  |\n  v\nsave conversation\n```",
          },
          {
            title: "Practical use",
            content: "Use **Stateful chatbot** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Documentation Q&A",
        slug: "documentation-q-and-a",
        description: "Use: This is one of the core RAG use cases described by Spring AI.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Use:\n\n```text\ndocuments\n   |\n   v\nETL\n   |\n   v\nVectorStore\n   |\n   v\nQuestionAnswerAdvisor\n   |\n   v\nChatClient\n   |\n   v\nanswer\n```\nThis is one of the core RAG use cases described by Spring AI.",
          },
          {
            title: "Example",
            content: "```text\ndocuments\n   |\n   v\nETL\n   |\n   v\nVectorStore\n   |\n   v\nQuestionAnswerAdvisor\n   |\n   v\nChatClient\n   |\n   v\nanswer\n```",
          },
          {
            title: "Practical use",
            content: "Use **Documentation Q&A** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Semantic search",
        slug: "semantic-search",
        description: "Semantic search does not require a generative answer. Flow: This can be useful for: - document search - product search - knowledge discovery",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Semantic search does not require a generative answer.\n\nFlow:\n\n```text\nuser query\n   |\n   v\nembedding\n   |\n   v\nvector similarity search\n   |\n   v\nranked documents\n```\nThis can be useful for:\n\n- document search\n- product search\n- knowledge discovery",
          },
          {
            title: "Example",
            content: "```text\nuser query\n   |\n   v\nembedding\n   |\n   v\nvector similarity search\n   |\n   v\nranked documents\n```",
          },
          {
            title: "Practical use",
            content: "```text\nuser query\n   |\n   v\nembedding\n   |\n   v\nvector similarity search\n   |\n   v\nranked documents\n```\nThis can be useful for:",
          },
        ],
      },
      {
        title: "Tool-enabled assistant",
        slug: "tool-enabled-assistant",
        description: "Example: - User: - \"What is the weather in Delhi?\" - Model: - calls getWeather(\"Delhi\") - Tool: - returns weather - Model: - creates final answer The...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Example:\n\n- User:\n- \"What is the weather in Delhi?\"\n- Model:\n- calls getWeather(\"Delhi\")\n- Tool:\n- returns weather\n- Model:\n- creates final answer\nThe tool is controlled by the application.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Tool-enabled assistant** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Tool-enabled assistant** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Database-aware assistant",
        slug: "database-aware-assistant",
        description: "A tool can call a business service. Example: The model should never be allowed to bypass normal authorization and data access controls.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A tool can call a business service.\n\nExample:\n\n```java\n@Tool\npublic Customer getCustomer(String id) {\n    return customerService.find(id);\n}\n```\nThe model should never be allowed to bypass normal authorization and data\naccess controls.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Database-aware assistant** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Database-aware assistant** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Multimodal assistant",
        slug: "multimodal-assistant",
        description: "A multimodal assistant can combine: - text question - + - image - + - model Example: \"Analyze this invoice image and identify the total.\" This requires...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A multimodal assistant can combine:\n\n- text question\n- +\n- image\n- +\n- model\n\nExample:\n\n\"Analyze this invoice image and identify the total.\"\nThis requires a model with the necessary vision capabilities.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Multimodal assistant** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Multimodal assistant** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "RAG application",
        slug: "rag-application",
        description: "A complete RAG application usually has: and: For large systems, ingestion and query processing may be separate services.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A complete RAG application usually has:\n\n```text\ningestion application\n    |\n    v\nvector database\n```\nand:\n\n```text\nquery application\n    |\n    v\nretrieval\n    |\n    v\nChatClient\n    |\n    v\nmodel\n```\nFor large systems, ingestion and query processing may be separate services.",
          },
          {
            title: "Example",
            content: "```text\ningestion application\n    |\n    v\nvector database\n```",
          },
          {
            title: "Practical use",
            content: "Use **RAG application** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "MCP-enabled application",
        slug: "mcp-enabled-application",
        description: "An application can connect to MCP servers and make their tools available to the AI model. Example:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "An application can connect to MCP servers and make their tools available to\nthe AI model.\n\nExample:\n\n```text\nSpring AI application\n      |\n      v\nMCP client\n      |\n      v\nWeather MCP server\n      |\n      v\nweather API\n```",
          },
          {
            title: "Example",
            content: "```text\nSpring AI application\n      |\n      v\nMCP client\n      |\n      v\nWeather MCP server\n      |\n      v\nweather API\n```",
          },
          {
            title: "Practical use",
            content: "Use **MCP-enabled application** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Observable AI service",
        slug: "observable-ai-service",
        description: "A production AI service should measure: - request count - latency - model - token usage - tool usage - errors - retrieval performance Tracing should...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A production AI service should measure:\n\n- request count\n- latency\n- model\n- token usage\n- tool usage\n- errors\n- retrieval performance\nTracing should connect the complete operation.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Observable AI service** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Observable AI service** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Production architecture",
        slug: "production-architecture",
        description: "A production system can look like:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A production system can look like:\n\n```text\nClient\n  |\n  v\nAPI Gateway\n  |\n  v\nSpring Boot AI service\n  |\n  +---- ChatClient\n  |\n  +---- Advisors\n  |       |\n  |       +---- Memory\n  |       +---- RAG\n  |       +---- Tool calling\n  |\n  +---- VectorStore\n  |\n  +---- Business tools\n  |\n  +---- Database\n  |\n  +---- External AI provider\n  |\n  +---- Observability\n  |\n  +---- Security\n```",
          },
          {
            title: "Example",
            content: "```text\nClient\n  |\n  v\nAPI Gateway\n  |\n  v\nSpring Boot AI service\n  |\n  +---- ChatClient\n  |\n  +---- Advisors\n  |       |\n  |       +---- Memory\n  |       +---- RAG\n  |       +---- Tool calling\n  |\n  +---- VectorStore\n  |\n  +---- Business tools\n  |\n  +---- Database\n  |\n  +---- External AI provider\n  |\n  +---- Observability\n  |\n  +---- Security\n```",
          },
          {
            title: "Practical use",
            content: "Use **Production architecture** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Common Mistakes And Design Guidance",
    slug: "common-mistakes-and-design-guidance",
    description: "Learn Common Mistakes And Design Guidance through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Choosing ChatModel vs ChatClient",
        slug: "choosing-chatmodel-vs-chatclient",
        description: "Use ChatClient when: - fluent application development is desired - advisors are needed - tools are needed - memory is needed - application code should...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Use ChatClient when:\n\n- fluent application development is desired\n- advisors are needed\n- tools are needed\n- memory is needed\n- application code should be concise\nUse ChatModel directly when:\n\n- lower-level control is needed\n- implementing custom infrastructure\n- integrating with specialized model logic\nFor most normal Spring application code, ChatClient is the more convenient\nhigh-level abstraction.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Choosing ChatModel vs ChatClient** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Choosing ChatModel vs ChatClient** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Confusing embeddings with chat generation",
        slug: "confusing-embeddings-with-chat-generation",
        description: "Wrong mental model: embedding model = generates human answer Correct: - embedding model = creates vectors - chat model = generates conversational content",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Wrong mental model:\n\nembedding model = generates human answer\nCorrect:\n\n- embedding model = creates vectors\n- chat model = generates conversational content",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Confusing embeddings with chat generation** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Confusing embeddings with chat generation** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Sending too much context",
        slug: "sending-too-much-context",
        description: "More context is not automatically better. Too much context can cause: - high cost - high latency - context overflow - irrelevant information - reduced...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "More context is not automatically better.\n\nToo much context can cause:\n\n- high cost\n- high latency\n- context overflow\n- irrelevant information\n- reduced answer quality\nRetrieve only what is useful.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Sending too much context** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Sending too much context** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Poor document chunking",
        slug: "poor-document-chunking",
        description: "Bad chunking can destroy meaning. Examples: - split in middle of method - split table rows - split heading from explanation - split code blocks...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Bad chunking can destroy meaning.\n\nExamples:\n\n- split in middle of method\n- split table rows\n- split heading from explanation\n- split code blocks\n\nPreserve semantic boundaries.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Poor document chunking** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Poor document chunking** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Weak metadata",
        slug: "weak-metadata",
        description: "Without metadata, it becomes harder to: - filter - identify sources - enforce tenants - debug retrieval Add useful metadata during ingestion.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Without metadata, it becomes harder to:\n\n- filter\n- identify sources\n- enforce tenants\n- debug retrieval\n\nAdd useful metadata during ingestion.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Weak metadata** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Weak metadata** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Missing tool descriptions",
        slug: "missing-tool-descriptions",
        description: "A tool description tells the model: - what the tool does - when to use it Weak: Better:",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "A tool description tells the model:\n\n- what the tool does\n- when to use it\nWeak:\n\n```java\n@Tool\npublic String getData(...) ...\n```\nBetter:\n\n```java\n@Tool(description =\n    \"Retrieve the current order status for a customer order ID\")\n```",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Missing tool descriptions** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Missing tool descriptions** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Unsafe tools",
        slug: "unsafe-tools",
        description: "Never expose powerful destructive operations without authorization. AI tool request: \"delete all users\" must still pass through: - authentication -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Never expose powerful destructive operations without authorization.\n\nAI tool request:\n\n\"delete all users\"\nmust still pass through:\n\n- authentication\n- authorization\n- validation\n- business rules",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Unsafe tools** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Unsafe tools** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Logging sensitive prompts",
        slug: "logging-sensitive-prompts",
        description: "Prompt logs may contain private information. Before enabling prompt/completion logging: - classify data - redact secrets - restrict access - define...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Prompt logs may contain private information.\n\nBefore enabling prompt/completion logging:\n\n- classify data\n- redact secrets\n- restrict access\n- define retention\n- monitor exposure",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Logging sensitive prompts** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Logging sensitive prompts** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Ignoring token usage",
        slug: "ignoring-token-usage",
        description: "Track: - input tokens - output tokens - total tokens Use metrics to identify expensive requests.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Track:\n\n- input tokens\n- output tokens\n- total tokens\nUse metrics to identify expensive requests.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Ignoring token usage** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Ignoring token usage** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Ignoring model capability differences",
        slug: "ignoring-model-capability-differences",
        description: "Do not assume: - every model supports images - every model supports tools - every model supports streaming - every model supports JSON - every model...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Do not assume:\n\n- every model supports images\n- every model supports tools\n- every model supports streaming\n- every model supports JSON\n- every model supports local deployment\nUse the model comparison information when designing provider-neutral systems.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Ignoring model capability differences** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Ignoring model capability differences** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Treating generated JSON as guaranteed JSON",
        slug: "treating-generated-json-as-guaranteed-json",
        description: "\"Return JSON\" does not make the model output a trusted Java object. Use structured output mechanisms and validation.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "\"Return JSON\" does not make the model output a trusted Java object.\n\nUse structured output mechanisms and validation.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Treating generated JSON as guaranteed JSON** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Treating generated JSON as guaranteed JSON** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Forgetting conversation identifiers",
        slug: "forgetting-conversation-identifiers",
        description: "Memory-based applications need a stable conversation identifier. Otherwise messages from different conversations can be mixed or the required memory...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Memory-based applications need a stable conversation identifier.\n\nOtherwise messages from different conversations can be mixed or the required\nmemory cannot be located.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Forgetting conversation identifiers** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Forgetting conversation identifiers** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Poor RAG retrieval",
        slug: "poor-rag-retrieval",
        description: "If the correct chunk is not retrieved: - good model + wrong context - = - potentially wrong answer Improve: - chunking - embeddings - metadata -...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "If the correct chunk is not retrieved:\n\n- good model + wrong context\n- =\n- potentially wrong answer\nImprove:\n\n- chunking\n- embeddings\n- metadata\n- filters\n- top-K\n- threshold\n- retrieval strategy",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Poor RAG retrieval** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Poor RAG retrieval** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Overusing default tools",
        slug: "overusing-default-tools",
        description: "Default tools are available across requests. Do not make sensitive operations globally available when they only apply to one workflow.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Default tools are available across requests.\n\nDo not make sensitive operations globally available when they only apply to\none workflow.\n\nPrefer per-request registration for risky tools.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Overusing default tools** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Overusing default tools** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Mixing blocking and streaming incorrectly",
        slug: "mixing-blocking-and-streaming-incorrectly",
        description: "Streaming and imperative operations have different execution behavior. Choose one programming style for the relevant path and understand how advisors,...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Streaming and imperative operations have different execution behavior.\n\nChoose one programming style for the relevant path and understand how advisors,\nobservability, and provider SDKs behave around asynchronous boundaries.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Mixing blocking and streaming incorrectly** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Mixing blocking and streaming incorrectly** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
  {
    title: "Interview And Revision",
    slug: "interview-and-revision",
    description: "Learn Interview And Revision through clear explanations, practical examples, and application-focused guidance.",
    topics: [
      {
        title: "Spring AI interview concepts",
        slug: "spring-ai-interview-concepts",
        description: "Q: What is Spring AI? A: Spring AI is a Spring ecosystem project that provides abstractions and integrations for building AI applications with models,...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "Q: What is Spring AI?\n\nA:\nSpring AI is a Spring ecosystem project that provides abstractions and\nintegrations for building AI applications with models, vector stores, tools,\nRAG, memory, observability and related capabilities.\n\nQ: What is ChatClient?\n\nA:\nA fluent higher-level API for interacting with chat models.\n\nQ: ChatClient vs ChatModel?\n\nA:\nChatModel is a lower-level model abstraction. ChatClient provides a more\nconvenient application-level fluent API and integrates naturally with advisors,\ntools and memory.\n\nQ: What is an embedding?\n\nA:\nA numerical vector representation used to capture semantic relationships.\n\nQ: Why is a vector database used in RAG?\n\nA:\nIt allows similarity-based retrieval of relevant document chunks.\n\nQ: What is RAG?\n\nA:\nRetrieval Augmented Generation retrieves relevant external information and\nadds it to the model context before generation.\n\nQ: What is tool calling?\n\nA:\nA mechanism where a model requests application-defined functions and the\napplication executes them and returns the results.\n\nQ: Does the model directly execute a Java method?\n\nA:\nNo. The application owns tool execution. The model requests a tool call and\nthe application executes the corresponding tool.\n\nQ: What is an Advisor?\n\nA:\nA reusable component that can inspect, transform or augment AI requests and\nresponses.\n\nQ: What is MCP?\n\nA:\nA standardized protocol for connecting AI applications with external tools,\nresources and prompts.\n\nQ: Why is chunking important in RAG?\n\nA:\nBecause retrieval operates on stored document pieces. Poor chunks can lose\nmeaning or return irrelevant context.",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Spring AI interview concepts** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Spring AI interview concepts** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Important comparisons",
        slug: "important-comparisons",
        description: "CHATMODEL vs CHATCLIENT ChatModel: - lower-level - direct model interaction - more control ChatClient: - fluent API - higher-level application...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "CHATMODEL vs CHATCLIENT\n\nChatModel:\n- lower-level\n- direct model interaction\n- more control\nChatClient:\n- fluent API\n- higher-level application abstraction\n- easy advisor/tool/memory integration\nCHAT MODEL vs EMBEDDING MODEL\n\nChat:\ngenerates responses\nEmbedding:\ngenerates vectors\nRAG vs FINE-TUNING\n\nRAG:\nretrieves external/current information at request time\nFine-tuning:\nchanges model behavior/weights through additional training\nVECTOR DATABASE vs RELATIONAL DATABASE\n\nVector database:\nsimilarity-oriented retrieval\nRelational database:\nstructured transactional/query-oriented storage\nTOOL CALLING vs RAG\n\nRAG:\nretrieves information\nTool calling:\nexecutes application operations or retrieves dynamic data\nMEMORY vs RAG\n\nMemory:\npreserves conversation context\nRAG:\nretrieves external knowledge\nMCP vs TOOL CALLBACK\n\nToolCallback:\nSpring AI's application-level tool execution abstraction\nMCP:\n- standardized protocol for exposing/consuming tools and resources across\n- application boundaries",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Important comparisons** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Important comparisons** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "End-to-end request flows",
        slug: "end-to-end-request-flows",
        description: "**Chat + Memory** **Chat + Rag** **Chat + Tool** **Chat + Memory + Rag + Tools**",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "**Simple Chat**\n\n```text\nHTTP request\n   |\n   v\nController\n   |\n   v\nChatClient\n   |\n   v\nChatModel\n   |\n   v\nresponse\n```\n\n**Chat + Memory**\n\n```text\nHTTP request\n   |\n   v\nChatClient\n   |\n   v\nMemory Advisor\n   |\n   v\nChatModel\n   |\n   v\nsave memory\n   |\n   v\nresponse\n```\n\n**Chat + Rag**\n\n```text\nHTTP request\n   |\n   v\nChatClient\n   |\n   v\nQuestionAnswerAdvisor\n   |\n   v\nVectorStore\n   |\n   v\nrelevant documents\n   |\n   v\nChatModel\n   |\n   v\nanswer\n```\n\n**Chat + Tool**\n\n```text\nHTTP request\n   |\n   v\nChatClient\n   |\n   v\nChatModel\n   |\n   v\nToolCallingAdvisor\n   |\n   v\nTool\n   |\n   v\nTool result\n   |\n   v\nChatModel\n   |\n   v\nanswer\n```\n\n**Chat + Memory + Rag + Tools**\n\n```text\nUser\n  |\n  v\nChatClient\n  |\n  +--> Memory\n  |\n  +--> RAG\n  |\n  +--> Tool calling\n  |\n  v\nChatModel\n  |\n  v\nanswer\n```",
          },
          {
            title: "Example",
            content: "```text\nHTTP request\n   |\n   v\nController\n   |\n   v\nChatClient\n   |\n   v\nChatModel\n   |\n   v\nresponse\n```",
          },
          {
            title: "Practical use",
            content: "Use **End-to-end request flows** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Production checklist",
        slug: "production-checklist",
        description: "MODEL - [ ] Correct model selected - [ ] Capability compatibility verified - [ ] Timeout configured - [ ] Retry strategy considered - [ ] Cost...",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "MODEL\n\n- [ ] Correct model selected\n- [ ] Capability compatibility verified\n- [ ] Timeout configured\n- [ ] Retry strategy considered\n- [ ] Cost monitored\nSECURITY\n\n```java\n[ ] API keys stored securely\n[ ] Tool authorization implemented\n[ ] Sensitive prompts protected\n[ ] Prompt logs reviewed\n[ ] MCP endpoints secured\n[ ] Tenant isolation enforced\n```\nRAG\n\n- [ ] Document sources identified\n- [ ] Chunking strategy tested\n- [ ] Metadata defined\n- [ ] Embedding model selected\n- [ ] Vector store selected\n- [ ] Retrieval quality measured\n- [ ] Stale documents handled\nTOOLS\n\n```java\n[ ] Descriptions are clear\n[ ] Arguments validated\n[ ] Authorization checked\n[ ] Dangerous actions protected\n[ ] Tool latency measured\n```\nOBSERVABILITY\n\n- [ ] Metrics enabled\n- [ ] Tracing enabled\n- [ ] Token usage monitored\n- [ ] Errors monitored\n- [ ] Model latency monitored\n- [ ] Tool execution monitored\nOUTPUT\n\n- [ ] Structured output validated\n- [ ] Conversion errors handled\n- [ ] Model failures handled\n- [ ] Fallback behavior defined",
          },
          {
            title: "Example",
            content: "A Spring AI application can apply **Production checklist** where the workflow needs the capability described in this topic.",
          },
          {
            title: "Practical use",
            content: "Use **Production checklist** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
      {
        title: "Quick revision checklist",
        slug: "quick-revision-checklist",
        description: "- [ ] What is Spring AI? - [ ] Why use abstractions?",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Detailed explanation",
            content: "**Spring Ai Basics**\n\n- [ ] What is Spring AI?\n- [ ] Why use abstractions?\n- [ ] What is provider portability?\n- [ ] What does Spring Boot auto-configuration do?\n\n**Ai Concepts**\n\n- [ ] Model\n- [ ] Prompt\n- [ ] Message\n- [ ] Token\n- [ ] Context window\n- [ ] Embedding\n- [ ] Structured output\n- [ ] RAG\n- [ ] Tool calling\n- [ ] Evaluation\n\n**Core Apis**\n\n```java\n[ ] ChatModel\n[ ] StreamingChatModel\n[ ] ChatClient\n[ ] EmbeddingModel\n[ ] ImageModel\n[ ] Audio models\n[ ] VectorStore\n```\nCHATCLIENT\n\n- [ ] prompt()\n- [ ] user()\n- [ ] system()\n- [ ] call()\n- [ ] stream()\n- [ ] content()\n- [ ] advisors()\n- [ ] tools()\n- [ ] defaultTools()\n- [ ] memory\n\nADVISORS\n\n- [ ] Advisor chain\n- [ ] Ordering\n- [ ] Memory advisor\n- [ ] QuestionAnswerAdvisor\n- [ ] RetrievalAugmentationAdvisor\n- [ ] ReReadingAdvisor\n- [ ] ToolCallingAdvisor\n- [ ] Custom advisor\n\nRAG\n\n```java\n[ ] Document\n[ ] Reader\n[ ] Transformer\n[ ] Writer\n[ ] Chunking\n[ ] Embedding\n[ ] VectorStore\n[ ] Similarity search\n[ ] Metadata filter\n[ ] Context assembly\n```\nTOOLS\n\n```java\n[ ] @Tool\n[ ] @ToolParam\n[ ] MethodToolCallback\n[ ] FunctionToolCallback\n[ ] ToolCallback\n[ ] ToolCallingAdvisor\n[ ] Security validation\n```\nMCP\n\n- [ ] Client\n- [ ] Server\n- [ ] Tools\n- [ ] Resources\n- [ ] Prompts\n- [ ] STDIO\n- [ ] SSE\n- [ ] Streamable HTTP\n- [ ] Annotations\n- [ ] Boot starters\n- [ ] Security\n\nOBSERVABILITY\n\n- [ ] Metrics\n- [ ] Tracing\n- [ ] Token usage\n- [ ] Tool observations\n- [ ] Prompt logging\n- [ ] Sensitive data\nPRODUCTION\n\n- [ ] Security\n- [ ] Cost\n- [ ] Latency\n- [ ] Reliability\n- [ ] Retrieval quality\n- [ ] Model capability\n- [ ] Monitoring\n- [ ] Evaluation\n\n**Final Mental Model**\n\nThe easiest way to understand Spring AI is to see it as a collection of layers.\n\n**Layer 1 — Model**\n\n- Chat\n- Embedding\n- Image\n- Audio\n\n**Layer 2 — Application Api**\n\n```java\nChatClient\nPrompt\nMessage\nOptions\nResponse\n```\n\n**Layer 3 — Context**\n\n```java\nMemory\nRAG\nVectorStore\nAdvisors\n```\n\n**Layer 4 — Actions**\n\n- Tools\n- Tool calling\n- MCP\n\n**Layer 5 — Data Engineering**\n\n- DocumentReader\n- DocumentTransformer\n- DocumentWriter\n- ETL\n- Chunking\n- Embeddings\n- Vector storage\n\n**Layer 6 — Operations**\n\n- Observability\n- Metrics\n- Tracing\n- Evaluation\n- Security\n\nThe complete picture is:\n\n```text\nUSER\n  |\n  v\nSPRING BOOT APPLICATION\n  |\n  v\nCHATCLIENT\n  |\n  +-------------------+\n  |                   |\n  v                   v\nADVISORS            TOOLS\n  |                   |\n  +----+--------------+\n       |\n       v\n    CONTEXT\n    /     \\\n MEMORY    RAG\n            |\n            v\n       VECTOR STORE\n            |\n            v\n      RETRIEVED DATA\n            |\n            v\n       CHAT MODEL\n            |\n            v\n         ANSWER\n```\nAnd when the model needs to perform an action:\n\n```text\nCHAT MODEL\n    |\n    v\nTOOL CALL\n    |\n    v\nAPPLICATION\n    |\n    v\nEXTERNAL API / DATABASE / SERVICE\n    |\n    v\nTOOL RESULT\n    |\n    v\nCHAT MODEL\n    |\n    v\nFINAL ANSWER\n```\nThe central engineering principle is:\n\n- The model generates intelligence,\n- the application controls the system,\n- retrieval supplies knowledge,\n- tools provide actions,\n- memory supplies conversation context,\n- and observability/evaluation make the system measurable and safer.\n\n**Source Basis**\n\nPrimary source:\nOfficial Spring AI Reference Documentation\n\nStable documentation version used for this guide:\nSpring AI 2.0.1\n\nReference:\nhttps://docs.spring.io/spring-ai/reference/\n\nThis topic is an original explanatory study guide. It does not reproduce\nthe reference documentation verbatim. Provider-specific pages and configuration\ndetails can change between Spring AI releases, so always verify exact\ndependency names, properties, and model capabilities against the current\nofficial reference before using them in production.",
          },
          {
            title: "Example",
            content: "```text\nUSER\n  |\n  v\nSPRING BOOT APPLICATION\n  |\n  v\nCHATCLIENT\n  |\n  +-------------------+\n  |                   |\n  v                   v\nADVISORS            TOOLS\n  |                   |\n  +----+--------------+\n       |\n       v\n    CONTEXT\n    /     \\\n MEMORY    RAG\n            |\n            v\n       VECTOR STORE\n            |\n            v\n      RETRIEVED DATA\n            |\n            v\n       CHAT MODEL\n            |\n            v\n         ANSWER\n```",
          },
          {
            title: "Practical use",
            content: "Use **Quick revision checklist** when the application needs the capability explained here, while keeping configuration and provider-specific behavior isolated where appropriate.",
          },
        ],
      },
    ],
  },
];

const springAiCategory: CategorySeed = {
  name: "Spring AI",
  slug: "spring-ai",
  description: "A structured Spring AI learning path covering model APIs, ChatClient, RAG, tools, vector stores, MCP, multimodality, observability, and production design.",
  icon: "AI",
  sortOrder: 0,
  paths: [
    {
      name: "Spring AI",
      slug: "spring-ai",
      description: "Learn Spring AI from foundations through production-oriented application patterns.",
      level: StudyLevel.INTERMEDIATE,
      modules,
    },
  ],
};

async function ensureCategory(categorySeed: CategorySeed) {
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

  for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
    const pathSeed = categorySeed.paths[pathIndex];
    const path = await prisma.studyPath.upsert({
      where: { categoryId_level: { categoryId: category.id, level: pathSeed.level } },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: pathIndex,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: pathIndex,
      },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex += 1) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
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

      for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex += 1) {
        const topicSeed = moduleSeed.topics[topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
          update: {
            title: topicSeed.title,
            moduleId: studyModule.id,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
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

        for (let sectionIndex = 0; sectionIndex < topicSeed.sections.length; sectionIndex += 1) {
          const section = topicSeed.sections[sectionIndex];
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
        }
      }
    }
  }

  return category;
}

async function main() {
  const category = await ensureCategory(springAiCategory);
  const pathCount = springAiCategory.paths.length;
  const moduleCount = modules.length;
  const topicCount = modules.reduce((total, module) => total + module.topics.length, 0);
  const sectionCount = modules.reduce((total, module) => total + module.topics.reduce((moduleTotal, topic) => moduleTotal + topic.sections.length, 0), 0);
  console.log(`Seeded ${category.name}`);
  console.log(`Paths: ${pathCount}, modules: ${moduleCount}, topics: ${topicCount}, sections: ${sectionCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
