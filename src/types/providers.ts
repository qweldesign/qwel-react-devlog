// providers.ts

type ScrollToAnchorConfig = {
  name: 'scrollToAnchor'
  cssVar?: string
  offset?: number
}

type ActiveHeaderConfig = {
  name: 'activeHeader'
}

export type ProviderConfig = 
  | ScrollToAnchorConfig
  | ActiveHeaderConfig
