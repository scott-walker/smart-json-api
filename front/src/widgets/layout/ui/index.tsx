"use client"

/**
 * Пропсы для компонента Layout
 */
interface LayoutProps {
  header: React.ReactNode
  children: React.ReactNode
}

/**
 * Главный макет приложения
 */
export const Layout = ({ header, children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <header>{header}</header>
      <main className="px-12 py-6">{children}</main>
    </div>
  )
}
