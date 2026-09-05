// ---- 200 Linux System Engineering Questions (Fresher to Advanced) ----
// ---- 200 Kubernetes Interview Questions (Fresher to Advanced) ----
// ---- 200 Java Developer Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- 200 Docker Interview Questions (Fresher to Advanced) ----
// ---- Categories ----
export const categories = [
  ["Linux", "Linux"]
] as const;

// ---- 200 Git & GitHub Interview Questions (Fresher to Advanced) ----
export const topics = [
  // ==================== CORE LINUX CONCEPTS (Easy) ====================
  ["Linux", "What is Linux and how is it different from Unix?", "linux-vs-unix", "Explain the history and key differences.", "Linux is a free, open-source Unix-like operating system kernel. Unlike traditional Unix, Linux is not derived from the original AT&T Unix code. It was developed by Linus Torvalds and is distributed under the GPL, making it freely available and modifiable."],
  ["Linux", "Explain the Linux boot process from power-on to login prompt.", "linux-boot-process", "Describe each stage of the boot sequence.", "1. BIOS/UEFI initializes hardware and loads the bootloader (GRUB). 2. GRUB loads the kernel and initial RAM disk (initrd). 3. The kernel mounts the root filesystem and starts the `init` process (PID 1). 4. Systemd (or SysV init) starts all user-space services. 5. A login prompt (getty) is presented."],
  ["Linux", "What is the difference between a hard link and a soft (symbolic) link?", "hard-link-vs-soft-link", "Explain inode vs pathname linking.", "A hard link is a direct reference to an inode; it points to the same data blocks as the original file. A soft link (symbolic link) is a separate file that points to the pathname of another file. Hard links cannot span filesystems; soft links can."],
  ["Linux", "Explain Linux file permissions. What do `rwx` mean for files and directories?", "file-permissions", "Describe read, write, and execute permissions.", "For files: `r` = read content, `w` = modify content, `x` = execute the file. For directories: `r` = list contents, `w` = create/delete files, `x` = enter the directory."],
  ["Linux", "What is the `umask` command and how does it affect file creation?", "umask", "Explain default permission masking.", "`umask` sets the default permissions for newly created files and directories. It subtracts the umask value from the base permissions (666 for files, 777 for directories). For example, a umask of 022 results in file permissions of 644."],
  ["Linux", "What is an inode in Linux?", "inode", "Explain the data structure storing file metadata.", "An inode (index node) is a data structure that stores metadata about a file (size, permissions, timestamps, pointers to data blocks). It does not store the filename. Each file has a unique inode number."],
  ["Linux", "How do you check disk space usage in Linux?", "check-disk-space", "List the common commands.", "`df -h` shows filesystem disk space usage in human-readable format. `du -sh /path` shows the size of a specific directory. `ncdu` provides an interactive interface for disk usage analysis."],
  ["Linux", "How do you find a file in Linux?", "find-file", "Explain the `find` and `locate` commands.", "`find / -name filename -type f` searches the entire filesystem for a file by name. `locate filename` uses a pre-built database for faster searching (updated via `updatedb`)."],
  ["Linux", "What is the difference between a process and a thread?", "process-vs-thread", "Explain the fundamental differences.", "A process is an independent program in execution with its own memory space. A thread is a lightweight unit of execution within a process, sharing the process's memory space. Threads are more efficient for concurrent tasks."],
  ["Linux", "What is the difference between `kill` and `kill -9`?", "kill-vs-kill-9", "Explain signal handling.", "`kill` sends a SIGTERM (15) signal, allowing the process to clean up and exit gracefully. `kill -9` sends a SIGKILL (9) signal, which forcibly terminates the process immediately without cleanup."],
  ["Linux", "How do you check running processes in Linux?", "check-processes", "List the common commands.", "`ps aux` shows all running processes. `top` or `htop` provides a real-time interactive view of processes and system resource usage. `pstree` displays processes in a tree hierarchy."],
  ["Linux", "What is the `cron` utility and how do you use it?", "cron", "Explain scheduled job execution.", "`cron` is a time-based job scheduler. Users can schedule jobs using `crontab -e`. The syntax is: `min hour day month day-of-week command`."],
  ["Linux", "How do you check network connectivity in Linux?", "check-network-connectivity", "List the common commands.", "`ping` tests connectivity to a remote host. `traceroute` shows the path packets take to a destination. `ss` or `netstat` displays socket statistics and listening ports."],
  ["Linux", "What is the purpose of the `/etc/passwd` and `/etc/shadow` files?", "passwd-shadow", "Explain user authentication files.", "`/etc/passwd` stores user account information (username, UID, GID, home directory, shell) but historically contained hashed passwords. `/etc/shadow` stores encrypted passwords and password aging information, with stricter permissions (readable only by root)."],
  ["Linux", "What is the `sudo` command and how is it configured?", "sudo", "Explain privilege escalation.", "`sudo` allows authorized users to execute commands as another user (typically root). It is configured in `/etc/sudoers` using the `visudo` command. Entries specify which users/groups can run which commands on which hosts."],

  // ==================== FILESYSTEMS & STORAGE (Medium) ====================
  ["Linux", "What are the differences between ext2, ext3, and ext4 filesystems?", "ext2-ext3-ext4", "Compare the filesystem versions.", "ext2 is the basic filesystem with no journaling. ext3 adds journaling (metadata and data) for improved recoverability after crashes. ext4 adds larger file/volume sizes, extents, delayed allocation, and better performance."],
  ["Linux", "Explain the concept of journaling in Linux filesystems.", "journaling", "Describe how journaling works.", "Journaling is a technique where filesystem changes are first written to a log (journal) before being committed to the main filesystem. In case of a crash, the journal can be replayed to recover the filesystem to a consistent state, avoiding lengthy `fsck` runs."],
  ["Linux", "What is LVM (Logical Volume Manager) and why is it used?", "lvm", "Explain flexible storage management.", "LVM provides a layer of abstraction between physical storage devices and filesystems. It allows for dynamic resizing of logical volumes, snapshots, and striping. Components include Physical Volumes (PV), Volume Groups (VG), and Logical Volumes (LV)."],
  ["Linux", "How do you increase the size of an LVM partition?", "lvm-resize", "Explain the steps to resize a logical volume.", "1. Extend the physical volume (`pvresize`). 2. Extend the logical volume (`lvextend -L +size /dev/vg/lv`). 3. Resize the filesystem (`resize2fs` for ext4, `xfs_growfs` for XFS) to use the new space."],
  ["Linux", "What is a swap partition and how does it work?", "swap-partition", "Explain virtual memory swapping.", "Swap is a space on disk used as an extension of RAM. When physical memory is full, inactive memory pages are moved to swap. It prevents out-of-memory errors but is slower than RAM. The `swapon` and `swapoff` commands manage swap."],
  ["Linux", "Explain the difference between RAID 0, RAID 1, RAID 5, and RAID 10.", "raid-levels", "Compare the RAID levels.", "RAID 0: Striping (no redundancy, increased performance). RAID 1: Mirroring (full redundancy, reduced capacity). RAID 5: Striping with distributed parity (good performance and fault tolerance). RAID 10: Striping of mirrors (combines performance and redundancy)."],
  ["Linux", "What is the `/proc` filesystem and what is it used for?", "proc-filesystem", "Explain the virtual filesystem.", "`/proc` is a virtual filesystem that provides a file-based interface to kernel data structures. It contains runtime system information (e.g., `/proc/cpuinfo`, `/proc/meminfo`, `/proc/[pid]/` for process details). It is used for monitoring and tuning."],
  ["Linux", "What is the `/sys` filesystem and how does it differ from `/proc`?", "sys-filesystem", "Explain the sysfs virtual filesystem.", "`/sys` is a virtual filesystem (sysfs) that exposes information about kernel objects, devices, and drivers. Unlike `/proc`, which focuses on processes and general system info, `/sys` is more structured and used for device management and power management."],
  ["Linux", "How do you mount and unmount filesystems in Linux?", "mount-umount", "Explain the mount commands.", "`mount /dev/sdb1 /mnt` mounts a filesystem to a directory. `umount /mnt` unmounts it. `mount -o ro` mounts read-only. `df -h` shows mounted filesystems. `/etc/fstab` defines filesystems to be mounted at boot."],
  ["Linux", "What is an extended filesystem attribute and how do you view them?", "extended-attributes", "Explain `xattr`.", "Extended attributes (`xattr`) allow attaching metadata to files beyond the standard permission model. They are viewed with `getfattr` and set with `setfattr`. Common use cases include SELinux contexts and security labels."],

  // ==================== NETWORKING (Medium) ====================
  ["Linux", "Explain the OSI model and how TCP/IP maps to it.", "osi-model", "Describe the 7-layer model.", "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP maps to this: Network Interface (L1-2), Internet (L3), Transport (L4), and Application (L5-7)."],
  ["Linux", "What is the difference between TCP and UDP?", "tcp-vs-udp", "Compare the transport protocols.", "TCP is connection-oriented, reliable, and ensures ordered delivery (used for HTTP, SSH). UDP is connectionless, unreliable, and faster (used for DNS, streaming, VoIP)."],
  ["Linux", "How does ARP (Address Resolution Protocol) work?", "arp", "Explain how IP addresses are resolved to MAC addresses.", "ARP resolves an IP address to a physical MAC address on a local network. A host broadcasts an ARP request asking 'Who has this IP?'. The owner replies with its MAC address, which is cached in the ARP table (`arp -a`)."],
  ["Linux", "What is the purpose of `/etc/hosts` and `/etc/resolv.conf`?", "hosts-resolv", "Explain local DNS resolution.", "`/etc/hosts` is a local static mapping of hostnames to IP addresses, checked before DNS. `/etc/resolv.conf` specifies DNS nameservers and search domains for domain name resolution."],
  ["Linux", "How do you check listening ports and associated processes in Linux?", "check-listening-ports", "List the common commands.", "`ss -tulpn` shows all listening TCP/UDP ports with process information. `netstat -tulpn` is the older alternative. `lsof -i :port` shows the process using a specific port."],
  ["Linux", "What is the purpose of the loopback interface (`lo`)?", "loopback-interface", "Explain the virtual network interface.", "The loopback interface (127.0.0.1) is a virtual network interface that allows a system to communicate with itself. It is used for testing and for services that need to bind to a local address."],
  ["Linux", "Explain how `iptables`/`nftables` work.", "iptables-nftables", "Describe the Linux firewall.", "`iptables` (and its successor `nftables`) is a userspace utility for configuring the Linux kernel netfilter firewall. It uses chains of rules to filter, NAT, and mangle packets. `nftables` offers a simpler syntax and better performance."],
  ["Linux", "How do you troubleshoot a server that is unreachable over the network?", "troubleshoot-unreachable", "Walk through diagnostic steps.", "1. Check local network configuration (`ip a`, `ping 127.0.0.1`). 2. Verify default gateway (`ip r`). 3. Check DNS resolution (`nslookup`). 4. Check firewall rules (`iptables -L`). 5. Check if the service is listening (`ss -tulpn`). 6. Check remote connectivity (`traceroute`, `mtr`)."],
  ["Linux", "What is the difference between a public and private IP address?", "public-vs-private-ip", "Explain IP address ranges.", "Public IP addresses are globally routable on the internet. Private IP addresses (e.g., 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used within local networks and are not routable on the internet. NAT translates private to public addresses."],
  ["Linux", "How does DHCP work in Linux?", "dhcp", "Explain dynamic IP assignment.", "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network configuration to clients. The client broadcasts a DHCPDISCOVER, the server offers an IP (DHCPOFFER), the client requests it (DHCPREQUEST), and the server acknowledges (DHCPACK)."],

  // ==================== SECURITY (Medium) ====================
  ["Linux", "How do you secure a newly provisioned Linux server?", "secure-server", "List the initial hardening steps.", "1. Update the system (`apt update && apt upgrade` or `yum update`). 2. Disable unnecessary services. 3. Configure firewall (`ufw` or `firewalld`). 4. Disable root SSH login and use key-based authentication. 5. Enable SELinux or AppArmor. 6. Set up fail2ban. 7. Regularly apply security patches."],
  ["Linux", "What is SELinux and how does it work?", "selinux", "Explain mandatory access control.", "SELinux (Security-Enhanced Linux) is a Linux kernel module that provides Mandatory Access Control (MAC). It enforces security policies that define which processes can access which files, directories, and ports. It operates in three modes: Enforcing, Permissive, and Disabled."],
  ["Linux", "What is the `setuid` bit and how does it work?", "setuid", "Explain special file permissions.", "The `setuid` bit (e.g., `chmod u+s`) allows a program to run with the permissions of its owner (usually root) rather than the user executing it. Common examples include `passwd` (which needs to write to `/etc/shadow`) and `sudo`."],
  ["Linux", "What is Fail2ban and how is it used?", "fail2ban", "Explain brute-force protection.", "Fail2ban is an intrusion prevention tool that monitors log files (e.g., `/var/log/auth.log`) for repeated failed login attempts. It then temporarily bans the offending IP addresses using firewall rules (`iptables` or `firewalld`)."],
  ["Linux", "What is SSH key-based authentication and why is it more secure than passwords?", "ssh-keys", "Explain public-key cryptography for SSH.", "SSH key authentication uses a public/private key pair. The public key is placed on the server. The client proves possession of the private key during authentication. It is more secure than passwords because it is resistant to brute-force attacks and does not transmit secrets over the network."],
  ["Linux", "What is the difference between `useradd` and `adduser`?", "useradd-vs-adduser", "Compare the user creation commands.", "`useradd` is the low-level utility for adding users (available on all distributions). `adduser` is a friendlier, interactive front-end to `useradd` (typically found on Debian-based systems) that creates home directories and sets default configurations."],
  ["Linux", "What is a chroot jail and when would you use it?", "chroot", "Explain process isolation.", "`chroot` changes the root directory for a running process and its children. It is used to isolate a process from the rest of the system, often for security (e.g., running a service in a restricted environment)."],
  ["Linux", "How do you audit user activity on a Linux system?", "audit-user-activity", "Explain logging and auditing tools.", "Use `auditd` (the Linux Auditing System) to log system calls and file accesses. `ausearch` and `aureport` help analyze audit logs. The `last` command shows login history. `journalctl -u sshd` shows SSH login attempts."],
  ["Linux", "What is the purpose of PAM (Pluggable Authentication Modules)?", "pam", "Explain the authentication framework.", "PAM is a modular authentication framework that allows system administrators to choose how applications authenticate users. It is configured in `/etc/pam.d/` and supports various authentication methods (e.g., passwords, LDAP, fingerprint)."],
  ["Linux", "What are the best practices for managing SSH access?", "ssh-best-practices", "List security recommendations for SSH.", "Disable root login (`PermitRootLogin no`). Use key-based authentication only (`PasswordAuthentication no`). Change the default SSH port (22 to a higher port). Use `AllowUsers` or `AllowGroups` to restrict access. Enable `Fail2ban` to protect against brute-force attacks."],

  // ==================== PERFORMANCE & TROUBLESHOOTING (Medium-Hard) ====================
  ["Linux", "What does the load average measure in Linux?", "load-average", "Explain system load averages.", "Load average is the average number of processes in the run queue (running or waiting for CPU) over 1, 5, and 15 minutes. A value of 1.0 means one CPU core is fully utilized. High load averages indicate CPU contention or I/O waits."],
  ["Linux", "How do you troubleshoot a system with high CPU usage?", "high-cpu-troubleshoot", "Walk through the diagnostic steps.", "1. Use `top` or `htop` to identify CPU-hungry processes. 2. Use `ps aux --sort=-%cpu` to list processes by CPU usage. 3. Check for runaway processes, infinite loops, or high context switching. 4. Use `strace` to trace system calls of the offending process."],
  ["Linux", "How do you troubleshoot a system with high memory usage?", "high-memory-troubleshoot", "Explain memory diagnostics.", "1. Use `free -h` to check overall memory and swap usage. 2. Use `top` or `htop` to sort processes by memory consumption. 3. Use `ps aux --sort=-%mem` to list processes by memory usage. 4. Check for memory leaks using `valgrind` or heap profilers. 5. Investigate cache/buffer usage (`/proc/meminfo`)."],
  ["Linux", "What is the difference between I/O wait and CPU utilization?", "iowait-vs-cpu", "Explain the difference.", "CPU utilization is the percentage of time the CPU is busy executing instructions. I/O wait is the percentage of time the CPU is idle waiting for I/O operations (disk, network) to complete. High I/O wait indicates storage or network bottlenecks."],
  ["Linux", "How do you diagnose disk I/O performance issues?", "disk-io-troubleshoot", "Explain I/O monitoring tools.", "Use `iostat -x 1` to monitor disk I/O statistics (await, svctm, util). Use `iotop` to see per-process I/O usage. Use `blktrace` for detailed block I/O tracing. Check for high `%util` or high `await` values."],
  ["Linux", "What is the purpose of the `strace` command?", "strace", "Explain system call tracing.", "`strace` traces system calls and signals made by a process. It is invaluable for debugging application behavior, identifying file access issues, and understanding how a program interacts with the kernel."],
  ["Linux", "How do you use `perf` to profile a Linux system?", "perf", "Explain performance analysis.", "`perf` is a powerful Linux profiling tool. Use `perf top` for real-time profiling, `perf record` to capture a profile, and `perf report` to analyze it. It can measure CPU cycles, cache misses, and other hardware events."],
  ["Linux", "What is the difference between `top` and `htop`?", "top-vs-htop", "Compare the process monitoring tools.", "`top` is the standard system monitoring tool. `htop` is an improved version with a more user-friendly interface, color coding, mouse support, easier process killing, and tree view. `htop` also shows more detailed system information."],
  ["Linux", "How do you use `systemd-cgtop` to monitor resource usage?", "systemd-cgtop", "Explain control group monitoring.", "`systemd-cgtop` shows the CPU, memory, and disk I/O usage of systemd control groups (cgroups). It provides a hierarchical view of resource consumption, useful for identifying resource-heavy services."],
  ["Linux", "How do you troubleshoot a 'Too many open files' error?", "too-many-open-files", "Explain file descriptor limits.", "Check the current limit with `ulimit -n`. Increase the limit by editing `/etc/security/limits.conf` (e.g., `* soft nofile 65536`). For systemd services, set `LimitNOFILE=65536` in the service unit file. Also check if the application is leaking file descriptors."],

  // ==================== SHELL SCRIPTING (Medium) ====================
  ["Linux", "What is the difference between `bash` and `sh`?", "bash-vs-sh", "Compare the shells.", "`sh` is the original Bourne shell, a simple POSIX-compliant shell. `bash` (Bourne Again Shell) is an enhanced version with additional features like command history, job control, and bash-specific syntax (e.g., arrays, `[[ ]]`)."],
  ["Linux", "How do you write a bash script that fails safely on error?", "bash-error-handling", "Explain error handling in scripts.", "Use `set -e` to exit on any error. Use `set -u` to treat unset variables as errors. Use `set -o pipefail` to catch errors in pipelines. Use `trap` to catch signals and clean up resources."],
  ["Linux", "What is the purpose of `grep`, `sed`, and `awk`?", "grep-sed-awk", "Explain the text processing tools.", "`grep` searches for patterns in files. `sed` (stream editor) is used for text substitution and transformation. `awk` is a full-fledged programming language for text processing and report generation, often used for field-based manipulation."],
  ["Linux", "How do you find and kill a hanging process?", "find-kill-hanging-process", "Explain process termination.", "Use `ps aux | grep process_name` to find the PID. Use `kill PID` to send SIGTERM. If it doesn't respond, use `kill -9 PID` for SIGKILL. For more aggressive termination, use `pkill process_name` or `killall process_name`."],
  ["Linux", "What is the difference between `$*` and `$@` in bash?", "dollar-star-vs-dollar-at", "Explain positional parameter expansion.", "`$*` expands all positional parameters as a single word (e.g., `\"$1 $2 $3\"`). `$@` expands each positional parameter as a separate word (e.g., `\"$1\" \"$2\" \"$3\"`). `$@` is generally safer for preserving arguments."],
  ["Linux", "How do you redirect stdout and stderr to different files?", "redirect-stdout-stderr", "Explain I/O redirection.", "`command > stdout.log 2> stderr.log` redirects stdout to stdout.log and stderr to stderr.log. `command &> output.log` redirects both to the same file."],
  ["Linux", "What is a `here document` (heredoc) in bash?", "heredoc", "Explain multi-line input redirection.", "A heredoc allows passing multi-line input to a command. Syntax: `command <<EOF ... EOF`. It is commonly used in scripts to generate configuration files or provide interactive input."],
  ["Linux", "How do you schedule a cron job that runs every 5 minutes?", "cron-schedule", "Explain cron syntax.", "`*/5 * * * * command` runs the command every 5 minutes. The syntax is: minute, hour, day of month, month, day of week."],
  ["Linux", "What is the purpose of the `xargs` command?", "xargs", "Explain building and executing commands.", "`xargs` reads input from stdin and executes a command with the input as arguments. It is often used with `find` to process large numbers of files: `find . -name \"*.log\" | xargs rm`."],
  ["Linux", "How do you write a script that checks if a service is running and restarts it if not?", "service-health-check", "Explain service monitoring script.", "```bash\nif ! systemctl is-active --quiet service_name; then\n    systemctl restart service_name\n    echo \"Service restarted\"\nfi\n```"],

  // ==================== SYSTEMD & INIT (Medium) ====================
  ["Linux", "What is `systemd` and how does it differ from SysV init?", "systemd-vs-sysv", "Compare the init systems.", "`systemd` is a modern init system that parallelizes service startup, uses socket activation, and provides dependency management. SysV init is the traditional sequential init system using shell scripts. `systemd` is faster and more feature-rich."],
  ["Linux", "What is a `systemd` unit file and what types are there?", "systemd-unit-file", "Explain unit file types.", "A systemd unit file defines a resource managed by systemd. Types include: `.service` (services), `.socket` (sockets), `.target` (groups of units), `.timer` (timers), `.mount` (mount points), and `.device` (devices)."],
  ["Linux", "How do you create a systemd service?", "create-systemd-service", "Explain service unit creation.", "Create a file `/etc/systemd/system/my-service.service` with:\n```\n[Unit]\nDescription=My Service\nAfter=network.target\n\n[Service]\nExecStart=/usr/bin/my-service\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\n```\nThen run `systemctl daemon-reload` and `systemctl enable --now my-service`."],
  ["Linux", "What is the difference between `systemctl start`, `enable`, and `restart`?", "systemctl-commands", "Explain systemctl operations.", "`systemctl start` starts a service immediately. `systemctl enable` configures the service to start at boot. `systemctl restart` stops and starts the service (for applying configuration changes). `systemctl reload` reloads the service configuration without restarting."],
  ["Linux", "How do you view logs for a systemd service?", "systemd-logs", "Explain journalctl usage.", "`journalctl -u service_name` shows logs for a specific service. `journalctl -f` follows logs in real-time. `journalctl --since \"2024-01-01\"` filters logs by time. `journalctl -b` shows logs from the current boot."],
  ["Linux", "What is a systemd target and how does it relate to runlevels?", "systemd-targets", "Explain target units.", "Systemd targets are similar to SysV runlevels. They are synchronization points for grouping services. Common targets: `multi-user.target` (runlevel 3), `graphical.target` (runlevel 5), `rescue.target` (runlevel 1)."],

  // ==================== KERNEL & INTERNALS (Hard) ====================
  ["Linux", "What is the difference between user space and kernel space?", "user-vs-kernel-space", "Explain memory protection.", "User space is the memory area where user applications run, with restricted access to hardware. Kernel space is the memory area where the kernel and device drivers run, with full access to hardware. The separation provides security and stability."],
  ["Linux", "How does a system call work in Linux?", "system-call", "Explain the transition from user to kernel space.", "A system call is a request from a user-space process to the kernel for a privileged operation (e.g., file I/O, process creation). The process triggers a software interrupt (e.g., `int 0x80` or `syscall` instruction), which switches to kernel mode. The kernel executes the requested operation and returns the result."],
  ["Linux", "What is a kernel module and how do you load/unload one?", "kernel-module", "Explain loadable kernel modules.", "A kernel module is a piece of code that can be loaded into the kernel at runtime to add functionality (e.g., device drivers, filesystems). Use `insmod` or `modprobe` to load modules, `rmmod` to unload them, and `lsmod` to list loaded modules."],
  ["Linux", "What is the difference between a spinlock and a mutex in the Linux kernel?", "spinlock-vs-mutex", "Explain kernel synchronization primitives.", "A spinlock is a busy-waiting lock that spins (repeatedly checks) until it acquires the lock. It is used in interrupt contexts where sleeping is not allowed. A mutex is a sleeping lock; if the lock is held, the thread sleeps and is woken up when the lock is released. Mutexes are used in process contexts."],
  ["Linux", "What is a `softirq` and how does it differ from a `tasklet`?", "softirq-vs-tasklet", "Explain deferred interrupt processing.", "Softirqs are kernel mechanisms for deferring work from interrupt handlers to a later time, running in interrupt context. Tasklets are a simpler, more limited form of softirqs that are non-reentrant (only one instance runs at a time). Tasklets are built on top of softirqs."],
  ["Linux", "How does the Linux kernel handle interrupts?", "interrupt-handling", "Explain the interrupt handling flow.", "When a hardware interrupt occurs, the CPU saves the current state and jumps to the interrupt handler. The handler does minimal work, acknowledges the interrupt, and schedules a softirq or tasklet for deferred processing. The kernel then returns to the interrupted process."],
  ["Linux", "What is the difference between `preemptible` and `non-preemptible` kernel?", "preemptible-kernel", "Explain kernel preemption.", "A preemptible kernel allows higher-priority tasks to preempt the kernel while it is executing system calls (except in critical sections). This improves responsiveness for real-time applications. A non-preemptible kernel runs system calls to completion before switching tasks."],
  ["Linux", "What is the purpose of the `ftrace` tool?", "ftrace", "Explain kernel function tracing.", "`ftrace` is a Linux kernel tracing framework that allows tracking function calls, scheduling events, and IRQ activity. It is used for debugging and performance analysis. It can be accessed via `/sys/kernel/tracing/` or through the `trace-cmd` command."],
  ["Linux", "How does memory paging work in Linux?", "memory-paging", "Explain virtual memory management.", "Linux uses paging to manage memory. The virtual address space is divided into pages (typically 4KB). When a process accesses a page not in physical memory, a page fault occurs. The kernel loads the page from disk (swap) or allocates a new page. The MMU translates virtual to physical addresses using page tables."],
  ["Linux", "What is the Out-of-Memory (OOM) Killer and how does it work?", "oom-killer", "Explain the OOM killer mechanism.", "When the system is critically low on memory, the OOM killer is invoked to select and terminate a process to free memory. It uses a heuristic (badness score) to choose the process that will cause the least damage. The behavior can be tuned via `/proc/sys/vm/oom-kill`."],

  // ==================== VIRTUALIZATION & CONTAINERS (Medium) ====================
  ["Linux", "What is the difference between virtualization and containerization?", "virtualization-vs-containerization", "Compare the technologies.", "Virtualization runs full operating systems on a hypervisor, providing strong isolation but higher overhead. Containerization runs isolated processes sharing the host kernel (via namespaces and cgroups), providing lightweight and faster startup times."],
  ["Linux", "What are Linux namespaces and what types exist?", "linux-namespaces", "Explain kernel-level isolation.", "Namespaces isolate process trees, network interfaces, and other resources. Types include: `pid` (process IDs), `net` (network), `mnt` (mount points), `uts` (hostname), `ipc` (IPC), `user` (user IDs), and `cgroup` (control groups)."],
  ["Linux", "What are control groups (cgroups) and how are they used?", "cgroups", "Explain resource management.", "Cgroups are a Linux kernel feature that limits, accounts for, and isolates resource usage (CPU, memory, disk I/O, network) of process groups. They are the foundation for container resource management (e.g., Docker, Kubernetes)."],
  ["Linux", "What is the difference between Docker and a virtual machine?", "docker-vs-vm", "Compare container and VM.", "Docker containers share the host kernel and are lightweight, starting in seconds. Virtual machines have their own full OS and kernel, providing stronger isolation but higher overhead and slower startup."],
  ["Linux", "What is Kubernetes and how does it relate to containers?", "kubernetes", "Explain container orchestration.", "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It runs on top of container runtimes like Docker."],
  ["Linux", "What is the difference between `podman` and `docker`?", "podman-vs-docker", "Compare the container runtimes.", "Podman is a daemonless container engine that is fully compatible with Docker CLI. Unlike Docker, Podman does not require a background daemon, which improves security and allows rootless containers."],
  ["Linux", "What is `systemd-nspawn` and how is it used?", "systemd-nspawn", "Explain containerization with systemd.", "`systemd-nspawn` is a tool for running a command or OS in a lightweight namespace container. It is similar to `chroot` but with stronger isolation (namespaces, cgroups). It is often used for testing and development containers."],

  // ==================== STORAGE & FILE SYSTEMS (Medium-Hard) ====================
  ["Linux", "What is the difference between XFS and ext4?", "xfs-vs-ext4", "Compare the filesystems.", "XFS is a high-performance 64-bit journaling filesystem, optimized for large files and parallel I/O. ext4 is the default Linux filesystem, offering good performance and backward compatibility. XFS supports larger file sizes and volumes than ext4."],
  ["Linux", "What is a mount namespace and how does it work?", "mount-namespace", "Explain filesystem isolation.", "A mount namespace isolates the list of mount points seen by a process. Processes in different mount namespaces can have different views of the filesystem hierarchy, which is used in containers to provide isolated filesystems."],
  ["Linux", "How do you repair a corrupted filesystem?", "repair-filesystem", "Explain fsck and recovery.", "1. Unmount the filesystem (`umount /dev/sdb1`). 2. Run `fsck -y /dev/sdb1` to check and automatically repair errors. 3. If the filesystem is critical, consider restoring from backup. 4. For XFS, use `xfs_repair`."],
  ["Linux", "What is the purpose of the `sync` command?", "sync", "Explain flushing buffers to disk.", "`sync` flushes all cached data from memory to disk, ensuring that all pending writes are committed. It is often used before unmounting filesystems or rebooting to prevent data loss."],
  ["Linux", "What is the difference between `dd` and `cp` for copying files?", "dd-vs-cp", "Compare the copying tools.", "`cp` is a higher-level command for copying files, handling filesystem metadata. `dd` is a low-level block-level copy tool, often used for copying raw data, creating disk images, and backing up partitions (`dd if=/dev/sda of=backup.img`)."],

  // ==================== MONITORING & LOGGING (Medium) ====================
  ["Linux", "How do you set up centralized logging in Linux?", "centralized-logging", "Explain logging aggregation.", "Use `rsyslog` or `syslog-ng` to forward logs to a central server. Configure the client to send logs to the server (e.g., `*.* @logserver:514`). On the server, logs are stored in `/var/log/remote/`. For modern setups, use the ELK stack (Elasticsearch, Logstash, Kibana) or Loki."],
  ["Linux", "What is the purpose of the `journald` service?", "journald", "Explain systemd's logging daemon.", "`journald` is systemd's logging daemon that collects and stores logs in a binary format (`/var/log/journal/`). It provides structured logging, indexing, and integration with `systemctl` and `journalctl`."],
  ["Linux", "How do you monitor system metrics with `prometheus` and `node_exporter`?", "prometheus-node-exporter", "Explain metrics collection.", "Install `node_exporter` on each target system to expose system metrics (CPU, memory, disk, network). Configure Prometheus to scrape these metrics. Use Grafana for visualization and alerting."],
  ["Linux", "What is the purpose of the `/var/log` directory?", "var-log", "Explain the standard log directory.", "`/var/log` is the standard location for system and application log files. Common files include `syslog`, `auth.log`, `kern.log`, `dmesg`, and application-specific logs."],
  ["Linux", "How do you use `tcpdump` to capture network traffic?", "tcpdump", "Explain packet capture.", "`tcpdump -i eth0 -w capture.pcap` captures packets on interface eth0 and writes them to a file. `tcpdump -i eth0 port 80` filters traffic on port 80. Use `tshark` or Wireshark to analyze the captured packets."],

  // ==================== AUTOMATION & CONFIGURATION MANAGEMENT (Medium) ====================
  ["Linux", "What is Ansible and how does it work?", "ansible", "Explain configuration management.", "Ansible is an agentless configuration management tool that uses YAML playbooks to define infrastructure as code. It connects to nodes via SSH and pushes configuration changes, making it simple and secure."],
  ["Linux", "What is the difference between Ansible and Puppet?", "ansible-vs-puppet", "Compare configuration management tools.", "Ansible is agentless (uses SSH) and push-based, focusing on simplicity. Puppet is agent-based (requires a client) and pull-based, offering more complex declarative models. Ansible is easier to get started with; Puppet is more powerful for large-scale environments."],
  ["Linux", "What is Terraform and how is it different from Ansible?", "terraform-vs-ansible", "Compare IaC tools.", "Terraform is an infrastructure provisioning tool that manages cloud resources (e.g., AWS, GCP). Ansible is a configuration management tool that configures software on existing systems. They are often used together: Terraform for provisioning, Ansible for configuration."],
  ["Linux", "What is a GitOps workflow?", "gitops", "Explain the GitOps methodology.", "GitOps is a DevOps practice where the desired state of infrastructure is defined in Git. Changes are applied by automated processes (e.g., ArgoCD, Flux) that reconcile the live environment with the Git repository."],

  // ==================== HIGH AVAILABILITY & CLUSTERING (Hard) ====================
  ["Linux", "What is a load balancer and how does it work?", "load-balancer", "Explain traffic distribution.", "A load balancer distributes incoming network traffic across multiple backend servers to improve availability and performance. It can operate at Layer 4 (TCP/UDP) or Layer 7 (HTTP/HTTPS). Common software load balancers include HAProxy and Nginx."],
  ["Linux", "What is the difference between active-passive and active-active clustering?", "active-passive-vs-active-active", "Compare cluster modes.", "Active-passive: one node is active, the other is on standby (takes over on failure). Active-active: all nodes are active, sharing the load. Active-passive is simpler; active-active provides better utilization but requires shared storage or replication."],
  ["Linux", "What is a heartbeat in high-availability clustering?", "heartbeat", "Explain cluster health monitoring.", "A heartbeat is a periodic signal sent between cluster nodes to indicate they are alive and healthy. If a node stops sending heartbeats, the cluster assumes it has failed and triggers a failover to another node."],
  ["Linux", "What is the difference between DRBD and GlusterFS?", "drbd-vs-glusterfs", "Compare storage solutions.", "DRBD (Distributed Replicated Block Device) provides block-level replication between two nodes, similar to RAID 1 over a network. GlusterFS is a distributed filesystem that aggregates storage from multiple nodes into a single namespace, suitable for large-scale storage."],
  ["Linux", "How do you set up a high-availability cluster with Pacemaker and Corosync?", "pacemaker-corosync", "Explain cluster resource management.", "Corosync provides the messaging layer for cluster communication. Pacemaker is the cluster resource manager that controls failover. Resources (IP addresses, services, storage) are defined as resources. Pacemaker monitors them and moves them to another node in case of failure."],

  // ==================== ADVANCED NETWORKING (Hard) ====================
  ["Linux", "What is eBPF and how is it used in Linux?", "ebpf", "Explain the extended Berkeley Packet Filter.", "eBPF is a Linux kernel technology that allows running sandboxed programs in kernel space without changing kernel source code. It is used for performance monitoring, networking, security (e.g., Cilium, Falco), and tracing. eBPF programs are attached to kernel events (e.g., syscalls, network packets)."],
  ["Linux", "What is the difference between a bridge, a bond, and a team in Linux networking?", "bridge-bond-team", "Compare network interface types.", "A bridge is a virtual switch that connects multiple network interfaces at Layer 2. A bond (bonding) combines multiple physical interfaces for redundancy or performance (mode 0-6). Team is a newer alternative to bonding with better features and management."],
  ["Linux", "What is Network Namespace and how is it used?", "network-namespace", "Explain network isolation.", "A network namespace provides a completely isolated network stack (interfaces, routes, firewall rules). It is used in containers to provide each container with its own network environment. Use `ip netns` to manage network namespaces."],
  ["Linux", "How does VXLAN work in Linux?", "vxlan", "Explain virtual network encapsulation.", "VXLAN (Virtual Extensible LAN) is a network virtualization technology that encapsulates Layer 2 frames in UDP packets. It allows creating overlay networks across multiple hosts, overcoming the limitations of VLANs (4096 IDs). Linux supports VXLAN via the kernel module."],
  ["Linux", "What is the purpose of the `tc` (traffic control) command?", "tc", "Explain network traffic shaping.", "`tc` is used for traffic control in Linux, allowing you to configure QoS (Quality of Service), bandwidth limits, and packet scheduling. It works with disciplines (qdiscs), classes, and filters."],

  // ==================== STORAGE & BACKUP (Medium) ====================
  ["Linux", "What is the difference between full, incremental, and differential backups?", "backup-types", "Explain backup strategies.", "Full backup: copies all data. Incremental backup: copies only changes since the last backup (full or incremental). Differential backup: copies changes since the last full backup. Incremental backups save space but are slower to restore; differential backups are faster to restore but use more space."],
  ["Linux", "How do you perform a backup using `rsync`?", "rsync-backup", "Explain rsync usage.", "`rsync -avz /source/ /destination/` synchronizes files and directories. `-a` preserves attributes, `-v` is verbose, `-z` compresses. For remote backups: `rsync -avz /source/ user@host:/destination/`. `rsync` is efficient because it copies only changed blocks."],
  ["Linux", "What is the purpose of the `tar` command?", "tar", "Explain archiving.", "`tar` (Tape Archive) is used to create archives (collections of files) and compress them. Common uses: `tar -czvf archive.tar.gz /path` creates a compressed archive, `tar -xzvf archive.tar.gz` extracts it."],
  ["Linux", "How do you restore a file from a backup?", "restore-backup", "Explain recovery steps.", "If using `rsync`, copy the file back from the backup location. If using `tar`, extract the specific file: `tar -xvf backup.tar --wildcards 'path/to/file'`. If using a versioned backup system (e.g., `restic`), use the restore command."],

  // ==================== SECURITY HARDENING (Hard) ====================
  ["Linux", "What is the principle of least privilege and how is it applied in Linux?", "least-privilege", "Explain security best practices.", "The principle of least privilege states that users and processes should have only the minimum permissions necessary to perform their functions. In Linux, this is enforced through file permissions, sudo policies, and SELinux/AppArmor."],
  ["Linux", "What is AppArmor and how does it compare to SELinux?", "apparmor-vs-selinux", "Compare MAC systems.", "AppArmor is a Mandatory Access Control (MAC) system that restricts applications based on pathnames. It is simpler to configure than SELinux and is the default on Ubuntu. SELinux uses more complex labeled security policies and is the default on RHEL/CentOS."],
  ["Linux", "What is a security audit in Linux and how do you perform one?", "security-audit", "Explain auditing tools.", "A security audit involves reviewing system configurations, logs, and permissions to identify vulnerabilities. Tools include `auditd` for logging, `lynis` for automated auditing, and `chkrootkit`/`rkhunter` for rootkit detection."],
  ["Linux", "What is the purpose of the `/etc/sudoers` file and how do you edit it safely?", "sudoers", "Explain sudo configuration.", "`/etc/sudoers` defines which users can run which commands with sudo. It should be edited using `visudo` to check syntax and prevent errors. Entries specify users, hosts, commands, and options (e.g., `NOPASSWD`)."],
  ["Linux", "How do you implement network segmentation in Linux?", "network-segmentation", "Explain network isolation.", "Use VLANs to separate traffic at Layer 2. Use network namespaces for process-level isolation. Use firewalls (`iptables`/`nftables`) to restrict traffic between segments. Use overlay networks (VXLAN) for container segmentation."],

  // ==================== MISCELLANEOUS (Medium) ====================
  ["Linux", "What is the difference between `yum` and `apt`?", "yum-vs-apt", "Compare package managers.", "`yum` (Yellowdog Updater Modified) is the package manager for RHEL/CentOS/Fedora. `apt` (Advanced Package Tool) is the package manager for Debian/Ubuntu. Both handle dependency resolution and package installation, but use different package formats (RPM vs DEB)."],
  ["Linux", "How do you check the kernel version in Linux?", "kernel-version", "Explain the command.", "`uname -r` shows the kernel release version. `uname -a` shows all system information (kernel name, hostname, kernel release, kernel version, machine, OS)."],
  ["Linux", "What is the purpose of the `screen` or `tmux` command?", "screen-tmux", "Explain terminal multiplexers.", "`screen` and `tmux` are terminal multiplexers that allow running multiple terminal sessions in a single window. They are useful for long-running processes, detaching and reattaching to sessions, and working on remote servers."],
  ["Linux", "How do you check the system's uptime?", "uptime", "Explain the command.", "`uptime` shows how long the system has been running, the number of users, and the load average. `w` also shows uptime and user activity."],
  ["Linux", "What is the difference between `nice` and `renice`?", "nice-vs-renice", "Explain process priority management.", "`nice` sets the priority of a new process (`nice -n 10 command`). `renice` changes the priority of an existing process (`renice -n 10 -p PID`). Higher nice values mean lower priority (range -20 to 19)."],

  // ==================== SCENARIO-BASED (Hard) ====================
  ["Linux", "A server is running slow. How do you diagnose it?", "slow-server-diagnose", "Walk through systematic diagnostics.", "1. Check load average (`uptime`). 2. Check CPU usage (`top`, `mpstat`). 3. Check memory usage (`free -h`, `vmstat`). 4. Check disk I/O (`iostat`, `iotop`). 5. Check network (`iftop`, `nethogs`). 6. Check system logs (`journalctl`, `dmesg`). 7. Identify the bottleneck and take corrective action."],
  ["Linux", "A service fails to start. How do you troubleshoot it?", "service-fails-to-start", "Explain diagnostic steps.", "1. Check the service status (`systemctl status service`). 2. Check service logs (`journalctl -u service`). 3. Check configuration files for syntax errors. 4. Check dependencies (ports, files, other services). 5. Try starting the service manually to see error output."],
  ["Linux", "A server is running out of disk space. How do you handle it?", "disk-space-full", "Explain cleanup and expansion.", "1. Find large files/directories (`du -sh /* | sort -h`). 2. Clear old logs (`logrotate`, `journalctl --vacuum-size`). 3. Remove temporary files. 4. Expand the filesystem (LVM) or add a new disk."],
  ["Linux", "How do you recover a non-booting Linux system?", "non-booting-recovery", "Explain recovery steps.", "1. Boot from a Live CD/USB. 2. Mount the root partition. 3. Check `/etc/fstab` for errors. 4. Inspect GRUB configuration. 5. Run `fsck` on the root filesystem. 6. Reinstall GRUB if necessary (`grub-install`)."],
  ["Linux", "You SSH into a box and it is painfully slow. How do you diagnose it?", "ssh-slow-diagnose", "Explain performance diagnostics over SSH.", "1. Check load average (`uptime`). 2. Check for high CPU or I/O wait (`top`, `iostat`). 3. Check memory usage (`free`). 4. Check network latency (`ping`, `mtr`). 5. Check for process contention (`ps aux`)."],
  ["Linux", "A cron job is not running. How do you troubleshoot it?", "cron-job-not-running", "Explain cron debugging.", "1. Check crontab syntax (`crontab -l`). 2. Check cron logs (`/var/log/syslog` or `journalctl -u cron`). 3. Ensure the command runs manually. 4. Check file permissions and PATH. 5. Check for environment differences."],
  ["Linux", "A process is consuming 100% CPU. How do you handle it?", "high-cpu-process", "Explain process troubleshooting.", "1. Identify the process (`top`, `ps aux`). 2. Check if it's stuck in a loop or infinite recursion. 3. Use `strace` to trace system calls. 4. Use `gdb` to attach and debug. 5. If necessary, kill the process (`kill -9 PID`)."],
  ["Linux", "A server is not responding to ping. How do you diagnose it?", "ping-unresponsive", "Explain network troubleshooting.", "1. Check local network interface (`ip a`). 2. Check default gateway (`ip r`). 3. Check firewall rules (`iptables -L`). 4. Check if the server is powered on. 5. Check physical connectivity."],
  ["Linux", "How do you migrate a large amount of data between servers?", "data-migration", "Explain data transfer methods.", "Use `rsync` for incremental copying. Use `scp` for secure transfer. Use `nc` (netcat) for raw data transfer. For large volumes, use `dd` over SSH or use a dedicated storage migration tool."],
  ["Linux", "A database server is slow. How do you tune it?", "database-tuning", "Explain database performance tuning.", "1. Check CPU, memory, and I/O usage. 2. Optimize queries (add indexes). 3. Tune database configuration (buffer pool, cache size). 4. Consider vertical scaling (more RAM, faster disks) or horizontal scaling (read replicas)."]
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Linux concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade-offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Linux commands without explaining the safety, performance, or operational trade-off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "linux" },
    update: { name: "Linux", group: "Technology", description: "Linux interview questions." },
    create: { name: "Linux", slug: "linux", group: "Technology", description: "Linux interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "Linux" } },
    update: {},
    create: { name: "Linux", slug: "Linux", categoryId: category.id },
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
        tags: ["Linux"],
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
        tags: ["Linux"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Linux questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");