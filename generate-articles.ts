// generate-articles.ts
import * as fs from 'fs';

// ==================== CONFIGURATION ====================

// ---- General topics (for non‑technical / soft‑skill articles) ----
const generalTopics = [
  { key: 'interview-preparation', label: 'interview preparation' },
  { key: 'soft-skills', label: 'soft skills' },
  { key: 'career-growth', label: 'career growth' },
  { key: 'resume-writing', label: 'resume writing' },
  { key: 'networking', label: 'professional networking' },
  { key: 'remote-work', label: 'remote work' },
  { key: 'job-offer-negotiation', label: 'job offer negotiation' },
  { key: 'time-management', label: 'time management' },
  { key: 'emotional-intelligence', label: 'emotional intelligence' },
  { key: 'conflict-resolution', label: 'conflict resolution' },
  { key: 'public-speaking', label: 'public speaking' },
  { key: 'personal-branding', label: 'personal branding' },
  { key: 'mentoring', label: 'mentoring' },
  { key: 'continuous-learning', label: 'continuous learning' },
];

// ---- Technology topics (specific languages/frameworks/tools) ----
const techTopics = [
  { key: 'java', label: 'Java' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'react', label: 'React' },
  { key: 'angular', label: 'Angular' },
  { key: 'vue', label: 'Vue.js' },
  { key: 'nodejs', label: 'Node.js' },
  { key: 'spring-boot', label: 'Spring Boot' },
  { key: 'kotlin', label: 'Kotlin' },
  { key: 'android', label: 'Android Development' },
  { key: 'ios', label: 'iOS Development' },
  { key: 'swift', label: 'Swift' },
  { key: 'docker', label: 'Docker' },
  { key: 'kubernetes', label: 'Kubernetes' },
  { key: 'aws', label: 'AWS' },
  { key: 'azure', label: 'Azure' },
  { key: 'gcp', label: 'Google Cloud Platform' },
  { key: 'devops', label: 'DevOps' },
  { key: 'cicd', label: 'CI/CD' },
  { key: 'microservices', label: 'Microservices' },
  { key: 'system-design', label: 'System Design' },
  { key: 'data-structures', label: 'Data Structures' },
  { key: 'algorithms', label: 'Algorithms' },
  { key: 'sql', label: 'SQL' },
  { key: 'nosql', label: 'NoSQL' },
  { key: 'mongodb', label: 'MongoDB' },
  { key: 'postgresql', label: 'PostgreSQL' },
  { key: 'graphql', label: 'GraphQL' },
  { key: 'rest-api', label: 'REST API' },
  { key: 'security', label: 'Cybersecurity' },
  { key: 'ai', label: 'Artificial Intelligence' },
  { key: 'ml', label: 'Machine Learning' },
  { key: 'data-science', label: 'Data Science' },
  { key: 'blockchain', label: 'Blockchain' },
  { key: 'git', label: 'Git' },
  { key: 'linux', label: 'Linux' },
  { key: 'networking', label: 'Networking' },
  { key: 'cloud-native', label: 'Cloud Native' },
  { key: 'serverless', label: 'Serverless' },
  { key: 'testing', label: 'Software Testing' },
  { key: 'qa', label: 'QA Automation' },
  { key: 'agile', label: 'Agile' },
  { key: 'scrum', label: 'Scrum' },
  { key: 'leadership', label: 'Leadership' },
];

// ---- Template types (each produces a distinct article structure) ----
const generalTemplates = [
  {
    title: 'Mastering {topic}: essential strategies for success',
    slug: 'mastering-{topic}-strategies',
    excerpt: 'Learn practical strategies to master {topic} and advance your career.',
    seoTitle: 'Mastering {topic}: Essential Strategies for Success',
    seoDescription: 'Discover proven strategies to improve your {topic} skills and achieve your career goals.',
    content: `Mastering {topic} is a journey that requires intention and practice. In this guide, we cover the key areas you should focus on.

1. **Understand the fundamentals** – Build a strong foundation before diving into advanced techniques.

2. **Learn from experts** – Follow thought leaders, read books, and attend workshops.

3. **Practice consistently** – Dedicate time each day or week to improve your {topic} skills.

4. **Seek feedback** – Ask for constructive criticism from peers and mentors.

5. **Reflect and adjust** – Regularly review your progress and adjust your approach.

6. **Teach others** – Sharing your knowledge reinforces your own understanding.

7. **Stay current** – Keep up with new trends and tools in the {topic} space.

8. **Network** – Connect with others who share your interest in {topic}.

9. **Set measurable goals** – Define what success looks like and track your progress.

10. **Celebrate small wins** – Recognise your achievements along the way.

By following these strategies, you'll build confidence and competence in {topic}, opening new opportunities in your career.`
  },
  {
    title: 'How to answer common {topic} interview questions',
    slug: 'answer-{topic}-interview-questions',
    excerpt: 'Prepare yourself to confidently answer the most frequent {topic} interview questions.',
    seoTitle: 'How to Answer Common {topic} Interview Questions',
    seoDescription: 'Learn how to respond to the most common {topic} interview questions with clarity and confidence.',
    content: `Interviewers often ask questions about {topic} to assess your experience and mindset. Here’s how to answer them effectively.

**Question 1: "Tell me about yourself and your experience with {topic}."** – Focus on the aspects of {topic} that are most relevant to the role.

**Question 2: "Why are you interested in {topic}?"** – Connect your personal motivation to the value it brings to the team.

**Question 3: "Give an example of a time you used {topic} to solve a problem."** – Use the STAR method (Situation, Task, Action, Result) to structure your story.

**Question 4: "How do you stay updated on {topic}?"** – Mention specific resources (blogs, podcasts, courses) and your learning routine.

**Question 5: "What do you find most challenging about {topic}?"** – Be honest, but also explain how you overcome that challenge.

**Question 6: "How have you helped others learn {topic}?"** – Share examples of mentoring, pair programming, or creating documentation.

**Question 7: "Where do you see yourself in five years with respect to {topic}?"** – Show ambition and a clear growth path.

**Question 8: "What is your favourite tool or resource for {topic}?"** – Demonstrate your enthusiasm and practical knowledge.

**Question 9: "How would you handle a disagreement about {topic} with a colleague?"** – Emphasise collaboration and evidence‑based discussion.

**Question 10: "What is one thing you wish you had known earlier about {topic}?"** – Show reflection and a growth mindset.

Practise these answers aloud to build confidence and refine your delivery.`
  },
  {
    title: 'Top 10 {topic} tips for career advancement',
    slug: 'top-10-{topic}-tips-career',
    excerpt: 'Accelerate your career with these practical tips for excelling in {topic}.',
    seoTitle: 'Top 10 {topic} Tips for Career Advancement',
    seoDescription: 'Discover actionable tips to advance your career by mastering {topic} and demonstrating value.',
    content: `Want to get ahead in your career? Focus on these ten areas related to {topic}.

1. **Deepen your expertise** – Become the go‑to person for {topic} on your team.

2. **Communicate impact** – Show how your work in {topic} benefits the business.

3. **Build relationships** – Connect with stakeholders across departments.

4. **Share knowledge** – Write documentation, give talks, or mentor others.

5. **Seek stretch assignments** – Volunteer for projects that require new {topic} skills.

6. **Stay curious** – Continuously explore new sub‑fields within {topic}.

7. **Cultivate a growth mindset** – Embrace challenges and learn from setbacks.

8. **Develop complementary skills** – Combine {topic} with adjacent areas (e.g., leadership, data analysis).

9. **Build your personal brand** – Write articles, speak at events, or contribute to open source.

10. **Align with company goals** – Ensure your {topic} efforts directly support your organisation’s priorities.

By applying these tips, you’ll not only improve your {topic} abilities but also increase your visibility and value.`
  },
];

