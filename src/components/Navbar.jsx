import { useEffect, useRef, useState } from 'react'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import { navLinks, profile } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'
import './Navbar.css'

const SECTION_IDS = navLinks.map((link) => link.id)
const MOBILE_BREAKPOINT = 960

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`navbar${scrolled || open ? ' navbar--solid' : ''}`}>
      <nav className="container navbar__inner" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={close}>
          <span className="navbar__name">{profile.name}</span>
          <span className="navbar__tagline">{profile.title}</span>
        </a>

        <ul id="primary-menu" className={`navbar__links${open ? ' is-open' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`navbar__link${active === id ? ' is-active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={close}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="navbar__menu-cta">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="btn btn--primary"
              onClick={close}
            >
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
          </li>
        </ul>

        <a
          href={profile.resumeUrl}
          download={profile.resumeFileName}
          className="btn btn--primary btn--sm navbar__cta"
        >
          <FiDownload aria-hidden="true" /> Download Resume
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}
