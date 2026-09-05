// ---- 200 Kubernetes Interview Questions (Fresher to Advanced) ----
// ---- 200 Java Developer Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- 200 Docker Interview Questions (Fresher to Advanced) ----
// ---- Categories ----
export const categories = [
  ["Kubernetes", "Kubernetes"]
] as const;

// ---- 200 Git & GitHub Interview Questions (Fresher to Advanced) ----
export const topics = [
  // ==================== 1. CORE CONCEPTS (Easy) ====================
  ["Kubernetes", "What is Kubernetes and why is it used?", "kubernetes-overview", "Define Kubernetes and its purpose.", "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides features like self-healing, service discovery, load balancing, automated rollouts and rollbacks, and secret management."],
  ["Kubernetes", "What are the main components of Kubernetes architecture?", "kubernetes-architecture", "List the control plane and worker node components.", "Control plane components: API Server, etcd, Scheduler, Controller Manager, Cloud Controller Manager. Worker node components: kubelet, kube-proxy, container runtime (e.g., containerd)."],
  ["Kubernetes", "What is a Pod in Kubernetes?", "pod-definition", "Define the smallest deployable unit.", "A Pod is the smallest deployable unit in Kubernetes. It represents a single instance of a running process and can contain one or more containers that share networking (same IP) and storage volumes. Containers in a Pod are always co-located and co-scheduled."],
  ["Kubernetes", "What is the difference between a Pod and a Container?", "pod-vs-container", "Explain the relationship.", "A container is a lightweight, portable unit that runs an application. A Pod is a wrapper around one or more containers. Pods provide a shared network namespace and storage volumes for their containers. In Kubernetes, you always deploy containers inside Pods."],
  ["Kubernetes", "What is a Deployment and why is it used?", "deployment-definition", "Explain the workload resource.", "A Deployment is a Kubernetes resource that manages stateless applications. It provides declarative updates for Pods and ReplicaSets, enabling rolling updates, rollbacks, scaling, and self-healing. It is the recommended way to manage stateless Pods."],
  ["Kubernetes", "What is a ReplicaSet and how does it differ from a Deployment?", "replicaset-vs-deployment", "Compare the two.", "A ReplicaSet ensures that a specified number of Pod replicas are running at any given time. A Deployment is a higher-level abstraction that manages ReplicaSets and provides features like rolling updates and rollbacks. You should use Deployments, not ReplicaSets directly."],
  ["Kubernetes", "What is a Service in Kubernetes and what are its types?", "kubernetes-service", "Explain service types.", "A Service provides a stable network endpoint (IP and DNS name) for a set of Pods. Types: ClusterIP (internal only), NodePort (exposes on a static port on each node), LoadBalancer (provisions a cloud load balancer), and ExternalName (maps to an external DNS name)."],
  ["Kubernetes", "What is the difference between a Service and a Pod?", "service-vs-pod", "Explain their roles.", "A Pod runs application containers. A Service provides a stable endpoint to access a group of Pods, enabling load balancing and service discovery. Pods are ephemeral; Services provide persistence."],
  ["Kubernetes", "What is a Namespace and why is it used?", "namespace-definition", "Explain resource isolation.", "A Namespace is a virtual cluster within a Kubernetes cluster. It provides scope for names and isolation of resources (e.g., Pods, Services). They are used to separate environments (dev, test, prod) or teams."],
  ["Kubernetes", "What is a ConfigMap and a Secret?", "configmap-secret", "Explain configuration storage.", "A ConfigMap stores non-sensitive configuration key-value pairs. A Secret stores sensitive data (e.g., passwords, tokens) in an encoded format. Both can be injected into Pods as environment variables or mounted as files."],

  // ==================== 2. WORKLOADS & RESOURCES (Easy-Medium) ====================
  ["Kubernetes", "What is a StatefulSet and when would you use it?", "statefulset-definition", "Explain stateful applications.", "A StatefulSet is a workload resource for stateful applications. It provides stable network identities (hostname-based), ordered deployment and scaling, and persistent storage (via PersistentVolumeClaims). Use it for databases, message queues, and other stateful services."],
  ["Kubernetes", "What is the difference between a Deployment and a StatefulSet?", "deployment-vs-statefulset", "Compare the two workloads.", "Deployments are for stateless applications with interchangeable Pods. StatefulSets are for stateful applications where Pods have unique identities and persistent storage. StatefulSets provide ordered startup/shutdown and stable network identities."],
  ["Kubernetes", "What is a DaemonSet and when would you use it?", "daemonset-definition", "Explain node-level resources.", "A DaemonSet ensures that a copy of a Pod runs on every node (or a subset of nodes) in the cluster. It is used for node-level services like log collectors (Fluentd), monitoring agents (Prometheus Node Exporter), and network plugins."],
  ["Kubernetes", "What is a Job and a CronJob?", "job-cronjob", "Explain batch processing.", "A Job creates one or more Pods and ensures they successfully complete. It is used for batch tasks. A CronJob schedules Jobs to run at regular intervals (e.g., daily backups, report generation)."],
  ["Kubernetes", "What is an Ingress and how does it differ from a Service?", "ingress-vs-service", "Compare HTTP routing.", "A Service provides L4 (TCP/UDP) load balancing. An Ingress provides L7 (HTTP/HTTPS) routing with host/path-based rules. It acts as an entry point for external traffic, enabling TLS termination and name-based virtual hosting."],
  ["Kubernetes", "What is a PersistentVolume (PV) and PersistentVolumeClaim (PVC)?", "pv-pvc", "Explain persistent storage.", "A PersistentVolume (PV) is a piece of storage in the cluster provisioned by an administrator. A PersistentVolumeClaim (PVC) is a request for storage by a user. Pods use PVCs to mount storage. PVs and PVCs decouple storage provisioning from consumption."],
  ["Kubernetes", "What is a StorageClass and why is it used?", "storageclass-definition", "Explain dynamic provisioning.", "A StorageClass defines storage types and provisioning policies. It enables dynamic provisioning of PVs when PVCs are created. Common examples: standard (SSD), slow (HDD), and managed (cloud-specific)."],
  ["Kubernetes", "What is a HorizontalPodAutoscaler (HPA)?", "hpa-definition", "Explain autoscaling.", "HPA automatically scales the number of Pods in a Deployment, ReplicaSet, or StatefulSet based on observed metrics (CPU, memory, or custom metrics). It helps maintain performance during varying load."],
  ["Kubernetes", "What is a VerticalPodAutoscaler (VPA)?", "vpa-definition", "Explain resource adjustment.", "VPA automatically adjusts the CPU and memory requests/limits of containers in a Pod based on historical usage. It can also evict and recreate Pods with new resource recommendations."],
  ["Kubernetes", "What is a PodDisruptionBudget (PDB)?", "pdb-definition", "Explain availability protection.", "A PodDisruptionBudget limits the number of Pods that can be voluntarily disrupted (e.g., during node drains or rolling updates). It ensures a minimum number of Pods remain available during voluntary disruptions."],

  // ==================== 3. NETWORKING (Medium) ====================
  ["Kubernetes", "How does Kubernetes networking work?", "kubernetes-networking", "Explain the networking model.", "Kubernetes uses a flat network model where every Pod gets its own IP address, and all Pods can communicate without NAT. The network model is implemented via CNI plugins (e.g., Calico, Flannel, Cilium). Services provide stable endpoints and load balancing."],
  ["Kubernetes", "What is the Container Network Interface (CNI)?", "cni-definition", "Explain the plugin interface.", "CNI is a specification for configuring network interfaces in Linux containers. Kubernetes uses CNI plugins to implement the networking model. Examples: Calico, Flannel, Weave, Cilium."],
  ["Kubernetes", "What is the difference between ClusterIP, NodePort, and LoadBalancer?", "service-types", "Compare the service types.", "ClusterIP: internal IP accessible only within the cluster. NodePort: exposes the service on a static port (30000-32767) on each node. LoadBalancer: provisions an external load balancer (cloud) to route traffic to the service."],
  ["Kubernetes", "What is an Ingress Controller and how does it work?", "ingress-controller", "Explain the implementation.", "An Ingress Controller is a Pod that watches the Kubernetes API for Ingress resources and configures a reverse proxy (e.g., Nginx, Traefik) to route external traffic based on the rules. It is the actual implementation of Ingress."],
  ["Kubernetes", "How does kube-proxy work?", "kube-proxy", "Explain the network proxy.", "kube-proxy is a network proxy that runs on each node. It maintains network rules (iptables, IPVS) to enable Service load balancing. It forwards traffic to the correct Pods based on Service definitions."],
  ["Kubernetes", "What is the difference between iptables and IPVS in kube-proxy?", "iptables-vs-ipvs", "Compare the modes.", "iptables is the default mode, using iptables rules for load balancing. IPVS is a mode that uses the Linux kernel's IP Virtual Server for more efficient load balancing, supporting more algorithms and higher performance."],
  ["Kubernetes", "What is a NetworkPolicy and how is it used?", "networkpolicy-definition", "Explain network security.", "A NetworkPolicy defines rules for controlling traffic between Pods and external endpoints. It allows you to implement zero-trust security by specifying which Pods can communicate with each other."],
  ["Kubernetes", "What is the difference between a Service and an Ingress?", "service-vs-ingress", "Compare external access.", "A Service provides a stable IP and port for internal or external access. An Ingress manages external HTTP/S traffic to Services using host/path rules, offering TLS termination and name-based routing."],
  ["Kubernetes", "What is a Service Mesh and how does it relate to Kubernetes?", "service-mesh-kubernetes", "Explain the integration.", "A Service Mesh (e.g., Istio, Linkerd) is a dedicated infrastructure layer for service-to-service communication. In Kubernetes, it deploys sidecar proxies (Envoy) with each Pod to provide features like traffic management, security (mTLS), and observability."],
  ["Kubernetes", "How does DNS work in Kubernetes?", "kubernetes-dns", "Explain service discovery.", "Kubernetes uses CoreDNS (or kube-dns) as the cluster DNS. It automatically creates DNS records for Services and Pods. For example, a Service `my-service` in namespace `default` is accessible as `my-service.default.svc.cluster.local`."],

  // ==================== 4. STORAGE (Medium) ====================
  ["Kubernetes", "What types of persistent storage are supported in Kubernetes?", "persistent-storage-types", "List the options.", "HostPath (node-local), emptyDir (temporary), PersistentVolumes with CSI (Container Storage Interface) drivers for cloud storage (AWS EBS, GCE PD, Azure Disk), NFS, and more. CSI is the standard for dynamic provisioning."],
  ["Kubernetes", "What is the Container Storage Interface (CSI)?", "csi-definition", "Explain the storage plugin interface.", "CSI is a specification for exposing arbitrary block and file storage systems to containerized workloads. It allows storage vendors to write drivers that integrate with Kubernetes without modifying the core code."],
  ["Kubernetes", "What is the difference between emptyDir and hostPath volumes?", "emptydir-vs-hostpath", "Compare the two.", "emptyDir is a temporary volume that is created when a Pod is scheduled and exists as long as the Pod runs. hostPath mounts a directory from the host node's filesystem into the Pod. hostPath is dangerous for security and should be used sparingly."],
  ["Kubernetes", "How do you create a PersistentVolume (PV) and PersistentVolumeClaim (PVC) workflow?", "pv-pvc-workflow", "Explain the process.", "1. Administrator creates a PV with storage capacity and access modes. 2. User creates a PVC requesting storage. 3. Kubernetes binds a PV to the PVC matching the request. 4. Pod uses the PVC as a volume mount."],
  ["Kubernetes", "What is dynamic provisioning of PersistentVolumes?", "dynamic-provisioning", "Explain automatic PV creation.", "Dynamic provisioning allows automatic creation of PVs when a PVC is created. It is enabled by defining a StorageClass. The provisioner (e.g., AWS EBS, GCE PD) dynamically creates the underlying storage."],
  ["Kubernetes", "How do you handle storage in stateful applications?", "stateful-storage", "Explain StatefulSet and PVCs.", "In a StatefulSet, each Pod gets its own PVC, and the PVC is bound to a PV. The PVCs are retained even if the Pod is deleted. This provides persistent storage that is unique to each replica."],
  ["Kubernetes", "What is the difference between ReadWriteOnce and ReadWriteMany access modes?", "access-modes", "Explain the modes.", "ReadWriteOnce: the volume can be mounted as read-write by a single node. ReadWriteMany: the volume can be mounted as read-write by multiple nodes simultaneously."],
  ["Kubernetes", "How do you backup and restore persistent data in Kubernetes?", "backup-restore-k8s", "Explain backup strategies.", "Use Velero (formerly Heptio Ark) to backup Kubernetes resources and persistent volumes. For cloud storage, use cloud-native snapshots (e.g., AWS EBS snapshots). For databases, use database-specific backup tools (e.g., pg_dump, mongodump)."],
  ["Kubernetes", "What is a volume snapshot and how is it used?", "volume-snapshot", "Explain snapshots.", "A VolumeSnapshot is a Kubernetes resource that captures the state of a PersistentVolume at a point in time. It can be used for backups or to restore data to a new PVC. It requires a CSI driver that supports snapshots."],

  // ==================== 5. SECURITY (Medium-Hard) ====================
  ["Kubernetes", "How do you secure a Kubernetes cluster?", "secure-k8s-cluster", "List security best practices.", "Enable RBAC, use namespaces, enforce Pod Security Policies (or Pod Security Admission), use network policies, enable audit logging, keep components updated, use TLS for all communications, and use service accounts with least privilege."],
  ["Kubernetes", "What is RBAC in Kubernetes?", "rbac-definition", "Explain role-based access control.", "RBAC (Role-Based Access Control) is a Kubernetes authorization mechanism that controls access to resources based on roles. It defines Roles (and ClusterRoles) with specific permissions and binds them to users, groups, or service accounts via RoleBindings (and ClusterRoleBindings)."],
  ["Kubernetes", "What is the difference between a Role and a ClusterRole?", "role-vs-clusterrole", "Compare the two.", "A Role grants permissions within a specific Namespace. A ClusterRole grants permissions cluster-wide (e.g., for accessing nodes, persistent volumes, and non-namespaced resources)."],
  ["Kubernetes", "What is a ServiceAccount and how is it used?", "serviceaccount-definition", "Explain non-human identities.", "A ServiceAccount is an identity for Pods that allows them to authenticate with the Kubernetes API. It provides tokens and permissions via RBAC. Each Namespace has a default ServiceAccount."],
  ["Kubernetes", "What is the difference between a Secret and a ConfigMap?", "secret-vs-configmap", "Compare the two.", "ConfigMap stores non-sensitive configuration data. Secret stores sensitive data (e.g., passwords, tokens) in an encoded format. Secrets are stored in etcd (encrypted if enabled) and have stricter access controls."],
  ["Kubernetes", "What is a PodSecurityPolicy (PSP) and why is it deprecated?", "psp-definition", "Explain the security policy.", "PSP was a resource that controlled security-sensitive aspects of Pods (e.g., running as root, host network, privileged containers). It is deprecated in Kubernetes 1.21 and removed in 1.25, replaced by Pod Security Admission (PSA)."],
  ["Kubernetes", "What is Pod Security Admission (PSA)?", "psa-definition", "Explain the replacement for PSP.", "PSA is a built-in admission controller that enforces Pod security standards at the namespace level. It provides three levels: `privileged`, `baseline`, and `restricted`. It is simpler and more manageable than PSP."],
  ["Kubernetes", "What is network policy and how does it improve security?", "network-policy-security", "Explain isolation.", "Network policies allow you to define rules for ingress and egress traffic to/from Pods. They implement zero-trust security by limiting communication only to allowed sources and destinations."],
  ["Kubernetes", "How do you manage secrets securely in Kubernetes?", "secrets-management-k8s", "Explain best practices.", "Use Secrets with encryption at rest. Use external secrets management tools (e.g., HashiCorp Vault, AWS Secrets Manager) to store secrets outside the cluster. Use CSI drivers to mount secrets as volumes."],
  ["Kubernetes", "What is the role of the API Server in security?", "api-server-security", "Explain its responsibilities.", "The API Server is the central component that exposes the Kubernetes API. It is responsible for authentication (certificates, tokens) and authorization (RBAC). It also validates and mutates requests via admission controllers (e.g., PSA)."],

  // ==================== 6. SCHEDULING & RESOURCE MANAGEMENT (Medium) ====================
  ["Kubernetes", "How does the Kubernetes scheduler work?", "scheduler-definition", "Explain the scheduling process.", "The scheduler watches the API server for unscheduled Pods. It uses a two-step process: filtering (nodes that meet requirements) and scoring (ranks nodes based on factors like resource availability, affinity/anti-affinity, and taints/tolerations). The highest-scoring node is selected."],
  ["Kubernetes", "What are taints and tolerations and how do they affect scheduling?", "taints-tolerations", "Explain the scheduling constraints.", "Taints are applied to nodes to repel Pods. Tolerations are applied to Pods to allow them to be scheduled on nodes with matching taints. They are used to dedicate nodes for specific workloads (e.g., GPU nodes) or to prevent scheduling on certain nodes."],
  ["Kubernetes", "What is the difference between node affinity and pod affinity?", "affinity-types", "Compare the two.", "Node affinity schedules Pods based on node labels (e.g., `node-type=high-memory`). Pod affinity schedules Pods relative to other Pods (e.g., `same backend`). Pod anti-affinity prevents Pods from being scheduled together."],
  ["Kubernetes", "What is a priority class in Kubernetes?", "priority-class", "Explain scheduling priority.", "A PriorityClass defines the priority of Pods. Higher-priority Pods are scheduled before lower-priority ones and can preempt (evict) lower-priority Pods if resources are insufficient."],
  ["Kubernetes", "What is the difference between requests and limits in Kubernetes?", "requests-vs-limits", "Explain resource constraints.", "Requests are the minimum resources a container is guaranteed. Limits are the maximum resources a container can use. The scheduler uses requests to place Pods; the runtime enforces limits."],
  ["Kubernetes", "How do you monitor resource usage in Kubernetes?", "monitor-resources", "Explain monitoring tools.", "Use `kubectl top` for real-time metrics. Use metrics-server for scaling (HPA). For advanced monitoring, use Prometheus, Grafana, and node exporters."],
  ["Kubernetes", "What is the role of the `kubelet` in Kubernetes?", "kubelet-definition", "Explain the node agent.", "kubelet is the primary node agent that runs on each node. It ensures containers are running as defined in PodSpecs. It communicates with the API server, reports node status, and manages Pod lifecycle."],
  ["Kubernetes", "What is the difference between a Pod phase and a Pod condition?", "pod-phase-vs-condition", "Explain the states.", "Pod phase is a high-level summary (Pending, Running, Succeeded, Failed, Unknown). Pod conditions are more detailed statuses (PodScheduled, Ready, Initialized, Unschedulable)."],
  ["Kubernetes", "How do you debug a Pod that is stuck in Pending state?", "debug-pending-pod", "Explain diagnosis steps.", "1. `kubectl describe pod` to see events. 2. Check if there are insufficient resources (CPU, memory). 3. Check node taints/tolerations. 4. Check persistent volume claims (if any). 5. Check scheduling constraints (affinity, node selectors)."],
  ["Kubernetes", "What is a resource quota and how is it used?", "resource-quota", "Explain resource limits at namespace level.", "A ResourceQuota limits the total resource usage (CPU, memory, storage) across all Pods and PVCs in a Namespace. It prevents a single Namespace from consuming all cluster resources."],

  // ==================== 7. OPERATORS & CUSTOM RESOURCES (Hard) ====================
  ["Kubernetes", "What is a Custom Resource Definition (CRD)?", "crd-definition", "Explain extending the API.", "A CRD allows you to define custom resources in Kubernetes, extending the API beyond built-in resources (Pod, Service). It enables operators to manage applications (e.g., databases, Prometheus) with Kubernetes-native APIs."],
  ["Kubernetes", "What is a Kubernetes Operator and what is its purpose?", "operator-definition", "Explain the pattern.", "An Operator is a controller that manages custom resources. It encodes operational knowledge (e.g., backup, scaling) into code and automates the lifecycle of complex applications. Examples: Prometheus Operator, etcd Operator."],
  ["Kubernetes", "What is the difference between a Custom Resource and an Operator?", "cr-vs-operator", "Explain the relationship.", "A Custom Resource is a data structure that extends the Kubernetes API. An Operator is a controller that watches custom resources and takes actions to reconcile the desired state. Operators use CRDs to represent the application configuration."],
  ["Kubernetes", "How does the controller pattern work in Kubernetes?", "controller-pattern", "Explain reconciliation loops.", "A controller is a loop that watches the desired state (in etcd) and compares it to the current state (observed). It takes actions to converge the current state to the desired state. Controllers are the heart of Kubernetes automation."],
  ["Kubernetes", "What is the role of the `controller-manager` in Kubernetes?", "controller-manager", "Explain the control plane component.", "The controller-manager runs core controllers (e.g., Deployment controller, ReplicaSet controller, Job controller). Each controller watches the API server and reconciles the state."],
  ["Kubernetes", "How do you build a custom controller in Kubernetes?", "build-controller", "Explain the development process.", "Use client-go (Go client) and controller-runtime (part of Kubebuilder/Operator SDK). Define the CRD, implement the reconciliation loop that watches the CR and takes actions, and package as a container."],
  ["Kubernetes", "What is the difference between a MutatingAdmissionWebhook and a ValidatingAdmissionWebhook?", "admission-webhooks", "Explain admission control.", "MutatingAdmissionWebhook modifies requests before validation (e.g., injecting sidecars). ValidatingAdmissionWebhook validates requests and can reject them (e.g., enforcing policies). They are used for custom admission control."],

  // ==================== 8. CLUSTER MANAGEMENT (Hard) ====================
  ["Kubernetes", "How do you upgrade a Kubernetes cluster?", "upgrade-cluster", "Explain the upgrade process.", "1. Drain nodes (evict Pods). 2. Update control plane components (API Server, etcd, controller-manager, scheduler). 3. Upgrade kubelets on nodes. 4. Uncordon nodes to allow Pod scheduling. Tools: kubeadm, managed services (EKS, GKE) do it automatically."],
  ["Kubernetes", "How do you add a new node to a Kubernetes cluster?", "add-node", "Explain node addition.", "1. Install container runtime and kubelet on the new node. 2. Join the node to the cluster using `kubeadm join` (or via cloud provider node group). 3. The node will be automatically registered and become ready."],
  ["Kubernetes", "How do you remove a node from a Kubernetes cluster?", "remove-node", "Explain node removal.", "1. Drain the node to evict Pods (`kubectl drain <node>`). 2. Delete the node object (`kubectl delete node <node>`). 3. Remove the node from the cloud provider (if applicable)."],
  ["Kubernetes", "What is the role of etcd in Kubernetes?", "etcd-definition", "Explain the key-value store.", "etcd is a highly available, distributed key-value store that stores all cluster state (configuration, secrets, resources). It is the source of truth for Kubernetes. Backups are essential for disaster recovery."],
  ["Kubernetes", "How do you backup and restore etcd?", "etcd-backup", "Explain backup procedures.", "Use `etcdctl snapshot save` to create a snapshot. To restore, stop the API server, restore the snapshot with `etcdctl snapshot restore`, and restart the API server. Always test restore procedures."],
  ["Kubernetes", "What is a high-availability (HA) Kubernetes cluster?", "ha-kubernetes", "Explain HA setup.", "An HA cluster has multiple control plane nodes (API Server, etcd, scheduler, controller-manager) to avoid single point of failure. etcd is usually deployed as a 3-node cluster for quorum. Load balancers are used to distribute API server requests."],
  ["Kubernetes", "What is the difference between a managed Kubernetes service and a self-managed cluster?", "managed-vs-self-managed", "Compare the two.", "Managed services (EKS, GKE, AKS) handle control plane and node management, reducing operational overhead. Self-managed clusters give full control but require more effort to maintain."],
  ["Kubernetes", "How do you monitor a Kubernetes cluster?", "monitor-k8s-cluster", "Explain monitoring stack.", "Use Prometheus for metrics collection, Grafana for visualization, and Alertmanager for alerts. Use node exporters for node metrics, and cAdvisor/Kubelet metrics for container metrics. Use tools like Datadog, New Relic for SaaS options."],
  ["Kubernetes", "What is the role of `kubectl` in Kubernetes?", "kubectl-definition", "Explain the CLI tool.", "`kubectl` is the command-line interface for interacting with the Kubernetes API. It is used to create, manage, and troubleshoot resources (e.g., `kubectl get pods`, `kubectl apply -f deploy.yaml`)."],
  ["Kubernetes", "How do you troubleshoot a node that is NotReady?", "troubleshoot-node-notready", "Explain diagnosis steps.", "1. Check kubelet status (`systemctl status kubelet`). 2. Check node resources (disk space, memory). 3. Check network connectivity. 4. Check logs (`journalctl -u kubelet`). 5. Check if the node was cordoned."],

  // ==================== 9. CI/CD & GITOPS (Medium) ====================
  ["Kubernetes", "How do you integrate CI/CD with Kubernetes?", "cicd-k8s", "Explain the pipeline.", "Use a CI tool (Jenkins, GitLab CI, GitHub Actions) to build and test code, build container images, and push to a registry. The CD tool (ArgoCD, Flux, or Helm) applies the new manifests to the Kubernetes cluster."],
  ["Kubernetes", "What is GitOps and how does it work with Kubernetes?", "gitops-k8s", "Explain the GitOps methodology.", "GitOps uses Git as the single source of truth for declarative infrastructure and application definitions. Tools like ArgoCD or Flux continuously monitor the Git repository and automatically apply changes to the Kubernetes cluster to match the desired state."],
  ["Kubernetes", "What is ArgoCD and how does it differ from Jenkins?", "argocd-vs-jenkins", "Compare the CD tools.", "Jenkins is a general-purpose CI/CD tool that can deploy to Kubernetes. ArgoCD is a declarative, GitOps-focused continuous delivery tool specifically for Kubernetes. It automatically syncs the cluster state with the Git repository."],
  ["Kubernetes", "What is Helm and why is it used?", "helm-definition", "Explain the package manager.", "Helm is a package manager for Kubernetes. It uses charts (templates) to define, install, and upgrade complex Kubernetes applications. It simplifies deployment and management of multi-component applications."],
  ["Kubernetes", "What is the difference between a Helm chart and a Kubernetes manifest?", "helm-chart-vs-manifest", "Compare the two.", "A Kubernetes manifest is a YAML file describing a resource. A Helm chart is a collection of templates (manifests with variables) and metadata. Charts allow parameterization and reuse, making them more powerful for managing complex applications."],
  ["Kubernetes", "What is a Helm release?", "helm-release", "Define the term.", "A Helm release is a specific instance of a Helm chart deployed in a Kubernetes cluster. Each deployment has a unique release name. Helm manages the lifecycle (install, upgrade, rollback) of releases."],
  ["Kubernetes", "How do you rollback a Helm release?", "helm-rollback", "Explain the command.", "`helm rollback <release-name> <revision>` rolls back to a previous revision. `helm history` shows the revision history."],

  // ==================== 10. SCENARIO-BASED (Hard) ====================
  ["Kubernetes", "You have a deployment that is not rolling out. How do you debug it?", "debug-rollout", "Explain troubleshooting steps.", "1. `kubectl rollout status deployment` to check status. 2. `kubectl rollout history` to see revisions. 3. `kubectl describe deployment` for events. 4. Check Pod logs and events (`kubectl logs`, `kubectl describe pod`). 5. Check if there are image pull errors or resource constraints."],
  ["Kubernetes", "A Pod is crashing repeatedly. How do you diagnose it?", "debug-crashing-pod", "Explain the diagnosis.", "1. `kubectl logs <pod>` to see logs. 2. `kubectl describe pod` for events. 3. Check if the container exits with code. 4. Check resource limits. 5. If needed, `kubectl exec` into the Pod (if running) or check previous logs (`kubectl logs --previous`)."],
  ["Kubernetes", "How do you scale a deployment to 10 replicas?", "scale-deployment", "Explain scaling.", "`kubectl scale deployment <deployment> --replicas=10`."],
  ["Kubernetes", "How do you perform a rolling update and rollback of a deployment?", "rolling-update-rollback", "Explain the commands.", "Update: `kubectl set image deployment/<deployment> <container>=<new-image>`. Rollback: `kubectl rollout undo deployment/<deployment>`."],
  ["Kubernetes", "A service is not reachable. How do you debug it?", "debug-service", "Explain troubleshooting steps.", "1. Check if service exists (`kubectl get svc`). 2. Check endpoints (`kubectl get endpoints`). 3. Check if Pods are running and labeled correctly. 4. Check if kube-proxy is running. 5. Test connectivity from a Pod (e.g., using `busybox`)."],
  ["Kubernetes", "How do you expose a service to the internet?", "expose-service", "Explain the methods.", "Use a LoadBalancer service type (cloud) or NodePort + Ingress. For on-premise, use MetalLB or NodePort with an external load balancer."],
  ["Kubernetes", "How do you schedule a Pod on a specific node?", "schedule-pod-node", "Explain nodeSelector.", "Use `nodeSelector` in the Pod spec: `nodeSelector: { disktype: ssd }`. Also, use node affinity for more complex rules."],
  ["Kubernetes", "How do you prevent a Pod from being scheduled on a node?", "prevent-pod-scheduling", "Explain taints.", "Apply a taint to the node (`kubectl taint nodes <node> key=value:NoSchedule`). The Pod must have a matching toleration to be scheduled on that node."],
  ["Kubernetes", "How do you handle resource constraints in a cluster?", "resource-constraints", "Explain strategies.", "Use resource quotas at the namespace level to limit total usage. Use requests and limits for Pods. Use HPA to scale based on load. If the cluster is full, add nodes or consider cluster autoscaling."],
  ["Kubernetes", "You have a PVC stuck in Pending state. How do you debug it?", "debug-pvc-pending", "Explain troubleshooting.", "1. `kubectl describe pvc` to see events. 2. Check if there is a PV that matches the PVC. 3. Check if the StorageClass is configured correctly. 4. Check if the provisioner is working."],
  ["Kubernetes", "A Pod is stuck in the CrashLoopBackOff state. How do you fix it?", "crashloopbackoff", "Explain diagnosis and fix.", "Check logs (`kubectl logs --previous`). Check if the container fails to start (e.g., missing configuration). Check if the application is crashing (e.g., database connection failure). Update the container image or fix the configuration."],
  ["Kubernetes", "How do you roll back a failed deployment?", "rollback-deployment", "Explain the command.", "`kubectl rollout undo deployment/<deployment>` rolls back to the previous revision. `kubectl rollout undo deployment/<deployment> --to-revision=<revision>` rolls back to a specific revision."],
  ["Kubernetes", "A node is not joining the cluster. How do you debug it?", "debug-node-joining", "Explain troubleshooting steps.", "1. Check if the kubelet is running (`systemctl status kubelet`). 2. Check the token and certificate for joining (`kubeadm join`). 3. Check firewall rules. 4. Check the API server connectivity."],
  ["Kubernetes", "How do you monitor the health of a Kubernetes cluster?", "monitor-health", "Explain the metrics.", "Monitor API server latency, etcd latency, node status (Ready/NotReady), Pod statuses, resource usage (CPU, memory), and PV usage. Use tools like Prometheus and Grafana."],
  ["Kubernetes", "You have a cluster with multiple namespaces. How do you manage RBAC for different teams?", "rbac-multiple-namespaces", "Explain the strategy.", "Create a separate Role for each namespace with appropriate permissions. Bind the Role to the team's service account or group using a RoleBinding in that namespace. For cluster-wide permissions, use ClusterRoles and ClusterRoleBindings."],
  ["Kubernetes", "How do you handle configuration changes without restarting a Pod?", "config-reload", "Explain dynamic configuration.", "Use a config map that is mounted as a volume. The application can watch for file changes and reload configuration. Use tools like `reloader` that restart Pods when config maps change, or use environment variables and update the deployment."],
  ["Kubernetes", "A Pod has no external network access. How do you debug it?", "debug-pod-network", "Explain network troubleshooting.", "1. Check if the Pod has a network interface (`kubectl exec`). 2. Check if the service is correctly configured. 3. Check network policies (if any). 4. Check DNS resolution (CoreDNS). 5. Check node network connectivity."],
  ["Kubernetes", "How do you implement a canary deployment in Kubernetes?", "canary-k8s", "Explain the strategy.", "Use a service with a selector that points to a subset of Pods. Deploy a new version with a few replicas and a specific label. Use traffic splitting (e.g., via Istio or a custom load balancer) to route a small percentage of traffic to the canary."],
  ["Kubernetes", "What is the difference between a job and a cronjob in terms of scheduling?", "job-vs-cronjob", "Explain scheduling.", "A Job runs a task once. A CronJob runs a Job on a schedule (e.g., every 5 minutes). CronJob uses cron expressions."],
  ["Kubernetes", "How do you ensure that a Pod runs on a node with a specific hardware (e.g., GPU)?", "node-selector-gpu", "Explain the approach.", "Use nodeSelector with a label indicating GPU presence (e.g., `nodeSelector: { 'accelerator': 'nvidia-gpu' }`). Use taints and tolerations to reserve GPU nodes."],
  ["Kubernetes", "How do you handle application secrets rotation without restarting the Pod?", "secret-rotation", "Explain secret management.", "Mount secrets as volumes (not environment variables) and have the application watch for file changes to reload secrets. Use a tool like Vault or a sidecar container to refresh secrets."],

  // ==================== 11. DEEP DIVE / ADVANCED (Hard) ====================
  ["Kubernetes", "What is the role of the API server's admission controllers?", "admission-controllers", "Explain the plugin system.", "Admission controllers intercept requests after authentication and authorization. They can mutate (change) or validate (accept/reject) requests. Examples: `PodSecurity`, `NamespaceLifecycle`, `ResourceQuota`."],
  ["Kubernetes", "How does Kubernetes handle API versioning?", "api-versioning", "Explain the versioning strategy.", "Kubernetes API has multiple versions (e.g., `v1`, `v1beta1`). The API server supports multiple versions. Resources are converted between versions using conversion webhooks. The preferred version is used for storage."],
  ["Kubernetes", "What is the difference between `kubectl apply` and `kubectl create`?", "apply-vs-create", "Compare the commands.", "`kubectl create` creates a resource from a definition; if it exists, it returns an error. `kubectl apply` creates or updates a resource (declarative). `apply` is preferred for production as it supports patching and is idempotent."],
  ["Kubernetes", "What is the role of the `kube-controller-manager`?", "kube-controller-manager", "Explain the component.", "It is a control plane component that runs multiple controllers (e.g., deployment, replicaset, node). Each controller reconciles the current state to the desired state."],
  ["Kubernetes", "How does the Kubernetes scheduler prioritize nodes?", "scheduler-prioritization", "Explain scoring.", "The scheduler uses a set of scoring plugins (e.g., `NodeResourcesFit`, `NodeAffinity`, `PodTopologySpread`) to rank nodes. The node with the highest aggregate score is selected."],
  ["Kubernetes", "What is the difference between a node failure and a Pod eviction?", "node-failure-vs-eviction", "Explain the causes.", "A node failure is a node going down (e.g., power loss). Pods on that node are considered failed and will be recreated elsewhere. A Pod eviction is a deliberate process where the node evicts Pods due to resource pressure or node maintenance."],
  ["Kubernetes", "How do you perform a blue-green deployment in Kubernetes?", "blue-green-k8s", "Explain the strategy.", "Use two separate Deployments (blue and green) and a Service with a selector. Initially, the service points to blue. To switch, update the service's selector to point to green. This is a simple way to do blue-green."],
  ["Kubernetes", "How does Kubernetes handle container image pull secrets?", "image-pull-secrets", "Explain private registry access.", "Create a Secret with type `kubernetes.io/dockercfg` or `kubernetes.io/dockerconfigjson` containing registry credentials. Then reference the secret in the Pod spec: `imagePullSecrets: [ { name: my-secret } ]`."],
  ["Kubernetes", "What is the difference between a read-only and a writable volume mount?", "readonly-vs-writable-mount", "Explain mount options.", "A volume can be mounted as `readOnly: true` in a container's volume mount. This prevents the container from writing to the volume."],
  ["Kubernetes", "How do you enable audit logging in Kubernetes?", "audit-logging", "Explain configuration.", "Enable audit logging by configuring the API server with `--audit-policy-file` and `--audit-log-path`. Define an audit policy to specify what to log. Logs can be sent to a file, webhook, or external system (e.g., ELK)."],
  ["Kubernetes", "What is the difference between a Service and an Endpoint?", "service-vs-endpoint", "Explain the relationship.", "A Service defines a logical set of Pods. An Endpoint resource lists the IP addresses and ports of the Pods that match the service's selector. When a service is created, an endpoint is automatically managed."],
  ["Kubernetes", "How does Kubernetes handle container liveness and readiness probes?", "liveness-readiness-probes", "Explain probes.", "Liveness probe checks if the container is alive. If it fails, the container is restarted. Readiness probe checks if the container is ready to serve traffic. If it fails, the container is removed from the service's endpoints."],
  ["Kubernetes", "What is the startup probe and when would you use it?", "startup-probe", "Explain the probe.", "Startup probe is used for slow-starting containers. It disables liveness and readiness probes until the startup probe succeeds. It is useful for containers that require a long initialization time."],
  ["Kubernetes", "How do you create a multi-container Pod and why would you use one?", "multi-container-pod", "Explain the use case.", "A multi-container Pod contains multiple containers that share the same network and storage. Use cases: sidecar containers (logging, monitoring), init containers (setup), and ambassadors."],
  ["Kubernetes", "What is an init container and how is it different from a regular container?", "init-container", "Explain setup containers.", "An init container runs before the main containers and must complete successfully before the main containers start. They are used for setup tasks (e.g., database schema migration)."],
  ["Kubernetes", "What is the difference between a PersistentVolume and a StorageClass?", "pv-vs-storageclass", "Explain the distinction.", "A PersistentVolume is a piece of storage provisioned by an administrator. A StorageClass defines a policy for dynamic provisioning of PersistentVolumes. StorageClass enables automated storage."],
  ["Kubernetes", "How do you implement a service mesh in Kubernetes?", "service-mesh-implementation", "Explain installation.", "Deploy a service mesh (e.g., Istio) which installs sidecar proxies (Envoy) into each Pod. The proxies handle traffic management, security, and observability. Use Istio's `VirtualService` and `DestinationRule` for routing."],
  ["Kubernetes", "What is the difference between an Ingress and a Gateway API?", "ingress-vs-gateway-api", "Compare the two.", "Ingress is the older API for HTTP routing. Gateway API is the newer, more extensible API that supports more protocols (HTTP, TCP, UDP) and provides better separation of roles (Gateway, Route, Backend)."],
  ["Kubernetes", "How do you handle DNS resolution for Services in a cluster?", "cluster-dns", "Explain CoreDNS.", "Kubernetes uses CoreDNS (or kube-dns) as the cluster DNS. It creates DNS records for Services (e.g., `my-svc.default.svc.cluster.local`) and Pods. The kubelet configures Pods to use the cluster DNS."],
  ["Kubernetes", "What is the role of the `kube-proxy` in service discovery?", "kube-proxy-discovery", "Explain its function.", "kube-proxy implements the Kubernetes service abstraction. It maintains network rules (iptables/IPVS) to route traffic to Pods. It is responsible for load balancing and service discovery."]
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Kubernetes concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade-offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Kubernetes commands without explaining the safety, performance, or operational trade-off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "Kubernetes" },
    update: { name: "Kubernetes", group: "Technology", description: "Kubernetes interview questions." },
    create: { name: "Kubernetes", slug: "kubernetes", group: "Technology", description: "Kubernetes interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "Java" } },
    update: {},
    create: { name: "Kubernetes", slug: "kubernetes", categoryId: category.id },
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
        tags: ["Kubernetes"],
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
        tags: ["Kubernetes"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Kubernetes questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");