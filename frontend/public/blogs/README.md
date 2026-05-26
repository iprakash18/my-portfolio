# Blog Posts

This folder contains all blog posts for the site. Each post is a single Markdown (`.md`) file with YAML frontmatter at the top.

## How to add a new post

1. **Create a new file** in this folder named `your-post-slug.md` (use lowercase letters, numbers, and hyphens only — this becomes the URL).

2. **Add frontmatter and content** like this:

   ```md
   ---
   title: My Awesome New Post
   excerpt: A short 1-2 sentence summary that appears on the card.
   author: Prakash Iyyanarappan
   publishedDate: 2026-02-01
   readTime: 5
   tags: [Kubernetes, DevOps, AWS]
   category: DevOps
   featured: false
   sourceUrl: https://medium.com/your-original-post-url
   ---

   ## Section Heading

   Your markdown content here. Standard Markdown is supported:

   - Bullet lists
   - **Bold**, *italic*, `inline code`
   - [Links](https://example.com)
   - Images: ![alt](/blogs/images/my-image.png)

   ### Code blocks

   ```bash
   kubectl get pods -A
   ```
   ```

3. **Register the post** by adding its slug to `index.json`:

   ```json
   {
     "posts": [
       "your-post-slug",
       "docker-compose-elk",
       ...
     ]
   }
   ```

   The order in `index.json` is only used as a tiebreaker — posts are displayed sorted by `publishedDate` (newest first), with `featured: true` posts appearing first.

4. **Save & push** using the "Save to GitHub" button. GitHub Pages will redeploy automatically.

## Frontmatter reference

| Field | Required | Description |
|---|---|---|
| `title` | yes | Article title shown on card and detail page |
| `excerpt` | yes | 1-3 sentence summary for the card |
| `author` | no | Defaults to "Prakash Iyyanarappan" |
| `publishedDate` | yes | `YYYY-MM-DD` |
| `readTime` | yes | Minutes (integer) |
| `tags` | yes | Array, e.g. `[Docker, AWS]` |
| `category` | yes | One of: DevOps, Cloud Infrastructure, Security, etc. |
| `featured` | no | `true` or `false` |
| `sourceUrl` | no | Original post URL if cross-posted (Medium, etc.) |

## Adding images

Drop image files into `frontend/public/blogs/images/` and reference them as `/blogs/images/filename.png` in your markdown.
