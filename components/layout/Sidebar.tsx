'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

interface SidebarProps {
  items: NavItem[]
  title?: string
}

export default function Sidebar({ items, title }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-4 right-4 z-40 p-3 bg-[var(--primary-main)] text-white rounded-full shadow-lg hover:opacity-90"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-brand p-4 transition-transform duration-300 md:translate-x-0 md:relative md:top-0 md:h-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {title && <h2 className="text-lg font-bold text-[var(--primary-main)] mb-6">{title}</h2>}

        <nav className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                pathname === item.href
                  ? 'bg-[var(--primary-main)] text-white'
                  : 'text-[var(--text-dark)] hover:bg-[var(--primary-light)]'
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden mt-16"
        />
      )}
    </>
  )
}
