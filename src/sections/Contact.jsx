import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { contact } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import ExternalLink from '../components/ExternalLink'
import ContactForm from '../components/ContactForm'
import './Contact.css'

const channels = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: FiMail,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: `linkedin.com/in/${contact.linkedinHandle}`,
    href: contact.linkedinUrl,
    Icon: FiLinkedin,
    external: true,
  },
  {
    label: 'WhatsApp',
    value: contact.phoneDisplay,
    href: contact.whatsappUrl,
    Icon: FaWhatsapp,
    external: true,
  },
  {
    label: 'GitHub',
    value: `github.com/${contact.githubHandle}`,
    href: contact.githubUrl,
    Icon: FiGithub,
    external: true,
  },
]

function ChannelCard({ label, value, href, Icon, external }) {
  const content = (
    <>
      <span className="channel__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="channel__text">
        <span className="channel__label">{label}</span>
        <span className="channel__value">{value}</span>
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  )

  return external ? (
    <ExternalLink href={href} className="channel glass">
      {content}
    </ExternalLink>
  ) : (
    <a href={href} className="channel glass">
      {content}
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's Build Something Together"
          subtitle="Hiring for a frontend or React.js role, or need help with a web project? Send a message and I'll get back to you."
        />

        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__heading reveal">Reach me directly</h3>
            <p className="contact__message reveal" style={{ '--delay': '80ms' }}>
              I&apos;m always open to discussing new opportunities, freelance work or interesting
              projects.
            </p>
            <ul className="contact__channels">
              {channels.map((channel, index) => (
                <li
                  key={channel.label}
                  className="reveal"
                  style={{ '--delay': `${160 + index * 90}ms` }}
                >
                  <ChannelCard {...channel} />
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ '--delay': '120ms' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
