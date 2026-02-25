// ReadableOnScrollProvider.tsx

import { type ReactNode, createContext, useContext, useRef, useState, useEffect } from 'react'

type ReadableOnScrollContextType = {
  enable: boolean
  toggle: boolean
  register: (el: HTMLElement, callback: (entry: IntersectionObserverEntry) => void) => void
  unregister: (el: HTMLElement) => void
}

interface Props {
  children: ReactNode
  enable?: boolean
  threshold?: number
  rootMargin?: string
  toggle?: boolean
}

const ReadableOnScrollContext = createContext<ReadableOnScrollContextType | null>(null)

export function ReadableOnScrollProvider(props: Props) {
  // オプション
  const {
    children,
    enable = true,
    threshold = 0.15,
    rootMargin = '0px 0px -12% 0px',
    toggle = false
  } = props

  // Inview ターゲットを格納
  const targetsRef = useRef<Map<HTMLElement, (entry: IntersectionObserverEntry) => void>>(new Map())

  // IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null)

  // クラス切り替え
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const callback = targetsRef.current.get(entry.target as HTMLElement)
      if (callback) callback(entry)
    })
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(onIntersect, { threshold, rootMargin })
  
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const register = (el: HTMLElement, callback: (entry: IntersectionObserverEntry) => void) => {
    if (!enable) return
    targetsRef.current.set(el, callback)
    observerRef.current?.observe(el)
  }

  const unregister = (el: HTMLElement) => {
    targetsRef.current.delete(el)
    observerRef.current?.unobserve(el)
  }

  return (
    <ReadableOnScrollContext.Provider value={{ enable, toggle, register, unregister }}>
      {children}
    </ReadableOnScrollContext.Provider>
  )
}

export function useReadableOnScroll() {
  const ctx = useContext(ReadableOnScrollContext)
  if (!ctx || !ctx.enable) return {
    el: useRef(null),
    isInview: useRef(true)
  }

  const el = useRef(null)
  const [isInview, setIsInview] = useState(false)

  useEffect(() => {
    if (!ctx || !el.current) return
    ctx.register(el.current, (entry) => {
      if (entry.isIntersecting) {
        setIsInview(true)
        if (!ctx.toggle) ctx.unregister(el.current!)
      } else if (ctx.toggle) {
        setIsInview(false)
      }
    })

    return () => {
      if (ctx && el.current) {
        ctx.unregister(el.current)
      }
    }
  }, []);

  return { el, isInview };
}
