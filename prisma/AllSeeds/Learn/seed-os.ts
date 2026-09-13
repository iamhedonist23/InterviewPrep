// ===== seed-networking.ts (fixed) =====
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
    " as a practical networking skill, not as a memorised definition. Start with the problem it solves: " +
    subject +
    ". The critical questions are: which layer does it operate at, what are the latency/throughput trade-offs, and how do you troubleshoot it when something goes wrong?";

  if (lowerTitle.includes("osi")) {
    deepDive +=
      " The OSI model (7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application) is a conceptual framework. It helps isolate problems—if an application works but the browser can't connect, it's likely Network or Transport. Remember: 'Please Do Not Throw Sausage Pizza Away' (Layer 1 to 7). In practice, TCP/IP is the de-facto standard, but OSI is crucial for interviews and troubleshooting.";
  } else if (lowerTitle.includes("tcp/ip")) {
    deepDive +=
      " TCP/IP is the actual protocol suite used on the internet. It has 4 layers: Network Interface, Internet (IP), Transport (TCP/UDP), Application (HTTP, DNS). Each layer encapsulates data. The Internet layer handles routing via IP; Transport provides end-to-end communication. Understanding the packet journey—from application to wire and back—is essential for debugging.";
  } else if (lowerTitle.includes("tcp vs udp")) {
    deepDive +=
      " TCP is connection-oriented, reliable, ordered, and has congestion control. UDP is connectionless, unreliable, unordered, but fast and lightweight. Choose TCP for data integrity (HTTP, SSH, FTP), UDP for speed/latency (VoIP, gaming, DNS, VPN). Always consider: can you afford packet loss? If yes, UDP; if no, TCP.";
  } else if (lowerTitle.includes("http")) {
    deepDive +=
      " HTTP (HyperText Transfer Protocol) is the foundation of the web. It is stateless, request/response, and uses methods (GET, POST, PUT, DELETE). Status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). HTTP/1.1 persistent connections, HTTP/2 multiplexing, HTTP/3 (QUIC) over UDP. Use 'curl -v' to inspect headers.";
  } else if (lowerTitle.includes("https")) {
    deepDive +=
      " HTTPS is HTTP over TLS (SSL). It provides confidentiality, integrity, and authentication. The TLS handshake: ClientHello, ServerHello, Certificate exchange, Key exchange (Diffie-Hellman), and Finished. Use certificates signed by trusted CAs. Always enforce HSTS to prevent downgrade attacks.";
  } else if (lowerTitle.includes("dns")) {
    deepDive +=
      " DNS (Domain Name System) resolves domain names to IP addresses. Hierarchy: Root servers -> TLD (.com, .org) -> Authoritative nameservers. Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT. Use 'dig' and 'nslookup' as essential tools. DNS uses UDP port 53 (or TCP for large responses). Cache poisoning is a security risk—use DNSSEC.";
  } else if (lowerTitle.includes("ip address")) {
    deepDive +=
      " IPv4: 32-bit address, e.g., 192.168.1.1. IPv6: 128-bit address, e.g., 2001:db8::1, to solve address exhaustion. IPv6 eliminates NAT (in theory). Know private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (RFC 1918) and loopback (127.0.0.1).";
  } else if (lowerTitle.includes("subnet")) {
    deepDive +=
      " Subnetting divides a network into smaller logical subnets. CIDR notation (e.g., /24) indicates network prefix length. Calculate: number of addresses = 2^(32 - prefix). Use subnet masks to separate network from host bits. VLSM (Variable Length Subnet Mask) allows efficient IP allocation. Practice binary conversion—it's a common interview exercise.";
  } else if (lowerTitle.includes("nat")) {
    deepDive +=
      " NAT (Network Address Translation) maps private IPs to a public IP, enabling many devices to share one public address. Types: Static NAT (1:1), Dynamic NAT (pool), PAT (Port Address Translation — most common, uses ports to distinguish). NAT breaks end-to-end connectivity; IPv6 reduces the need. Troubleshoot with 'traceroute' to see hops.";
  } else if (lowerTitle.includes("dhcp")) {
    deepDive +=
      " DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, gateways, and DNS servers. DORA process: Discover, Offer, Request, Acknowledge. Leases prevent exhaustion. Use 'dhclient' or /etc/dhcp configs. DHCP relay agents forward requests across subnets.";
  } else if (lowerTitle.includes("tls") || lowerTitle.includes("ssl")) {
    deepDive +=
      " TLS (Transport Layer Security) is the successor to SSL. It encrypts application-layer traffic. Handshake: negotiate cipher suites, authenticate server (certificate), exchange keys (Ephemeral Diffie-Hellman for PFS), and verify integrity with HMAC. Modern TLS 1.3 reduces handshake latency. Use strong ciphers and keep certificates updated.";
  } else if (lowerTitle.includes("websocket")) {
    deepDive +=
      " WebSockets provide full-duplex, persistent communication over a single TCP connection. Starts with an HTTP upgrade request ('Upgrade: websocket'). Useful for real-time apps (chat, games, live dashboards). After upgrade, framing is used (text or binary). Use 'ws' or 'wss' (secure). Handle reconnections and heartbeats (ping/pong).";
  } else if (lowerTitle.includes("proxy")) {
    deepDive +=
      " A proxy acts as an intermediary. Forward proxy (client-side): used for filtering, anonymity, caching. Reverse proxy (server-side): used for load balancing, SSL termination, caching (NGINX, HAProxy). Transparent proxies intercept without client config. Understand X-Forwarded-For headers for client IP in reverse proxy setups.";
  } else if (lowerTitle.includes("load balancer")) {
    deepDive +=
      " Load balancers distribute traffic across multiple servers. Layer 4 (Transport): TCP/UDP, uses IP/port (LVS, AWS NLB). Layer 7 (Application): HTTP/HTTPS, uses content (URL, headers) for routing (AWS ALB, NGINX). Algorithms: Round Robin, Least Connections, IP Hash, Weighted. Health checks ensure only healthy targets receive traffic. Sticky sessions (session affinity) can be used but limit scalability.";
  } else if (lowerTitle.includes("cdn")) {
    deepDive +=
      " A CDN (Content Delivery Network) caches content at edge locations close to users. Reduces latency and bandwidth. Pull CDN: caches on-demand from origin. Push CDN: you upload content. Invalidation is critical. Supports dynamic content acceleration and security (WAF, DDoS protection). Use for static assets (images, JS, CSS) and sometimes HTML.";
  } else if (lowerTitle.includes("firewall")) {
    deepDive +=
      " Firewalls filter traffic based on rules. Stateful: tracks connections (allows established flows). Stateless: inspects each packet independently (ACLs). Deployed as network (perimeter) or host-based (iptables, nftables). Next-Gen Firewalls (NGFW) add L7 inspection, IPS/IDS. Default deny, allow specific rules.";
  }

  return (
    "## Ultra explanation\n\n" +
    deepDive +
    "\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Identify which layer(s) it operates on.\n3. Write a basic command or configuration example.\n4. Simulate a failure (e.g., packet loss, misconfiguration) and observe.\n5. Compare with alternatives and justify the choice.\n\n### Interview-ready checklist\n- Explain the concept without relying on memorised text.\n- Describe a real-world scenario where you used it.\n- Mention the performance implications and common pitfalls.\n- Show how you would debug or test it (e.g., with 'curl', 'tcpdump', 'ping').\n- Discuss how it integrates with other networking components.\n\n### Practice task\nCreate a small hands-on exercise for **" +
    title +
    "** inside the **" +
    module.title +
    "** module of the **" +
    path.name +
    "** path. Set up a simple lab (e.g., using Docker or local tools), run a test, then break it to see the failure mode. Document your observations and the fix."
  );
}

// The rest of the seed-networking.ts (ensureCategory, seedNetworkingCategory, main) is unchanged.
// I've only replaced the buildUltraExplanation function.
// For brevity, I'll now provide the full fixed OS seed as well.