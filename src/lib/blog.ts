export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string;
}

const modules = import.meta.glob("/src/routes/blog/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }
  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) {
      frontmatter[line.slice(0, i).trim().toLowerCase()] = line
        .slice(i + 1)
        .trim();
    }
  }
  return { frontmatter, body: match[2].trim() };
}

export function getPosts(): BlogPost[] {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { frontmatter, body } = parseFrontmatter(raw);
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
      description: frontmatter.description || "",
      body,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, (_, c: string) => `<code>${escapeHtml(c)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, t: string, url: string) => `<a href="${escapeHtml(url)}">${t}</a>`,
    );
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listBuf: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (listBuf.length) {
      const tag = listType === "ol" ? "ol" : "ul";
      html.push(`<${tag}>${listBuf.map((x) => `<li>${x}</li>`).join("")}</${tag}>`);
      listBuf = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      flushPara();
      flushList();
      if (!inCode) {
        inCode = true;
        codeBuf = [];
      } else {
        html.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
        inCode = false;
      }
    } else if (inCode) {
      codeBuf.push(line);
    } else if (/^#{1,6}\s/.test(line)) {
      flushPara();
      flushList();
      const level = line.match(/^#{1,6}/)![0].length;
      html.push(`<h${level}>${inline(line.slice(level).trim())}</h${level}>`);
    } else if (/^>\s?/.test(line)) {
      flushPara();
      flushList();
      html.push(`<blockquote>${escapeHtml(line.replace(/^>\s?/, ""))}</blockquote>`);
    } else if (/^[-*]\s+/.test(line)) {
      flushPara();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listBuf.push(inline(line.replace(/^[-*]\s+/, "")));
    } else if (/^\d+\.\s+/.test(line)) {
      flushPara();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listBuf.push(inline(line.replace(/^\d+\.\s+/, "")));
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  }
  flushPara();
  flushList();
  return html.join("\n");
}