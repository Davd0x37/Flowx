import { type RefObject, useEffect, useState } from 'react'

export default (elementRef: RefObject<HTMLElement>, defaultState = false) => {
  const [isOnScreen, setIsOnScreen] = useState(defaultState)

  useEffect(() => {
    if (!elementRef?.current) return

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (!entry) return

      setIsOnScreen(entry.intersectionRatio > 0)
    })

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef])

  return isOnScreen
}
