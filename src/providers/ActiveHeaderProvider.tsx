// ActiveHeaderProvider.tsx

import { type RefCallback, type ReactNode, createContext, useContext, useRef, useState, useEffect } from 'react'
import { useScrollToAnchor } from './ScrollToAnchorProvider'

interface ActiveHeaderContextType {
  registerSentinel: RefCallback<HTMLElement>
  registerHeader: RefCallback<HTMLElement>
  isActive: boolean
  updateOffset: () => void
}

interface Props {
  children: ReactNode
}

const ActiveHeaderContext = createContext<ActiveHeaderContextType | null>(null)

export function ActiveHeaderProvider(props: Props) {
  // Context
  const sentinelRef = useRef<HTMLElement | null>(null)
  const [isActive, setIsActive] = useState(true)

  // オプション
  const children = props.children

  // ScrollToAnchor
  const scrollToAnchor = useScrollToAnchor()
  if (!scrollToAnchor) return <>{children}</>
  const { registerHeader, updateOffset } = scrollToAnchor

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

  const registerSentinel = (sentinel: HTMLElement | null) => {
    sentinelRef.current = sentinel
  }

  return (
    <ActiveHeaderContext.Provider value={{ registerSentinel, registerHeader, isActive, updateOffset }}>
      {children}
    </ActiveHeaderContext.Provider>
  )
}

export const useActiveHeader = () => {
  return useContext(ActiveHeaderContext)
}
