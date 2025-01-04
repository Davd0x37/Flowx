import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { NavigationItem } from '~/types/navigation'
import { IS_DEV } from '~/config/constants'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function filterDevModeItems(item: NavigationItem) {
  if (item.showInDevMode === undefined) return true

  return item.showInDevMode && IS_DEV
}

function filterIfAuthenticated(isAuthenticated: boolean) {
  return (item: NavigationItem) => {
    if (item.disableIfAuthenticated === undefined) return true

    return !(item.disableIfAuthenticated && isAuthenticated)
  }
}

export { cn, filterDevModeItems, filterIfAuthenticated }
