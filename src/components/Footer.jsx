import { FiGithub, FiLinkedin, FiMail, FiTerminal } from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        
        <div className="footer__left">
          <div className="footer__brand font-heading">
            <span className="footer__brand-code mono">&lt;</span>
            SHUBHANSHU SHRIMALI
            <span className="footer__brand-code mono"> /&gt;</span>
          </div>
          <p className="footer__tagline mono">
            AI-Native Systems & Game Architecture // 300K+ Users Shipped
          </p>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/shubhanshushrimali" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/shubhanshushrimali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://dev.to/shubhanshu_shrimali" target="_blank" rel="noopener noreferrer" aria-label="DEV.to">
            <SiDevdotto />
          </a>
          <a href="https://medium.com/@shubhanshu200425" target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <SiMedium />
          </a>
          <a href="mailto:shubhanshu200425@gmail.com" aria-label="Email">
            <FiMail />
          </a>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy mono">
            © {new Date().getFullYear()} Shubhanshu Shrimali. Built with React, Three.js & Framer Motion. Auto-deployed via GitHub Actions.
          </span>
        </div>

      </div>
    </footer>
  )
}
