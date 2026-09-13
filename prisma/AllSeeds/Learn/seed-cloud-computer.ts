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
  let deepDive = `Study ${title} as a practical cloud engineering skill, not as a memorised service description. Start with the business problem this service solves: ${subject}. The critical questions are: what are the cost implications, what are the performance and availability characteristics, what are the security boundaries, and how does it integrate with other services in the AWS ecosystem?`;

  if (lowerTitle.includes("ec2") || lowerTitle.includes("compute") || lowerTitle.includes("instance")) {
    deepDive += " EC2 provides resizable compute capacity. Understand instance families (general purpose, compute‑optimized, memory‑optimized, storage‑optimized, accelerated computing), purchase options (On‑Demand, Reserved, Spot, Savings Plans), and storage options (EBS, Instance Store, EFS). Always right‑size based on workload—over‑provisioning wastes cost, under‑provisioning hurts performance. Use Auto Scaling and Elastic Load Balancing for elasticity and fault tolerance.";
  } else if (lowerTitle.includes("s3") || lowerTitle.includes("storage") || lowerTitle.includes("bucket")) {
    deepDive += " S3 is object storage for any data volume. Understand storage classes (Standard, Intelligent‑Tiering, Infrequent Access, Glacier, Deep Archive) and their cost‑performance trade‑offs. Master versioning, lifecycle policies, and replication. Security: use bucket policies, IAM, and presigned URLs. Consider S3 Transfer Acceleration for large uploads. S3 is not a filesystem—it is an eventually‑consistent object store (strongly consistent for PUTs/GETs/DELETEs in most regions).";
  } else if (lowerTitle.includes("vpc") || lowerTitle.includes("networking") || lowerTitle.includes("subnet") || lowerTitle.includes("security group")) {
    deepDive += " VPC is your virtual network in AWS. Master CIDR blocks, subnets (public/private), route tables, Internet Gateway, NAT Gateway, VPC Peering, and Transit Gateway. Security Groups (stateful) and Network ACLs (stateless) are your primary network security controls. Understand VPC Flow Logs for monitoring. Design for high availability by spreading subnets across multiple Availability Zones.";
  } else if (lowerTitle.includes("iam") || lowerTitle.includes("security") || lowerTitle.includes("policy")) {
    deepDive += " IAM is the foundation of AWS security. Understand the principle of least privilege. Master the components: Users, Groups, Roles, Policies (AWS managed vs customer managed), and identity federation (SAML, OIDC). Policy evaluation logic: explicit deny overrides allow. Use IAM Access Analyzer to identify unused permissions. For cross‑account access, use roles and trust policies.";
  } else if (lowerTitle.includes("rds") || lowerTitle.includes("database") || lowerTitle.includes("aurora")) {
    deepDive += " RDS is a managed relational database service. Understand the supported engines (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB) and Aurora (cloud‑native, MySQL/PostgreSQL compatible). Master backup & restore (automated snapshots, point‑in‑time recovery), read replicas for read scaling, Multi‑AZ for high availability, and performance insights. Use Parameter Groups and Option Groups to fine‑tune engine settings.";
  } else if (lowerTitle.includes("lambda") || lowerTitle.includes("serverless") || lowerTitle.includes("function")) {
    deepDive += " Lambda is the core of serverless compute. Understand the execution model—each invocation runs in a fresh or reused execution context. Pay attention to cold starts, concurrency limits, and timeout (up to 15 minutes). Use layers for common dependencies, and integrate with other services via event sources (S3, SNS, API Gateway, etc.). Use CloudWatch Logs and X‑Ray for monitoring and tracing. Cost is driven by memory allocation and execution time—optimise accordingly.";
  } else if (lowerTitle.includes("dynamodb") || lowerTitle.includes("nosql")) {
    deepDive += " DynamoDB is a fully managed NoSQL database. Understand the data model: tables, items, attributes, and primary keys (partition key, sort key). Master capacity modes (provisioned vs on‑demand), read/write consistency (eventual vs strong), and secondary indexes (global and local). Use DynamoDB Streams for change data capture, and DAX for caching. Design your partition keys to avoid hot partitions—distribute traffic evenly.";
  } else if (lowerTitle.includes("cloudwatch") || lowerTitle.includes("monitoring") || lowerTitle.includes("alarm")) {
    deepDive += " CloudWatch is the monitoring and observability service. Master metrics (collected at 1‑minute or 5‑minute intervals), logs (CloudWatch Logs, Log Insights), and alarms (based on metric thresholds). Use CloudWatch Agent to collect custom metrics and logs. For advanced monitoring, use AWS X‑Ray for distributed tracing, and CloudWatch Synthetics for canary tests. Set up dashboards for operational visibility.";
  } else if (lowerTitle.includes("elb") || lowerTitle.includes("load balancing") || lowerTitle.includes("application load balancer")) {
    deepDive += " Elastic Load Balancing distributes incoming traffic. Understand the three types: Application Load Balancer (ALB) for HTTP/HTTPS, Network Load Balancer (NLB) for TCP/UDP, and Classic LB (legacy). ALB features path‑based routing, host‑based routing, and sticky sessions. NLB offers extremely low latency and preserves client IP. For internal and external traffic, choose the right load balancer type.";
  } else if (lowerTitle.includes("sns") || lowerTitle.includes("sqs") || lowerTitle.includes("messaging")) {
    deepDive += " SQS and SNS are the backbone of decoupled architectures. SQS is a fully managed message queue (FIFO or Standard). Master visibility timeout, dead‑letter queues, and long polling. SNS is a pub/sub system. Combine them: SNS → SQS fan‑out for reliable event distribution. Use FIFO queues when order is critical. Monitor queue depths and use CloudWatch alarms to alert on backlogs.";
  } else if (lowerTitle.includes("route53") || lowerTitle.includes("dns") || lowerTitle.includes("domain")) {
    deepDive += " Route53 is AWS's scalable DNS service. Understand record types: A, AAAA, CNAME, MX, TXT, and alias records (which route to AWS resources). Master routing policies: simple, weighted, latency‑based, failover, geolocation, and geoproximity. Use health checks to enable DNS failover. Route53 also provides domain registration and DNSSEC support.";
  } else if (lowerTitle.includes("cloudformation") || lowerTitle.includes("cdk") || lowerTitle.includes("infrastructure as code")) {
    deepDive += " Infrastructure as Code (IaC) is essential for repeatable, auditable deployments. CloudFormation uses YAML/JSON templates to model your entire infrastructure. Understand stacks, change sets, and drift detection. AWS CDK is an imperative programming model (TypeScript, Python, etc.) that synthesises to CloudFormation. Manage state with S3 buckets and DynamoDB for deployments (e.g., Terraform uses remote state).";
  } else if (lowerTitle.includes("cost") || lowerTitle.includes("budget") || lowerTitle.includes("optimization")) {
    deepDive += " Cost management is crucial in the cloud. Use AWS Cost Explorer and AWS Budgets to track and forecast spend. Understand the pricing model: compute (per second/hour), storage (per GB), data transfer (inter‑region charges). Use tags for cost allocation. Apply Savings Plans and Reserved Instances for predictable workloads. Use Spot Instances for fault‑tolerant batch jobs. Right‑size resources and automate start/stop to save costs.";
  } else if (lowerTitle.includes("disaster") || lowerTitle.includes("backup") || lowerTitle.includes("recovery") || lowerTitle.includes("dr")) {
    deepDive += " Disaster Recovery ensures business continuity. Understand the four DR strategies: Backup & Restore, Pilot Light, Warm Standby, and Multi‑Site Active/Active. Define RPO (Recovery Point Objective) and RTO (Recovery Time Objective). Use AWS Backup for centralised backup of multiple services. Cross‑region replication for S3, RDS snapshots, and AMI copying are key techniques. Test your DR plan regularly.";
  } else if (lowerTitle.includes("container") || lowerTitle.includes("ecs") || lowerTitle.includes("eks") || lowerTitle.includes("kubernetes")) {
    deepDive += " Containers simplify application deployment. ECS (Elastic Container Service) and EKS (Elastic Kubernetes Service) are AWS's managed container orchestration services. Understand task definitions, services, clusters, and Fargate (serverless compute for containers). For EKS, master node groups, IAM roles for service accounts (IRSA), and Kubernetes manifests. Use ECR for container image storage.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core AWS service in one sentence.\n2. Identify the primary use cases and when you would not use it.\n3. List the key pricing factors (compute, storage, data transfer).\n4. Understand the security model (IAM, encryption, network controls).\n5. Practice by deploying a minimal viable example using AWS CLI or console.\n\n### Interview‑ready checklist\n- Explain the service without relying on memorised documentation.\n- Describe a real‑world scenario and why you chose this service over alternatives.\n- Mention the relevant scalability, availability, and durability characteristics.\n- Discuss cost optimisation strategies for the service.\n- State common failure modes and how you would mitigate them.\n\n### Practice task\nCreate a small architecture for **${title}** inside the **${module.title}** module of the **${path.name}** path. Draw a diagram, list the resources (with tags), and write a short Terraform / CloudFormation snippet that deploys it securely and cost‑effectively.`;
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

async function seedAWSCloudCategory() {
  const awsCategory: CategorySeed = {
    name: "AWS / Cloud Computing",
    slug: "aws-cloud",
    description: "Master Amazon Web Services from foundational concepts to advanced architecture: compute, storage, networking, security, serverless, databases, DevOps, cost management, and the Well‑Architected Framework.",
    icon: "AWS",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Cloud fundamentals, core services, and the AWS Management Console.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Cloud Computing Fundamentals",
            slug: "cloud-fundamentals",
            description: "What is cloud computing, shared responsibility model, and AWS global infrastructure.",
            topics: [
              {
                title: "What is Cloud Computing? – IaaS, PaaS, SaaS",
                slug: "cloud-models",
                description: "Service models and deployment models.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition", content: "Cloud computing is the on‑demand delivery of IT resources over the Internet with pay‑as‑you‑go pricing. NIST defines five characteristics: on‑demand self‑service, broad network access, resource pooling, rapid elasticity, and measured service." },
                  { title: "Service Models", content: "**IaaS** – raw compute, storage, networking (EC2, S3). **PaaS** – managed platform for applications (Elastic Beanstalk, RDS). **SaaS** – complete applications (Gmail, Salesforce)." },
                  { title: "Deployment Models", content: "**Public Cloud** (AWS, Azure, GCP). **Private Cloud** (on‑premises). **Hybrid Cloud** (combination). **Multi‑Cloud** (use of multiple public clouds)." },
                ],
              },
              {
                title: "AWS Global Infrastructure – Regions, AZs, Edge Locations",
                slug: "aws-infra",
                description: "Regions, Availability Zones, and Edge Locations.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Regions", content: "Geographic areas with multiple Availability Zones. Each region is isolated for fault tolerance. Choose a region based on data residency, latency, and service availability." },
                  { title: "Availability Zones (AZs)", content: "One or more data centres within a region, each with independent power, cooling, and networking. Deploy across multiple AZs for high availability." },
                  { title: "Edge Locations", content: "Sites used by CloudFront (CDN) and Route53 to deliver content with low latency. Also used for AWS Global Accelerator." },
                ],
              },
              {
                title: "Shared Responsibility Model – Security in the Cloud",
                slug: "shared-responsibility",
                description: "What AWS secures vs what you secure.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Security 'OF' the Cloud", content: "AWS is responsible for protecting the infrastructure that runs AWS services: physical security, hardware, software, networking, and facilities." },
                  { title: "Security 'IN' the Cloud", content: "You are responsible for securing your data, OS, network configuration, IAM, and application code. This is the 'EC2 and above' layer." },
                  { title: "Implications", content: "You must apply security patches to your EC2 instances, encrypt your data, and manage your IAM permissions. AWS provides tools (IAM, KMS, Security Groups) but you must use them." },
                ],
              },
            ],
          },
          {
            title: "Core Compute and Storage Services",
            slug: "compute-storage",
            description: "EC2, S3, EBS, and basic networking.",
            topics: [
              {
                title: "EC2 – Virtual Servers in the Cloud",
                slug: "ec2",
                description: "Instance types, AMIs, and purchasing options.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is EC2?", content: "Elastic Compute Cloud provides scalable virtual machines. Choose an Amazon Machine Image (AMI), instance type, and storage." },
                  { title: "Instance Families", content: "General purpose (t3, m5), compute‑optimized (c5), memory‑optimized (r5), storage‑optimized (i3), and accelerated computing (p3, g4)." },
                  { title: "Purchase Options", content: "On‑Demand (pay per second), Reserved (up to 72% discount for 1‑3 years), Spot (up to 90% discount, can be interrupted), Savings Plans (flexible discount)." },
                  { title: "Security Groups", content: "Virtual firewalls that control inbound and outbound traffic. They are stateful—if you allow inbound, outbound is automatically allowed." },
                ],
              },
              {
                title: "S3 – Scalable Object Storage",
                slug: "s3",
                description: "Buckets, objects, storage classes, and versioning.",
                estimatedMinutes: 24,
                sections: [
                  { title: "S3 Fundamentals", content: "Store any amount of data as objects in buckets. Each object has a key (path) and is identified by a URL." },
                  { title: "Storage Classes", content: "S3 Standard (frequently accessed), S3 Intelligent‑Tiering (automatic cost‑optimisation), S3 Infrequent Access (IA) and S3 One Zone‑IA, S3 Glacier (archive), S3 Deep Archive (long‑term)." },
                  { title: "Versioning and Lifecycle", content: "Versioning keeps multiple variants of an object. Lifecycle policies automatically transition objects to cheaper storage or delete them." },
                  { title: "Data Consistency", content: "S3 provides strong read‑after‑write consistency for PUTs and DELETEs (except for overwrites in some regions—check regional consistency)." },
                ],
              },
              {
                title: "EBS and Instance Store – Block Storage",
                slug: "ebs",
                description: "Persistent block storage for EC2.",
                estimatedMinutes: 20,
                sections: [
                  { title: "EBS Volumes", content: "Network‑attached block storage. Types: General Purpose SSD (gp2/gp3), Provisioned IOPS (io1/io2), Throughput Optimized HDD (st1), Cold HDD (sc1)." },
                  { title: "Snapshots", content: "Point‑in‑time backups stored in S3. Can be used to create new volumes or migrate across AZs." },
                  { title: "Instance Store", content: "Ephemeral, physically attached storage. High IOPS but data is lost on instance stop/termination. Use for temporary data." },
                ],
              },
            ],
          },
          {
            title: "Networking Basics – VPC and Route53",
            slug: "vpc-basics",
            description: "Virtual Private Cloud, subnets, internet gateways, and DNS.",
            topics: [
              {
                title: "VPC – Your Own Virtual Network",
                slug: "vpc",
                description: "CIDR blocks, subnets, route tables, and internet access.",
                estimatedMinutes: 24,
                sections: [
                  { title: "VPC Components", content: "A VPC spans all AZs in a region. You define a CIDR block (e.g., 10.0.0.0/16). Subnets are segments of the VPC CIDR, tied to a specific AZ." },
                  { title: "Public vs Private Subnets", content: "Public subnets have a route to an Internet Gateway (IGW). Private subnets do not; they route through NAT for outgoing traffic." },
                  { title: "Route Tables", content: "Control where network traffic goes. Each subnet is associated with a route table." },
                  { title: "NAT Gateway", content: "Allows private subnets to access the internet (for updates, etc.) while keeping them hidden." },
                ],
              },
              {
                title: "Route53 – DNS Management",
                slug: "route53",
                description: "Domain registration and routing policies.",
                estimatedMinutes: 20,
                sections: [
                  { title: "DNS Basics", content: "Route53 translates domain names to IP addresses. Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (text)." },
                  { title: "Routing Policies", content: "Simple, Weighted, Latency‑based, Failover, Geolocation, Geoproximity." },
                  { title: "Health Checks", content: "Monitor endpoints and can route traffic away from unhealthy targets." },
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
        description: "IAM, databases, serverless, monitoring, and DevOps basics.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Security and Identity (IAM)",
            slug: "iam",
            description: "Users, groups, roles, policies, and federation.",
            topics: [
              {
                title: "IAM Users, Groups, and Policies",
                slug: "iam-users",
                description: "Creating and managing identities and permissions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "IAM Users", content: "Represents a person or application. Can have console access and/or programmatic access (access keys)." },
                  { title: "IAM Groups", content: "Collections of users. Assign policies to groups to manage permissions collectively." },
                  { title: "IAM Policies", content: "JSON documents that define permissions (Allow/Deny). Can be AWS managed or custom. Use least privilege." },
                  { title: "Policy Evaluation Logic", content: "Explicit Deny overrides Allow. If no explicit Allow, access is denied." },
                ],
              },
              {
                title: "IAM Roles – Cross‑Account and Service Access",
                slug: "iam-roles",
                description: "Roles for EC2, Lambda, and cross‑account trust.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is a Role?", content: "An IAM identity that can be assumed by trusted entities (AWS services, users from other accounts, federated users)." },
                  { title: "Common Use Cases", content: "Give EC2 permissions to access S3 (by attaching a role to the EC2 instance profile). Cross‑account access (trust policy)." },
                  { title: "Federation", content: "Use SAML or OIDC to integrate with external identity providers (Active Directory, Google, Okta)." },
                ],
              },
            ],
          },
          {
            title: "Managed Databases – RDS and DynamoDB",
            slug: "databases",
            description: "Relational and NoSQL managed services.",
            topics: [
              {
                title: "RDS – Relational Database Service",
                slug: "rds",
                description: "Provisioned and Aurora engines, backups, and read replicas.",
                estimatedMinutes: 24,
                sections: [
                  { title: "RDS Overview", content: "Managed relational databases. Supports MySQL, PostgreSQL, Oracle, SQL Server, MariaDB, and Aurora." },
                  { title: "High Availability", content: "Multi‑AZ deployment provides synchronous replication to a standby in another AZ. Automatic failover." },
                  { title: "Read Replicas", content: "Asynchronous replication for read scaling. Up to 5 replicas. Can be promoted to stand‑alone." },
                  { title: "Backup and Restore", content: "Automated snapshots (retention up to 35 days) and manual snapshots (retained until deleted). Point‑in‑time recovery." },
                ],
              },
              {
                title: "DynamoDB – NoSQL Key‑Value and Document Store",
                slug: "dynamodb",
                description: "Tables, indexes, capacity modes, and streams.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Data Model", content: "Table – collection of items (rows). Each item has attributes (columns). Primary key can be simple (partition key) or composite (partition + sort key)." },
                  { title: "Capacity Modes", content: "Provisioned (you specify read/write capacity units) or On‑Demand (auto‑scaling, pay per request)." },
                  { title: "Secondary Indexes", content: "Global (G)SI allows querying on non‑partition key attributes. Local (L)SI uses same partition key but different sort key." },
                  { title: "DynamoDB Streams", content: "Capture item‑level changes (insert, update, delete) for triggers (e.g., Lambda)." },
                ],
              },
            ],
          },
          {
            title: "Serverless – Lambda, API Gateway, and Event Bridge",
            slug: "serverless",
            description: "Event‑driven, scale‑to‑zero compute and integration.",
            topics: [
              {
                title: "Lambda – Serverless Compute",
                slug: "lambda",
                description: "Functions, triggers, and best practices.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Lambda Basics", content: "Run code without provisioning servers. Supported languages: Node.js, Python, Java, Go, .NET, Ruby, and custom runtimes." },
                  { title: "Execution Model", content: "Each invocation spins up a container. Cold starts occur when a new container is needed; use Provisioned Concurrency to avoid." },
                  { title: "Limits", content: "Memory: 128MB to 10GB, timeout: 15 minutes, concurrent executions: 1000 (default, can be increased)." },
                  { title: "Best Practices", content: "Leverage environment variables, use layers for dependencies, enable X‑Ray tracing, and monitor with CloudWatch." },
                ],
              },
              {
                title: "API Gateway – Building APIs",
                slug: "api-gateway",
                description: "REST and WebSocket APIs, authorisation, and caching.",
                estimatedMinutes: 22,
                sections: [
                  { title: "API Types", content: "REST API (HTTP, standard) and WebSocket API (real‑time communication). Also HTTP API (lower latency, cheaper)." },
                  { title: "Integration", content: "Connect to Lambda, HTTP endpoints, or other AWS services via VPC link." },
                  { title: "Security", content: "Use API keys, IAM, Cognito, or custom Lambda authorisers. Enable CORS when needed." },
                ],
              },
            ],
          },
          {
            title: "Monitoring and DevOps",
            slug: "monitoring-devops",
            description: "CloudWatch, CloudTrail, and basics of CI/CD.",
            topics: [
              {
                title: "CloudWatch – Metrics, Logs, and Alarms",
                slug: "cloudwatch",
                description: "Collecting and acting on operational data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Metrics", content: "Default metrics (CPU, disk, network) for many services. Custom metrics via CloudWatch Agent." },
                  { title: "CloudWatch Logs", content: "Store and monitor log files. Use Log Insights for querying. Set up metric filters to turn logs into metrics." },
                  { title: "Alarms", content: "Trigger notifications (SNS) or auto‑scale actions based on metric thresholds (e.g., CPU > 80%)." },
                ],
              },
              {
                title: "CloudTrail – Audit and Governance",
                slug: "cloudtrail",
                description: "API logging and compliance.",
                estimatedMinutes: 18,
                sections: [
                  { title: "CloudTrail Basics", content: "Records all API calls made in your account. Provides a history for security analysis and troubleshooting." },
                  { title: "Management vs Data Events", content: "Management events (e.g., EC2 StartInstances) are logged by default. Data events (e.g., S3 GetObject) need to be enabled." },
                  { title: "Integration", content: "Send logs to S3 (for long‑term storage) or CloudWatch Logs (for real‑time). Use Athena to query CloudTrail logs in S3." },
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
        description: "Advanced networking, cost optimization, disaster recovery, container orchestration, and the Well‑Architected Framework.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced Networking",
            slug: "adv-networking",
            description: "VPC Peering, Transit Gateway, Direct Connect, and VPN.",
            topics: [
              {
                title: "VPC Peering and Transit Gateway",
                slug: "vpc-peering",
                description: "Connecting VPCs across accounts and regions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "VPC Peering", content: "One‑to‑one connection between two VPCs. Can be intra‑region or inter‑region. No transitive routing." },
                  { title: "Transit Gateway", content: "Hub‑and‑spoke model for connecting multiple VPCs, on‑premises, and VPNs. Simplifies network management." },
                ],
              },
              {
                title: "Direct Connect and Site‑to‑Site VPN",
                slug: "direct-connect",
                description: "Dedicated and encrypted connections to on‑premises.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Direct Connect", content: "Dedicated physical connection from on‑premises to AWS. Reduces latency and provides consistent bandwidth. Can be used with Virtual Private Gateway or Transit Gateway." },
                  { title: "Site‑to‑Site VPN", content: "IPsec VPN over the internet. Lower cost than Direct Connect but less predictable performance." },
                  { title: "Hybrid Architectures", content: "Combine Direct Connect (primary) and VPN (backup) for high availability." },
                ],
              },
            ],
          },
          {
            title: "Cost Optimization and FinOps",
            slug: "cost-optimization",
            description: "Understanding AWS pricing, savings plans, and tooling.",
            topics: [
              {
                title: "AWS Pricing Models",
                slug: "aws-pricing",
                description: "Compute, storage, and data transfer costs.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Compute Pricing", content: "Per second/hour based on instance type and region. Spot offers up to 90% discount." },
                  { title: "Storage Pricing", content: "S3 storage classes have different per‑GB/month costs. EBS costs vary by volume type and IOPS." },
                  { title: "Data Transfer Costs", content: "Inbound is generally free. Outbound to internet incurs charges (per GB). Inter‑AZ and inter‑region also cost." },
                ],
              },
              {
                title: "Savings Plans and Reserved Instances",
                slug: "savings-plans",
                description: "Commitment‑based discounts.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Savings Plans", content: "Flexible pricing model that offers lower prices in exchange for a commitment to a certain amount of usage (per hour) for 1 or 3 years. Apply to EC2, Fargate, and Lambda." },
                  { title: "Reserved Instances (RI)", content: "Capacity reservation for specific instance families and AZs. Can be Standard (up to 72% off) or Convertible (exchangeable)." },
                ],
              },
            ],
          },
          {
            title: "Disaster Recovery and High Availability",
            slug: "dr-ha",
            description: "Strategies for resilient architectures.",
            topics: [
              {
                title: "DR Strategies – RPO/RTO",
                slug: "dr-strategies",
                description: "Backup & Restore, Pilot Light, Warm Standby, Active/Active.",
                estimatedMinutes: 24,
                sections: [
                  { title: "DR Strategy Definitions", content: "**Backup & Restore** – simple, cheap, but high RTO. **Pilot Light** – small replica running, ready to scale. **Warm Standby** – full capacity idle. **Multi‑Site** – multiple active regions." },
                  { title: "RPO and RTO", content: "RPO (Recovery Point Objective) – max data loss in time. RTO (Recovery Time Objective) – max downtime. Choose strategy based on these." },
                  { title: "AWS Services for DR", content: "S3 Cross‑Region Replication, DynamoDB Global Tables, RDS Cross‑Region Read Replicas, Route53 failover routing." },
                ],
              },
            ],
          },
          {
            title: "Containers and Orchestration",
            slug: "containers",
            description: "ECS, EKS, Fargate, and ECR.",
            topics: [
              {
                title: "ECS – Elastic Container Service",
                slug: "ecs",
                description: "Managed container orchestration with EC2 or Fargate.",
                estimatedMinutes: 22,
                sections: [
                  { title: "ECS Concepts", content: "Task Definition (container definition, CPU/memory, networking). Service (maintains desired count of tasks). Cluster (logical grouping)." },
                  { title: "Launch Types", content: "EC2 – you manage the instances. Fargate – serverless, you only specify the task resource requirements." },
                  { title: "Integration", content: "Use ALB/NLB to expose services. Integrate with IAM (task execution role), CloudWatch, and X‑Ray." },
                ],
              },
              {
                title: "EKS – Managed Kubernetes",
                slug: "eks",
                description: "AWS's Kubernetes service.",
                estimatedMinutes: 24,
                sections: [
                  { title: "EKS Overview", content: "AWS manages the control plane (API server, etcd). You manage worker nodes (EC2 or Fargate)." },
                  { title: "Node Groups", content: "Use managed node groups (AWS manages node lifecycle). Use Fargate for serverless pods." },
                  { title: "IAM Roles for Service Accounts (IRSA)", content: "Associate IAM roles with Kubernetes service accounts for fine‑grained permission." },
                ],
              },
            ],
          },
          {
            title: "AWS Well‑Architected Framework",
            slug: "well-architected",
            description: "The five pillars and best practices.",
            topics: [
              {
                title: "Operational Excellence",
                slug: "wa-operational",
                description: "Running and monitoring systems.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Key Principles", content: "Automate changes, respond to events, and define standards. Use CloudFormation, CI/CD, and runbooks." },
                ],
              },
              {
                title: "Security and Reliability",
                slug: "wa-security-reliability",
                description: "Protecting data and recovering from failures.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Security Pillar", content: "Identity & access management, detective controls, infrastructure protection, data protection, and incident response." },
                  { title: "Reliability Pillar", content: "Avoid single points of failure, test recovery procedures, and scale horizontally. Use Auto Scaling, Multi‑AZ, and health checks." },
                ],
              },
              {
                title: "Performance Efficiency and Cost Optimization",
                slug: "wa-performance-cost",
                description: "Using resources efficiently and economically.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Performance Efficiency", content: "Choose right instance types, use caching (ElastiCache, CloudFront), and serverless where appropriate." },
                  { title: "Cost Optimization", content: "Right‑sizing, Savings Plans, spot instances, and managed services to reduce operational overhead." },
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
        description: "Common AWS interview questions, architecture scenarios, and troubleshooting.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Service Questions",
            slug: "core-interview",
            description: "Deep dives into EC2, S3, VPC, IAM, etc.",
            topics: [
              {
                title: "Design a Highly Available Web Application",
                slug: "ha-web-app",
                description: "Load balancing, auto‑scaling, and database replication.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Scenario", content: "You need to deploy a web application that can handle traffic spikes and survive AZ failures." },
                  { title: "Solution", content: "Use ALB in front of an Auto Scaling group across two AZs. RDS Multi‑AZ for the database. S3 for static assets with CloudFront." },
                  { title: "Key Points", content: "Discuss health checks, scaling policies, and security groups. Mention cost optimisation (use Spot for non‑prod, Savings Plans)." },
                ],
              },
              {
                title: "Troubleshooting – High Latency in a Global Application",
                slug: "global-latency",
                description: "Diagnosing and fixing latency issues.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Potential Causes", content: "Single region far from users, database queries, lack of caching." },
                  { title: "Solutions", content: "Use CloudFront for caching, deploy in multiple regions with Route53 latency‑based routing, use DynamoDB Global Tables, and optimise database queries with indexes." },
                ],
              },
            ],
          },
          {
            title: "Advanced Architecture and Cost",
            slug: "adv-interview",
            description: "Questions on serverless, cost, and security.",
            topics: [
              {
                title: "Serverless vs Containers – When to Choose What",
                slug: "serverless-vs-containers",
                description: "Trade‑offs between Lambda, ECS, and EKS.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Serverless (Lambda)", content: "Best for event‑driven, sporadic workloads, and short‑running tasks. Low cost, minimal ops." },
                  { title: "Containers (ECS/EKS)", content: "Better for long‑running processes, stateful applications, and when you need more control over the runtime." },
                  { title: "Decision Factors", content: "Cold start tolerance, memory/time limits, complexity of dependencies, team expertise." },
                ],
              },
              {
                title: "Security – Best Practices for IAM and Encryption",
                slug: "security-deep",
                description: "How to secure an AWS environment.",
                estimatedMinutes: 24,
                sections: [
                  { title: "IAM Best Practices", content: "Use roles, not root credentials. Use groups. Apply least privilege. Use MFA. Use IAM Access Analyzer to review permissions." },
                  { title: "Encryption", content: "Encrypt data at rest (KMS, S3 server‑side encryption, EBS encryption) and in transit (TLS/HTTPS). Use AWS Certificate Manager for certificates." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(awsCategory);
  console.log("✅ AWS / Cloud Computing category seeded (ultra‑detailed)");
}

async function main() {
  await seedAWSCloudCategory();
}

main()
  .catch((error) => {
    console.error("AWS seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });