import { type ReactNode } from 'react'
import { type ProviderConfig } from '../types/providers'
import { ScrollToAnchorProvider } from '../providers/ScrollToAnchorProvider' 
import { ActiveHeaderProvider } from '../providers/ActiveHeaderProvider'
import { ScrollSpyProvider } from '../providers/ScrollSpyProvider'
import { ReadableOnScrollProvider } from '../providers/ReadableOnScrollProvider'

type Props = {
  children: ReactNode
  providers?: ProviderConfig[]
}

function AppProviders({ children, providers = [] }: Props) {
  return providers.reduceRight((acc, provider) => {
    switch (provider.name) {
      case 'scrollToAnchor':
        return (
          <ScrollToAnchorProvider cssVar={provider.cssVar} offset={provider.offset}>
            {acc}
          </ScrollToAnchorProvider>
        )
      case 'activeHeader':
        return (
          <ActiveHeaderProvider>
            {acc}
          </ActiveHeaderProvider>
        )
      case 'scrollSpy':
        return (
          <ScrollSpyProvider rootMargin={provider.rootMargin}>
            {acc}
          </ScrollSpyProvider>
        )
      case 'readableOnScroll':
        return (
          <ReadableOnScrollProvider enable={provider.enable} threshold={provider.threshold} rootMargin={provider.rootMargin} toggle={provider.toggle}>
            {acc}
          </ReadableOnScrollProvider>
        )
    }
  }, children)
}

export default AppProviders
