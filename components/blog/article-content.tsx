import ReactMarkdown from "react-markdown";

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-ink max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:leading-8 prose-li:leading-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}