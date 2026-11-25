"use client"

import { useState } from "react"

import { corner, type CornerItemId } from "@/content"

const ink = "#2b2118"
const wood = "#8a5a35"
const clay = "#b4532a"
const hand = { fontFamily: "var(--font-caveat)" }

// The room is drawn in one-point-ish perspective: the back wall faces us, the left wall
// recedes towards the corner at x = 300, and floorboards run towards a vanishing point.
const VP = { x: 650, y: 200 }
const FLOOR_Y = 430
const CORNER_X = 300

/** Floorboard lines: from the wall/floor edge out to the bottom of the picture. */
function floorboards() {
  const starts: { x: number; y: number }[] = []
  for (let x = 0; x < CORNER_X; x += 75) starts.push({ x, y: FLOOR_Y + ((CORNER_X - x) * 130) / CORNER_X })
  for (let x = CORNER_X; x <= 1000; x += 64) starts.push({ x, y: FLOOR_Y })
  return starts.map(({ x, y }) => {
    const k = (620 - VP.y) / (y - VP.y)
    return { x1: x, y1: y, x2: VP.x + (x - VP.x) * k, y2: 620 }
  })
}

/** Points along the string-light wire (two quadratic curves). */
function bulbs() {
  const quad = (p0: number[], c: number[], p1: number[], t: number) => [
    (1 - t) ** 2 * p0[0] + 2 * t * (1 - t) * c[0] + t * t * p1[0],
    (1 - t) ** 2 * p0[1] + 2 * t * (1 - t) * c[1] + t * t * p1[1],
  ]
  const pts: number[][] = []
  for (let t = 0.15; t < 1; t += 0.28) pts.push(quad([0, 20], [150, 60], [300, 55], t))
  for (let t = 0.08; t < 1; t += 0.11) pts.push(quad([300, 55], [650, 95], [1000, 40], t))
  return pts
}

/** One hoverable, focusable, tappable object in the scene. */
function Item({
  id,
  active,
  onPick,
  children,
}: {
  id: CornerItemId
  active: CornerItemId | null
  onPick: (id: CornerItemId) => void
  children: React.ReactNode
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={corner[id].label}
      aria-pressed={active === id}
      className="corner-item"
      data-active={active === id || undefined}
      onMouseEnter={() => onPick(id)}
      onFocus={() => onPick(id)}
      onClick={() => onPick(id)}
    >
      {children}
    </g>
  )
}

/** A framed poster; its artwork is drawn in a 100×140 box and scaled to fit. */
function Poster({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="4" y="6" width="80" height="112" rx="2" fill="#000" opacity="0.12" />
      <svg width="80" height="112" viewBox="0 0 100 140" overflow="hidden">
        {children}
      </svg>
      <rect width="80" height="112" rx="2" fill="none" stroke={wood} strokeWidth="4" />
    </g>
  )
}

