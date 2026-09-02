import { PrismaClient, StudyLevel } from "@prisma/client";

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

        const sections = topicSeed.sections ?? [];
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

async function seedDevOpsCategory() {
  const category: CategorySeed = {
    name: "DevOps",
    slug: "devops",
    description: "Master the culture, practices, and tools that bridge development and operations: CI/CD, automation, containers, orchestration, and monitoring.",
    icon: "DO",
    sortOrder: 19,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand DevOps culture, principles, version control, and continuous integration.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "DevOps Culture and Principles",
            slug: "devops-culture",
            description: "What DevOps is, its history, and core principles.",
            topics: [
              {
                title: "Introduction to DevOps – The Cultural Revolution",
                slug: "intro-devops",
                shortDescription: "Definition, history, and the need for DevOps.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is DevOps", content: "DevOps is a culture, movement, and practice that unifies software development (Dev) and operations (Ops). It emphasises collaboration, communication, integration, and automation. The goal is to shorten the development lifecycle, deliver features faster, and improve reliability." },
                  { title: "The Origins of DevOps", content: "DevOps emerged around 2009, driven by the need to accelerate software delivery. It was popularised by Patrick Debois and the first DevOpsDays conference. The movement grew from the Agile software development community." },
                  { title: "The Three Ways – Core Principles", content: "**The First Way (Flow)**: Principles of flow – work moves quickly from development to operations to the customer. Optimise for speed. **The Second Way (Feedback)**: Fast and continuous feedback loops – detect problems early and learn. **The Third Way (Learning)**: Create a culture of continuous experimentation and learning – take risks, learn from failures, and improve constantly." },
                  { title: "DevOps vs Traditional IT", content: "Traditional IT often has siloed teams (dev vs ops), manual processes, slow releases, and blame culture. DevOps breaks down silos, automates processes, enables continuous delivery, and fosters a blameless culture." },
                ],
              },
              {
                title: "Version Control with Git – The Foundation",
                slug: "git-devops",
                shortDescription: "Essential Git workflows for collaborative development.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Git Basics", content: "Git is a distributed version control system. Every developer has a full copy of the repository. Commands: `init` (create), `clone` (copy), `add` (stage), `commit` (save), `status`, `log`, `diff`, `branch`, `checkout`, `merge`, `rebase`, `pull`, `push`. Understand the distributed nature – you commit locally, then push to remote." },
                  { title: "Branching Strategies", content: "**Git Flow**: Complex, uses `main`, `develop`, `feature`, `release`, `hotfix` branches. Good for large projects with scheduled releases. **GitHub Flow**: Simple, uses `main` and feature branches; merge via PRs. **Trunk‑Based Development**: Developers merge small changes frequently into `main` (or trunk). Encourages CI and reduces merge conflicts." },
                  { title: "Pull Requests and Code Review", content: "PRs are the standard collaboration mechanism. They allow code review, automated checks (CI), and discussion. A PR is opened from a feature branch to `main`; reviewers comment, approve, and merge. This improves quality and knowledge sharing." },
                  { title: "Git Hooks", content: "Hooks are scripts that run on Git events: `pre‑commit` (lint, format), `pre‑push` (run tests), `post‑merge` (install dependencies). They enforce quality gates locally." },
                ],
              },
              {
                title: "Continuous Integration (CI) – The First Step",
                slug: "ci-basics",
                shortDescription: "Automate builds, tests, and feedback with CI.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is CI", content: "Continuous Integration is the practice of merging developer changes frequently (multiple times a day) into a shared mainline. Each merge triggers an automated build and test process. This catches integration issues early." },
                  { title: "Benefits", content: "Early bug detection, reduced merge conflicts, faster feedback to developers, higher code quality, and confidence to release." },
                  { title: "CI Tools", content: "**Jenkins**: Open‑source, highly extensible, plugin‑based, but can be complex. **GitHub Actions**: Integrated with GitHub, YAML‑based, cloud‑native. **GitLab CI**: Built into GitLab, single application. **CircleCI**: Cloud‑based, fast. **Travis CI**: Early cloud CI." },
                  { title: "A Sample CI Pipeline", content: "1. Source – pull code. 2. Build – compile, package (e.g., `npm run build`, `mvn package`). 3. Lint and static analysis (ESLint, SonarQube). 4. Unit tests. 5. Integration tests. 6. Package (Docker image). 7. Push to registry (Docker Hub, ECR). 8. Deploy to staging (optional)." },
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
        description: "Dive into Infrastructure as Code, containerization, and continuous delivery.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Infrastructure as Code (IaC) – Automating Infrastructure",
            slug: "iac",
            description: "Manage infrastructure declaratively with tools like Terraform and Ansible.",
            topics: [
              {
                title: "Terraform – Multi‑Cloud Provisioning",
                slug: "terraform",
                shortDescription: "Declarative infrastructure provisioning with Terraform.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is Terraform", content: "Terraform is an open‑source IaC tool by HashiCorp. It uses declarative configuration files (HCL) to define infrastructure resources. It supports multiple providers (AWS, GCP, Azure, Kubernetes, etc.). You describe the desired state, and Terraform creates/updates resources to match." },
                  { title: "Core Concepts", content: "**Provider**: Plugin that talks to a cloud API (e.g., `aws`). **Resource**: A specific infrastructure object (e.g., `aws_instance`). **Data Source**: Query existing resources. **Variable**: Input values (e.g., region, instance type). **Output**: Expose values (e.g., IP address)." },
                  { title: "Terraform Workflow", content: "1. `terraform init` – initialise providers and modules. 2. `terraform plan` – preview changes. 3. `terraform apply` – apply changes. 4. `terraform destroy` – clean up. State is stored in a state file; use remote backends (S3, Consul) for team collaboration." },
                  { title: "Modules – Reusable Infrastructure", content: "Modules are containers of resources that can be reused across projects. You can use public modules from the Terraform Registry or create your own. They promote DRY (Don't Repeat Yourself)." },
                ],
              },
              {
                title: "Ansible – Configuration Management",
                slug: "ansible",
                shortDescription: "Configuration management and application deployment with Ansible.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Ansible", content: "Ansible is an agentless configuration management tool. It uses YAML playbooks to describe the desired state of a system. It connects via SSH (or WinRM) and applies changes. It's idempotent – running the same playbook multiple times yields the same result." },
                  { title: "Core Concepts", content: "**Inventory**: List of hosts (e.g., `web1`, `db1`). **Module**: Built‑in or custom action (e.g., `copy`, `yum`, `apt`, `service`). **Playbook**: YAML file with a list of tasks. **Role**: Organised set of tasks, handlers, variables, and templates – reusable." },
                  { title: "Idempotency and Jinja2", content: "Ansible tasks are idempotent – they only make changes if the current state differs. Jinja2 templating allows dynamic configuration (e.g., `{{ ansible_os_family }}`)." },
                  { title: "Use Cases", content: "Provisioning servers, installing packages, managing services, deploying applications, and configuration drift correction." },
                ],
              },
              {
                title: "Containers (Docker) – Packaging Applications",
                slug: "docker",
                shortDescription: "Package applications with dependencies into lightweight containers.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is a Container", content: "A container is a lightweight, standalone executable package that includes everything needed to run an application: code, runtime, system tools, libraries, and settings. Containers share the host OS kernel, making them more efficient than VMs." },
                  { title: "Docker Fundamentals", content: "**Image**: A read‑only template (e.g., `ubuntu:20.04`). **Container**: A running instance of an image. **Dockerfile**: A text file with instructions to build an image (e.g., `FROM`, `RUN`, `COPY`, `CMD`). **Registry**: Stores images (Docker Hub, ECR, GCR)." },
                  { title: "Common Commands", content: "`docker build -t myapp .` – build image. `docker run -p 8080:80 myapp` – run container. `docker ps` – list running containers. `docker stop`, `docker rm`. `docker logs` – view logs." },
                  { title: "Multi‑Stage Builds and Best Practices", content: "Multi‑stage builds allow you to use multiple `FROM` statements to create smaller final images by copying only the needed artifacts. Use `.dockerignore` to exclude unnecessary files. Run containers as non‑root." },
                  { title: "Docker Compose – Multi‑Container Apps", content: "Define and run multi‑container applications in a YAML file. Example: web app + database + cache. One command: `docker-compose up`. Great for local development." },
                ],
              },
              {
                title: "Continuous Delivery (CD) – Deploying Automatically",
                slug: "cd-basics",
                shortDescription: "Automate deployment to staging and production.",
                estimatedMinutes: 24,
                sections: [
                  { title: "CD vs CI", content: "CI is about building and testing. CD is about deploying. **Continuous Delivery**: The software is always in a deployable state; deployment to production is manual but automated. **Continuous Deployment**: Every change that passes the pipeline is automatically deployed to production." },
                  { title: "Deployment Strategies", content: "**Blue‑Green**: Two identical environments; switch traffic after validation (zero downtime). **Canary**: Gradually roll out to a subset of users. **Rolling**: Incrementally update instances. **Feature Flags**: Decouple deployment from release – new features are toggled on/off." },
                  { title: "CD Tools", content: "**Spinnaker**: Multi‑cloud CD, supports complex pipelines. **ArgoCD**: GitOps‑driven CD for Kubernetes. **Jenkins**: With plugins. **GitLab CI / GitHub Actions**: Can also handle deployment." },
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
        description: "Orchestration, monitoring, logging, SRE, service mesh, GitOps, security, cloud, and serverless.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Orchestration (Kubernetes) – Managing Containers at Scale",
            slug: "kubernetes",
            description: "Manage containerized applications at scale with Kubernetes.",
            topics: [
              {
                title: "Kubernetes Basics – Pods, Services, Deployments",
                slug: "k8s-basics",
                shortDescription: "Key concepts: Pods, Services, Deployments.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is Kubernetes", content: "Kubernetes (K8s) is an open‑source container orchestration platform. It automates deployment, scaling, and management of containerized applications. It was developed by Google and is now the industry standard." },
                  { title: "Core Concepts", content: "**Pod**: The smallest deployable unit – one or more containers that share network and storage. **Service**: A stable network endpoint that provides load balancing and discovery for a set of pods. **Deployment**: Manages rolling updates and rollbacks of pods. **ConfigMap / Secret**: External configuration and secrets." },
                  { title: "Architecture", content: "**Master Node**: Runs control plane components – API Server (frontend), Scheduler (places pods), Controller Manager (manages controllers), etcd (key‑value store). **Worker Nodes**: Run pods – kubelet (manages pods), kube‑proxy (networking), container runtime (Docker/containerd)." },
                  { title: "Basic Workflow", content: "`kubectl apply -f manifest.yaml` → API Server → Scheduler → kubelet → container starts. To interact: `kubectl get pods`, `kubectl logs`, `kubectl describe`." },
                ],
              },
              {
                title: "Kubernetes Advanced – Helm, Ingress, Operators",
                slug: "k8s-advanced",
                shortDescription: "Helm, Ingress, persistent volumes, operators.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Helm – Package Manager", content: "Helm is the package manager for Kubernetes. Charts are packages of pre‑configured Kubernetes resources. They simplify deployment of complex applications (e.g., Prometheus, PostgreSQL). You can use public charts from Artifact Hub or create your own." },
                  { title: "Ingress – External Access", content: "Ingress exposes HTTP/HTTPS routes from outside the cluster to services. It provides host‑based/path‑based routing, SSL termination, and load balancing. Implemented by controllers like Nginx Ingress, Traefik." },
                  { title: "Persistent Volumes – Storage for Stateful Apps", content: "Persistent Volumes (PV) are storage resources in the cluster. Persistent Volume Claims (PVC) request storage. Used for databases and other stateful applications. Supports many storage backends (EBS, NFS, etc.)." },
                  { title: "Operators – Managing Complex Applications", content: "Operators are custom controllers that manage complex stateful applications (e.g., databases). They automate tasks like backup, scaling, and upgrades. Examples: Prometheus Operator, PostgreSQL Operator." },
                ],
              },
              {
                title: "Service Mesh (Istio) – Advanced Networking",
                slug: "service-mesh",
                shortDescription: "Istio for traffic management, security, and observability.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is a Service Mesh", content: "A service mesh is a dedicated infrastructure layer for managing service‑to‑service communication. It provides features like traffic routing, load balancing, retries, circuit breaking, and observability without changing application code." },
                  { title: "Istio Core Components", content: "**Envoy Proxy**: Sidecar proxy injected into each pod. **Pilot**: Configures the proxies. **Mixer**: Policy and telemetry (now deprecated, replaced by Envoy filters). **Citadel**: Security (mTLS)." },
                  { title: "Features", content: "**Traffic Management**: Canary releases, A/B testing, fault injection. **Security**: mTLS for service‑to‑service encryption, authentication. **Observability**: Distributed tracing, metrics, and access logs." },
                ],
              },
              {
                title: "GitOps – Declarative Continuous Delivery",
                slug: "gitops",
                shortDescription: "GitOps with ArgoCD and Flux.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is GitOps", content: "GitOps is a paradigm where Git is the single source of truth for declarative infrastructure and applications. The desired state of the system is stored in Git; an operator (e.g., ArgoCD) continuously reconciles the live state with the Git state." },
                  { title: "ArgoCD – The GitOps Controller", content: "ArgoCD is a Kubernetes controller that watches Git repositories and automatically syncs the cluster state. It supports preview, rollback, and multi‑cluster deployments. Great for CD." },
                  { title: "Benefits", content: "Auditability (all changes in Git), rollback (revert commit), easier collaboration, and continuous reconciliation." },
                ],
              },
              {
                title: "Monitoring and Observability – Understanding System State",
                slug: "monitoring",
                shortDescription: "Prometheus, Grafana, Loki, and distributed tracing.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Monitoring with Prometheus", content: "Prometheus is a metrics‑based monitoring system. It uses a pull model (scraping endpoints) and stores time‑series data. Query language: PromQL. It integrates with many exporters (Node, MySQL, etc.)." },
                  { title: "Visualization with Grafana", content: "Grafana is a dashboard tool that connects to Prometheus, Loki, and other data sources. You can build custom dashboards, set up alerts, and create panels with PromQL." },
                  { title: "Logging with Loki", content: "Loki is a log aggregation system designed to be lightweight and integrated with Grafana. It indexes metadata (labels) instead of the full text, making it cost‑efficient." },
                  { title: "Distributed Tracing (Jaeger/Zipkin)", content: "Tracing allows you to follow a request across microservices. Jaeger and Zipkin are popular. They show latency bottlenecks and dependencies." },
                ],
              },
              {
                title: "Site Reliability Engineering (SRE) – Applying Software Engineering to Operations",
                slug: "sre",
                shortDescription: "SRE principles, SLIs, SLOs, and error budgets.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is SRE", content: "SRE is a discipline that applies software engineering principles to operations. It was coined by Google. SREs are responsible for reliability, performance, and capacity planning." },
                  { title: "SLIs and SLOs", content: "**SLI**: Service Level Indicator – a quantitative measure (e.g., latency, error rate, availability). **SLO**: Service Level Objective – a target value for an SLI (e.g., 99.9% availability)." },
                  { title: "Error Budgets", content: "The error budget is (100% – SLO). For a 99.9% SLO, the error budget is 0.1% (or about 43 minutes per month). The budget is used to balance innovation (new features) and stability – if the budget is exhausted, work on reliability." },
                  { title: "Toil Reduction", content: "Toil is manual, repetitive operational work. Automate tasks to reduce toil and free time for engineering." },
                ],
              },
              {
                title: "DevSecOps – Security in the Pipeline",
                slug: "devsecops",
                shortDescription: "Security scanning, secrets management, and compliance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Shift‑Left Security", content: "Integrate security earlier in the software development lifecycle. Run security scans (SAST, DAST) in CI. Check dependencies for vulnerabilities." },
                  { title: "Secrets Management", content: "Never hardcode secrets. Use tools like HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets (with external‑secrets). Rotate credentials regularly." },
                  { title: "Container Security", content: "Scan container images for vulnerabilities (Trivy, Clair). Use minimal base images. Run containers as non‑root. Enable AppArmor/SELinux." },
                ],
              },
              {
                title: "Cloud Providers – AWS, GCP, Azure",
                slug: "cloud-providers",
                shortDescription: "Overview of major cloud platforms.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Amazon Web Services (AWS)", content: "The largest cloud provider. Core services: EC2 (compute), S3 (storage), RDS (database), Lambda (serverless), VPC (networking), IAM (security). Strong in enterprise and startups." },
                  { title: "Google Cloud Platform (GCP)", content: "Known for Kubernetes (GKE), Big Data (BigQuery), and AI/ML (Vertex AI). Strong on networking and open source." },
                  { title: "Microsoft Azure", content: "Strong integration with Microsoft stack (Windows, Active Directory). Services: VMs, SQL Database, AKS (Kubernetes), Cognitive Services." },
                ],
              },
              {
                title: "Serverless – No Servers to Manage",
                slug: "serverless",
                shortDescription: "AWS Lambda, Azure Functions, Google Cloud Functions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Serverless", content: "Serverless allows you to run code without provisioning or managing servers. The cloud provider handles scaling, patching, and availability. You pay per execution." },
                  { title: "AWS Lambda", content: "Event‑driven compute service. Supports Node.js, Python, Java, Go, and more. Triggers: S3, DynamoDB, API Gateway, SQS. Good for background tasks, APIs, and event processing." },
                  { title: "Use Cases and Limitations", content: "Ideal for infrequent or bursty workloads. Limitations: timeout (15 min max), memory (10 GB max), cold start latency. Not suitable for long‑running or heavy compute." },
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
        description: "Common DevOps interview questions, tools comparison, and scenario‑based problems.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core DevOps Concepts",
            slug: "core-devops-interview",
            description: "Questions on culture, CI/CD, infrastructure as code, and configuration management.",
            topics: [
              {
                title: "DevOps Culture and Principles",
                slug: "culture-interview",
                shortDescription: "Explain the three ways, CALMS, and the benefits of DevOps.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Three Ways", content: "Flow (speed), Feedback (quality), Learning (continuous improvement)." },
                  { title: "CALMS", content: "Culture, Automation, Lean, Measurement, Sharing – the pillars of DevOps." },
                  { title: "Benefits", content: "Faster time‑to‑market, higher quality, improved collaboration, reduced risk." },
                ],
              },
              {
                title: "CI/CD Tools",
                slug: "cicd-tools-interview",
                shortDescription: "Compare Jenkins, GitHub Actions, GitLab CI, CircleCI.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Jenkins", content: "Open‑source, plugin‑rich, flexible but requires maintenance. Best for complex, custom pipelines." },
                  { title: "GitHub Actions", content: "Integrated with GitHub, YAML‑based, easy to set up, great for open‑source projects." },
                  { title: "GitLab CI", content: "All‑in‑one, integrated with GitLab, powerful and scalable." },
                  { title: "CircleCI", content: "Cloud‑based, fast, good for teams that want minimal overhead." },
                ],
              },
              {
                title: "IaC Tools",
                slug: "iac-interview",
                shortDescription: "Terraform vs Ansible vs CloudFormation vs Pulumi.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Terraform", content: "Declarative, multi‑cloud, state management, huge ecosystem." },
                  { title: "Ansible", content: "Configuration management, agentless, YAML, idempotent." },
                  { title: "CloudFormation", content: "AWS‑specific, declarative, integrates with AWS services." },
                  { title: "Pulumi", content: "Uses general‑purpose programming languages (Python, Go), multi‑cloud." },
                ],
              },
            ],
          },
          {
            title: "Scenario‑Based Questions",
            slug: "scenario-interview",
            description: "Real‑world DevOps problems and solutions.",
            topics: [
              {
                title: "Design a CI/CD Pipeline",
                slug: "pipeline-design",
                shortDescription: "How would you set up a CI/CD pipeline for a microservices application?",
                estimatedMinutes: 24,
                sections: [
                  { title: "Steps", content: "Code → Build (compile, package) → Unit Tests → Security Scans → Build Docker image → Push to registry → Deploy to staging → E2E Tests → Deploy to production (canary/blue‑green)." },
                  { title: "Tools", content: "GitHub Actions (CI), Docker, Kubernetes (or ECS), ArgoCD (CD), Prometheus (monitoring)." },
                ],
              },
              {
                title: "Handling a Production Outage",
                slug: "outage-handling",
                shortDescription: "What do you do when a production service goes down?",
                estimatedMinutes: 22,
                sections: [
                  { title: "Response", content: "Alert on‑call team, diagnose (logs, metrics, traces), rollback if necessary, fix, post‑mortem." },
                  { title: "Prevention", content: "Blast radius reduction, canary deployments, feature flags, better monitoring." },
                ],
              },
              {
                title: "Design a Monitoring Strategy",
                slug: "monitoring-strategy",
                shortDescription: "How would you monitor a distributed system?",
                estimatedMinutes: 22,
                sections: [
                  { title: "Approach", content: "Collect metrics (CPU, memory, request rate, latency), logs (structured), traces. Set up dashboards and alerts for SLIs/SLOs." },
                  { title: "Tools", content: "Prometheus + Grafana, ELK/Loki, Jaeger." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ DevOps category seeded (ultra‑detailed)");
}

async function main() {
  await seedDevOpsCategory();
}

main()
  .catch((error) => {
    console.error("DevOps seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });