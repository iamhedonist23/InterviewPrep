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

function buildUltraExplanation(topic: TopicSeed, module: ModuleSeed, path: PathSeed) {
  const title = topic.title;
  const subject = topic.description;
  const lowerTitle = title.toLowerCase();
  let deepDive = `Study ${title} as a practical Git & GitHub skill, not as a memorised command list. Begin with the problem it solves: ${subject}. The critical questions are: what is the commit history, how does it affect collaboration, and what are the trade‑offs between different approaches?`;

  if (lowerTitle.includes("clone") || lowerTitle.includes("add") || lowerTitle.includes("commit")) {
    deepDive += " `git clone` downloads a repository. `git add` stages changes; `git commit` creates a snapshot with a message. Commit messages should be descriptive (imperative mood). Use `git status` and `git diff` frequently. Always commit early and often, but ensure commits are logical units.";
  } else if (lowerTitle.includes("branch") || lowerTitle.includes("merge") || lowerTitle.includes("rebase")) {
    deepDive += " Branches are lightweight pointers to commits. Use feature branches for isolated work. Merging creates a merge commit; rebasing rewrites history to keep a linear timeline. Rebasing is cleaner but can be dangerous on shared branches. Use `--force-with-lease` instead of `--force` when pushing rebased branches. Understand the difference between fast‑forward merges and three‑way merges.";
  } else if (lowerTitle.includes("stash")) {
    deepDive += " Stash saves uncommitted changes temporarily. Useful when switching branches without committing. Use `git stash push` to save, `git stash pop` to apply and drop, `git stash apply` to keep in stash. Use `git stash list` to see multiple stashes. Resolve conflicts if they occur after applying.";
  } else if (lowerTitle.includes("cherry-pick")) {
    deepDive += " Cherry‑pick applies a specific commit from another branch. Useful for hotfixes or selective integration. It creates a new commit with the same changes. Use with caution—it duplicates commits and can lead to merge conflicts or duplicate history.";
  } else if (lowerTitle.includes("reset") || lowerTitle.includes("revert")) {
    deepDive += " `git reset` moves the HEAD and branch pointer, altering history. Use with caution on shared branches. `git revert` creates a new commit that undoes a previous commit—safe for shared branches. Know the three modes: `--soft` (keep staged), `--mixed` (keep unstaged), `--hard` (discard all changes). Use `git reflog` to recover lost commits.";
  } else if (lowerTitle.includes("conflict")) {
    deepDive += " Merge conflicts occur when two branches modify the same lines. Resolve by editing files to choose the right content, then stage and commit. Use `git mergetool` or manual resolution. After resolving, `git add` and `git commit`. Conflict resolution is a skill—look for the `<<<<<<<`, `=======`, `>>>>>>>` markers.";
  } else if (lowerTitle.includes("workflow")) {
    deepDive += " Common Git workflows: **Git Flow** (feature, develop, release, hotfix branches) is heavy but structured. **GitHub Flow** (main + feature branches) is simpler, good for continuous delivery. **Trunk‑Based Development** (short‑lived branches, frequent merges to main) is popular with CI/CD. Choose based on team size, release cadence, and tooling.";
  } else if (lowerTitle.includes("pull request") || lowerTitle.includes("code review")) {
    deepDive += " Pull Requests (PRs) are the primary mechanism for code review on GitHub. They allow discussion, automated checks (CI), and line‑by‑line comments. Use PR templates to guide reviewers. Code reviews improve quality, share knowledge, and catch bugs early. Reviewers should be constructive and specific. Use `Draft` PRs for work in progress.";
  } else if (lowerTitle.includes("actions") || lowerTitle.includes("ci/cd")) {
    deepDive += " GitHub Actions automates workflows in response to events (push, PR, schedule). Define workflows in `.github/workflows/*.yml`. Jobs run on runners (Linux, Windows, macOS). Use actions from the marketplace to build, test, and deploy. Secrets (for tokens) are stored in repository settings. Actions can also be used for linting, security scanning, and deployment.";
  } else if (lowerTitle.includes("branch protection")) {
    deepDive += " Branch protection rules enforce policies on important branches (e.g., `main`). Options: require pull request reviews, status checks (CI passing), signed commits, linear history, and restrictions on who can push. Use to maintain code quality and prevent direct pushes. Combine with required reviewers and dismiss stale reviews.";
  } else if (lowerTitle.includes("issues")) {
    deepDive += " Issues track bugs, features, and tasks. Use templates and labels to categorise. Milestones group issues for a release. Issues can be referenced in commits (e.g., `Closes #42`) to auto‑close. Use projects (kanban boards) for tracking progress. Good issue descriptions include steps to reproduce, expected vs actual behaviour, and environment.";
  } else if (lowerTitle.includes("release")) {
    deepDive += " Releases package a specific commit with release notes and assets (binaries). Tag the commit (annotated tags). Use semantic versioning (MAJOR.MINOR.PATCH). Releases can trigger CI/CD for deployment. Use release notes to communicate changes to users. Automate release creation with Actions or scripts.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Write the basic command or workflow.\n3. Practice with a sample repository (e.g., create a test repo).\n4. Explore common edge cases and errors.\n5. Integrate into your daily workflow.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised command syntax.\n- Describe a real‑world scenario where you used it.\n- Mention the potential pitfalls and how to avoid them.\n- Differentiate between similar commands (e.g., merge vs rebase, reset vs revert).\n- Demonstrate how to recover from common mistakes (e.g., using reflog).\n\n### Practice task\nCreate a small repository and simulate a workflow for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write step‑by‑step commands, then introduce a conflict or error and resolve it. Document the process.`;
}

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
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        const sections = [
          ...(topicSeed.sections ?? []),
          { title: "Ultra Explanation and Interview Guide", content: buildUltraExplanation(topicSeed, moduleSeed, pathSeed) },
        ];
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

async function seedGitCategory() {
  const gitCategory: CategorySeed = {
    name: "Git & GitHub",
    slug: "git-github",
    description: "Master Git and GitHub from fundamentals to advanced collaboration: repository management, branching strategies, merge/rebase, conflict resolution, and GitHub features like PRs, Actions, and branch protection.",
    icon: "GIT",
    sortOrder: 0,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Learn the core Git commands and GitHub collaboration workflow.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Git Basics",
            slug: "git-basics",
            description: "Core commands and everyday operations.",
            topics: [
              {
                title: "Clone, Add, Commit, and Status",
                slug: "clone-add-commit",
                description: "Getting a repo, staging changes, and creating commits.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Clone", content: "`git clone <url>` downloads a remote repository. Use SSH or HTTPS. Creates a local copy with remote tracking." },
                  { title: "Add and Commit", content: "`git add <file>` stages; `git commit -m \"message\"` creates a snapshot. Use `git status` to see changes. Commit messages should be concise and descriptive." },
                  { title: "Staging Area", content: "Also called 'index'. Allows selective commits. Use `git add -p` to stage parts of a file." },
                ],
              },
              {
                title: "Branches – Creating, Switching, and Listing",
                slug: "branches",
                description: "Working with branches for isolation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Branch Basics", content: "`git branch` lists; `git branch <name>` creates; `git checkout <name>` or `git switch <name>` switches." },
                  { title: "Branch Pointers", content: "A branch is just a pointer to a commit. HEAD points to current branch." },
                  { title: "Remote Tracking", content: "Remote branches (e.g., `origin/main`) track remote state." },
                ],
              },
              {
                title: "Merging – Combining Branches",
                slug: "merge",
                description: "Fast‑forward and three‑way merges.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Fast‑forward Merge", content: "When the target branch hasn't diverged; just moves the pointer." },
                  { title: "Three‑way Merge", content: "When histories diverged; creates a merge commit." },
                  { title: "Merge Strategies", content: "`--no-ff` (always create merge commit), `--squash` (combine commits)." },
                ],
              },
              {
                title: "Rebasing – Rewriting History",
                slug: "rebase",
                description: "Moving commits to a new base.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Rebase Basics", content: "`git rebase <base>` replays commits on top of the base branch. Creates linear history." },
                  { title: "Interactive Rebase", content: "`git rebase -i` to squash, edit, reorder commits." },
                  { title: "Golden Rule", content: "Never rebase shared branches; it rewrites history." },
                ],
              },
              {
                title: "Stashing – Saving Uncommitted Changes",
                slug: "stash",
                description: "Temporary storage of work in progress.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Stash Commands", content: "`git stash` (push), `git stash pop` (apply and drop), `git stash apply` (keep)." },
                  { title: "Multiple Stashes", content: "`git stash list`, `git stash apply stash@{n}`." },
                  { title: "Stash with Untracked Files", content: "Use `--include-untracked` or `--all`." },
                ],
              },
              {
                title: "Cherry‑pick – Selective Commit Application",
                slug: "cherry-pick",
                description: "Applying a specific commit from another branch.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Cherry‑pick Command", content: "`git cherry-pick <commit>` applies changes as a new commit." },
                  { title: "Use Cases", content: "Hotfixes, backporting features." },
                  { title: "Cautions", content: "Can lead to duplicate commits; use sparingly." },
                ],
              },
              {
                title: "Reset and Revert – Undoing Changes",
                slug: "reset-revert",
                description: "Safe vs unsafe ways to undo.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Reset – Move Branch Pointer", content: "`git reset --soft` (keep staged), `--mixed` (keep working), `--hard` (discard all)." },
                  { title: "Revert – Undo with a New Commit", content: "`git revert <commit>` creates a new commit that reverses changes. Safe for shared branches." },
                  { title: "Recovering", content: "Use `git reflog` to find lost commits after reset." },
                ],
              },
              {
                title: "Conflict Resolution – Merging Conflicting Changes",
                slug: "conflict-resolution",
                description: "Handling merge conflicts.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Conflict Markers", content: "`<<<<<<<`, `=======`, `>>>>>>>` show conflicting sections." },
                  { title: "Resolution Steps", content: "Edit files, `git add`, `git commit`. Use `git mergetool` for GUI." },
                  { title: "Avoiding Conflicts", content: "Pull frequently, smaller commits, communicate with team." },
                ],
              },
              {
                title: "Git Workflows – Collaboration Patterns",
                slug: "workflows",
                description: "Git Flow, GitHub Flow, Trunk‑Based Development.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Git Flow", content: "Multiple branches: main, develop, feature, release, hotfix. Heavy but structured." },
                  { title: "GitHub Flow", content: "Simple: main + feature branches. PRs for changes. Good for CD." },
                  { title: "Trunk‑Based Development", content: "Short‑lived branches, frequent merges to main. Requires feature toggles." },
                ],
              },
            ],
          },
          {
            title: "GitHub Collaboration",
            slug: "github",
            description: "Leverage GitHub for team collaboration.",
            topics: [
              {
                title: "Pull Requests – Proposing Changes",
                slug: "pull-requests",
                description: "Creating, reviewing, and merging PRs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Creating PRs", content: "From branch compare. Use a template. Link to issues." },
                  { title: "Review Process", content: "Comment, request changes, approve. Use draft PRs for work in progress." },
                  { title: "Merging", content: "Merge commit, Squash, or Rebase. Choose based on team policy." },
                ],
              },
              {
                title: "Code Review – Best Practices",
                slug: "code-review",
                description: "Effective code reviews and feedback.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Reviewer Responsibilities", content: "Check logic, style, security, tests, design. Be kind and constructive." },
                  { title: "Automated Checks", content: "CI checks (Actions) run before merge." },
                  { title: "Review Etiquette", content: "Small PRs, clear descriptions, respond timely." },
                ],
              },
              {
                title: "GitHub Actions – CI/CD Automation",
                slug: "actions",
                description: "Workflow automation for building, testing, deploying.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Workflow Files", content: "YAML in `.github/workflows/`. Define triggers (push, pull_request, schedule)." },
                  { title: "Jobs and Runners", content: "Jobs run on runners (Ubuntu, Windows, macOS). Use matrix builds." },
                  { title: "Secrets and Environment Variables", content: "Store secrets in repo settings. Use `${{ secrets.NAME }}`." },
                ],
              },
              {
                title: "Branch Protection Rules",
                slug: "branch-protection",
                description: "Enforcing policies on main branches.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Protection Settings", content: "Require PR reviews, status checks, linear history, signed commits." },
                  { title: "Dismiss Stale Reviews", content: "When new commits are pushed, reviews are reset." },
                  { title: "Administrator Override", content: "Allow bypass for emergencies." },
                ],
              },
              {
                title: "Issues and Project Management",
                slug: "issues",
                description: "Tracking tasks, bugs, and features.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Issue Templates", content: "Standardise bug reports, feature requests." },
                  { title: "Labels and Milestones", content: "Categorise and group issues." },
                  { title: "Linking PRs", content: "Use keywords (Closes #42) to auto‑close issues." },
                ],
              },
              {
                title: "Releases and Tagging",
                slug: "releases",
                description: "Packaging versions for distribution.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Creating Releases", content: "Tag a commit, add release notes, attach assets." },
                  { title: "Semantic Versioning", content: "MAJOR.MINOR.PATCH. Use `git tag -a v1.0.0 -m \"message\"`." },
                  { title: "Automation", content: "Use Actions to create releases on tag push." },
                ],
              },
            ],
          },
        ],
      },
      // Optionally an Interview Prep path? But the user didn't ask for that, but we could add one. The user said "very useful for beginners and interview preparation" so we can add an Interview Prep module as a second path. Let's add an Interview Prep path with a few topics.
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common Git and GitHub interview questions and troubleshooting.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-interview",
            description: "Questions on commands and scenarios.",
            topics: [
              {
                title: "Git vs GitHub – Differences",
                slug: "git-vs-github",
                description: "Understanding the distinction.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Git", content: "Distributed version control system (local)." },
                  { title: "GitHub", content: "Hosting platform with collaboration features." },
                ],
              },
              {
                title: "Merge vs Rebase – When to use each",
                slug: "merge-vs-rebase",
                description: "Trade‑offs and best practices.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Merge", content: "Preserves history; creates merge commit." },
                  { title: "Rebase", content: "Linear history; rewrites commits. Use on private branches." },
                ],
              },
              {
                title: "Recovering Lost Commits – Reflog",
                slug: "reflog",
                description: "Using git reflog to recover from mistakes.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Reflog", content: "Records all branch movements. Use `git reflog` to find lost commits." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(gitCategory);
  console.log("✅ Git & GitHub category seeded (ultra‑detailed)");
}

async function main() {
  await seedGitCategory();
}

main()
  .catch((error) => {
    console.error("Git seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });