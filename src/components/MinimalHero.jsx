import { useState, useEffect } from 'react'

const PHRASES = [
  "I build solutions where reality breaks them.",
  "Local-first AI & resilient architecture.",
  "From mental models to production code."
]

export default function MinimalHero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex]
    let timer

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        }, 40)
      } else {
        // Pause for 5 seconds at full phrase
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

  return (
    <section className="w-full flex flex-col items-center justify-center text-center">
      {/* Monospace handle badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ash/60 bg-graphite/40 text-micro text-oxide font-mono tracking-widest uppercase mb-6 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-oxide animate-ping" />
        <span>raghu_007</span>
      </div>

      {/* Main Name */}
      <h1 className="text-4xl sm:text-6xl text-ivory font-semibold tracking-tight mb-4 text-center">
        Raghavendra Singh
      </h1>

      {/* Typewriter Subtitle */}
      <div className="w-full max-w-xl mx-auto min-h-[2.5rem] flex items-center justify-center text-center">
        <p className="text-stone/90 font-mono text-[0.95rem] sm:text-[1.2rem] text-center leading-relaxed">
          <span>{displayText}</span>
          <span
            className="inline-block bg-oxide ml-1 align-middle animate-pulse"
            style={{ width: '2px', height: '1.2em' }}
            aria-hidden="true"
          />
        </p>
      </div>
    </section>
  )
}
