import Image from "next/image"

import { CozyCorner } from "@/components/cozy-corner"
import { ScrollIntro, SeeWorkButton } from "@/components/intro-gate"
import { RevealObserver } from "@/components/reveal-observer"
import { RotatingText } from "@/components/rotating-text"
import { Squiggle } from "@/components/squiggle"
import { posts, profile, projects, skills } from "@/content"

/** Stagger delay for animated items, read by the CSS as --d. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

const nav = [
  { href: "#top", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Blogs" },
  { href: "#skills", label: "Skills" },
  { href: "#connect", label: "Connect" },
]

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} data-reveal className="mb-8 scroll-mt-24 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
      {title}
      <span className="text-clay">.</span>
    </h2>
  )
}

function ButtonLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(href.endsWith(".pdf") ? { download: "" } : {})}
      className={
        primary
          ? "rounded-full bg-clay px-5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-clay-dark"
          : "rounded-full border border-latte bg-white/60 px-5 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-clay"
      }
    >
      {children}
    </a>
  )
}

/** Small arrow that nudges up and to the right when its `group` is hovered. */
function OutArrow({ group = "group" }: { group?: "group" | "group/link" }) {
  const hover =
    group === "group"
      ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      : "group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
  return (
    <span aria-hidden className={`transition-transform ${hover}`}>
      ↗
    </span>
  )
}

const tagClass = "rounded-full bg-foam px-2.5 py-0.5 text-xs text-cocoa"

