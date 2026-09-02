import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import { PROFILE } from '../data/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__left">
          <div className="footer__brand font-heading">
            <span className="footer__brand-code mono">&lt;</span>
            {PROFILE.name.toUpperCase()}
            <span className="footer__brand-code mono"> /&gt;</span>
          </div>
          <p className="footer__tagline mono">
            {PROFILE.title} // Unity · UE5 · Eisen · LangGraph · 300K+
          </p>
        </div>

        <div className="footer__socials">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub aria-hidden="true" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin aria-hidden="true" />
          </a>
          <a href={PROFILE.devto} target="_blank" rel="noopener noreferrer" aria-label="DEV.to">
            <SiDevdotto aria-hidden="true" />
          </a>
          <a href={PROFILE.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <SiMedium aria-hidden="true" />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email">
            <FiMail aria-hidden="true" />
          </a>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy mono">
            © {new Date().getFullYear()} {PROFILE.name}. React · Vite · GitHub Pages.
          </span>
        </div>
      </div>
    </footer>
  )
}
