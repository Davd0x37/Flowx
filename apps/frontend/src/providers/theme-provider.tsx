import { createContext, type ReactNode, useEffect } from 'react'
import { STORAGE_THEME_KEY } from '~/config/constants'
import useStorage from '~/hooks/use-storage'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  setTheme: (theme: Theme) => void
  theme: Theme
}

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: 'system',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_THEME_KEY,
  ...props
}: ThemeProviderProps) {
  const { setValue: setTheme, storedValue: theme } = useStorage<Theme>(
    storageKey,
    defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    setTheme,
    theme,
  }

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  )
}

export { ThemeProvider, ThemeProviderContext }
