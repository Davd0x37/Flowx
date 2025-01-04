import type { ElementType } from 'react'

type NavigationItem = {
  children?: NavigationItem[]
  disableIfAuthenticated?: boolean
  icon?: ElementType<object>
  isActive?: boolean
  render?: ElementType<object>
  showInDevMode?: boolean
  title: string
  url: string
}

export type { NavigationItem }
