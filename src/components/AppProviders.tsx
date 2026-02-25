import { type ReactNode } from 'react'
import { type ProviderConfig } from '../types/providers'
import { ScrollToAnchorProvider } from '../providers/ScrollToAnchorProvider' 
import { ActiveHeaderProvider } from '../providers/ActiveHeaderProvider'

type Props = {
  children: ReactNode
  providers?: ProviderConfig[]
}

const providerRegistry = {
  scrollToAnchor: ScrollToAnchorProvider,
  activeHeader: ActiveHeaderProvider
}

function AppProviders({ children, providers = [] }: Props) {
  return providers.reduceRight((acc, provider) => {
    const Provider = providerRegistry[provider.name]
    return <Provider>{acc}</Provider>
  }, children)
}

export default AppProviders
