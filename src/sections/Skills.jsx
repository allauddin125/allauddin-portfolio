import { FiCloud, FiDatabase, FiLayers, FiLayout, FiLink, FiServer, FiSliders, FiSmartphone, FiDownloadCloud } from 'react-icons/fi'
import {
  SiAxios,
  SiBootstrap,
  SiCss,
  SiElementor,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiWordpress,
} from 'react-icons/si'
import { skillGroups } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import './Skills.css'

const groupIcons = {
  frontend: FiLayout,
  api: FiCloud,
  cms: FiDatabase,
  backend: FiServer,
}

// Small, recognisable icons for each listed technology (no proficiency scores).
const itemIcons = {
  HTML5: { Icon: SiHtml5, color: '#e34f26' },
  CSS3: { Icon: SiCss, color: '#2965f1' },
  'JavaScript (ES6+)': { Icon: SiJavascript, color: '#f7df1e' },
  'React.js': { Icon: SiReact, color: '#61dafb' },
  'Responsive Web Design': { Icon: FiSmartphone, color: '#7dd3fc' },
  Bootstrap: { Icon: SiBootstrap, color: '#8b5cf6' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38bdf8' },
  'REST APIs': { Icon: FiLink },
  'Fetch API': { Icon: FiDownloadCloud },
  Axios: { Icon: SiAxios },
  JSON: { Icon: SiJson },
  WordPress: { Icon: SiWordpress },
  ACF: { Icon: FiLayers },
  Elementor: { Icon: SiElementor },
  'WordPress Theme Customization': { Icon: FiSliders },
  PHP: { Icon: SiPhp },
  'Node.js': { Icon: SiNodedotjs },
  MySQL: { Icon: SiMysql },
}

function SkillIcon({ name, colored }) {
  const entry = itemIcons[name]
  if (!entry) return null
  const { Icon, color } = entry
  return <Icon aria-hidden="true" style={colored && color ? { color } : undefined} />
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Tech stack"
          title="Technical Skills"
          subtitle="Grouped by how I use them day to day — frontend first, with API, CMS and backend experience alongside."
        />

        <div className="skills__grid">
          {skillGroups.map(({ icon, title, items, featured, summary }, index) => {
            const Icon = groupIcons[icon]
            return (
              <article
                key={title}
                className={`skill-card glass reveal${featured ? ' skill-card--featured' : ''}`}
                style={{ '--delay': `${index * 90}ms` }}
              >
                <header className="skill-card__header">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  {featured && <span className="skill-card__flag">Primary focus</span>}
                </header>

                {summary && <p className="skill-card__summary">{summary}</p>}

                <ul className={featured ? 'skill-card__tiles' : 'skill-card__list'}>
                  {items.map((item) => (
                    <li key={item} className={featured ? 'skill-tile' : 'chip'}>
                      <SkillIcon name={item} colored={featured} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
