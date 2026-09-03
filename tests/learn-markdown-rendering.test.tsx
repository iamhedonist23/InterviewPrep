import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LearnMarkdown } from "@/components/learn/learn-markdown";

describe("LearnMarkdown", () => {
  it("uses a light code block style instead of a high-contrast dark block", () => {
    const html = renderToStaticMarkup(
      <LearnMarkdown>{"```java\n@SpringBootApplication\npublic class MyApp {}\n```"}</LearnMarkdown>,
    );

    expect(html).toContain("bg-ink/5");
    expect(html).toContain("rounded-xl");
    expect(html).not.toContain("prose-pre:text-paper");
    expect(html).not.toContain("bg-ink p-4 text-paper");
    expect(html).toContain("text-ink");
  });
});
