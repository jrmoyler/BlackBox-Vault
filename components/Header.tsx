'use client'
import { Search, Bell, Settings, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [time, setTime] = useState('')
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 2000)
  }

  return (
    <header
      className="h-16 flex items-center px-6 gap-4 border-b"
      style={{ borderColor: 'var(--color-border)', background: 'rgba(6,8,16,0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          <h1
            className="text-lg font-bold truncate"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <span className="text-xs hidden sm:block" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              — {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded text-sm"
        style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', minWidth: 200, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
      >
        <Search size={13} />
        <span>Search vault...</span>
        <span className="ml-auto opacity-50 text-xs">⌘K</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleSync}
          className="p-2 rounded transition-colors hover:bg-white/5"
          style={{ color: 'var(--color-text-secondary)' }}
          title="Sync data"
        >
          <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
        </button>
        <button className="p-2 rounded transition-colors hover:bg-white/5 relative" style={{ color: 'var(--color-text-secondary)' }}>
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
        </button>
        <button className="p-2 rounded transition-colors hover:bg-white/5" style={{ color: 'var(--color-text-secondary)' }}>
          <Settings size={15} />
        </button>
      </div>

      {/* System time */}
      <div
        className="hidden lg:block text-xs tabular-nums px-3 py-1.5 rounded"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--color-accent)',
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.15)',
        }}
      >
        {time} UTC
      </div>
    </header>
  )
}
