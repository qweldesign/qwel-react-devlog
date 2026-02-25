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

export type ProviderConfig = 
  | ScrollToAnchorConfig
  | ActiveHeaderConfig
  | ScrollSpyConfig
