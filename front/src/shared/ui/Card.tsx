"use client"

import { cn } from "@shared/utils"

/**
 * Пропсы для компонента Card
 */
interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
}

/**
 * Компонент Card
 */
export const Card = ({ className, children, title }: CardProps) => {
  const classes = cn("bg-background-accent", "rounded-xl", className)

  return (
    <div className={classes}>
      {title && (
        <header className="px-6 py-3 border-b-2 border-background">
          <h2 className="text-2xl font-display">{title}</h2>
        </header>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
