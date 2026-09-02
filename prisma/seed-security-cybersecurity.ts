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

async function seedSecurityCategory() {
  const category: CategorySeed = {
    name: "Security & Cybersecurity",
    slug: "security-cybersecurity",
    description: "Master core security principles, network security, application security, cryptography, cloud security, and incident response.",
    icon: "SEC",
    sortOrder: 25,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the basics of cybersecurity: threats, vulnerabilities, controls, and security fundamentals.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Cybersecurity Fundamentals – The Big Picture",
            slug: "sec-fundamentals",
            description: "Core concepts, CIA triad, security controls.",
            topics: [
              {
                title: "Introduction to Cybersecurity – Protecting the Digital World",
                slug: "intro-cybersecurity",
                shortDescription: "Definition, importance, and key concepts.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Cybersecurity?", content: "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. It encompasses confidentiality, integrity, and availability – the CIA triad. It's not just about technology; it's about people, processes, and technology working together to manage risk." },
                  { title: "The CIA Triad – The Foundation", content: "**Confidentiality**: ensuring data is accessible only to authorised users (e.g., encryption, access control). **Integrity**: ensuring data is accurate and unaltered (e.g., hashing, digital signatures). **Availability**: ensuring systems are accessible when needed (e.g., redundancy, DoS protection). These three principles guide all security decisions." },
                  { title: "Security Controls – Administrative, Technical, Physical", content: "**Administrative**: policies, procedures, training – the human element. **Technical**: firewalls, encryption, intrusion detection – the technology. **Physical**: locks, CCTV, guards – the tangible security measures. All three layers are needed for a robust defence." },
                  { title: "Common Threats – What We're Up Against", content: "**Malware** (viruses, worms, ransomware), **Phishing** (social engineering), **Ransomware** (data hostage), **Denial of Service** (overwhelm systems), **Insider Threats** (malicious or negligent employees). Understanding these is the first step to defending against them." },
                ],
              },
              {
                title: "Threat Landscape and Attack Vectors – How Attacks Happen",
                slug: "threat-landscape",
                shortDescription: "Common attack types and how they work.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Malware – The Swiss Army Knife of Attacks", content: "Viruses (self‑replicating), worms (spread over networks), trojans (disguised as legitimate), ransomware (encrypts data for ransom). Prevention: anti‑malware, user awareness, patching." },
                  { title: "Phishing – The Human Factor", content: "Social engineering attacks that trick users into revealing credentials or clicking malicious links. Spear‑phishing targets specific individuals. Prevention: training, email filtering, MFA." },
                  { title: "Denial of Service (DoS) and DDoS", content: "Overwhelm a system with traffic to make it unavailable. DDoS uses multiple compromised systems. Protection: rate limiting, CDNs, cloud‑based mitigation." },
                  { title: "Man‑in‑the‑Middle (MITM) – Eavesdropping", content: "Attacker intercepts communication between two parties. Prevention: encryption (TLS), certificate validation." },
                  { title: "Insider Threats – Trusted but Dangerous", content: "Employees or contractors with malicious intent or who are negligent. Prevention: least privilege, monitoring, exit procedures." },
                ],
              },
              {
                title: "Network Security Basics – Securing the Perimeter",
                slug: "network-security",
                shortDescription: "Firewalls, IDS/IPS, VPNs, and DMZ.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Firewalls – The First Line of Defence", content: "Filter traffic based on rules – **stateful** (tracks connections) vs **stateless** (individual packets). Next‑Gen Firewalls (NGFW) add application‑awareness." },
                  { title: "IDS and IPS – Intrusion Detection and Prevention", content: "**IDS**: monitors and alerts on suspicious activity. **IPS**: actively blocks threats. Signature‑based (known attacks) and anomaly‑based (unusual behaviour)." },
                  { title: "VPNs – Virtual Private Networks", content: "Encrypt traffic over public networks, providing confidentiality and integrity. Protocols: IPsec, WireGuard, OpenVPN." },
                  { title: "DMZ – Demilitarised Zone", content: "A network segment that hosts public‑facing services (e.g., web servers). It separates internal networks from the internet." },
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
        description: "Application security, cryptography, identity management, risk management, and threat modeling.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Application Security – Building Secure Software",
            slug: "appsec",
            description: "OWASP Top 10, secure coding, and penetration testing.",
            topics: [
              {
                title: "OWASP Top 10 – The Most Critical Web Risks",
                slug: "owasp-top10",
                shortDescription: "The most critical web application security risks.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Injection (SQL, NoSQL, OS)", content: "Attacker inserts malicious code into a query. Prevention: use parameterised queries, ORMs, input validation." },
                  { title: "Broken Authentication", content: "Weak session management, credential stuffing. Prevention: strong passwords, MFA, session timeouts." },
                  { title: "Sensitive Data Exposure", content: "Unencrypted data at rest and in transit. Prevention: encryption, TLS, data minimisation." },
                  { title: "XXE and XSS", content: "XML External Entities (XXE) – prevent by disabling DTDs. Cross‑Site Scripting (XSS) – prevent by output encoding and CSP." },
                  { title: "Broken Access Control", content: "Insecure direct object references, privilege escalation. Prevention: enforce access controls on the server side." },
                  { title: "Security Misconfiguration", content: "Default credentials, open ports. Prevention: harden configurations, automate audits." },
                ],
              },
              {
                title: "Secure Coding Practices – Writing Safe Code",
                slug: "secure-coding",
                shortDescription: "Input validation, output encoding, authentication.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Input Validation – Never Trust User Data", content: "Whitelist allowed inputs. Validate length, type, format. Use prepared statements for SQL." },
                  { title: "Output Encoding – Prevent XSS", content: "Encode output based on context (HTML, JS, URL). Use libraries like OWASP ESAPI." },
                  { title: "Authentication and Session Management", content: "Use secure tokens (JWT with short expiry). Implement MFA. Use HTTPS for all sensitive traffic." },
                ],
              },
              {
                title: "Threat Modeling – STRIDE and DREAD",
                slug: "threat-modeling",
                shortDescription: "Systematically identify and prioritise threats.",
                estimatedMinutes: 24,
                sections: [
                  { title: "STRIDE – Threat Categories", content: "**S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege. Use to classify threats." },
                  { title: "DREAD – Risk Scoring", content: "**D**amage, **R**eproducibility, **E**xploitability, **A**ffected users, **D**iscoverability – score each threat to prioritise." },
                  { title: "The Process", content: "Draw architecture, identify threats, apply mitigations. Use tools like Microsoft Threat Modeling Tool." },
                ],
              },
            ],
          },
          {
            title: "Cryptography – The Art of Secrets",
            slug: "crypto",
            description: "Symmetric and asymmetric encryption, hashing, and digital signatures.",
            topics: [
              {
                title: "Symmetric Encryption – Shared Secrets",
                slug: "symmetric",
                shortDescription: "AES, DES, 3DES – same key for encryption/decryption.",
                estimatedMinutes: 22,
                sections: [
                  { title: "AES – The Standard", content: "Advanced Encryption Standard, widely used. Modes: ECB (unsafe), CBC, GCM (authenticated). Key sizes: 128, 192, 256 bits." },
                  { title: "Key Management", content: "Secure key generation, distribution, and storage. Use hardware security modules (HSMs) or cloud KMS." },
                ],
              },
              {
                title: "Asymmetric Encryption – Public/Private Keys",
                slug: "asymmetric",
                shortDescription: "RSA, ECC – public/private key pairs.",
                estimatedMinutes: 22,
                sections: [
                  { title: "RSA – The Classic", content: "Based on factoring large numbers. Key sizes: 2048+ bits. Used for key exchange and digital signatures." },
                  { title: "ECC – Elliptic Curve Cryptography", content: "Stronger security with smaller keys (e.g., 256‑bit ECC ≈ 3072‑bit RSA). Used in modern TLS, Bitcoin." },
                ],
              },
              {
                title: "Hashing and Digital Signatures",
                slug: "hashing",
                shortDescription: "SHA, MD5, HMAC, and certificate usage.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Hashing – One‑Way Functions", content: "SHA‑256, SHA‑3. Used for integrity verification and password storage (with salt). MD5 and SHA‑1 are deprecated." },
                  { title: "Digital Signatures", content: "Authenticate and ensure integrity of messages. Created with private key, verified with public key." },
                ],
              },
              {
                title: "Post‑Quantum Cryptography",
                slug: "post-quantum",
                shortDescription: "Cryptography resistant to quantum computers.",
                estimatedMinutes: 18,
                sections: [
                  { title: "The Quantum Threat", content: "Quantum computers can break RSA and ECC using Shor's algorithm. NIST is standardising post‑quantum algorithms like CRYSTALS‑Kyber (key encapsulation) and CRYSTALS‑Dilithium (signatures)." },
                ],
              },
            ],
          },
          {
            title: "Identity and Access Management (IAM) – Who Are You?",
            slug: "iam",
            description: "Authentication, authorization, single sign‑on, and MFA.",
            topics: [
              {
                title: "Authentication Methods – Proving Identity",
                slug: "auth-methods",
                shortDescription: "Passwords, biometrics, tokens, and certificates.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Password Policies", content: "Length > 12, complexity, expiry, history. Use password managers." },
                  { title: "MFA – Multi‑Factor Authentication", content: "Something you know (password), have (token), are (biometric). Essential for high‑risk access." },
                  { title: "SSO – Single Sign‑On", content: "One login for multiple services. Uses SAML, OAuth, OpenID Connect." },
                ],
              },
              {
                title: "Authorization Models – What You Can Do",
                slug: "authz",
                shortDescription: "RBAC, ABAC, and least privilege.",
                estimatedMinutes: 18,
                sections: [
                  { title: "RBAC – Role‑Based Access Control", content: "Assign permissions to roles, roles to users. Simple and widely used." },
                  { title: "ABAC – Attribute‑Based Access Control", content: "Uses policies based on attributes (user, resource, environment). More fine‑grained." },
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
        description: "Cloud security, DevSecOps, incident response, compliance, zero trust, and advanced threats.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Cloud Security – Securing the Cloud",
            slug: "cloud-security",
            description: "Shared responsibility model, AWS/Azure/GCP security services, CSPM, CASB.",
            topics: [
              {
                title: "Shared Responsibility Model",
                slug: "shared-responsibility",
                shortDescription: "What is secured by cloud provider vs customer.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Infrastructure", content: "Physical, network, and hypervisor – cloud provider." },
                  { title: "Data and Applications", content: "Encryption, identity, access – customer." },
                ],
              },
              {
                title: "Cloud Security Services",
                slug: "cloud-security-services",
                shortDescription: "IAM, KMS, WAF, and logging.",
                estimatedMinutes: 24,
                sections: [
                  { title: "IAM", content: "Identity and access management for cloud resources. Use least privilege and roles." },
                  { title: "KMS", content: "Key Management Service for encryption keys." },
                  { title: "WAF", content: "Web Application Firewall to protect against OWASP Top 10." },
                  { title: "CloudTrail / CloudWatch", content: "Logging and monitoring for AWS." },
                ],
              },
              {
                title: "CSPM and CASB",
                slug: "cspm-casb",
                shortDescription: "Cloud Security Posture Management and Cloud Access Security Broker.",
                estimatedMinutes: 18,
                sections: [
                  { title: "CSPM", content: "Continuously monitor cloud configurations for misconfigurations (e.g., open S3 buckets)." },
                  { title: "CASB", content: "Policy enforcement between users and cloud services." },
                ],
              },
            ],
          },
          {
            title: "DevSecOps – Security in the Pipeline",
            slug: "devsecops",
            description: "Security integrated into CI/CD pipeline.",
            topics: [
              {
                title: "Security in CI/CD – Shifting Left",
                slug: "sec-cicd",
                shortDescription: "SAST, DAST, SCA, and container scanning.",
                estimatedMinutes: 24,
                sections: [
                  { title: "SAST", content: "Static Application Security Testing – code analysis. Tools: SonarQube, Checkmarx." },
                  { title: "DAST", content: "Dynamic Application Security Testing – runtime. Tools: OWASP ZAP, Burp Suite." },
                  { title: "SCA", content: "Software Composition Analysis – dependencies. Tools: Snyk, OWASP Dependency‑Check." },
                  { title: "Container Scanning", content: "Scan images for vulnerabilities. Tools: Trivy, Clair." },
                ],
              },
            ],
          },
          // --- CORRECTED MODULE: Zero Trust Architecture ---
          {
            title: "Zero Trust Architecture – Never Trust, Always Verify",
            slug: "zero-trust",
            description: "Assume breach, verify every request.",
            topics: [
              {
                title: "Zero Trust Implementation",
                slug: "zero-trust-details",
                shortDescription: "Assume breach, verify every request.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Core Principles", content: "No implicit trust, authenticate and authorise every request, micro‑segment networks, enforce least privilege." },
                  { title: "Implementation", content: "Use identity‑aware proxies (BeyondCorp), zero‑trust network access (ZTNA), and continuous monitoring." },
                  { title: "Zero Trust vs Traditional Security", content: "Traditional relies on perimeter (firewall, VPN). Zero Trust assumes the network is already compromised." },
                ],
              },
            ],
          },
          {
            title: "Incident Response and Forensics – Handling the Inevitable",
            slug: "incident-response",
            description: "Preparation, detection, containment, eradication, recovery.",
            topics: [
              {
                title: "Incident Response Lifecycle",
                slug: "ir-lifecycle",
                shortDescription: "Six phases of effective incident response.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Preparation", content: "Policies, tools, and training. Have a response plan and run simulations." },
                  { title: "Detection", content: "Monitoring, alerts, and initial triage. Identify indicators of compromise (IOCs)." },
                  { title: "Containment", content: "Isolate the incident to prevent further damage. Short‑term (disconnect) and long‑term (patching)." },
                  { title: "Eradication", content: "Remove the root cause – malware, backdoors." },
                  { title: "Recovery", content: "Restore systems and services. Verify clean restoration." },
                  { title: "Lessons Learned", content: "Post‑mortem, improve processes, update controls." },
                ],
              },
              {
                title: "SIEM and SOAR – Technology in Response",
                slug: "siem-soar",
                shortDescription: "Security Information and Event Management, and Security Orchestration, Automation, and Response.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SIEM", content: "Collects, analyses, and correlates logs from multiple sources. Tools: Splunk, Elastic, QRadar." },
                  { title: "SOAR", content: "Automates incident response workflows. Tools: Palo Alto Cortex XSOAR, Splunk Phantom." },
                ],
              },
            ],
          },
          {
            title: "Advanced Threats and Threat Intelligence",
            slug: "advanced-threats",
            description: "APTs, cyber kill chain, MITRE ATT&CK.",
            topics: [
              {
                title: "Advanced Persistent Threats (APTs)",
                slug: "apt",
                shortDescription: "Sophisticated, stealthy, long‑term attacks.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Characteristics", content: "Targeted, well‑funded, stealthy, and persistent. Often nation‑state actors." },
                  { title: "Defense", content: "Layered security, threat hunting, and information sharing." },
                ],
              },
              {
                title: "Cyber Kill Chain – Stages of an Attack",
                slug: "kill-chain",
                shortDescription: "Reconnaissance → Weaponisation → Delivery → Exploitation → Installation → Command & Control → Actions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Each Stage", content: "Understand how attackers operate to detect and stop them early." },
                ],
              },
              {
                title: "MITRE ATT&CK Framework",
                slug: "mitre-attck",
                shortDescription: "Knowledge base of adversary tactics and techniques.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Tactics and Techniques", content: "Organised by execution phases. Used for threat hunting and defensive planning." },
                ],
              },
            ],
          },
          {
            title: "Compliance and Frameworks – The Rulebook",
            slug: "compliance",
            description: "GDPR, HIPAA, SOC 2, ISO 27001, and NIST.",
            topics: [
              {
                title: "Key Regulations",
                slug: "regulations",
                shortDescription: "Data protection and security standards.",
                estimatedMinutes: 22,
                sections: [
                  { title: "GDPR", content: "General Data Protection Regulation (EU). Rights: access, erasure, portability. Fines up to €20M." },
                  { title: "HIPAA", content: "Health Insurance Portability and Accountability Act (US). Protects patient data." },
                  { title: "SOC 2", content: "Service Organisation Control (trust services). Audits controls for security, availability, processing integrity, confidentiality, privacy." },
                ],
              },
              {
                title: "Security Frameworks",
                slug: "frameworks",
                shortDescription: "NIST CSF, CIS Controls, ISO 27001.",
                estimatedMinutes: 20,
                sections: [
                  { title: "NIST CSF", content: "Identify, Protect, Detect, Respond, Recover – risk‑based approach." },
                  { title: "ISO 27001", content: "International standard for information security management (ISMS)." },
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
        description: "Common cybersecurity interview questions, case studies, and scenarios.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Security Concepts",
            slug: "core-security-interview",
            description: "CIA triad, encryption, access control, threats.",
            topics: [
              {
                title: "CIA Triad and Security Controls",
                slug: "cia-controls",
                shortDescription: "Explain CIA and how controls enforce them.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Confidentiality", content: "Encryption, access control." },
                  { title: "Integrity", content: "Hashing, digital signatures." },
                  { title: "Availability", content: "Redundancy, DoS protection." },
                ],
              },
              {
                title: "Common Attacks and Mitigation",
                slug: "attacks-mitigation",
                shortDescription: "Explain phishing, XSS, SQLi, and how to prevent.",
                estimatedMinutes: 20,
                sections: [
                  { title: "SQL Injection", content: "Use parameterised queries." },
                  { title: "XSS", content: "Output encoding, CSP." },
                  { title: "Phishing", content: "User awareness, email filtering." },
                ],
              },
              {
                title: "Encryption and Cryptography",
                slug: "encryption-interview",
                shortDescription: "Symmetric vs asymmetric, hashing, digital signatures.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Symmetric", content: "AES, shared key." },
                  { title: "Asymmetric", content: "RSA, public/private key." },
                  { title: "Hashing", content: "SHA, use for integrity." },
                ],
              },
            ],
          },
          {
            title: "Case Studies and Scenarios",
            slug: "scenario-security",
            description: "Real‑world security problems.",
            topics: [
              {
                title: "Design a Secure API",
                slug: "secure-api-design",
                shortDescription: "Authentication, authorization, rate limiting, validation.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Auth", content: "Use JWT with short expiry." },
                  { title: "Authorization", content: "RBAC with least privilege." },
                  { title: "Input Validation", content: "Whitelist, validate schema." },
                  { title: "Rate Limiting", content: "Protect against DoS." },
                ],
              },
              {
                title: "Design a Security Monitoring Strategy",
                slug: "monitoring-strategy",
                shortDescription: "Logging, alerting, and SIEM integration.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Logging", content: "Centralised logging with structured data." },
                  { title: "Alerting", content: "Threshold‑based and anomaly detection." },
                  { title: "SIEM", content: "Security Information and Event Management." },
                ],
              },
              {
                title: "Incident Response Scenario",
                slug: "ir-scenario",
                shortDescription: "You detect unusual network traffic. What do you do?",
                estimatedMinutes: 24,
                sections: [
                  { title: "Detection", content: "Investigate the traffic." },
                  { title: "Containment", content: "Isolate affected systems." },
                  { title: "Eradication", content: "Remove malware." },
                  { title: "Recovery", content: "Restore services." },
                ],
              },
              {
                title: "Implement Zero Trust",
                slug: "zero-trust-scenario",
                shortDescription: "How would you design a zero‑trust architecture?",
                estimatedMinutes: 22,
                sections: [
                  { title: "Identity", content: "Strong authentication, MFA." },
                  { title: "Network", content: "Micro‑segmentation, ZTNA." },
                  { title: "Monitoring", content: "Continuous monitoring and logging." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Security & Cybersecurity category seeded (ultra‑detailed)");
}

async function main() {
  await seedSecurityCategory();
}

main()
  .catch((error) => {
    console.error("Security & Cybersecurity seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });