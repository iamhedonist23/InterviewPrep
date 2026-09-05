type TopicLike = {
  title: string;
  description?: string;
  shortDescription?: string;
};

export function ultraExplanationSection(topic: TopicLike, moduleTitle: string, pathName: string) {
  const description = topic.description ?? topic.shortDescription ?? "the core ideas and practical techniques in this topic";
  const lowerTitle = topic.title.toLowerCase();
  let focus = `Understand ${topic.title} by starting with the problem it solves: ${description} Explain its guarantees, its lifecycle or execution model, and the trade-offs behind its design.`;

  if (/(collection|list|set|map|sort|algorithm)/.test(lowerTitle)) {
    focus += " Compare time complexity, memory use, ordering, uniqueness, mutation, and thread-safety requirements before choosing an implementation.";
  } else if (/(exception|error|validation|testing|debug)/.test(lowerTitle)) {
    focus += " Distinguish expected failures from programming defects, preserve useful context, and place recovery at the boundary that can actually handle the failure.";
  } else if (/(thread|concurr|async|parallel|synchron|memory model)/.test(lowerTitle)) {
    focus += " Analyze ownership, shared state, atomicity, visibility, ordering, cancellation, and every possible interleaving rather than testing only the happy path.";
  } else if (/(database|sql|jdbc|api|http|server|network|security)/.test(lowerTitle)) {
    focus += " Include resource ownership, validation, authorization, failure handling, observability, and performance because production behaviour extends beyond the basic example.";
  }

  return {
    title: "Ultra Explanation and Interview Guide",
    content: `## Core mental model\n\n${focus}\n\n### Learn it deeply\n1. Define the concept in one clear sentence.\n2. Build the smallest working example.\n3. Trace what happens step by step at runtime.\n4. Test a boundary case, failure case, and incorrect use.\n5. Compare the closest alternative and explain the trade-off.\n\n### Interview-ready explanation\n- State when this topic is useful and when it is unnecessary.\n- Explain the important API, lifecycle, algorithm, or runtime behaviour.\n- Discuss performance, memory, safety, and maintainability implications.\n- Show a short example and explain the meaningful lines.\n- Name a common mistake and the test or design rule that prevents it.\n\n### Practical exercise\nCreate a small example for **${topic.title}** in the **${moduleTitle}** module of the **${pathName}** path. Include a normal case, an edge case, and a deliberately incorrect version. Record the result, explain why it happened, and describe the production-quality improvement.`,
  };
}
