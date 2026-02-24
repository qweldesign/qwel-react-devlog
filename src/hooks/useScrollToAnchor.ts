// useScrollToAnchor.ts

import { type RefObject, useRef, useEffect } from 'react'

interface Options {
  cssVar?: string
  offset?: number
}

export function useScrollToAnchor(headerRef: RefObject<HTMLElement | null>, options: Options = {}) {
  // オプション
  const cssVar = options.cssVar ?? '--scroll-offset'
  const fallbackOffset = options.offset ?? 0

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

    // requestAnimationFrame でスロットル
    resizeTicking.current = true
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

    // history を汚さないため replaceState を使用
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
}
