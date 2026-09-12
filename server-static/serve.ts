/**
 * Minimal static file server for the pre-rendered site.
 *
 * Qwik City's static adapter emits plain HTML files into `dist/`.
 * This server maps incoming requests to those files, so nothing is
 * rendered at request time.
 */
import { stat } from "node:fs/promises";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(join(dirname(fileURLToPath(import.meta.url)), "..", "dist"));
const PORT = Number(Bun.env.PORT ?? 4173);
const HOST = Bun.env.HOST ?? "0.0.0.0";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "text/xml; charset=utf-8",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Content-hashed build output that can be cached forever.
const IMMUTABLE = /^\/(build|assets)\//;

async function statFile(path: string) {
  try {
    return await stat(path);
  } catch {
    return null;
  }
}

/**
 * Resolve a URL pathname to a file under the dist root, or null if
 * there is nothing to serve.
 */
async function resolveFile(pathname: string): Promise<string | null> {
  const filePath = resolve(join(ROOT, pathname));

  // Reject anything that escapes the dist root.
  if (filePath !== ROOT && !filePath.startsWith(ROOT + sep)) {
    return null;
  }

  const info = await statFile(filePath);
  if (!info) {
    return null;
  }

  if (info.isDirectory()) {
    const indexPath = join(filePath, "index.html");
    if (await statFile(indexPath)) {
      return indexPath;
    }
    return null;
  }

  return filePath;
}

async function serveFile(
  path: string,
  status = 200,
  immutableCache = false,
): Promise<Response> {
  const file = Bun.file(path);
  const headers: Record<string, string> = {
    "Content-Type": MIME[extname(path)] ?? "application/octet-stream",
    "Cache-Control": immutableCache
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  };
  return new Response(file, { status, headers });
}

async function notFound(): Promise<Response> {
  return serveFile(join(ROOT, "404.html"), 404);
}

Bun.serve({
  hostname: HOST,
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);

    let filePath: string | null = null;
    try {
      filePath = await resolveFile(decodeURIComponent(url.pathname));
    } catch {
      filePath = null;
    }

    if (filePath) {
      return serveFile(filePath, 200, IMMUTABLE.test(url.pathname));
    }

    return notFound();
  },
});

// eslint-disable-next-line no-console
console.log(`Static server listening on http://${HOST}:${PORT}`);