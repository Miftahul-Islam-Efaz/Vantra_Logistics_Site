import React, { useId, useMemo, useState, useEffect, useRef } from "react"

// Map Framer Transition `ease` value to a CSS animation-timing-function.
function mapEaseToCSS(ease: any): string {
    if (Array.isArray(ease) && ease.length === 4) {
        return `cubic-bezier(${ease.join(",")})`
    }
    switch (ease) {
        case "linear":
            return "linear"
        case "easeIn":
            return "ease-in"
        case "easeOut":
            return "ease-out"
        case "easeInOut":
            return "ease-in-out"
        case "circIn":
            return "cubic-bezier(0.6, 0.04, 0.98, 0.335)"
        case "circOut":
            return "cubic-bezier(0.075, 0.82, 0.165, 1)"
        case "circInOut":
            return "cubic-bezier(0.785, 0.135, 0.15, 0.86)"
        case "backIn":
            return "cubic-bezier(0.6, -0.28, 0.735, 0.045)"
        case "backOut":
            return "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        case "backInOut":
            return "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        default:
            return "ease-in-out"
    }
}

interface TextMorphProps {
    words?: string
    color?: string
    font?: {
        fontFamily?: string
        fontWeight?: string | number
        fontSize?: string | number
        letterSpacing?: string
        textAlign?: string
        [key: string]: any
    }
    transition?: {
        type?: string
        duration?: number
        delay?: number
        ease?: string | number[]
    }
    tag?: string
    className?: string
}

const COMPONENT_DEFAULTS = {
    words: "VANTRA\nLOGISTICS",
    transition: {
        type: "tween",
        duration: 1.2,
        delay: 2.0,
        ease: "easeInOut",
    },
    color: "#FFFFFF",
    font: {
        fontFamily: "var(--font-sans)",
        fontWeight: "900",
        fontSize: "12vw",
        lineHeight: "1.2em",
        letterSpacing: "-0.04em",
        textAlign: "center",
    } as any,
    tag: "div",
}

export default function TextMorph(props: TextMorphProps) {
    const finalProps = { ...COMPONENT_DEFAULTS, ...props }
    const { words, color, font, transition, tag, className } = finalProps

    const morph = Math.max(0.1, transition?.duration ?? 1)
    const hold = Math.max(0, transition?.delay ?? 1)
    const easeCurve = transition?.ease ?? "easeInOut"
    const easeCSS = mapEaseToCSS(easeCurve)

    const Tag = (tag ?? "div") as any
    const containerRef = useRef<HTMLElement | null>(null)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const timer = setTimeout(() => {
                        setShouldAnimate(true)
                    }, 2000)
                    return () => clearTimeout(timer)
                }
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    const wordList = useMemo<string[]>(
        () =>
            (words as string)
                .split(/\r?\n|\\n|,/)
                .map((w) => w.trim())
                .filter(Boolean),
        [words]
    )

    const rawId = useId()
    const safeId = rawId.replace(/[:]/g, "")
    const filterId = `tm-thr-${safeId}`
    const animName = `tm-rot-${safeId}`

    const count = Math.max(1, wordList.length)
    const slot = morph + hold
    const cycle = slot * count
    const pct = (s: number) => Math.min(100, (s / cycle) * 100).toFixed(4)
    const mIn = pct(morph)
    const mHold = pct(morph + hold)
    const mOut = pct(2 * morph + hold)

    const keyframes = `
@keyframes ${animName} {
  0% {
    opacity: 0;
    filter: blur(25px);
    transform: translate(-50%, -50%) scale(0.85);
  }
  ${mIn}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mHold}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mOut}%, 100% {
    opacity: 0;
    filter: blur(25px);
    transform: translate(-50%, -50%) scale(1.15);
  }
}
`

    const typeface = font ?? {}
    const textAlign: string = (typeface as any)?.textAlign ?? "center"
    const fontStyle = Object.fromEntries(
        Object.entries(typeface).filter(([k]) => k !== "textAlign")
    )

    const longest = wordList.reduce(
        (acc, w) => (w.length > acc.length ? w : acc),
        ""
    )

    return (
        <Tag
            ref={containerRef}
            className={className}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                userSelect: "none",
            }}
        >
            <style>{keyframes}</style>

            <svg
                style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                }}
                aria-hidden
            >
                <defs>
                    <filter id={filterId}>
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 25 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                style={{
                    position: "relative",
                    filter: `url(#${filterId})`,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: textAlign as any,
                    ...fontStyle,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight: 1.2,
                        minHeight: "1.2em",
                    }}
                >
                    {/* Width anchor: longest word reserves space so layout never shifts */}
                    <span
                        style={{
                            visibility: "hidden",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                        }}
                    >
                        {longest || " "}
                    </span>

                    {wordList.map((word, i) => {
                        const isFirstAndStatic = !shouldAnimate && i === 0
                        const isOtherAndStatic = !shouldAnimate && i > 0
                        return (
                            <span
                                key={`${word}-${i}`}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: isFirstAndStatic 
                                        ? "translate(-50%, -50%) scale(1)" 
                                        : isOtherAndStatic 
                                            ? "translate(-50%, -50%) scale(0.85)"
                                            : "translate(-50%, -50%)",
                                    opacity: isFirstAndStatic ? 1 : 0,
                                    filter: isFirstAndStatic ? "blur(0px)" : "blur(25px)",
                                    color,
                                    whiteSpace: "nowrap",
                                    animation: shouldAnimate
                                        ? `${animName} ${cycle}s ${(slot * i).toFixed(3)}s infinite ${easeCSS}`
                                        : "none",
                                    willChange: "opacity, filter, transform",
                                }}
                            >
                                {word}
                            </span>
                        )
                    })}
                </div>
            </div>
        </Tag>
    )
}
