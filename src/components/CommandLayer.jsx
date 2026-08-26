import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * CommandLayer — Quiet Semantic Command & Discovery Palette
 *
 * Deterministic, zero-dependency intent matcher that translates natural search terms
 * into instant portfolio overlays, project links, or external destinations.
 */

const COMMAND_COMMANDS = [
  {
    id: 'hands-on',
    title: '◈ Hands-on Layer',
    subtitle: 'Current working stack & tools',
    category: 'OVERLAY',
    aliases: ['skills', 'skill', 'tools', 'stack', 'tech', 'technologies', 'hands-on', 'hands on', 'use', 'toolkit', 'languages', 'frameworks'],
    action: 'overlay:tools'
  },
  {
    id: 'evolution',
    title: '◇ Evolution Progression',
    subtitle: 'Builder progression & mental model shift',
    category: 'OVERLAY',
    aliases: ['evolution', 'journey', 'growth', 'progress', 'mindset', 'thinking', 'builder', 'how i build', 'stage', 'philosophy'],
    action: 'overlay:evolution'
  },
  {
    id: 'archive',
    title: '+ Project Archive',
    subtitle: '8 verified public systems & work atlas',
    category: 'OVERLAY',
    aliases: ['projects', 'project', 'work', 'archive', 'systems', 'more work', 'other work', 'atlas', 'history', 'codebases', 'repo'],
    action: 'overlay:moreWork'
  },
  {
    id: 'anveksha',
    title: 'Aryntra Anveksha ↗',
    subtitle: 'AI-Powered Preventive Health Screening Platform',
    category: 'FEATURED PROJECT',
    aliases: ['anveksha', 'anvek', 'health', 'screening', 'preventive', '01'],
    action: 'url:https://github.com/raghavendrashivam474/Aryntra_Anveksha'
  },
  {
    id: 'aayaam',
    title: 'Aryntra Aayaam ↗',
    subtitle: 'Developer Project Awareness CLI in Go',
    category: 'FEATURED PROJECT',
    aliases: ['aayaam', 'aayam', 'cli', 'awareness', 'go cli', '02'],
    action: 'url:https://github.com/raghavendrashivam474/aryntra-aayaam'
  },
  {
    id: 'tarka',
    title: 'Aryntra Tarka ↗',
    subtitle: 'Transparent Local-First Autonomous AI Agent',
    category: 'FEATURED PROJECT',
    aliases: ['tarka', 'agent', 'autonomous', 'local ai', 'agentic', '03'],
    action: 'url:https://github.com/raghavendrashivam474/aryntra-tarka'
  },
  {
    id: 'aryntra',
    title: 'Aryntra Platform ↗',
    subtitle: 'Where the work continues · arynta.com',
    category: 'CONTINUATION',
    aliases: ['aryntra', 'continuation', 'arynta', 'company', 'platform', 'vision'],
    action: 'url:https://arynta.com'
  },
  {
    id: 'contact-email',
    title: 'Email Raghavendra ↗',
    subtitle: 'raghavendrashivam474@gmail.com',
    category: 'CONTACT',
    aliases: ['contact', 'email', 'mail', 'reach', 'hire', 'message', 'gmail', 'raghavendrashivam474@gmail.com'],
    action: 'url:mailto:raghavendrashivam474@gmail.com'
  },
  {
    id: 'github-profile',
    title: 'GitHub Profile ↗',
    subtitle: 'github.com/raghavendrashivam474',
    category: 'CONTACT',
    aliases: ['github', 'git', 'code', 'profile', 'repositories', 'raghavendrashivam474'],
    action: 'url:https://github.com/raghavendrashivam474'
  },
  {
    id: 'linkedin-profile',
    title: 'LinkedIn Profile ↗',
    subtitle: 'linkedin.com/in/raghavendra-singh-2335292ab/',
    category: 'CONTACT',
    aliases: ['linkedin', 'in', 'network', 'profile', 'experience', 'raghavendra-singh'],
    action: 'url:https://www.linkedin.com/in/raghavendra-singh-2335292ab/'
  },
  {
    id: 'instagram-profile',
    title: 'Instagram Profile ↗',
    subtitle: '@raghavendra.builds · instagram.com/raghavendra.builds',
    category: 'CONTACT',
    aliases: ['instagram', 'insta', 'ig', 'social', 'socials', 'raghavendra.builds', 'photos', 'builds'],
    action: 'url:https://www.instagram.com/raghavendra.builds'
  }
]

