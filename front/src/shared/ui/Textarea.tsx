"use client"

import { cn } from "@shared/utils"

/**
 * Пропсы для компонента Textarea
 */
interface TextareaProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

/**
 * Компонент Textarea
 */
export const Textarea = ({ className, name, value, onChange }: TextareaProps) => {
  const classes = cn(
    "p-2",
    "w-full",
    "border-2",
    "border-foreground/50",
    "focus:border-foreground",
    "focus:outline-none",
    "transition-colors",
    "duration-150",
    "rounded-md",
    className,
  )
  return (
    <textarea className={classes} name={name} value={value} rows={3} onChange={(e) => onChange?.(e.target.value)} />
  )
}
