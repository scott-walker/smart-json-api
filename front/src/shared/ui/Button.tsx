"use client"

import { cn } from "@shared/utils"

/**
 * Пропсы для компонента Button
 */
interface ButtonProps {
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

/**
 * Компонент Button
 */
export const Button = ({ className, type = "button", onClick, children, disabled }: ButtonProps) => {
  const classes = cn(
    "px-8",
    "py-2",
    "w-fit",
    "bg-primary",
    "text-background",
    "focus:outline-none",
    "rounded-md",
    "cursor-pointer",
    className,
  )
  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
