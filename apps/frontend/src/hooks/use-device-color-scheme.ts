import { useState } from 'react'

const useDeviceColorScheme = () => {
  const deviceColorScheme = matchMedia('(prefers-color-scheme: dark)')

  const [isDark, setDark] = useState(deviceColorScheme.matches)
  const abort = new AbortController()

  // Handler for listening on device color scheme change
  const mediaQueryHandler = (ev: MediaQueryListEvent) => {
    setDark(ev.matches)
  }

  deviceColorScheme.addEventListener('change', mediaQueryHandler, {
    signal: abort.signal,
  })

  const unsubscribeMedia = () => abort.abort()

  return {
    isDark,
    unsubscribeMedia,
  }
}

export default useDeviceColorScheme
