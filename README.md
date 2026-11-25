# Rujuta Tambewagh — portfolio

My personal site: a single page with an intro, projects, blog posts, skills, a way to get in touch, and a small illustrated "My corner". Built with [Next.js](https://nextjs.org) and Tailwind CSS.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing the content

Almost everything on the page comes from `src/content.ts`:

| What | Where in `src/content.ts` |
| --- | --- |
| Name, role, location, bio, email, links | `profile` |
| The rotating "When I'm not building, I'm probably…" line | `profile.interests` |
| Projects (cards, tags, GitHub links) | `projects` |
| Blog posts (newest first) | `posts` |
| Skill groups | `skills` |
| Notes shown in "My corner" | `corner` |

The LinkedIn buttons use `profile.links.linkedin`; set it to "" to hide them.

Files in `public/`:

- `Rujuta_Tambewagh_Resume.pdf` is what the Resume button downloads. Replace it to update the resume.
- `rujuta-headshot.jpg` is the intro photo (a square image works best). If you rename it, update `profile.photo`.

## How it's put together

- `src/app/page.tsx` is the page layout.
- `src/components/intro-gate.tsx` is the intro that slides down as you scroll to reveal the work.
- `src/components/cozy-corner.tsx` is the "My corner" drawing.
- `src/components/reveal-observer.tsx` fades sections in as they scroll into view.
- `src/app/globals.css` holds the colour palette and animations.

## Deploying

The easiest option is [Vercel](https://vercel.com/new): import the repository and it builds with `npm run build`.