export function CozyCorner() {
  const [active, setActive] = useState<CornerItemId | null>(null)
  const item = (id: CornerItemId, children: React.ReactNode) => (
    <Item id={id} active={active} onPick={setActive}>
      {children}
    </Item>
  )

  return (
    <div>
      <svg
        viewBox="0 0 1000 620"
        className="w-full overflow-hidden rounded-3xl border border-latte"
        role="group"
        aria-label="An illustration of my room. Hover or tap the objects to learn a little about me."
      >
        <defs>
          <clipPath id="corner-window">
            <polygon points="50,104 230,114 230,291 50,326" />
          </clipPath>
          <radialGradient id="corner-lamp-glow">
            <stop offset="0%" stopColor="#fbe3b0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbe3b0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Room: back wall, left wall, floor */}
        <rect x={CORNER_X} width="700" height={FLOOR_Y} fill="#f6ecdf" />
        <polygon points={`0,0 ${CORNER_X},50 ${CORNER_X},${FLOOR_Y} 0,560`} fill="#ecdcc6" />
        <polygon points={`0,560 ${CORNER_X},${FLOOR_Y} 1000,${FLOOR_Y} 1000,620 0,620`} fill="#d6ab80" />
        {floorboards().map((l) => (
          <line key={l.x1} {...l} stroke="#c99b6e" strokeWidth="1.5" />
        ))}
        <rect x={CORNER_X} y={FLOOR_Y - 12} width="700" height="12" fill="#e3cfb5" />
        <polygon points={`0,548 ${CORNER_X},${FLOOR_Y - 12} ${CORNER_X},${FLOOR_Y} 0,560`} fill="#dcc5a8" />
        <line x1={CORNER_X} y1="50" x2={CORNER_X} y2={FLOOR_Y} stroke="#e3d2bb" strokeWidth="2" />

        {/* Sunlight from the window landing on the floor */}
        <polygon points="40,600 210,512 360,548 190,620" fill="#fff4e2" opacity="0.45" />

        {/* Rug */}
        <ellipse cx="600" cy="585" rx="290" ry="42" fill={clay} opacity="0.55" />
        <ellipse
          cx="600"
          cy="585"
          rx="250"
          ry="32"
          fill="none"
          stroke="#f4ebdf"
          strokeWidth="3"
          strokeDasharray="10 8"
        />

        {/* String lights along both walls */}
        <path d="M0 20 Q 150 60 300 55 Q 650 95 1000 40" fill="none" stroke="#6b5444" strokeWidth="2" />
        {bulbs().map(([x, y], i) => (
          <g key={x}>
            <line x1={x} y1={y} x2={x} y2={y + 10} stroke="#6b5444" strokeWidth="2" />
            <circle
              cx={x}
              cy={y + 17}
              r="6.5"
              fill="#f6c46b"
              className="twinkle"
              style={{ animationDelay: `${(i % 5) * 0.4}s` }}
            />
          </g>
        ))}

        {/* Window on the left wall, looking out at the Golden Gate */}
        {item(
          "window",
          <g>
            <g clipPath="url(#corner-window)">
              <rect x="50" y="100" width="180" height="230" fill="#f7d9b0" />
              <rect x="50" y="180" width="180" height="50" fill="#f2b98a" />
              <rect x="50" y="222" width="180" height="40" fill="#e9a07a" />
              <circle cx="200" cy="238" r="16" fill="#fbe3b0" />
              <ellipse cx="160" cy="140" rx="28" ry="8" fill="#fffaf3" opacity="0.8" />
              <path d="M50 262 Q 72 232 112 262 Z" fill="#b78a6a" />
              <rect x="50" y="258" width="180" height="70" fill="#8fa8b8" />
              <path d="M50 210 L 99 176 Q 140 238 189 176 L 230 204" fill="none" stroke={clay} strokeWidth="2.5" />
              {[115, 130, 150, 165].map((x) => (
                <line key={x} x1={x} y1="200" x2={x} y2="258" stroke={clay} strokeWidth="1.2" />
              ))}
              <rect x="94" y="172" width="9" height="92" fill={clay} />
              <rect x="184" y="172" width="9" height="92" fill={clay} />
              <rect x="50" y="255" width="180" height="6" fill="#953f1c" />
            </g>
            <polygon points="50,104 230,114 230,291 50,326" fill="none" stroke={wood} strokeWidth="9" />
            <line x1="140" y1="109" x2="140" y2="308" stroke={wood} strokeWidth="5" />
            <polygon points="40,324 238,288 246,297 38,337" fill="#b77a4b" />
          </g>,
        )}

        {/* Posters, hung gallery-style */}
        {item(
          "memories",
          <Poster x={360} y={120}>
            <rect width="100" height="140" fill="#3b3a35" />
            <rect y="95" width="100" height="45" fill="#c9a24a" />
            <path d="M0 95 Q 50 85 100 95" fill="#d8b45a" />
            <circle cx="38" cy="78" r="6" fill="#1f1d1a" />
            <rect x="32" y="84" width="12" height="20" rx="3" fill="#1f1d1a" />
            <circle cx="62" cy="76" r="6" fill="#1f1d1a" />
            <rect x="56" y="82" width="12" height="22" rx="3" fill="#1f1d1a" />
            <text x="50" y="22" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" letterSpacing="0.5">
              MEMORIES
            </text>
            <text x="50" y="34" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" letterSpacing="0.5">
              OF MURDER
            </text>
          </Poster>,
        )}
        {item(
          "hamnet",
          <Poster x={455} y={100}>
            <rect width="100" height="140" fill="#3f5b3a" />
            {[
              [12, 20, -30],
              [82, 18, 35],
              [20, 115, 25],
              [85, 120, -20],
              [50, 132, 0],
              [8, 70, 60],
              [94, 70, -60],
            ].map(([cx, cy, r]) => (
              <ellipse
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                rx="16"
                ry="7"
                fill="#6f8f4e"
                transform={`rotate(${r} ${cx} ${cy})`}
              />
            ))}
            <text
              x="50"
              y="76"
              textAnchor="middle"
              fontSize="16"
              fill="#fff"
              fontFamily="Georgia, serif"
              letterSpacing="2"
            >
              HAMNET
            </text>
          </Poster>,
        )}
        {item(
          "tangled",
          <Poster x={550} y={125}>
            <rect width="100" height="140" fill="#3d3a78" />
            {[
              [15, 18],
              [35, 30],
              [60, 14],
              [82, 26],
              [25, 50],
              [50, 42],
              [74, 55],
              [90, 44],
              [10, 70],
              [42, 66],
              [64, 78],
              [86, 72],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#f6c46b" />
            ))}
            <rect y="104" width="100" height="36" fill="#2c4a7a" />
            <path d="M30 104 L 70 104 L 62 114 L 38 114 Z" fill={wood} />
            <text
              x="50"
              y="132"
              textAnchor="middle"
              fontSize="16"
              fill="#f6c46b"
              fontFamily="Georgia, serif"
              fontStyle="italic"
            >
              Tangled
            </text>
          </Poster>,
        )}
        {item(
          "dune",
          <Poster x={645} y={105}>
            <rect width="100" height="140" fill="#141210" />
            <circle cx="120" cy="70" r="80" fill="#e07a2c" />
            <circle cx="138" cy="70" r="74" fill="#141210" />
            <text x="46" y="74" textAnchor="middle" fontSize="11" fill="#fff" letterSpacing="7">
              DUNE
            </text>
          </Poster>,
        )}
        <text x="430" y="272" fontSize="22" fill={clay} style={hand}>
          ↑ my Letterboxd top 4 ♥
        </text>

        {/* Shelf with books and the Chicago polaroid */}
        <rect x="780" y="236" width="185" height="10" rx="2" fill="#b77a4b" />
        <path d="M800 246 L 800 262 L 816 246 Z M944 246 L 944 262 L 928 246 Z" fill={wood} />
        {[
          [910, 196, 12, "#7a9a5c"],
          [923, 204, 11, "#e0a37a"],
          [935, 190, 13, "#5c4a3b"],
          [949, 200, 10, clay],
        ].map(([x, y, w, c]) => (
          <rect
            key={x}
            x={x as number}
            y={y as number}
            width={w as number}
            height={236 - (y as number)}
            rx="1.5"
            fill={c as string}
          />
        ))}
        {item(
          "polaroid",
          <g transform="rotate(6 845 190)">
            <rect x="803" y="149" width="86" height="98" fill="#000" opacity="0.1" />
            <rect x="800" y="146" width="86" height="98" fill="#fffdf9" />
            <rect x="807" y="153" width="72" height="64" fill="#f2c9a0" />
            <rect x="807" y="202" width="72" height="15" fill="#8fa8b8" />
            {[
              [811, 182, 8],
              [820, 172, 7],
              [828, 160, 9],
              [839, 176, 7],
              [847, 166, 8],
              [857, 180, 8],
              [866, 172, 8],
            ].map(([x, y, w]) => (
              <rect key={x} x={x} y={y} width={w} height={202 - y} fill="#5c4a3b" />
            ))}
            <text x="843" y="236" textAnchor="middle" fontSize="16" fill={ink} style={hand}>
              Chicago ♥
            </text>
          </g>,
        )}

        {/* Desk in three-quarter view */}
        <ellipse cx="640" cy="540" rx="300" ry="16" fill="#000" opacity="0.08" />
        <rect x="392" y="398" width="12" height="80" fill="#8f5a33" />
        <rect x="876" y="398" width="12" height="80" fill="#8f5a33" />
        <polygon points="380,360 900,360 932,400 348,400" fill="#c98b5a" />
        <rect x="348" y="400" width="584" height="16" fill="#a86b40" />
        <rect x="700" y="416" width="200" height="38" fill="#b77a4b" />
        <rect x="780" y="430" width="40" height="7" rx="3.5" fill={wood} />
        <rect x="358" y="416" width="14" height="128" fill="#a86b40" />
        <rect x="908" y="416" width="14" height="128" fill="#a86b40" />

        {/* Lamp and its warm glow (decoration) */}
        <circle cx="850" cy="330" r="110" fill="url(#corner-lamp-glow)" />
        <ellipse cx="895" cy="386" rx="20" ry="5" fill="#5c4a3b" />
        <path d="M895 384 L 905 320 L 862 290" fill="none" stroke="#5c4a3b" strokeWidth="5" strokeLinecap="round" />
        <polygon points="842,278 878,290 870,312 830,300" fill={clay} />

        {/* Laptop */}
        {item(
          "laptop",
          <g>
            <polygon points="515,300 625,300 632,380 508,380" fill="#3a2f27" />
            <polygon points="522,307 618,307 624,372 516,372" fill={ink} />
            {[
              [530, 318, 40, "#e0a37a"],
              [538, 330, 60, "#f4ebdf"],
              [538, 342, 36, "#b4532a"],
              [546, 354, 52, "#f4ebdf"],
              [538, 364, 28, "#e0a37a"],
            ].map(([x, y, w, c]) => (
              <rect key={y} x={x} y={y} width={w} height="5" rx="2.5" fill={c as string} />
            ))}
            <polygon points="505,380 635,380 655,396 485,396" fill="#cbbba8" />
          </g>,
        )}

        {/* Floor plant in the corner, with a little face */}
        {item(
          "plant",
          // Drawn at full size, then scaled down around the base of the pot so it stays little.
          <g transform="translate(262 566) scale(0.55) translate(-262 -566)">
            <ellipse cx="262" cy="566" rx="52" ry="9" fill="#000" opacity="0.1" />
            {[
              [222, 400, -35, 22, 52],
              [252, 372, -10, 22, 58],
              [286, 380, 18, 22, 56],
              [312, 410, 42, 20, 48],
              [206, 446, -62, 18, 42],
              [322, 452, 64, 18, 42],
              [266, 420, 4, 18, 46],
            ].map(([cx, cy, r, rx, ry], i) => (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                fill={i % 2 ? "#5f8048" : "#7a9a5c"}
                transform={`rotate(${r} ${cx} ${cy})`}
              />
            ))}
            <path d="M222 482 L 302 482 L 290 562 L 234 562 Z" fill="#c96f45" />
            <rect x="214" y="474" width="96" height="14" rx="4" fill={clay} />
            <circle cx="250" cy="514" r="3.5" fill={ink} />
            <circle cx="274" cy="514" r="3.5" fill={ink} />
            <path d="M254 526 Q 262 533 270 526" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="242" cy="524" r="5" fill="#f0997b" opacity="0.6" />
            <circle cx="282" cy="524" r="5" fill="#f0997b" opacity="0.6" />
          </g>,
        )}

        {/* Chair in the foreground (decoration): overlaps the desk to give depth */}
        <rect x="510" y="440" width="180" height="210" rx="34" fill="#7a5a44" />
        <rect x="528" y="458" width="144" height="170" rx="24" fill="#8d6a51" />
      </svg>

      <div className="mt-4 min-h-24 rounded-2xl border border-latte bg-white p-5" aria-live="polite">
        {active ? (
          <>
            <p className="font-serif text-lg font-semibold">{corner[active].label}</p>
            <p className="mt-1 text-cocoa">{corner[active].note}</p>
          </>
        ) : (
          <p className="font-hand text-2xl text-clay">Hover or tap anything in my corner ✨</p>
        )}
      </div>
    </div>
  )
}
