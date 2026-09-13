import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};
type ModuleSeed = { title: string; slug: string; description: string; topics: TopicSeed[] };
type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[] };
type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number };

const categorySeed: CategorySeed = {
  name: "Kubernetes",
  slug: "kubernetes",
  description: "A structured learning path covering Kubernetes orchestration, architecture, workloads, networking, storage, configuration, operations, security, scaling, and troubleshooting.",
  icon: "☸️",
  sortOrder: 1,
};

const paths: PathSeed[] = [
  {
    name: "Beginner",
    slug: "beginner",
    description: "Learn Kubernetes through concepts, examples, and practical workflows.",
    level: StudyLevel.BEGINNER,
    modules: [
      {
        title: "Kubernetes Foundations",
        slug: "kubernetes-foundations",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Kubernetes Purpose and Orchestration",
            slug: "kubernetes-purpose-orchestration",
            description: "Learn kubernetes purpose and orchestration with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Kubernetes is an orchestration platform for running containerized applications across a group of machines. The important idea is not simply starting containers; it is continuously managing a desired application state. An operator can describe requirements such as the number of replicas, the image to run, networking, configuration, and storage, while Kubernetes components observe the cluster and reconcile differences between the requested state and the state that actually exists.

This model becomes valuable as applications grow beyond a single container. A real system may have a frontend, APIs, workers, caches, and supporting services distributed across several nodes. Kubernetes provides common mechanisms for placement, replacement after failure, stable service access, persistent storage, configuration, scaling, and operational inspection. It does not make every infrastructure environment identical; storage, networking, and availability characteristics still depend on the underlying platform.

The core mental model is desired state -> Kubernetes API -> scheduling/controllers -> nodes -> pods -> containers. Controllers repeatedly observe resources and take corrective action. If an application requests four replicas and only three are available, the controller works toward restoring the fourth. This is why Kubernetes is better understood as a reconciliation system than as a collection of commands.

### Deeper understanding

Kubernetes is best understood as a reconciliation system rather than simply a tool that starts containers. You describe what the application should look like, and Kubernetes continuously compares that desired state with what is actually running. Controllers are responsible for closing that gap. This distinction explains why Kubernetes can recover from failures without a human manually restarting every process.

The abstraction also separates application intent from individual machines. A workload definition can request several replicas without naming a particular worker node. The scheduler decides placement, while node-side components carry out the work. This separation makes the application definition reusable as the cluster changes.

Orchestration becomes valuable when failure, scaling, networking, configuration, and storage must be handled together. A single container can be managed with a simple runtime command, but a production application needs policies for replacement, discovery, resource allocation, and controlled change.

### How to reason about it

Start with the business requirement, such as “keep three API instances available.” Translate that into desired state. Then ask which Kubernetes object expresses that state, which controller reconciles it, where the resulting Pods run, and how clients reach them. This problem-to-object approach is more useful than memorizing commands.

### Practical learning check

Imagine one of three API Pods disappears. The important question is not “which command restarts it?” but “which controller notices the difference between desired and observed state, and what resource does it create?” That is the core Kubernetes operating model.` },
              { title: "Example", content: `Imagine an online learning platform that needs four API replicas. The Deployment declares four replicas. When four are healthy, the observed state matches the desired state. If one pod disappears because its process or node fails, the controller notices that only three matching replicas remain and works toward creating a replacement. Clients use a Service rather than storing individual pod addresses.` },
              { title: "Practical use", content: `Use this concept when designing any multi-container application where workloads may move between machines or need automatic recovery. Start by defining the desired number of replicas and the relationships between workloads, services, configuration, and storage. Then practice deliberately deleting a pod and observing how the controller restores the requested state.` },
            ],
          },
          {
            title: "Cluster Architecture",
            slug: "cluster-architecture",
            description: "Learn cluster architecture with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `A Kubernetes cluster has a control plane that manages the cluster and nodes that run workloads. The API server is the central interface: kubectl and other Kubernetes components communicate with the API through it. The scheduler selects suitable nodes for pods that need placement. Controllers continuously compare desired and observed state and initiate corrective actions. etcd stores important cluster state, so its reliability is a critical control-plane concern.

On a worker node, the container runtime executes containers, kubelet acts as the node agent that manages workloads according to control-plane instructions, and kube-proxy participates in Service networking behavior described by the source. The control plane therefore makes decisions and maintains cluster state, while node-side components help realize those decisions.

Understanding these responsibilities helps with troubleshooting. A pod that has not been scheduled points attention toward scheduling and node constraints. A scheduled pod that cannot start points toward node/runtime/configuration issues. A Service routing problem points toward networking, selectors, endpoints, and related components.

### Deeper understanding

A Kubernetes cluster separates control decisions from workload execution. The control plane exposes the API, decides placement, maintains desired-state reconciliation, and stores cluster state. Worker nodes provide the environment where Pods actually execute.

The API server is the central interaction point. Administrative tools and controllers communicate with the cluster through the API rather than directly editing node processes. The scheduler is concerned with placing unscheduled Pods, while controllers continually evaluate resources and initiate corrective actions.

On a worker node, kubelet acts as the local management agent. It receives the workload requirements associated with the node and works with the container runtime to make the node match those requirements. kube-proxy participates in the networking path for Services as described by the source.

etcd is particularly important because cluster state must be durable and consistently available to the control plane. A control plane can make excellent decisions only when the state it relies on is reliable.

### How the pieces cooperate

A useful flow is:

Request -> API server -> persisted state -> scheduler/controller decisions -> node -> kubelet/runtime -> Pod

The flow is intentionally indirect. This architecture allows Kubernetes components to specialize instead of making every component responsible for every task.

### Practical learning check

When troubleshooting, identify whether the failure is in the API/control-plane layer, scheduling, node execution, workload configuration, or networking. Locating the layer first narrows the investigation dramatically.` },
              { title: "Example", content: `Suppose a pod is created with three replicas. The API server accepts the desired configuration. The scheduler chooses nodes for unscheduled pods. Kubelet on each selected node works to start the containers, while the controllers keep watching the replica count. If a node becomes unavailable, the control plane can work toward recreating affected workloads where capacity exists.` },
              { title: "Practical use", content: `Draw the control-plane and node boundary before learning individual commands. During troubleshooting, ask which component owns the decision or state involved: API server for API access, scheduler for placement, controllers for reconciliation, kubelet for node execution, and etcd for persistent cluster state.` },
            ],
          },
          {
            title: "Pods",
            slug: "pods",
            description: "Learn pods with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `A pod is the smallest deployable workload unit in the source material. It can contain one or more containers that share the pod's network identity and can communicate with one another through localhost. Multiple containers belong in the same pod when they are tightly coupled and need to share lifecycle or local communication characteristics.

Pods are intentionally ephemeral. A pod can disappear because of node failure, scheduling changes, or other cluster events, and a replacement can receive a different identity and address. Therefore an application should not treat a pod as a permanent server. Stable networking belongs behind a Service, automatic replacement belongs to a controller such as a Deployment, and durable data belongs on appropriate persistent storage.

The pod boundary is important because it defines co-location. Containers in different pods should normally communicate through Kubernetes networking and Services rather than assuming localhost. Containers in the same pod can use localhost because they share the pod network namespace.

### Deeper understanding

A Pod is the Kubernetes unit in which one or more containers are scheduled together. Containers in the same Pod share the Pod's network identity, allowing tightly coupled processes to communicate through localhost. This is useful when multiple processes genuinely belong to one operational unit.

A Pod should not be treated like a traditional virtual machine. Its identity is replaceable, and a replacement may have a different name and IP address. Kubernetes expects applications to tolerate this lifecycle rather than building permanent assumptions around one Pod instance.

A good Pod design starts by asking whether containers must share lifecycle, networking, and local resources. If two processes are independently deployable and independently scalable, placing them in separate Pods is usually easier to reason about. If a helper process is tightly coupled to the main application, co-locating them can be appropriate.

### Lifecycle model

Think of a Pod as disposable compute capacity:

Pod created -> containers start -> application runs -> Pod fails/terminates -> replacement may be created

The replacement is logically the same workload role, but it is not necessarily the same individual instance.

### Practical learning check

Whenever application code stores a Pod IP, Pod name, or local filesystem assumption as permanent state, question that design. Stable access belongs to Services, and durable application data needs an appropriate storage design.` },
              { title: "Example", content: `A thumbnail processor has an image conversion container and a small helper container that communicates locally with it. If those processes must always be co-located and share a lifecycle, one pod can be appropriate. If the helper instead needs independent scaling and lifecycle management, separate pods may be a better design.` },
              { title: "Practical use", content: `Practice by creating a simple pod, inspecting its status and logs, and deleting it. Then compare that behavior with a Deployment-managed pod. The goal is to see why a raw pod is a workload unit rather than a durable application identity.` },
            ],
          },
          {
            title: "Labels and Selectors",
            slug: "labels-and-selectors",
            description: "Learn labels and selectors with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `Labels are key/value metadata attached to Kubernetes resources. They provide a flexible way to describe application, environment, release, team, or other operational characteristics. Selectors use label conditions to find matching resources. This separation is powerful because resource names are often generated or changed, while labels can express stable logical groupings.

A selector may use equality-style requirements such as environment=test or set-based requirements such as environment in (dev, test), depending on the Kubernetes object and selector syntax. Multiple requirements can narrow a selection. Controllers and Services depend heavily on matching logic: a controller needs to know which pods belong to its workload, while a Service needs to know which pods should receive traffic.

Good labels should have operational meaning. A small, consistent scheme such as app=payments, environment=staging, release=stable makes inspection and troubleshooting easier. Incorrect selectors are especially important because a Service with no matching pods can have no usable endpoints, and a controller with the wrong selection can manage the wrong workload.

### Deeper understanding

Labels provide structured metadata that Kubernetes objects can carry. Their real value appears when another resource needs to identify a group of objects without depending on generated names.

Selectors are the matching mechanism. A controller, Service, or other Kubernetes feature can use selector rules to identify the resources it should operate on. This creates a loose connection between resources: the producer does not need to know every individual Pod name.

For example, a team can label workloads with \`app\`, \`environment\`, and \`release\`. A Service can select the application identity, while operational tooling can filter by environment or release. The labels become a small vocabulary for describing the cluster.

Selector design deserves care. If a selector is too broad, a Service or controller may accidentally target resources it should not manage. If it is too narrow, the intended Pods may not match at all.

### How to reason about selectors

For every selector, ask: “Which exact resources should match?” Then test that assumption against the labels on the candidate Pods. This is especially important when diagnosing a Service with zero endpoints or unexpected controller behavior.

### Practical learning check

Create two sets of Pods with the same \`app\` label but different environments. Practice selecting only one environment, then deliberately change one label and observe how the matching set changes.` },
              { title: "Example", content: `Create three pods labeled app=catalog and two labeled app=payments. A selector app=catalog should match only the catalog pods. Add environment=staging to one group and use a combined selector to narrow the result further.` },
              { title: "Practical use", content: `Use labels as the primary way to reason about relationships between resources. When a Service is unreachable, compare its selector with the labels on the target pods before changing application code. When a controller behaves unexpectedly, inspect the labels it selects and verify that the intended pods are the ones being managed.` },
            ],
          },
        ],
      },
      {
        title: "Workloads and Services",
        slug: "workloads-and-services",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Deployments, Replica Sets, and Controllers",
            slug: "deployments-replica-sets-controllers",
            description: "Learn deployments, replica sets, and controllers with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `A controller is a reconciliation mechanism that works continuously toward a requested state. The basic loop is desired state -> observe -> compare -> reconcile -> observe again. This pattern is why Kubernetes can recover workloads without requiring an operator to manually recreate every failed instance.

A ReplicaSet maintains a desired number of matching pods. The source contrasts it with the older ReplicationController and notes that ReplicaSet supports set-based selectors. A Deployment sits at a higher level: it manages an application's desired replicas and provides rollout and rollback behavior through ReplicaSets. This gives application lifecycle management a stable declarative model.

The distinction matters operationally. A ReplicaSet answers the question 'how many matching pods should exist?' A Deployment adds application revision management and controlled updates. If version A has three replicas and version B is introduced, the Deployment can coordinate replacement and preserve a path back to a known-good revision.

### Deeper understanding

Controllers implement the reconciliation pattern. They repeatedly observe the current state, compare it with the desired state, and take actions when the two differ.

A ReplicaSet focuses on maintaining a requested number of matching Pods. A Deployment adds a higher-level application lifecycle abstraction around that mechanism, allowing a workload definition to evolve through revisions and supporting controlled rollout and rollback behavior.

This layered design is important. An operator usually expresses application intent at the Deployment level rather than manually creating individual Pods. The Deployment manages the desired workload, and lower-level controllers help maintain the resulting Pods.

### Rollout reasoning

Suppose an application has three replicas running version A. A new version B is introduced. A controlled rollout changes the workload gradually according to the Deployment's strategy rather than requiring the operator to destroy all instances first.

If the new revision behaves incorrectly, rollback provides a way to return toward a previous known-good revision. This makes deployment part of reliability engineering rather than a one-time installation event.

### Practical learning check

Think through three states:

Desired = 3, available = 3 -> stable.

Desired = 3, available = 2 -> reconciliation is needed.

Desired version = B, running version = A -> rollout is needed.

This mental model makes controller behavior easier to understand.` },
              { title: "Example", content: `An API service runs three replicas of version 7. A Deployment is updated to version 8. Kubernetes creates and replaces workload instances according to the Deployment's rollout strategy. If version 8 proves defective, the deployment history can provide a rollback path to the previous revision.` },
              { title: "Practical use", content: `Use Deployments for continuously running stateless application workloads in learning projects. Observe the relationship between Deployment, ReplicaSet, and Pods with \`kubectl get\` and \`kubectl describe\`. Practice changing an image or replica count and watch the controller reconcile the new desired state.` },
            ],
          },
          {
            title: "Services and Service Discovery",
            slug: "services-and-service-discovery",
            description: "Learn services and service discovery with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Pods are replaceable, so their IP addresses should not be treated as permanent application endpoints. A Service provides a stable logical endpoint and selects matching pods. The conceptual traffic path is client -> Service -> matching pods. This allows a client to keep using a stable service name while individual pod identities change.

The source describes ClusterIP for internal cluster access, NodePort for exposing a node port, and LoadBalancer for integration with an external load-balancing capability. The correct choice depends on the access requirement and environment. Service discovery can use mechanisms such as DNS and, historically, environment variables injected into pods.

Selectors are central to Service behavior. The Service selects pods by labels and builds the set of endpoints that can receive traffic. If the selector does not match the intended pods, the Service may exist while having no usable endpoints. This is why service troubleshooting should inspect both the Service definition and the labels/endpoints of the workloads.

### Deeper understanding

A Service solves the mismatch between stable application identity and ephemeral Pod identity. Pods can be replaced, rescheduled, and assigned different addresses. Clients should therefore communicate with a logical service endpoint rather than tracking individual instances.

A Service uses selectors to identify its backend Pods. Kubernetes maintains the relationship between the logical Service and the currently matching endpoints. This means a client can continue using the Service while the underlying Pod set changes.

ClusterIP represents internal cluster access. NodePort exposes a service through a port on cluster nodes and is useful for simple external access. LoadBalancer integrates the Service with an external load-balancing capability when supported by the environment.

### Service discovery

The source discusses environment-variable discovery and DNS. DNS is particularly useful because applications can use a stable service name while the underlying Pod addresses change.

This creates an important abstraction:

Client -> stable Service name -> current endpoints -> Pods

### Practical learning check

If a backend Pod is deleted and replaced, the frontend should not need a configuration change when it communicates through the Service. Test this mentally whenever you see code that directly stores Pod IP addresses.` },
              { title: "Example", content: `A recommendation API has five replicas. Instead of configuring the frontend with five pod IP addresses, the frontend calls \`recommendation-service\`. Kubernetes resolves that stable service endpoint and directs traffic to currently matching pods. If one pod is replaced, the frontend configuration does not need to change.` },
              { title: "Practical use", content: `Build a frontend and backend Deployment in a learning cluster. Expose the backend through a ClusterIP Service and resolve it by service name from the frontend. Then delete a backend pod and verify that the Service remains the stable access point.` },
            ],
          },
        ],
      },
      {
        title: "Storage and Configuration",
        slug: "storage-and-configuration",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Storage: Volumes, Persistent Volumes and Claims",
            slug: "storage-volumes-pvs-pvcs",
            description: "Learn storage: volumes, persistent volumes and claims with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Container filesystems are not a reliable place for durable application data. When a container or pod is replaced, data stored only inside that ephemeral filesystem may disappear. Kubernetes therefore provides volume mechanisms and persistent-storage abstractions for workloads that need data to survive workload replacement.

A volume is associated with a pod and can be shared by containers in that pod. A PersistentVolume (PV) represents storage as a cluster resource with a lifecycle independent of one particular pod. A PersistentVolumeClaim (PVC) is an application's request for storage, including requirements such as capacity and access mode. The conceptual relationship is application -> PVC -> PV -> storage backend.

Access modes such as ReadWriteOnce, ReadOnlyMany, and ReadWriteMany describe how storage may be mounted, but the actual capabilities depend on the storage backend. A PVC can remain unbound if suitable storage is not available. Host-path storage is useful for learning mechanics but couples the workload to a node and should not automatically be considered a production design.` },
              { title: "Example", content: `A document service creates signed reports. If it writes them only to the container filesystem, replacing the workload can lose them. Instead, the pod mounts a PVC. The PVC binds to suitable persistent storage, allowing the application's data lifecycle to be separated from the pod lifecycle.` },
              { title: "Practical use", content: `Practice creating a PV and PVC in a local learning cluster, mounting the claim into a workload, writing a file, replacing the workload, and checking whether the file remains. Use this exercise to distinguish pod-local storage from persistent storage rather than memorizing the abbreviations alone.` },
            ],
          },
          {
            title: "Secrets and ConfigMaps",
            slug: "secrets-and-configmaps",
            description: "Learn secrets and configmaps with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `Secrets and ConfigMaps separate runtime configuration from an application image. A Secret is intended for sensitive values such as passwords, tokens, or credentials. A ConfigMap is intended for ordinary non-sensitive configuration such as application mode, feature flags, or a service hostname.

This separation supports the same image being deployed into different environments while runtime configuration changes independently. Values can be supplied through environment variables or mounted files, and configuration can also be consumed through other supported Kubernetes mechanisms.

An important security point is that Base64 encoding is not encryption. Encoding a password as Base64 does not make it confidential. Secret data still requires appropriate access control and secure cluster management. The correct mental model is application image + runtime configuration/secret -> running workload, not 'put every configuration value in the image.'

### Deeper understanding

Configuration should generally be separated from an application image so that the same image can run in different environments. A development deployment might use one endpoint and a production deployment another, while the application binary remains unchanged.

ConfigMaps are intended for ordinary, non-sensitive configuration. Secrets are intended for sensitive values such as credentials and tokens.

A critical security point is that Base64 is not encryption. Encoding a password into Base64 does not make it confidential. Protecting Secrets therefore depends on access control, secure cluster management, and appropriate handling of the underlying cluster state.

The design can be viewed as:

Application image + environment configuration + sensitive runtime values -> running workload

This reduces the temptation to commit environment-specific credentials directly into source code or container images.

### Practical learning check

For every configuration value, ask whether disclosure would create a security problem. A feature flag may belong in a ConfigMap; a database password belongs in the sensitive configuration path. The distinction is about sensitivity, not merely data type.` },
              { title: "Example", content: `A billing API needs a database password and an \`APP_MODE=staging\` setting. Store the password in a Secret and the mode in a ConfigMap. The Deployment references both at runtime, so the image remains free of environment-specific credentials.` },
              { title: "Practical use", content: `Create a learning-only ConfigMap and Secret, inject them into a pod, and inspect how the application receives the values. Then change ordinary configuration without rebuilding the image. Treat real credentials as sensitive and never use production secrets in a practice seed or manifest.` },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Intermediate",
    slug: "intermediate",
    description: "Learn Kubernetes through concepts, examples, and practical workflows.",
    level: StudyLevel.INTERMEDIATE,
    modules: [
      {
        title: "Workload Types and Local Workflow",
        slug: "workload-types-and-local-workflow",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Jobs, DaemonSets, Namespaces and Quotas",
            slug: "jobs-daemonsets-namespaces-quotas",
            description: "Learn jobs, daemonsets, namespaces and quotas with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Different workloads need different controllers. A Job represents finite work that should successfully complete, such as processing a fixed batch or generating a report. A Deployment normally represents a continuously available application. A DaemonSet is suited to node-oriented work because it ensures a pod runs on all or selected nodes.

Namespaces provide logical partitions inside a cluster. Resources with the same name can exist in different namespaces, which makes namespaces useful for separating teams, environments, or application domains. ResourceQuota can place limits on resource consumption in a namespace, including limits involving CPU, memory, pods, or services.

These objects solve different operational questions. Job asks 'what finite work must finish?' DaemonSet asks 'which nodes need this workload?' Namespace asks 'which logical boundary does this resource belong to?' Quota asks 'how much of the shared cluster may this boundary consume?'

### Deeper understanding

Kubernetes workload objects express different lifecycle requirements. A Deployment normally represents a long-running application that should remain available. A Job represents finite work that should eventually complete successfully. A DaemonSet represents node-oriented work where a Pod should run on each applicable node.

Choosing the right controller starts with the workload question:

“Should this workload stay running, finish, or follow the set of nodes?”

A Namespace provides a logical boundary inside a cluster. It allows different teams or environments to organize resources and can support resource governance. A ResourceQuota limits consumption within a namespace, helping prevent one workload group from consuming an uncontrolled portion of shared capacity.

### Example reasoning

A nightly report generator should not be modeled as a continuously running web service. A node-level log collector should not be modeled as a fixed three-replica Deployment because the desired placement is tied to nodes.

### Practical learning check

Classify a workload before choosing its Kubernetes object. Batch processing -> Job. Node agent -> DaemonSet. Continuously available application -> Deployment. Shared organizational boundary -> Namespace. Resource boundary -> Quota.` },
              { title: "Example", content: `A company needs a node-level log collector. A DaemonSet places one collector on each applicable node. Separately, a monthly report generator can be represented by a Job that processes its finite input and then finishes. A \`training\` namespace can have a quota limiting the number of pods created by learners.` },
              { title: "Practical use", content: `Create one Job and compare its lifecycle with a Deployment. Then create a DaemonSet in a local cluster and compare its pod count with the number of matching nodes. Finally, create separate namespaces for development and testing and experiment with a resource quota.` },
            ],
          },
          {
            title: "Imperative vs Declarative Orchestration",
            slug: "imperative-vs-declarative-orchestration",
            description: "Learn imperative vs declarative orchestration with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `Imperative management focuses on the sequence of actions an operator wants the system to perform. For example, an operator might start three copies, expose a port, replace an old version, and manually recover a failed copy. This approach can work for small tasks but becomes difficult to maintain when the number of resources and failure cases grows.

Declarative management describes the target state instead. A definition can state that a catalog application should have three replicas and run a particular revision. Kubernetes determines the actions needed to move the current cluster toward that target. If one replica disappears later, reconciliation can restore it without requiring the operator to remember the original recovery steps.

The practical distinction is 'do these steps' versus 'make the system look like this.' Declarative definitions are easier to review, reproduce, automate, and reason about because the desired outcome is captured explicitly.

### Deeper understanding

Imperative management tells a system what actions to perform in sequence. Declarative management describes the state that should exist and allows the orchestration system to determine the actions required to reach it.

The difference becomes significant when failures and repeated operations are involved. An imperative script may say “create three instances, expose them, restart one if it fails.” A declarative definition says “this workload should have three replicas and this network exposure,” while Kubernetes continuously handles reconciliation.

Declarative management also provides a reusable description of infrastructure. The same desired-state definition can be reviewed, versioned, applied repeatedly, and compared with the actual cluster.

This does not mean imperative commands are useless. \`kubectl\` commands are valuable for inspection, diagnostics, and controlled operational tasks. The important distinction is where durable system intent is represented.

### Practical learning check

When writing a procedure, ask whether you are documenting a sequence of actions or the desired final condition. Durable application configuration is generally easier to reason about when the desired condition is explicit.` },
              { title: "Example", content: `An imperative workflow might say: create three containers, expose port 8080, and restart a failed copy. A declarative definition instead states that the application should have three replicas and expose a service. Kubernetes continuously works toward that condition.` },
              { title: "Practical use", content: `Take a small application and first write down the manual steps needed to keep it running. Then express the same requirements as Kubernetes resources. Compare which information survives after the original operator leaves and which approach better describes the desired state.` },
            ],
          },
          {
            title: "Getting Started with Minikube",
            slug: "getting-started-with-minikube",
            description: "Learn getting started with minikube with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `Minikube is presented by the source as a way to run a local single-node Kubernetes environment for learning. The historical material uses a local virtualization or driver setup and walks through installing kubectl and Minikube, starting the cluster, verifying it, deploying a workload, exposing it, and inspecting it.

Because Kubernetes tooling evolves, commands shown in older learning material may differ from current installations. The learning objective is therefore the workflow rather than blind memorization of a particular historical flag. The essential sequence is install the tools, start the cluster, verify access, deploy a workload, expose it, inspect it, and clean up when finished.

A useful first verification is \

### Deeper understanding

Minikube is presented by the source as a local Kubernetes learning environment. Its purpose is to make cluster concepts accessible on one computer rather than requiring a multi-node production platform.

The learning sequence matters more than memorizing one installation command because local Kubernetes tooling changes over time. The supplied guide itself notes that some of its installation commands and component details are historical. fileciteturn55file0L601-L623

A useful progression is to establish the local cluster, verify API connectivity, deploy a small workload, expose it, inspect its resources, and then clean up. Each step teaches a relationship rather than just a command.

### Practical learning check

After creating a simple workload, inspect Pods, Deployments, and Services separately. Then connect them conceptually:

Deployment -> Pods

Service -> matching Pods

Client -> Service

That chain is more important than the specific local driver or command syntax.\`kubectl get pods\`, followed by commands that inspect Deployments and Services. The important habit is to observe the cluster after every change rather than assuming that a command succeeded just because it returned without an obvious error.` },
              { title: "Example", content: `Start a local Minikube cluster, deploy a small hello application with a Deployment, expose it through a simple Service, and inspect the resulting Pods, Deployment, and Service. The exercise teaches the chain Deployment -> Pod -> Service -> client rather than the application itself.` },
              { title: "Practical use", content: `Use Minikube as a controlled laboratory for learning Kubernetes objects and failure behavior. Keep the cluster separate from production environments and remember that the exact driver and installation commands can vary with the current Minikube release.` },
            ],
          },
          {
            title: "kubectl Command Line Workflow",
            slug: "kubectl-command-line-workflow",
            description: "Learn kubectl command line workflow with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `kubectl is the command-line interface used to communicate with the Kubernetes API. Its value comes from combining inspection, modification, logs, execution, and context management into a repeatable operational workflow.

Common inspection commands include \

### Deeper understanding

kubectl is the command-line interface for communicating with the Kubernetes API. Effective kubectl usage is less about memorizing hundreds of commands and more about following a reliable inspection sequence.

Start by identifying the target cluster and namespace. Then inspect the resource at the appropriate abstraction level. \`get\` provides a concise state view, while \`describe\` adds configuration, relationships, and events. Logs provide application output, and \`exec\` can provide an interactive shell when the image supports it.

The context is especially important. A command can be perfectly valid and still be dangerous if it is sent to the wrong cluster. A safe workflow therefore verifies context before state-changing operations.

### Practical learning check

For an unhealthy application, use a progression such as:

context -> namespace -> workload -> Pod -> events -> logs -> configuration -> dependencies

This creates a repeatable troubleshooting method instead of random command execution.\`kubectl get pods\`, \`kubectl get deployments\`, \`kubectl get services\`, \`kubectl get pv\`, \`kubectl get pvc\`, and \`kubectl get namespaces\`. \`kubectl describe\` provides deeper configuration, status, relationships, and event information. \`kubectl logs\` reads container output, while \`kubectl exec\` can provide an interactive shell when the image supports one. Resource definitions can also be applied through declarative files.

Contexts are especially important when one workstation accesses multiple clusters. Before any state-changing command, verify the current context, namespace, resource name, and intended effect. A syntactically correct command aimed at the wrong cluster can still create a serious operational problem.` },
              { title: "Example", content: `When a Service is not reachable, begin with \`kubectl get service\`, then \`kubectl describe service\`, inspect the target pods and labels, and check endpoints. If a pod is failing, use \`kubectl describe pod\` and \`kubectl logs\` before changing the workload blindly.` },
              { title: "Practical use", content: `Develop a fixed troubleshooting sequence: inspect with \`get\`, investigate with \`describe\`, read application output with \`logs\`, enter the container only when necessary, and verify the context before changes. This turns kubectl from a list of commands into an operational method.` },
            ],
          },
        ],
      },
      {
        title: "Operations and Deployment",
        slug: "operations-and-deployment",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Logging",
            slug: "logging",
            description: "Learn logging with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `Kubernetes workloads commonly expose application output through stdout and stderr, which can be inspected with \

### Deeper understanding

Logging and monitoring answer different questions. Logs capture application or system events and messages; monitoring measures numerical behavior such as CPU, memory, network usage, and utilization.

Kubernetes commonly exposes container output through stdout and stderr, which can be inspected with kubectl logs. When a Pod contains multiple containers, identifying the correct container is necessary. Previous-container logs can be useful when a container crashed and restarted.

Local logs have a lifecycle. If a Pod disappears, its associated local log data may no longer be available through the same Pod identity. That is why production systems often collect logs centrally.

The source discusses node-level agents and sidecar patterns as approaches. The correct architecture depends on operational requirements, volume, retention, and the surrounding platform.

### Practical learning check

When diagnosing an error, combine logs with resource and state information. A timeout message tells you what happened at the application level; CPU saturation or a failed dependency may explain why it happened.\`kubectl logs\`. For a pod containing multiple containers, the relevant container may need to be selected explicitly. Following logs is useful for observing behavior while an application is running, while previous-container logs can help investigate a crashed and restarted container when supported.

Local pod logs have a lifecycle limitation: when the relevant pod is removed, local log availability can disappear. Production systems therefore often use centralized logging. A node-level logging agent can collect workload output from many nodes and send it to a central backend. The source also discusses a sidecar approach, where a logging container shares a pod with the application, and direct application logging to a backend.

Logging answers 'what events or messages did the application produce?' It complements monitoring, which answers questions about measurements such as CPU, memory, and utilization.` },
              { title: "Example", content: `A web API repeatedly restarts. \`kubectl get pods\` shows increasing restarts. \`kubectl describe pod\` reveals lifecycle events, and \`kubectl logs\` shows an application startup error. If the current container has already crashed, inspecting logs from the previous instance can help identify the failure.` },
              { title: "Practical use", content: `Practice logging by creating a pod that writes several messages, following its output, and then intentionally causing a restart. Compare current and previous logs where supported. For production design, evaluate centralized collection rather than relying on the lifecycle of individual pods.` },
            ],
          },
          {
            title: "Monitoring",
            slug: "monitoring",
            description: "Learn monitoring with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `Monitoring measures the behavior and resource usage of a Kubernetes environment. The source discusses CPU, memory, network, filesystem usage, node utilization, pod utilization, and cluster information. These measurements help operators understand capacity, identify abnormal behavior, and distinguish resource pressure from application-level failures.

Logging and monitoring answer different questions. A metric such as CPU=90% is a measurement of system behavior. A log entry such as 'request timeout after database call' is an event emitted by an application. Combining both can make diagnosis much more effective: a spike in memory can be correlated with application errors or restarts.

The source references tools such as \

### Deeper understanding

Monitoring turns system behavior into measurable signals. The source focuses on CPU, memory, network, filesystem usage, node utilization, Pod utilization, and cluster information.

A useful monitoring system answers operational questions rather than merely collecting numbers. For example, “Which Pod is consuming the most memory?” is actionable because it can lead to investigation. “Is this node approaching capacity?” helps with capacity planning.

Monitoring should also be interpreted with context. High CPU is not automatically a failure. A batch workload may intentionally consume CPU, while a latency-sensitive API showing high CPU together with rising response times may indicate pressure.

### Monitoring versus logging

Monitoring might tell you that memory usage increased from normal levels to 90%. Logs might reveal that requests began failing with out-of-memory-related messages. Combining both provides a stronger diagnostic picture than either alone.

### Practical learning check

For every metric, define the question it answers, the normal range, the threshold that deserves attention, and the action that follows. That turns metrics into an operational tool rather than dashboard decoration.\`top\`, \`kubectl top\`, Heapster, InfluxDB, and Grafana. Some of these references are historical, so the learning principle should be separated from the exact tool choice: collect meaningful metrics, retain enough history, visualize important signals, and use measurements to drive operational decisions.` },
              { title: "Example", content: `A cluster's API pods suddenly become slow. Monitoring shows memory pressure on their nodes and elevated pod memory usage. Application logs simultaneously show increasing request timeouts. Together these signals provide stronger evidence than either logs or resource metrics alone.` },
              { title: "Practical use", content: `Start with a small set of useful measurements: CPU, memory, restarts, node capacity, and workload utilization. Build the habit of asking what decision each metric supports instead of collecting dashboards with no operational purpose.` },
            ],
          },
          {
            title: "Multiple Clusters and Contexts",
            slug: "multiple-clusters-and-contexts",
            description: "Learn multiple clusters and contexts with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `kubectl can manage multiple clusters through configuration and contexts. A context associates the information needed to operate against a particular cluster and user configuration. This makes it possible for one workstation to switch between development, testing, and production environments without rewriting every command.

The source identifies the kubeconfig file and commands such as \

### Deeper understanding

kubectl can manage multiple Kubernetes clusters through configuration and contexts. A context associates a cluster with the credentials and configuration used for a particular operating context.

This becomes critical when development, testing, and production clusters are all accessible from the same workstation. The command syntax may be identical across environments, but the consequences can be completely different.

A safe workflow makes cluster identity explicit before making changes. Inspect the available contexts, inspect the current configuration, and verify the intended namespace before destructive or state-changing operations.

### Practical learning check

Treat the current context as part of every operational command. Before deleting or changing anything, mentally complete the sentence:

“I am about to change ______ in namespace ______ on cluster ______.”

If any blank is uncertain, inspect the context first.\`kubectl config get-contexts\`, \`kubectl config view\`, and \`kubectl config use-context\`. The current context determines where subsequent kubectl operations are directed. This makes context awareness a safety mechanism, not merely a convenience.

A disciplined workflow is to inspect available contexts, confirm the selected context, inspect the target namespace and resources, and only then perform a state-changing operation. The more powerful the credentials are, the more important this verification becomes.` },
              { title: "Example", content: `A developer has contexts named \`development\`, \`testing\`, and \`production\`. Before scaling an API, they run \`kubectl config get-contexts\`, switch to the intended context, inspect the workloads, and only then apply the change.` },
              { title: "Practical use", content: `Practice with two local or learning contexts. Before every destructive or state-changing command, deliberately verify the active context. This habit is especially valuable in environments where one terminal can access multiple clusters.` },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Advanced",
    slug: "advanced",
    description: "Learn Kubernetes through concepts, examples, and practical workflows.",
    level: StudyLevel.ADVANCED,
    modules: [
      {
        title: "Architecture and Production",
        slug: "architecture-and-production",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "End-to-End Application Deployment",
            slug: "end-to-end-application-deployment",
            description: "Learn end-to-end application deployment with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 35,
            sections: [
              { title: "Detailed explanation", content: `An end-to-end Kubernetes application is easier to understand when each resource solves a specific problem. The source walkthrough uses a web application and database; the guide's learning example is an inventory portal. The database needs credentials and persistent storage, the web application needs a stable database endpoint, and users need a way to reach the web workload.

A useful resource sequence is Secret -> PersistentVolume -> PersistentVolumeClaim -> database Deployment -> database Service -> web Deployment -> web Service. The Secret supplies sensitive configuration, the PVC requests durable storage, the database Service provides a stable internal endpoint, and the web Service provides application access.

The most important lesson is the relationship between resources rather than the exact YAML syntax. The database pod can be replaced without forcing the web application to learn a new pod IP because the web application uses the Service name. Similarly, web replicas can change while the external client continues using the stable web Service.

### Deeper understanding

An end-to-end deployment demonstrates how Kubernetes objects cooperate rather than existing as isolated resources. A typical learning architecture contains an externally reachable web workload, an internal database workload, configuration, credentials, and persistent storage.

The relationships are the important part:

Secret -> database credentials

PVC -> storage request

PV -> storage resource

Database Deployment -> database Pods

Database Service -> stable database endpoint

Web Deployment -> web Pods

Web Service -> external access path

The database should be reached through its Service rather than a Pod IP. Persistent data should be mounted through an appropriate storage relationship rather than relying on a container filesystem.

### How to troubleshoot the architecture

If the web application cannot connect to the database, inspect the database Pods first, then the database Service, endpoints, credentials, configuration, DNS resolution, and logs. This follows the dependency graph from workload to network to configuration.

### Practical learning check

Draw the dependency graph before deploying. If you cannot explain why each resource exists and what resource it depends on, the architecture has not yet been understood.` },
              { title: "Example", content: `An inventory portal runs three web replicas and one learning database instance. The database receives credentials from a Secret and data storage through a PVC. A ClusterIP Service exposes the database internally. The web Deployment receives the database service name and is exposed through a Service suitable for the local environment. Deleting one web pod demonstrates controller recovery.` },
              { title: "Practical use", content: `Build the application in stages and verify after each stage. Check Pods, Deployments, Services, PVs, PVCs, and events. Test service discovery from the web workload and deliberately remove one web pod to observe reconciliation. Never use real production credentials in a learning environment.` },
            ],
          },
          {
            title: "High Availability",
            slug: "high-availability",
            description: "Learn high availability with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `High availability is about reducing the effect of individual failures through redundancy and appropriate architecture. At the workload level, controllers can recreate failed pods. At the node level, workloads need enough alternative capacity and networking must continue routing clients toward healthy instances. Persistent data requires an explicit storage design because recreating a pod does not automatically recreate its durable state.

The control plane also matters. If a critical control-plane component is a single point of failure, the cluster may lose management capability even when application nodes remain healthy. The source therefore emphasizes replication of control-plane components and redundant etcd state for highly available environments.

A useful design question is: 'If this component disappears, can the system continue operating acceptably?' The answer should consider both immediate service availability and the ability to recover or make further changes.

### Deeper understanding

High availability is about reducing the effect of failures rather than pretending failures will never occur. Kubernetes can help replace failed Pods, but availability still depends on capacity, networking, storage, and control-plane architecture.

Pod redundancy protects against individual workload-instance failure. Multiple nodes provide a path to continue running workloads when one node becomes unavailable. Control-plane redundancy reduces the risk that a single control-plane component becomes a complete management outage.

Persistent state requires special attention. Recreating a Pod is not equivalent to recovering its data. Storage must be designed so that the required state remains available when workload instances change.

### Single-point-of-failure thinking

For every critical component, ask:

“If this component disappears right now, what continues to work?”

Then identify the dependency that determines the answer. This reveals architectural weaknesses more effectively than simply counting replicas.

### Practical learning check

Evaluate availability at several layers: application Pods, worker nodes, Services/networking, storage, and control plane. A system is only as resilient as its critical dependency chain.` },
              { title: "Example", content: `An application runs replicas across multiple nodes. One node fails. The Deployment can recreate affected pods on nodes with available capacity, while the Service continues directing traffic to healthy endpoints. Persistent data is provided through storage designed to survive workload movement.` },
              { title: "Practical use", content: `For every important component, identify its failure domain and recovery mechanism. Practice spreading workloads across nodes, maintaining more than one replica where appropriate, and checking that storage, networking, and control-plane design do not reintroduce a single point of failure.` },
            ],
          },
          {
            title: "Security",
            slug: "security",
            description: "Learn security with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Kubernetes security is broader than protecting one password. It includes restricting access to nodes and the API, limiting privileges, controlling workload capabilities, separating traffic, protecting sensitive configuration, and preventing uncontrolled resource consumption.

Least privilege is a central principle: a person or workload should receive only the permissions needed for its job. A read-only operator should not automatically be able to modify production resources. A backend that only needs internal access should not automatically be exposed externally. Security contexts can help constrain workload privileges, while quotas can limit resource consumption.

Secrets separate sensitive values from ordinary configuration, but a Secret does not make a credential magically safe. Authorization, cluster-state protection, identity management, and secure operational practices remain necessary. Network separation should also reflect application architecture: an external frontend path generally should not provide direct access to a private database workload.

### Deeper understanding

Kubernetes security is a collection of controls rather than one switch. The source emphasizes restricting node access, controlling container privileges, using security contexts, applying quotas, limiting permissions, and separating unrelated traffic.

Least privilege is the central reasoning principle. A user should receive only the permissions required for their work, and a workload should receive only the access required for its function.

Secrets require the same careful treatment. Moving a credential from source code into a Secret improves separation, but it does not automatically make the credential safe. Access to the Secret and protection of cluster state remain important.

Network separation also reduces blast radius. An externally reachable frontend does not imply that the database should be directly reachable from outside.

### Practical learning check

For each workload, identify who can access it, what permissions it has, what sensitive data it can read, and which network paths can reach it. Security becomes easier to reason about when those boundaries are explicit.` },
              { title: "Example", content: `A reporting service only needs to read data from an internal database and does not need external inbound access. Its permissions and network exposure should be limited accordingly. A support operator who only needs to inspect pods should receive read-oriented access rather than unrestricted administrative privileges.` },
              { title: "Practical use", content: `Create a security checklist for each workload: who can access it, what permissions it needs, whether it needs external exposure, which values are sensitive, and what resources it may consume. Use intentionally non-sensitive training credentials while practicing.` },
            ],
          },
          {
            title: "Scaling and Networking",
            slug: "scaling-and-networking",
            description: "Learn scaling and networking with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Scaling can happen at the application level or cluster level. Application scaling increases workload replicas when demand grows. Cluster scaling adds nodes when existing capacity is insufficient. These are related but distinct: adding replicas does not help if there is nowhere to schedule them, while adding nodes does not automatically increase the number of application instances.

The source discusses automation approaches and Cluster Autoscaler in supported cloud environments. Larger clusters also require robust networking because clients should interact with stable Service endpoints rather than track individual pod addresses. As environments become geographically distributed, traffic routing, storage, failure behavior, and operations become more complex.

A useful mental model is client -> Service -> pods for application networking and replicas -> available node capacity for application scaling. Capacity planning must therefore consider CPU, memory, storage, network throughput, scheduling constraints, and failure headroom rather than replica count alone.

### Deeper understanding

Scaling occurs at two related levels. Application scaling increases the number of workload replicas. Cluster scaling increases the compute capacity available to place those workloads.

Increasing replicas is useful only when additional instances can actually receive traffic and when the underlying dependency chain can handle the extra load. For example, adding ten API replicas will not necessarily improve performance if every replica waits on an overloaded database.

Services provide a stable networking abstraction so clients do not track individual Pod addresses. As clusters grow, networking must support changing endpoints, traffic distribution, and failure handling.

The source also discusses automation and cluster autoscaling concepts. The deeper lesson is that manual capacity management becomes increasingly difficult as the number of workloads and nodes grows.

### Practical learning check

When an application is slow, do not immediately add replicas. Determine whether the bottleneck is CPU, memory, network, storage, downstream services, or database capacity. Scale the constrained layer rather than blindly scaling the frontend.` },
              { title: "Example", content: `An API increases from two to five replicas because request volume grows. If the existing nodes lack capacity, additional nodes are needed. The Service continues to provide a stable endpoint while the number of backend pods changes.` },
              { title: "Practical use", content: `Practice scaling a Deployment up and down and inspect how pod placement changes. Then simulate insufficient node capacity in a learning environment and observe scheduling behavior. Treat networking and capacity as one system: stable endpoints are useful only when healthy workload capacity exists behind them.` },
            ],
          },
          {
            title: "DIY vs Managed Kubernetes",
            slug: "diy-vs-managed-kubernetes",
            description: "Learn diy vs managed kubernetes with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `A self-managed Kubernetes cluster transfers substantial operational responsibility to the organization. The source lists installation, node configuration, high availability, networking, storage, security, monitoring, scaling, and maintenance as areas that may need to be owned directly. Historical installation tools mentioned by the source should be treated as source-aligned references rather than assumptions about today's preferred tooling.

Managed Kubernetes reduces some of this operational burden by providing platform capabilities for cluster creation, monitoring, sizing, endpoints, and node maintenance. It does not remove the need to understand Kubernetes concepts or to design workloads correctly; it changes which organization is responsible for parts of the platform.

The key decision is not simply whether a team can install Kubernetes. It is whether the team wants to operate the complete platform required to keep Kubernetes reliable, secure, observable, and available over time.

### Deeper understanding

Running Kubernetes yourself means taking responsibility for much more than installing the Kubernetes binaries. A self-managed environment may require ownership of nodes, networking, storage, security, monitoring, scaling, upgrades, high availability, and ongoing maintenance.

Managed Kubernetes changes the operational boundary. The provider takes responsibility for portions of the platform, allowing the organization to concentrate more heavily on workloads and application operations.

The correct decision therefore depends on operational requirements, expertise, compliance needs, cost, customization, and the amount of platform maintenance the organization is prepared to own.

### Decision framework

Instead of asking “Can we run Kubernetes ourselves?”, ask:

- Who will operate the control plane?
- Who handles upgrades?
- Who handles node failures?
- Who manages networking and storage?
- Who responds to security issues?
- What level of customization is actually required?

The answers reveal the true operational cost.

### Practical learning check

Compare two architectures by listing every responsibility. The option with the lower infrastructure price is not automatically cheaper if it creates substantial engineering and operational work.` },
              { title: "Example", content: `A small engineering team needs Kubernetes for a customer-facing service. With a self-managed cluster, the team must maintain control-plane availability, node configuration, upgrades, networking, storage, and monitoring. A managed service can reduce those platform responsibilities, allowing the team to focus more on workloads and application operations.` },
              { title: "Practical use", content: `Create a responsibility matrix for a hypothetical deployment. List installation, upgrades, control plane, nodes, networking, storage, security, monitoring, and scaling, then mark which responsibilities belong to the platform provider and which remain with the application team.` },
            ],
          },
        ],
      },
      {
        title: "Troubleshooting",
        slug: "troubleshooting",
        description: "Understand the concepts and operational relationships in this module.",
        topics: [
          {
            title: "Troubleshooting Kubernetes",
            slug: "troubleshooting-kubernetes",
            description: "Learn troubleshooting kubernetes with detailed concepts, examples, and practical usage.",
            estimatedMinutes: 35,
            sections: [
              { title: "Detailed explanation", content: `Kubernetes troubleshooting works best as a narrowing process rather than random command execution. Start with the observed symptom, inspect the relevant resource, examine events and logs, verify relationships, and only then change configuration.

For a pod that is not running, inspect the pod status, describe the pod, review events, and inspect logs when a container has started enough to produce them. For a Service that is unreachable, inspect the Service, selector, target port, and endpoints, then compare the selector with pod labels. For database connection failures, inspect the database workload, Service, endpoints, Secret references, application configuration, DNS/service resolution, and database logs.

Data loss requires a storage-oriented investigation: determine whether data lived only in an ephemeral filesystem, whether a volume was mounted, whether the PVC was bound, and whether the backend storage survived workload replacement. Replica shortages require comparing desired and available replicas, followed by inspection of pods, nodes, and events. Context mistakes require checking the active kubectl context.

### Deeper understanding

Kubernetes troubleshooting is most effective when performed from observable state toward the failing dependency. Randomly restarting resources can hide the underlying cause and make diagnosis harder.

For an unhealthy Pod, begin with its status, then inspect events and logs. For a Service problem, verify the Service selector, Pod labels, ports, target ports, and endpoints. For a database connection problem, follow the dependency chain from the database workload through its Service and configuration to DNS and application logs.

The same reasoning applies to missing data. Determine whether the application used ephemeral container storage, whether a Volume was mounted, whether the PVC was bound, and whether the underlying storage backend provides the expected durability.

### Practical learning sequence

Use this pattern:

1. Identify the symptom.
2. Inspect the relevant resource.
3. Check events and status.
4. Verify labels/selectors and dependencies.
5. Inspect logs.
6. Check configuration and credentials.
7. Test networking/DNS.
8. Change one thing at a time.
9. Verify the result.

### Practical learning check

A good troubleshooting session should produce a causal explanation, not merely a recovered service. The goal is to understand why the failure happened so that the same class of failure can be prevented or detected earlier.` },
              { title: "Example", content: `A frontend cannot reach its backend. \`kubectl get services\` shows the backend Service exists, but its endpoints are empty. Inspecting the Service selector reveals \`app=back-end\`, while the pods are labeled \`app=backend\`. Correcting the selector restores the endpoint mapping.` },
              { title: "Practical use", content: `Build a troubleshooting decision tree and use it repeatedly. Start broad with \`get\`, narrow with \`describe\`, inspect logs, verify selectors/endpoints/configuration, and confirm the cluster context. Deliberately break a selector or configuration in a learning cluster and recover it using evidence rather than guessing.` },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: categorySeed.slug },
    update: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
    create: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
  });

  let topicCount = 0;
  let sectionCount = 0;

  for (const pathSeed of paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_level: { categoryId: category.id, level: pathSeed.level } },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        isPublished: true,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
      },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
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

      for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex++) {
        const topicSeed = moduleSeed.topics[topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
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

        for (let sectionIndex = 0; sectionIndex < topicSeed.sections.length; sectionIndex++) {
          const section = topicSeed.sections[sectionIndex];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: { title: section.title, content: section.content, sortOrder: sectionIndex },
            create: {
              id: `${topic.id}-section-${sectionIndex}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
          });
          sectionCount++;
        }
        topicCount++;
      }
    }
  }

  console.log(`Kubernetes seed complete: ${topicCount} topics, ${sectionCount} sections.`);
}

main()
  .catch((error) => {
    console.error("Kubernetes seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
