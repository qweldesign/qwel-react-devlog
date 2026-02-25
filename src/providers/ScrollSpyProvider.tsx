// ScrollSpyProvider.tsx

import { type ReactNode, createContext, useContext, useRef, useState, useEffect } from 'react'

type ScrollSpyContextType = {
  registerSection: (el: HTMLElement) => void
  currentId: string | null
}

interface Props {
  children: ReactNode
  rootMargin?: string
}

const ScrollSpyContext = createContext<ScrollSpyContextType | null>(null)

export function ScrollSpyProvider(props: Props) {
  // Provide
  const [currentId, setCurrentId] = useState<string | null>(null)

  // オプション
  const children = props.children
  const rootMargin = props.rootMargin ?? '-40% 0px -60% 0px' // ビューポート中央付近で交差判定

  // 二重登録防止のため Set を使用
  const spySectionsRef = useRef<Set<HTMLElement>>(new Set())

  // IntersectionObserver 初期化
  const observerRef = useRef<IntersectionObserver | null>(null)

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    // 交差しているセクションを抽出
    const isIntersecting = entries.find(e => e.isIntersecting)
    if (isIntersecting) {
      setCurrentId(isIntersecting.target.id)
    }
  }

  // セクション登録
  const registerSection = (el: HTMLElement) => {
    spySectionsRef.current.add(el)
    observerRef.current?.observe(el) // 監視開始
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(onIntersect, { rootMargin })
    
    spySectionsRef.current.forEach(el => {
      observerRef.current?.observe(el) // 既に登録済みの要素を監視
    })

    return observerRef.current?.disconnect()
  }, [])

  return (
    <ScrollSpyContext.Provider value={{ registerSection, currentId }}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

export function useScrollSpy() {
  return useContext(ScrollSpyContext)
}
