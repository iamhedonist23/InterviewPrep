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
  let deepDive = `Study ${title} as a practical Kubernetes skill, not as a theoretical concept. Begin with the problem it solves: ${subject}. The critical questions are: what is the controller pattern, how does reconciliation work, and what are the trade‑offs in terms of control, complexity, and resource usage?`;

  if (lowerTitle.includes("pod")) {
    deepDive += " A Pod is the smallest deployable unit—a group of one or more containers sharing network and storage. Pods are ephemeral; they are not supposed to be long‑lived. Use Pods for containers that need to communicate via localhost or share a volume. Always use higher‑level controllers (Deployments, StatefulSets) to manage Pods. Understand the lifecycle: Pending, Running, Succeeded, Failed, Unknown. Use init containers for pre‑start setup and sidecar containers for auxiliary tasks.";
  } else if (lowerTitle.includes("deployment")) {
    deepDive += " Deployments manage stateless applications. They provide declarative updates: you define the desired state (replicas, image, update strategy), and the controller works to achieve it. Understand rolling updates, maxSurge, maxUnavailable, and rollback. Use readiness and liveness probes to ensure zero‑downtime deployments. Deployments should be your default controller for stateless workloads.";
  } else if (lowerTitle.includes("service")) {
    deepDive += " Services provide stable network endpoints for a set of Pods. Three types: ClusterIP (internal), NodePort (exposes on node ports), LoadBalancer (cloud‑integrated). Use Service discovery via environment variables or DNS (CoreDNS). Headless Services for stateful applications. Understand the selector/label mechanism. Ingress is for HTTP/HTTPS routing, not a Service type—it sits in front of Services.";
  } else if (lowerTitle.includes("configmap") || lowerTitle.includes("secret")) {
    deepDive += " ConfigMaps and Secrets decouple configuration from application code. ConfigMaps are for non‑sensitive data; Secrets are for sensitive data (base64‑encoded). Both can be mounted as volumes or environment variables. For Secrets, consider using external secret management (e.g., Vault) for better security. Never check Secrets into version control—use tools like SealedSecrets or external sync operators.";
  } else if (lowerTitle.includes("namespace")) {
    deepDive += " Namespaces provide isolation and resource scoping. They are useful for multi‑tenant environments, staging/production separation, and team‑based access. Use ResourceQuotas and LimitRanges to control resource usage per namespace. Not all resources are namespaced (e.g., Nodes, PersistentVolumes). Use namespaces to organise and manage access via RBAC.";
  } else if (lowerTitle.includes("ingress")) {
    deepDive += " Ingress is an API object that manages external access to services, typically HTTP/HTTPS. It provides routing rules (host, path) and TLS termination. Use an Ingress Controller (like NGINX, Traefik, AWS ALB) to implement the Ingress rules. Understand annotation‑based configuration for advanced features (rewrite, timeouts). Ingress is often used with cert‑manager for automatic TLS certificates.";
  } else if (lowerTitle.includes("volume") || lowerTitle.includes("persistent")) {
    deepDive += " Volumes in Kubernetes are ephemeral by default. Persistent Volumes (PV) are cluster‑wide storage resources; Persistent Volume Claims (PVC) are requests for storage. Use StorageClasses for dynamic provisioning. Understand access modes (ReadWriteOnce, ReadOnlyMany, ReadWriteMany). For databases, use StatefulSets with PVCs to maintain stable identities and storage.";
  } else if (lowerTitle.includes("statefulset")) {
    deepDive += " StatefulSets are for stateful applications like databases. They provide stable, unique network identifiers (pod‑{ordinal}) and stable storage using PVC templates. Rolling updates are ordered (one at a time). Use headless Services for DNS resolution. StatefulSets require careful planning for backup, restore, and scaling. They are more complex than Deployments; use only when necessary.";
  } else if (lowerTitle.includes("daemonset")) {
    deepDive += " DaemonSets ensure that a Pod runs on every node (or a subset). They are used for node‑level tasks like log collection (Fluentd), monitoring (Prometheus node exporter), or networking. Use nodeSelectors or tolerations to limit nodes. Rolling updates are controlled via updateStrategy (RollingUpdate or OnDelete).";
  } else if (lowerTitle.includes("job") || lowerTitle.includes("cronjob")) {
    deepDive += " Jobs run one‑off or batch tasks to completion. Use Jobs for database migrations, backups, etc. CronJobs schedule Jobs at fixed times (like cron). Understand parallelism, completions, and backoffLimit. For long‑running jobs, consider using ActiveDeadlineSeconds to cap runtime. Always design jobs to be idempotent.";
  } else if (lowerTitle.includes("helm")) {
    deepDive += " Helm is the package manager for Kubernetes. Charts are reusable bundles of YAML templates. Use Helm to manage complex applications with multiple services. Understand the repository system, chart dependencies, values management, and templating with Go templates. Use helm install, upgrade, rollback. For production, consider using Helmfile or Kustomize for environment‑specific overrides.";
  } else if (lowerTitle.includes("scaling") || lowerTitle.includes("hpa") || lowerTitle.includes("vpa")) {
    deepDive += " Scaling in Kubernetes can be manual (`kubectl scale`), horizontal (HPA – based on CPU/memory/custom metrics), or vertical (VPA – adjust resource requests/limits). HPA works on Deployments, StatefulSets, etc. For custom metrics, use Prometheus + custom metrics adapter. Be cautious with VPA in production—it can cause Pod restarts. Also consider cluster autoscaler for node scaling.";
  } else if (lowerTitle.includes("health check") || lowerTitle.includes("probe")) {
    deepDive += " Health checks (probes) are essential for self‑healing. **livenessProbe** – determines if the Pod is running (restart if fails). **readinessProbe** – determines if the Pod is ready to receive traffic (remove from Service if fails). **startupProbe** – for slow‑starting containers, delays liveness/readiness checks. Use HTTP, TCP, or command checks. Proper probes prevent downtime during rollouts.";
  } else if (lowerTitle.includes("security") || lowerTitle.includes("rbac") || lowerTitle.includes("serviceaccount")) {
    deepDive += " Kubernetes security is multi‑layered. **RBAC** controls what users/service accounts can do (Roles/ClusterRoles and RoleBindings/ClusterRoleBindings). Use Namespaces to isolate resources. Use Network Policies for micro‑segmentation. Use Pod Security Policies (or Pod Security Admission) to enforce security at the Pod level. Ensure etcd encryption and secure API server access. Regularly audit with tools like kube‑bench.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core Kubernetes concept in one sentence.\n2. Identify the primary use case and when to avoid it.\n3. List the key kubectl commands for management.\n4. Understand the reconciliation loop and control plane interaction.\n5. Practice by creating a manifest and deploying it.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised YAML.\n- Describe a real‑world scenario and why Kubernetes is the right tool.\n- Discuss the trade‑offs (e.g., complexity, control plane overhead).\n- Name common pitfalls and how to troubleshoot them.\n- Show how you would monitor and observe this resource.\n\n### Practice task\nCreate a small Kubernetes manifest for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write a YAML file, deploy it, and test its behaviour. Then modify it to demonstrate an edge case or failure mode.`;
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

async function seedKubernetesCategory() {
  const kubernetesCategory: CategorySeed = {
    name: "Kubernetes (Container Orchestration)",
    slug: "kubernetes",
    description: "Master Kubernetes from fundamentals to advanced: Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces, Ingress, Volumes, StatefulSets, DaemonSets, Jobs/CronJobs, Helm, Scaling, Health Checks, and Security.",
    icon: "K8S",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER PATH --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Core concepts – Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Core Kubernetes Resources",
            slug: "core-resources",
            description: "Pods, Deployments, Services, ConfigMaps, Secrets, and Namespaces.",
            topics: [
              {
                title: "Pods – The Smallest Deployable Unit",
                slug: "pods",
                description: "Pods, containers, and lifecycle.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is a Pod?", content: "A Pod is a group of one or more containers with shared storage/network. It is the atom of Kubernetes scheduling." },
                  { title: "Pod Lifecycle", content: "Pending, Running, Succeeded, Failed, Unknown. Restart policies: Always, OnFailure, Never." },
                  { title: "Multi‑container Pods", content: "Sidecar, init containers, and ambassador patterns. Use for closely coupled containers." },
                ],
              },
              {
                title: "Deployments – Managing Stateless Applications",
                slug: "deployments",
                description: "Declarative updates, rolling updates, and rollbacks.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Deployment Controller", content: "Manages ReplicaSets to maintain a desired number of Pods with a specific Pod template." },
                  { title: "Update Strategies", content: "RollingUpdate (default) and Recreate. Configure maxSurge and maxUnavailable." },
                  { title: "Rollback", content: "Use `kubectl rollout undo` or revision history. Keep revisionHistoryLimit." },
                ],
              },
              {
                title: "Services – Exposing Pods",
                slug: "services",
                description: "ClusterIP, NodePort, LoadBalancer, and Headless.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Service Types", content: "ClusterIP (internal), NodePort (external via node IP), LoadBalancer (cloud load balancer)." },
                  { title: "Service Discovery", content: "DNS names (service.namespace.svc.cluster.local) and environment variables." },
                  { title: "Headless Services", content: "For StatefulSets, provide direct pod DNS (pod‑ordinal.service)." },
                ],
              },
              {
                title: "ConfigMaps and Secrets – Configuration Management",
                slug: "configmaps-secrets",
                description: "Decouple config and sensitive data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "ConfigMaps", content: "Store non‑sensitive key‑value pairs. Mount as environment variables or volume." },
                  { title: "Secrets", content: "Base64‑encoded data. Use for passwords, tokens. Not secure by default—consider external tools." },
                  { title: "Best Practices", content: "Use immutable ConfigMaps/Secrets for production. Update via rolling deployment." },
                ],
              },
              {
                title: "Namespaces – Isolation and Resource Scoping",
                slug: "namespaces",
                description: "Organizing resources and enforcing quotas.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What are Namespaces?", content: "Virtual clusters within a cluster. Used to separate environments, teams, or tenants." },
                  { title: "Resource Quotas", content: "Limit CPU, memory, and object counts per namespace." },
                  { title: "LimitRanges", content: "Default resource requests/limits per container." },
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
        description: "Ingress, Volumes, StatefulSets, DaemonSets, Jobs/CronJobs.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Workloads and Storage",
            slug: "workloads-storage",
            description: "Ingress, Persistent Volumes, StatefulSets, DaemonSets, Jobs.",
            topics: [
              {
                title: "Ingress – HTTP/HTTPS Routing",
                slug: "ingress",
                description: "Ingress resources and controllers.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Ingress Resource", content: "Define rules for host/path based routing and TLS." },
                  { title: "Ingress Controllers", content: "NGINX, Traefik, AWS ALB, GCE. Implement the ingress spec." },
                  { title: "Annotations", content: "Controller‑specific customisation (rewrite, timeouts, whitelist)." },
                ],
              },
              {
                title: "Volumes and Persistent Storage",
                slug: "volumes",
                description: "PersistentVolume, PersistentVolumeClaim, StorageClass.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Persistent Volumes (PV)", content: "Cluster‑wide storage resource provisioned by admin." },
                  { title: "Persistent Volume Claims (PVC)", content: "Request for storage. Bound to PV based on access modes and size." },
                  { title: "StorageClasses", content: "Dynamic provisioning with provisioners (EBS, GCE‑PD, etc.)." },
                ],
              },
              {
                title: "StatefulSets – Stateful Applications",
                slug: "statefulsets",
                description: "Stable identities and persistent storage.",
                estimatedMinutes: 24,
                sections: [
                  { title: "StatefulSet Characteristics", content: "Stable network ID (pod‑ordinal), ordered creation/deletion, stable storage per pod." },
                  { title: "Headless Service", content: "Used to provide DNS for pods." },
                  { title: "Update Strategies", content: "RollingUpdate (one at a time) and OnDelete." },
                ],
              },
              {
                title: "DaemonSets – Node‑level Services",
                slug: "daemonsets",
                description: "Run a Pod on every node.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Use Cases", content: "Log collectors, monitoring agents, network plugins." },
                  { title: "Node Selectors and Taints", content: "Control where DaemonSet pods run." },
                  { title: "Update Strategy", content: "RollingUpdate (maxUnavailable) or OnDelete." },
                ],
              },
              {
                title: "Jobs and CronJobs – Batch Workloads",
                slug: "jobs-cronjobs",
                description: "One‑off and scheduled tasks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Jobs", content: "Run a task to completion. Config: parallelism, completions, backoffLimit." },
                  { title: "CronJobs", content: "Schedule jobs using cron syntax. Concurrency policy: Allow, Forbid, Replace." },
                  { title: "Best Practices", content: "Idempotent jobs, store logs, handle failures." },
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
        description: "Helm, Scaling, Health Checks, and Security.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Helm – Package Manager for Kubernetes",
            slug: "helm",
            description: "Charts, templating, and releases.",
            topics: [
              {
                title: "Helm Fundamentals",
                slug: "helm",
                description: "Chart structure, values, and templating.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Charts", content: "Collection of templates (YAML) and values." },
                  { title: "Releases", content: "A chart installed in a namespace with a release name." },
                  { title: "Templating", content: "Go templates, functions, and pipelines. Use .Values, .Release, .Chart." },
                ],
              },
            ],
          },
          {
            title: "Scaling and Health Checks",
            slug: "scaling-health",
            description: "HPA, VPA, and probes.",
            topics: [
              {
                title: "Horizontal Pod Autoscaling (HPA)",
                slug: "hpa",
                description: "Scaling based on CPU, memory, or custom metrics.",
                estimatedMinutes: 22,
                sections: [
                  { title: "HPA Basics", content: "Targets Deployments/StatefulSets. Uses metrics from Metrics Server." },
                  { title: "Custom Metrics", content: "Use Prometheus Adapter or custom API." },
                  { title: "Behaviour", content: "Stabilisation window, scale up/down policies." },
                ],
              },
              {
                title: "Vertical Pod Autoscaling (VPA)",
                slug: "vpa",
                description: "Adjusting resource requests/limits.",
                estimatedMinutes: 18,
                sections: [
                  { title: "VPA Modes", content: "Off, Initial, Auto, Recreate." },
                  { title: "Limitations", content: "Pod restarts, conflict with HPA." },
                ],
              },
              {
                title: "Health Checks – Liveness, Readiness, Startup Probes",
                slug: "probes",
                description: "Ensuring application health and zero‑downtime.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Liveness Probe", content: "Restart if fails." },
                  { title: "Readiness Probe", content: "Remove from endpoints if fails." },
                  { title: "Startup Probe", content: "Delays other probes for slow‑starting apps." },
                ],
              },
            ],
          },
          {
            title: "Kubernetes Security",
            slug: "security",
            description: "RBAC, ServiceAccounts, Pod Security, Network Policies.",
            topics: [
              {
                title: "RBAC – Authorization",
                slug: "rbac",
                description: "Roles, ClusterRoles, Bindings.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Roles & ClusterRoles", content: "Define permissions on resources." },
                  { title: "RoleBindings & ClusterRoleBindings", content: "Bind to users, groups, or ServiceAccounts." },
                  { title: "ServiceAccounts", content: "Identity for Pods. Use with roles." },
                ],
              },
              {
                title: "Pod Security Standards and Admission",
                slug: "pod-security",
                description: "Pod Security Standards (PSS) and Admission Controllers.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Pod Security Standards", content: "Privileged, Baseline, Restricted." },
                  { title: "Pod Security Admission", content: "Enforce PSS at namespace level." },
                  { title: "SecurityContext", content: "Set user IDs, capabilities, read‑only root filesystem." },
                ],
              },
              {
                title: "Network Policies – Micro‑segmentation",
                slug: "network-policies",
                description: "Control ingress/egress traffic between Pods.",
                estimatedMinutes: 20,
                sections: [
                  { title: "NetworkPolicy Resources", content: "Select Pods, define ingress/egress rules." },
                  { title: "Egress and Ingress Rules", content: "Whitelist based on namespace, pod labels, IP blocks." },
                  { title: "CNI Support", content: "Calico, Cilium, Weave, etc. Provide network policy enforcement." },
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
        description: "Common Kubernetes interview questions and troubleshooting.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-interview",
            description: "Questions on resources and design.",
            topics: [
              {
                title: "Explain the difference between Deployments, StatefulSets, and DaemonSets",
                slug: "deploy-vs-stateful-vs-daemon",
                description: "Understanding the right controller for each workload.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Deployment", content: "Stateless, scalable, interchangeable pods." },
                  { title: "StatefulSet", content: "Stateful, stable identity, ordered updates." },
                  { title: "DaemonSet", content: "One pod per node, for node‑specific tasks." },
                ],
              },
              {
                title: "How does a Service work?",
                slug: "service-deep",
                description: "ClusterIP, kube‑proxy, and endpoints.",
                estimatedMinutes: 20,
                sections: [
                  { title: "ClusterIP", content: "Virtual IP. kube‑proxy creates iptables/IPVS rules." },
                  { title: "Endpoints", content: "Service selects pods by labels and creates endpoints." },
                  { title: "DNS", content: "CoreDNS resolves service names." },
                ],
              },
            ],
          },
          {
            title: "Troubleshooting",
            slug: "troubleshoot",
            description: "Common issues and debugging techniques.",
            topics: [
              {
                title: "Pod stuck in Pending – common causes",
                slug: "pending-debug",
                description: "Insufficient resources, PVC binding, node selector mismatch.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Describe pod", content: "`kubectl describe pod` shows events." },
                  { title: "Check nodes", content: "`kubectl describe node` for resource availability." },
                ],
              },
              {
                title: "Application not reachable – Service and Ingress debugging",
                slug: "service-debug",
                description: "Endpoints, NetworkPolicy, Ingress controller logs.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Check endpoints", content: "`kubectl get endpoints` to see if pods are selected." },
                  { title: "Ingress logs", content: "Check controller logs for routing errors." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(kubernetesCategory);
  console.log("✅ Kubernetes category seeded (ultra‑detailed)");
}

async function main() {
  await seedKubernetesCategory();
}

main()
  .catch((error) => {
    console.error("Kubernetes seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });