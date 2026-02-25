import { type ProviderConfig } from './types/providers'
import AppProviders from './components/AppProviders'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const providers: ProviderConfig[] = [
    { name: 'scrollToAnchor' }, // ← ActiveHeader を使用する場合は必須
    { name: 'activeHeader' },
    { name: 'scrollSpy' }
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
