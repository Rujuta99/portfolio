"use client"

import { useEffect } from "react"

/**
 * Adds `in-view` to every [data-reveal] element once it reaches the lower part of the screen, or has
 * already been scrolled past. Checked on every scroll, so fast scrolls and nav-link jumps can't skip
 * an element and leave it invisible.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = () => {
      const line = window.innerHeight * 0.9
      document.querySelectorAll("[data-reveal]:not(.in-view)").forEach((el) => {
        if (el.getBoundingClientRect().top < line) el.classList.add("in-view")
      })
    }
    reveal()
    window.addEventListener("scroll", reveal, { passive: true })
    window.addEventListener("resize", reveal)
    // Content added later (e.g. a list re-rendering) gets checked too.
    const mutations = new MutationObserver(reveal)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.removeEventListener("scroll", reveal)
      window.removeEventListener("resize", reveal)
      mutations.disconnect()
    }
  }, [])

  return null
}
