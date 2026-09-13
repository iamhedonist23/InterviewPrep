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
  let deepDive = `Study ${title} as a practical Docker skill, not as a theoretical concept. Begin with the problem it solves: ${subject}. The critical questions are: what are the trade‑offs between isolation and performance, how does it fit into the container lifecycle, and what are the security implications?`;

  if (lowerTitle.includes("container") || lowerTitle.includes("image") || lowerTitle.includes("dockerfile")) {
    deepDive += " A container is a lightweight, isolated runtime environment. Images are immutable templates that define the container's filesystem and startup command. The Dockerfile is the recipe: each instruction (FROM, RUN, COPY, CMD) adds a layer. Layer caching speeds up builds—order matters. Always use specific tags (not 'latest') and keep images small by using minimal base images (Alpine) and cleaning up temporary files in the same RUN layer.";
  } else if (lowerTitle.includes("compose")) {
    deepDive += " Docker Compose defines multi‑container applications in a YAML file. It simplifies development and testing. Master service definitions, networking (automatic network creation), volumes, environment variables, and profiles. Use depends_on for ordering, but not for readiness—use health checks and wait‑for‑it scripts. For production, consider using Compose with Docker Swarm or translate to Kubernetes manifests.";
  } else if (lowerTitle.includes("volume") || lowerTitle.includes("storage")) {
    deepDive += " Volumes are the preferred way to persist data. They are managed by Docker and stored outside the container's union filesystem. Bind mounts (host directories) are also common but have permission issues and are less portable. Use named volumes for production. Understand the difference between volume drivers and volume plugins for remote storage. Always mount volumes for database containers to avoid data loss.";
  } else if (lowerTitle.includes("network") || lowerTitle.includes("bridge") || lowerTitle.includes("overlay")) {
    deepDive += " Docker networking enables container‑to‑container communication. Default bridge is user‑defined bridge (better isolation and automatic DNS). Host network gives performance but loses isolation. Overlay networks are for Swarm/Kubernetes multi‑host communication. Use 'docker network' to create and manage. Understand port publishing (-p) and how to expose ports. Use custom networks for service separation.";
  } else if (lowerTitle.includes("security") || lowerTitle.includes("rootless") || lowerTitle.includes("seccomp")) {
    deepDive += " Container security is multi‑layered. Run containers as non‑root user (USER instruction). Use read‑only root filesystems when possible. Drop capabilities (cap_drop) and set resource limits (memory, CPU). Use seccomp profiles to restrict system calls. Scan images for vulnerabilities (Trivy, Clair). Use secret management (Docker secrets in Swarm, or external tools). Keep the host and Docker daemon updated.";
  } else if (lowerTitle.includes("multi-stage") || lowerTitle.includes("build")) {
    deepDive += " Multi‑stage builds allow you to separate build and runtime environments in one Dockerfile. This reduces final image size by discarding build dependencies (compilers, test tools). Use AS to name stages and COPY --from to copy artifacts. This is essential for compiled languages (Go, Java, Rust) and helps keep production images minimal and secure.";
  } else if (lowerTitle.includes("ci/cd") || lowerTitle.includes("pipeline") || lowerTitle.includes("jenkins") || lowerTitle.includes("github actions")) {
    deepDive += " Docker fits seamlessly into CI/CD. Build images in CI pipelines, push to registries (ECR, Docker Hub, GCR), and deploy to environments. Use Docker BuildKit for faster builds and caching. For ephemeral builds, use docker build with --build‑arg for dynamic values. Tag images with commit SHA or version. Implement security scanning as a stage. Use Docker in Docker (dind) or socket mounting carefully—prefer using standard Docker CLI in CI runners.";
  } else if (lowerTitle.includes("spring boot") || lowerTitle.includes("java") || lowerTitle.includes("spring")) {
    deepDive += " Dockerizing Spring Boot apps: use a multi‑stage build to separate build (Maven/Gradle) and runtime (JRE). Use layered JARs (Spring Boot 2.3+) to take advantage of Docker layer caching. Set JVM options via environment variables. Use health checks with Spring Boot Actuator. Ensure the container runs with a non‑root user. For production, use a minimal JRE base (e.g., eclipse‑temurin:17‑jre‑alpine).";
  } else if (lowerTitle.includes("react") || lowerTitle.includes("next.js") || lowerTitle.includes("node")) {
    deepDive += " Dockerizing React/Next.js apps: use a multi‑stage build—build stage (Node), production stage (Node or Nginx for static build). For Next.js, consider standalone output mode to reduce size. For SSR, run with Node. For static, use Nginx to serve files with gzip. Use environment variables with NEXT_PUBLIC_* during build time. For development, use volumes for live reloading with React's HMR or Next.js fast refresh.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core Docker concept in one sentence.\n2. Identify the primary use case and when to avoid it.\n3. List the key commands and common flags.\n4. Understand the security and performance implications.\n5. Practice by writing a minimal working example.

### Interview‑ready checklist
- Explain the concept without relying on memorised commands.
- Describe a real‑world scenario and why Docker is the right tool.
- Discuss the trade‑offs (e.g., performance isolation, image size, security).
- Name common pitfalls and how to avoid them.
- Show how you would integrate this with the rest of the Docker ecosystem.

### Practice task
Create a small hands‑on exercise for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write a brief Dockerfile or compose snippet, run it, and observe the behaviour. Then modify it to demonstrate an edge case or failure mode.`;
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

async function seedDockerCategory() {
  const dockerCategory: CategorySeed = {
    name: "Docker (Containerization)",
    slug: "docker",
    description: "Master Docker from fundamentals to advanced: containers, images, Dockerfile, Compose, volumes, networking, security, multi‑stage builds, CI/CD integration, and application Dockerization.",
    icon: "DOCKER",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER PATH --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Foundations of Docker – containers, images, Dockerfile, and basic operations.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Docker Fundamentals",
            slug: "fundamentals",
            description: "Containers, images, and the Dockerfile.",
            topics: [
              {
                title: "Containers vs Virtual Machines – The Why",
                slug: "containers-vs-vms",
                description: "Understanding the difference and advantages of containers.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What are Containers?", content: "Containers are isolated environments that share the host OS kernel but have their own filesystem, network, and process space. They are lightweight compared to VMs because they don't include a guest OS." },
                  { title: "Containers vs VMs", content: "VMs emulate hardware and include a full OS, offering strong isolation but with more overhead. Containers start in milliseconds, are portable, and are more resource‑efficient." },
                  { title: "Docker Architecture", content: "Docker uses a client‑server architecture. The daemon builds, runs, and manages containers. The client talks to the daemon via REST API." },
                ],
              },
              {
                title: "Docker Images – The Blueprint",
                slug: "images",
                description: "Layers, image registry, and image management.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Image Layers", content: "Each Dockerfile instruction creates a layer. Layers are cached and reused. Images are stored as a series of read‑only layers, with the container adding a writable layer on top." },
                  { title: "Image Registries", content: "Docker Hub, ECR, GCR, etc. Pull/push images with `docker pull` and `docker push`. Tag images with meaningful names and versions." },
                  { title: "Managing Images", content: "List images (`docker images`), remove (`docker rmi`), prune (`docker image prune`). Use `.dockerignore` to exclude files from the build context." },
                ],
              },
              {
                title: "Dockerfile – Building Custom Images",
                slug: "dockerfile",
                description: "Writing Dockerfiles, best practices, and common instructions.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Essential Instructions", content: "`FROM` – base image; `WORKDIR` – working directory; `COPY` / `ADD` – copy files; `RUN` – execute commands; `CMD` / `ENTRYPOINT` – what to run when the container starts. Use `EXPOSE` to document ports." },
                  { title: "Best Practices", content: "Put frequently‑changed steps (e.g., source code) at the end to exploit caching. Combine RUN commands to reduce layers. Use Alpine‑based images where possible. Prefer `COPY` over `ADD` unless you need tar extraction." },
                  { title: "Building an Image", content: "`docker build -t myimage:tag .` – tag and build. Use `--no-cache` to rebuild all layers." },
                ],
              },
            ],
          },
          {
            title: "Docker Compose and Basic Operations",
            slug: "compose-basics",
            description: "Running multi‑container apps, volumes, and networking.",
            topics: [
              {
                title: "Docker Compose – Multi‑Container Orchestration",
                slug: "compose",
                description: "Compose YAML, services, and up/down commands.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Compose File Basics", content: "Define services, networks, and volumes in YAML. Version 3 is the most common. Services are containers; each service has an image or build context, ports, volumes, environment variables, etc." },
                  { title: "Common Commands", content: "`docker-compose up -d` – start in detached mode. `docker-compose down` – stop and remove. `docker-compose logs` – view logs. `docker-compose ps` – list containers." },
                  { title: "Use Cases", content: "Local development, testing, and simple production deployments (with Swarm)." },
                ],
              },
              {
                title: "Volumes – Persistent Data",
                slug: "volumes",
                description: "Named volumes, bind mounts, and data management.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Volume Types", content: "**Named volumes** – managed by Docker, stored in `/var/lib/docker/volumes`. **Bind mounts** – mount host directories into the container. **tmpfs** – in‑memory, ephemeral." },
                  { title: "Managing Volumes", content: "Create with `docker volume create`, list with `docker volume ls`, remove with `docker volume rm`. Use `--mount` or `-v` flags." },
                  { title: "Best Practices", content: "Always use named volumes for database data. Use bind mounts for development to sync code. Avoid storing sensitive data in volumes—use secrets." },
                ],
              },
              {
                title: "Networks – Container Communication",
                slug: "networks",
                description: "Bridge, host, overlay, and user‑defined networks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Network Drivers", content: "**bridge** – default, private network. **host** – uses host's network stack. **overlay** – for Swarm/Kubernetes. **macvlan** – assign MAC addresses." },
                  { title: "User‑Defined Bridges", content: "Provide automatic DNS resolution between containers. Isolated networks improve security." },
                  { title: "Port Publishing", content: "Map container ports to host ports with `-p host:container` or in Compose under `ports`." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE PATH --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Security, multi‑stage builds, and Docker in CI/CD.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Container Security and Multi‑stage Builds",
            slug: "security-stages",
            description: "Hardening containers and optimising images.",
            topics: [
              {
                title: "Container Security – Best Practices",
                slug: "security",
                description: "User namespaces, capabilities, seccomp, and scanning.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Run as Non‑root", content: "Use `USER` instruction in Dockerfile to avoid root in the container. This reduces the impact of container escape." },
                  { title: "Drop Capabilities", content: "Use `--cap-drop=ALL` and add only needed capabilities. For example, drop `CHOWN`, `SETPCAP`, etc." },
                  { title: "Seccomp and AppArmor", content: "Restrict system calls with custom seccomp profiles. AppArmor provides mandatory access control." },
                  { title: "Image Scanning", content: "Use Trivy, Clair, or Docker Scan to find vulnerabilities in images. Integrate into CI." },
                ],
              },
              {
                title: "Multi‑stage Builds – Slimmer Images",
                slug: "multi-stage",
                description: "Separating build and runtime environments.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why Multi‑stage?", content: "Avoid shipping build tools, compilers, and test dependencies to production. Each stage can be based on a different base image." },
                  { title: "Syntax", content: "Use `AS stage_name` and `FROM ... AS builder`. Then `COPY --from=builder /path /final/path`." },
                  { title: "Example", content: "A Go app: first stage with `golang` image to build, second with `alpine` to copy the binary." },
                ],
              },
            ],
          },
          {
            title: "Docker in CI/CD Pipelines",
            slug: "cicd",
            description: "Building, testing, and deploying Docker images in automated pipelines.",
            topics: [
              {
                title: "Docker in CI/CD",
                slug: "cicd-integration",
                description: "Integrating with GitHub Actions, GitLab CI, Jenkins, etc.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Build and Push", content: "Build image, tag with commit SHA or version, push to registry. Use Docker BuildKit for faster builds." },
                  { title: "Caching", content: "Leverage layer caching by ordering instructions. Use `--cache-from` to use previous images as cache." },
                  { title: "Security Scanning", content: "Add a stage to scan the image for vulnerabilities and break the build if critical issues are found." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED PATH --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Dockerizing Spring Boot, React/Next.js, and advanced patterns.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Dockerizing Applications",
            slug: "app-dockerization",
            description: "Best practices for Java/Spring Boot and Node/React/Next.js.",
            topics: [
              {
                title: "Dockerizing Spring Boot Applications",
                slug: "spring-boot",
                description: "Multi‑stage builds, layered JARs, and health checks.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Spring Boot Layered JAR", content: "Use `spring-boot-maven-plugin` with layers configuration. This allows layer‑caching of dependencies, resources, and application code separately." },
                  { title: "Dockerfile Example", content: "Use multi‑stage: first stage builds the JAR, second stage runs it with a JRE image. Set JVM options via environment variables." },
                  { title: "Health Checks", content: "Use `/actuator/health` endpoint with `HEALTHCHECK` instruction or Kubernetes liveness/readiness probes." },
                ],
              },
              {
                title: "Dockerizing React and Next.js Applications",
                slug: "react-next",
                description: "Build and serve React/Next.js with Docker.",
                estimatedMinutes: 24,
                sections: [
                  { title: "React (Static) with Nginx", content: "Build the React app, then serve the static build with an Nginx container. Use a multi‑stage build: node image for build, nginx for serving." },
                  { title: "Next.js (SSR) with Node", content: "Use standalone output mode (`output: 'standalone'`) to reduce size. The standalone folder includes only necessary files." },
                  { title: "Development with Hot Reload", content: "Use bind mounts and environment variables to enable hot reloading (HMR or Fast Refresh)." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP PATH --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common Docker interview questions and troubleshooting.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-interview",
            description: "Questions on images, containers, and commands.",
            topics: [
              {
                title: "Explain the difference between CMD, ENTRYPOINT, and RUN",
                slug: "cmd-entrypoint-run",
                description: "Understanding Dockerfile instruction nuances.",
                estimatedMinutes: 18,
                sections: [
                  { title: "RUN", content: "Executes commands during build and creates a layer." },
                  { title: "CMD", content: "Provides defaults for an executing container; can be overridden. One per Dockerfile." },
                  { title: "ENTRYPOINT", content: "Defines the executable; arguments are appended. Can be used with CMD to provide default args." },
                ],
              },
              {
                title: "How to reduce Docker image size?",
                slug: "reduce-size",
                description: "Techniques to slim down images.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Use Alpine base", content: "Minimal Linux distribution (~5MB)." },
                  { title: "Multi‑stage builds", content: "Discard build dependencies." },
                  { title: "Combine RUN commands", content: "Avoid unnecessary layers." },
                  { title: "Remove package manager caches", content: "Clean up after install." },
                ],
              },
            ],
          },
          {
            title: "Troubleshooting and Scenarios",
            slug: "troubleshoot",
            description: "Common Docker problems and solutions.",
            topics: [
              {
                title: "Container exits immediately – how to debug?",
                slug: "exit-debug",
                description: "Using logs, interactive mode, and commands.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Check logs", content: "`docker logs <container>`." },
                  { title: "Run interactively", content: "`docker run -it image /bin/sh` to explore." },
                  { title: "Check CMD/ENTRYPOINT", content: "Ensure the process runs in the foreground." },
                ],
              },
              {
                title: "Networking issues – container can’t reach another",
                slug: "network-debug",
                description: "DNS resolution, port mappings, and network isolation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Inspect network", content: "`docker network inspect`." },
                  { title: "Use service names in user‑defined bridge", content: "DNS works automatically." },
                  { title: "Check firewalls and security groups", content: "Ensure ports are open." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(dockerCategory);
  console.log("✅ Docker category seeded (ultra‑detailed)");
}

async function main() {
  await seedDockerCategory();
}

main()
  .catch((error) => {
    console.error("Docker seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });