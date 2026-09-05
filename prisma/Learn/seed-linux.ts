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
  let deepDive = `Study ${title} as a practical Linux skill, not as a memorised command. Start with the problem it solves: ${subject}. The critical questions are: how does this interact with the kernel, what is the performance impact, and how do you troubleshoot when it fails?`;

  if (lowerTitle.includes("filesystem")) {
    deepDive += " The Linux filesystem is a tree starting at `/`. Key directories: `/bin` (essential commands), `/etc` (configs), `/var` (variable data), `/tmp` (temporary), `/home` (user homes). Understand mount points, inodes, and file types (regular, directory, symlink, device, socket). Use `df -h` for disk usage, `du -sh` for directory sizes, and `find` for searching.";
  } else if (lowerTitle.includes("permission")) {
    deepDive += " Linux permissions: read (4), write (2), execute (1) for owner, group, others. `chmod` changes permissions, `chown` changes ownership. Special permissions: SUID, SGID, and sticky bit. Use `umask` to set default permissions for new files. Principle of least privilege: grant only what's needed.";
  } else if (lowerTitle.includes("process")) {
    deepDive += " A process is a running instance of a program. Use `ps aux` to list processes, `top` or `htop` for real‑time monitoring, and `kill` to send signals (SIGTERM, SIGKILL). Processes have states: Running, Sleeping, Zombie. Use `nice` to adjust priority. Understand the process lifecycle and how `fork()`/`exec()` work.";
  } else if (lowerTitle.includes("thread")) {
    deepDive += " Threads are lightweight processes sharing the same memory space. Linux implements threads via clone() (NPTL). Use `ps -eLf` or `top -H` to see threads. Threads allow concurrency within a process. Understand the difference between user‑space and kernel‑space threads. Tools: `strace` to trace system calls.";
  } else if (lowerTitle.includes("shell")) {
    deepDive += " The shell (bash, zsh, sh) is a command interpreter. Understand scripting: variables, loops, conditionals, functions, and exit codes. Use `set -e` to exit on error, `set -x` for debugging. Shell expansions: tilde, brace, parameter, command substitution. Master `.bashrc`, `.profile`, and environment variables.";
  } else if (lowerTitle.includes("grep")) {
    deepDive += " grep searches text with regex. Options: `-i` (case‑insensitive), `-v` (invert), `-r` (recursive), `-l` (list file names), `-c` (count). Use `grep -E` for extended regex. Combine with pipes to filter command output. Common use: `ps aux | grep nginx`.";
  } else if (lowerTitle.includes("awk")) {
    deepDive += " awk is a pattern‑scanning language. It splits lines into fields (`$1`, `$2`, etc.). Basic syntax: `awk '{print $1}'`. Use `BEGIN` and `END` blocks for setup/final. Built‑in variables: NF (number of fields), NR (record number). Awk can do arithmetic and string manipulation, useful for reports.";
  } else if (lowerTitle.includes("sed")) {
    deepDive += " sed is a stream editor. Common operations: `s/pattern/replacement/g` (substitute), `d` (delete), `p` (print). Use `-i` to edit files in‑place. Can use regex and addressing (e.g., `/error/,/success/p`). Combine with pipes for text transformation.";
  } else if (lowerTitle.includes("pipe")) {
    deepDive += " Pipes (`|`) connect stdout of one command to stdin of another. This is the Unix philosophy: small tools that do one thing well. Use `xargs` to convert stdin to command arguments. Pipes are efficient—data flows in memory without intermediate files.";
  } else if (lowerTitle.includes("environment variable")) {
    deepDive += " Environment variables are key‑value pairs inherited by child processes. `export` makes them available. Common variables: `PATH` (command search path), `HOME`, `LANG`, `PWD`. Use `printenv` to list, `set` to see shell variables. Differentiate between shell variables and environment variables.";
  } else if (lowerTitle.includes("networking")) {
    deepDive += " Networking commands: `ifconfig` / `ip addr` (show interfaces), `ping` (ICMP reachability), `netstat` / `ss` (sockets), `traceroute` (path), `dig` / `nslookup` (DNS), `curl` / `wget` (HTTP). Use `iptables` for firewall rules. Troubleshoot with `tcpdump` for packet capture.";
  } else if (lowerTitle.includes("ssh")) {
    deepDive += " SSH is secure remote access. Use `ssh user@host`, `scp` for file copy, `rsync` for sync. Manage keys with `ssh-keygen`; copy with `ssh-copy-id`. Understand `~/.ssh/authorized_keys`. Use `-L`/`-R` for port forwarding (tunnelling). Keep SSH daemon secure: disable root login, use key auth.";
  } else if (lowerTitle.includes("log")) {
    deepDive += " Logs are stored in `/var/log/`. Key logs: `syslog`, `auth.log`, `kern.log`, `dmesg`. Use `tail -f` for real‑time, `less` to view. `journalctl` for systemd logs: `journalctl -u service`. Log rotation with `logrotate`. Set up remote logging for centralised monitoring.";
  } else if (lowerTitle.includes("systemd")) {
    deepDive += " systemd is the init system and service manager. Use `systemctl` to start/stop/enable services. Units: `.service`, `.timer`, `.socket`, `.mount`. Manage with `systemctl status`, `journalctl -u`. Systemd boots faster with parallelisation. Understand targets (multi‑user.target, graphical.target).";
  } else if (lowerTitle.includes("cron")) {
    deepDive += " cron schedules periodic tasks. Edit with `crontab -e`. Syntax: `min hour day month dayofweek command`. Use `@reboot`, `@hourly`, etc. Logs in `/var/log/cron`. For more complex, use `systemd timers`. Ensure scripts are idempotent and logging is handled.";
  } else if (lowerTitle.includes("troubleshooting")) {
    deepDive += " Troubleshoot systematically: check logs (`/var/log/`, journalctl), monitor processes (`ps`, `top`), check network (`ping`, `ss`), disk space (`df -h`), memory (`free -m`). Use `strace` to trace system calls, `ltrace` for library calls. Isolate the problem by testing components individually.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Write the most common command(s).\n3. Experiment with a practice environment (VM or container).\n4. Combine with other tools (e.g., pipes with grep, awk).\n5. Troubleshoot a common error scenario.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised commands.\n- Describe a real‑world scenario where you used it.\n- Mention performance implications and common pitfalls.\n- Demonstrate how to combine it with other Linux tools.\n- Show how you would debug or investigate issues.\n\n### Practice task\nCreate a small hands‑on exercise for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write a command sequence or script, then break it intentionally to see the error, then fix it. Document your observations.`;
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

async function seedLinuxCategory() {
  const linuxCategory: CategorySeed = {
    name: "Linux",
    slug: "linux",
    description: "Master Linux from fundamentals to troubleshooting: filesystem, permissions, processes, threads, shell scripting, text processing (grep, awk, sed), pipes, environment variables, networking commands, SSH, logs, systemd, cron, and advanced troubleshooting.",
    icon: "LINUX",
    sortOrder: 0,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core Linux topics for developers, DevOps, and cloud engineers.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Linux Basics",
            slug: "basics",
            description: "Filesystem, permissions, processes, and threads.",
            topics: [
              {
                title: "Linux Filesystem – Structure and Navigation",
                slug: "filesystem",
                description: "Understanding the directory hierarchy and file types.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Directory Structure", content: "/ (root), /bin, /etc, /var, /tmp, /home, /proc, /dev." },
                  { title: "File Types", content: "Regular, directory, symlink, block/character device, socket, pipe." },
                  { title: "Navigation Commands", content: "cd, ls, pwd, mkdir, rm, mv, cp, find." },
                ],
              },
              {
                title: "Permissions and Ownership",
                slug: "permissions",
                description: "chmod, chown, umask, SUID, SGID, sticky bit.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Permission Types", content: "read (4), write (2), execute (1)." },
                  { title: "Changing Permissions", content: "chmod (numeric/symbolic), chown, chgrp." },
                  { title: "Special Permissions", content: "SUID (setuid), SGID (setgid), sticky bit." },
                ],
              },
              {
                title: "Process Management – ps, top, kill, nice",
                slug: "processes",
                description: "Listing, monitoring, and controlling processes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Process States", content: "Running, Sleeping, Zombie, Stopped." },
                  { title: "Commands", content: "ps, top/htop, kill, killall, pkill, nice, renice." },
                  { title: "Signals", content: "SIGTERM (15), SIGKILL (9), SIGHUP (1), SIGINT (2)." },
                ],
              },
              {
                title: "Threads – Lightweight Processes",
                slug: "threads",
                description: "Understanding and viewing threads.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Thread vs Process", content: "Shared memory vs separate address space." },
                  { title: "Viewing Threads", content: "ps -eLf, top -H, pstree -p." },
                  { title: "Thread Synchronization", content: "Mutexes, condition variables, etc." },
                ],
              },
            ],
          },
          {
            title: "Shell and Text Processing",
            slug: "shell-text",
            description: "Shell scripting, grep, awk, sed, pipes.",
            topics: [
              {
                title: "Shell and Scripting Fundamentals",
                slug: "shell",
                description: "Bash basics, variables, conditionals, loops, functions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Shell Types", content: "bash, zsh, sh, ksh." },
                  { title: "Variables and Expansion", content: "VAR=value, $VAR, ${VAR}, command substitution." },
                  { title: "Conditional Structures", content: "if, case, test ([ ]), [[ ]]." },
                  { title: "Loops", content: "for, while, until." },
                ],
              },
              {
                title: "grep – Searching with Regular Expressions",
                slug: "grep",
                description: "Pattern matching in files and output.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Basic Usage", content: "grep pattern file; -i (ignore case), -v (invert), -r (recursive)." },
                  { title: "Regex", content: "Basic vs extended (grep -E)." },
                  { title: "Context Options", content: "-A, -B, -C (after/before/context)." },
                ],
              },
              {
                title: "awk – Pattern Scanning and Processing",
                slug: "awk",
                description: "Field extraction, reporting, and simple calculations.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Syntax", content: "awk 'pattern { action }' file." },
                  { title: "Fields", content: "$1, $2, ..., $NF, NR, FNR." },
                  { title: "Built‑ins", content: "print, printf, length, substr, split." },
                ],
              },
              {
                title: "sed – Stream Editor",
                slug: "sed",
                description: "Text substitution, deletion, and insertion.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Substitution", content: "s/pattern/replacement/g." },
                  { title: "Deleting Lines", content: "/pattern/d." },
                  { title: "In‑place Editing", content: "sed -i 's/old/new/g' file." },
                ],
              },
              {
                title: "Pipes and Redirection – Connecting Commands",
                slug: "pipes",
                description: "Using |, >, >>, 2>, tee, xargs.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Pipes", content: "Command1 | Command2." },
                  { title: "Redirection", content: "> (overwrite), >> (append), 2> (stderr)." },
                  { title: "xargs", content: "Build and execute command lines." },
                ],
              },
            ],
          },
          {
            title: "Environment, Networking, and System",
            slug: "env-net-system",
            description: "Environment variables, networking commands, SSH, logs, systemd, cron.",
            topics: [
              {
                title: "Environment Variables – PATH, HOME, etc.",
                slug: "env-vars",
                description: "Setting, exporting, and viewing environment variables.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Common Variables", content: "PATH, HOME, LANG, SHELL, PWD, USER." },
                  { title: "Setting", content: "export VAR=value; unset VAR." },
                  { title: "Scope", content: "Shell vs environment variables." },
                ],
              },
              {
                title: "Networking Commands – ping, ss, netstat, curl, dig",
                slug: "networking",
                description: "Checking network connectivity, interfaces, and DNS.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Interface Info", content: "ip addr, ifconfig, ip route." },
                  { title: "Reachability", content: "ping, traceroute." },
                  { title: "Socket Info", content: "ss -tulpan, netstat -tulpan." },
                  { title: "DNS", content: "dig, nslookup, host." },
                  { title: "HTTP", content: "curl, wget." },
                ],
              },
              {
                title: "SSH – Secure Shell",
                slug: "ssh",
                description: "Remote login, key management, port forwarding.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Basic Usage", content: "ssh user@host, scp, rsync." },
                  { title: "Key Authentication", content: "ssh-keygen, ssh-copy-id." },
                  { title: "Port Forwarding", content: "-L (local), -R (remote)." },
                  { title: "Config File", content: "~/.ssh/config." },
                ],
              },
              {
                title: "Logs and journalctl",
                slug: "logs",
                description: "Viewing and managing system logs.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Log Locations", content: "/var/log/, /var/log/syslog, /var/log/auth.log." },
                  { title: "Viewing", content: "tail -f, less, grep." },
                  { title: "systemd Logs", content: "journalctl -u service, journalctl -f." },
                ],
              },
              {
                title: "systemd – Service Management",
                slug: "systemd",
                description: "Starting, stopping, enabling services, and targets.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Unit Types", content: ".service, .timer, .socket, .mount." },
                  { title: "Commands", content: "systemctl start/stop/restart/status/enable/disable." },
                  { title: "Targets", content: "multi-user.target, graphical.target, rescue.target." },
                ],
              },
              {
                title: "cron – Scheduled Jobs",
                slug: "cron",
                description: "Setting up periodic tasks.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Crontab Syntax", content: "min hour day month dayofweek command." },
                  { title: "Special Strings", content: "@reboot, @hourly, @daily, @weekly, @monthly." },
                  { title: "Logging", content: "/var/log/cron, redirection." },
                ],
              },
              {
                title: "Troubleshooting – Common Problems and Solutions",
                slug: "troubleshooting",
                description: "Systematic approach to diagnose issues.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Check Logs", content: "journalctl, /var/log/syslog, dmesg." },
                  { title: "Process and Resource Usage", content: "top, free, df -h, iostat, netstat." },
                  { title: "Network Diagnostics", content: "ping, traceroute, curl, ss." },
                  { title: "Strace and ltrace", content: "Trace system calls and library calls." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(linuxCategory);
  console.log("✅ Linux category seeded (ultra‑detailed)");
}

async function main() {
  await seedLinuxCategory();
}

main()
  .catch((error) => {
    console.error("Linux seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });