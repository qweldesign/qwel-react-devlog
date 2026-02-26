import { type ProviderConfig } from './types/providers'
import AppProviders from './layout/AppProviders'
import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'

function App() {
  const providers: ProviderConfig[] = [
    { name: 'scrollToAnchor' }, // ← ActiveHeader を使用する場合は必須
    { name: 'activeHeader' },
    { name: 'scrollSpy' },
    { name: 'readableOnScroll' }
  ]

  return (
    <AppProviders providers={providers}>
      <Header />
      <Main />
      <Footer />
    </AppProviders>
  )
}

export default App
