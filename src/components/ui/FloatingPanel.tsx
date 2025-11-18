'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface FloatingPanelProps {
  children: ReactNode
  className?: string
  onClose?: () => void
}

/**
 * Translucent floating panel for blog content
 */
export function FloatingPanel({
  children,
  className,
  onClose,
}: FloatingPanelProps) {
  return (
    <div
      className={clsx(
        'bg-black/60 backdrop-blur-lg rounded-lg shadow-2xl border border-white/10',
        'max-h-[80vh] overflow-y-auto',
        className
      )}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none z-10"
          aria-label="Close"
        >
          ×
        </button>
      )}
      {children}
    </div>
  )
}
