export interface Project {
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
  extraHref?: string;
  extraLabel?: string;
  tags: string[];
  status?: string;
}

export interface Experience {
  role: string;
  company: string;
  companyHref?: string;
  period: string;
  description?: string;
}

export const projects: Project[] = [
  {
    title: "Diggit",
    description:
      "A federated, decentralized Git provider. A Next.js UI on top of a Rust API that owns git smart-HTTP, SSH, OAuth and social previews, with ActivityPub-inspired server-to-server messages so forks and pull requests work across different hosts. Deployed, under active development.",
    href: "https://github.com/haouarihk/diggit",
    hrefLabel: "github.com/haouarihk/diggit",
    extraHref: "https://git.haouarihk.com",
    extraLabel: "git.haouarihk.com",
    tags: ["Rust", "Next.js", "ActivityPub", "Postgres", "git"],
  },
  {
    title: "Web Tools",
    description:
      "A growing collection of small, genuinely useful web tools for developers and Discord users: JSON formatter, JWT decoder, cron builder, Discord timestamp converter, image compressor, CS2 kill-feed generator and more.",
    href: "https://tools.haouarihk.com",
    hrefLabel: "tools.haouarihk.com",
    tags: ["Web", "DevTools", "Discord"],
  },
  {
    title: "Text Generator, Obsidian plugin",
    description:
      "Major contributor to a 2k-star open-source AI plugin for Obsidian. Cross-provider text generation (OpenAI, Anthropic, Google, local models), community templates, CI and usability improvements shipped to a large user base.",
    href: "https://github.com/nhaouari/obsidian-textgenerator-plugin",
    hrefLabel: "github.com/nhaouari/obsidian-textgenerator-plugin",
    tags: ["TypeScript", "Obsidian", "AI", "Open Source"],
  },
  {
    title: "mcpsshub",
    description:
      "An open-source MCP server that lets you run commands on remote machines over a plain WebSocket, with no SSH keys and no direct connections. Agent installs with one script; the hub handles auth, endpoint discovery and rules.",
    href: "https://github.com/haouarihk/mcpsshub",
    hrefLabel: "github.com/haouarihk/mcpsshub",
    tags: ["MCP", "WebSocket", "Node.js", "Docker"],
  },
  {
    title: "Moderation API",
    description:
      "A self-hostable content moderation API that is drop-in compatible with OpenAI's moderation endpoint. BERT-based (ModerationBERT), detects 11 harm categories with confidence scores, ships CPU and GPU Docker images.",
    href: "https://github.com/haouarihk/moderationAPI",
    hrefLabel: "github.com/haouarihk/moderationAPI",
    tags: ["Python", "BERT", "FastAPI", "Docker", "AI"],
  },
  {
    title: "goImgTemplator",
    description:
      "A Go image-generation engine that renders dynamic badges, leaderboards and level-up cards from static PNG templates. Theme and pack system, composable text objects with relative positioning, custom fonts, and shiny variants.",
    href: "https://github.com/haouarihk/goImgTemplator",
    hrefLabel: "github.com/haouarihk/goImgTemplator",
    tags: ["Go", "Image", "Templates"],
  },
  {
    title: "Geoguessr → CS ranks extension",
    description:
      "Browser extension for Chrome and Firefox that swaps Geoguessr ranks for Counter-Strike ranks, because everything is funnier with an FPS rank on it.",
    tags: ["Browser Extension", "JavaScript"],
  },
  {
    title: "CS2 Linux tuning script",
    description:
      "A script that tweaks a Linux system to run Counter-Strike 2 better: lower input and audio latency, CPU governor and scheduler fixes, and the usual debloat. Born from tinkering for the love of it.",
    href: "https://github.com/haouarihk/cs2-linux-tweak",
    hrefLabel: "github.com/haouarihk/cs2-linux-tweak",
    tags: ["Linux", "Shell", "Gaming"],
  },
  {
    title: "Template sites",
    description:
      "Ready-to-deploy website templates, hosted and maintained as part of the small web-tools ecosystem.",
    href: "https://templates.haouarihk.com",
    hrefLabel: "templates.haouarihk.com",
    tags: ["Templates", "Web"],
  },
];

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Zoubda",
    companyHref: "https://zoubda.com",
    period: "Feb 2026 – Jun 2026",
    description:
      "Worked on Zoubda, a multilingual book-summary platform with thousands of readable and audio summaries in Arabic, English and French.",
  },
  {
    role: "Internal Scraping Tool",
    company: "Private agency",
    period: "Oct 2025 – Dec 2025",
    description:
      "Built an internal tool that scrapes and organizes client information for an agency. Private work, not open source.",
  },
  {
    role: "Plugin Contributor",
    company: "Obsidian Text Generator",
    companyHref: "https://github.com/nhaouari/obsidian-textgenerator-plugin",
    period: "2022 – now",
    description:
      "Enhanced the plugin with TypeScript, integrated GitHub Actions, and improved usability for content generation.",
  },
  {
    role: "Software Engineer",
    company: "Accommodation.co.uk",
    companyHref: "https://www.accommodation.co.uk",
    period: "2021 – 2022",
    description:
      "Freelance contract: API security hardening, Nuxt 2 to 3 migration, and UI improvements.",
  },
  {
    role: "POS System Developer",
    company: "Inventory App",
    companyHref: "https://github.com/haouarihk/POS-forShoes-svelte",
    period: "2019 – 2020",
    description:
      "Full-featured, offline-first POS application for a local shop, built with Svelte, Firebase and Electron.",
  },
  {
    role: "LaTeX Specialist",
    company: "word2latex.net",
    companyHref: "https://word2latex.net",
    period: "2019 – 2020",
    description:
      "Converted Word documents to LaTeX for university students and researchers, delivering clean, publication-ready formatting.",
  },
  {
    role: "Backend Developer",
    company: "docToLatexServer",
    companyHref: "https://github.com/haouarihk/docToLatexServer",
    period: "2019",
    description:
      "Document conversion server built with Node.js and Laravel for uploading and automated conversion.",
  },
];
