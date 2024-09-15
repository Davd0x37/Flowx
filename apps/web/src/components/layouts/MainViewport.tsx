import type { PropsWithChildren } from 'react'

const MainViewport = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-muted/60 font-sans text-base antialiased transition-colors">{children}</div>
  )
}

export { MainViewport }
