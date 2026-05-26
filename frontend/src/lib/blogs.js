// Lightweight YAML frontmatter parser + blog loader for /public/blogs/*.md
// No external deps — works in browser.

function parseValue(raw) {
  let v = raw.trim();
  if (v === '') return '';
  // Quoted string
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  // Array: [a, b, "c"]
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map(s => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  // Boolean
  if (v === 'true') return true;
  if (v === 'false') return false;
  // Number
  if (!isNaN(v) && /^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const yaml = match[1];
  const body = match[2];
  const data = {};
  yaml.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!m) return;
    data[m[1]] = parseValue(m[2]);
  });
  return { data, content: body };
}

const BLOGS_BASE = `${process.env.PUBLIC_URL || ''}/blogs`;

// Cache to avoid refetching during a session
let _indexCache = null;
const _postCache = new Map();

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.text();
}

async function fetchJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json();
}

/** Load a single post by slug. Returns { slug, ...frontmatter, content }. */
export async function loadPost(slug) {
  if (_postCache.has(slug)) return _postCache.get(slug);
  const raw = await fetchText(`${BLOGS_BASE}/${slug}.md`);
  const { data, content } = parseFrontmatter(raw);
  const post = {
    slug,
    author: 'Prakash Iyyanarappan',
    featured: false,
    tags: [],
    ...data,
    content,
  };
  _postCache.set(slug, post);
  return post;
}

/** Load all posts (metadata + content). Sorted: featured first, then newest. */
export async function loadAllPosts() {
  if (!_indexCache) {
    _indexCache = await fetchJSON(`${BLOGS_BASE}/index.json`);
  }
  const slugs = _indexCache.posts || [];
  const posts = await Promise.all(
    slugs.map(slug =>
      loadPost(slug).catch(err => {
        console.error(`[blog] Skipping "${slug}":`, err.message);
        return null;
      })
    )
  );
  return posts
    .filter(Boolean)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.publishedDate) - new Date(a.publishedDate);
    });
}
