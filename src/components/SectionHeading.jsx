import './SectionHeading.css'

export default function SectionHeading({ id, eyebrow, title, subtitle, align = 'center' }) {
  return (
    <header className={`section-heading section-heading--${align} reveal`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  )
}
