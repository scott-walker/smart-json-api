"use client"

import { cn } from "@shared/utils"

/**
 * Пропсы для компонента Tag
 */
interface TagProps {
  children: string
  className?: string
}

/**
 * Компонент Tag
 */
export const Tag = ({ className, children }: TagProps) => {
  const classes = cn("bg-secondary/50", "rounded-xl", "px-4", "py-1", className)

  return <div className={classes}>{children}</div>
}
