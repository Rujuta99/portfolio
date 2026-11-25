"use client"

import { useEffect, useState } from "react"

/** Cycles through `items`, popping each one in. Shows the first item only for reduced-motion users. */
export function RotatingText({ items, className, ms = 2400 }: { items: string[]; className?: string; ms?: number }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setI((n) => (n + 1) % items.length), ms)
    return () => clearInterval(id)
  }, [items.length, ms])

  return (
    <span key={i} aria-live="polite" className={`inline-block motion-safe:animate-[pop_0.4s_ease] ${className ?? ""}`}>
      {items[i]}
    </span>
  )
}
