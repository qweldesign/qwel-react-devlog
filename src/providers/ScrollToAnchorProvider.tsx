// ScrollToAnchorProvider.tsx

import { type RefCallback, type ReactNode, createContext, useContext, useRef, useEffect } from 'react'

interface ScrollToAnchorContextType {
  registerHeader: RefCallback<HTMLElement>
  updateOffset: () => void
}

interface Props {
  children: ReactNode
  cssVar?: string
  offset?: number
}

const ScrollToAnchorContext = createContext<ScrollToAnchorContextType | null>(null)

export function ScrollToAnchorProvider(props: Props) {
  // Context
  const headerRef = useRef<HTMLElement | null>(null)
  
  // オプション
  const children = props.children
  const cssVar = props.cssVar ?? '--scroll-offset'
  const fallbackOffset = props.offset ?? 0
  
  // resize throttle
  const resizeTicking = useRef(false)

  // header高さを取得
  const getHeaderOffset = () => {
    return headerRef ? headerRef.current?.offsetHeight : fallbackOffset
  }

  // CSS変数にセット
  const updateOffset = () => {
    const offset = getHeaderOffset()
    document.documentElement.style.setProperty(cssVar, `${offset}px`)
  }

  // リサイズ
  const onResize = () => {
    if (resizeTicking.current) return
    resizeTicking.current = true

    // requestAnimationFrame でスロットル
    requestAnimationFrame(() => {
      updateOffset()
      resizeTicking.current = false
    })
  }

  // CSS変数反映後にアンカー位置を再計算させるため,
  // hash を一度リセットして再適用する
  const correctInitialAnchor = () => {
    const { hash } = window.location
    if (!hash) return

    history.replaceState(null, '', window.location.pathname + window.location.search)
    history.replaceState(null, '', window.location.pathname + window.location.search + hash)
  }

  useEffect(() => {
    updateOffset()
    correctInitialAnchor()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const registerHeader = (header: HTMLElement | null) => {
    headerRef.current = header
  }

  return (
    <ScrollToAnchorContext.Provider value={{ registerHeader, updateOffset }}>
      {children}
    </ScrollToAnchorContext.Provider>
  )
}

export const useScrollToAnchor = () => {
  return useContext(ScrollToAnchorContext)
}