const techTemplates = [
  // The same 5 templates we had before (for technology topics)
  {
    title: '10 essential {topic} interview questions you must prepare',
    slug: '{topic}-interview-questions',
    excerpt: 'Prepare for your {topic} interview by mastering these 10 essential concepts and questions.',
    seoTitle: '10 Essential {topic} Interview Questions You Must Prepare',
    seoDescription: 'Master the top 10 {topic} interview questions with detailed explanations and examples.',
    content: `A {topic} interview can be challenging, but knowing the right questions to expect gives you a huge advantage. In this article, we cover the 10 most frequently asked {topic} questions, along with tips on how to answer them effectively.

1. **Question 1** – Explain the core concepts of {topic} and why they matter.
2. **Question 2** – How do you handle common {topic} pitfalls?
3. **Question 3** – Discuss the architecture and design principles behind {topic}.
4. **Question 4** – What are the best practices for {topic} development?
5. **Question 5** – How do you optimise performance in {topic} applications?
6. **Question 6** – What are the security considerations for {topic}?
7. **Question 7** – How do you test and debug {topic} code effectively?
8. **Question 8** – Explain the tooling and ecosystem around {topic}.
9. **Question 9** – How do you scale {topic} applications?
10. **Question 10** – What are the common mistakes to avoid in {topic}?

Each question is accompanied by a clear, structured answer that demonstrates your depth of knowledge. Practise these thoroughly to ace your next interview.`
  },
  {
    title: 'How to prepare for a {topic} interview: a step-by-step guide',
    slug: 'prepare-{topic}-interview',
    excerpt: 'Follow this comprehensive guide to prepare for your {topic} interview, from fundamentals to advanced topics.',
    seoTitle: 'How to Prepare for a {topic} Interview: A Step-by-Step Guide',
    seoDescription: 'Learn how to prepare for a {topic} interview with a structured plan covering key topics, practice strategies, and common questions.',
    content: `Preparing for a {topic} interview requires a structured approach. Here’s a step-by-step plan to help you succeed.

**Step 1: Understand the role** – Analyse the job description to identify the specific {topic} skills required.

**Step 2: Review the fundamentals** – Revisit the core concepts of {topic}, such as syntax, data structures, and common APIs.

**Step 3: Practice coding challenges** – Use platforms like LeetCode or HackerRank to sharpen your problem-solving skills in {topic}.

**Step 4: Deep-dive into advanced topics** – Study advanced {topic} features, such as concurrency, memory management, or framework internals.

**Step 5: Prepare for behavioural questions** – Be ready to discuss your experience with {topic}, including projects, challenges, and team collaboration.

**Step 6: Mock interviews** – Simulate real interview conditions with a friend or using online services.

**Step 7: Review common interview questions** – Go through a list of frequently asked {topic} questions and practise your answers.

**Step 8: Stay calm and confident** – On the day of the interview, take your time, think aloud, and show your enthusiasm for {topic}.

By following this guide, you’ll be well-prepared to impress your interviewers and land the job.`
  },
  {
    title: 'Common {topic} mistakes to avoid in interviews',
    slug: '{topic}-mistakes-avoid',
    excerpt: 'Learn from the most common {topic} mistakes candidates make and how to avoid them in your interview.',
    seoTitle: 'Common {topic} Mistakes to Avoid in Interviews',
    seoDescription: 'Identify and avoid the most frequent mistakes candidates make in {topic} interviews with practical advice.',
    content: `Even experienced candidates can stumble in a {topic} interview. Avoid these common pitfalls to stand out.

**Mistake 1: Overcomplicating solutions** – Keep your {topic} code simple and readable. Complexity for its own sake is a red flag.

**Mistake 2: Ignoring edge cases** – Always consider boundary conditions, null values, and unexpected inputs.

**Mistake 3: Not communicating your thought process** – Explain your reasoning as you code; interviewers want to understand your approach.

**Mistake 4: Over-relying on libraries** – Know the underlying concepts; don’t just rely on external tools.

**Mistake 5: Failing to test** – Always test your {topic} code with sample inputs before presenting it.

**Mistake 6: Lack of depth** – Be prepared to dive deep into {topic} internals if asked.

**Mistake 7: Poor time management** – Allocate time wisely; don’t get stuck on one part.

**Mistake 8: Not asking clarifying questions** – If the problem is ambiguous, ask for clarification.

**Mistake 9: Dismissing feedback** – If an interviewer gives a hint, use it – they want you to succeed.

**Mistake 10: Forgetting soft skills** – Communication, teamwork, and adaptability matter as much as technical ability.

By being aware of these mistakes, you can proactively avoid them and deliver a stronger performance.`
  },
  {
    title: 'Deep dive into {topic}: advanced concepts and best practices',
    slug: 'deep-dive-{topic}-advanced',
    excerpt: 'Take a deep dive into advanced {topic} concepts, design patterns, and best practices for real-world applications.',
    seoTitle: 'Deep Dive into {topic}: Advanced Concepts and Best Practices',
    seoDescription: 'Explore advanced {topic} concepts, architectural patterns, and performance optimization techniques for production systems.',
    content: `For senior or lead roles, you’ll need to demonstrate deep knowledge of {topic}. This article covers the advanced topics you should master.

**1. Architecture and Design Patterns** – Understand how to structure large-scale {topic} applications using patterns like MVC, layered architecture, or microservices.

**2. Performance Optimization** – Learn techniques to improve the speed and efficiency of {topic} systems, including profiling, caching, and parallel processing.

**3. Security Best Practices** – Secure your {topic} applications against common vulnerabilities like injection, XSS, and data leaks.

**4. Testing Strategies** – Go beyond unit tests; explore integration, contract, and end-to-end testing for {topic} services.

**5. Deployment and Monitoring** – Understand how to deploy {topic} applications in production and monitor their health with metrics, logs, and alerts.

**6. Scalability** – Design {topic} applications that can handle growing loads using horizontal scaling, load balancing, and database sharding.

**7. Error Handling and Resilience** – Build robust {topic} systems with retries, circuit breakers, and graceful degradation.

**8. Code Quality and Maintainability** – Adopt practices like code reviews, static analysis, and refactoring to keep your {topic} codebase clean.

**9. Integration with Other Systems** – Learn how to integrate {topic} with databases, message queues, and external APIs.

**10. Emerging Trends** – Stay updated with the latest developments in the {topic} ecosystem.

Mastering these advanced topics will set you apart as a senior candidate and help you build production-ready solutions.`
  },
  {
    title: '{topic} interview questions: from beginner to expert',
    slug: '{topic}-questions-beginner-to-expert',
    excerpt: 'Explore {topic} interview questions at every level – from junior to staff engineer – with detailed answers.',
    seoTitle: '{topic} Interview Questions: From Beginner to Expert',
    seoDescription: 'Prepare for {topic} interviews at all levels with a curated list of questions ranging from basic to advanced.',
    content: `Whether you’re applying for a junior or a staff position, this guide covers {topic} questions for every experience level.

**Beginner Level** – These questions test your basic understanding of {topic} syntax and core features. Topics include variables, loops, conditionals, functions, and simple data structures.

**Intermediate Level** – You’ll be expected to demonstrate proficiency with {topic} libraries, frameworks, and design patterns. Questions may cover error handling, concurrency, and API design.

**Advanced Level** – For senior roles, you’ll face questions on performance optimisation, memory management, distributed systems, and system architecture. You may also be asked to design a solution from scratch.

**Expert Level** – Staff and principal engineer questions focus on strategic decision-making, scaling teams, and architectural trade-offs. You’ll need to show deep insights into {topic} internals and the ability to guide technical direction.

Each question is accompanied by a clear, structured answer that demonstrates the depth of knowledge expected at that level. Practise with these questions to gauge your readiness and identify areas for improvement.`
  },
];

