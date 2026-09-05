import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- 200 Docker Interview Questions (Fresher to Advanced) ----
// ---- Categories ----
export const categories = [
  ["GIT & GITHUB", "GIT & GITHUB"]
] as const;

// ---- 200 Git & GitHub Interview Questions (Fresher to Advanced) ----
export const topics =[
  // ==================== GIT BASICS (Easy) ====================
  ["Git", "What is Git and how does it differ from other version control systems?", "git-overview", "Explain Git's distributed nature.", "Git is a distributed version control system (DVCS) that tracks changes in source code. Unlike centralized systems (e.g., SVN), every developer has a full copy of the repository history locally, enabling offline work, faster operations, and better branching/merging."],
  ["Git", "What is the difference between Git and GitHub?", "git-vs-github", "Clarify the distinction.", "Git is a distributed version control system that runs locally. GitHub is a web-based hosting service for Git repositories that adds collaboration features (pull requests, issues, actions, project management). Git is the tool; GitHub is a platform for hosting and sharing Git repositories."],
  ["Git", "What is a Git repository?", "git-repository", "Define a repo.", "A Git repository is a directory that contains all your project files and the Git metadata (.git folder). The metadata includes the object database, refs (branches, tags), and configuration. It stores the full history of changes."],
  ["Git", "What is the difference between a local and a remote repository?", "local-vs-remote-repo", "Explain the two.", "A local repository resides on your machine and contains your project's history. A remote repository is a copy hosted on a server (e.g., GitHub) that multiple collaborators can push to and pull from. Local repos are for individual work; remote repos enable collaboration."],
  ["Git", "What is a commit in Git?", "git-commit", "Define a commit.", "A commit is a snapshot of the project's tracked files at a specific point in time. It has a unique SHA-1 hash, author, timestamp, and a commit message describing the changes. Commits form the history of the repository."],
  ["Git", "How do you create a new Git repository?", "git-init", "Explain the command.", "Use `git init` in an existing directory to create a new local repository. This creates a `.git` folder. For a remote repository, you can create one on GitHub and then clone it using `git clone <url>`."],
  ["Git", "What is a branch in Git?", "git-branch", "Define a branch.", "A branch is a movable pointer to a commit. It allows you to diverge from the main line of development and work on features independently. The default branch is usually `main` or `master`. Branches enable parallel development."],
  ["Git", "How do you create a new branch?", "git-branch-create", "Explain the command.", "Use `git branch <branch-name>` to create a new branch. To switch to it, use `git checkout <branch-name>` or `git switch <branch-name>`. Alternatively, `git checkout -b <branch-name>` creates and switches to the new branch in one command."],
  ["Git", "What is the `HEAD` in Git?", "git-head", "Explain the pointer.", "`HEAD` is a pointer to the current branch reference (or commit if you're in detached HEAD state). It indicates which branch is currently checked out. When you make a new commit, `HEAD` moves to the new commit."],
  ["Git", "How do you check the status of your Git repository?", "git-status", "Explain the command.", "`git status` shows the state of the working directory and staging area. It lists untracked files, changes not staged, changes to be committed, and the branch you're on. It's the first command to run to understand your current state."],
  ["Git", "What does `git add` do?", "git-add", "Explain staging.", "`git add <file>` stages changes (adds them to the index) to be included in the next commit. It tells Git you want to include the changes in the snapshot. You can add specific files or all changes with `git add .`."],
  ["Git", "What does `git commit` do?", "git-commit", "Explain the commit operation.", "`git commit -m \"message\"` creates a new commit by taking the staged changes and saving them as a snapshot in the repository. The commit message should describe the changes concisely. It advances the branch pointer."],
  ["Git", "How do you view the commit history?", "git-log", "Explain the command.", "`git log` shows the commit history in reverse chronological order. It displays the commit hash, author, date, and message. Use `git log --oneline` for a compact view, and `git log -p` to see the changes (diffs) introduced in each commit."],
  ["Git", "What is the difference between `git log` and `git reflog`?", "log-vs-reflog", "Compare the two.", "`git log` shows the commit history reachable from the current branch. `git reflog` shows a local record of when branch tips and other references were updated, allowing you to recover lost commits (e.g., after a reset or rebase). Reflog is local and not shared."],
  ["Git", "How do you undo changes in Git?", "git-undo", "Explain the different undo options.", "Use `git checkout -- <file>` to discard local changes in a file. Use `git reset HEAD <file>` to unstage a file. Use `git reset --hard` to discard all local changes. Use `git revert <commit>` to create a new commit that undoes a previous commit."],
  ["Git", "What is the difference between `git reset` and `git revert`?", "reset-vs-revert", "Explain the two.", "`git reset` moves the branch pointer and can change history (dangerous on shared branches). It has modes: `--soft`, `--mixed`, `--hard`. `git revert` creates a new commit that undoes the changes of a previous commit, preserving history and safe for public branches."],
  ["Git", "How do you delete a file from Git?", "git-rm", "Explain the command.", "Use `git rm <file>` to remove a file from the working directory and stage the removal for commit. If you want to keep the file locally but stop tracking it, use `git rm --cached <file>`."],
  ["Git", "What is a `.gitignore` file?", "gitignore", "Explain the purpose.", "A `.gitignore` file specifies intentionally untracked files that Git should ignore (e.g., build artifacts, log files, dependencies, IDE files). It prevents them from being accidentally committed. Patterns can match files or directories."],
  ["Git", "How do you clone a repository?", "git-clone", "Explain the command.", "`git clone <url>` creates a local copy of a remote repository. It downloads the entire history, sets up the remote origin, and checks out the default branch. It's the standard way to start working on an existing project."],
  ["Git", "What is the difference between `git clone` and `git fork`?", "clone-vs-fork", "Clarify the two.", "`git clone` copies a repository from a remote to your local machine. A fork is a copy of a repository on GitHub (or other platforms) under your own account, allowing you to make changes without affecting the original repository. Forking is a server-side operation."],
  ["Git", "What is a remote in Git?", "git-remote", "Define a remote.", "A remote is a reference to a version of the repository that is hosted elsewhere (e.g., on GitHub). It is stored as a URL. You typically have one remote named `origin`. Use `git remote -v` to list remotes."],
  ["Git", "How do you add a remote repository?", "git-remote-add", "Explain the command.", "`git remote add <name> <url>` adds a new remote. For example, `git remote add origin https://github.com/user/repo.git`. Then you can push/pull to that remote."],
  ["Git", "What does `git push` do?", "git-push", "Explain pushing changes.", "`git push <remote> <branch>` uploads local commits to the remote repository. It updates the remote branch to match your local branch. For example, `git push origin main` pushes the main branch to the origin remote."],
  ["Git", "What does `git pull` do?", "git-pull", "Explain pulling changes.", "`git pull <remote> <branch>` fetches changes from the remote repository and merges them into your local branch. It is a combination of `git fetch` and `git merge`. Use `git pull --rebase` to rebase instead of merge."],
  ["Git", "What is the difference between `git pull` and `git fetch`?", "pull-vs-fetch", "Compare the two.", "`git fetch` downloads new commits from the remote but does not integrate them into your local branch. `git pull` downloads and then merges (or rebases) the changes into your current branch. Fetch is safer as it allows you to review changes before merging."],

  // ==================== BRANCHING & MERGING (Medium) ====================
  ["Git", "What is branching strategy? Name a few.", "branching-strategies", "Explain popular models.", "A branching strategy defines how developers collaborate and manage code. Common models: Git Flow (feature, develop, release, hotfix branches), GitHub Flow (feature branches, main only), GitLab Flow, and Trunk-Based Development."],
  ["Git", "What is Git Flow?", "git-flow", "Describe the branching model.", "Git Flow is a branching model with two main branches: `main` (production) and `develop` (integration). Feature branches branch off `develop`, release branches off `develop` and merge to both `main` and `develop`, and hotfixes branch off `main` and merge to both. It is suitable for release cycles."],
  ["Git", "What is GitHub Flow?", "github-flow", "Describe the simpler model.", "GitHub Flow is a lightweight branching model where `main` is always deployable. Feature branches are created from `main`, merged back via pull requests after review, and then deployed. It's simple and works well for continuous delivery."],
  ["Git", "What is Trunk-Based Development?", "trunk-based-development", "Explain the model.", "Trunk-Based Development relies on a single main branch (trunk). Developers create short-lived feature branches, merge frequently (daily) to the trunk, and use feature flags to hide incomplete features. It encourages continuous integration and minimizes merge conflicts."],
  ["Git", "How do you merge two branches?", "git-merge", "Explain the merge operation.", "First, switch to the target branch (e.g., `git checkout main`). Then use `git merge <source-branch>` to merge the source branch into the current branch. Git will automatically create a merge commit if the merge is fast-forward or a recursive merge."],
  ["Git", "What is a fast-forward merge?", "fast-forward-merge", "Explain the case.", "A fast-forward merge occurs when the target branch has not diverged; Git simply moves the pointer of the target branch forward to the tip of the source branch. No new commit is created. It happens when the source branch is ahead of the target."],
  ["Git", "What is a three-way merge?", "three-way-merge", "Explain the process.", "A three-way merge occurs when the branches have diverged (have a common ancestor). Git uses the common ancestor, the two branch tips, to create a new merge commit that incorporates changes from both branches. Conflicts may arise."],
  ["Git", "What is a merge conflict and how do you resolve it?", "merge-conflict", "Explain conflicts and resolution.", "A merge conflict occurs when Git cannot automatically resolve differences between two branches that modified the same line(s) or one deleted a file while the other modified it. You resolve by editing the conflicted files, then staging and committing the resolved result."],
  ["Git", "How do you resolve a merge conflict manually?", "resolve-conflict", "Walk through the steps.", "1. Open the conflicting files; Git marks conflict sections with `<<<<<<<`, `=======`, `>>>>>>>`. 2. Edit the file to keep the desired changes. 3. Remove the conflict markers. 4. Stage the resolved file (`git add`). 5. Complete the merge (`git commit`)."],
  ["Git", "What is `git rebase` and when would you use it?", "git-rebase", "Explain rebasing.", "`git rebase` moves or combines a sequence of commits to a new base commit. It rewrites history by applying commits on top of another branch. Use it to keep a linear, clean history, especially before merging to main. Never rebase shared branches."],
  ["Git", "What is the difference between rebasing and merging?", "rebase-vs-merge", "Compare the two.", "Rebasing rewrites the commit history to create a linear sequence; merging preserves the history with a merge commit. Rebasing leads to a cleaner history; merging shows the true timeline and branching structure. Merging is safer for shared branches; rebasing is better for local cleanup."],
  ["Git", "What are the pros and cons of rebasing?", "rebase-pros-cons", "List advantages and disadvantages.", "Pros: Clean, linear history; easier to understand; avoids merge commits. Cons: Rewrites history, can cause conflicts for others; dangerous if used on shared branches; can be complex for beginners."],
  ["Git", "What is an interactive rebase?", "interactive-rebase", "Explain the feature.", "`git rebase -i <commit>` allows you to modify the commit history interactively. You can reorder, squash (combine), edit, drop, or reword commits. It's useful for cleaning up local commits before merging."],
  ["Git", "How do you squash commits using rebase?", "squash-commits", "Explain the process.", "Use `git rebase -i HEAD~N` where N is the number of commits to go back. In the editor, change `pick` to `squash` or `fixup` for commits you want to combine. Save and edit the commit message. This is useful to clean up messy commits before sharing."],
  ["Git", "What is the golden rule of rebasing?", "golden-rule-rebase", "Explain the rule.", "Never rebase a branch that other people have based work on (i.e., a public or shared branch). Rebasing rewrites history, causing other developers to have divergent commit histories, leading to confusion and conflicts."],
  ["Git", "What is a pull request (PR) in GitHub?", "pull-request", "Explain the GitHub feature.", "A pull request is a GitHub feature that allows you to propose changes from a branch to another (usually main). It provides a platform for code review, discussion, and automated CI checks before merging. It is a key collaboration tool."],
  ["Git", "What is the difference between a pull request and a merge request?", "pr-vs-mr", "Compare the two.", "Pull request is the GitHub term; merge request is used in GitLab and Bitbucket. They are essentially the same: a request to merge code changes from one branch to another, with review capabilities."],
  ["Git", "How do you rebase a branch and then merge it?", "rebase-and-merge", "Explain the workflow.", "1. Fetch the latest main: `git fetch origin main`. 2. Rebase your feature branch: `git checkout feature`; `git rebase main`. 3. Resolve any conflicts. 4. Push the rebased branch (force push if necessary). 5. Create a pull request and merge (usually a fast-forward merge)."],
  ["Git", "What is a fast-forward merge in a PR context?", "ff-merge-pr", "Explain the scenario.", "If the target branch has not diverged (i.e., no new commits on target since the branch was created), the merge can be fast-forwarded without a merge commit. GitHub allows you to choose to merge with a merge commit even if fast-forward is possible."],
  ["Git", "What is the difference between a merge commit and a squash merge in GitHub?", "merge-vs-squash-merge", "Compare PR merge options.", "A merge commit creates a merge commit that preserves history. Squash merge condenses all commits from the branch into a single commit. Squash merging keeps the main branch history clean but loses granularity."],

  // ==================== ADVANCED GIT (Medium-Hard) ====================
  ["Git", "What is a detached HEAD state?", "detached-head", "Explain the situation.", "Detached HEAD occurs when HEAD points directly to a commit instead of a branch. You are not on any branch. Any commits you make will be orphaned unless you create a new branch to reference them. It is common when checking out a specific commit or tag."],
  ["Git", "How do you recover lost commits in Git?", "recover-lost-commits", "Explain recovery methods.", "Use `git reflog` to find the hash of the lost commit, then create a new branch pointing to it using `git branch <branch-name> <hash>`. Or use `git cherry-pick` to apply the commit to your current branch. Reflog is the first place to look."],
  ["Git", "What is a tag in Git and how is it different from a branch?", "tag-vs-branch", "Compare the two.", "A tag is a static pointer to a specific commit, usually used for releases (e.g., v1.0). Tags do not move. A branch is a movable pointer that advances with each commit. Branches are for development; tags are for marking milestones."],
  ["Git", "What are lightweight and annotated tags?", "lightweight-vs-annotated-tags", "Explain the difference.", "A lightweight tag is just a pointer to a commit (no extra metadata). An annotated tag stores a full object with tagger name, email, date, and a message; it can be signed with GPG. Annotated tags are recommended for releases."],
  ["Git", "How do you create a tag and push it to a remote?", "git-tag-push", "Explain the commands.", "Create an annotated tag: `git tag -a v1.0 -m \"Release version 1.0\"`. Push tags: `git push origin --tags` pushes all tags, or `git push origin v1.0` pushes a specific tag."],
  ["Git", "What is `git stash` and when would you use it?", "git-stash", "Explain the command.", "`git stash` temporarily saves local changes (working directory and staged) without committing them, allowing you to pull new changes or switch branches. Use when you need to clean your working directory quickly. Apply them back with `git stash pop` or `git stash apply`."],
  ["Git", "What is the difference between `git stash pop` and `git stash apply`?", "stash-pop-vs-apply", "Compare the two.", "`git stash apply` applies the stashed changes but keeps the stash in the list. `git stash pop` applies and then drops the stash from the list. Use `pop` if you no longer need the stash."],
  ["Git", "What is `git cherry-pick`?", "cherry-pick", "Explain the command.", "`git cherry-pick <commit-hash>` applies the changes from a specific commit to your current branch. It is useful for selectively applying patches, backporting fixes, or moving specific commits without merging entire branches."],
  ["Git", "What is `git bisect` and how do you use it?", "git-bisect", "Explain the binary search debugging tool.", "`git bisect` helps find the commit that introduced a bug by performing a binary search over the commit history. You mark a commit as 'good' (working) and a commit as 'bad' (broken), and Git repeatedly checks out commits for you to test."],
  ["Git", "What is `git grep` used for?", "git-grep", "Explain searching.", "`git grep` searches for patterns in the tracked files of the repository. It is faster than `grep` because it operates on the index and supports powerful options like searching through commit history (`git grep <pattern> <commit>`)."],
  ["Git", "What is `git blame`?", "git-blame", "Explain the command.", "`git blame <file>` annotates a file line by line, showing the commit hash, author, and timestamp for each line. It is used to determine who last modified a specific line, useful for understanding code changes and accountability."],
  ["Git", "What is a submodule? How do you add one?", "git-submodule", "Explain submodules.", "A submodule is a reference to another Git repository embedded in your repository. It allows you to include a third-party project. Add with `git submodule add <url>`; it creates a `.gitmodules` file. Clone with `git clone --recurse-submodules` to fetch the submodule content."],
  ["Git", "What is the difference between a submodule and a subtree?", "submodule-vs-subtree", "Compare the two.", "A submodule is a pointer to another repository; it requires separate fetch and update operations. A subtree merges the external repository's content into your repository at a specific directory, making it easier to manage as a single repo. Subtree is simpler for integration."],
  ["Git", "What is a Git hook? Name a few examples.", "git-hooks", "Explain hooks.", "Git hooks are scripts that run automatically on certain events (e.g., commit, push, merge). They can be client-side (pre-commit, pre-push) or server-side (pre-receive). Examples: lint code before commit, run tests before push, enforce commit message format."],
  ["Git", "How do you set up a Git hook?", "setup-hook", "Explain the process.", "Navigate to `.git/hooks/` and create or modify a script (e.g., `pre-commit`). Make it executable (`chmod +x`). The script runs when the event occurs. You can also share hooks with the team by placing them in a scripts directory and linking them."],
  ["Git", "What is the difference between `git merge --no-ff` and `git merge --ff-only`?", "merge-options", "Explain the flags.", "`--no-ff` forces a merge commit even if fast-forward is possible. `--ff-only` only allows a merge if it can be fast-forwarded; otherwise, it fails. `--no-ff` preserves feature branch history; `--ff-only` keeps history linear."],
  ["Git", "What is the purpose of `git rm --cached`?", "git-rm-cached", "Explain the command.", "`git rm --cached <file>` removes the file from the staging area (index) but leaves it in the working directory. It is used to stop tracking a file (like if you want to add it to `.gitignore` after it was already tracked)."],
  ["Git", "How do you rename a branch in Git?", "rename-branch", "Explain the commands.", "Local: `git branch -m old-name new-name`. To rename a remote branch: 1. Rename local, 2. Delete the old remote branch (`git push origin --delete old-name`), 3. Push the new branch (`git push origin new-name`), 4. Reset the upstream (`git push --set-upstream origin new-name`)."],
  ["Git", "What is the `git clean` command?", "git-clean", "Explain cleaning untracked files.", "`git clean -fd` removes untracked files and directories from the working directory. It is used to get rid of build artifacts or other unversioned files. Use `-n` to do a dry run."],
  ["Git", "How do you change the last commit message?", "amend-commit", "Explain the command.", "Use `git commit --amend -m \"New message\"` to change the most recent commit message. If you have already pushed, you'll need to force push (`git push --force`), but this should be avoided if others have pulled."],

  // ==================== GITHUB & COLLABORATION (Medium) ====================
  ["Git", "What is a GitHub Issue?", "github-issue", "Explain the feature.", "A GitHub Issue is a tracking item used to report bugs, propose enhancements, or discuss tasks. Issues can be assigned, labeled, prioritized, and linked to pull requests. They are central to project management on GitHub."],
  ["Git", "What are GitHub Labels?", "github-labels", "Explain their use.", "Labels are tags you can add to Issues and Pull Requests to categorize them (e.g., bug, enhancement, help wanted, priority: high). They help filter and organize work."],
  ["Git", "What is a GitHub Project Board?", "github-project-board", "Explain the kanban-style board.", "A Project Board is a kanban-style board that organizes Issues and PRs into columns (e.g., To Do, In Progress, Done). It visualizes workflow and is useful for agile project management."],
  ["Git", "What is a GitHub Actions workflow?", "github-actions", "Explain the CI/CD feature.", "GitHub Actions is a CI/CD platform that allows you to automate builds, tests, and deployments. You define workflows in YAML files placed in `.github/workflows/`. Workflows are triggered by events (push, PR, schedule)."],
  ["Git", "What is a GitHub Secret?", "github-secret", "Explain storing sensitive data.", "GitHub Secrets are encrypted environment variables that you can store in your repository settings. They are used in Actions to pass sensitive information (API keys, tokens) without exposing them in the workflow file."],
  ["Git", "What is a GitHub Release?", "github-release", "Explain the feature.", "A GitHub Release is a deployable package that can include binary files (artifacts) and release notes. It is often used to distribute software versions. Releases are tied to a Git tag."],
  ["Git", "How do you protect a branch in GitHub?", "branch-protection", "Explain branch protection rules.", "In repository settings, you can set branch protection rules for a branch (e.g., main). Rules can require: pull request reviews, status checks (CI passing), linear history (no merge commits), and prevent force pushes. This enforces code quality and collaboration guidelines."],
  ["Git", "What is the purpose of a `README.md` file?", "readme", "Explain its role.", "A README is a markdown file that describes the project, setup instructions, usage, and contribution guidelines. It is the first thing visitors see on the repository page. It provides essential context for the project."],
  ["Git", "What is a `.gitattributes` file?", "gitattributes", "Explain its purpose.", "`.gitattributes` defines attributes for specific files, such as line ending normalization (`* text=auto`), diff strategies, and merge strategies. It is used to ensure consistent behavior across different platforms."],
  ["Git", "What is the difference between `origin` and `upstream` in Git?", "origin-vs-upstream", "Explain the remote naming convention.", "`origin` is the default name for your remote repository (the one you cloned from). `upstream` is a common convention for the original repository from which you forked, used to sync with the base project."],
  ["Git", "How do you sync a forked repository with the original?", "sync-fork", "Explain the steps.", "1. Add the original repo as a remote: `git remote add upstream <original-url>`. 2. Fetch upstream: `git fetch upstream`. 3. Merge or rebase: `git checkout main`; `git merge upstream/main` (or `rebase`). 4. Push to your fork: `git push origin main`."],
  ["Git", "What is a fork vs. a branch in GitHub?", "fork-vs-branch", "Compare the two.", "A fork is a copy of a repository on GitHub, allowing you to propose changes without affecting the original. A branch is a line of development within a single repository. Forks are typically used for open-source contributions; branches are for internal team collaboration."],
  ["Git", "How do you submit a contribution to an open-source project on GitHub?", "open-source-contribution", "Explain the standard process.", "1. Fork the repository. 2. Clone your fork locally. 3. Create a feature branch. 4. Make changes and commit. 5. Push to your fork. 6. Open a pull request to the original repository. 7. Address any feedback."],
  ["Git", "What is a GitHub Discussions?", "github-discussions", "Explain the feature.", "GitHub Discussions is a forum-like feature where developers can ask questions, share ideas, and have conversations about the project. It is separate from Issues, which are for specific tasks or bugs."],
  ["Git", "What is the difference between a draft pull request and a regular pull request?", "draft-pr", "Explain the feature.", "A draft pull request is a PR that is not ready for review (marked as 'draft'). It cannot be merged until converted to a regular PR. It's useful for early collaboration or to signal work in progress."],

  // ==================== TROUBLESHOOTING (Medium-Hard) ====================
  ["Git", "You accidentally committed sensitive information (e.g., password) to a public repository. How do you fix it?", "expose-secret", "Explain the recovery process.", "1. Remove the secret from the file and commit the change. 2. Use `git filter-repo` or `BFG Repo-Cleaner` to completely remove the secret from history. 3. Force push to overwrite remote history. 4. Revoke the exposed secret. 5. Notify collaborators to rebase."],
  ["Git", "How do you revert a commit that is already pushed?", "revert-pushed-commit", "Explain the steps.", "Use `git revert <commit-hash>` to create a new commit that undoes the changes of that commit. This is safe for public branches. Then push the revert commit. Do not use `reset` on public branches."],
  ["Git", "How do you undo a commit locally but keep the changes?", "undo-commit-keep-changes", "Explain the commands.", "Use `git reset --soft HEAD~1` to move the branch pointer back one commit but keep the changes staged. Use `git reset --mixed HEAD~1` (default) to unstage the changes but keep them in the working directory."],
  ["Git", "How do you change a commit that is not the latest?", "amend-older-commit", "Explain the process.", "Use interactive rebase: `git rebase -i HEAD~N` (where N is the number of commits back). In the editor, change `pick` to `edit` for the commit you want to change. Make your changes, then `git commit --amend`, then `git rebase --continue`."],
  ["Git", "What should you do if you encounter a 'merge conflict' during a rebase?", "rebase-conflict", "Explain resolution.", "1. Git will pause the rebase and mark conflicts. 2. Resolve conflicts in the files. 3. Stage the resolved files (`git add`). 4. Continue the rebase (`git rebase --continue`). 5. If you want to abort, use `git rebase --abort`."],
  ["Git", "How do you force push after a rebase?", "force-push", "Explain the command and risks.", "Use `git push --force-with-lease` (preferred) or `git push -f`. Force pushing overwrites remote history, which can cause problems for other collaborators. Only do this on your own feature branches and after coordinating with the team."],
  ["Git", "What is the difference between `git push --force` and `git push --force-with-lease`?", "force-vs-force-with-lease", "Compare the two.", "`--force` overwrites the remote branch regardless of its state. `--force-with-lease` checks if the remote branch has been updated since you last fetched; if it has, the push fails, preventing you from accidentally overwriting someone else's commits."],
  ["Git", "How do you find out who deleted a file or a line?", "find-deletion", "Explain the commands.", "Use `git log --diff-filter=D -- <file>` to find commits that deleted a file. Use `git blame <file>` to see who last modified each line. Use `git log -p <file>` to see the full history and identify deletion commits."],
  ["Git", "You have a large repository and want to clone it faster. What can you do?", "clone-large-repo", "Explain strategies.", "Use `git clone --depth 1` to do a shallow clone (only the latest commit). Use `git clone --single-branch` to clone only the default branch. Use `git clone --filter=blob:none` (Git 2.19+) to fetch only commit metadata, fetching file contents on demand."],
  ["Git", "How do you clean up your local repository to free up space?", "repo-cleanup", "Explain commands.", "Use `git gc` to garbage collect and optimize the repository. Use `git prune` to remove unreachable objects. Use `git reflog expire --expire=now --all` and then `git gc --prune=now` to aggressively clean."],

  // ==================== PERFORMANCE & ADVANCED WORKFLOWS (Hard) ====================
  ["Git", "What is a shallow clone and when would you use it?", "shallow-clone", "Explain the clone type.", "A shallow clone (`git clone --depth 1`) downloads only the latest commit history. It reduces clone time and disk space. Use it for CI/CD pipelines or when you only need the latest version, not full history."],
  ["Git", "What is a sparse checkout and how does it help?", "sparse-checkout", "Explain the feature.", "Sparse checkout allows you to clone only a subset of files from a repository. Use `git sparse-checkout set <path>` after cloning. It is useful for monorepos with many files, saving time and disk space."],
  ["Git", "What is a partial clone?", "partial-clone", "Explain the feature.", "A partial clone (Git 2.19+) uses `--filter=blob:none` to clone only commit metadata, fetching blob (file content) on demand. It speeds up cloning and reduces initial disk usage, fetching files when needed."],
  ["Git", "What is the difference between `git bundle` and `git archive`?", "bundle-vs-archive", "Compare the two.", "`git bundle` creates a file that contains Git objects (commits, references) and can be used to transfer the repository offline. `git archive` creates a tar or zip of the files at a specific commit, without Git metadata."],
  ["Git", "How do you handle a repository with thousands of branches?", "many-branches", "Explain strategies.", "Use `git fetch --prune` to clean up remote-tracking branches. Use `git branch --merged` to find branches that can be deleted. Use `git branch --sort=-committerdate` to see branches by latest activity. Consider using a monorepo or trunk-based development to limit branches."],
  ["Git", "What is `git filter-repo` and how is it used?", "filter-repo", "Explain the tool.", "`git filter-repo` is a powerful tool for rewriting repository history (e.g., removing files, changing authors, splitting repositories). It replaces `filter-branch` and is more efficient and safer. Use it to clean up history or migrate repositories."],
  ["Git", "How do you split a monorepo into multiple repos while preserving history?", "split-monorepo", "Explain the process.", "Use `git filter-repo` with the `--path` and `--subdirectory-filter` options to extract a subdirectory into a new repository while preserving its history. Or use `git subtree split`."],
  ["Git", "What is the difference between `git rebase --onto` and regular rebase?", "rebase-onto", "Explain the advanced option.", "`git rebase --onto <newbase> <upstream> <branch>` moves commits from `<upstream>` to `<branch>` onto `<newbase>` instead of the base of the current branch. It allows you to rebase onto a different branch, useful for re-parenting."],
  ["Git", "How do you sign commits and tags with GPG?", "gpg-sign", "Explain signing.", "Generate a GPG key. Configure Git: `git config --global user.signingkey <key-id>`. Sign commits with `git commit -S -m \"message\"`. Sign tags with `git tag -s v1.0`. Use `--verify` to verify signatures."],
  ["Git", "What is Git LFS (Large File Storage) and when would you use it?", "git-lfs", "Explain the extension.", "Git LFS replaces large files (e.g., binaries, multimedia) with text pointers, storing the actual content on a separate server. It is used to avoid bloating the Git repository with large files, improving clone and fetch performance."],

  // ==================== INTERNAL GIT (Hard) ====================
  ["Git", "What is the Git object model? Name the four types of objects.", "git-objects", "Explain the model.", "Git stores data as objects: `blob` (file content), `tree` (directory structure), `commit` (snapshot of the tree with metadata), and `tag` (reference to a commit). All objects are identified by SHA-1 hashes."],
  ["Git", "What is a SHA-1 hash and how is it used in Git?", "sha1", "Explain hashing in Git.", "Git uses SHA-1 (now transitioning to SHA-256) to generate a 40-character checksum for each object (blob, tree, commit). This hash serves as a unique identifier for content. It ensures integrity; any change to content changes the hash."],
  ["Git", "How does Git store commits internally?", "internal-commit-structure", "Explain the commit object.", "A commit object contains: the tree hash (snapshot of the files), parent commit hashes, author, committer, timestamp, and a commit message. The tree object points to other trees and blobs, forming a complete snapshot of the repository."],
  ["Git", "What is the index (staging area) in Git?", "git-index", "Explain the staging area.", "The index is a binary file (`.git/index`) that holds a snapshot of the files as they will be in the next commit. It acts as the staging area between the working directory and the repository. Commands like `git add` update the index."],
  ["Git", "Explain the difference between a blob and a tree object.", "blob-vs-tree", "Compare the object types.", "A blob stores the contents of a single file. A tree stores references to blobs and other trees, representing a directory structure. A commit points to a tree."],
  ["Git", "What is a packfile and why is it used?", "packfile", "Explain compression.", "A packfile is a file that stores multiple Git objects in a compressed, efficient format (delta compression). Git creates packfiles during `git gc` to reduce disk space and improve network transfer performance."],
  ["Git", "What is `git repack` and when would you run it?", "git-repack", "Explain repacking.", "`git repack` compresses objects into packfiles and removes unused objects. It is often run automatically by `git gc`. You might run it manually to optimize the repository after many commits or to reclaim disk space."],
  ["Git", "How does Git handle branching internally?", "branch-internals", "Explain the reference mechanism.", "Branches are just lightweight pointers (references) stored in `.git/refs/heads/`. Each branch file contains the SHA-1 hash of the commit it points to. HEAD is a symref pointing to the current branch reference."],
  ["Git", "What is the difference between a fast-forward and a recursive merge at the object level?", "merge-internals", "Explain the internal difference.", "Fast-forward: Git simply moves the branch pointer to the new commit (no new merge commit). Recursive (non-fast-forward): Git creates a new merge commit with two parents, and the tree of that commit is the result of merging the two branches."],
  ["Git", "What is the reflog and how is it stored internally?", "reflog-internals", "Explain the reflog storage.", "The reflog is stored in `.git/logs/` as plain text files. It records when branch tips and HEAD are updated. Each entry contains the old and new hashes, the committer, and a timestamp. It is local to the repository."],

  // ==================== GITHUB ACTIONS & ADVANCED TOPICS (Hard) ====================
  ["Git", "How do you create a GitHub Action that runs on push to the main branch?", "action-on-push", "Explain the workflow.", "Create `.github/workflows/ci.yml` with: `on: push: branches: - main`. Define jobs and steps. For example, to run a build script, use `uses: actions/checkout@v3` and then a run step."],
  ["Git", "What are GitHub Workflow triggers (events)? Name a few.", "workflow-triggers", "List common events.", "Triggers include: `push`, `pull_request`, `schedule` (cron), `workflow_dispatch` (manual), `release`, `issue_comment`, and many more. They determine when a workflow runs."],
  ["Git", "What is a GitHub Actions matrix strategy?", "matrix-strategy", "Explain the feature.", "A matrix strategy allows you to run a job with multiple configurations (e.g., different OS versions, Node versions). It combines each set of variables to create multiple parallel runs, useful for testing across environments."],
  ["Git", "How do you use a GitHub Action from another repository?", "reusable-action", "Explain action usage.", "You can use actions from the GitHub Marketplace or from other repositories by referencing them in your workflow: `uses: user/repo@tag` or `uses: actions/checkout@v3`."],
  ["Git", "What is GitHub Codespaces and how does it relate to Git?", "codespaces", "Explain the cloud IDE.", "GitHub Codespaces provides cloud-based development environments that are connected to your repository. It automatically sets up Git, allowing you to code and commit directly from a browser-based VS Code instance."],
  ["Git", "What is GitHub Pages and how is it used?", "github-pages", "Explain the hosting feature.", "GitHub Pages allows you to host static websites directly from a repository. You can publish from a branch (e.g., `gh-pages`) or the `/docs` folder. It's often used for project documentation, personal sites, and landing pages."],
  ["Git", "What is the difference between a GitHub Action and a GitHub App?", "action-vs-app", "Explain the difference.", "A GitHub Action is a unit of work within a workflow, typically used for CI/CD tasks (e.g., building, testing). A GitHub App is a more complex integration that can respond to GitHub events via API and run independently of workflows, often used for external services."],
  ["Git", "How do you create a release in GitHub from a tag?", "create-release", "Explain the process.", "1. Create a tag: `git tag -a v1.0 -m \"Release\"` and push it. 2. On GitHub, go to Releases, click 'Draft a new release', select the tag, add release notes, and publish. This creates a downloadable archive and release assets."],
  ["Git", "What is the GitHub API and how is it used?", "github-api", "Explain the API.", "The GitHub API provides REST and GraphQL interfaces to programmatically interact with GitHub resources (repos, issues, PRs, actions). It is used for automation, integrating with external tools, and building GitHub Apps."],
  ["Git", "How do you manage environment-specific secrets in GitHub Actions?", "env-secrets", "Explain environment secrets.", "You can create environments (e.g., staging, production) in repository settings and add secrets specific to each environment. In a workflow, reference the environment and its secrets are available."],

  // ==================== ADDITIONAL SCENARIO-BASED (Hard) ====================
  ["Git", "How would you handle a situation where two developers have diverged branches and you need to get them back in sync?", "sync-diverged-branches", "Explain the process.", "Use `git fetch` to get the remote changes. Then either merge (`git merge origin/branch`) or rebase (`git rebase origin/branch`) to integrate the changes. Resolve conflicts. Then push."],
  ["Git", "You need to include a hotfix directly into the main branch without waiting for a PR. How do you do it safely?", "hotfix-direct", "Explain the approach.", "Create a hotfix branch from main, apply the fix, test it, and then merge it directly into main (and develop if using Git Flow). For safety, ensure CI passes and consider using a protected branch that requires a PR even for hotfixes."],
  ["Git", "How do you handle a situation where a PR is submitted with many commits but you want to clean it up before merging?", "pr-cleanup", "Explain the process.", "Ask the contributor to rebase and squash commits using `git rebase -i`. Alternatively, use GitHub's squash and merge option when merging the PR. Or, locally fetch the PR branch and squash manually before merging."],
  ["Git", "How do you find and delete all branches that have been merged into main?", "delete-merged-branches", "Explain the commands.", "`git branch --merged main | grep -v \"main\" | xargs git branch -d` locally. For remote: `git branch -r --merged main | grep -v \"main\" | sed 's/origin\///' | xargs -n 1 git push --delete origin."],
  ["Git", "How do you recover a deleted branch that hasn't been merged?", "recover-deleted-branch", "Explain recovery.", "Use `git reflog` to find the hash of the branch tip before deletion. Then create a new branch with `git branch <branch-name> <hash>`."],
  ["Git", "What is the difference between a local branch and a remote-tracking branch?", "local-vs-remote-tracking", "Explain the distinction.", "A local branch is a branch you work on locally. A remote-tracking branch (e.g., `origin/main`) is a read-only local copy of a branch from a remote, updated on `git fetch` or `git pull`. It tracks the state of the remote branch."],
  ["Git", "How do you set up Git to ignore a specific directory globally?", "global-gitignore", "Explain the setup.", "Create a file `~/.gitignore_global` with the patterns. Run `git config --global core.excludesfile ~/.gitignore_global`. This ignores those patterns for all repositories."],
  ["Git", "How do you change the default branch from `master` to `main`?", "change-default-branch", "Explain the steps.", "1. Locally rename: `git branch -m master main`. 2. Push the new branch: `git push -u origin main`. 3. On GitHub, go to repository settings, change the default branch to `main`. 4. Delete the old remote branch: `git push origin --delete master`. 5. Update local tracking."],
  ["Git", "What is the purpose of `git show`?", "git-show", "Explain the command.", "`git show <commit-hash>` displays the details of a commit: author, date, diff, and the tree. It is useful for reviewing a specific commit. Without a hash, it shows the latest commit."],
  ["Git", "How do you create a merge commit even if a fast-forward is possible?", "merge-no-ff", "Explain the flag.", "Use `git merge --no-ff <branch>` to force a merge commit. This is useful to preserve the feature branch history and clearly indicate that a branch was merged."]
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain GIT concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade-offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing GIT commands without explaining the safety, performance, or operational trade-off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "Git" },
    update: { name: "Git", group: "Technology", description: "Git interview questions." },
    create: { name: "Git", slug: "Git", group: "Technology", description: "Git interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "git" } },
    update: {},
    create: { name: "Git", slug: "git", categoryId: category.id },
  });

  for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
    const [, question, slug, shortDescription, sampleAnswer] = topics[topicIndex];
    const commonMistakes = buildCommonMistakes(question);
    const followUpQuestions = [
      topics[(topicIndex + 1) % topics.length][1],
      topics[(topicIndex + 2) % topics.length][1],
      topics[(topicIndex + 3) % topics.length][1],
    ];
    await prisma.interviewQuestion.upsert({
      where: { slug },
      update: {
        question,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["git"],
        isPublished: true,
      },
      create: {
        question,
        slug,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["git"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} GIT questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");