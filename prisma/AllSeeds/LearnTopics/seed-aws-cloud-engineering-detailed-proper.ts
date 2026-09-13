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

const awsCategory: CategorySeed = {
  name: "AWS Cloud Engineering",
  slug: "aws-cloud-engineering",
  description: "A practical AWS learning path covering cloud fundamentals, networking, compute, storage, security, observability, automation, and architecture design.",
  icon: "cloud",
  sortOrder: 1,
  paths: [
    {
      name: "AWS Cloud Engineering",
      slug: "aws-cloud-engineering",
      description: "Learn AWS from fundamentals through production-oriented architecture, with detailed explanations, practical examples, and design scenarios.",
      level: StudyLevel.INTERMEDIATE,
      modules: [
        {
          title: "Learning AWS",
          slug: "learning-aws",
          description: "Learn cloud fundamentals, migration thinking, shared responsibility, security, compliance, and the AWS Well-Architected mindset.",
          topics: [
            {
              title: "What Cloud Computing Means",
              slug: "what-cloud-computing-means",
              description: "Cloud computing is a model in which computing capabilities are consumed as services rather than requiring an organization to own and operate every physical component.",
              estimatedMinutes: 12,
              sections: [
                { title: "Detailed explanation", content: "Cloud computing is a model in which computing capabilities are consumed as services\nrather than requiring an organization to own and operate every physical component.\n\nA traditional data center requires decisions about:\n- servers;\n- storage arrays;\n- network equipment;\n- power and cooling;\n- physical security;\n- hardware replacement;\n- capacity planning;\n- virtualization;\n- operating-system administration.\n\nA cloud provider moves much of that infrastructure responsibility to the provider.\nThe customer still has important responsibilities, especially around architecture,\nconfiguration, application security, identity, and data.\n\nA useful mental model is:\n\n```\nTraditional:\nBuy hardware -> install -> configure -> operate -> replace\n```\n\n```\nCloud:\nSelect service -> configure -> operate -> scale -> optimize\n```\n\nCloud does not automatically mean \"cheap.\" A poorly designed cloud application can\nwaste money just as a poorly designed data center can." },
                { title: "Example", content: "Imagine a small online bakery expecting 500 visitors per day. Buying enough physical\nservers for a future peak of 100,000 visitors would leave most of that capacity idle.\nA cloud architecture can begin small and add resources when demand grows." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Moving To Aws",
              slug: "moving-to-aws",
              description: "A migration is not simply moving virtual machines from one location to another.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A migration is not simply moving virtual machines from one location to another.\nOrganizations normally need to consider:\n- application dependencies;\n- network connectivity;\n- identity;\n- data movement;\n- security;\n- operational skills;\n- licensing;\n- monitoring;\n- availability requirements;\n- cost;\n- compliance.\n\nMigration strategies can include:\n- rehosting: move with minimal changes;\n- replatforming: make limited changes to use managed capabilities;\n- refactoring: redesign the application for cloud characteristics;\n- retiring: remove systems that are no longer required;\n- retaining: keep workloads where they are for a justified reason." },
                { title: "Example", content: "A company has an old reporting server and a modern customer API. Moving both in the\nsame way may be a mistake. The reporting server might initially be rehosted while\nthe customer API is redesigned around managed services." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Infrastructure As A Service",
              slug: "infrastructure-as-a-service",
              description: "IaaS gives the customer significant control over infrastructure resources such as virtual machines, networks, and block storage.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "IaaS gives the customer significant control over infrastructure resources such as\nvirtual machines, networks, and block storage.\n\nTypical responsibilities include:\n- selecting compute capacity;\n- configuring the operating system;\n- managing application software;\n- configuring networking;\n- controlling access.\n\nAWS services associated with foundational infrastructure include EC2, VPC, EBS,\nS3, IAM, and many managed services around them.\n\nIaaS is attractive when an existing workload closely resembles a traditional\nserver-based environment." },
                { title: "Example", content: "A team needs OS-level control for an existing Java application. EC2 provides virtual servers while the team remains responsible for the operating system, application, network configuration, and access." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Platform As A Service",
              slug: "platform-as-a-service",
              description: "PaaS moves more infrastructure management away from the application team.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "PaaS moves more infrastructure management away from the application team.\n\nInstead of spending most of the effort provisioning servers and configuring the\nruntime, developers focus more heavily on application code and deployment.\n\nThe trade-off is reduced low-level control and possible dependence on the platform's\nruntime, interfaces, deployment model, or supported technologies." },
                { title: "Example", content: "A development team wants to deploy a Java web application but does not want to\nmaintain operating-system patching, load balancing, and routine capacity management.\nA managed application platform can reduce that operational burden." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Software As A Service",
              slug: "software-as-a-service",
              description: "SaaS delivers a complete application as a service.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "SaaS delivers a complete application as a service. The customer primarily consumes\nthe software instead of managing its infrastructure.\n\nThe responsibility spectrum can be visualized as:\n\n```\nMore customer control\nIaaS\nPaaS\nSaaS\nMore provider management\n```\n\nThe exact responsibility split depends on the service." },
                { title: "Example", content: "A company uses an online collaboration application instead of installing and maintaining the collaboration software and servers itself. The customer mainly consumes the finished application." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Essential Cloud Characteristics",
              slug: "essential-cloud-characteristics",
              description: "The source emphasizes the classic cloud characteristics associated with NIST.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "The source emphasizes the classic cloud characteristics associated with NIST.\n\nOn-demand self-service:\nUsers can provision resources without waiting for manual infrastructure teams.\n\nBroad network access:\nServices are reachable through network mechanisms appropriate to their design,\nwhich can include public or private connectivity.\n\nResource pooling:\nProvider infrastructure is shared through a large resource pool while logical\nisolation is maintained between customers.\n\nRapid elasticity:\nCapacity can be expanded or reduced as demand changes.\n\nMeasured service:\nUsage is measured so consumption can be monitored and charged according to the\nservice's pricing model." },
                { title: "Example", content: "A ticketing system might need little capacity on an ordinary Tuesday but experience\na huge burst when a popular event goes on sale. Elastic capacity is valuable because\nthe application does not need its peak size all year." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Operational Benefits",
              slug: "operational-benefits",
              description: "Cloud adoption can provide: - faster provisioning; - easier experimentation; - automation; - global deployment options; - elastic capacity; - managed services; - reduced physica...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Cloud adoption can provide:\n- faster provisioning;\n- easier experimentation;\n- automation;\n- global deployment options;\n- elastic capacity;\n- managed services;\n- reduced physical infrastructure work;\n- easier disaster-recovery planning.\n\nHowever, cloud also introduces:\n- service configuration complexity;\n- new security responsibilities;\n- usage-based costs;\n- provider-specific architecture;\n- dependency on connectivity;\n- the need for operational discipline." },
                { title: "Example", content: "Suppose a production team needs to apply operational benefits while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Cloud Provider Limitations",
              slug: "cloud-provider-limitations",
              description: "Moving responsibility to a provider does not remove responsibility entirely.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Moving responsibility to a provider does not remove responsibility entirely.\n\nPossible limitations include:\n- regional service differences;\n- quotas and limits;\n- service-specific availability;\n- migration complexity;\n- vendor-specific interfaces;\n- unexpected data-transfer costs;\n- operational learning requirements.\n\nA good architecture begins with requirements rather than selecting services first." },
                { title: "Example", content: "Suppose a production team needs to apply cloud provider limitations while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Data Security",
              slug: "data-security",
              description: "Data security involves protecting: - data at rest; - data in transit; - credentials; - encryption keys; - backups; - access permissions; - sensitive application records.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Data security involves protecting:\n- data at rest;\n- data in transit;\n- credentials;\n- encryption keys;\n- backups;\n- access permissions;\n- sensitive application records.\n\nEncryption alone is not a complete security strategy. Authorization, network controls,\nmonitoring, credential management, and secure application design are equally important." },
                { title: "Example", content: "An order service stores customer information in a database. The design encrypts stored data, protects connections in transit, limits access, secures credentials, and monitors sensitive operations." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Network Security",
              slug: "network-security",
              description: "Network security can include: - VPC segmentation; - security groups; - network ACLs; - private subnets; - controlled routes; - private service endpoints; - VPN; - dedicated conn...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Network security can include:\n- VPC segmentation;\n- security groups;\n- network ACLs;\n- private subnets;\n- controlled routes;\n- private service endpoints;\n- VPN;\n- dedicated connectivity;\n- logging and monitoring.\n\nA strong design asks:\n\"Who should be able to communicate with whom, over which protocol and port, and why?\"" },
                { title: "Example", content: "A database only needs to receive connections from the application tier. Network segmentation and restrictive security rules prevent unrelated systems or the public internet from reaching the database port." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Application Security",
              slug: "application-security",
              description: "Application security remains a customer responsibility.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Application security remains a customer responsibility.\n\nImportant practices include:\n- validate input;\n- protect authentication;\n- enforce authorization;\n- avoid embedding secrets in source code;\n- patch dependencies;\n- log security-relevant events;\n- use least privilege;\n- protect sensitive data;\n- test failure paths." },
                { title: "Example", content: "An API accepts customer input and calls a database. The application validates input, authenticates callers, checks authorization, keeps secrets outside source code, and logs security-relevant events." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Compliance",
              slug: "compliance",
              description: "Cloud compliance means meeting applicable legal, regulatory, contractual, and organizational requirements.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Cloud compliance means meeting applicable legal, regulatory, contractual, and\norganizational requirements.\n\nCommon considerations include:\n- where data is stored;\n- who can access it;\n- how access is audited;\n- retention requirements;\n- encryption;\n- disaster recovery;\n- evidence collection.\n\nThe source discusses frameworks and regulated environments such as HIPAA, NIST\nguidance, and specialized government environments. Compliance requirements should\nalways be mapped to the actual workload and jurisdiction rather than assumed from a\nservice name." },
                { title: "Example", content: "A healthcare application may require strict controls around patient records. The\narchitecture should identify which components handle sensitive information, restrict\naccess, record relevant activity, and select locations and services consistent with\nthe organization's compliance requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "The Aws Sandbox",
              slug: "the-aws-sandbox",
              description: "A controlled learning environment is useful for experimentation.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A controlled learning environment is useful for experimentation.\n\nA safe practice environment should have:\n- limited permissions;\n- budgets or spending alerts;\n- tagging;\n- clear resource ownership;\n- cleanup procedures;\n- no unnecessary production credentials." },
                { title: "Example", content: "For learning EC2, create a small instance, tag it \"training\", record its purpose,\npractice the required operations, and delete it when finished." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Identify The Problem First",
              slug: "identify-the-problem-first",
              description: "Cloud design should begin with the problem.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Cloud design should begin with the problem.\n\nAsk:\n1. What does the application do?\n2. Who uses it?\n3. What traffic pattern is expected?\n4. What data must be stored?\n5. What availability is required?\n6. What recovery time is acceptable?\n7. What security controls are required?\n8. What latency is acceptable?\n9. What budget exists?\n10. How will the system be monitored?\n\nOnly after these questions should service selection begin." },
                { title: "Example", content: "Suppose a production team needs to apply identify the problem first while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Migrating Applications",
              slug: "migrating-applications",
              description: "A migration plan should identify: - source servers; - dependencies; - databases; - file shares; - DNS; - identity systems; - network requirements; - integration points; - testin...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A migration plan should identify:\n- source servers;\n- dependencies;\n- databases;\n- file shares;\n- DNS;\n- identity systems;\n- network requirements;\n- integration points;\n- testing requirements.\n\nA useful migration sequence is:\n\n```\nDiscover -> Assess -> Design -> Pilot -> Migrate -> Validate -> Optimize\n```" },
                { title: "Example", content: "A payroll system depends on a database, a file share, an internal identity service,\nand a reporting tool. Migrating the application server alone can break the system.\nDependency discovery must happen first." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Well-Architected Thinking",
              slug: "well-architected-thinking",
              description: "The source introduces the AWS Well-Architected approach as a way to reason about architecture quality.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "The source introduces the AWS Well-Architected approach as a way to reason about\narchitecture quality.\n\nCore areas commonly considered include:\n- operational excellence;\n- security;\n- reliability;\n- performance efficiency;\n- cost optimization;\n- sustainability.\n\nThe point is not to memorize six labels. The point is to evaluate a design from\nmultiple engineering perspectives." },
                { title: "Example", content: "Before launching an API, the team reviews security, reliability, performance, cost, operations, and sustainability instead of evaluating only whether the API works." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Well-Architected Tool",
              slug: "well-architected-tool",
              description: "A structured review can help identify architectural risks and improvement areas.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A structured review can help identify architectural risks and improvement areas.\n\nA useful review asks:\n- Can the system recover from failure?\n- Are permissions too broad?\n- Can traffic increase safely?\n- Are costs visible?\n- Are operational procedures documented?\n- Is performance measured?\n- Is unnecessary infrastructure being maintained?" },
                { title: "Example", content: "Suppose a production team needs to apply well-architected tool while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
          ],
        },
        {
          title: "AWS Global Services and Architecture",
          slug: "aws-global-services-and-architecture",
          description: "Understand Regions, Availability Zones, latency, global architecture, service availability, and the major factors that influence AWS cost.",
          topics: [
            {
              title: "Location As An Architectural Decision",
              slug: "location-as-an-architectural-decision",
              description: "AWS resources are distributed geographically.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "AWS resources are distributed geographically. Location affects:\n- latency;\n- availability;\n- compliance;\n- disaster recovery;\n- cost;\n- service availability;\n- data residency.\n\nChoosing a location is therefore an architecture decision, not simply a console\nselection." },
                { title: "Example", content: "Suppose a production team needs to apply location as an architectural decision while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Aws Regions",
              slug: "aws-regions",
              description: "A Region is a geographic AWS infrastructure area containing multiple Availability Zones.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A Region is a geographic AWS infrastructure area containing multiple Availability\nZones.\n\nA workload can be designed for one Region or multiple Regions depending on its\nrequirements.\n\nSingle-Region design can be simpler and less expensive.\n\nMulti-Region design can improve geographic resilience but introduces:\n- data replication;\n- traffic routing;\n- operational complexity;\n- consistency challenges;\n- additional cost." },
                { title: "Example", content: "An application serving users primarily in India may choose a nearby Region to reduce\nnetwork latency, while a globally distributed system may need a broader deployment\nstrategy." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Region Isolation",
              slug: "region-isolation",
              description: "Regions are intentionally separated environments.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Regions are intentionally separated environments. A problem affecting one Region\ndoes not automatically mean another Region fails in exactly the same way.\n\nThis isolation can support disaster-recovery planning.\n\nHowever, Region isolation is not a substitute for application-level backup and\nrecovery." },
                { title: "Example", content: "Suppose a production team needs to apply region isolation while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Availability Zones",
              slug: "availability-zones",
              description: "An Availability Zone is an isolated location within a Region.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An Availability Zone is an isolated location within a Region.\n\nThe architectural objective is to avoid placing every critical component in one\nfailure domain.\n\nA common resilient design is:\n\n```\nInternet\n|\nLoad Balancer\n/       \\\nAZ-A     AZ-B\n|         |\n```\nApp-A     App-B\n```\n\\       /\nDatabase\n```\n\nThe exact service arrangement depends on workload requirements." },
                { title: "Example", content: "A web application runs two application instances in separate Availability Zones. If one zone becomes unavailable, the other can continue serving traffic while capacity is restored." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Distributing Across Availability Zones",
              slug: "distributing-across-availability-zones",
              description: "If all application servers are in one Availability Zone, a zone-level failure can remove the entire application tier.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "If all application servers are in one Availability Zone, a zone-level failure can\nremove the entire application tier.\n\nSpreading instances across zones reduces this concentration.\n\nThe same reasoning applies to:\n- application servers;\n- load-balancing targets;\n- databases where supported;\n- caching layers;\n- critical supporting services." },
                { title: "Example", content: "Suppose an application has four servers. A poor design puts all four in one zone.\nA more resilient arrangement can distribute them across two or more zones so that\none zone loss does not remove every server." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Service-Level Agreements",
              slug: "service-level-agreements",
              description: "An SLA defines service commitments and conditions associated with availability or other measurable service characteristics.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An SLA defines service commitments and conditions associated with availability or\nother measurable service characteristics.\n\nImportant lesson:\nAn SLA is not the same as application availability.\n\nIf your application depends on several services, its overall availability can be\nlower than the availability of each individual dependency.\n\nFor independent components:\n\n```\nP(all available) = P(A) × P(B) × P(C)\n```\n\nThis is a simplified reliability model and assumes independence." },
                { title: "Example", content: "Suppose a production team needs to apply service-level agreements while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Everything Fails",
              slug: "everything-fails",
              description: "Reliable architecture assumes failure is possible.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Reliable architecture assumes failure is possible.\n\nPotential failures include:\n- instance failure;\n- disk failure;\n- network interruption;\n- software defects;\n- bad deployments;\n- credential problems;\n- dependency outages;\n- zone-level failure;\n- human error.\n\nDesign questions:\n- What happens when one instance dies?\n- What happens when a zone disappears?\n- Can traffic be redirected?\n- Can data be restored?\n- Can operators identify the problem quickly?" },
                { title: "Example", content: "Suppose a production team needs to apply everything fails while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Global Edge Services",
              slug: "global-edge-services",
              description: "Edge infrastructure places certain capabilities closer to users.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Edge infrastructure places certain capabilities closer to users.\n\nEdge-oriented services can help with:\n- content delivery;\n- DNS;\n- traffic acceleration;\n- request routing;\n- security controls at the network edge.\n\nThe important architectural principle is reducing unnecessary distance between users\nand frequently accessed resources." },
                { title: "Example", content: "Suppose a production team needs to apply global edge services while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Choosing A Region",
              slug: "choosing-a-region",
              description: "Evaluate: - user location; - regulatory requirements; - required services; - latency; - disaster recovery; - pricing; - data-transfer implications; - operational requirements.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Evaluate:\n- user location;\n- regulatory requirements;\n- required services;\n- latency;\n- disaster recovery;\n- pricing;\n- data-transfer implications;\n- operational requirements.\n\nDo not choose a Region solely because it is geographically close." },
                { title: "Example", content: "Suppose a production team needs to apply choosing a region while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Compliance And Location",
              slug: "compliance-and-location",
              description: "Some workloads have contractual or regulatory requirements about where information can be processed or stored.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Data residency may matter. Some workloads have contractual or regulatory\nrequirements about where information can be processed or stored.\n\nBuild a location matrix:\n\n```\nRequirement      Region A   Region B   Region C\nData residency      ?          ?          ?\nService support     ?          ?          ?\nLatency             ?          ?          ?\nCost                ?          ?          ?\nDR option           ?          ?          ?\n```" },
                { title: "Example", content: "A healthcare workload handles sensitive records. The architecture identifies the components that process those records, limits access, records relevant activity, and selects storage and locations that satisfy the applicable requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Latency",
              slug: "latency",
              description: "Latency is the time required for communication between endpoints.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Latency is the time required for communication between endpoints.\n\nLatency affects:\n- API response time;\n- database calls;\n- interactive applications;\n- user experience;\n- distributed system behavior.\n\nReducing latency can involve:\n- selecting an appropriate Region;\n- caching;\n- edge delivery;\n- reducing unnecessary network round trips;\n- keeping tightly coupled components geographically close." },
                { title: "Example", content: "A mobile application makes several remote database calls for one screen. Moving tightly coupled components closer together and reducing unnecessary round trips can improve response time." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Service Availability By Region",
              slug: "service-availability-by-region",
              description: "Not every AWS service or capability is necessarily available in every Region in the same form.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Not every AWS service or capability is necessarily available in every Region in\nthe same form.\n\nTherefore, architecture should validate service availability before committing to\na location." },
                { title: "Example", content: "Suppose a production team needs to apply service availability by region while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Cost Model",
              slug: "cost-model",
              description: "AWS costs can arise from: - compute; - storage; - database capacity; - requests; - data transfer; - monitoring; - configuration and management services; - backup; - networking.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "AWS costs can arise from:\n- compute;\n- storage;\n- database capacity;\n- requests;\n- data transfer;\n- monitoring;\n- configuration and management services;\n- backup;\n- networking.\n\nA cost estimate should model the workload, not merely count resources." },
                { title: "Example", content: "A data-processing workload is estimated using compute hours, storage, requests, database usage, data transfer, monitoring, and backup rather than counting only EC2 instances." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Tiered Pricing",
              slug: "tiered-pricing",
              description: "Some AWS services use tiered pricing where unit costs change with usage levels.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Some AWS services use tiered pricing where unit costs change with usage levels.\n\nThe practical lesson is:\n\"more usage\" does not always mean a simple multiplication of the first unit price." },
                { title: "Example", content: "Suppose a production team needs to apply tiered pricing while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Compute Cost Optimization",
              slug: "compute-cost-optimization",
              description: "Potential strategies: - right-size instances; - shut down unused development resources; - use elastic scaling; - select appropriate purchasing options; - use managed/serverless...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Potential strategies:\n- right-size instances;\n- shut down unused development resources;\n- use elastic scaling;\n- select appropriate purchasing options;\n- use managed/serverless services when economically justified;\n- monitor idle capacity." },
                { title: "Example", content: "The application tier runs stateless instances behind an ALB and Auto Scaling Group so any healthy instance can handle the next request." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Storage Cost Optimization",
              slug: "storage-cost-optimization",
              description: "Storage decisions should consider: - capacity; - access frequency; - retrieval patterns; - durability; - performance; - lifecycle; - backup requirements.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Storage decisions should consider:\n- capacity;\n- access frequency;\n- retrieval patterns;\n- durability;\n- performance;\n- lifecycle;\n- backup requirements." },
                { title: "Example", content: "Restaurant images and customer uploads go to S3, transactional orders use a relational database, and frequently accessed data can use a cache." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Data Transfer Costs",
              slug: "data-transfer-costs",
              description: "Network traffic can create cost, especially when moving data between certain services, zones, or Regions.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Network traffic can create cost, especially when moving data between certain\nservices, zones, or Regions.\n\nArchitecture should consider data movement before deployment." },
                { title: "Example", content: "If a service repeatedly transfers large datasets between geographically separated\ncomponents, the application may be paying for traffic that could have been reduced\nthrough better data locality, caching, batching, or architecture changes." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Cost Analysis Tools",
              slug: "cost-analysis-tools",
              description: "The source discusses tools such as: - Trusted Advisor; - AWS pricing calculators; - Total Cost of Ownership analysis.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "The source discusses tools such as:\n- Trusted Advisor;\n- AWS pricing calculators;\n- Total Cost of Ownership analysis.\n\nUse these tools as decision aids rather than treating their estimates as immutable\nanswers." },
                { title: "Example", content: "Suppose a production team needs to apply cost analysis tools while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
          ],
        },
        {
          title: "AWS Networking Services",
          slug: "aws-networking-services",
          description: "Build a strong networking foundation with VPCs, CIDR, subnets, routing, security groups, NACLs, endpoints, DNS, VPN, and Direct Connect.",
          topics: [
            {
              title: "Virtual Private Cloud",
              slug: "virtual-private-cloud",
              description: "A VPC is a logically isolated network environment in AWS.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A VPC is a logically isolated network environment in AWS.\n\nIt provides a foundation for organizing:\n- IP address ranges;\n- subnets;\n- routes;\n- security controls;\n- internet connectivity;\n- private connectivity;\n- service endpoints." },
                { title: "Example", content: "Suppose a production team needs to apply virtual private cloud while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Cidr Blocks",
              slug: "cidr-blocks",
              description: "A VPC requires an IP address range expressed using CIDR notation.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A VPC requires an IP address range expressed using CIDR notation.\n\nExample:\n\n```\n10.20.0.0/16\n```\n\nThis represents a network range large enough to divide into multiple subnets.\n\nSubnet planning should happen before large deployments because changing network\naddressing later can be disruptive." },
                { title: "Example", content: "A team chooses 10.20.0.0/16 for a VPC and reserves smaller ranges for application, database, and future subnets so the network can grow without redesigning addresses." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Planning The Primary Cidr",
              slug: "planning-the-primary-cidr",
              description: "Consider: - number of subnets; - future growth; - peering; - VPN; - on-premise networks; - overlapping ranges; - IPv6 requirements.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Consider:\n- number of subnets;\n- future growth;\n- peering;\n- VPN;\n- on-premise networks;\n- overlapping ranges;\n- IPv6 requirements.\n\nAvoid overlapping address ranges when networks will later need direct connectivity." },
                { title: "Example", content: "A company already uses 10.0.0.0/8 internally. Creating a cloud network that\noverlaps the exact address ranges needed by the corporate network can complicate\nrouting and connectivity." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Default Vpc",
              slug: "default-vpc",
              description: "AWS provides a default VPC in supported environments for convenience.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS provides a default VPC in supported environments for convenience.\n\nIt can be useful for learning and simple workloads, but production architectures\noften need deliberate network segmentation and security controls." },
                { title: "Example", content: "A company creates a VPC for its production application, allocates a non-overlapping CIDR range, and divides the network into public entry points and private application and database tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Subnets",
              slug: "subnets",
              description: "A subnet is an IP range inside a VPC associated with an Availability Zone.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A subnet is an IP range inside a VPC associated with an Availability Zone.\n\nSubnets are often classified as:\n- public;\n- private.\n\nA subnet is considered public when its routing configuration allows a path to an\nInternet Gateway and resources have appropriate public addressing.\n\nA private subnet does not directly provide such a route." },
                { title: "Example", content: "A load balancer is placed in public subnets while application instances and databases use private subnets, creating a clear separation between public entry points and internal tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Public Subnet Example",
              slug: "public-subnet-example",
              description: "A public-facing load balancer may live in public subnets.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A public-facing load balancer may live in public subnets.\n\nTypical flow:\n\n```\nUser\n|\nInternet Gateway\n|\nPublic Load Balancer\n|\nPrivate Application Servers\n|\nPrivate Database\n```\n\nThe application servers do not need to be directly reachable from the public\ninternet." },
                { title: "Example", content: "A load balancer is placed in public subnets while application instances and databases use private subnets, creating a clear separation between public entry points and internal tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Nat Services",
              slug: "nat-services",
              description: "A private resource may need outbound internet access for tasks such as: - downloading updates; - calling an external API; - retrieving packages.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A private resource may need outbound internet access for tasks such as:\n- downloading updates;\n- calling an external API;\n- retrieving packages.\n\nNAT allows suitable outbound connectivity while avoiding direct inbound initiation\nfrom the public internet to those private resources." },
                { title: "Example", content: "A private application server needs to download an operating-system update. It uses controlled outbound connectivity through NAT without exposing the server to direct inbound internet initiation." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Route Tables",
              slug: "route-tables",
              description: "A route table determines where network traffic is sent.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A route table determines where network traffic is sent.\n\nA simplified route might be:\n\n```\nDestination: 0.0.0.0/0\nTarget: Internet Gateway\n```\n\nAnother might direct traffic to a NAT device or internal network.\n\nRouting is evaluated based on destination and route specificity." },
                { title: "Example", content: "A public subnet has a default route toward an Internet Gateway, while a private subnet uses a different route for controlled outbound access. Each route table reflects the subnet's intended traffic pattern." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Main Route Table",
              slug: "main-route-table",
              description: "A VPC has a main route table used by subnets that are not explicitly associated with another route table.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A VPC has a main route table used by subnets that are not explicitly associated\nwith another route table.\n\nExplicit associations are usually easier to reason about in carefully designed\nproduction environments." },
                { title: "Example", content: "A public subnet has a default route toward an Internet Gateway, while a private subnet uses a different route for controlled outbound access. Each route table reflects the subnet's intended traffic pattern." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Private Ipv4 Addresses",
              slug: "private-ipv4-addresses",
              description: "Private addresses are used for internal communication and are not directly routable across the public internet.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Private addresses are used for internal communication and are not directly\nroutable across the public internet.\n\nUse private addressing for internal tiers whenever public exposure is unnecessary." },
                { title: "Example", content: "Suppose a production team needs to apply private ipv4 addresses while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Elastic Ip",
              slug: "elastic-ip",
              description: "An Elastic IP is a persistent public IPv4 address that can be associated with appropriate AWS resources.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An Elastic IP is a persistent public IPv4 address that can be associated with\nappropriate AWS resources.\n\nIt can be useful when a stable public address is required, but it should not be\nused as a substitute for a resilient architecture." },
                { title: "Example", content: "Suppose a production team needs to apply elastic ip while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Byoip",
              slug: "byoip",
              description: "Bring Your Own IP allows organizations with eligible address space to advertise their own IP ranges through supported AWS capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Bring Your Own IP allows organizations with eligible address space to advertise\ntheir own IP ranges through supported AWS capabilities.\n\nThis is useful for organizations with established addressing requirements." },
                { title: "Example", content: "Suppose a production team needs to apply byoip while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Ipv6",
              slug: "ipv6",
              description: "IPv6 provides a much larger address space than IPv4.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "IPv6 provides a much larger address space than IPv4.\n\nA modern design should understand:\n- IPv6 addressing;\n- routing;\n- security controls;\n- application compatibility;\n- dual-stack considerations." },
                { title: "Example", content: "Suppose a production team needs to apply ipv6 while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Security Groups",
              slug: "security-groups",
              description: "Security groups act as stateful traffic controls associated with supported network interfaces/resources.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Security groups act as stateful traffic controls associated with supported network\ninterfaces/resources.\n\nThey commonly define allowed inbound and outbound traffic.\n\nExample:\n\n```\nWeb SG:\nallow TCP 443 from internet\n```\n\n```\nApp SG:\nallow TCP 8080 from Web SG\n```\n\n```\nDB SG:\nallow TCP 5432 from App SG\n```\n\nThis is stronger than allowing the database port from the entire internet." },
                { title: "Example", content: "A web tier allows HTTPS from the internet, the application tier allows its application port only from the web tier, and the database allows its database port only from the application tier." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Network Acls",
              slug: "network-acls",
              description: "Network ACLs operate at the subnet boundary and provide stateless filtering.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Network ACLs operate at the subnet boundary and provide stateless filtering.\n\nSecurity groups and network ACLs solve related but different problems.\n\nA useful comparison:\n\n```\nSecurity Group\n- stateful\n- associated with network interfaces/resources\n- allow rules\n```\n\n```\nNetwork ACL\n- stateless\n- associated with subnets\n- ordered allow/deny rules\n```" },
                { title: "Example", content: "A subnet uses an NACL to explicitly allow and deny traffic at the subnet boundary. Because NACLs are stateless, the return traffic must be considered separately." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Ephemeral Ports",
              slug: "ephemeral-ports",
              description: "Clients often use temporary source ports when making outbound connections.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Clients often use temporary source ports when making outbound connections.\n\nNetwork filtering must account for return traffic and the behavior of the protocol.\n\nThis is particularly important when configuring stateless controls." },
                { title: "Example", content: "Suppose a production team needs to apply ephemeral ports while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Vpc Flow Logs",
              slug: "vpc-flow-logs",
              description: "Flow logs provide visibility into network traffic metadata.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Flow logs provide visibility into network traffic metadata.\n\nThey can help investigate:\n- rejected traffic;\n- unexpected connections;\n- connectivity problems;\n- security incidents;\n- network behavior.\n\nFlow logs do not replace application logging." },
                { title: "Example", content: "A company creates a VPC for its production application, allocates a non-overlapping CIDR range, and divides the network into public entry points and private application and database tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Vpc Peering",
              slug: "vpc-peering",
              description: "VPC peering creates network connectivity between VPCs.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "VPC peering creates network connectivity between VPCs.\n\nCommon reasons:\n- shared services;\n- application separation;\n- organizational boundaries.\n\nDesign must consider:\n- route tables;\n- non-overlapping CIDRs;\n- security controls;\n- DNS;\n- scaling of connectivity." },
                { title: "Example", content: "A company creates a VPC for its production application, allocates a non-overlapping CIDR range, and divides the network into public entry points and private application and database tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Vpc Endpoints",
              slug: "vpc-endpoints",
              description: "Endpoints provide private connectivity from a VPC to supported AWS services.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Endpoints provide private connectivity from a VPC to supported AWS services.\n\nGateway endpoints and interface endpoints use different mechanisms and supported\nservice patterns.\n\nBenefits can include:\n- reduced dependence on public internet paths;\n- stronger network isolation;\n- simpler private service access;\n- potentially improved architecture and security." },
                { title: "Example", content: "A company creates a VPC for its production application, allocates a non-overlapping CIDR range, and divides the network into public entry points and private application and database tiers." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Internet Gateway",
              slug: "internet-gateway",
              description: "An Internet Gateway connects a VPC to the internet when routing and addressing allow it.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "An Internet Gateway connects a VPC to the internet when routing and addressing\nallow it.\n\nIt is not itself a firewall.\n\nSecurity groups, NACLs, application controls, and identity controls still matter." },
                { title: "Example", content: "A public load balancer receives internet traffic through the VPC's Internet Gateway path, with routing, addressing, and security controls configured to permit the intended connections." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Vpn",
              slug: "vpn",
              description: "A VPN can establish encrypted connectivity between networks over suitable paths.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A VPN can establish encrypted connectivity between networks over suitable paths.\n\nTypical use:\n- connect corporate networks to AWS;\n- hybrid application architecture;\n- administrative connectivity." },
                { title: "Example", content: "A company keeps its office network on premises but needs private connectivity to AWS. A site-to-site VPN provides an encrypted connection over supported network paths." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Virtual Private Gateway",
              slug: "virtual-private-gateway",
              description: "A virtual private gateway can participate in VPN connectivity for a VPC.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A virtual private gateway can participate in VPN connectivity for a VPC.\n\nRouting configuration determines which traffic uses the connection." },
                { title: "Example", content: "Suppose a production team needs to apply virtual private gateway while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Vpn Cloudhub",
              slug: "vpn-cloudhub",
              description: "A hub-style architecture can connect multiple sites through AWS networking capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A hub-style architecture can connect multiple sites through AWS networking\ncapabilities.\n\nThis can reduce the need for every site to maintain a direct connection to every\nother site." },
                { title: "Example", content: "A company keeps its office network on premises but needs private connectivity to AWS. A site-to-site VPN provides an encrypted connection over supported network paths." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Route Propagation",
              slug: "route-propagation",
              description: "Routing information can be propagated from certain connectivity components.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Routing information can be propagated from certain connectivity components.\n\nUnderstanding propagation prevents confusing manual routes with learned routes." },
                { title: "Example", content: "Suppose a production team needs to apply route propagation while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Direct Connect",
              slug: "direct-connect",
              description: "Direct Connect provides dedicated network connectivity between an organization and AWS.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Direct Connect provides dedicated network connectivity between an organization\nand AWS.\n\nPotential benefits:\n- predictable connectivity;\n- private network path;\n- large data-transfer workloads;\n- hybrid architectures.\n\nIt is not automatically encrypted merely because it is dedicated; security\nrequirements must be evaluated separately." },
                { title: "Example", content: "A company transfers large amounts of data between its data center and AWS and wants a dedicated connectivity option. Direct Connect can provide a more predictable network path, while encryption requirements are evaluated separately." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Route 53",
              slug: "route-53",
              description: "Route 53 provides DNS and traffic-management capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Route 53 provides DNS and traffic-management capabilities.\n\nDNS converts names into addresses or routing decisions.\n\nExample:\n\n```\napi.example.com -> application endpoint\n```" },
                { title: "Example", content: "Customers access shop.example.com. DNS resolution directs them to the application's endpoint, while routing policies can support requirements such as failover or latency-aware traffic distribution." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Dns Routing Options",
              slug: "dns-routing-options",
              description: "Traffic policies can support strategies such as: - simple routing; - weighted routing; - latency-based routing; - failover; - geolocation-oriented routing.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Traffic policies can support strategies such as:\n- simple routing;\n- weighted routing;\n- latency-based routing;\n- failover;\n- geolocation-oriented routing.\n\nChoose based on the actual application requirement." },
                { title: "Example", content: "Suppose a production team needs to apply dns routing options while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Health Checks",
              slug: "health-checks-3-28",
              description: "Health checks can support failover decisions by identifying unhealthy endpoints.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Health checks can support failover decisions by identifying unhealthy endpoints.\n\nA health check is useful only if the endpoint reflects meaningful application\nhealth." },
                { title: "Example", content: "A failover endpoint responds successfully at the network level but its application is broken. A meaningful health check should test the condition that actually determines whether the endpoint can serve traffic." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Private Dns Zones",
              slug: "private-dns-zones",
              description: "Private DNS zones allow internal name resolution for private resources.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Private DNS zones allow internal name resolution for private resources." },
                { title: "Example", content: "Public users resolve:\n\n```\nshop.example.com\n```\n\nInternal services may resolve:\n\n```\norders.internal.example.com\n```\n\nThe internal name can remain inaccessible from the public internet." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Networking Design Example",
              slug: "networking-design-example",
              description: "For an online store:  Supporting connectivity: - NAT for controlled outbound access; - VPC endpoints for suitable AWS services; - security groups between tiers; - flow logs for...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "For an online store:\n\n```\nInternet\n|\nRoute 53\n|\nPublic ALB\n|\nPrivate App Subnets\n|\nPrivate Database Subnets\n```\n\nSupporting connectivity:\n- NAT for controlled outbound access;\n- VPC endpoints for suitable AWS services;\n- security groups between tiers;\n- flow logs for visibility." },
                { title: "Example", content: "The food-delivery platform uses public subnets for the ALB, private subnets for application instances, and private database subnets for transactional storage." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
          ],
        },
        {
          title: "Compute Services",
          slug: "compute-services",
          description: "Understand EC2, AMIs, instance families, pricing, containers, ECS, EKS, Fargate, Lambda, and practical compute selection.",
          topics: [
            {
              title: "Ec2 Fundamentals",
              slug: "ec2-fundamentals",
              description: "Amazon EC2 provides virtual compute capacity.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Amazon EC2 provides virtual compute capacity.\n\nAn EC2 instance is a virtual server with:\n- CPU capacity;\n- memory;\n- network capability;\n- storage options;\n- operating system;\n- security configuration.\n\nThe customer selects the instance characteristics and operating environment." },
                { title: "Example", content: "A Java API needs a continuously running server with OS-level control. The team launches EC2 instances, places them in private subnets, and manages the application and operating system lifecycle." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Virtualization And Nitro",
              slug: "virtualization-and-nitro",
              description: "Modern AWS compute uses specialized virtualization and hardware architecture.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Modern AWS compute uses specialized virtualization and hardware architecture.\nThe Nitro system offloads selected virtualization and networking/storage functions\nto dedicated components, allowing AWS to provide high-performance instances with\nstrong isolation.\n\nFor architecture discussions, remember the outcome:\n- efficient virtualization;\n- high network/storage performance;\n- strong isolation;\n- support for many instance designs." },
                { title: "Example", content: "Suppose a production team needs to apply virtualization and nitro while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Instance Families",
              slug: "instance-families",
              description: "Instance families are optimized for different workloads.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Instance families are optimized for different workloads.\n\nGeneral-purpose:\n- balanced CPU, memory, and networking.\n\nBurstable:\n- suitable for workloads with variable CPU demand.\n\nCompute-optimized:\n- CPU-heavy workloads.\n\nMemory-optimized:\n- applications requiring large memory capacity.\n\nAccelerated computing:\n- GPU or specialized accelerator workloads.\n\nStorage-optimized:\n- high local storage performance or capacity." },
                { title: "Example", content: "A small API may use general-purpose capacity. A video-processing workload may benefit\nfrom compute-optimized or accelerated instances. A large in-memory analytics system\nmay need memory-optimized capacity." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Vcpu",
              slug: "vcpu",
              description: "A vCPU represents a unit of virtualized CPU capacity exposed to an instance.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A vCPU represents a unit of virtualized CPU capacity exposed to an instance.\n\nDo not assume that vCPU count alone predicts application performance. CPU generation,\narchitecture, memory ratio, workload behavior, and network/storage characteristics\nalso matter." },
                { title: "Example", content: "Suppose a production team needs to apply vcpu while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Instance Selection",
              slug: "instance-selection",
              description: "Does it need local high-speed storage?",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Ask:\n1. Is the workload CPU-bound?\n2. Is it memory-bound?\n3. Is it network-heavy?\n4. Does it need GPU acceleration?\n5. Does it need local high-speed storage?\n6. Is the workload steady or bursty?\n7. What latency is required?" },
                { title: "Example", content: "Suppose a production team needs to apply instance selection while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Bare Metal",
              slug: "bare-metal",
              description: "Bare-metal instances provide direct access to physical server resources for specialized requirements.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Bare-metal instances provide direct access to physical server resources for\nspecialized requirements.\n\nThey can be useful where virtualization overhead, licensing, or hardware-level\nrequirements justify them." },
                { title: "Example", content: "Suppose a production team needs to apply bare metal while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Dedicated Hosts",
              slug: "dedicated-hosts",
              description: "A Dedicated Host provides a physical server dedicated to one customer account.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A Dedicated Host provides a physical server dedicated to one customer account.\n\nPotential reasons include:\n- licensing requirements;\n- compliance;\n- hardware placement control." },
                { title: "Example", content: "A deployment process needs temporary credentials for a limited operation. STS can issue temporary security credentials that expire rather than creating another long-lived access key." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Dedicated Instances",
              slug: "dedicated-instances",
              description: "Dedicated Instances run on hardware dedicated to a customer but differ from Dedicated Hosts in control and management characteristics.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Dedicated Instances run on hardware dedicated to a customer but differ from\nDedicated Hosts in control and management characteristics.\n\nKnow the distinction when discussing licensing and physical tenancy." },
                { title: "Example", content: "Suppose a production team needs to apply dedicated instances while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Network Performance",
              slug: "network-performance",
              description: "EC2 instance types can have different network performance characteristics.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "EC2 instance types can have different network performance characteristics.\n\nHigh-throughput applications should evaluate:\n- network bandwidth;\n- packet rate;\n- enhanced networking;\n- placement;\n- downstream service capacity." },
                { title: "Example", content: "The food-delivery platform uses public subnets for the ALB, private subnets for application instances, and private database subnets for transactional storage." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Amazon Machine Images",
              slug: "amazon-machine-images",
              description: "An AMI is a template used to launch EC2 instances.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "An AMI is a template used to launch EC2 instances.\n\nIt can include:\n- operating system;\n- installed software;\n- configuration;\n- storage mappings.\n\nA custom AMI can standardize deployments." },
                { title: "Example", content: "Suppose a production team needs to apply amazon machine images while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Ami Design",
              slug: "ami-design",
              description: "A good image should be: - repeatable; - minimal; - patched; - versioned; - documented; - free of unnecessary secrets.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A good image should be:\n- repeatable;\n- minimal;\n- patched;\n- versioned;\n- documented;\n- free of unnecessary secrets.\n\nNever bake long-lived credentials into an image." },
                { title: "Example", content: "A platform team builds a patched AMI containing the operating system and application prerequisites. New instances launched from that image start from a consistent baseline." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Linux And Windows Amis",
              slug: "linux-and-windows-amis",
              description: "AWS supports different operating-system images.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS supports different operating-system images. Choose based on:\n- application compatibility;\n- licensing;\n- operational expertise;\n- security requirements;\n- management tooling." },
                { title: "Example", content: "A platform team builds a patched AMI containing the operating system and application prerequisites. New instances launched from that image start from a consistent baseline." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Aws Marketplace",
              slug: "aws-marketplace",
              description: "Marketplace provides third-party software and solution offerings that can be deployed on AWS.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Marketplace provides third-party software and solution offerings that can be\ndeployed on AWS.\n\nEvaluate:\n- licensing;\n- support;\n- update process;\n- security;\n- cost." },
                { title: "Example", content: "Suppose a production team needs to apply aws marketplace while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Custom Ami Process",
              slug: "custom-ami-process",
              description: "Understand custom ami process and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A typical pattern:\n\n```\nBase image\n|\nInstall dependencies\n|\nConfigure application\n|\nValidate\n|\nCreate image\n|\nLaunch consistent instances\n```" },
                { title: "Example", content: "A platform team builds a patched AMI containing the operating system and application prerequisites. New instances launched from that image start from a consistent baseline." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Tags",
              slug: "tags",
              description: "Tags are key-value metadata attached to resources.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Tags are key-value metadata attached to resources.\n\nUseful tags:\n- Environment=Production\n- Application=Orders\n- Owner=Platform\n- CostCenter=Finance\n- ManagedBy=Automation\n\nTags support:\n- cost allocation;\n- inventory;\n- automation;\n- operations;\n- governance." },
                { title: "Example", content: "Suppose a production team needs to apply tags while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Launch Templates",
              slug: "launch-templates",
              description: "Launch templates define reusable instance-launch parameters.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Launch templates define reusable instance-launch parameters.\n\nThey can specify:\n- AMI;\n- instance type;\n- networking;\n- security groups;\n- storage;\n- user data;\n- IAM role;\n- tags.\n\nThey are especially useful with Auto Scaling." },
                { title: "Example", content: "An Auto Scaling Group uses a launch template that defines the AMI, instance type, security groups, IAM role, storage, tags, and user-data initialization so new instances are configured consistently." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Ec2 Pricing Models",
              slug: "ec2-pricing-models",
              description: "The source discusses several purchasing approaches.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "The source discusses several purchasing approaches.\n\nOn-demand:\n- flexible;\n- no long commitment;\n- useful for uncertain workloads.\n\nReserved pricing:\n- commitment can reduce cost for suitable steady workloads.\n\nSpot:\n- uses spare capacity;\n- can be interrupted;\n- suitable for fault-tolerant workloads." },
                { title: "Example", content: "A batch image-resizing system can maintain a queue of jobs. If an instance is\ninterrupted, another worker can continue later. This makes the workload a stronger\ncandidate for interruption-tolerant capacity." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Spot Fleet And Ec2 Fleet",
              slug: "spot-fleet-and-ec2-fleet",
              description: "Fleet mechanisms help request multiple capacity types and improve the chance of obtaining required capacity while balancing cost and availability.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Fleet mechanisms help request multiple capacity types and improve the chance of\nobtaining required capacity while balancing cost and availability." },
                { title: "Example", content: "A Java API needs a continuously running server with OS-level control. The team launches EC2 instances, places them in private subnets, and manages the application and operating system lifecycle." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Instance Storage",
              slug: "instance-storage",
              description: "EC2 storage can include: - EBS volumes; - local instance storage where supported.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "EC2 storage can include:\n- EBS volumes;\n- local instance storage where supported.\n\nLocal instance storage is fast but generally tied to the lifecycle and placement\nof the instance. It should not be treated as the only copy of critical data." },
                { title: "Example", content: "Restaurant images and customer uploads go to S3, transactional orders use a relational database, and frequently accessed data can use a cache." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ec2 Auto Recovery",
              slug: "ec2-auto-recovery",
              description: "Recovery capabilities can automatically restore certain instance functionality after underlying infrastructure problems, depending on supported configurations.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Recovery capabilities can automatically restore certain instance functionality\nafter underlying infrastructure problems, depending on supported configurations.\n\nThis is a resilience mechanism, not a complete disaster-recovery solution." },
                { title: "Example", content: "A Java API needs a continuously running server with OS-level control. The team launches EC2 instances, places them in private subnets, and manages the application and operating system lifecycle." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Migration To Ec2",
              slug: "migration-to-ec2",
              description: "Understand migration to ec2 and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Migration can involve:\n1. inventory;\n2. dependency mapping;\n3. target sizing;\n4. network planning;\n5. image creation;\n6. data migration;\n7. testing;\n8. cutover;\n9. monitoring." },
                { title: "Example", content: "A Java API needs a continuously running server with OS-level control. The team launches EC2 instances, places them in private subnets, and manages the application and operating system lifecycle." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Aws Migration Hub",
              slug: "aws-migration-hub",
              description: "Migration Hub can provide a central view for tracking migration-related work across supported tools and workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Migration Hub can provide a central view for tracking migration-related work across\nsupported tools and workloads." },
                { title: "Example", content: "Suppose a production team needs to apply aws migration hub while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Server Migration Services",
              slug: "server-migration-services",
              description: "Migration tooling can help move server workloads into AWS.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Migration tooling can help move server workloads into AWS.\n\nAlways validate current service capabilities and supported migration paths before\nproduction planning." },
                { title: "Example", content: "Suppose a production team needs to apply server migration services while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Containers",
              slug: "containers",
              description: "Containers package applications and dependencies into portable runtime units.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Containers package applications and dependencies into portable runtime units.\n\nCompared with full virtual machines, containers usually share the host operating\nsystem kernel, which can reduce overhead." },
                { title: "Example", content: "A service packages its application and dependencies into a container image so the same artifact can be deployed consistently across development, testing, and production environments." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Ecs",
              slug: "ecs",
              description: "Amazon ECS is a managed container orchestration service.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Amazon ECS is a managed container orchestration service.\n\nA conceptual ECS deployment includes:\n- cluster;\n- task definition;\n- task;\n- service;\n- networking;\n- load balancing." },
                { title: "Example", content: "A team runs several containerized APIs and uses ECS to manage task definitions, tasks, services, networking, and load balancing without building its own container scheduler." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Fargate",
              slug: "fargate",
              description: "Fargate allows containers to run without the customer managing the underlying servers directly.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Fargate allows containers to run without the customer managing the underlying\nservers directly.\n\nThis shifts more infrastructure responsibility to AWS." },
                { title: "Example", content: "A team wants to run containers but does not want to manage the underlying EC2 instances. Fargate provides the container execution model while shifting server management to AWS." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Eks",
              slug: "eks",
              description: "Amazon EKS provides managed Kubernetes control-plane capabilities.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Amazon EKS provides managed Kubernetes control-plane capabilities.\n\nUse Kubernetes when its ecosystem, portability, organizational standards, or\noperational model justify the complexity.\n\nDo not select Kubernetes merely because containers are required." },
                { title: "Example", content: "An organization already standardizes on Kubernetes and needs its ecosystem and APIs. EKS can provide managed Kubernetes control-plane capabilities while the team manages the Kubernetes workload model." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Lightsail",
              slug: "lightsail",
              description: "Lightsail provides simplified cloud resources aimed at users who want a more straightforward experience for common workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Lightsail provides simplified cloud resources aimed at users who want a more\nstraightforward experience for common workloads." },
                { title: "Example", content: "Suppose a production team needs to apply lightsail while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Lambda",
              slug: "lambda",
              description: "Lambda executes functions without requiring customers to manage traditional servers.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Lambda executes functions without requiring customers to manage traditional servers.\n\nGood use cases include:\n- event processing;\n- lightweight APIs;\n- scheduled jobs;\n- automation;\n- asynchronous workflows." },
                { title: "Example", content: "When a file arrives in object storage, a Lambda function can validate its metadata\nand publish a message for downstream processing." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Firecracker",
              slug: "firecracker",
              description: "Firecracker is a virtualization technology designed for secure, lightweight microvirtual machines.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Firecracker is a virtualization technology designed for secure, lightweight\nmicrovirtual machines. It is relevant to highly isolated serverless-style execution\narchitectures." },
                { title: "Example", content: "Suppose a production team needs to apply firecracker while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
          ],
        },
        {
          title: "Scale and Resiliency",
          slug: "scale-and-resiliency",
          description: "Design systems that can scale and recover using monitoring, load balancing, health checks, Auto Scaling, and redundancy.",
          topics: [
            {
              title: "Monitoring",
              slug: "monitoring-5-1",
              description: "Monitoring answers: - Is the system healthy?",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Monitoring answers:\n- Is the system healthy?\n- Is performance degrading?\n- Is capacity sufficient?\n- Did a deployment cause a problem?\n- Is a dependency failing?\n- Is cost increasing unexpectedly?\n\nA useful monitoring model is:\n\n```\nMetrics -> detect\nLogs -> investigate\nTraces -> follow requests across services\nAlerts -> notify\nDashboards -> understand trends\n```" },
                { title: "Example", content: "The platform tracks latency, errors, capacity, database health, and application logs, with alarms connected to operational responses." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Cloudwatch",
              slug: "cloudwatch",
              description: "CloudWatch provides monitoring and operational visibility for AWS resources and applications.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "CloudWatch provides monitoring and operational visibility for AWS resources and\napplications.\n\nImportant concepts include:\n- metrics;\n- logs;\n- alarms;\n- dashboards;\n- events/actions depending on the integration." },
                { title: "Example", content: "A production API dashboard combines request count, latency, errors, CPU, and database connections. Operators can use these signals to detect degradation and investigate the likely bottleneck." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Metrics",
              slug: "metrics",
              description: "Metrics are numerical measurements over time.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Metrics are numerical measurements over time.\n\nExamples:\n- CPU utilization;\n- request count;\n- latency;\n- error count;\n- queue depth;\n- database connections." },
                { title: "Example", content: "An API team tracks p95 latency and error rate over time. A sudden rise in both signals indicates a user-visible performance problem that deserves investigation." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Logging",
              slug: "logging",
              description: "Logs record application or system events.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Logs record application or system events.\n\nGood application logs should provide enough context to investigate an issue without\nexposing sensitive information.\n\nUseful fields:\n- timestamp;\n- request identifier;\n- service name;\n- operation;\n- severity;\n- result;\n- relevant error information." },
                { title: "Example", content: "Suppose a production team needs to apply logging while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Cloudwatch Agent",
              slug: "cloudwatch-agent",
              description: "An agent can collect additional operating-system-level information and logs from supported environments.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "An agent can collect additional operating-system-level information and logs from\nsupported environments.\n\nThis is useful when default metrics are insufficient." },
                { title: "Example", content: "A production API dashboard combines request count, latency, errors, CPU, and database connections. Operators can use these signals to detect degradation and investigate the likely bottleneck." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Monitoring Plan",
              slug: "monitoring-plan",
              description: "Define: - what to monitor; - expected normal range; - warning threshold; - critical threshold; - who receives alerts; - what action follows an alert.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Define:\n- what to monitor;\n- expected normal range;\n- warning threshold;\n- critical threshold;\n- who receives alerts;\n- what action follows an alert.\n\nDo not create hundreds of alerts that nobody responds to." },
                { title: "Example", content: "The platform tracks latency, errors, capacity, database health, and application logs, with alarms connected to operational responses." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Dashboards",
              slug: "dashboards",
              description: "A dashboard should answer operational questions quickly.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A dashboard should answer operational questions quickly.\n\nFor an API, a useful dashboard might include:\n- requests per minute;\n- p50/p95/p99 latency;\n- 4xx rate;\n- 5xx rate;\n- CPU;\n- memory;\n- database connections;\n- queue depth." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Cloudwatch Alarms",
              slug: "cloudwatch-alarms",
              description: "An alarm evaluates a metric against configured conditions.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An alarm evaluates a metric against configured conditions.\n\nExample:\n\n```\nIf error rate > threshold\nfor N evaluation periods\n-> alarm\n-> notify or invoke configured action\n```\n\nThresholds should be based on workload behavior and business impact." },
                { title: "Example", content: "A production API dashboard combines request count, latency, errors, CPU, and database connections. Operators can use these signals to detect degradation and investigate the likely bottleneck." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Ec2 Monitoring",
              slug: "ec2-monitoring",
              description: "Monitor: - CPU; - network; - storage; - application health; - memory when collected; - process-level indicators.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Monitor:\n- CPU;\n- network;\n- storage;\n- application health;\n- memory when collected;\n- process-level indicators.\n\nHigh CPU is not automatically a failure. It may indicate healthy utilization or\ninsufficient capacity depending on context." },
                { title: "Example", content: "A Java API needs a continuously running server with OS-level control. The team launches EC2 instances, places them in private subnets, and manages the application and operating system lifecycle." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Recovery",
              slug: "recovery",
              description: "Recovery can include: - replacing failed instances; - restarting services; - using multiple zones; - restoring backups; - failing over databases; - rebuilding infrastructure fro...",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Recovery can include:\n- replacing failed instances;\n- restarting services;\n- using multiple zones;\n- restoring backups;\n- failing over databases;\n- rebuilding infrastructure from automation." },
                { title: "Example", content: "Suppose a production team needs to apply recovery while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Elastic Load Balancing",
              slug: "elastic-load-balancing",
              description: "Load balancing distributes requests among healthy targets.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Load balancing distributes requests among healthy targets.\n\nBenefits:\n- traffic distribution;\n- health checking;\n- reduced single-instance dependency;\n- support for scaling;\n- TLS termination depending on design." },
                { title: "Example", content: "Two application instances serve the same API behind a load balancer. Health checks remove an unhealthy instance from rotation while healthy instances continue receiving requests." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Redundancy By Design",
              slug: "redundancy-by-design",
              description: "A resilient architecture avoids single points of failure.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A resilient architecture avoids single points of failure.\n\nPoor design:\n\n```\nUser -> One EC2 -> Database\n```\n\nImproved design:\n\n```\nUser\n|\nLoad Balancer\n/       \\\n```\nEC2       EC2\n```\n\\       /\nDatabase\nHA design\n```" },
                { title: "Example", content: "Suppose a production team needs to apply redundancy by design while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Health Checks",
              slug: "health-checks-5-13",
              description: "Load balancers can check whether targets are healthy.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Load balancers can check whether targets are healthy.\n\nA good health endpoint should reflect meaningful readiness.\n\nExample:\n- /health/live: process is running;\n- /health/ready: service can actually serve traffic.\n\nThe exact endpoint design is application-specific." },
                { title: "Example", content: "A failover endpoint responds successfully at the network level but its application is broken. A meaningful health check should test the condition that actually determines whether the endpoint can serve traffic." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Application Load Balancer",
              slug: "application-load-balancer",
              description: "ALB operates at the application layer and supports HTTP/HTTPS-oriented routing.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "ALB operates at the application layer and supports HTTP/HTTPS-oriented routing.\n\nIt can route using:\n- host;\n- path;\n- headers;\n- query-related conditions depending on supported rules." },
                { title: "Example", content: "Requests to:\n- api.example.com/orders -> orders service\n- api.example.com/payments -> payments service\n\ncan be routed to different target groups." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Alb Listener",
              slug: "alb-listener",
              description: "A listener accepts connections on a protocol and port and applies rules.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A listener accepts connections on a protocol and port and applies rules.\n\nHTTPS listeners can terminate TLS before forwarding traffic to targets when designed\nthat way." },
                { title: "Example", content: "Suppose a production team needs to apply alb listener while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Target Groups",
              slug: "target-groups",
              description: "A target group represents a set of destinations for routing.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A target group represents a set of destinations for routing.\n\nTargets can be evaluated through health checks." },
                { title: "Example", content: "Suppose a production team needs to apply target groups while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Session Management",
              slug: "session-management",
              description: "Some applications historically rely on server-local session state.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Some applications historically rely on server-local session state.\n\nLoad-balanced applications should preferably externalize shared state when practical.\n\nSticky sessions can keep a client connected to the same target, but they can reduce\ndistribution flexibility and complicate failover." },
                { title: "Example", content: "Suppose a production team needs to apply session management while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Network Load Balancer",
              slug: "network-load-balancer",
              description: "NLB is designed for high-performance transport-layer traffic and specialized networking use cases.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "NLB is designed for high-performance transport-layer traffic and specialized\nnetworking use cases.\n\nChoose ALB versus NLB based on protocol, routing, performance, and application\nrequirements." },
                { title: "Example", content: "A service requires high-performance transport-layer networking rather than HTTP path routing. An NLB is evaluated because the protocol and performance requirements fit that model." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Scaling",
              slug: "scaling",
              description: "Scaling can be: - vertical: larger instance; - horizontal: more instances.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Scaling can be:\n- vertical: larger instance;\n- horizontal: more instances.\n\nHorizontal scaling is often more resilient because the application does not depend\non one large machine." },
                { title: "Example", content: "Suppose a production team needs to apply scaling while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Auto Scaling",
              slug: "auto-scaling",
              description: "Auto Scaling adjusts capacity based on demand or policy.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Auto Scaling adjusts capacity based on demand or policy.\n\nCommon signals:\n- CPU utilization;\n- request count;\n- queue length;\n- custom metrics;\n- schedules." },
                { title: "Example", content: "A service normally runs four instances but receives predictable evening traffic. Auto Scaling increases capacity as demand rises and reduces it after the peak, subject to configured limits." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Auto Scaling Components",
              slug: "auto-scaling-components",
              description: "Important pieces: - launch template; - Auto Scaling Group; - desired capacity; - minimum capacity; - maximum capacity; - scaling policy; - health checks; - lifecycle hooks.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Important pieces:\n- launch template;\n- Auto Scaling Group;\n- desired capacity;\n- minimum capacity;\n- maximum capacity;\n- scaling policy;\n- health checks;\n- lifecycle hooks." },
                { title: "Example", content: "A service normally runs four instances but receives predictable evening traffic. Auto Scaling increases capacity as demand rises and reduces it after the peak, subject to configured limits." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Launch Configuration",
              slug: "launch-configuration",
              description: "Older AWS architectures may use launch configurations.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Older AWS architectures may use launch configurations. Modern designs generally\nprefer launch templates for new deployments where supported." },
                { title: "Example", content: "Suppose a production team needs to apply launch configuration while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Auto Scaling Group",
              slug: "auto-scaling-group",
              description: "An ASG maintains a desired number of instances and can replace unhealthy instances.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An ASG maintains a desired number of instances and can replace unhealthy instances.\n\nExample:\n\n```\nmin = 2\ndesired = 4\nmax = 10\n```\n\nIf demand rises and policy requires six instances, the group can increase toward\nsix, subject to configured limits." },
                { title: "Example", content: "A service normally runs four instances but receives predictable evening traffic. Auto Scaling increases capacity as demand rises and reduces it after the peak, subject to configured limits." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Scaling Strategies",
              slug: "scaling-strategies",
              description: "Target tracking: Maintain a metric around a target.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Target tracking:\nMaintain a metric around a target.\n\nStep scaling:\nIncrease or decrease capacity by defined steps.\n\nScheduled scaling:\nAdjust capacity based on known time patterns.\n\nPredictive approaches:\nUse historical behavior where supported and appropriate." },
                { title: "Example", content: "Suppose a production team needs to apply scaling strategies while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Lifecycle Hooks",
              slug: "lifecycle-hooks",
              description: "Lifecycle hooks allow actions during instance launch or termination.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Lifecycle hooks allow actions during instance launch or termination.\n\nUseful for:\n- initialization;\n- registration;\n- draining;\n- cleanup;\n- configuration." },
                { title: "Example", content: "During instance termination, a lifecycle hook lets the system drain work and perform cleanup before the instance is fully removed." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Scale And Resiliency Example",
              slug: "scale-and-resiliency-example",
              description: "A flash-sale service can use:  Supporting: - multi-zone deployment; - alarms; - logging; - backups; - scaling policies.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A flash-sale service can use:\n\n```\nRoute 53\n|\nALB\n|\nAuto Scaling Group\n|\nApplication Instances\n|\nManaged Database\n|\nObject Storage\n```\n\nSupporting:\n- multi-zone deployment;\n- alarms;\n- logging;\n- backups;\n- scaling policies." },
                { title: "Example", content: "The service is distributed across multiple zones, uses health checks and automated replacement, maintains backups, and documents how operators recover from component failures." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
          ],
        },
        {
          title: "Storage and Data Services",
          slug: "storage-and-data-services",
          description: "Choose the right storage and database model across EBS, S3, EFS, RDS, Aurora, DynamoDB, ElastiCache, and hybrid transfer.",
          topics: [
            {
              title: "Storage Is A Workload Decision",
              slug: "storage-is-a-workload-decision",
              description: "Different data patterns need different storage models.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Different data patterns need different storage models.\n\nAsk:\n- Is data block, object, file, or database data?\n- Is access random or sequential?\n- Is low latency required?\n- Is the data shared?\n- How often is it accessed?\n- What durability and recovery requirements exist?" },
                { title: "Example", content: "Restaurant images and customer uploads go to S3, transactional orders use a relational database, and frequently accessed data can use a cache." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ebs Block Storage",
              slug: "ebs-block-storage",
              description: "EBS provides persistent block storage for supported compute workloads.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "EBS provides persistent block storage for supported compute workloads.\n\nIt behaves more like a disk volume than an object repository.\n\nGood use cases:\n- operating-system disks;\n- application disks;\n- transactional workloads requiring block storage;\n- database storage where supported and properly designed." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ebs Volume Types",
              slug: "ebs-volume-types",
              description: "Different volume classes optimize for different combinations of: - performance; - capacity; - cost; - workload pattern.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Different volume classes optimize for different combinations of:\n- performance;\n- capacity;\n- cost;\n- workload pattern.\n\nChoose based on measured requirements rather than simply selecting the fastest type." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Elastic Volumes",
              slug: "elastic-volumes",
              description: "Supported EBS volumes can be modified without necessarily replacing the workload, depending on the operation and configuration.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Supported EBS volumes can be modified without necessarily replacing the workload,\ndepending on the operation and configuration.\n\nThis allows capacity/performance to evolve as requirements change." },
                { title: "Example", content: "Suppose a production team needs to apply elastic volumes while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Attaching Ebs",
              slug: "attaching-ebs",
              description: "An EBS volume is associated with an Availability Zone and can be attached to supported instances according to service rules.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "An EBS volume is associated with an Availability Zone and can be attached to\nsupported instances according to service rules.\n\nA volume should not be treated as globally accessible storage." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ebs Encryption",
              slug: "ebs-encryption",
              description: "Encryption protects volume data and related storage operations using AWS encryption capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Encryption protects volume data and related storage operations using AWS encryption\ncapabilities.\n\nEncryption should be planned as part of the data-security model." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ebs Snapshots",
              slug: "ebs-snapshots",
              description: "Snapshots provide point-in-time copies used for backup and recovery workflows.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Snapshots provide point-in-time copies used for backup and recovery workflows.\n\nGood practice:\n- automate backup schedules;\n- retain according to business needs;\n- test restoration;\n- tag backups;\n- monitor storage cost." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Ebs Best Practices",
              slug: "ebs-best-practices",
              description: "Understand ebs best practices and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "- select the correct volume type;\n- monitor utilization;\n- remove unused volumes;\n- encrypt sensitive data;\n- test restore procedures;\n- automate backups;\n- document ownership." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "S3 Object Storage",
              slug: "s3-object-storage",
              description: "Amazon S3 stores objects inside buckets.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Amazon S3 stores objects inside buckets.\n\nA useful model:\n\n```\nBucket\n|\nObject\n|\nKey\n```\n\nThe key identifies the object's location/name within the bucket namespace.\n\nS3 is fundamentally different from a traditional mounted disk." },
                { title: "Example", content: "A photo-sharing application stores uploaded images as S3 objects and keeps only metadata such as the owner and object key in its application database." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "S3 Use Cases",
              slug: "s3-use-cases",
              description: "Common uses: - images; - documents; - backups; - logs; - static assets; - data lakes; - archives; - application uploads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Common uses:\n- images;\n- documents;\n- backups;\n- logs;\n- static assets;\n- data lakes;\n- archives;\n- application uploads." },
                { title: "Example", content: "A photo-sharing application can store image objects in S3 rather than placing all\nimages on application-server disks. Application servers then store metadata such as\nuser ID, object key, and image dimensions." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "S3 Data Consistency",
              slug: "s3-data-consistency",
              description: "S3 provides strong consistency for supported object operations in modern AWS.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "S3 provides strong consistency for supported object operations in modern AWS.\nApplications should still be designed carefully around concurrent updates and\napplication-level semantics." },
                { title: "Example", content: "A photo-sharing application stores uploaded images as S3 objects and keeps only metadata such as the owner and object key in its application database." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "S3 Storage Classes",
              slug: "s3-storage-classes",
              description: "Storage classes optimize different access patterns.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Storage classes optimize different access patterns.\n\nExamples include:\n- frequently accessed data;\n- infrequently accessed data;\n- archival data.\n\nThe correct class depends on:\n- access frequency;\n- retrieval expectations;\n- retention;\n- cost." },
                { title: "Example", content: "A photo-sharing application stores uploaded images as S3 objects and keeps only metadata such as the owner and object key in its application database." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "S3 Lifecycle Management",
              slug: "s3-lifecycle-management",
              description: "Lifecycle rules can automatically transition or expire objects.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Lifecycle rules can automatically transition or expire objects.\n\nExample:\n\n```\nDay 0–30   -> frequent-access storage\nDay 31–180 -> infrequent-access class\nAfter 180  -> archive\nAfter 7y    -> delete\n```\n\nThe actual policy must match business retention requirements." },
                { title: "Example", content: "A photo-sharing application stores uploaded images as S3 objects and keeps only metadata such as the owner and object key in its application database." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Versioning",
              slug: "versioning",
              description: "Versioning preserves multiple versions of an object.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Versioning preserves multiple versions of an object.\n\nIt can protect against:\n- accidental deletion;\n- unintended overwrites;\n- application mistakes.\n\nVersioning increases stored data and therefore needs lifecycle planning." },
                { title: "Example", content: "Suppose a production team needs to apply versioning while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "S3 Security",
              slug: "s3-security",
              description: "Security mechanisms can include: - IAM policies; - bucket policies; - encryption; - blocking unintended public access; - access logging/monitoring; - least privilege.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Security mechanisms can include:\n- IAM policies;\n- bucket policies;\n- encryption;\n- blocking unintended public access;\n- access logging/monitoring;\n- least privilege.\n\nNever assume that \"stored in the cloud\" means publicly accessible." },
                { title: "Example", content: "A photo-sharing application stores uploaded images as S3 objects and keeps only metadata such as the owner and object key in its application database." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Glacier-Style Archive Storage",
              slug: "glacier-style-archive-storage",
              description: "Archive classes are designed for data that is rarely accessed.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Archive classes are designed for data that is rarely accessed.\n\nThey trade retrieval characteristics for lower storage economics." },
                { title: "Example", content: "A company must retain old invoices for seven years but almost never retrieves them.\nArchival storage can be more appropriate than keeping every invoice in a frequently\naccessed class." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Shared File Systems",
              slug: "shared-file-systems",
              description: "A file system differs from object storage because applications can access files through file-system semantics.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A file system differs from object storage because applications can access files\nthrough file-system semantics." },
                { title: "Example", content: "Suppose a production team needs to apply shared file systems while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Efs",
              slug: "efs",
              description: "Elastic File System provides managed shared file storage for supported workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Elastic File System provides managed shared file storage for supported workloads.\n\nIt is useful when multiple compute resources need access to common files." },
                { title: "Example", content: "Several application servers need to read the same generated report templates.\nA shared file system can provide a common file namespace." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Efs Performance",
              slug: "efs-performance",
              description: "Performance and throughput modes should match workload characteristics.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Performance and throughput modes should match workload characteristics.\n\nConsider:\n- number of clients;\n- file size;\n- access pattern;\n- throughput;\n- latency." },
                { title: "Example", content: "Several application instances need access to the same generated report templates. A managed shared file system provides a common file namespace rather than copying the files to every server." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Efs Security",
              slug: "efs-security",
              description: "Control access through: - network security; - IAM where supported; - file-system policies; - POSIX permissions; - encryption.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Control access through:\n- network security;\n- IAM where supported;\n- file-system policies;\n- POSIX permissions;\n- encryption." },
                { title: "Example", content: "Several application instances need access to the same generated report templates. A managed shared file system provides a common file namespace rather than copying the files to every server." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Fsx For Windows File Server",
              slug: "fsx-for-windows-file-server",
              description: "FSx provides managed Windows-oriented file-system capabilities for workloads that need compatible file-sharing behavior.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "FSx provides managed Windows-oriented file-system capabilities for workloads that\nneed compatible file-sharing behavior." },
                { title: "Example", content: "Suppose a production team needs to apply fsx for windows file server while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds",
              slug: "rds",
              description: "Amazon RDS provides managed relational database capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Amazon RDS provides managed relational database capabilities.\n\nThe provider manages many infrastructure tasks, allowing teams to focus more on:\n- schema;\n- queries;\n- data;\n- application behavior." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds Database Instances",
              slug: "rds-database-instances",
              description: "RDS supports managed relational engines with configurable: - compute; - storage; - networking; - backup; - monitoring; - availability options.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "RDS supports managed relational engines with configurable:\n- compute;\n- storage;\n- networking;\n- backup;\n- monitoring;\n- availability options." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds High Availability",
              slug: "rds-high-availability",
              description: "Multi-zone configurations can maintain a standby or equivalent failover capability depending on engine and configuration.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Multi-zone configurations can maintain a standby or equivalent failover capability\ndepending on engine and configuration.\n\nHigh availability is not identical to backup.\n\n```\nBackup -> recover data\nHA      -> reduce service interruption\n```\n\nBoth may be necessary." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds Setup Mental Model",
              slug: "rds-setup-mental-model",
              description: "Understand rds setup mental model and its role in AWS cloud architecture.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "1. Select engine.\n2. Select version.\n3. Select instance class.\n4. Configure storage.\n5. Configure network.\n6. Configure security.\n7. Configure backups.\n8. Configure monitoring.\n9. Configure availability.\n10. Validate connectivity." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds Monitoring",
              slug: "rds-monitoring",
              description: "Monitor: - CPU; - storage; - connections; - latency; - throughput; - replication where applicable; - application-level database errors.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Monitor:\n- CPU;\n- storage;\n- connections;\n- latency;\n- throughput;\n- replication where applicable;\n- application-level database errors." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Rds Best Practices",
              slug: "rds-best-practices",
              description: "Understand rds best practices and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "- use private subnets;\n- restrict security groups;\n- encrypt sensitive data;\n- enable backups;\n- test recovery;\n- monitor capacity;\n- avoid unnecessary public access." },
                { title: "Example", content: "A transactional order system needs a relational database but does not want to manage database infrastructure manually. RDS handles many infrastructure tasks while the team focuses on schema, queries, and application behavior." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Aurora",
              slug: "aurora",
              description: "Aurora is a managed relational database service with a cloud-oriented architecture designed for high availability and scalable storage characteristics.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Aurora is a managed relational database service with a cloud-oriented architecture\ndesigned for high availability and scalable storage characteristics.\n\nChoose Aurora when its engine compatibility, performance characteristics, operational\nfeatures, and pricing fit the workload." },
                { title: "Example", content: "A transactional service needs a managed relational engine with cloud-oriented availability and storage characteristics. Aurora is evaluated against the workload's compatibility, performance, operational, and cost requirements." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Dynamodb",
              slug: "dynamodb",
              description: "DynamoDB is a managed NoSQL database designed for scalable key-value and document workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "DynamoDB is a managed NoSQL database designed for scalable key-value and document\nworkloads.\n\nIts design starts with access patterns rather than a traditional relational schema." },
                { title: "Example", content: "A session service needs fast lookups by customer ID and session ID at large scale. DynamoDB is designed from those access patterns so the key structure supports the required queries." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Dynamodb Tables",
              slug: "dynamodb-tables",
              description: "A table contains items identified through key attributes.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A table contains items identified through key attributes.\n\nThe primary key can be:\n- partition key;\n- partition key + sort key.\n\nGood design asks:\n\"What queries must be fast?\"\n\nrather than:\n\"How would I normalize this relationally?\"" },
                { title: "Example", content: "A session service needs fast lookups by customer ID and session ID at large scale. DynamoDB is designed from those access patterns so the key structure supports the required queries." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Dynamodb Capacity",
              slug: "dynamodb-capacity",
              description: "Capacity settings and billing modes should reflect workload behavior.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Capacity settings and billing modes should reflect workload behavior.\n\nThe source discusses provisioned capacity and adaptive behavior. The key lesson is\nto understand read/write demand and design keys that distribute traffic well." },
                { title: "Example", content: "A session service needs fast lookups by customer ID and session ID at large scale. DynamoDB is designed from those access patterns so the key structure supports the required queries." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Adaptive Capacity",
              slug: "adaptive-capacity",
              description: "DynamoDB can adapt resource allocation to support uneven access patterns within supported limits.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "DynamoDB can adapt resource allocation to support uneven access patterns within\nsupported limits.\n\nGood partition-key design remains important." },
                { title: "Example", content: "Suppose a production team needs to apply adaptive capacity while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Data Consistency",
              slug: "data-consistency",
              description: "DynamoDB supports different consistency choices for reads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "DynamoDB supports different consistency choices for reads.\n\nStronger consistency can be useful where immediate visibility matters, while eventual\nconsistency can be acceptable for some workloads." },
                { title: "Example", content: "Suppose a production team needs to apply data consistency while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Acid With Dynamodb",
              slug: "acid-with-dynamodb",
              description: "DynamoDB supports transactional operations for supported use cases.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "DynamoDB supports transactional operations for supported use cases.\n\nDo not assume that every NoSQL workload should avoid transactions. The correct choice\ndepends on business invariants." },
                { title: "Example", content: "A session service needs fast lookups by customer ID and session ID at large scale. DynamoDB is designed from those access patterns so the key structure supports the required queries." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Global Tables",
              slug: "global-tables",
              description: "Global Tables support multi-Region data replication for suitable DynamoDB workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Global Tables support multi-Region data replication for suitable DynamoDB workloads.\n\nThis can support globally distributed applications but introduces distributed-system\nconsiderations." },
                { title: "Example", content: "A globally distributed application needs regional DynamoDB replicas so users can be served closer to their locations. Global Tables can support the replication model while the team plans for distributed-system behavior." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Dax",
              slug: "dax",
              description: "DynamoDB Accelerator is an in-memory caching layer designed for DynamoDB workloads where extremely low-latency access is important.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "DynamoDB Accelerator is an in-memory caching layer designed for DynamoDB workloads\nwhere extremely low-latency access is important." },
                { title: "Example", content: "A read-heavy DynamoDB workload repeatedly requests the same data with very low latency requirements. DAX can be considered as an in-memory acceleration layer." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Backup And Restore",
              slug: "backup-and-restore",
              description: "Backups should be treated as a tested recovery process.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Backups should be treated as a tested recovery process.\n\nA backup that has never been restored is an assumption, not proof of recoverability." },
                { title: "Example", content: "A team schedules database backups and performs a restore test into a separate environment. The test verifies that the backup can actually support the documented recovery procedure." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Elasticache",
              slug: "elasticache",
              description: "ElastiCache provides managed in-memory caching capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "ElastiCache provides managed in-memory caching capabilities.\n\nUse caching to reduce:\n- database load;\n- repeated expensive computation;\n- response latency.\n\nDo not use cache as the only durable source of critical information." },
                { title: "Example", content: "A product catalog is read far more often than it changes. Caching frequently requested results reduces repeated database work and can improve response latency." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Data Transfer Options",
              slug: "data-transfer-options",
              description: "Large datasets may require specialized transfer approaches.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Large datasets may require specialized transfer approaches.\n\nThe source discusses the AWS Snow family for physical data transfer when network\ntransfer is impractical." },
                { title: "Example", content: "Suppose a production team needs to apply data transfer options while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Storage Gateway",
              slug: "storage-gateway",
              description: "Storage Gateway provides hybrid storage integration patterns between on-premise environments and AWS storage services.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Storage Gateway provides hybrid storage integration patterns between on-premise\nenvironments and AWS storage services." },
                { title: "Example", content: "A file-heavy on-premises application needs to integrate with AWS storage. Storage Gateway can provide a supported hybrid storage pattern without requiring the application to immediately move all storage operations to the cloud." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Storage Decision Table",
              slug: "storage-decision-table",
              description: "Use: - EBS -> block storage for compute; - S3 -> object storage; - EFS -> shared file system; - FSx -> specialized managed file systems; - RDS/Aurora -> relational data; - Dynam...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Use:\n- EBS -> block storage for compute;\n- S3 -> object storage;\n- EFS -> shared file system;\n- FSx -> specialized managed file systems;\n- RDS/Aurora -> relational data;\n- DynamoDB -> scalable key-value/document workloads;\n- ElastiCache -> low-latency cache;\n- archive classes -> long-retention, infrequently accessed data." },
                { title: "Example", content: "Restaurant images and customer uploads go to S3, transactional orders use a relational database, and frequently accessed data can use a cache." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
          ],
        },
        {
          title: "AWS Security Services",
          slug: "aws-security-services",
          description: "Build secure AWS environments with IAM, policies, roles, MFA, STS, CloudTrail, Organizations, Secrets Manager, GuardDuty, and Inspector.",
          topics: [
            {
              title: "Security Starts With Identity",
              slug: "security-starts-with-identity",
              description: "AWS security is strongly centered on controlling: - who can authenticate; - what they can do; - which resources they can access; - under which conditions; - how actions are audi...",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS security is strongly centered on controlling:\n- who can authenticate;\n- what they can do;\n- which resources they can access;\n- under which conditions;\n- how actions are audited." },
                { title: "Example", content: "Customer traffic uses HTTPS, application instances use IAM roles, the database stays private behind restrictive security groups, secrets use managed storage, and API activity is audited." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Iam",
              slug: "iam",
              description: "Identity and Access Management controls access to AWS resources.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Identity and Access Management controls access to AWS resources.\n\nCore concepts:\n- users;\n- groups;\n- roles;\n- policies;\n- permissions;\n- authentication;\n- authorization." },
                { title: "Example", content: "An EC2 application needs access to one S3 bucket. Instead of storing access keys on the server, the team assigns an IAM role with only the required permissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Authentication Versus Authorization",
              slug: "authentication-versus-authorization",
              description: "Authentication asks:  Authorization asks:  Example: A developer can successfully sign in, but that does not mean the developer should be able to delete production databases.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Authentication asks:\n\n```\n\"Who are you?\"\n```\n\nAuthorization asks:\n\n```\n\"What are you allowed to do?\"\n```\n\nExample:\nA developer can successfully sign in, but that does not mean the developer should\nbe able to delete production databases." },
                { title: "Example", content: "A user successfully signs in to an API, proving identity. The API then checks whether that identity is allowed to perform the requested administrative operation." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Iam Policy",
              slug: "iam-policy",
              description: "A policy conceptually answers:  For example: - allow reading objects; - deny deleting resources; - permit access only from specific conditions.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A policy defines permissions.\n\nA policy conceptually answers:\n\n```\nPrincipal + Action + Resource + Conditions\n```\n\nFor example:\n- allow reading objects;\n- deny deleting resources;\n- permit access only from specific conditions." },
                { title: "Example", content: "An EC2 application needs access to one S3 bucket. Instead of storing access keys on the server, the team assigns an IAM role with only the required permissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Request Processing",
              slug: "request-processing",
              description: "When a request reaches AWS, identity and authorization information is evaluated against applicable policies and conditions.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "When a request reaches AWS, identity and authorization information is evaluated\nagainst applicable policies and conditions.\n\nThe practical rule is:\nAn identity being authenticated does not automatically make every action legal." },
                { title: "Example", content: "Suppose a production team needs to apply request processing while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Actions",
              slug: "actions",
              description: "AWS APIs expose actions such as: - read; - create; - update; - delete; - describe.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS APIs expose actions such as:\n- read;\n- create;\n- update;\n- delete;\n- describe.\n\nPolicies can restrict actions to only what is necessary." },
                { title: "Example", content: "Suppose a production team needs to apply actions while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Root User",
              slug: "root-user",
              description: "The root user has extremely broad account-level capabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "The root user has extremely broad account-level capabilities.\n\nBest practice:\n- do not use root for everyday work;\n- protect it strongly;\n- enable MFA;\n- use dedicated identities/roles for normal operations." },
                { title: "Example", content: "The root account is reserved for account-level tasks that require it, while daily administration is performed through appropriately controlled identities and roles." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Iam Users",
              slug: "iam-users",
              description: "IAM users represent long-lived identities within an AWS account.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "IAM users represent long-lived identities within an AWS account.\n\nModern architectures should prefer temporary role-based credentials whenever\nappropriate instead of distributing long-lived access keys." },
                { title: "Example", content: "An EC2 application needs access to one S3 bucket. Instead of storing access keys on the server, the team assigns an IAM role with only the required permissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Access Keys",
              slug: "access-keys",
              description: "Access keys are credentials for programmatic access.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Access keys are credentials for programmatic access.\n\nNever:\n- commit them to source control;\n- put them in public repositories;\n- hard-code them into application images;\n- share them through chat." },
                { title: "Example", content: "An engineer discovers a static access key in application configuration. The safer design replaces it with an appropriate role or temporary credential mechanism and rotates the exposed key." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Iam Groups",
              slug: "iam-groups",
              description: "Groups can collect permissions for users with similar responsibilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Groups can collect permissions for users with similar responsibilities.\n\nExample:\n\n```\nDevelopers\n-> development read/write permissions\n```\n\n```\nAuditors\n-> read-only audit permissions\n```" },
                { title: "Example", content: "An EC2 application needs access to one S3 bucket. Instead of storing access keys on the server, the team assigns an IAM role with only the required permissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Password Policy",
              slug: "password-policy",
              description: "Organizations can establish password requirements appropriate to their identity strategy.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Organizations can establish password requirements appropriate to their identity\nstrategy.\n\nPasswords alone are not sufficient for high-value administrative access." },
                { title: "Example", content: "Suppose a production team needs to apply password policy while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Mfa",
              slug: "mfa",
              description: "Multi-factor authentication adds another factor beyond a password.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Multi-factor authentication adds another factor beyond a password.\n\nIt reduces the risk that a stolen password alone is sufficient to access an account." },
                { title: "Example", content: "A privileged administrator signs in with a password plus a second authentication factor. The extra factor reduces the impact of a stolen password." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Policy Types",
              slug: "policy-types",
              description: "The source discusses: - identity-based policies; - resource-based policies; - inline policies.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "The source discusses:\n- identity-based policies;\n- resource-based policies;\n- inline policies.\n\nIdentity-based policies attach permissions to identities.\n\nResource-based policies attach permissions to resources where supported.\n\nInline policies are embedded directly into a particular identity/resource context\nand can make reuse and centralized management harder." },
                { title: "Example", content: "Suppose a production team needs to apply policy types while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Policy Elements",
              slug: "policy-elements",
              description: "Common policy concepts include: - Effect; - Action; - Resource; - Principal where applicable; - Condition.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Common policy concepts include:\n- Effect;\n- Action;\n- Resource;\n- Principal where applicable;\n- Condition.\n\nExample conceptual policy:\n\n```\nEffect: Allow\nAction: ReadObject\nResource: objects under a specific bucket path\n```\n\nThe exact AWS action/resource syntax depends on the service." },
                { title: "Example", content: "Suppose a production team needs to apply policy elements while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Conditions",
              slug: "conditions",
              description: "Conditions can restrict permissions based on context.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Conditions can restrict permissions based on context.\n\nExamples can include:\n- source address;\n- requested service;\n- tags;\n- time;\n- encryption requirements;\n- authentication context." },
                { title: "Example", content: "Suppose a production team needs to apply conditions while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Policy Evaluation",
              slug: "policy-evaluation",
              description: "A useful simplified mental model is:  An explicit deny generally overrides an allow.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A useful simplified mental model is:\n\n```\nDefault = Deny\n|\nExplicit Allow?\n|\nExplicit Deny?\n|\nFinal decision\n```\n\nAn explicit deny generally overrides an allow." },
                { title: "Example", content: "Suppose a production team needs to apply policy evaluation while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Policy Versions",
              slug: "policy-versions",
              description: "Managed policies can have versions, enabling controlled changes to permission definitions.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Managed policies can have versions, enabling controlled changes to permission\ndefinitions." },
                { title: "Example", content: "Suppose a production team needs to apply policy versions while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Tag-Based Access",
              slug: "tag-based-access",
              description: "Tags can be incorporated into access-control designs where supported.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Tags can be incorporated into access-control designs where supported.\n\nThis can help build scalable governance such as:\n\"Only allow operators to modify resources tagged as belonging to their team.\"" },
                { title: "Example", content: "Suppose a production team needs to apply tag-based access while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Iam Roles",
              slug: "iam-roles",
              description: "Roles provide temporary credentials and are central to modern AWS access patterns.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Roles provide temporary credentials and are central to modern AWS access patterns.\n\nUse cases:\n- EC2 accessing S3;\n- Lambda accessing DynamoDB;\n- cross-account administration;\n- federated workforce access." },
                { title: "Example", content: "An EC2 application needs to read files from one S3 bucket. Instead of placing an\naccess key on the server, attach an IAM role granting only the required read\npermissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Cross-Account Access",
              slug: "cross-account-access",
              description: "Organizations may separate environments/accounts:  Roles can enable controlled cross-account access without sharing permanent credentials.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Organizations may separate environments/accounts:\n\n```\nSecurity Account\nProduction Account\nDevelopment Account\nLogging Account\n```\n\nRoles can enable controlled cross-account access without sharing permanent\ncredentials." },
                { title: "Example", content: "A central security account needs to inspect resources in production accounts. Cross-account role assumption can provide controlled access without copying permanent credentials between accounts." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Sts",
              slug: "sts",
              description: "Security Token Service supports temporary security credentials and role assumption.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Security Token Service supports temporary security credentials and role assumption.\n\nTemporary credentials reduce the lifetime of secrets and are generally preferable\nto long-lived keys for many automated workflows." },
                { title: "Example", content: "A deployment process needs temporary credentials for a limited operation. STS can issue temporary security credentials that expire rather than creating another long-lived access key." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Identity Federation",
              slug: "identity-federation",
              description: "Federation connects external identity systems with AWS access patterns.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Federation connects external identity systems with AWS access patterns.\n\nThis allows organizations to use established workforce identity systems rather\nthan creating isolated credentials for every cloud resource." },
                { title: "Example", content: "Suppose a production team needs to apply identity federation while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Least Privilege",
              slug: "least-privilege",
              description: "Give only the permissions required to perform the job.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Give only the permissions required to perform the job.\n\nBad:\n\n```\nAllow everything\n```\n\nBetter:\n\n```\nAllow only required actions\non required resources\nunder required conditions\n```" },
                { title: "Example", content: "A support application only needs to read logs from one service. Its permissions are limited to the required actions and resources instead of granting broad administrator access." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Iam Best Practices",
              slug: "iam-best-practices",
              description: "Understand iam best practices and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "- protect root;\n- enable MFA;\n- prefer roles;\n- avoid long-lived keys;\n- use least privilege;\n- review unused permissions;\n- separate production access;\n- monitor administrative activity;\n- automate access reviews." },
                { title: "Example", content: "An EC2 application needs access to one S3 bucket. Instead of storing access keys on the server, the team assigns an IAM role with only the required permissions." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Cloudtrail",
              slug: "cloudtrail",
              description: "CloudTrail records AWS API activity for supported services and provides an audit history.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "CloudTrail records AWS API activity for supported services and provides an audit\nhistory.\n\nIt helps answer:\n- Who made this change?\n- Which API was called?\n- When did it happen?\n- Which resource was affected?\n- From which context?" },
                { title: "Example", content: "A security team notices that a production security group changed unexpectedly. CloudTrail records the relevant API activity so the team can identify the principal and operation involved." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Cloudtrail Investigation Example",
              slug: "cloudtrail-investigation-example",
              description: "A production security group suddenly allows traffic from an unexpected network.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A production security group suddenly allows traffic from an unexpected network.\n\nInvestigation:\n1. identify the resource change;\n2. inspect CloudTrail events;\n3. identify the principal;\n4. identify the API call;\n5. inspect timing and source context;\n6. remediate;\n7. improve permissions and monitoring." },
                { title: "Example", content: "A security team notices that a production security group changed unexpectedly. CloudTrail records the relevant API activity so the team can identify the principal and operation involved." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Aws Organizations",
              slug: "aws-organizations",
              description: "Organizations can centrally manage multiple AWS accounts.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Organizations can centrally manage multiple AWS accounts.\n\nBenefits:\n- account separation;\n- governance;\n- centralized billing;\n- policy controls;\n- organizational structure." },
                { title: "Example", content: "A company separates security, logging, development, staging, and production into different AWS accounts. Central governance and billing can be applied while reducing the blast radius of mistakes." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Resource Access Manager",
              slug: "resource-access-manager",
              description: "AWS RAM can share supported resources across accounts or organizational boundaries.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS RAM can share supported resources across accounts or organizational boundaries.\n\nThis can avoid duplicating certain infrastructure." },
                { title: "Example", content: "A shared networking resource needs to be consumed by multiple accounts. RAM can share supported resources rather than requiring every account to create a duplicate." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Secrets Manager",
              slug: "secrets-manager",
              description: "Secrets Manager provides managed storage and retrieval for application secrets.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Secrets Manager provides managed storage and retrieval for application secrets.\n\nGood practice:\n- rotate secrets when appropriate;\n- avoid source-code credentials;\n- restrict access;\n- audit retrieval." },
                { title: "Example", content: "A service needs a database password. The application retrieves the secret from managed secret storage rather than keeping the password in a source repository or image." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Guardduty",
              slug: "guardduty",
              description: "GuardDuty is a managed threat-detection service that analyzes supported signals for suspicious activity.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "GuardDuty is a managed threat-detection service that analyzes supported signals\nfor suspicious activity.\n\nIt is part of a broader detection strategy, not a replacement for secure design." },
                { title: "Example", content: "A detection service reports suspicious activity associated with an AWS environment. The security team investigates the finding and correlates it with other logs and controls instead of treating detection as the complete security strategy." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Inspector",
              slug: "inspector",
              description: "Inspector helps assess supported workloads for security findings and vulnerabilities.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Inspector helps assess supported workloads for security findings and vulnerabilities.\n\nUse findings as input to remediation workflows." },
                { title: "Example", content: "A team reviews vulnerability findings for supported workloads and prioritizes remediation based on the affected systems and risk." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Security Architecture Example",
              slug: "security-architecture-example",
              description: "A production API might use:      This layered design is stronger than relying on one security mechanism.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A production API might use:\n\n```\nWorkforce Identity\n|\nIAM / Federation\n|\nAdministrative Roles\n```\n\n```\nApplication\n|\nIAM Role\n|\nS3 / DB\n```\n\n```\nNetwork\n|\nPrivate Subnets\n|\nSecurity Groups\n```\n\n```\nAudit\n|\nCloudTrail\n```\n\n```\nDetection\n|\nGuardDuty / Inspector\n```\n\nThis layered design is stronger than relying on one security mechanism." },
                { title: "Example", content: "Customer traffic uses HTTPS, application instances use IAM roles, the database stays private behind restrictive security groups, secrets use managed storage, and API activity is audited." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
          ],
        },
        {
          title: "Infrastructure Automation and Serverless",
          slug: "infrastructure-automation-and-serverless",
          description: "Automate infrastructure and application delivery with CloudFormation, deployment services, serverless patterns, API Gateway, and resilient workflows.",
          topics: [
            {
              title: "Why Automation Matters",
              slug: "why-automation-matters",
              description: "Manual infrastructure creates inconsistency.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Manual infrastructure creates inconsistency.\n\nIf one engineer creates:\n- a network;\n- security groups;\n- instances;\n- storage;\n- permissions;\n\nand another engineer repeats the process manually, small differences are likely.\n\nAutomation makes infrastructure:\n- repeatable;\n- reviewable;\n- versionable;\n- testable;\n- easier to recover." },
                { title: "Example", content: "Suppose a production team needs to apply why automation matters while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Infrastructure As Code",
              slug: "infrastructure-as-code",
              description: "Infrastructure as Code defines infrastructure using machine-readable configuration.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Infrastructure as Code defines infrastructure using machine-readable configuration.\n\nInstead of:\n\n```\n\"Click these 40 console buttons\"\n```\n\nyou define:\n\n```\nnetwork\nsubnets\nroutes\nsecurity\ncompute\nstorage\nmonitoring\n```\n\nand deploy it consistently." },
                { title: "Example", content: "Instead of manually repeating dozens of console operations, the platform team stores infrastructure definitions in version control so changes can be reviewed and reproduced." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Cloudformation",
              slug: "cloudformation",
              description: "AWS CloudFormation provides infrastructure orchestration through stacks and templates.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "AWS CloudFormation provides infrastructure orchestration through stacks and\ntemplates.\n\nA template describes desired resources and relationships." },
                { title: "Example", content: "A team defines a VPC, subnets, security groups, and compute resources in a template. The same infrastructure definition can be reviewed and deployed consistently across environments." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Cloudformation Components",
              slug: "cloudformation-components",
              description: "Important concepts: - template; - stack; - parameters; - resources; - outputs; - mappings/conditions where used; - change sets.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Important concepts:\n- template;\n- stack;\n- parameters;\n- resources;\n- outputs;\n- mappings/conditions where used;\n- change sets." },
                { title: "Example", content: "A team defines a VPC, subnets, security groups, and compute resources in a template. The same infrastructure definition can be reviewed and deployed consistently across environments." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Templates",
              slug: "templates",
              description: "A template describes infrastructure.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A template describes infrastructure.\n\nConceptual example:\n\n```\nVPC\n|\nSubnet\n|\nSecurity Group\n|\nEC2\n```\n\nThe orchestration system can create resources in dependency order." },
                { title: "Example", content: "Suppose a production team needs to apply templates while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Stacks",
              slug: "stacks",
              description: "A stack is a deployed collection of resources managed together.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A stack is a deployed collection of resources managed together.\n\nBenefits:\n- repeatable deployment;\n- controlled updates;\n- resource grouping;\n- lifecycle management." },
                { title: "Example", content: "Suppose a production team needs to apply stacks while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Parameters",
              slug: "parameters",
              description: "Parameters allow the same template to be reused for different environments.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Parameters allow the same template to be reused for different environments.\n\nExample:\n\n```\nEnvironment = dev\nEnvironment = staging\nEnvironment = production\n```" },
                { title: "Example", content: "Suppose a production team needs to apply parameters while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Outputs",
              slug: "outputs",
              description: "Outputs expose useful values such as: - load balancer endpoint; - VPC identifier; - resource names.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Outputs expose useful values such as:\n- load balancer endpoint;\n- VPC identifier;\n- resource names.\n\nOther stacks or deployment workflows can consume these values where supported." },
                { title: "Example", content: "Suppose a production team needs to apply outputs while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Change Sets",
              slug: "change-sets",
              description: "Change sets allow you to inspect proposed infrastructure changes before applying them.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Change sets allow you to inspect proposed infrastructure changes before applying\nthem.\n\nThis reduces surprises during updates." },
                { title: "Example", content: "Before updating a production stack, the team creates a change set and reviews which resources will be modified before executing the update." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Stack Sets",
              slug: "stack-sets",
              description: "Stack Sets allow coordinated deployment of stacks across multiple accounts or Regions for supported scenarios.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Stack Sets allow coordinated deployment of stacks across multiple accounts or\nRegions for supported scenarios.\n\nUseful for:\n- standardized governance;\n- shared baseline infrastructure;\n- multi-account environments." },
                { title: "Example", content: "A central platform team needs to deploy a baseline configuration across multiple AWS accounts and Regions. Stack Sets can distribute the defined CloudFormation stack across the selected targets." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Service Catalog",
              slug: "service-catalog",
              description: "Service Catalog can provide controlled, approved infrastructure products to users.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Service Catalog can provide controlled, approved infrastructure products to users.\n\nIt is useful when organizations want:\n- standard templates;\n- governance;\n- approved configurations;\n- self-service deployment." },
                { title: "Example", content: "An organization publishes approved infrastructure products for development teams. Teams can provision standardized configurations without creating every resource from scratch." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "12-Factor Application Principles",
              slug: "12-factor-application-principles",
              description: "The source introduces the Twelve-Factor methodology.",
              estimatedMinutes: 13,
              sections: [
                { title: "Detailed explanation", content: "The source introduces the Twelve-Factor methodology. The ideas are useful for\ncloud-native application design.\n\nFactor 1 — Codebase\nOne tracked codebase can support many deploys.\n\nFactor 2 — Dependencies\nExplicitly declare and isolate dependencies.\n\nFactor 3 — Config\nStore environment-specific configuration outside application code.\n\nFactor 4 — Backing services\nTreat databases, queues, storage, and other services as attached resources.\n\nFactor 5 — Build, release, run\nSeparate building the application from releasing and executing it.\n\nFactor 6 — Processes\nRun applications as stateless processes where appropriate.\n\nFactor 7 — Port binding\nExpose services through ports rather than relying on a preinstalled application\nserver.\n\nFactor 8 — Concurrency\nScale through additional processes/instances rather than only increasing one\nmachine.\n\nFactor 9 — Disposability\nDesign for fast startup and graceful shutdown.\n\nFactor 10 — Dev/prod parity\nKeep environments as similar as practical.\n\nFactor 11 — Logs\nTreat logs as event streams and centralize their handling.\n\nFactor 12 — Admin processes\nRun administrative tasks as controlled one-off processes." },
                { title: "Example", content: "A web service keeps configuration outside the codebase, treats databases as backing services, writes logs as event streams, and runs stateless processes so deployments remain portable." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Code Repositories",
              slug: "code-repositories",
              description: "The source discusses source-code management as part of deployment automation.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "The source discusses source-code management as part of deployment automation.\n\nThe important engineering principle is that infrastructure and application changes\nshould be traceable through version control." },
                { title: "Example", content: "Suppose a production team needs to apply code repositories while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Elastic Beanstalk",
              slug: "elastic-beanstalk",
              description: "Elastic Beanstalk provides an application deployment platform that manages much of the underlying infrastructure.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Elastic Beanstalk provides an application deployment platform that manages much of\nthe underlying infrastructure.\n\nIt can coordinate:\n- application deployment;\n- compute;\n- load balancing;\n- scaling;\n- monitoring.\n\nIt is useful when teams want a simpler application deployment experience without\nmanaging every infrastructure detail directly." },
                { title: "Example", content: "A team has a conventional web application and wants a managed deployment platform without designing every underlying infrastructure component itself. Elastic Beanstalk can reduce that operational burden." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Blue/Green Deployment",
              slug: "blue-green-deployment",
              description: "Blue/green deployment maintains two environments.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "Blue/green deployment maintains two environments.\n\n```\nBlue  -> current production\nGreen -> new version\n```\n\nTraffic is shifted after the new version is validated.\n\nIf a serious issue appears, traffic can be moved back.\n\nThis is a deployment strategy, not a guarantee that rollback is always safe.\nDatabase changes must be backward-compatible or otherwise carefully coordinated." },
                { title: "Example", content: "Application changes pass through version control, automated tests, and a controlled deployment process. If health checks fail, the rollout stops or rolls back according to the chosen strategy." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Codepipeline",
              slug: "codepipeline",
              description: "A pipeline automates stages such as: - source; - build; - test; - approval; - deployment.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A pipeline automates stages such as:\n- source;\n- build;\n- test;\n- approval;\n- deployment.\n\nA good pipeline should prevent obviously unsafe artifacts from reaching production." },
                { title: "Example", content: "A commit triggers source retrieval, build and test stages, followed by a controlled deployment stage. CodePipeline can orchestrate this delivery workflow." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Codedeploy",
              slug: "codedeploy",
              description: "CodeDeploy automates application deployment to supported compute environments.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "CodeDeploy automates application deployment to supported compute environments.\n\nDeployment strategies can include:\n- in-place;\n- rolling;\n- blue/green, depending on environment and configuration." },
                { title: "Example", content: "A new application version is deployed to a fleet using an automated deployment strategy. Health checks and deployment controls help reduce the risk of a manual rollout." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Serverless Computing",
              slug: "serverless-computing",
              description: "Serverless means the application team does not manage the underlying servers in the traditional way.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Serverless means the application team does not manage the underlying servers in\nthe traditional way.\n\nIt does not mean \"there are no servers.\"\n\nThe provider manages the server infrastructure." },
                { title: "Example", content: "An order endpoint receives a request through an API front door, invokes a function, and writes to a managed database. The team focuses on application behavior rather than provisioning traditional servers." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Lambda Automation",
              slug: "lambda-automation",
              description: "Lambda can react to: - storage events; - schedules; - API calls; - monitoring events; - messages.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Lambda can react to:\n- storage events;\n- schedules;\n- API calls;\n- monitoring events;\n- messages." },
                { title: "Example", content: "A monitoring alarm detects an unexpected resource condition. A Lambda function can\nautomatically create a ticket, collect diagnostic information, or invoke a\ncontrolled remediation workflow." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Api Gateway",
              slug: "api-gateway",
              description: "API Gateway can expose APIs and integrate them with backend services.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "API Gateway can expose APIs and integrate them with backend services.\n\nCommon concerns:\n- authentication;\n- authorization;\n- throttling;\n- routing;\n- request transformation;\n- monitoring." },
                { title: "Example", content: "A mobile application calls /orders through an API endpoint. API Gateway provides the managed API front door while the backend performs authentication, validation, and order processing." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Serverless Web Application",
              slug: "serverless-web-application",
              description: "A conceptual architecture:  Optional components: - identity service; - object storage; - CDN; - monitoring; - event services.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A conceptual architecture:\n\n```\nBrowser\n|\nStatic Website\n|\nAPI Gateway\n|\nLambda\n|\nDynamoDB\n```\n\nOptional components:\n- identity service;\n- object storage;\n- CDN;\n- monitoring;\n- event services.\n\nThis architecture can eliminate direct server management for many application\ncomponents." },
                { title: "Example", content: "An order endpoint receives a request through an API front door, invokes a function, and writes to a managed database. The team focuses on application behavior rather than provisioning traditional servers." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Static Website",
              slug: "static-website",
              description: "Static content can be hosted in object storage and distributed through suitable edge delivery mechanisms.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Static content can be hosted in object storage and distributed through suitable\nedge delivery mechanisms.\n\nAdvantages can include:\n- simple deployment;\n- high scalability;\n- low server-management overhead." },
                { title: "Example", content: "An EC2-based application needs persistent block storage for its operating system and application data. EBS provides disk-like volumes that can be attached according to service rules." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "User Authentication",
              slug: "user-authentication",
              description: "A serverless web application still needs identity controls.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A serverless web application still needs identity controls.\n\nSeparate:\n- user authentication;\n- API authorization;\n- resource permissions.\n\nNever assume that hiding a URL is a security control." },
                { title: "Example", content: "Suppose a production team needs to apply user authentication while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Serverless Backend Design",
              slug: "serverless-backend-design",
              description: "Good serverless design often emphasizes: - stateless functions; - event-driven processing; - managed storage; - least privilege; - observability; - idempotency.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Good serverless design often emphasizes:\n- stateless functions;\n- event-driven processing;\n- managed storage;\n- least privilege;\n- observability;\n- idempotency." },
                { title: "Example", content: "An order endpoint receives a request through an API front door, invokes a function, and writes to a managed database. The team focuses on application behavior rather than provisioning traditional servers." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
            {
              title: "Idempotency",
              slug: "idempotency",
              description: "An operation is idempotent when repeating it produces the same intended final state.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "An operation is idempotent when repeating it produces the same intended final state.\n\nExample:\n\"Set order status to PAID\" is easier to make idempotent than:\n\"Add another payment record.\"\n\nThis matters because distributed systems can retry events." },
                { title: "Example", content: "A payment request is retried because the client did not receive the first response. An idempotency key lets the backend recognize the duplicate request and avoid charging the customer twice." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Failure Handling",
              slug: "failure-handling",
              description: "Automation must handle: - retries; - timeouts; - duplicate events; - partial completion; - deployment failure; - permission failure.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Automation must handle:\n- retries;\n- timeouts;\n- duplicate events;\n- partial completion;\n- deployment failure;\n- permission failure." },
                { title: "Example", content: "A downstream service times out during order processing. The application uses bounded retries where appropriate, records the failure, and moves work to a recovery path instead of waiting indefinitely." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Automation Example",
              slug: "automation-example",
              description: "A production deployment workflow:  If the new version fails health checks, the process should stop or roll back according to the defined deployment strategy.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A production deployment workflow:\n\n```\nDeveloper commit\n|\nPipeline\n|\nBuild\n|\nTests\n|\nSecurity checks\n|\nApproval\n|\nDeployment\n|\nHealth checks\n|\nTraffic shift\n|\nMonitoring\n```\n\nIf the new version fails health checks, the process should stop or roll back\naccording to the defined deployment strategy." },
                { title: "Example", content: "Suppose a production team needs to apply automation example while building a cloud application. The team uses the principle described here, validates the result with monitoring and testing, and keeps the configuration aligned with its security, reliability, and cost requirements." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
          ],
        },
        {
          title: "Cross-Service AWS Architecture",
          slug: "cross-service-aws-architecture",
          description: "Combine AWS services into complete architectures such as three-tier, high-traffic, static-plus-API, hybrid, and multi-account designs.",
          topics: [
            {
              title: "Three-Tier Application",
              slug: "three-tier-application",
              description: "A classic AWS architecture can be:  Network layout: - public subnets for public entry points; - private subnets for application; - private database subnets.",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A classic AWS architecture can be:\n\n```\nCLIENT\n|\nRoute 53\n|\nALB\n|\nApplication Tier\n|\nRDS\n|\nS3 for files\n```\n\nNetwork layout:\n- public subnets for public entry points;\n- private subnets for application;\n- private database subnets.\n\nSecurity:\n- least-privilege IAM roles;\n- restrictive security groups;\n- encryption;\n- audit logging.\n\nOperations:\n- CloudWatch;\n- CloudTrail;\n- alarms;\n- automated deployment." },
                { title: "Example", content: "A public ALB receives customer requests, private application instances process business logic, and a private relational database stores transactional data. S3 holds uploaded files." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "High-Traffic Application",
              slug: "high-traffic-application",
              description: "For changing traffic:  EC2 EC2 EC2 EC2  Scale the stateless application tier horizontally.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "For changing traffic:\n\n```\nRoute 53\n|\nALB\n|\nASG\n/ / | \\ \\\n```\nEC2 EC2 EC2 EC2\n```\n|\nCache\n|\nDatabase\n```\n\nScale the stateless application tier horizontally." },
                { title: "Example", content: "A flash-sale service places a stateless application tier behind an ALB and ASG, adds caching where appropriate, and monitors the database because scaling the application tier alone may not remove the bottleneck." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Static + Api Architecture",
              slug: "static-api-architecture",
              description: "For a modern web application:  This can reduce server management for suitable workloads.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "For a modern web application:\n\n```\nUser\n|\nEdge/CDN\n|\nObject Storage\n|\nAPI\n|\nServerless Compute\n|\nNoSQL Database\n```\n\nThis can reduce server management for suitable workloads." },
                { title: "Example", content: "A web frontend is delivered from object storage and an edge layer while API requests reach serverless compute and a managed database. This separates static delivery from dynamic processing." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Hybrid Architecture",
              slug: "hybrid-architecture",
              description: "A company can retain an on-premise system while adding AWS:  App Tier Data/Services Hybrid design requires: - routing; - DNS; - identity; - security; - monitoring; - failure pla...",
              estimatedMinutes: 11,
              sections: [
                { title: "Detailed explanation", content: "A company can retain an on-premise system while adding AWS:\n\n```\nCorporate Network\n|\nVPN/DX\n|\nVPC\n/     \\\n```\nApp Tier  Data/Services\n\nHybrid design requires:\n- routing;\n- DNS;\n- identity;\n- security;\n- monitoring;\n- failure planning." },
                { title: "Example", content: "An enterprise keeps its existing internal system while moving a new application component to AWS. VPN or dedicated connectivity links the environments, with routing, DNS, identity, security, and monitoring planned together." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Multi-Account Architecture",
              slug: "multi-account-architecture",
              description: "A larger organization can separate:  Benefits: - blast-radius reduction; - access separation; - billing separation; - governance.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "A larger organization can separate:\n\n```\nOrganization\n|\n+-- Security\n+-- Logging\n+-- Development\n+-- Staging\n+-- Production\n```\n\nBenefits:\n- blast-radius reduction;\n- access separation;\n- billing separation;\n- governance." },
                { title: "Example", content: "Production and development use separate AWS accounts. A security account centralizes security functions while account separation limits the impact of mistakes in one environment." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
          ],
        },
        {
          title: "AWS Design Decision Framework",
          slug: "aws-design-decision-framework",
          description: "Use a structured architecture decision process that starts with requirements and evaluates data, compute, networking, security, resilience, observability, cost, and automation.",
          topics: [
            {
              title: "Start With Requirements",
              slug: "start-with-requirements",
              description: "Write down: - users; - traffic; - data; - latency; - availability; - recovery; - compliance; - budget; - team skills.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Write down:\n- users;\n- traffic;\n- data;\n- latency;\n- availability;\n- recovery;\n- compliance;\n- budget;\n- team skills." },
                { title: "Example", content: "Before choosing AWS services for an ordering system, the architect documents users, traffic, data, latency, availability, recovery, compliance, budget, and team capabilities." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Choose The Data Model",
              slug: "choose-the-data-model",
              description: "Understand choose the data model and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Ask:\n- objects?\n- files?\n- blocks?\n- relational records?\n- key-value/document data?\n- cache?" },
                { title: "Example", content: "A design stores images as objects, transactional records in a relational database, and frequently accessed results in a cache because each data pattern has different access requirements." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Choose The Compute Model",
              slug: "choose-the-compute-model",
              description: "Understand choose the compute model and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Ask:\n- long-running server?\n- container?\n- managed application platform?\n- event-driven function?" },
                { title: "Example", content: "A long-running application may fit EC2, a containerized service may fit ECS or EKS, and an event-driven task may fit Lambda. The decision follows workload behavior rather than service popularity." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Design Networking",
              slug: "design-networking",
              description: "Define: - VPC; - CIDR; - subnets; - routes; - ingress; - egress; - security groups; - endpoints; - DNS; - hybrid connectivity.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Define:\n- VPC;\n- CIDR;\n- subnets;\n- routes;\n- ingress;\n- egress;\n- security groups;\n- endpoints;\n- DNS;\n- hybrid connectivity." },
                { title: "Example", content: "An API is placed behind a public entry point while application and database tiers remain private. Routes, security groups, endpoints, DNS, and outbound access are designed explicitly." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Design Security",
              slug: "design-security",
              description: "For every component ask: - Who can access it?",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "For every component ask:\n- Who can access it?\n- What actions are required?\n- Can temporary credentials be used?\n- Is the component public?\n- Is encryption required?\n- How is activity audited?" },
                { title: "Example", content: "For each component, the architect identifies who can access it, which actions are required, whether temporary credentials are possible, whether it must be public, and how activity will be audited." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Design Resiliency",
              slug: "design-resiliency",
              description: "Understand design resiliency and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Ask:\n- What happens when an instance fails?\n- What happens when a zone fails?\n- What happens when the database fails?\n- What happens when a deployment fails?\n- How is data restored?" },
                { title: "Example", content: "The team asks what happens if an instance, Availability Zone, database, or deployment fails and verifies that traffic redirection and data recovery procedures actually work." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Design Observability",
              slug: "design-observability",
              description: "Define: - metrics; - logs; - alarms; - dashboards; - audit events; - operational runbooks.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Define:\n- metrics;\n- logs;\n- alarms;\n- dashboards;\n- audit events;\n- operational runbooks." },
                { title: "Example", content: "A production service defines metrics, logs, alarms, dashboards, audit events, and operational runbooks before launch so failures can be detected and investigated." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Design Cost",
              slug: "design-cost",
              description: "Estimate: - compute; - storage; - requests; - database; - data transfer; - monitoring; - backup; - idle resources.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Estimate:\n- compute;\n- storage;\n- requests;\n- database;\n- data transfer;\n- monitoring;\n- backup;\n- idle resources." },
                { title: "Example", content: "The architecture estimates compute, storage, requests, database usage, data transfer, monitoring, backups, and idle resources before production deployment." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Automate",
              slug: "automate",
              description: "If an environment must be rebuilt, automation should be able to recreate it consistently.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "If an environment must be rebuilt, automation should be able to recreate it\nconsistently." },
                { title: "Example", content: "A team defines its environment as code so a new environment can be recreated consistently after a failure or for a new stage." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
          ],
        },
        {
          title: "End-to-End AWS Architecture Example",
          slug: "end-to-end-aws-architecture-example",
          description: "Walk through an end-to-end online food-delivery architecture and see how AWS services fit together in a realistic system.",
          topics: [
            {
              title: "Requirements",
              slug: "requirements",
              description: "The platform needs: - customer web application; - restaurant portal; - order processing; - payment integration; - delivery tracking; - image storage; - relational transactional...",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "The platform needs:\n- customer web application;\n- restaurant portal;\n- order processing;\n- payment integration;\n- delivery tracking;\n- image storage;\n- relational transactional data;\n- scalable traffic handling." },
                { title: "Example", content: "For an online food-delivery platform, the team first lists customer, restaurant, order, payment, tracking, storage, database, and scaling requirements before selecting services." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Network",
              slug: "network",
              description: "Understand network and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "```\nVPC\n|\n+-- Public Subnets\n|      +-- ALB\n|\n+-- Private App Subnets\n|      +-- Application instances\n|\n+-- Private Data Subnets\n+-- Database\n```" },
                { title: "Example", content: "The food-delivery platform uses public subnets for the ALB, private subnets for application instances, and private database subnets for transactional storage." },
                { title: "Practical use", content: "Use it when designing connectivity boundaries, traffic paths, private access, or hybrid network integration." },
              ],
            },
            {
              title: "Storage",
              slug: "storage",
              description: "Understand storage and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "- S3 for restaurant images and customer-uploaded assets.\n- RDS/Aurora for transactional order information.\n- ElastiCache for suitable frequently accessed data." },
                { title: "Example", content: "Restaurant images and customer uploads go to S3, transactional orders use a relational database, and frequently accessed data can use a cache." },
                { title: "Practical use", content: "Use it when selecting or operating a data service whose access pattern, durability, performance, recovery, or cost requirements match the workload." },
              ],
            },
            {
              title: "Compute",
              slug: "compute",
              description: "Use a stateless application tier behind an ALB and Auto Scaling Group.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Use a stateless application tier behind an ALB and Auto Scaling Group.\n\nWhy stateless?\n\nAny healthy instance can handle the next request." },
                { title: "Example", content: "The application tier runs stateless instances behind an ALB and Auto Scaling Group so any healthy instance can handle the next request." },
                { title: "Practical use", content: "Use it when choosing or operating compute capacity and when the application needs predictable scaling, isolation, or deployment behavior." },
              ],
            },
            {
              title: "Security",
              slug: "security",
              description: "Customer traffic:  Application:  Database:  Secrets:  Audit:",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Customer traffic:\n```\nHTTPS\n```\n\nApplication:\n```\nIAM roles\n```\n\nDatabase:\n```\nprivate network\nrestrictive security group\n```\n\nSecrets:\n```\nmanaged secret storage\n```\n\nAudit:\n```\nCloudTrail\n```" },
                { title: "Example", content: "Customer traffic uses HTTPS, application instances use IAM roles, the database stays private behind restrictive security groups, secrets use managed storage, and API activity is audited." },
                { title: "Practical use", content: "Use it to reduce unauthorized access, improve auditability, and make security controls explicit for the workload." },
              ],
            },
            {
              title: "Monitoring",
              slug: "monitoring-11-6",
              description: "Track: - order requests; - payment failures; - API latency; - HTTP errors; - instance health; - database performance; - queue depth if asynchronous processing is used.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Track:\n- order requests;\n- payment failures;\n- API latency;\n- HTTP errors;\n- instance health;\n- database performance;\n- queue depth if asynchronous processing is used." },
                { title: "Example", content: "The platform tracks latency, errors, capacity, database health, and application logs, with alarms connected to operational responses." },
                { title: "Practical use", content: "Use it when the workload has a concrete requirement that this AWS concept addresses, and validate the design with testing and monitoring." },
              ],
            },
            {
              title: "Resiliency",
              slug: "resiliency",
              description: "Deploy application instances across multiple Availability Zones.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "Deploy application instances across multiple Availability Zones.\n\nUse:\n- health checks;\n- automated replacement;\n- database availability features;\n- backups;\n- tested restore procedures." },
                { title: "Example", content: "The service is distributed across multiple zones, uses health checks and automated replacement, maintains backups, and documents how operators recover from component failures." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Cost Control",
              slug: "cost-control",
              description: "Understand cost control and its role in AWS cloud architecture.",
              estimatedMinutes: 10,
              sections: [
                { title: "Detailed explanation", content: "- right-size instances;\n- scale according to demand;\n- lifecycle old images;\n- move old objects to suitable storage classes;\n- remove unused development resources;\n- analyze data-transfer patterns." },
                { title: "Example", content: "The team reviews idle compute, storage lifecycle rules, data transfer, database sizing, monitoring volume, and backup retention to control ongoing spend." },
                { title: "Practical use", content: "Use it as an architecture decision point: define the requirement first, then validate reliability, security, performance, operational, and cost consequences." },
              ],
            },
            {
              title: "Deployment",
              slug: "deployment",
              description: "Putting every server in one Availability Zone.",
              estimatedMinutes: 13,
              sections: [
                { title: "Detailed explanation", content: "Pipeline:\n\n```\nSource\n|\nBuild\n|\nTest\n|\nSecurity Validation\n|\nStaging\n|\nApproval\n|\nProduction\n|\nHealth Check\n|\nControlled Traffic Shift\n```\n\nCOMMON AWS MISTAKES\n\n1. Putting every server in one Availability Zone.\n2. Making databases publicly reachable without a compelling reason.\n3. Using broad IAM permissions.\n4. Storing access keys in application code.\n5. Treating S3 like a traditional file system.\n6. Using local instance storage as the only copy of critical data.\n7. Assuming backups automatically mean disaster recovery is tested.\n8. Ignoring data-transfer charges.\n9. Selecting an instance by CPU count alone.\n10. Creating alerts without defining response actions.\n11. Using sticky sessions to hide a state-management problem.\n12. Choosing Kubernetes without a real operational requirement.\n13. Assuming serverless means zero operational responsibility.\n14. Forgetting Region-specific service availability.\n15. Treating an SLA as a guarantee for the entire application.\n16. Scaling compute while ignoring the database bottleneck.\n17. Creating a very large VPC CIDR without considering connected networks.\n18. Allowing unrestricted inbound traffic for convenience.\n19. Making manual production changes that are not captured in infrastructure code.\n20. Failing to test restore and failover procedures." },
                { title: "Example", content: "Application changes pass through version control, automated tests, and a controlled deployment process. If health checks fail, the rollout stops or rolls back according to the chosen strategy." },
                { title: "Practical use", content: "Use it to make infrastructure or application delivery repeatable, reviewable, and easier to operate across environments." },
              ],
            },
          ],
        },
      ],
    },
  ],
};

async function main() {
  const category = await prisma.studyCategory.upsert({
    where: { name: awsCategory.name },
    update: {
      name: awsCategory.name,
      slug: awsCategory.slug,
      description: awsCategory.description,
      icon: awsCategory.icon,
      isPublished: true,
      sortOrder: awsCategory.sortOrder,
    },
    create: {
      name: awsCategory.name,
      slug: awsCategory.slug,
      description: awsCategory.description,
      icon: awsCategory.icon,
      isPublished: true,
      sortOrder: awsCategory.sortOrder,
    },
  });

  for (const [pathIndex, pathSeed] of awsCategory.paths.entries()) {
    const path = await prisma.studyPath.upsert({
      where: {
        categoryId_level: {
          categoryId: category.id,
          level: pathSeed.level,
        },
      },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        isPublished: true,
        sortOrder: pathIndex,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: pathIndex,
      },
    });

    for (const [moduleIndex, moduleSeed] of (pathSeed.modules ?? []).entries()) {
      const studyModule = await prisma.studyModule.upsert({
        where: {
          studyPathId_slug: {
            studyPathId: path.id,
            slug: moduleSeed.slug,
          },
        },
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
      });

      for (const [topicIndex, topicSeed] of (moduleSeed.topics ?? []).entries()) {
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

        const topic = await prisma.studyTopic.upsert({
          where: {
            categoryId_slug: {
              categoryId: category.id,
              slug: topicSlug,
            },
          },
          update: {
            moduleId: studyModule.id,
            title: topicSeed.title,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
          create: {
            categoryId: category.id,
            moduleId: studyModule.id,
            title: topicSeed.title,
            slug: topicSlug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        for (const [sectionIndex, section] of (topicSeed.sections ?? []).entries()) {
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
            create: {
              id: `${topic.id}-section-${sectionIndex}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
          });
        }
      }
    }
  }

  const topicCount = awsCategory.paths.reduce(
    (total, path) =>
      total +
      (path.modules ?? []).reduce(
        (moduleTotal, module) => moduleTotal + (module.topics ?? []).length,
        0,
      ),
    0,
  );

  console.log(`Seeded AWS Cloud Engineering: ${awsCategory.paths.length} path(s), ${topicCount} topics.`);
}

main()
  .catch((error) => {
    console.error("AWS seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