// Simple deterministic fuzzy scorer
function matchScore(cmd, query) {
  const q = query.toLowerCase().trim()
  if (!q) return 1

  const titleMatch = cmd.title.toLowerCase().includes(q)
  const subtitleMatch = cmd.subtitle.toLowerCase().includes(q)
  const aliasExact = cmd.aliases.some((a) => a === q)
  const aliasPartial = cmd.aliases.some((a) => a.includes(q))

  if (aliasExact) return 100
  if (titleMatch) return 80
  if (aliasPartial) return 60
  if (subtitleMatch) return 40
  return 0
}

export default function CommandLayer({ onOpenTools, onOpenEvolution, onOpenMoreWork }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const filteredCommands = COMMAND_COMMANDS.map((cmd) => ({
    ...cmd,
    score: matchScore(cmd, query)
  }))
    .filter((cmd) => cmd.score > 0)
    .sort((a, b) => b.score - a.score)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setQuery('')
    setSelectedIndex(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  const executeAction = useCallback(
    (action) => {
      handleClose()
      if (action.startsWith('overlay:')) {
        const overlay = action.split(':')[1]
        if (overlay === 'tools') onOpenTools()
        if (overlay === 'evolution') onOpenEvolution()
        if (overlay === 'moreWork') onOpenMoreWork()
      } else if (action.startsWith('url:')) {
        const url = action.replace('url:', '')
        if (url.startsWith('mailto:')) {
          window.location.href = url
        } else {
          window.open(url, '_blank', 'noopener,noreferrer')
        }
      }
    },
    [handleClose, onOpenTools, onOpenEvolution, onOpenMoreWork]
  )

  // Global keydown listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't intercept if user is typing inside an existing input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      // Shortcut 1: Cmd/Ctrl + K or Forward Slash /
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        if (isOpen) {
          handleClose()
        } else {
          handleOpen()
        }
        return
      }

      // Shortcut 2: Type any letter (A-Z, 0-9) to start discovering
      if (!isOpen && e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        handleOpen()
        setQuery(e.key)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isOpen, handleOpen, handleClose])

  // Key navigation inside palette
  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      handleClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (filteredCommands.length ? (prev + 1) % filteredCommands.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (filteredCommands.length ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        executeAction(filteredCommands[selectedIndex].action)
      }
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 text-[11px] font-mono text-ash select-none flex items-center gap-2">
        <button
          type="button"
          onClick={handleOpen}
          className="px-3 py-1.5 rounded-md border border-border/80 bg-graphite/90 text-stone hover:text-ivory hover:border-copper/60 transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-copper group-hover:animate-ping" />
          <span>type or tap to explore</span>
          <span className="px-1.5 py-0.2 rounded border border-border bg-slate/60 text-copper text-[10px]">/</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-md transition-opacity duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette and search"
        className="fixed z-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-xl rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.12),0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* Input Bar */}
        <div className="p-4 border-b border-border/60 flex items-center gap-3">
          <span className="text-copper font-mono text-sm">⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type intent or system (e.g. skills, instagram, anveksha, contact)..."
            className="w-full bg-transparent text-ivory placeholder:text-ash text-sm font-mono outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            className="text-stone hover:text-ivory text-xs font-mono border border-border px-1.5 py-0.5 rounded cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Suggestions List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-ash">
              No direct matches for &quot;{query}&quot;. Try <span className="text-copper">skills</span>, <span className="text-copper">instagram</span>, or <span className="text-copper">projects</span>.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex

              return (
                <div
                  key={cmd.id}
                  onClick={() => executeAction(cmd.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate/70 text-ivory border border-copper/40 shadow-sm'
                      : 'text-stone hover:bg-slate/30 border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold font-mono text-ivory">
                        {cmd.title}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-copper bg-copper/10 px-1.5 py-0.2 rounded border border-copper/30">
                        {cmd.category}
                      </span>
                    </div>
                    <p className="text-xs text-stone truncate font-sans">
                      {cmd.subtitle}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-mono transition-opacity ${
                      isSelected ? 'text-copper opacity-100' : 'opacity-0'
                    }`}
                  >
                    ↵
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2 border-t border-border/60 bg-obsidian/40 flex items-center justify-between text-[10px] font-mono text-ash">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-copper/80">Semantic Command</span>
        </div>
      </div>
    </>
  )
}