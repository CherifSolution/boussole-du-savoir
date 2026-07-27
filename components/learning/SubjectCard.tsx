'use client'

import Link from 'next/link'

interface SubjectCardProps {
  name: string
  description: string
  icon?: string
  href: string
}

export default function SubjectCard({
  name,
  description,
  icon,
  href,
}: SubjectCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-brand p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
        {/* Icon/Visual */}
        <div className="mb-4 text-5xl group-hover:scale-110 transition-transform">
          {icon || '📚'}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--primary-main)] mb-2 group-hover:text-[var(--accent-secondary)] transition">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-dark)] opacity-75 mb-4">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[var(--accent-secondary)] font-semibold text-sm group-hover:translate-x-1 transition-transform">
          Commencer <span>→</span>
        </div>
      </div>
    </Link>
  )
}
