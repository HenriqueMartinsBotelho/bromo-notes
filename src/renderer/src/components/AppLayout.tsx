import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen bg-gray-900', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }) => {
  return (
    <aside
      className={twMerge('w-[250px] bg-black mt-8 h-[100vh + 2px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
