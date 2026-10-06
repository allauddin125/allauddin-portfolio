import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { SiCss, SiHtml5, SiJavascript, SiReact } from 'react-icons/si'
import { profile } from '../data/portfolio'
import SocialLinks from '../components/SocialLinks'
// Transparent, optimized version of assets/portfolio-banner-img.webp
import bannerImg from '../assets/portfolio-banner-hero.webp'
import './Hero.css'

// Core frontend stack shown as small static chips around the portrait
const stack = [
  { label: 'React.js', Icon: SiReact, mod: 'react' },
  { label: 'JavaScript', Icon: SiJavascript, mod: 'js' },
  { label: 'HTML5', Icon: SiHtml5, mod: 'html' },
  { label: 'CSS3', Icon: SiCss, mod: 'css' },
]

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-line" aria-hidden="true" />
            {profile.role}
          </p>
          <h1 id="hero-title" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__role">{profile.heroHeadline}</p>
          <p className="hero__intro">{profile.heroIntro}</p>

          <div className="hero__actions">
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn--primary">
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
            <a href="#contact" className="btn btn--ghost">
              Let&apos;s Talk <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <SocialLinks className="hero__socials" />
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          {/* Photo, circle and ring float together so the circular clip always lines up */}
          <div className="hero__figure">
            <div className="hero__ring" aria-hidden="true" />
            <div className="hero__circle" aria-hidden="true" />
            <div className="hero__photo">
              <img
                src={bannerImg}
                alt="Portrait of Allauddin Ali"
                width="760"
                height="1172"
                decoding="async"
              />
            </div>
          </div>

          <ul className="hero__stack" aria-label="Core frontend stack">
            {stack.map(({ label, Icon, mod }) => (
              <li key={label} className={`hero__chip hero__chip--${mod}`}>
                <Icon aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="hero__stat">
            <strong>15+</strong>
            <span>Live Projects</span>
          </div>
        </div>
      </div>
    </section>
  )
}
