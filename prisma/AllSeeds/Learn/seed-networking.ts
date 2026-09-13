// ===== seed-os.ts (fixed) =====
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
  let deepDive =
    "Study " +
    title +
    " as a core OS concept, not as a memorised textbook definition. Start with the problem it solves: " +
    subject +
    ". The critical questions are: what is the underlying kernel mechanism, what are the trade-offs (performance vs correctness), and how does it affect application behaviour?";

  if (lowerTitle.includes("process")) {
    deepDive +=
      " A process is a program in execution, with its own address space, registers, and program counter. Processes are isolated; communication via IPC (pipes, sockets, shared memory). Use 'ps' / 'top' to observe. Understand process states: New, Ready, Running, Blocked, Terminated. The PCB (Process Control Block) stores all necessary info for context switching.";
  } else if (lowerTitle.includes("thread")) {
    deepDive +=
      " Threads are lightweight processes sharing the same address space, enabling parallel execution within a process. User-level threads (fast, but one blocking call blocks all) vs Kernel-level threads (managed by OS, more overhead). Modern systems use kernel-level (or hybrid). Use pthread in C, threading in Python, or java.lang.Thread. Thread-local storage is useful for avoiding global state.";
  } else if (lowerTitle.includes("cpu scheduling")) {
    deepDive +=
      " CPU Scheduling decides which process/thread runs next. Algorithms: FCFS (simple, convoy effect), SJF (optimal average wait, but hard to predict), Priority (may starve), Round Robin (fair, time-quantum matters), MLFQ (adaptive). Preemptive vs non-preemptive. The scheduler aims to maximize throughput, minimize response time, and ensure fairness.";
  } else if (lowerTitle.includes("context switching")) {
    deepDive +=
      " Context switching saves the state of a running process (registers, PC, MMU info) and loads the state of the next. It's a pure overhead—cost in microseconds. Frequent switching (e.g., many threads) degrades performance. Hardware support (TLB flushing) influences cost. Understand the difference between thread and process context switches.";
  } else if (lowerTitle.includes("synchronization") || lowerTitle.includes("mutex") || lowerTitle.includes("semaphore")) {
    deepDive +=
      " Synchronisation prevents race conditions when accessing shared data. Mutex (Mutual Exclusion) allows only one thread to enter a critical section. Semaphore (counting) allows a fixed number of threads (general) or binary (like mutex). Deadlocks can occur with multiple locks. Use higher-level constructs (e.g., 'synchronized' in Java, 'lock' in Python) to avoid mistakes.";
  } else if (lowerTitle.includes("deadlock")) {
    deepDive +=
      " Deadlock occurs when processes hold resources and wait for each other. Four necessary conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Prevent: break any condition (e.g., impose resource ordering, allow preemption). Detect: resource allocation graph, wait-for graph. Recover: kill processes or preempt resources. The Banker's Algorithm avoids deadlocks by checking safety.";
  } else if (lowerTitle.includes("virtual memory") || lowerTitle.includes("paging") || lowerTitle.includes("segmentation")) {
    deepDive +=
      " Virtual Memory gives each process its own virtual address space, abstracting physical memory. Paging divides memory into fixed-size pages; address translation via Page Tables and TLB. Segmentation divides into variable-length segments (code, data, stack) — used with paging in modern OS (e.g., x86 segmentation + paging). Page faults trigger swapping from disk. Thrashing occurs when working set doesn't fit in physical memory.";
  } else if (lowerTitle.includes("file system")) {
    deepDive +=
      " File systems manage persistent storage. Key components: inodes (metadata), data blocks, directories (mapping names to inodes). Types: FAT, NTFS, ext4, ZFS. Operations: create, open, read, write, close. Journaling (ext3/4) ensures consistency after crashes. Distributed FS (e.g., NFS, HDFS) add network transparency. Understand mount points, permissions, and performance (block size).";
  } else if (lowerTitle.includes("memory management")) {
    deepDive +=
      " Memory Management encompasses physical memory allocation, virtual memory, paging, and swapping. Techniques: fixed partitioning, dynamic partitioning, buddy system, slab allocation. The kernel must track free blocks (bitmaps, free lists). MMU (Memory Management Unit) handles address translation. Cache (TLB) accelerates translations. Memory overcommit and OOM killer are relevant in Linux.";
  }

  return (
    "## Ultra explanation\n\n" +
    deepDive +
    "\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Draw a diagram (e.g., process states, page table structure).\n3. Simulate with code (e.g., use pthreads, semaphores).\n4. Experiment with OS tools (e.g., 'ps', 'vmstat', 'pmap').\n5. Understand the trade-offs and real-world impact.\n\n### Interview-ready checklist\n- Explain the concept without relying on memorised text.\n- Describe a real-world scenario where the concept matters (e.g., performance, debugging).\n- Mention the common pitfalls and how to diagnose them.\n- Compare with alternative approaches.\n- Show how you would implement or simulate it (pseudocode or system calls).\n\n### Practice task\nCreate a small hands-on exercise for **" +
    title +
    "** inside the **" +
    module.title +
    "** module of the **" +
    path.name +
    "** path. Write a code snippet or shell commands to demonstrate the concept, then modify to trigger an edge case. Document the results."
  );
}

// The rest of the seed-os.ts (ensureCategory, seedOSCategory, main) is unchanged.
// I've only replaced the buildUltraExplanation function.
// For completeness, I'll provide the full code below.