import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- 200 Docker Interview Questions (Fresher to Advanced) ----
// ---- Categories ----
export const categories = [
  ["DOCKER", "DOCKER"]
] as const;

export const topics = [
  // ==================== DOCKER BASICS (25) ====================
  ["Docker", "What is Docker and how does it differ from traditional virtualization?", "docker-overview", "Explain containerization vs virtualization.", "Docker is a platform for developing, shipping, and running applications in containers. Unlike virtual machines (VMs) which run a full guest OS, containers share the host OS kernel, making them lightweight, fast, and portable. Docker uses OS-level virtualization to isolate processes."],
  ["Docker", "What is a container in Docker?", "docker-container", "Define a container.", "A container is a lightweight, standalone, executable package that includes everything needed to run a piece of software: code, runtime, system tools, libraries, and settings. It runs as an isolated process on the host operating system."],
  ["Docker", "What is a Docker image?", "docker-image", "Define a Docker image.", "A Docker image is a read-only template that contains the instructions for creating a container. It is a snapshot of a filesystem and environment. Images are built from a Dockerfile and can be stored in registries like Docker Hub."],
  ["Docker", "What is the difference between an image and a container?", "image-vs-container", "Clarify the distinction.", "An image is a static, immutable template (like a class). A container is a runnable instance of an image (like an object). Containers add a writable layer on top of the image. You can have many containers from the same image."],
  ["Docker", "What is a Docker registry?", "docker-registry", "Explain the repository service.", "A Docker registry is a service that stores and distributes Docker images. Docker Hub is the default public registry. Private registries (e.g., Amazon ECR, Azure Container Registry, Google Container Registry) can also be used."],
  ["Docker", "What is Docker Hub?", "docker-hub", "Explain the public registry.", "Docker Hub is a cloud-based registry service provided by Docker. It allows you to find, share, and store Docker images. It offers both public and private repositories."],
  ["Docker", "What is the Docker daemon?", "docker-daemon", "Explain the background service.", "The Docker daemon (`dockerd`) is a persistent background process that manages Docker objects: images, containers, networks, and volumes. It listens for API requests from the Docker client and handles container lifecycle."],
  ["Docker", "What is the Docker client?", "docker-client", "Explain the CLI tool.", "The Docker client (`docker`) is the primary interface to Docker. Users interact with the client via commands (e.g., `docker run`). The client communicates with the Docker daemon to execute commands."],
  ["Docker", "What is the difference between `docker run` and `docker start`?", "run-vs-start", "Compare the two commands.", "`docker run` creates and starts a new container from an image. `docker start` starts an existing stopped container. `run` is a combination of `create` and `start`."],
  ["Docker", "How do you list running containers?", "docker-ps", "Explain the command.", "Use `docker ps` to list running containers. Use `docker ps -a` to list all containers (including stopped). `docker ps -q` lists only container IDs."],
  ["Docker", "How do you stop a running container?", "docker-stop", "Explain the command.", "Use `docker stop <container-id>`. This sends a SIGTERM signal, allowing the container to clean up gracefully. If it doesn't stop, you can use `docker kill <container-id>` to force stop."],
  ["Docker", "How do you remove a container?", "docker-rm", "Explain the command.", "Use `docker rm <container-id>` to remove a stopped container. Use `docker rm -f` to remove a running container forcefully. Add `-v` to remove associated volumes."],
  ["Docker", "How do you remove an image?", "docker-rmi", "Explain the command.", "Use `docker rmi <image-id>` to remove an image. If it's in use by a container, you need to force (`-f`) or stop the container first. You can also use `docker image prune` to remove unused images."],
  ["Docker", "What is a Dockerfile?", "dockerfile", "Define the build file.", "A Dockerfile is a text file that contains instructions for building a Docker image. It specifies the base image, dependencies, environment variables, and commands to run. Each instruction creates a new layer in the image."],
  ["Docker", "What is the `FROM` instruction in a Dockerfile?", "dockerfile-from", "Explain the base image instruction.", "`FROM` sets the base image for subsequent instructions. It is the first line in most Dockerfiles. For example, `FROM ubuntu:latest` or `FROM node:18-alpine`."],
  ["Docker", "What is the `RUN` instruction in a Dockerfile?", "dockerfile-run", "Explain the command execution.", "`RUN` executes commands in a new layer on top of the current image and commits the result. It is used to install packages, set up dependencies, and perform build-time tasks. Each `RUN` creates a new layer."],
  ["Docker", "What is the `CMD` instruction in a Dockerfile?", "dockerfile-cmd", "Explain the default command.", "`CMD` provides defaults for an executing container. It can specify an executable, or if omitted, the default command is the one from the base image. Only one `CMD` per Dockerfile is effective; the last one wins."],
  ["Docker", "What is the difference between `CMD` and `ENTRYPOINT`?", "cmd-vs-entrypoint", "Compare the two instructions.", "`CMD` sets default arguments that can be overridden when running the container. `ENTRYPOINT` defines the main command that cannot be overridden (unless using `--entrypoint`). They can be used together: `ENTRYPOINT` for the executable, `CMD` for default arguments."],
  ["Docker", "What is the `EXPOSE` instruction in a Dockerfile?", "dockerfile-expose", "Explain port exposure.", "`EXPOSE` informs Docker that the container listens on the specified port at runtime. It does not publish the port; that is done with `-p` or `-P` during `docker run`. It serves as documentation and is used with `-P` for port mapping."],
  ["Docker", "What is the `ENV` instruction in a Dockerfile?", "dockerfile-env", "Explain environment variable setting.", "`ENV` sets environment variables in the image. They are available during build and at runtime. For example, `ENV NODE_ENV=production`."],
  ["Docker", "What is the `WORKDIR` instruction in a Dockerfile?", "dockerfile-workdir", "Explain working directory.", "`WORKDIR` sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions that follow. It creates the directory if it doesn't exist."],
  ["Docker", "What is the difference between `COPY` and `ADD` in a Dockerfile?", "copy-vs-add", "Compare the two instructions.", "`COPY` copies files/directories from the build context to the container. `ADD` does the same but also supports URL sources and automatic extraction of tar files. `COPY` is preferred for local file copying as it's more explicit and transparent."],
  ["Docker", "What is a Docker layer?", "docker-layer", "Explain the layer concept.", "A Docker image is composed of a series of layers, each representing a set of filesystem changes (e.g., from a `RUN` instruction). Layers are cached and reused between builds, reducing build time and storage. Each instruction in a Dockerfile creates a new layer."],
  ["Docker", "What is a Docker volume?", "docker-volume", "Define persistent storage.", "A Docker volume is a persistent data storage mechanism for containers. Volumes are independent of the container lifecycle and can be shared between containers. They are managed by Docker and are the preferred way to store data."],
  ["Docker", "What is the difference between a Docker volume and a bind mount?", "volume-vs-bind-mount", "Compare the two storage options.", "A bind mount mounts a host directory or file into the container. A volume is a managed storage area managed by Docker. Volumes are more portable, have better performance, and are easier to backup/migrate than bind mounts."],

  // ==================== DOCKERFILE & IMAGE BUILDING (20) ====================
  ["Docker", "How do you build a Docker image from a Dockerfile?", "docker-build", "Explain the build command.", "Use `docker build -t <image-name> .` to build an image from the Dockerfile in the current directory. The `-t` flag tags the image. You can also specify a Dockerfile with `-f`."],
  ["Docker", "What is a multi-stage build in Docker?", "multi-stage-build", "Explain the optimization technique.", "Multi-stage builds allow you to use multiple `FROM` statements in a Dockerfile. You can copy artifacts from one stage to another, enabling smaller final images by excluding build-time dependencies. It's ideal for compiled languages."],
  ["Docker", "What is the purpose of `.dockerignore`?", "dockerignore", "Explain the exclusion file.", "`.dockerignore` is similar to `.gitignore`. It specifies files and directories that should be excluded from the build context when running `docker build`. It reduces build time and avoids including sensitive or unnecessary files."],
  ["Docker", "How do you optimize the size of a Docker image?", "optimize-image-size", "List optimization strategies.", "Use a minimal base image (e.g., Alpine). Use multi-stage builds. Combine `RUN` commands to reduce layers. Remove unnecessary packages and caches. Use `--no-install-recommends` with apt. Use smaller dependencies."],
  ["Docker", "What is an `ARG` instruction in a Dockerfile?", "dockerfile-arg", "Explain build-time variables.", "`ARG` defines a variable that can be passed at build time via `--build-arg`. It is used to customize builds (e.g., different versions). They are not persisted in the final image unless `ENV` is used."],
  ["Docker", "What is the `HEALTHCHECK` instruction?", "dockerfile-healthcheck", "Explain health checks.", "`HEALTHCHECK` tells Docker how to test if a container is healthy. For example, `HEALTHCHECK --interval=30s CMD curl -f http://localhost/ || exit 1`. The status appears in `docker ps` and affects service orchestration."],
  ["Docker", "What is the `USER` instruction in a Dockerfile?", "dockerfile-user", "Explain running as non-root.", "`USER` sets the user name or UID to use when running the container. It improves security by avoiding running as root. For example, `USER node`."],
  ["Docker", "What is the `LABEL` instruction?", "dockerfile-label", "Explain metadata.", "`LABEL` adds metadata to an image (e.g., maintainer, version, description). It is used for organization and filtering. For example, `LABEL version=\"1.0\"`."],
  ["Docker", "What is the `ONBUILD` instruction?", "dockerfile-onbuild", "Explain triggers.", "`ONBUILD` registers a trigger instruction that is executed when the image is used as a base for another build. It's used to defer execution of instructions to the child build, useful for frameworks."],
  ["Docker", "What is the difference between `docker build` and `docker commit`?", "build-vs-commit", "Compare image creation methods.", "`docker build` creates an image from a Dockerfile. `docker commit` creates an image from an existing container's changes. `docker commit` is manual and less reproducible; `docker build` is preferred."],
  ["Docker", "How do you tag a Docker image?", "docker-tag", "Explain tagging.", "Use `docker tag <source-image> <target-image:tag>`. For example, `docker tag myapp:latest myrepo/myapp:v1`. Tags are used to version and identify images."],
  ["Docker", "How do you push an image to a registry?", "docker-push", "Explain the push command.", "First, tag your image appropriately (e.g., `docker tag myapp:latest username/repo:tag`). Then, `docker push username/repo:tag` to upload it to the registry. You must be logged in with `docker login`."],
  ["Docker", "How do you pull an image from a registry?", "docker-pull", "Explain the pull command.", "Use `docker pull <image-name>` to download an image from a registry. For example, `docker pull ubuntu:latest` or `docker pull myprivate.registry.com/myapp:v1`."],
  ["Docker", "What is the `--cache-from` option in `docker build`?", "cache-from", "Explain using external cache.", "`--cache-from` allows you to specify an image that Docker can use as a cache source during build. This is useful in CI/CD to reuse previous build layers from a remote registry, speeding up builds."],
  ["Docker", "What is the difference between `docker build` with and without `--no-cache`?", "no-cache", "Explain cache bypass.", "By default, `docker build` uses cached layers. `--no-cache` forces Docker to rebuild all layers without using cache, ensuring a clean build but taking longer."],
  ["Docker", "How do you view the history of an image?", "docker-history", "Explain the command.", "`docker history <image>` shows the layers of an image, their sizes, and the commands that created them. It helps understand image composition and optimize size."],
  ["Docker", "What is a base image and what are some common ones?", "base-image", "Give examples.", "A base image is the starting point for your Docker image. Common examples: `ubuntu`, `alpine`, `debian`, `node`, `python`, `openjdk`. Minimal base images like Alpine reduce image size."],
  ["Docker", "How do you reduce the number of layers in a Docker image?", "reduce-layers", "Explain layer consolidation.", "Combine multiple `RUN` commands into a single `RUN` using `&&` and chaining, e.g., `RUN apt-get update && apt-get install -y package && rm -rf /var/lib/apt/lists/*`. This reduces the number of layers and image size."],
  ["Docker", "What is the `SHELL` instruction in a Dockerfile?", "dockerfile-shell", "Explain shell change.", "`SHELL` changes the default shell used for the `RUN`, `CMD`, and `ENTRYPOINT` instructions. For example, `SHELL [\"powershell\", \"-Command\"]` on Windows."],
  ["Docker", "How do you set default environment variables in a Docker image?", "docker-env-default", "Explain using `ENV`.", "Use `ENV` in the Dockerfile. For example, `ENV DATABASE_URL=postgres://user:pass@host/db`. These are available at runtime unless overridden by `-e`."],

  // ==================== NETWORKING (15) ====================
  ["Docker", "What are the different network drivers in Docker?", "docker-network-drivers", "List the drivers.", "Docker provides: `bridge` (default), `host` (shares host network), `none` (no network), `overlay` (multi-host communication), and `macvlan` (assigns MAC addresses). Additionally, third-party plugins are available."],
  ["Docker", "What is the default Docker network?", "docker-default-network", "Explain the bridge network.", "The default network is `bridge`. Containers connected to this network can communicate with each other using IP addresses. It is isolated from the host network unless port mappings are used."],
  ["Docker", "How do you create a custom bridge network?", "docker-network-create", "Explain the command.", "`docker network create <network-name>` creates a bridge network. For example, `docker network create mynet`. You can then run containers with `--network mynet`."],
  ["Docker", "What is the difference between a bridge network and an overlay network?", "bridge-vs-overlay", "Compare the two.", "Bridge networks are for single-host communication. Overlay networks span multiple Docker daemons (swarm mode), enabling communication between containers on different hosts."],
  ["Docker", "What is a host network in Docker?", "host-network", "Explain the host network mode.", "`--network host` makes the container use the host's network stack directly. The container's ports are directly exposed on the host. This can improve performance but reduces isolation."],
  ["Docker", "What is the `none` network in Docker?", "none-network", "Explain isolation.", "`--network none` disables networking for the container. The container has only a loopback interface, useful for highly isolated workloads."],
  ["Docker", "How do you expose ports from a container?", "docker-expose-ports", "Explain the `-p` and `-P` flags.", "Use `-p <host-port>:<container-port>` to map a host port to a container port. Use `-P` to publish all exposed ports (from `EXPOSE` in Dockerfile) to random host ports."],
  ["Docker", "How do containers communicate with each other on the same bridge network?", "container-communication", "Explain network discovery.", "Containers on the same user-defined bridge network can resolve each other's names (container name) to IP addresses. They can communicate using the container name or IP."],
  ["Docker", "What is a Docker network alias?", "network-alias", "Explain the feature.", "A network alias is an alternative name for a container on a network. Set with `--network-alias` during `docker run`. It allows other containers to reach it using that alias."],
  ["Docker", "How do you connect a running container to a network?", "docker-network-connect", "Explain the command.", "Use `docker network connect <network> <container>` to attach a running container to an additional network. It can then communicate with other containers on that network."],
  ["Docker", "How do you disconnect a container from a network?", "docker-network-disconnect", "Explain the command.", "Use `docker network disconnect <network> <container>` to remove a container from a network."],
  ["Docker", "What is the difference between `EXPOSE` and `-p`?", "expose-vs-p", "Compare declaration vs mapping.", "`EXPOSE` in Dockerfile documents which ports the container listens on. It does not publish them. `-p` or `-P` in `docker run` actually maps ports to the host, making them accessible externally."],
  ["Docker", "How do you inspect the network configuration of a container?", "docker-inspect-network", "Explain the command.", "Use `docker inspect <container>` and look for the `NetworkSettings` section. Alternatively, `docker inspect -f '{{.NetworkSettings.IPAddress}}' <container>`."],
  ["Docker", "What is the use of the `--link` flag (deprecated)?", "docker-link", "Explain legacy linking.", "`--link` was used to connect containers and establish environment variables and name resolution. It is deprecated; user-defined networks are the preferred way."],
  ["Docker", "How do you set up load balancing in Docker?", "docker-load-balancing", "Explain using Swarm or external tools.", "In Docker Swarm, you can use `--publish mode=host` or `--publish mode=ingress` with a `docker service` to distribute traffic. External tools like Nginx or HAProxy can also be configured."],

  // ==================== VOLUMES & STORAGE (15) ====================
  ["Docker", "What are the types of Docker volumes?", "volume-types", "List the volume types.", "Types: named volumes, anonymous volumes, and bind mounts. Named volumes are managed by Docker and have a specific name. Anonymous volumes are automatically named. Bind mounts directly map host directories."],
  ["Docker", "How do you create a named volume?", "docker-volume-create", "Explain the command.", "Use `docker volume create <volume-name>` to create a named volume. You can then use it with `-v <volume-name>:<container-path>` when running a container."],
  ["Docker", "How do you share data between containers?", "share-data-containers", "Explain volume sharing.", "Mount the same volume to multiple containers. For example, `docker run -v shared_volume:/data container1` and `docker run -v shared_volume:/data container2`. Both can read/write the same data."],
  ["Docker", "What is a bind mount and when would you use it?", "bind-mount", "Explain the mounting type.", "A bind mount mounts a host file or directory into the container. Use `-v /host/path:/container/path`. It's useful for development (hot-reload) and sharing configuration files, but less portable than volumes."],
  ["Docker", "What is the difference between a volume and a bind mount in terms of management?", "volume-vs-bind-mgmt", "Compare management.", "Volumes are managed by Docker (backup, migration, removal). Bind mounts depend on the host filesystem and are not managed by Docker. Volumes are preferred for persistence."],
  ["Docker", "How do you backup and restore a Docker volume?", "volume-backup", "Explain backup strategies.", "To backup: run a container that mounts the volume and copies its content (e.g., `docker run --rm -v volume_name:/data -v $(pwd):/backup alpine cp -a /data /backup/`). To restore: copy files back into the volume using a similar method."],
  ["Docker", "What is a data container (or data-only container)?", "data-container", "Explain the pattern.", "A data container is a container that exists only to hold data volumes. It is usually stopped and used with `--volumes-from` to mount its volumes in other containers. This pattern is less common now with named volumes."],
  ["Docker", "How do you mount a directory from the host into a container using `--mount`?", "docker-mount", "Explain the `--mount` syntax.", "`--mount type=bind,source=/host/path,target=/container/path` is a more explicit alternative to `-v`. It is preferred for clarity."],
  ["Docker", "What is the `--volumes-from` flag?", "volumes-from", "Explain volume inheritance.", "`--volumes-from <container>` mounts all volumes from another container. It is used to share data between containers, especially with data containers."],
  ["Docker", "How do you see all volumes in Docker?", "docker-volume-ls", "Explain the command.", "`docker volume ls` lists all volumes. `docker volume ls -f dangling=true` lists unused volumes."],
  ["Docker", "How do you remove a volume?", "docker-volume-rm", "Explain the command.", "`docker volume rm <volume-name>` removes a volume. It will fail if the volume is in use. `docker volume prune` removes all unused volumes."],
  ["Docker", "What is the `--device` flag in Docker?", "docker-device", "Explain device access.", "`--device <host-device>` gives a container access to a host device (e.g., `/dev/ttyUSB0`). It is used for hardware interaction."],
  ["Docker", "How do you limit storage space for a container?", "storage-limit", "Explain storage quotas.", "You can use storage quotas with certain storage drivers (e.g., overlay2) by configuring `--storage-opt size=10G` in the Docker daemon or via `--storage-opt` when creating volumes."],
  ["Docker", "What is the difference between `COPY` and `VOLUME` in a Dockerfile?", "copy-vs-volume", "Compare image inclusion vs runtime mount.", "`COPY` adds files to the image at build time. `VOLUME` declares a mount point that can be used for persistent storage at runtime. It does not copy data."],
  ["Docker", "How do you use a volume in a Docker service (Swarm)?", "swarm-volume", "Explain service volumes.", "In Docker Swarm, you can use volumes with services via the `--mount` flag in `docker service create`. For example, `docker service create --mount type=volume,source=myvol,target=/data nginx`."],

  // ==================== DOCKER COMPOSE (15) ====================
  ["Docker", "What is Docker Compose?", "docker-compose", "Define the multi-container tool.", "Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file (`docker-compose.yml`) to configure services, networks, and volumes. A single command (`docker-compose up`) starts all services."],
  ["Docker", "What is the difference between Docker Compose and Docker Swarm?", "compose-vs-swarm", "Compare the two.", "Compose is for defining and running multi-container applications on a single host (or in development). Swarm is a container orchestration tool for clustering and managing containers across multiple hosts in production."],
  ["Docker", "What is the structure of a `docker-compose.yml` file?", "compose-structure", "Explain the YAML sections.", "The main sections: `version`, `services` (containers), `networks`, `volumes`, `configs`, and `secrets`. Each service defines image, build, ports, volumes, environment, etc."],
  ["Docker", "What does `docker-compose up -d` do?", "compose-up-d", "Explain detached mode.", "`docker-compose up -d` starts all services in detached mode (background). It builds images if they don't exist and creates networks/volumes."],
  ["Docker", "What is the purpose of `docker-compose down`?", "compose-down", "Explain stopping and cleanup.", "`docker-compose down` stops all services and removes containers, networks, and optionally volumes (`-v`). It is used to clean up the environment."],
  ["Docker", "How do you specify environment variables in Docker Compose?", "compose-env", "Explain the `environment` section.", "You can define environment variables in the `environment` section of a service: `environment: - NODE_ENV=production`. You can also use an `env_file` to load variables from a file."],
  ["Docker", "How do you override configuration in Docker Compose?", "compose-override", "Explain using multiple files.", "You can use multiple compose files: `docker-compose -f docker-compose.yml -f docker-compose.override.yml up`. The override file extends or overrides settings from the base file."],
  ["Docker", "What is the `depends_on` directive in Compose?", "depends-on", "Explain service dependencies.", "`depends_on` defines the startup order of services. For example, `depends_on: - db` ensures the db service starts before the app service. However, it does not wait for the service to be ready (use health checks for that)."],
  ["Docker", "What is the `restart` policy in Docker Compose?", "restart-policy", "Explain restart handling.", "The `restart` policy defines when containers should restart. Options: `no`, `always`, `on-failure`, `unless-stopped`. For example, `restart: always`."],
  ["Docker", "How do you scale a service in Docker Compose?", "compose-scale", "Explain scaling.", "Use `docker-compose up --scale service=3` to scale a service to 3 replicas. However, scaling in Compose is limited; Swarm or Kubernetes are better for production scaling."],
  ["Docker", "How do you see logs from Docker Compose services?", "compose-logs", "Explain the logs command.", "`docker-compose logs <service>` shows logs for a specific service. `docker-compose logs -f` follows logs in real-time. `docker-compose logs` shows all service logs."],
  ["Docker", "What is the `network_mode` in Compose?", "compose-network-mode", "Explain network modes.", "`network_mode` allows you to set the network mode for a service (e.g., `host`, `none`). In Docker Compose, you typically define custom networks in the `networks` section and attach services to them."],
  ["Docker", "How do you define a network in Docker Compose?", "compose-network", "Explain the `networks` section.", "You can define networks under `networks`. For example: `networks: mynet: driver: bridge`. Then attach services via `networks: - mynet`. This isolates services."],
  ["Docker", "What is the `configs` and `secrets` in Docker Compose (Swarm mode)?", "compose-configs-secrets", "Explain Swarm-specific features.", "`configs` and `secrets` are Swarm-specific resources. Configs store non-sensitive configuration; secrets store sensitive data. They are mounted as files in the container."],
  ["Docker", "What is the difference between `ports` and `expose` in Compose?", "compose-ports-vs-expose", "Explain the mapping.", "`ports` maps host ports to container ports (like `-p`). `expose` only declares which ports the container listens on (like `EXPOSE` in Dockerfile), but does not publish them."],

  // ==================== DOCKER SWARM & ORCHESTRATION (15) ====================
  ["Docker", "What is Docker Swarm?", "docker-swarm", "Define the orchestration tool.", "Docker Swarm is a native clustering and orchestration solution for Docker. It allows you to manage a group of Docker engines (nodes) as a single virtual system. It provides service discovery, scaling, and load balancing."],
  ["Docker", "What is the difference between a Docker Swarm manager and a worker node?", "swarm-manager-vs-worker", "Explain node roles.", "Manager nodes manage the Swarm cluster, handle orchestration, and maintain cluster state. Worker nodes run the containerized services. Managers can also run workloads."],
  ["Docker", "How do you initialize a Docker Swarm?", "swarm-init", "Explain the command.", "Use `docker swarm init` on the first manager node. It generates a join token for other nodes. For example, `docker swarm init --advertise-addr <manager-ip>`."],
  ["Docker", "How do you join a worker node to a Swarm?", "swarm-join", "Explain the command.", "Use `docker swarm join --token <worker-token> <manager-ip>:2377` on the worker node. The token can be obtained from the manager with `docker swarm join-token worker`."],
  ["Docker", "What is a service in Docker Swarm?", "swarm-service", "Define the deployment unit.", "A service is the definition of the tasks to execute on the Swarm. It specifies the image, replicas, networks, ports, etc. Services are long-running processes."],
  ["Docker", "What is a task in Docker Swarm?", "swarm-task", "Explain the atomic unit.", "A task is a container that is scheduled on a node. Each task is an instance of a service. Tasks are created and managed by the Swarm scheduler."],
  ["Docker", "How do you deploy a service in Docker Swarm?", "swarm-service-create", "Explain the command.", "Use `docker service create --name myapp --replicas 3 -p 80:80 nginx` to create a service with 3 replicas. The Swarm schedules containers on available nodes."],
  ["Docker", "How do you scale a service in Docker Swarm?", "swarm-service-scale", "Explain scaling.", "Use `docker service scale <service>=<replicas>` to scale up/down. For example, `docker service scale myapp=5`."],
  ["Docker", "What is a rolling update in Docker Swarm?", "swarm-rolling-update", "Explain the update strategy.", "A rolling update gradually updates containers to a new image version. Use `docker service update --image new-image myapp` with `--update-parallelism` and `--update-delay` to control the update process."],
  ["Docker", "How do you rollback a service update in Swarm?", "swarm-rollback", "Explain rollback.", "Use `docker service update --rollback myapp` to revert to the previous version. Swarm keeps the previous service definition."],
  ["Docker", "What is a Swarm stack?", "swarm-stack", "Explain deploying compose in Swarm.", "A stack is a group of services defined in a Compose file (version 3+). Use `docker stack deploy -c docker-compose.yml mystack` to deploy a stack in Swarm mode."],
  ["Docker", "What is the difference between `docker service` and `docker run`?", "service-vs-run", "Compare single vs swarm commands.", "`docker run` runs a container on a single node. `docker service` is used in Swarm mode to manage a cluster-wide, replicated service."],
  ["Docker", "How do you inspect the status of a Swarm service?", "swarm-service-inspect", "Explain the command.", "Use `docker service ps <service>` to list tasks (containers) for a service across nodes. Use `docker service inspect <service>` for detailed configuration."],
  ["Docker", "What is the `--publish mode=ingress` in Swarm services?", "swarm-ingress", "Explain the routing mesh.", "`--publish mode=ingress` publishes the service port on all nodes. Traffic is routed to the appropriate container via the Swarm routing mesh. `mode=host` publishes only on the node running the service."],
  ["Docker", "What is the role of the `docker node` commands?", "docker-node", "Explain node management.", "`docker node ls` lists nodes. `docker node update --availability drain <node>` drains a node (moves tasks away). `docker node inspect <node>` shows details."],

  // ==================== SECURITY (15) ====================
  ["Docker", "What are the security considerations when running Docker?", "docker-security", "List best practices.", "Run containers as non-root (`USER`). Use minimal base images. Scan images for vulnerabilities. Use secrets management (not env vars for secrets). Use read-only root filesystems (`--read-only`). Limit container capabilities (`--cap-drop`)."],
  ["Docker", "How do you run a container as a non-root user?", "non-root-user", "Explain the `USER` instruction.", "In Dockerfile, add `USER <username>` after creating the user. For example, `RUN useradd -m appuser && USER appuser`. At runtime, you can also use `--user`."],
  ["Docker", "What is `--cap-drop` and `--cap-add`?", "docker-capabilities", "Explain Linux capabilities.", "Containers run with a limited set of Linux capabilities. `--cap-drop` removes capabilities, `--cap-add` adds them. Dropping all and adding only necessary ones (e.g., `NET_ADMIN`) improves security."],
  ["Docker", "What is the `--security-opt` flag?", "security-opt", "Explain security options.", "`--security-opt` allows setting security options like `no-new-privileges` (prevents privilege escalation) or `seccomp` profiles. For example, `--security-opt=no-new-privileges:true`."],
  ["Docker", "What is Docker Content Trust?", "docker-content-trust", "Explain image signing.", "Docker Content Trust (DCT) enables image signing and verification. When enabled (`export DOCKER_CONTENT_TRUST=1`), Docker pulls only signed images, preventing tampering."],
  ["Docker", "What is the difference between a secret and an environment variable in Docker?", "secret-vs-env", "Compare security.", "Secrets are encrypted and only available to services that need them. Environment variables are visible in the container and can be exposed in logs. Secrets are more secure."],
  ["Docker", "How do you manage secrets in Docker Swarm?", "swarm-secrets", "Explain secret management.", "Use `echo \"password\" | docker secret create mysecret -` to create a secret. In a service, mount it: `--secret mysecret`. The secret appears as a file in `/run/secrets/`."],
  ["Docker", "What is the `--read-only` flag?", "read-only-root", "Explain the option.", "`--read-only` mounts the container's root filesystem as read-only. This prevents writes to the container's filesystem, improving security. Use volumes for writable directories."],
  ["Docker", "What is AppArmor and how does it relate to Docker?", "apparmor-docker", "Explain the security profile.", "AppArmor is a Linux security module that restricts programs' capabilities. Docker can load an AppArmor profile with `--security-opt apparmor=<profile>`. It adds an extra layer of isolation."],
  ["Docker", "What is a seccomp profile?", "seccomp", "Explain system call filtering.", "seccomp (secure computing mode) restricts the system calls a process can make. Docker uses a default seccomp profile that denies many dangerous syscalls. You can customize it with `--security-opt seccomp=<profile.json>`."],
  ["Docker", "How do you scan a Docker image for vulnerabilities?", "scan-image", "Explain scanning tools.", "Use `docker scan` (with Snyk) or `trivy image <image>`, `clair`, `anchore`. These tools check for known vulnerabilities in packages and dependencies."],
  ["Docker", "What is the principle of least privilege in Docker?", "least-privilege-docker", "Explain the security principle.", "Run containers with the minimum required privileges: avoid root, drop unnecessary capabilities, mount read-only where possible, and use minimal base images. This limits attack surface."],
  ["Docker", "How do you isolate networks in Docker?", "isolate-networks", "Explain network segmentation.", "Use separate Docker networks for different services (e.g., frontend, backend). Use `network` with `internal: true` to prevent external access. Use firewall rules to control traffic."],
  ["Docker", "What is the `docker trust` command?", "docker-trust", "Explain content trust operations.", "`docker trust` manages image signing and verification. Commands: `docker trust sign` to sign an image, `docker trust inspect` to view signatures."],
  ["Docker", "How do you configure Docker daemon for secure remote access?", "docker-remote-security", "Explain TLS configuration.", "Enable TLS authentication: generate CA, server, and client certificates. Configure `dockerd` with `--tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem -H=0.0.0.0:2376`. Client uses `--tlsverify` with the keys."],

  // ==================== DOCKER & CI/CD (10) ====================
  ["Docker", "How do you use Docker in a CI/CD pipeline?", "docker-cicd", "Explain integration.", "CI/CD pipelines can build Docker images, run tests inside containers, push images to registries, and deploy containers to environments. Tools like Jenkins, GitLab CI, GitHub Actions, and CircleCI support Docker."],
  ["Docker", "How do you cache Docker layers in CI/CD?", "docker-cache", "Explain layer caching.", "Use `--cache-from` to pull previous image and use it as cache. In GitHub Actions, use `docker/build-push-action` with `cache-from` and `cache-to`. Also, order instructions carefully to maximize cache reuse."],
  ["Docker", "What is the `docker buildx` command?", "docker-buildx", "Explain multi-platform builds.", "`docker buildx` is a CLI plugin for advanced build features like building multi-platform images (e.g., `linux/arm64`, `linux/amd64`). It uses BuildKit."],
  ["Docker", "What is BuildKit and how does it improve builds?", "buildkit", "Explain the modern build engine.", "BuildKit is a new build engine that provides better performance, caching, and parallelization. It supports features like mount caching, secret handling, and multi-platform builds. It is enabled by default in newer Docker versions."],
  ["Docker", "How do you build a multi-platform image with Docker?", "multi-platform-build", "Explain using buildx.", "Use `docker buildx create --use`, then `docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest . --push`. This builds and pushes images for multiple architectures."],
  ["Docker", "What is the `--squash` flag in `docker build`?", "docker-squash", "Explain image squashing.", "`--squash` collapses all layers into a single layer, reducing image size. It is experimental and can be used with `docker build --squash` (requires experimental features enabled)."],
  ["Docker", "How do you use Docker with GitHub Actions?", "docker-github-actions", "Explain integration.", "GitHub Actions has built-in support for Docker. You can use the `docker` action to build and push images to registries. Example workflow uses `docker/build-push-action`."],
  ["Docker", "How do you run tests inside a Docker container in CI?", "docker-test-ci", "Explain the process.", "Use `docker run --rm -v $(pwd):/app my-test-image` to run tests. The container has the test environment, and results can be output to the host."],
  ["Docker", "What is the `DOCKER_HOST` environment variable?", "docker-host", "Explain remote Docker connection.", "`DOCKER_HOST` sets the address of the Docker daemon. For example, `export DOCKER_HOST=tcp://remote-host:2375`. Used to connect to a remote Docker daemon from CI/CD."],
  ["Docker", "How do you avoid storing secrets in Docker images?", "avoid-secrets", "Explain best practices.", "Use environment variables at runtime (`-e`), not in Dockerfile. Use secrets management (e.g., Docker secrets, HashiCorp Vault). Use multi-stage builds to avoid leaving secrets in final image (e.g., copy only binaries)."],

  // ==================== ADVANCED DOCKER (15) ====================
  ["Docker", "What is the difference between Docker and containerd?", "docker-vs-containerd", "Compare the two.", "containerd is a container runtime that manages the complete container lifecycle (pulling images, running containers). Docker uses containerd as its runtime (since Docker 1.11). Docker includes additional features: build, CLI, network, volumes, orchestration."],
  ["Docker", "What is the `--hostname` flag in `docker run`?", "docker-hostname", "Explain hostname setting.", "`--hostname <name>` sets the container's hostname. This is useful for applications that rely on hostname or for network identification."],
  ["Docker", "What is the `--dns` flag?", "docker-dns", "Explain DNS configuration.", "`--dns <ip>` sets a custom DNS server for the container. You can specify multiple DNS servers. Useful for private networks or custom DNS resolution."],
  ["Docker", "How do you limit CPU and memory usage in a container?", "docker-resource-limits", "Explain `--cpus` and `--memory`.", "Use `--cpus=\"0.5\"` to limit to half a CPU core. Use `--memory=\"512m\"` to limit memory to 512 MB. You can also set `--memory-swap` and `--cpu-shares`."],
  ["Docker", "What is the `--restart` policy in Docker?", "docker-restart-policy", "Explain the restart policies.", "Options: `no`, `always`, `on-failure`, `unless-stopped`. For example, `--restart always` restarts a container if it exits. `on-failure` restarts only if the exit code is non-zero."],
  ["Docker", "What is a Docker pause and unpause?", "docker-pause", "Explain container suspension.", "`docker pause` suspends all processes in a container (freezes them). `docker unpause` resumes them. This is useful for debugging or temporary suspension, but does not free resources."],
  ["Docker", "What is the difference between `docker kill` and `docker stop`?", "kill-vs-stop", "Compare termination signals.", "`docker stop` sends SIGTERM (graceful shutdown), waits for a timeout, then SIGKILL. `docker kill` sends SIGKILL immediately, forcefully terminating the container."],
  ["Docker", "How do you update a running container's configuration?", "update-container", "Explain live configuration changes.", "Some options can be updated with `docker update` (e.g., `--cpus`, `--memory`, `--restart`). However, many changes require recreating the container."],
  ["Docker", "What is the `docker diff` command?", "docker-diff", "Explain filesystem changes.", "`docker diff <container>` shows changes to the filesystem since the container was started (A: added, C: changed, D: deleted). It helps inspect what files are modified."],
  ["Docker", "How do you get a shell inside a running container?", "docker-exec", "Explain the command.", "Use `docker exec -it <container> /bin/bash` to start an interactive shell. This is the primary method for debugging running containers."],
  ["Docker", "What is the `docker logs` command?", "docker-logs", "Explain viewing logs.", "`docker logs <container>` displays the STDOUT and STDERR from the container. Use `-f` to follow logs. For detailed log management, configure the logging driver (e.g., json-file, syslog, fluentd)."],
  ["Docker", "What is the difference between `docker logs` and `docker attach`?", "logs-vs-attach", "Compare the two.", "`docker logs` retrieves past logs. `docker attach` connects to the running container's console, allowing interactive input and output. Use `docker attach` to interact with a running process."],
  ["Docker", "How do you copy files between the host and a container?", "docker-cp", "Explain the command.", "`docker cp <container>:<path> <host-path>` copies files from container to host. Reverse: `docker cp <host-path> <container>:<path>`. Useful for transferring configuration files or debugging."],
  ["Docker", "What is the `--privileged` flag in Docker?", "docker-privileged", "Explain the flag.", "`--privileged` gives the container almost all capabilities of the host and access to devices. It is highly insecure and should be avoided. Use specific `--cap-add` instead."],
  ["Docker", "How do you check the version of Docker?", "docker-version", "Explain the command.", "`docker version` shows the version of Docker client and daemon. `docker info` shows detailed system information, including the number of containers, images, and storage driver."],

  // ==================== TROUBLESHOOTING & SCENARIOS (15) ====================
  ["Docker", "A container is not starting. How do you troubleshoot?", "container-not-starting", "Explain diagnostic steps.", "1. Check `docker ps -a` to see the container status. 2. View logs: `docker logs <container>`. 3. If logs don't help, run the container with an interactive shell: `docker run -it <image> /bin/sh` to manually test commands. 4. Check Dockerfile for errors (e.g., missing CMD)."],
  ["Docker", "You get 'port already allocated' error. How do you fix it?", "port-already-allocated", "Explain resolution.", "Find the container using the port: `docker ps -f \"publish=<port>\"` or `netstat -tulpn | grep <port>`. Stop or remove that container. Or, change the host port mapping."],
  ["Docker", "How do you clean up unused Docker objects?", "docker-prune", "Explain pruning commands.", "Use `docker system prune -a` to remove all unused containers, networks, images, and build cache. Add `-f` to force without prompt. Use `docker volume prune` to remove unused volumes."],
  ["Docker", "What should you do if your Docker image is too large?", "image-too-large", "Explain reduction strategies.", "Use smaller base images (Alpine). Remove unnecessary packages. Use multi-stage builds. Combine RUN commands. Use `--no-cache` to avoid cache bloat. Use `docker slim` or analyze layers with `dive`."],
  ["Docker", "How do you inspect a Docker image to see its layers?", "inspect-layers", "Explain `docker history` and `dive`.", "`docker history <image>` shows layers and their sizes. For detailed analysis, use `dive <image>` to see layer contents and identify large files."],
  ["Docker", "A container is consuming 100% CPU. How do you debug?", "docker-high-cpu", "Explain diagnostics.", "1. `docker stats <container>` to confirm CPU usage. 2. Enter the container: `docker exec -it <container> bash`. 3. Use `top` or `ps aux` to find the high-CPU process. 4. Investigate the application code or dependencies."],
  ["Docker", "How do you pass environment variables to a container?", "docker-env-var", "Explain the `-e` flag.", "Use `-e VAR_NAME=value`. For example, `docker run -e MY_VAR=hello alpine`. You can also use `--env-file` to load multiple variables from a file."],
  ["Docker", "How do you keep a container running for debugging?", "docker-debug", "Explain running with a sleep command.", "Run the container with `--entrypoint /bin/sh` or override CMD: `docker run -it <image> /bin/bash`. If you need it to stay running, use `tail -f /dev/null`."],
  ["Docker", "How do you mount a file into a container without copying it?", "mount-file", "Explain bind mount.", "Use a bind mount: `-v /host/path/file.txt:/container/path/file.txt`. The host file is visible in the container. Changes are reflected immediately."],
  ["Docker", "What is the `--add-host` flag?", "add-host", "Explain host entry addition.", "`--add-host host:IP` adds a custom host entry to the container's `/etc/hosts` file. Useful for local name resolution."],
  ["Docker", "How do you run a Docker container in the background?", "docker-run-background", "Explain the `-d` flag.", "Use `docker run -d <image>` to start a container in detached mode (background). It prints the container ID. Use `docker logs` to view its output."],
  ["Docker", "How do you rename a container?", "docker-rename", "Explain the command.", "Use `docker rename <old-name> <new-name>`. The container keeps its ID but gets a new name for easier reference."],
  ["Docker", "How do you compare two Docker images?", "compare-images", "Explain tools.", "Use `docker diff` on containers from images. Use `docker image inspect` to compare metadata. Third-party tools like `containers` can show differences in layers."],
  ["Docker", "What is the purpose of `docker checkpoint`?", "docker-checkpoint", "Explain experimental feature.", "`docker checkpoint` creates a checkpoint of a running container (snapshot), which can be restored later. It is experimental and requires CRIU support."],
  ["Docker", "How do you set up a local Docker registry?", "local-registry", "Explain using the registry image.", "Run `docker run -d -p 5000:5000 --name registry registry:2`. Then tag your image: `docker tag myapp localhost:5000/myapp`. Push: `docker push localhost:5000/myapp`."]
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Docker concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade-offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Docker commands without explaining the safety, performance, or operational trade-off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "docker" },
    update: { name: "Docker", group: "Technology", description: "Docker interview questions." },
    create: { name: "Docker", slug: "docker", group: "Technology", description: "Docker interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "docker" } },
    update: {},
    create: { name: "Docker", slug: "docker", categoryId: category.id },
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
        tags: ["docker"],
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
        tags: ["docker"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Docker questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");