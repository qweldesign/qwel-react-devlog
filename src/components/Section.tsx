function Section ({ name }: { name: string }) {
  return (
    <section id={name} className="section">
      <h2 className="section__heading">{name} section</h2>
    </section>
  )
}

export default Section
