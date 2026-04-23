# jchackett.me README.md

A few years ago I tried to make a static website with [Jekyll](https://jekyllrb.com/), but LLMs weren't quite there yet in terms of being helpful (at least for my skill level -- plus the expression 'vibecoding' hadn't become ubiquitious). I abandoned the mission of that website -- it was too fussy. During that time, I did learn how to use VS Code to a rudimentary degree.

A month ago, I decided to take another swing at a site. This time, I pulled ChatGpt 5.4 into the mix. It recommended [Netlify](www.netlify.com) & [11ty](www.11ty.dev), so I got to work.

At first, I worked very cut and paste with just ChatGPT, so the piping of this whole operation was set up with my understanding. Only recently have I turned to Git CoPilot to work more quickly.

## Notes Setup

A minimal public notes space lives at `jchackett.me/notes/` (and `notes.jchackett.me` once DNS is configured — see below).

### Where to put new notes

Drop a Markdown file into `src/notes/`. That's it. The file becomes a page automatically.

**Minimum frontmatter:**

```yaml
---
title: Your note title
date: 2026-04-23
---
```

**Optional:**

```yaml
subtitle: A one-line description shown under the title on the note and in the feed
```

### File naming

Use a short slug with no spaces: `on-something.md` → published at `/notes/on-something/`.

No date prefix needed in the filename — the date comes from frontmatter and the feed sorts by it automatically.

### Authoring workflow

1. Create `src/notes/your-slug.md`
2. Add the required frontmatter (`title` and `date`)
3. Write the note in Markdown below the frontmatter block
4. Commit and push — Netlify builds and publishes automatically

### Setting up `notes.jchackett.me`

Two manual steps required in Netlify and DNS:

#### 1. Netlify — add domain alias

- Go to your Netlify site → **Domain settings** → **Add domain alias**
- Enter: `notes.jchackett.me`
- Save

#### 2. DNS — add CNAME record

In your DNS provider (wherever `jchackett.me` is registered), add:

| Type  | Name    | Value                             |
|-------|---------|-----------------------------------|
| CNAME | `notes` | `[your-netlify-site].netlify.app` |

Replace `[your-netlify-site]` with your actual Netlify subdomain (visible in Netlify site settings).

Once both are done, `notes.jchackett.me/` will redirect to `notes.jchackett.me/notes/`, and all notes will be accessible there. The redirect rule is already in `netlify.toml`.
