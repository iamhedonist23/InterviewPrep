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
    description: "Progress from Kubernetes fundamentals to workload operations, networking, storage, and production-oriented practices.",
    level: StudyLevel.BEGINNER,
    modules: [
      {
        title: "Kubernetes Foundations",
        slug: "kubernetes-foundations",
        description: "Build the core Kubernetes model: orchestration, cluster components, Pods, labels, and selectors.",
        topics: [
          {
            title: "Kubernetes Purpose and Orchestration",
            slug: "kubernetes-purpose-orchestration",
            description: "Understand Kubernetes as a declarative orchestration and reconciliation platform, including desired state, controllers, scheduling, self-healing, and workload lifecycle.",
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
            
              { title: "Interview focus", content: `Explain Kubernetes as a declarative reconciliation system, not merely a container launcher. Be ready to distinguish desired state, observed state, controllers, scheduling, and node execution, and explain what happens when a replica disappears.` },
              { title: "Common pitfalls", content: `Do not describe Kubernetes as guaranteeing application availability by itself. Controllers can recreate Pods, but capacity, storage, networking, application dependencies, and health signals still determine whether the service actually recovers. Avoid treating Pod identity as durable.` },
              { title: "Deep mental model", content: `Think of Kubernetes as a feedback controller. A resource expresses intent; the API stores that intent; controllers observe the cluster; the scheduler handles placement for unscheduled Pods; kubelet and the runtime realize workloads on nodes. The loop repeats because the world can change after every successful action.` },
              { title: "When to use / avoid", content: `Kubernetes is useful when you need repeatable workload scheduling, service discovery, rollout mechanisms, self-healing behavior, or a common operational API across many workloads. It can be excessive for a single small service where a simpler deployment model provides enough reliability with less platform overhead.` },
              { title: "Production scenario", content: `A payment API is declared with six replicas and a controlled rollout policy. One node fails during a release. Kubernetes can reschedule affected Pods where capacity permits while the Service continues targeting healthy endpoints. The application team still needs tested probes, adequate capacity, resilient dependencies, and observability.` },
              { title: "Related concepts", content: `Connect orchestration with Pods, Deployments, ReplicaSets, Services, scheduling, probes, resource requests, persistent storage, and controllers. The most useful relationship is Deployment desired replicas -> ReplicaSet -> Pods -> Service endpoints.` },
              { title: "Hands-on lab", content: `Create a Deployment with three replicas, delete one Pod, and watch the replacement appear. Then scale to five replicas and inspect the Deployment, ReplicaSet, and Pod objects. Write down which component owns each transition rather than treating kubectl as the mechanism itself.` },],
          },
          {
            title: "Cluster Architecture",
            slug: "cluster-architecture",
            description: "Learn how the Kubernetes API server, scheduler, controllers, etcd, kubelet, and container runtime cooperate to manage cluster state and workloads.",
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
            
              { title: "Interview focus", content: `Know the responsibility boundaries of API server, scheduler, controllers, etcd, kubelet, and container runtime. A strong answer explains the request flow and distinguishes control-plane state from workload execution.` },
              { title: "Common pitfalls", content: `Do not say the scheduler runs every Pod or that kubelet chooses cluster-wide placement. Do not treat etcd as a general application database. Avoid assuming kube-proxy is the only possible implementation of Service traffic behavior.` },
              { title: "Deep mental model", content: `Separate decision-making from execution. The API server is the cluster's API front door, etcd persists cluster state, controllers reconcile resources, the scheduler selects nodes for unscheduled Pods, and node agents execute the resulting workload. This separation allows components to fail or scale independently within the architecture.` },
              { title: "When to use / avoid", content: `Use this architecture model whenever diagnosing a cluster problem. It is also the foundation for HA design and capacity planning. Do not memorize component names without mapping them to observable symptoms; architecture knowledge is most valuable when it narrows a failure domain.` },
              { title: "Production scenario", content: `A Pod remains Pending while existing nodes appear healthy. Instead of restarting the application, inspect scheduler-related events and placement constraints such as resource requests, affinity, taints, or available capacity. The issue is likely in scheduling eligibility rather than container startup.` },
              { title: "Related concepts", content: `Relate architecture to the Kubernetes API, admission, authentication/authorization, controllers, scheduling, node lifecycle, etcd durability, Service networking, and cluster upgrades. These relationships explain why a control-plane outage can differ from an application outage.` },
              { title: "Hands-on lab", content: `Create a Deployment and trace it from API submission through scheduling to node execution. Use describe/events to identify placement decisions. Then deliberately create an impossible scheduling constraint and observe the Pending state before removing the constraint.` },],
          },
          {
            title: "Pods",
            slug: "pods",
            description: "Understand Pods as Kubernetes' smallest deployable unit, including shared networking, lifecycle, multi-container patterns, and why Pod identity is ephemeral.",
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
            
              { title: "Interview focus", content: `Explain why a Pod is the smallest deployable unit, why containers in one Pod share network identity, and why Pods are ephemeral. Be prepared to justify sidecar-style co-location versus separate workloads.` },
              { title: "Common pitfalls", content: `Never use a Pod IP as a durable service endpoint. Do not put independently scalable applications into one Pod simply because they communicate. Also distinguish Pod restart from Pod replacement: a container restart can preserve Pod identity, while a replacement Pod is a new object.` },
              { title: "Deep mental model", content: `A Pod is a co-scheduling and shared-runtime boundary around one or more containers. The boundary determines shared networking and other Pod-scoped resources. Kubernetes can replace that boundary at any time, so application durability must live above or outside the Pod.` },
              { title: "When to use / avoid", content: `Use multiple containers in one Pod when processes are tightly coupled and need shared lifecycle or local communication, such as a carefully designed sidecar. Prefer separate Pods when components need independent deployment, scaling, ownership, or failure isolation.` },
              { title: "Production scenario", content: `An API Pod contains the main process and a tightly coupled proxy sidecar. They share the Pod network and lifecycle. The API is exposed through a Service, and persistent customer data is stored outside the Pod filesystem. Replacing the Pod therefore does not change the logical endpoint or destroy durable data.` },
              { title: "Related concepts", content: `Connect Pods to Deployments, ReplicaSets, Services, init containers, sidecars, probes, resource accounting, volumes, and security contexts. A Deployment manages Pod replacement; a Service abstracts Pod identity; a volume can provide Pod-attached storage.` },
              { title: "Hands-on lab", content: `Run one Pod with two containers and verify that the containers can reach each other through localhost. Delete the Pod and observe the identity change. Then repeat the exercise behind a Deployment and compare raw Pod lifecycle with controller-managed lifecycle.` },],
          },
          {
            title: "Labels and Selectors",
            slug: "labels-and-selectors",
            description: "Learn how labels and selectors connect Kubernetes resources for service discovery, controller ownership, filtering, and safe workload organization.",
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
            
              { title: "Interview focus", content: `Explain labels as metadata and selectors as matching rules. Be ready to diagnose a Service with zero endpoints or a controller managing an unexpected Pod set by comparing selector requirements with actual labels.` },
              { title: "Common pitfalls", content: `Avoid overlapping selectors for controllers that should own different Pods. Do not assume a label is unique. A broad selector can unintentionally match multiple workloads, while a narrow selector can silently produce an empty target set.` },
              { title: "Deep mental model", content: `Labels create a lightweight relational model inside the cluster: resources carry attributes, and selectors query those attributes. Services and controllers can therefore depend on logical identity such as app=payments instead of individual generated names.` },
              { title: "When to use / avoid", content: `Use labels for stable operational grouping, ownership, environment, release, and application identity. Do not encode rapidly changing state as a label merely for convenience, and avoid designing selectors around labels whose semantics are not stable.` },
              { title: "Production scenario", content: `A rollout introduces version=blue and version=green Pods. The application Service intentionally selects only app=checkout, while a test Service selects app=checkout and version=green. This allows traffic targeting to be changed by labels rather than hard-coded Pod addresses.` },
              { title: "Related concepts", content: `Labels connect directly to Services, Deployments, ReplicaSets, scheduling rules, kubectl filtering, and observability. Selector semantics also matter for rollout safety because an ownership relationship can depend on matching labels.` },
              { title: "Hands-on lab", content: `Create Pods with app and environment labels. Query each group, create a Service with a selector, and inspect its endpoints. Change one label and observe the endpoint set. This makes selector matching concrete rather than purely declarative.` },],
          },
        ],
      },
      {
        title: "Workloads and Services",
        slug: "workloads-and-services",
        description: "Learn workload controllers and stable networking through Deployments, ReplicaSets, Services, and service discovery.",
        topics: [
          {
            title: "Deployments, Replica Sets, and Controllers",
            slug: "deployments-replica-sets-controllers",
            description: "Understand controller reconciliation, ReplicaSets, Deployments, rollout behavior, revision history, scaling, and controlled application updates.",
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
            
              { title: "Interview focus", content: `Distinguish controller reconciliation, ReplicaSet replica maintenance, and Deployment rollout management. Know that Deployments normally create and manage ReplicaSets rather than directly treating individual Pods as the revision history.` },
              { title: "Common pitfalls", content: `Do not manually edit ReplicaSets as the normal application deployment mechanism. Avoid assuming a Deployment rollback is equivalent to restoring arbitrary external state such as database schema or user data.` },
              { title: "Deep mental model", content: `Controllers form nested feedback loops. A Deployment expresses application revision and replica intent; ReplicaSets maintain matching Pods for a revision; lower-level node mechanisms run containers. Each layer has a narrower responsibility while the system continuously converges toward desired state.` },
              { title: "When to use / avoid", content: `Use Deployments for long-running, usually stateless workloads where replicas are interchangeable. Do not use a Deployment as the default answer for workloads requiring stable identities and ordered storage semantics; those requirements point toward StatefulSet-style designs.` },
              { title: "Production scenario", content: `A three-replica API is upgraded from release A to B. The Deployment creates the new revision's ReplicaSet and replaces old Pods according to rollout settings. Readiness failures can prevent unhealthy instances from receiving traffic, while rollback can restore a prior workload revision.` },
              { title: "Related concepts", content: `Relate Deployments to ReplicaSets, Pods, rollout strategy, revision history, readiness probes, Services, StatefulSets, Jobs, and GitOps. Rollout correctness depends on both controller behavior and application compatibility.` },
              { title: "Hands-on lab", content: `Deploy three replicas, update the image to a deliberately failing version, inspect rollout status and events, then restore the previous revision. Observe the Deployment and ReplicaSet objects at each stage.` },],
          },
          {
            title: "Services and Service Discovery",
            slug: "services-and-service-discovery",
            description: "Learn how Kubernetes Services provide stable application endpoints over changing Pods, including selectors, discovery, ports, and exposure types.",
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
            
              { title: "Interview focus", content: `Explain why Services exist, how selectors identify backends, and the difference among ClusterIP, NodePort, and LoadBalancer exposure. Be able to troubleshoot a Service with no endpoints.` },
              { title: "Common pitfalls", content: `Do not equate a Service with a load balancer in every environment. A Service can exist with zero ready backends. Also distinguish Service port from targetPort and avoid assuming every external environment provisions a cloud load balancer automatically.` },
              { title: "Deep mental model", content: `A Service is a stable logical destination over a changing set of Pods. The client depends on the Service identity; Kubernetes maintains the mapping toward eligible backends. This decouples application clients from Pod churn.` },
              { title: "When to use / avoid", content: `Use ClusterIP for internal service-to-service communication, and choose NodePort or LoadBalancer when external exposure is actually required. Avoid exposing internal databases simply because an external Service type is available.` },
              { title: "Production scenario", content: `A frontend calls orders-api through a stable DNS name. During a rolling deployment, backend Pods are replaced and the endpoint set changes. The frontend remains unchanged because its dependency is the Service rather than individual Pod addresses.` },
              { title: "Related concepts", content: `Services connect to selectors, EndpointSlices, DNS, ports, readiness, Ingress or Gateway-style HTTP exposure, and network policy. Troubleshooting should move from Service definition to selector to endpoints to backend health.` },
              { title: "Hands-on lab", content: `Create a Deployment and ClusterIP Service, inspect its EndpointSlices, and query it from another Pod. Break the selector intentionally, observe the missing backends, then repair it and verify traffic recovery.` },],
          },
        ],
      },
      {
        title: "Storage and Configuration",
        slug: "storage-and-configuration",
        description: "Understand persistent storage and runtime configuration with volumes, PVs, PVCs, Secrets, and ConfigMaps.",
        topics: [
          {
            title: "Storage: Volumes, Persistent Volumes and Claims",
            slug: "storage-volumes-pvs-pvcs",
            description: "Understand Kubernetes storage from Pod volumes through PersistentVolumes and PersistentVolumeClaims, including lifecycle, access modes, and durability boundaries.",
            estimatedMinutes: 30,
            sections: [
              { title: "Detailed explanation", content: `Container filesystems are not a reliable place for durable application data. When a container or pod is replaced, data stored only inside that ephemeral filesystem may disappear. Kubernetes therefore provides volume mechanisms and persistent-storage abstractions for workloads that need data to survive workload replacement.

A volume is associated with a pod and can be shared by containers in that pod. A PersistentVolume (PV) represents storage as a cluster resource with a lifecycle independent of one particular pod. A PersistentVolumeClaim (PVC) is an application's request for storage, including requirements such as capacity and access mode. The conceptual relationship is application -> PVC -> PV -> storage backend.

Access modes such as ReadWriteOnce, ReadOnlyMany, and ReadWriteMany describe how storage may be mounted, but the actual capabilities depend on the storage backend. A PVC can remain unbound if suitable storage is not available. Host-path storage is useful for learning mechanics but couples the workload to a node and should not automatically be considered a production design.` },
              { title: "Example", content: `A document service creates signed reports. If it writes them only to the container filesystem, replacing the workload can lose them. Instead, the pod mounts a PVC. The PVC binds to suitable persistent storage, allowing the application's data lifecycle to be separated from the pod lifecycle.` },
              { title: "Practical use", content: `Practice creating a PV and PVC in a local learning cluster, mounting the claim into a workload, writing a file, replacing the workload, and checking whether the file remains. Use this exercise to distinguish pod-local storage from persistent storage rather than memorizing the abbreviations alone.` },
            
              { title: "Interview focus", content: `Differentiate Pod volumes, PersistentVolumes, PersistentVolumeClaims, and the storage backend. Explain why a PVC is an application request rather than the physical disk itself.` },
              { title: "Common pitfalls", content: `Do not assume every access mode is supported by every storage implementation. Do not equate PVC binding with backup or disaster recovery. Avoid treating hostPath as a portable production storage design.` },
              { title: "Deep mental model", content: `Separate compute lifecycle from data lifecycle. Pods are replaceable compute units; a PVC expresses an application's storage requirement; a PV represents provisioned storage; the backend determines actual durability and failure behavior.` },
              { title: "When to use / avoid", content: `Use PVC-backed storage when workload data must outlive a Pod. Avoid persistent volumes for data that can safely be reconstructed, and avoid choosing a storage design without understanding latency, availability, access mode, backup, and recovery requirements.` },
              { title: "Production scenario", content: `A reporting worker writes generated files to a PVC. The worker Pod is replaced during a node event, but the storage relationship remains available according to the backend's guarantees. Backup and restore are handled separately rather than assuming the PVC itself is a backup.` },
              { title: "Related concepts", content: `Connect storage to StorageClasses, dynamic provisioning, access modes, reclaim policy, StatefulSets, snapshots, backups, and disaster recovery. Storage architecture should be evaluated independently from Pod restart behavior.` },
              { title: "Hands-on lab", content: `Create a PVC, mount it into a workload, write a marker file, replace the workload, and verify persistence. Then inspect the PVC/PV relationship and document what the exercise does not prove about production durability.` },],
          },
          {
            title: "Secrets and ConfigMaps",
            slug: "secrets-and-configmaps",
            description: "Learn how ConfigMaps and Secrets separate runtime configuration from container images, including injection methods, security limits, and operational practices.",
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
            
              { title: "Interview focus", content: `Explain the difference between ConfigMap and Secret, how each reaches a Pod, and why Base64 is encoding rather than encryption. Know that Secret security also depends on RBAC and protection of cluster state.` },
              { title: "Common pitfalls", content: `Never commit real credentials into manifests or source control merely because the value is Base64 encoded. Do not assume a Secret automatically solves credential exposure, and remember that changing configuration does not necessarily restart an application.` },
              { title: "Deep mental model", content: `Treat configuration as an external dependency of the workload: image + non-sensitive configuration + sensitive configuration -> process. This separates deployment artifacts from environment-specific values and reduces credential leakage into images.` },
              { title: "When to use / avoid", content: `Use ConfigMaps for non-sensitive configuration and Secrets for confidential values. For high-security production systems, consider encryption at rest, least-privilege RBAC, rotation, and external secret-management integrations rather than relying on the Secret object alone.` },
              { title: "Production scenario", content: `A service receives a database username from ordinary configuration and a password from a Secret. The workload identity is restricted to the minimum Secret access required. The platform team also protects etcd and monitors access to sensitive resources.` },
              { title: "Related concepts", content: `Connect ConfigMaps and Secrets to environment variables, mounted volumes, RBAC, ServiceAccounts, encryption at rest, secret rotation, image security, and external secret stores.` },
              { title: "Hands-on lab", content: `Create a non-sensitive ConfigMap and training-only Secret, inject both into a Pod, update the configuration, and observe how the application sees each value. Never use real credentials in the lab.` },],
          },
        ],
      },
    ],
  },
  {
    name: "Intermediate",
    slug: "intermediate",
    description: "Apply Kubernetes concepts through operational workflows, troubleshooting, and production-focused architecture.",
    level: StudyLevel.INTERMEDIATE,
    modules: [
      {
        title: "Workload Types and Local Workflow",
        slug: "workload-types-and-local-workflow",
        description: "Choose the right workload object and practice declarative management, local clusters, and kubectl operations.",
        topics: [
          {
            title: "Jobs, DaemonSets, Namespaces and Quotas",
            slug: "jobs-daemonsets-namespaces-quotas",
            description: "Learn how Jobs, DaemonSets, Namespaces, and ResourceQuotas solve finite work, node-local workloads, resource organization, and shared-cluster governance.",
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
            
              { title: "Interview focus", content: `Choose the right object from workload semantics: Deployment for long-running interchangeable replicas, Job for finite work, DaemonSet for node-oriented Pods, Namespace for resource scope, and ResourceQuota for namespace-level governance.` },
              { title: "Common pitfalls", content: `Do not use a DaemonSet simply because you want many replicas; its placement intent is node-oriented. Do not treat namespaces as complete security isolation, and do not assume quotas alone protect every shared resource.` },
              { title: "Deep mental model", content: `These objects answer different questions rather than competing with one another. Workload controllers describe lifecycle and placement; namespaces provide logical scope; quotas constrain consumption inside that scope.` },
              { title: "When to use / avoid", content: `Use Jobs for bounded batch work and DaemonSets for node-local agents. Use namespaces when organizational or policy boundaries justify them, and quotas when shared-cluster fairness or governance is required. Avoid creating namespaces solely for visual organization when no boundary is needed.` },
              { title: "Production scenario", content: `A cluster runs a log collector on every eligible node, nightly data-processing Jobs, and separate team namespaces with resource quotas. The design separates node-local operations, finite work, and multi-team governance.` },
              { title: "Related concepts", content: `Relate these objects to CronJobs, Deployments, StatefulSets, RBAC, LimitRanges, requests/limits, scheduling, taints, and multi-tenancy. The right workload object follows from lifecycle and placement semantics.` },
              { title: "Hands-on lab", content: `Create a Job and observe completion, then create a DaemonSet and compare its Pod count with eligible nodes. Create two namespaces and apply a quota to one, then test what resource creation is allowed.` },],
          },
          {
            title: "Imperative vs Declarative Orchestration",
            slug: "imperative-vs-declarative-orchestration",
            description: "Compare imperative commands with declarative desired-state management and understand why declarative workflows improve repeatability, reviewability, and reconciliation.",
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
            
              { title: "Interview focus", content: `Contrast commands that request actions with manifests that describe desired state. Explain why declarative configuration supports review, version control, repeatability, and reconciliation while imperative commands remain valuable for inspection and one-off operations.` },
              { title: "Common pitfalls", content: `Do not claim imperative commands are inherently bad or declarative manifests are automatically safe. A declarative file can still contain dangerous permissions, selectors, resource settings, or exposure choices.` },
              { title: "Deep mental model", content: `Imperative automation records a procedure; declarative configuration records the target condition. Kubernetes can repeatedly reconcile the target condition after failures, making intent durable beyond the operator's terminal session.` },
              { title: "When to use / avoid", content: `Use declarative manifests for durable workload configuration and GitOps-style workflows. Use imperative commands for exploration, diagnostics, emergency inspection, and tightly controlled operational actions where a full manifest would add unnecessary friction.` },
              { title: "Production scenario", content: `A team reviews a Deployment manifest in version control before promotion. The same desired configuration is applied to staging and production with environment-specific values managed separately. Operators still use kubectl for diagnostics and temporary investigation.` },
              { title: "Related concepts", content: `Connect declarative management to GitOps, reconciliation, idempotence, manifests, Kustomize/Helm-style templating, admission controls, and drift detection.` },
              { title: "Hands-on lab", content: `Create a workload imperatively, export or recreate its intended configuration declaratively, then modify the manifest and apply it repeatedly. Compare what is captured in version control with what existed only as terminal history.` },],
          },
          {
            title: "Getting Started with Minikube",
            slug: "getting-started-with-minikube",
            description: "Learn a practical local Kubernetes workflow with Minikube: cluster creation, verification, deployment, service exposure, inspection, troubleshooting, and cleanup.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `Minikube provides a local Kubernetes environment for learning and experimentation. It lets you practice the Kubernetes API, Pods, Deployments, Services, configuration, storage, and troubleshooting without operating a production-sized cluster.

The exact driver, networking behavior, and installation commands can vary by operating system and Minikube release. The durable lesson is the workflow: create the local cluster, verify API connectivity, deploy a workload, expose it when required, inspect resources and events, troubleshoot failures, and clean up.

A local cluster is a laboratory, not proof of production readiness. Multi-node failure domains, managed control planes, cloud load balancers, production storage, identity integration, and operational scale can behave differently in real environments.` },
              { title: "Example", content: `Start a local Minikube cluster, deploy a small hello application with a Deployment, expose it through a simple Service, and inspect the resulting Pods, Deployment, and Service. The exercise teaches the chain Deployment -> Pod -> Service -> client rather than the application itself.` },
              { title: "Practical use", content: `Use Minikube as a controlled laboratory for learning Kubernetes objects and failure behavior. Keep the cluster separate from production environments and remember that the exact driver and installation commands can vary with the current Minikube release.` },
            
              { title: "Interview focus", content: `Explain Minikube as a local learning environment rather than a production-cluster substitute. Focus on the lifecycle: start, verify API access, deploy, expose, inspect, troubleshoot, and delete.` },
              { title: "Common pitfalls", content: `Do not assume every Minikube driver, networking behavior, or command is identical across operating systems and releases. Avoid teaching historical flags as timeless Kubernetes concepts.` },
              { title: "Deep mental model", content: `Minikube provides a laboratory in which the same Kubernetes API objects can be explored locally. The important learning outcome is the relationship among resources, not the local virtualization mechanism.` },
              { title: "When to use / avoid", content: `Use Minikube for hands-on learning, demos, and reproducible local experiments. Do not use it as evidence that a production architecture has solved multi-node failure domains, managed networking, persistent storage, or control-plane availability.` },
              { title: "Production scenario", content: `An engineer reproduces a selector bug locally with Minikube, verifies the fix against a small test workload, and then promotes the manifest through a proper deployment process. The local cluster is used for learning and validation, not as a production substitute.` },
              { title: "Related concepts", content: `Connect Minikube to kubectl contexts, local images, Services, Deployments, volumes, DNS, and cluster lifecycle. The same Kubernetes object model can be practiced without reproducing every production dependency.` },
              { title: "Hands-on lab", content: `Start Minikube, verify nodes and API access, deploy a small application, expose it, inspect Pods and Services, break a selector, troubleshoot it, and delete the cluster. Record which behaviors are local-environment-specific.` },],
          },
          {
            title: "kubectl Command Line Workflow",
            slug: "kubectl-command-line-workflow",
            description: "Build a safe kubectl workflow for contexts, resource inspection, events, logs, troubleshooting, controlled changes, and multi-cluster operations.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `kubectl is a command-line client for interacting with the Kubernetes API. It can inspect resources, read events and logs, execute supported commands in containers, manage contexts, and perform controlled resource changes.

A safe workflow starts by verifying the active context and namespace. Then inspect the relevant resource with get, use describe and events to understand state transitions, inspect logs when application output exists, and verify dependencies such as labels, selectors, endpoints, configuration, and storage.

The important skill is not memorizing every kubectl flag. It is building an evidence chain before changing a production resource. A syntactically valid command can still be dangerous when it targets the wrong cluster.` },
              { title: "Example", content: `When a Service is not reachable, begin with \`kubectl get service\`, then \`kubectl describe service\`, inspect the target pods and labels, and check endpoints. If a pod is failing, use \`kubectl describe pod\` and \`kubectl logs\` before changing the workload blindly.` },
              { title: "Practical use", content: `Develop a fixed troubleshooting sequence: inspect with \`get\`, investigate with \`describe\`, read application output with \`logs\`, enter the container only when necessary, and verify the context before changes. This turns kubectl from a list of commands into an operational method.` },
            
              { title: "Interview focus", content: `Describe a safe troubleshooting sequence using context, namespace, get, describe, events, logs, endpoints, and configuration inspection. Emphasize that kubectl is an API client rather than the control plane itself.` },
              { title: "Common pitfalls", content: `Do not run destructive commands before checking context. Avoid changing several resources at once while diagnosing a problem because you lose causal evidence. Do not assume an empty log means the workload is healthy.` },
              { title: "Deep mental model", content: `kubectl is an observation and control interface over the Kubernetes API. A good operator uses it to build an evidence chain: what resource exists, what state does it report, what events explain the transition, and which dependency is inconsistent?` },
              { title: "When to use / avoid", content: `Use kubectl for inspection, diagnostics, controlled changes, and learning. For durable production intent, prefer versioned configuration and an established deployment workflow instead of relying on terminal history.` },
              { title: "Production scenario", content: `An API is failing after a release. The operator verifies the production context, checks rollout status, inspects Pods and events, reads current and previous container logs, verifies Service endpoints, and only then changes the deployment. Each step preserves evidence.` },
              { title: "Related concepts", content: `Connect kubectl to contexts, namespaces, API resources, events, logs, exec, rollout commands, JSONPath/output formats, and declarative apply workflows.` },
              { title: "Hands-on lab", content: `Take a deliberately broken Service and troubleshoot it without restarting anything. Use get -> describe -> labels/selectors -> EndpointSlices -> logs, document the evidence at each step, and fix only the root cause.` },],
          },
        ],
      },
      {
        title: "Operations and Deployment",
        slug: "operations-and-deployment",
        description: "Develop practical operational skills around logging, monitoring, and safe multi-cluster kubectl usage.",
        topics: [
          {
            title: "Logging",
            slug: "logging",
            description: "Understand Kubernetes application logging, stdout and stderr, previous-container logs, centralized collection, retention, and correlation with metrics and events.",
            estimatedMinutes: 25,
            sections: [
              { title: "Detailed explanation", content: `Kubernetes applications commonly write logs to stdout and stderr, which can be inspected through kubectl logs. When a Pod contains multiple containers, the correct container must be selected. Previous-container logs can help investigate a process that crashed and restarted.

Logs are not the same as monitoring. Logs describe events and messages; metrics describe measured behavior. A strong investigation correlates logs with Pod status, Kubernetes events, resource metrics, deployment changes, and dependency health.

Individual Pod logs have lifecycle limits. Production systems commonly collect logs centrally so they can be searched, retained, correlated across nodes, and protected according to operational and compliance requirements.` },
              { title: "Example", content: `A web API repeatedly restarts. \`kubectl get pods\` shows increasing restarts. \`kubectl describe pod\` reveals lifecycle events, and \`kubectl logs\` shows an application startup error. If the current container has already crashed, inspecting logs from the previous instance can help identify the failure.` },
              { title: "Practical use", content: `Practice logging by creating a pod that writes several messages, following its output, and then intentionally causing a restart. Compare current and previous logs where supported. For production design, evaluate centralized collection rather than relying on the lifecycle of individual pods.` },
            
              { title: "Interview focus", content: `Differentiate logs from metrics and traces. Explain container stdout/stderr, previous-container logs, Pod lifecycle limitations, and why production systems often centralize logs outside individual Pods.` },
              { title: "Common pitfalls", content: `Do not assume kubectl logs is a durable log-management system. Avoid logging sensitive credentials or tokens. Do not diagnose every failure from logs alone; resource state and events often provide the missing context.` },
              { title: "Deep mental model", content: `Logs are event evidence emitted by processes, while metrics summarize measurable behavior and traces connect work across services. A reliable incident investigation correlates all three with Kubernetes state and deployment changes.` },
              { title: "When to use / avoid", content: `Use application logs for event-level diagnosis and audit-relevant application behavior. Centralize logs when retention, search, correlation, or cross-node analysis matters. Avoid relying on ephemeral local files as the only source of production evidence.` },
              { title: "Production scenario", content: `A deployment begins returning errors. Metrics show increased latency, logs show database timeouts, and traces identify the slow downstream call. Kubernetes events show that the application Pods themselves remained scheduled and ready, narrowing the fault to the dependency path.` },
              { title: "Related concepts", content: `Connect logging to stdout/stderr, log agents, centralized backends, structured logging, metrics, tracing, events, retention, and sensitive-data redaction.` },
              { title: "Hands-on lab", content: `Run a workload that emits structured messages, restart its container, compare current and previous logs, and then correlate a log timestamp with a Kubernetes event. Practice redacting a simulated secret before sending logs to a central system.` },],
          },
          {
            title: "Monitoring",
            slug: "monitoring",
            description: "Learn Kubernetes monitoring through resource metrics, workload health, capacity signals, latency, saturation, alerting, and actionable operational measurements.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `Monitoring turns Kubernetes and application behavior into measurable signals such as CPU, memory, restarts, capacity, latency, throughput, and saturation. The goal is not to collect every possible metric; it is to produce signals that support operational decisions.

Resource metrics can explain pressure on nodes or Pods, while application metrics reveal user-facing behavior. A service can have moderate CPU usage and still be unhealthy because of database latency, network errors, queue depth, or request timeouts.

Effective monitoring connects a signal to a question, threshold, owner, and response. Historical tools may change over time, so the durable skill is understanding metrics, alerting, capacity, and reliability rather than memorizing one monitoring product.` },
              { title: "Example", content: `A cluster's API pods suddenly become slow. Monitoring shows memory pressure on their nodes and elevated pod memory usage. Application logs simultaneously show increasing request timeouts. Together these signals provide stronger evidence than either logs or resource metrics alone.` },
              { title: "Practical use", content: `Start with a small set of useful measurements: CPU, memory, restarts, node capacity, and workload utilization. Build the habit of asking what decision each metric supports instead of collecting dashboards with no operational purpose.` },
            
              { title: "Interview focus", content: `Explain why monitoring is about actionable signals, not dashboards. Cover CPU, memory, restarts, capacity, latency, saturation, and workload health, and distinguish resource metrics from application-level SLO signals.` },
              { title: "Common pitfalls", content: `Do not treat high CPU as automatically unhealthy or low CPU as automatically healthy. Avoid collecting metrics without retention, alert thresholds, ownership, or a defined operational action.` },
              { title: "Deep mental model", content: `A metric is useful when it helps answer an operational question. The strongest monitoring model connects symptoms to causes: user latency -> service saturation -> resource pressure or dependency failure -> corrective action.` },
              { title: "When to use / avoid", content: `Use monitoring for capacity planning, alerting, trend detection, and reliability objectives. Avoid alerting on every small fluctuation. Prefer signals tied to user impact or clear failure modes.` },
              { title: "Production scenario", content: `An API's latency SLO degrades while CPU rises and database latency remains normal. The team correlates workload metrics with request latency and determines that CPU saturation is the likely constraint, then scales or optimizes the actual bottleneck.` },
              { title: "Related concepts", content: `Connect monitoring to metrics-server-style resource metrics, Prometheus-style time series, alerts, SLOs, SLIs, logs, traces, resource requests/limits, and autoscaling.` },
              { title: "Hands-on lab", content: `Measure a small workload while increasing request volume. Record CPU, memory, restarts, and application latency. Define one alert condition and write the action an operator should take when it fires.` },
            ],
          },
          {
            title: "Multiple Clusters and Contexts",
            slug: "multiple-clusters-and-contexts",
            description: "Learn kubeconfig and kubectl contexts so you can safely operate across development, testing, and production clusters without confusing their identities.",
            estimatedMinutes: 20,
            sections: [
              { title: "Detailed explanation", content: `kubectl can operate against multiple clusters through kubeconfig configuration and contexts. A context associates a cluster, credentials, and optionally a default namespace, allowing the same command syntax to be used against different environments.

This is powerful but creates a safety risk: a command that is harmless in development can be destructive in production. Context verification should therefore be treated as part of the command's safety precondition, especially before state-changing or destructive operations.

A namespace is not a cluster. Switching namespaces changes the default resource scope inside a cluster, while switching contexts can change the cluster and identity being used. Keeping these concepts separate is essential for safe operations.` },
              { title: "Example", content: `A developer has contexts named \`development\`, \`testing\`, and \`production\`. Before scaling an API, they run \`kubectl config get-contexts\`, switch to the intended context, inspect the workloads, and only then apply the change.` },
              { title: "Practical use", content: `Practice with two local or learning contexts. Before every destructive or state-changing command, deliberately verify the active context. This habit is especially valuable in environments where one terminal can access multiple clusters.` },
            
              { title: "Interview focus", content: `Explain kubeconfig, contexts, clusters, users/credentials, and namespace selection. The key safety point is that identical commands can have radically different consequences depending on the active context.` },
              { title: "Common pitfalls", content: `Never assume the current context is obvious from the terminal prompt. Avoid copying credentials casually between environments. Do not treat namespace selection as equivalent to switching clusters.` },
              { title: "Deep mental model", content: `A kubectl context is an operating identity: cluster + user/credentials + optional namespace. The command text may stay constant while the target environment changes, so context verification is part of the command's safety precondition.` },
              { title: "When to use / avoid", content: `Use contexts when one workstation or automation environment legitimately accesses multiple clusters. In high-risk environments, reinforce context awareness with separate credentials, access controls, tooling prompts, and CI/CD boundaries.` },
              { title: "Production scenario", content: `An engineer receives an incident request for production but currently has a staging context selected. They verify the target context and namespace before inspecting resources. The same command would have produced misleading evidence or harmful changes if the context were wrong.` },
              { title: "Related concepts", content: `Connect contexts to kubeconfig, authentication, RBAC, namespaces, service accounts, CI/CD identities, credential rotation, and cluster separation.` },
              { title: "Hands-on lab", content: `Create two safe local contexts with visibly different namespaces or labels. Switch between them and verify the target before every command. Practice explaining why a namespace check alone cannot prove you are on the intended cluster.` },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Advanced",
    slug: "advanced",
    description: "Master production-oriented Kubernetes architecture, security, availability, scaling, and troubleshooting.",
    level: StudyLevel.ADVANCED,
    modules: [
      {
        title: "Architecture and Production",
        slug: "architecture-and-production",
        description: "Apply Kubernetes architecture to production concerns including deployment design, availability, security, scaling, and platform ownership.",
        topics: [
          {
            title: "End-to-End Application Deployment",
            slug: "end-to-end-application-deployment",
            description: "Build an end-to-end Kubernetes application by connecting Secrets, persistent storage, database workloads, Services, application replicas, and external access.",
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
            
              { title: "Interview focus", content: `Trace dependencies from configuration and storage through database workload and Service to application workload and external access. Explain why each object exists and what failure domain it belongs to.` },
              { title: "Common pitfalls", content: `Do not treat a database Deployment plus PVC as automatically production-grade database architecture. Persistent storage does not itself provide replication, backup, or point-in-time recovery.` },
              { title: "Deep mental model", content: `Model the application as a dependency graph rather than a YAML collection: identity/configuration -> storage -> database -> internal Service -> application -> external access. Troubleshooting follows the same graph in reverse.` },
              { title: "When to use / avoid", content: `Use an end-to-end deployment as a learning exercise to understand object relationships. For production stateful databases, evaluate managed database services or purpose-built operators and explicitly design backup, replication, upgrades, and recovery.` },
              { title: "Production scenario", content: `An inventory application has web replicas, a database endpoint, credentials, and persistent data. A release changes the web workload while the database remains behind a stable internal Service. Readiness and observability prevent traffic from reaching unhealthy web instances.` },
              { title: "Related concepts", content: `Connect Deployments, Services, Secrets, PVCs, readiness probes, DNS, storage classes, database architecture, ingress/gateway, observability, and disaster recovery.` },
              { title: "Hands-on lab", content: `Build the stack one dependency at a time and verify after each layer. Remove a web Pod, break the database selector, and simulate a missing Secret in a safe cluster. Diagnose each failure using dependency order.` },
            ],
          },
          {
            title: "High Availability",
            slug: "high-availability",
            description: "Understand Kubernetes high availability through redundancy, failure domains, workload placement, control-plane resilience, storage, networking, and recovery design.",
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
            
              { title: "Interview focus", content: `Define HA as reducing the impact of failures, not simply increasing replica counts. Discuss workload replicas, node failure domains, scheduling capacity, control-plane redundancy, storage, networking, and recovery objectives.` },
              { title: "Common pitfalls", content: `Do not claim three replicas guarantee HA if all three can land on one failure domain. Do not confuse restart/recreation with durable data recovery. Avoid ignoring the control plane and external dependencies.` },
              { title: "Deep mental model", content: `HA is a failure-domain problem. Redundancy is useful only when replicas are placed and connected so that a realistic failure does not remove every healthy instance or its dependencies.` },
              { title: "When to use / avoid", content: `Use HA architecture for workloads where downtime has meaningful business impact. Do not add replicas blindly when the actual bottleneck is a single database, storage system, DNS dependency, or external service.` },
              { title: "Production scenario", content: `An API has replicas distributed across failure domains with sufficient spare capacity. A node outage removes some Pods, but the scheduler can place replacements and the Service routes to healthy endpoints. Database and storage recovery are designed separately.` },
              { title: "Related concepts", content: `Connect HA to PodDisruptionBudgets, topology spread, affinity, anti-affinity, readiness, replicas, node pools, etcd/control-plane HA, storage replication, backups, and disaster recovery.` },
              { title: "Hands-on lab", content: `Design a failure table for one API: Pod loss, node loss, zone loss, control-plane loss, storage loss, and database loss. For each, identify detection, recovery action, remaining capacity, and expected user impact.` },
            ],
          },
          {
            title: "Security",
            slug: "security",
            description: "Learn layered Kubernetes security across authentication, RBAC, ServiceAccounts, Secrets, Pod security, network controls, admission, and least privilege.",
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
            
              { title: "Interview focus", content: `Cover authentication, authorization/RBAC, ServiceAccounts, Secrets, Pod security, NetworkPolicies, admission control, node security, and least privilege. Explain that Kubernetes security is a layered system.` },
              { title: "Common pitfalls", content: `Do not say namespaces are a complete security boundary. Do not assume Secrets are encrypted merely because they are Secret objects. Avoid granting broad workload-creation privileges without considering privilege escalation paths.` },
              { title: "Deep mental model", content: `Security is a chain of identities, permissions, workload constraints, network reachability, and data protection. Breaking one link can undermine the others, so security reviews should follow both API access and runtime behavior.` },
              { title: "When to use / avoid", content: `Apply least privilege everywhere: human identities, ServiceAccounts, Secret access, network paths, and container privileges. Avoid broad cluster-admin access for routine operations and avoid exposing internal services merely for convenience.` },
              { title: "Production scenario", content: `A backend ServiceAccount can read only the specific configuration it needs. RBAC prevents unrelated namespaces from being modified, Pod security restricts dangerous capabilities, and NetworkPolicy limits which workloads can reach the database.` },
              { title: "Related concepts", content: `Connect Kubernetes security to RBAC, ServiceAccounts, Pod Security Standards, securityContext, NetworkPolicy, admission, image provenance, Secrets encryption, audit logs, and cloud identity.` },
              { title: "Hands-on lab", content: `Create a minimal ServiceAccount and Role in a lab namespace, bind only the required permission, and verify allowed versus denied API calls. Then document why creating arbitrary Pods can be more powerful than the permission name initially suggests.` },],
          },
          {
            title: "Scaling and Networking",
            slug: "scaling-and-networking",
            description: "Understand application versus cluster scaling, stable Service networking, capacity constraints, bottlenecks, autoscaling concepts, and dependency-aware performance tuning.",
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
            
              { title: "Interview focus", content: `Distinguish horizontal application scaling from node/cluster scaling. Explain why adding replicas may not solve a downstream bottleneck and why Services provide stable addressing while endpoint membership changes.` },
              { title: "Common pitfalls", content: `Do not equate more replicas with more throughput automatically. Check CPU, memory, network, storage, database, connection pools, and scheduling capacity. Also avoid assuming autoscaling works without meaningful resource signals and capacity.` },
              { title: "Deep mental model", content: `Scaling is constrained by the slowest dependency. Application replicas add parallelism, while cluster nodes add placement capacity. Networking connects clients to those replicas, but a stable Service cannot compensate for unhealthy or overloaded backends.` },
              { title: "When to use / avoid", content: `Use replica scaling for stateless workloads that can safely run in parallel. Scale nodes when placement capacity is the constraint. Avoid scaling a layer until measurements show it is the limiting resource.` },
              { title: "Production scenario", content: `Traffic doubles and API replicas increase from four to eight. Latency does not improve because the database connection pool is saturated. The correct fix is to address the database bottleneck rather than continue adding API Pods.` },
              { title: "Related concepts", content: `Connect scaling to HPA/VPA concepts, Cluster Autoscaler, resource requests, scheduling, Services, EndpointSlices, DNS, connection pools, rate limits, and backpressure.` },
              { title: "Hands-on lab", content: `Load a small API and measure latency while increasing replicas. Then deliberately constrain the backend dependency and observe when extra replicas stop helping. Document the difference between compute capacity and end-to-end throughput.` },],
          },
          {
            title: "DIY vs Managed Kubernetes",
            slug: "diy-vs-managed-kubernetes",
            description: "Compare self-managed and managed Kubernetes by operational responsibility, control-plane ownership, upgrades, security, support, cost, and engineering effort.",
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
            
              { title: "Interview focus", content: `Compare responsibility boundaries rather than simply price. Discuss control plane, worker nodes, upgrades, networking, storage, security, observability, support, compliance, and operational expertise.` },
              { title: "Common pitfalls", content: `Do not claim managed Kubernetes means zero operations. Application teams still own workload manifests, RBAC choices, resource configuration, security, observability, and application reliability.` },
              { title: "Deep mental model", content: `The decision is about operational ownership. Managed services shift some platform responsibilities to a provider; self-managed Kubernetes keeps those responsibilities inside the organization. The engineering cost includes people, incidents, upgrades, and expertise.` },
              { title: "When to use / avoid", content: `Managed Kubernetes is often attractive when teams want Kubernetes APIs without operating every control-plane detail. Self-management can make sense when requirements demand unusual control, on-premises constraints, or specialized operational ownership and the organization can sustain it.` },
              { title: "Production scenario", content: `A small team chooses a managed control plane because it cannot justify a dedicated cluster-operations team. It still defines workload security, resource policies, backups, observability, deployment processes, and incident ownership.` },
              { title: "Related concepts", content: `Connect this decision to total cost of ownership, shared responsibility, SLAs, control-plane ownership, node pools, upgrades, support contracts, compliance, and cloud-provider integrations.` },
              { title: "Hands-on lab", content: `Build a responsibility matrix for self-managed versus managed Kubernetes. Include control plane upgrades, node lifecycle, networking, storage, RBAC, monitoring, backup, incident response, and application deployment. Compare total operational burden, not just infrastructure price.` },],
          },
        ],
      },
      {
        title: "Troubleshooting",
        slug: "troubleshooting",
        description: "Use a structured, evidence-driven process to diagnose workload, networking, configuration, storage, and dependency failures.",
        topics: [
          {
            title: "Troubleshooting Kubernetes",
            slug: "troubleshooting-kubernetes",
            description: "Learn an evidence-driven Kubernetes troubleshooting method for Pods, Services, scheduling, configuration, storage, networking, credentials, logs, and dependencies.",
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
            
              { title: "Interview focus", content: `Present troubleshooting as evidence-driven narrowing. Start with symptom and resource state, then events, selectors/endpoints, configuration, logs, DNS/networking, dependencies, and only then corrective action.` },
              { title: "Common pitfalls", content: `Avoid restarting everything as a first response. Do not change multiple variables simultaneously. An apparently fixed service is not enough; establish the causal explanation and check whether the fix will survive reconciliation.` },
              { title: "Deep mental model", content: `Troubleshooting is graph traversal over desired state and dependencies. Find the first broken edge: workload -> Pod, Service -> endpoint, Pod -> Secret/config, application -> DNS, or application -> dependency. Fix that edge and observe reconciliation.` },
              { title: "When to use / avoid", content: `Use a layered troubleshooting sequence for incidents and learning. Avoid relying on a single dashboard or command. For production, preserve evidence before making disruptive changes when the situation permits.` },
              { title: "Production scenario", content: `A frontend reports connection failures. The investigation confirms the correct cluster context, finds the Service, discovers empty EndpointSlices, compares selector and Pod labels, identifies a mismatch, and repairs the selector. No application restart is required.` },
              { title: "Related concepts", content: `Connect troubleshooting to events, conditions, logs, EndpointSlices, DNS, probes, resource requests, scheduling, RBAC, storage, rollout history, and observability.` },
              { title: "Hands-on lab", content: `Create a lab with three intentional faults: a bad Service selector, a missing Secret, and an impossible scheduling constraint. Diagnose each without random restarts and record the evidence that proves the root cause.` },],
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
