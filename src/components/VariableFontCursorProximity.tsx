import * as React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"

const useIsStaticRenderer = () => false

type Props = {
    label: string
    fromWeight?: number
    toWeight?: number
    strength?: number
    fontSize?: string | number
    color?: string
    transition?: {
        type: string
        duration: number
        ease: string
    }
    style?: React.CSSProperties
    className?: string
    fontFamily?: string
    startAnimation?: boolean
}

const COMPONENT_DEFAULTS = {
    label: "Variable Font Proximity",
    fromWeight: 400,
    toWeight: 900,
    strength: 35,
    color: "currentColor",
    transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
    },
    startAnimation: true,
}

// Bundled variable font so the default animation works without the
// user having to load anything. Inter exposes both `wght` (100-900)
// and `slnt` (-10..0) axes, matching the default From/To strings.
const INTER_VARIABLE_FONT_FACE = `
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
}
`

const VARIABLE_FONT_STACK =
    '"InterVariableFramer", "Inter Variable", "Inter", system-ui, sans-serif'

const MAX_REACH = 800

export default function VariableFontCursorProximity(props: Props) {
    const mergedProps = { ...COMPONENT_DEFAULTS, ...props }
    const {
        label,
        fromWeight,
        toWeight,
        strength,
        fontSize,
        color,
        transition,
        style,
        className,
        fontFamily,
        startAnimation,
    } = mergedProps

    // Strength 1–100 → proximity reach in px (100 = MAX_REACH).
    const reach = Math.max(
        1,
        (Math.max(1, Math.min(100, strength)) / 100) * MAX_REACH
    )

    const isStatic = useIsStaticRenderer()

    // Self-contained: the component IS the container. Distance is
    // measured relative to this wrapper, not an external ref.
    const containerRef = useRef<HTMLDivElement>(null)

    // Refs to each rendered letter span, indexed in document order
    // matching the flat `letters` array below. The rAF loop mutates
    // each element's inline `fontVariationSettings` directly.
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([])

    // Per-letter current interpolation factor (0 = rest, 1 = full morph).
    // Eased toward the proximity target each frame so the hover effect
    // ramps in/out at the speed set by the Transition control instead of
    // snapping instantly.
    const letterFactorsRef = useRef<number[]>([])

    // Timestamp of the previous frame, for a robust frame delta.
    const lastFrameRef = useRef(0)

    // Mouse position relative to the container's top-left, updated on
    // every mousemove / touchmove. Stored in a ref so updates don't
    // trigger re-renders — only the rAF loop reads it.
    const mousePositionRef = useRef({ x: -99999, y: -99999 })

    useEffect(() => {
        if (isStatic) return

        const updatePosition = (clientX: number, clientY: number) => {
            const el = containerRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            mousePositionRef.current = {
                x: clientX - rect.left,
                y: clientY - rect.top,
            }
        }

        const handleMouseMove = (ev: MouseEvent) =>
            updatePosition(ev.clientX, ev.clientY)
        const handleTouchMove = (ev: TouchEvent) => {
            if (ev.touches.length === 0) return
            updatePosition(ev.touches[0].clientX, ev.touches[0].clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [isStatic])

    const isVariable = !fontFamily || fontFamily.toLowerCase().includes("inter")

    // Resting / hover wght values as variation-settings strings.
    const fromSettings = `'wght' ${fromWeight}`

    // Per-frame: walk every letter, compute distance from its center to the
    // cursor → a linear proximity target, ease the stored factor toward it at
    // the transition speed (both ramp-in and ramp-out), and stamp the
    // interpolated `wght` directly onto the DOM node.
    useAnimationFrame((now: number) => {
        if (isStatic) return
        const container = containerRef.current
        if (!container) return
        const containerRect = container.getBoundingClientRect()
        const mx = mousePositionRef.current.x
        const my = mousePositionRef.current.y

        // Frame delta in seconds (clamped so a stalled tab can't jump).
        const prevT = lastFrameRef.current || now
        const dtSec = Math.min(0.1, Math.max(0, (now - prevT) / 1000))
        lastFrameRef.current = now

        // Transition duration → exponential smoothing rate. Larger duration
        // = slower, softer ramp; ~0 = effectively instant.
        const tau = Math.max(0.016, transition?.duration ?? 0.3)
        const a = 1 - Math.exp(-dtSec / tau)

        for (let i = 0; i < letterRefs.current.length; i++) {
            const letterEl = letterRefs.current[i]
            if (!letterEl) continue
            const rect = letterEl.getBoundingClientRect()
            const cx = rect.left + rect.width / 2 - containerRect.left
            const cy = rect.top + rect.height / 2 - containerRect.top
            const dx = mx - cx
            const dy = my - cy
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Linear proximity target (1 at cursor, 0 at/beyond reach), then
            // ease the stored factor toward it at the transition speed.
            const target = Math.min(Math.max(1 - dist / reach, 0), 1)
            const prev = letterFactorsRef.current[i] ?? 0
            const f = prev + (target - prev) * a
            letterFactorsRef.current[i] = f

            if (f < 0.001) {
                if (isVariable) {
                    if (letterEl.style.fontVariationSettings !== fromSettings) {
                        letterEl.style.fontVariationSettings = fromSettings
                    }
                } else {
                    if (letterEl.style.fontVariationSettings) {
                        letterEl.style.fontVariationSettings = ""
                    }
                    if (letterEl.style.WebkitTextStroke !== "0px currentColor") {
                        letterEl.style.WebkitTextStroke = "0px currentColor"
                    }
                }
                if (letterEl.style.fontWeight !== String(fromWeight)) {
                    letterEl.style.fontWeight = String(fromWeight)
                }
                continue
            }

            // Interpolate wght both ways: from → to as the cursor nears.
            const w = Math.round(fromWeight + (toWeight - fromWeight) * f)
            if (isVariable) {
                letterEl.style.fontVariationSettings = `'wght' ${w}`
            } else {
                letterEl.style.fontVariationSettings = ""
                const strokeWidth = f * 1.5
                letterEl.style.WebkitTextStroke = `${strokeWidth}px currentColor`
            }
            letterEl.style.fontWeight = String(w)
        }
    })

    const srOnlyStyle: React.CSSProperties = {
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
    }

    const innerSpanStyle: React.CSSProperties = {
        fontFamily: fontFamily || VARIABLE_FONT_STACK,
        fontSize: fontSize || undefined,
        color: color || undefined,
        display: "block",
        width: "100%",
        lineHeight: 1.1,
    }

    // Split into words (preserving the gaps) so words don't break mid-line.
    const words = label ? label.split(" ") : []

    // Reset letterRefs to a fresh array each render
    letterRefs.current = []
    let letterIndex = 0

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: "relative",
                cursor: isStatic ? undefined : "pointer",
                ...style,
            }}
        >
            <style>{INTER_VARIABLE_FONT_FACE}</style>
            {words.length === 0 ? null : (
                <span style={innerSpanStyle}>
                    <span style={srOnlyStyle}>{label}</span>
                    {words.map((word, wi) => {
                        const wordLetters = word.split("")
                        return (
                            <React.Fragment key={wi}>
                                <span
                                    aria-hidden
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {wordLetters.map((letter, li) => {
                                        const idx = letterIndex++
                                        return (
                                            <motion.span
                                                key={li}
                                                ref={(el: HTMLSpanElement | null) => {
                                                    letterRefs.current[idx] = el
                                                }}
                                                initial={{ filter: "blur(12px)", opacity: 0, y: 20 }}
                                                animate={startAnimation ? { filter: "blur(0px)", opacity: 1, y: 0 } : { filter: "blur(12px)", opacity: 0, y: 20 }}
                                                transition={{
                                                    duration: 0.9,
                                                    delay: startAnimation ? idx * 0.02 : 0,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                style={{
                                                    display: "inline-block",
                                                    ...(isVariable ? {
                                                        fontVariationSettings: fromSettings,
                                                    } : {
                                                        WebkitTextStroke: "0px currentColor"
                                                    }),
                                                    fontWeight: fromWeight,
                                                }}
                                            >
                                                {letter}
                                            </motion.span>
                                        )
                                    })}
                                </span>
                                {wi < words.length - 1 && (
                                    <span
                                        aria-hidden
                                        style={{
                                            display: "inline-block",
                                        }}
                                    >
                                        &nbsp;
                                    </span>
                                )}
                            </React.Fragment>
                        )
                    })}
                </span>
            )}
        </div>
    )
}
