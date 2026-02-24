// useActiveHeader.ts

import { type RefObject, type Dispatch, type SetStateAction, useRef, useEffect } from 'react'
import { useScrollToAnchor } from './useScrollToAnchor'

interface Options {
  cssVar?: string
  offset?: number
}

export function useActiveHeader(sentinelRef: RefObject<HTMLElement | null>, headerRef: RefObject<HTMLElement | null>, setIsActive: Dispatch<SetStateAction<boolean>>, options: Options = {}) {
  // ScrollToAnchor
  const { updateOffset } = useScrollToAnchor(headerRef, options)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (!entry) return
    setIsActive(entry.isIntersecting) // headerクラス切り替え
  }

  useEffect(() => {
    // IntersectionObserver 初期化
    observerRef.current = new IntersectionObserver(onIntersect, { threshold: 0 });
    // 監視開始
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return { updateOffset }
}
