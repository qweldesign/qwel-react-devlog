import { sections } from '../types/navigation'
import Hero from './Hero'
import Section from './Section'

function Main() {
  return (
    <main>
      <Hero />
      {sections.map(name => (
        <Section key={name} name={name} />
      ))}
    </main>
  )
}

export default Main
