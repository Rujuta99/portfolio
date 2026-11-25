"use client"

import { useEffect, useRef } from "react"

// The intro sits on top of the site. As the visitor scrolls, it slides down off the screen and
// uncovers the work underneath, moving exactly with the scroll (and back again when scrolling up).
// All positioning is applied from JavaScript, so without it the intro is simply the top of the page.

/** How much scrolling the slide takes, in screen heights. More = slower. */
const SLIDE_SCREENS = 1.6
const OPEN_EVENT = "intro:see-work"

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export function ScrollIntro({ className, children }: { className?: string; children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const spacer = spacerRef.current
    const intro = introRef.current
    const work = document.getElementById("work")
    if (!spacer || !intro || !work) return

    // extra: how much taller the intro is than the screen (read that part first, by scrolling normally).
    // slide: how much scrolling the slide-down takes.
    let screen = 0
    let extra = 0
    let slide = 0

    const update = () => {
      const s = window.scrollY
      const p = s <= extra ? 0 : Math.min(1, (s - extra) / slide)
      const y = s <= extra ? -s : -extra + p * (screen + extra)
      const done = p >= 1
      intro.style.transform = `translateY(${y}px)`
      intro.style.visibility = done ? "hidden" : ""
      intro.style.boxShadow = p > 0 ? "0 -18px 40px rgb(43 33 24 / 0.16)" : ""
      // Hold the work in place on screen until the intro is gone, then let it scroll normally.
      work.style.transform = done ? "" : `translateY(${s - (extra + slide)}px)`
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 4))
    }
    const layout = () => {
      Object.assign(intro.style, { position: "fixed", top: "0", left: "0", right: "0", zIndex: "40" })
      screen = window.innerHeight
      extra = Math.max(0, intro.offsetHeight - screen)
      slide = screen * SLIDE_SCREENS
      spacer.style.height = `${extra + slide}px`
      update()
    }
    const end = () => extra + slide

    // "See my work": play the same slide, slowly.
    const seeWork = () => {
      const from = window.scrollY
      const to = end()
      if (to <= from) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return window.scrollTo({ top: to })
      const t0 = performance.now()
      const duration = 2000
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / duration)
        window.scrollTo({ top: from + (to - from) * easeInOut(k), behavior: "instant" })
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    layout()
    // A link straight to a section (e.g. /#blogs) lands past the intro. The browser and Next also jump
    // to the hash around page load, so repeat ours briefly to have the final say.
    const target = window.location.hash ? document.querySelector(window.location.hash) : null
    const timers: number[] = []
    if (target && work.contains(target)) {
      const jump = () => {
        const offset = target.getBoundingClientRect().top - work.getBoundingClientRect().top
        window.scrollTo({ top: end() + offset - 96, behavior: "instant" })
        update()
      }
      jump()
      // Fonts and images finishing can still shift the layout, so keep correcting for a moment.
      for (const ms of [50, 200, 500, 1000, 1600]) timers.push(window.setTimeout(jump, ms))
      if (document.readyState !== "complete") window.addEventListener("load", jump, { once: true })
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", layout)
    window.addEventListener(OPEN_EVENT, seeWork)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", layout)
      window.removeEventListener(OPEN_EVENT, seeWork)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <div id="top" ref={spacerRef} aria-hidden />
      <section id="about" ref={introRef} className={`relative bg-cream ${className ?? ""}`}>
        {children}
        <p
          ref={hintRef}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-xl whitespace-nowrap text-mocha"
        >
          scroll down to see my work ↓
        </p>
      </section>
    </>
  )
}

export function SeeWorkButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      {children}
    </button>
  )
}