// Combine all topics and templates
const allTopics = [...generalTopics, ...techTopics];
const allTemplates = [...generalTemplates, ...techTemplates];

// ==================== GENERATION LOGIC ====================

function generateArticles() {
  const usedSlugs = new Set<string>();
  const result: Array<{
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    content: string;
    seoTitle: string;
    seoDescription: string;
  }> = [];

  for (const topic of allTopics) {
    for (const template of allTemplates) {
      const title = template.title.replace(/\{topic\}/g, topic.label);
      let slug = template.slug.replace(/\{topic\}/g, topic.key);
      const excerpt = template.excerpt.replace(/\{topic\}/g, topic.label);
      const seoTitle = template.seoTitle.replace(/\{topic\}/g, topic.label);
      const seoDescription = template.seoDescription.replace(/\{topic\}/g, topic.label);
      const content = template.content.replace(/\{topic\}/g, topic.label);

      // Ensure unique slug
      let uniqueSlug = slug;
      let counter = 1;
      while (usedSlugs.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(uniqueSlug);

      result.push({
        title,
        slug: uniqueSlug,
        excerpt,
        author: 'InterviewPrep team',
        content,
        seoTitle,
        seoDescription,
      });
    }
  }

  console.log(`✅ Generated ${result.length} unique articles.`);
  return result;
}

// ==================== OUTPUT FILE ====================

function generateFileContent(articles: Array<any>) {
  const articlesStr = articles.map(a => {
    const title = a.title.replace(/"/g, '\\"');
    const excerpt = a.excerpt.replace(/"/g, '\\"');
    const content = a.content.replace(/"/g, '\\"');
    const seoTitle = a.seoTitle.replace(/"/g, '\\"');
    const seoDescription = a.seoDescription.replace(/"/g, '\\"');
    return `  {\n    title: "${title}",\n    slug: "${a.slug}",\n    excerpt: "${excerpt}",\n    author: "InterviewPrep team",\n    content: "${content}",\n    seoTitle: "${seoTitle}",\n    seoDescription: "${seoDescription}"\n  }`;
  }).join(',\n');

  return `export const articleSeeds = [\n${articlesStr}\n];\n`;
}

// ==================== MAIN ====================

const articles = generateArticles();
const fileContent = generateFileContent(articles);
fs.writeFileSync('generated-article-seed.ts', fileContent, 'utf8');
console.log('📄 File written: generated-article-seed.ts');