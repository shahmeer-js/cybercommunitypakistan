import { EventData } from "@/types/events";

export const sampleEvents: EventData[] = [
  {
    id: "evt-1",
    status: "LIVE",
    slug: "indus-shield-ctf",
    timeDate: "12:44:02",
    title: "Operation: Indus Shield",
    description:
      "Our flagship monthly CTF. Navigate through layers of network defenses and exploit vulnerable services to capture flags. Focused on AD and Web Exploitation.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", // Optional placeholder cyberpunk mesh grid
    totalParticipants: 1240,
    seatsLeft: 0,
  },
  {
    id: "evt-2",
    status: "REGISTRATION OPEN",
    slug: "zero-trust-fintech",
    timeDate: "OCT 24, 2024",
    title: "Zero-Trust Architecture in Fintech",
    description:
      "Expert-led session on implementing Zero-Trust principles within Pakistani banking infrastructure. Includes a 2-hour practical lab on identity management.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3", // Optional placeholder fintech/dashboard
    totalParticipants: 38,
    seatsLeft: 12,
  },
  {
    id: "evt-3",
    status: "UPCOMING",
    slug: "iot-mesh-hardware-hacking",
    timeDate: "NOV 12, 2024",
    title: "Hardware Hacking: The IoT Mesh",
    description:
      "A hardware-focused challenge. Analyze firmware binaries and identify vulnerabilities in custom IoT protocol implementations. Real hardware kits available for top local competitors.",
    totalParticipants: 0,
    seatsLeft: 100,
  },
  {
    id: "evt-4",
    status: "REGISTRATION OPEN",
    slug: "karachi-api-security",
    timeDate: "JUL 15, 2026",
    title: "Securing Edge APIs in Banking",
    description:
      "Hands-on simulation dealing with broken object-level authorization (BOLA) and mass assignment flaws in regional banking web apps.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    totalParticipants: 112,
    seatsLeft: 38,
  },
  {
    id: "evt-5",
    status: "UPCOMING",
    slug: "scada-national-grid-defense",
    timeDate: "AUG 02, 2026",
    title: "Critical Infrastructure: SCADA Simulation",
    description:
      "Red vs Blue team drill focused on securing Programmable Logic Controllers (PLCs) and industrial control networks against localized malware injection.",
    totalParticipants: 0,
    seatsLeft: 45,
  },
  {
    id: "evt-6",
    status: "LIVE",
    slug: "threat-hunting-apt41",
    timeDate: "15:10:00",
    title: "APT Evacuation: Live Fire Threat Hunt",
    description:
      "Analyze memory dumps and PCAP files from a compromised enterprise server network. Identify the persistence mechanisms and isolate the threat.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    totalParticipants: 840,
    seatsLeft: 0,
  },
  {
    id: "evt-7",
    status: "REGISTRATION OPEN",
    slug: "devsecops-pipeline-hardening",
    timeDate: "AUG 19, 2026",
    title: "Hardening the CI/CD Pipeline",
    description:
      "Learn to integrate automated SAST/DAST tooling and secret scanning into GitHub Actions without bottlenecking your dev velocity.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    totalParticipants: 210,
    seatsLeft: 90,
  },
  {
    id: "evt-8",
    status: "UPCOMING",
    slug: "cloud-native-kubernetes-hacks",
    timeDate: "SEP 05, 2026",
    title: "Kubernetes Escape: Container Breakouts",
    description:
      "A workshop covering misconfigured RBAC roles, container escapes, and pivoting through cloud metadata endpoints.",
    totalParticipants: 0,
    seatsLeft: 150,
  },
  {
    id: "evt-9",
    status: "LIVE",
    slug: "ransomware-negotiation-ir",
    timeDate: "20:05:14",
    title: "Incident Response: LockBit Decryption Drill",
    description:
      "Active crisis room simulation. Handle stakeholders, analyze the encryptor binary, and find flaws in the adversary's deployment scripts.",
    totalParticipants: 433,
    seatsLeft: 0,
  },
  {
    id: "evt-10",
    status: "REGISTRATION OPEN",
    slug: "reverse-engineering-malware-101",
    timeDate: "SEP 22, 2026",
    title: "Android Malware & Reverse Engineering",
    description:
      "Decompile malicious APKs targeting local mobile wallet users. Uncover hardcoded C2 channels and bypass basic code obfuscation.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    totalParticipants: 75,
    seatsLeft: 15,
  },
  {
    id: "evt-11",
    status: "UPCOMING",
    slug: "bug-bounty-recon-frameworks",
    timeDate: "OCT 10, 2026",
    title: "Advanced Recon for Bug Bounties",
    description:
      "Move past simple subdomain enumeration. Map out massive corporate attack surfaces using automated custom OSINT tooling pipelines.",
    totalParticipants: 0,
    seatsLeft: 300,
  },
  {
    id: "evt-12",
    status: "REGISTRATION OPEN",
    slug: "cryptography-post-quantum-standards",
    timeDate: "OCT 28, 2026",
    title: "Migrating to Post-Quantum Cryptography",
    description:
      "An architectural overview of transitioning current corporate TLS and VPN configurations to NIST-approved post-quantum algorithms.",
    totalParticipants: 18,
    seatsLeft: 82,
  },
  {
    id: "evt-13",
    status: "LIVE",
    slug: "social-engineering-vishing-defense",
    timeDate: "09:30:11",
    title: "The Human Element: AI Vishing Triage",
    description:
      "Live interactive social engineering lab. Detect and mitigate deepfake voice clones and advanced spear-phishing schemes targeting executive teams.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
    totalParticipants: 1540,
    seatsLeft: 0,
  },
];

export const samplePapers = [
  {
    id: "paper-1",
    timestamp: "2024.10.18 14:02:55",
    title: "Pak-OS Fingerprinting Analysis",
    excerpt:
      "Comprehensive study on local OS distributions and their architecture structures.",
    downloadUrl: "#download-pak-os",
  },
  {
    id: "paper-2",
    timestamp: "2024.10.16 09:45:12",
    title: "Secure Gateway Protocol (SGP-1)",
    excerpt:
      "Proposed framework for securing provincial data centers against intrusion sets.",
    downloadUrl: "#download-sgp1",
  },
  {
    id: "paper-3",
    timestamp: "2024.10.12 23:59:00",
    title: "Adversarial ML in Urdu NLP",
    excerpt:
      "Exploring evasion techniques in automated context string classification modeling.",
    downloadUrl: "#download-urdu-nlp",
  },
];

export const sampleNodes = [
  { id: "node-1", name: "Karachi Node", load: 42 },
  { id: "node-2", name: "Lahore Node", load: 28 },
  { id: "node-3", name: "Islamabad Node", load: 38 },
];
