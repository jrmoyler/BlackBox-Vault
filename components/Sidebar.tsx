'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Inbox, Database, Brain, BarChart3,
  Layers, DollarSign, FileText, Zap, ChevronRight,
  Shield, Activity
} from 'lucide-react'

const navItems = [
  { label: 'Command Center', href: '/', icon: LayoutDashboard, group: 'SYSTEM' },
  { label: 'Deal Intake', href: '/intake', icon: Inbox, group: 'SYSTEM' },
  { label: 'Data Vault', href: '/vault', icon: Database, group: 'CORE ENGINES' },
  { label: 'BDC Evaluation', href: '/evaluation', icon: Brain, group: 'CORE ENGINES' },
  { label: 'Correlation Engine', href: '/correlation', icon: Layers, group: 'CORE ENGINES' },
  { label: 'Capital Stack', href: '/capital', icon: DollarSign, group: 'CORE ENGINES' },
  { label: 'Deal DNA', href: '/dna', icon: Activity, group: 'CORE ENGINES' },
  { label: 'Investor Packaging', href: '/packaging', icon: FileText, group: 'OUTPUTS' },
  { label: 'Market Intelligence', href: '/market', icon: BarChart3, group: 'OUTPUTS' },
  { label: 'Platform Distribution', href: '/distribution', icon: Zap, group: 'OUTPUTS' },
]

const groups = ['SYSTEM', 'CORE ENGINES', 'OUTPUTS']

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <Shield size={16} color="var(--color-accent)" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 status-ping absolute inset-0" />
            </div>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-bold tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)' }}>
                BLACK BOX
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                VAULT v2.4.1
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-xs p-1 rounded transition-colors hover:text-white"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ChevronRight size={14} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {groups.map(group => {
          const items = navItems.filter(i => i.group === group)
          return (
            <div key={group} className="mb-4">
              {!collapsed && (
                <div className="px-3 mb-2 section-label" style={{ color: 'var(--color-text-muted)' }}>
                  {group}
                </div>
              )}
              {items.map(item => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm mb-0.5 transition-all ${
                      active ? 'nav-active' : 'hover:bg-white/5'
                    } ${collapsed ? 'justify-center' : ''}`}
                    style={{
                      color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: active ? 600 : 400,
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={16} className="flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Status footer */}
      {!collapsed && (
        <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="text-xs space-y-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {[
              { label: 'DATA VAULT', status: 'ONLINE', color: 'text-emerald-400' },
              { label: 'AI ENGINE', status: 'ACTIVE', color: 'text-emerald-400' },
              { label: 'CORRELATION', status: 'RUNNING', color: 'text-cyan-400' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>{s.label}</span>
                <span className={`${s.color} data-pulse`} style={{ fontSize: 9 }}>● {s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
