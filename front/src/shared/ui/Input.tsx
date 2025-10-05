"use client"

import { cn } from "@shared/utils"

/**
 * Пропсы для компонента Input
 */
interface InputProps {
  name?: string
  value?: string
  className?: string
  onChange?: (value: string) => void
}

/**
 * Компонент Input
 */
export const Input = ({ className, name, value, onChange }: InputProps) => {
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
    <input className={classes} type="text" name={name} value={value} onChange={(e) => onChange?.(e.target.value)} />
  )
}
