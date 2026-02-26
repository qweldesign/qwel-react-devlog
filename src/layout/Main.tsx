import { sections } from '../types/navigation'
import Hero from '../projects/Hero'
import Section from '../projects/Section'

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
