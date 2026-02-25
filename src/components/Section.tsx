import { useRef, useEffect } from 'react'
import { useScrollSpy } from '../providers/ScrollSpyProvider'


function Section ({ name }: { name: string }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollSpy = useScrollSpy()
  const registerSection = scrollSpy?.registerSection

  useEffect(() => {
    if (sectionRef.current) registerSection?.(sectionRef.current)
  }, [])

  return (
    <section id={name} className="section" ref={sectionRef}>
      <h2 className="section__heading">{name} section</h2>
    </section>
  )
}

export default Section
