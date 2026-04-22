import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const joined = normalize(join(root, decoded));
  if (joined !== root && !joined.startsWith(root + sep)) return null;
  return joined;
}

async function resolveTarget(fsPath) {
  try {
    const s = await stat(fsPath);
    if (s.isDirectory()) {
      const indexPath = join(fsPath, "index.html");
      const is = await stat(indexPath).catch(() => null);
      if (is && is.isFile()) return indexPath;
      return null;
    }
    if (s.isFile()) return fsPath;
    return null;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const target = safeJoin(ROOT, req.url || "/");
  if (!target) {
    res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }
  const resolved = await resolveTarget(target);
  if (!resolved) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  try {
    const data = await readFile(resolved);
    const type = MIME[extname(resolved).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "content-type": type,
      "cache-control": "no-store"
    });
    res.end(data);
  } catch {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`serving ${ROOT} at http://localhost:${PORT}`);
});
