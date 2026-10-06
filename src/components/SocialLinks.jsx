import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { contact } from '../data/portfolio'
import ExternalLink from './ExternalLink'
import './SocialLinks.css'

const socials = [
  { label: 'LinkedIn', href: contact.linkedinUrl, Icon: FiLinkedin, external: true },
  { label: 'GitHub', href: contact.githubUrl, Icon: FiGithub, external: true },
  { label: 'Email', href: `mailto:${contact.email}`, Icon: FiMail, external: false },
  { label: 'WhatsApp', href: contact.whatsappUrl, Icon: FaWhatsapp, external: true },
]

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`social-links ${className}`.trim()}>
      {socials.map(({ label, href, Icon, external }) => {
        const content = <Icon aria-hidden="true" />
        return (
          <li key={label}>
            {external ? (
              <ExternalLink
                href={href}
                className="social-links__link"
                aria-label={`${label} (opens in a new tab)`}
                title={label}
              >
                {content}
              </ExternalLink>
            ) : (
              <a href={href} className="social-links__link" aria-label={label} title={label}>
                {content}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
