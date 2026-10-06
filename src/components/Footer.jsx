import { FiArrowUp } from 'react-icons/fi'
import { navLinks, profile } from '../data/portfolio'
import SocialLinks from './SocialLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__name">
              {profile.name}
            </a>
            <p>{profile.title}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="footer__links">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks className="footer__socials" />
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
          <a href="#home" className="footer__top-link">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
