/** Hand-drawn wavy underline; place inside a `relative inline-block` element. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden
      className={`absolute -bottom-2 left-0 h-3 w-full text-peach ${className ?? ""}`}
    >
      <path
        d="M2 8 C 30 2, 50 12, 80 6 S 130 2, 160 7 S 190 9, 198 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
