// providers.ts

type ScrollToAnchorConfig = {
  name: 'scrollToAnchor'
  cssVar?: string
  offset?: number
}

type ActiveHeaderConfig = {
  name: 'activeHeader'
}

type ScrollSpyConfig = {
  name: 'scrollSpy'
  rootMargin?: string
}

type ReadableOnScroll = {
  name: 'readableOnScroll'
  enable?: boolean
  threshold?: number
  rootMargin?: string
  toggle?: boolean
}

export type ProviderConfig = 
  | ScrollToAnchorConfig
  | ActiveHeaderConfig
  | ScrollSpyConfig
  | ReadableOnScroll