export default function Home() {
  return (
    <>
      {/* Intro: the whole first screen. "See my work" opens everything else. */}
      <ScrollIntro className="flex min-h-svh flex-col items-center justify-center gap-10 px-4 pt-16 pb-24 sm:px-6 md:flex-row md:gap-16">
        <div className="hero-item relative shrink-0">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={320}
            height={320}
            priority
            className="size-52 rounded-full border-4 border-white object-cover shadow-[0_10px_30px_-10px_rgb(43_33_24/0.35)] transition duration-300 hover:scale-[1.03] sm:size-64 lg:size-80"
          />
          {profile.photoBadge && (
            <span className="absolute -right-2 bottom-2 rounded-full border border-latte bg-white px-3 py-1 text-sm whitespace-nowrap shadow-sm">
              {profile.photoBadge}
            </span>
          )}
        </div>
        <div className="max-w-2xl">
          <p className="hero-item font-hand text-2xl text-clay sm:text-3xl" style={delay(50)}>
            hi there, I&apos;m
          </p>
          <h1
            className="hero-item relative mt-1 inline-block font-serif text-5xl font-semibold tracking-tight sm:text-6xl"
            style={delay(100)}
          >
            {profile.name}
            <Squiggle />
          </h1>
          <p className="hero-item mt-6 text-lg text-cocoa" style={delay(150)}>
            {profile.role} <span className="text-peach">·</span> {profile.location}
          </p>
          <p className="hero-item mt-5 leading-relaxed text-pretty text-cocoa" style={delay(200)}>
            {profile.bio}
          </p>
          <p className="hero-item mt-4 text-cocoa" style={delay(250)}>
            When I&apos;m not building, I&apos;m probably{" "}
            <RotatingText items={profile.interests} className="font-semibold text-clay" />.
          </p>
          <div className="hero-item mt-8 flex flex-wrap gap-3" style={delay(300)}>
            <SeeWorkButton className="group cursor-pointer rounded-full bg-clay px-5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-clay-dark">
              See my work{" "}
              <span aria-hidden className="inline-block transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </SeeWorkButton>
            <ButtonLink href={profile.resume}>Resume</ButtonLink>
            <ButtonLink href={profile.links.github}>GitHub</ButtonLink>
            {profile.links.linkedin && <ButtonLink href={profile.links.linkedin}>LinkedIn</ButtonLink>}
          </div>
        </div>
      </ScrollIntro>

      <div id="work">
        {/* Section links only; hidden on phones, where the page is short enough to scroll. */}
        <header className="sticky top-0 z-10 hidden border-b border-latte bg-cream/85 backdrop-blur sm:block">
          <div className="mx-auto flex max-w-5xl items-center justify-end px-4 py-3 sm:px-6">
            <nav aria-label="Sections" className="-mr-2 flex gap-1">
              {nav.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="link-slide rounded-md px-2 py-1 text-sm whitespace-nowrap text-mocha transition-colors hover:text-clay"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
          {/* Projects */}
          <section className="py-16">
            <SectionHeading id="projects" title="Projects" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <div key={p.title} data-reveal style={delay((i % 3) * 100)} className="flex">
                  <article className="flex flex-1 flex-col rounded-2xl border border-latte bg-white p-5 transition duration-300 hover:-translate-y-2 hover:border-peach hover:shadow-[0_14px_30px_-12px_rgb(43_33_24/0.25)]">
                    <h3 className="font-serif text-lg leading-snug font-semibold">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa">{p.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <li key={t} className={tagClass}>
                          {t}
                        </li>
                      ))}
                    </ul>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link mt-4 inline-flex items-center gap-1 self-start text-sm font-medium text-clay hover:text-clay-dark"
                      >
                        GitHub
                        <OutArrow group="group/link" />
                      </a>
                    )}
                  </article>
                </div>
              ))}
            </div>
          </section>

          {/* Blogs */}
          <section className="border-t border-latte py-16">
            <SectionHeading id="blogs" title="Blogs" />
            <ul className="-my-6 divide-y divide-latte">
              {posts.map((post, i) => (
                <li key={post.url} data-reveal style={delay(i * 100)}>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-4 flex flex-col gap-6 rounded-2xl px-4 py-6 transition-colors hover:bg-foam/60 md:flex-row-reverse md:items-center md:gap-10"
                  >
                    {post.image && (
                      // Unoptimized so animated GIFs keep playing.
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        width={post.image.width}
                        height={post.image.height}
                        unoptimized
                        className="w-full shrink-0 rounded-xl border border-latte md:w-1/2"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-semibold tracking-tight group-hover:text-clay">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-mocha">
                        <time dateTime={post.date}>{post.dateLabel}</time> · {post.readTime}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <li key={t} className={tagClass}>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 max-w-2xl leading-relaxed text-cocoa">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-clay">
                        Read on Medium
                        <OutArrow />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section className="border-t border-latte py-16">
            <SectionHeading id="skills" title="Skills" />
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {skills.map(({ group, items }, i) => (
                <div key={group} data-reveal style={delay((i % 2) * 100)}>
                  <dt className="text-sm font-semibold">{group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-latte bg-white px-3 py-1 text-sm text-cocoa transition-colors hover:border-clay hover:text-clay"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Connect */}
          <section className="border-t border-latte py-16">
            <SectionHeading id="connect" title="Connect with me" />
            <p data-reveal className="max-w-xl font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              Open to full-stack, backend, and AI/ML roles. Let&apos;s talk.
            </p>
            <div data-reveal style={delay(100)} className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`} primary>
                Email me
              </ButtonLink>
              {profile.links.linkedin && <ButtonLink href={profile.links.linkedin}>LinkedIn</ButtonLink>}
              <ButtonLink href={profile.links.github}>GitHub</ButtonLink>
            </div>
          </section>

          {/* My corner */}
          <section className="border-t border-latte py-16">
            <div data-reveal className="mb-8 flex flex-wrap items-baseline gap-x-4">
              <h2 id="corner" className="scroll-mt-24 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                My corner<span className="text-clay">.</span>
              </h2>
              <p className="font-hand text-2xl text-clay">a little about me</p>
            </div>
            <div data-reveal style={delay(100)}>
              <CozyCorner />
            </div>
          </section>
        </main>

        <RevealObserver />

        <footer className="border-t border-latte">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-mocha sm:px-6">
            <span>
              Made with <span className="text-clay">♥</span> by {profile.name}
            </span>
            <a href="#top" className="hover:text-clay">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
