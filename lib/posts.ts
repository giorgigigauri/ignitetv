import fs from "fs";
import path from "path";

// File-based "From the Show" content until a backend feed exists.
// Posts live in content/from-the-show/<show-slug>/<file>.md with simple
// frontmatter (see the _template.md in that directory). Files starting
// with "_" are ignored.

export interface ShowPost {
  slug: string;
  type: string;
  title: string;
  date: string;
  image?: string;
  paragraphs: string[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "from-the-show");

export function getShowPosts(showSlug: string): ShowPost[] {
  const dir = path.join(CONTENT_DIR, showSlug);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      const meta: Record<string, string> = {};
      let body = raw;
      if (match) {
        for (const line of match[1].split(/\r?\n/)) {
          const i = line.indexOf(":");
          if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        }
        body = match[2];
      }
      return {
        slug: file.replace(/\.md$/, ""),
        type: meta.type || "post",
        title: meta.title || file.replace(/\.md$/, ""),
        date: meta.date || "",
        image: meta.image || undefined,
        paragraphs: body.trim() ? body.trim().split(/\n\s*\n/) : [],
      };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
