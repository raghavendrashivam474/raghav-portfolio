import { useState, useEffect, useRef, useCallback } from 'react'

const PHRASES = [
  "I build solutions where reality breaks them.",
  "Local-first AI & resilient architecture.",
  "From mental models to production code."
]

// Multilingual translations for Raghavendra Singh
const NAME_TRANSLATIONS = [
  "Raghavendra Singh",
  "ラガヴェンドラ・シング", // Katakana Japanese
  "राघवेंद्र सिंह",       // Devanagari Hindi
  "ラガV3NDR4・シン"      // Cyber Matrix Cipher
]

const CIPHER_CHARS = "ラガヴェンドラシングラーガヴ01>_◈◇{}ラガシ"

export default function MinimalHero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Multilingual Cipher Name State
  const [displayedName, setDisplayedName] = useState("Raghavendra Singh")
  const [isHovered, setIsHovered] = useState(false)
  const translationIndex = useRef(0)
  const cipherIntervalRef = useRef(null)

  // Typewriter effect logic for tagline
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex]
    let timer

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        }, 40)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 5000)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1))
        }, 20)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length)
        }, 300)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, phraseIndex])

  // Cipher Scramble Animation Handler
  const triggerCipherScramble = useCallback((targetIndex) => {
    if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)

    const nextIndex =
      targetIndex !== undefined
        ? targetIndex
        : (translationIndex.current + 1) % NAME_TRANSLATIONS.length

    translationIndex.current = nextIndex
    const targetName = NAME_TRANSLATIONS[nextIndex]
    let iteration = 0

    cipherIntervalRef.current = setInterval(() => {
      setDisplayedName(
        targetName
          .split("")
          .map((char, index) => {
            if (char === " " || char === "・") return char
            if (index < iteration) {
              return targetName[index]
            }
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
          })
          .join("")
      )

      if (iteration >= targetName.length) {
        clearInterval(cipherIntervalRef.current)
      }

      iteration += 1 / 2.5
    }, 30)
  }, [])

  // Periodic 7-Second Multilingual Name Rotation Loop
  useEffect(() => {
    const nameRotationInterval = setInterval(() => {
      triggerCipherScramble()
    }, 7000)

    return () => {
      clearInterval(nameRotationInterval)
      if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
    }
  }, [triggerCipherScramble])

  return (
    <section className="w-full flex flex-col items-center justify-center text-center">
      {/* Monospace handle badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-graphite/90 text-micro text-copper font-mono tracking-widest uppercase mb-6 select-none shadow-md group cursor-pointer">
        <span className="w-1.5 h-1.5 rounded-full bg-copper animate-ping" />
        <span className="group-hover:text-oxide transition-colors">raghu_007</span>
      </div>

      {/* Multilingual Glitch Cipher Name (7s Periodic Loop + Hover/Click Trigger) */}
      <h1
        onMouseEnter={() => {
          setIsHovered(true)
          triggerCipherScramble()
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => triggerCipherScramble()}
        className={`text-4xl sm:text-6xl font-semibold tracking-tight mb-4 text-center cursor-pointer select-none transition-all duration-300 font-sans ${
          isHovered
            ? 'text-oxide drop-shadow-[0_0_20px_rgba(200,126,74,0.4)] scale-[1.02]'
            : 'text-ivory drop-shadow-md'
        }`}
        title="Periodic translation active. Hover or click to jump."
      >
        {displayedName}
      </h1>

      {/* Typewriter Subtitle */}
      <div className="w-full max-w-xl mx-auto min-h-[2.5rem] flex items-center justify-center text-center">
        <p className="text-ivory/90 font-mono text-[0.98rem] sm:text-[1.2rem] text-center leading-relaxed drop-shadow">
          <span>{displayText}</span>
          <span
            className="inline-block bg-copper ml-1 align-middle animate-pulse"
            style={{ width: '2px', height: '1.2em' }}
            aria-hidden="true"
          />
        </p>
      </div>
    </section>
  )
}