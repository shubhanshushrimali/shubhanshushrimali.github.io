import { FiGithub, FiHeart } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a
            href="https://github.com/shubhanshushrimali/shubhanshushrimali.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <p className="footer__text">
              Built with <FiHeart className="footer__heart" /> by Shubhanshu Shrimali
            </p>
            <p className="footer__sub">
              <FiGithub /> View Source
            </p>
          </a>
        </div>
      </div>
    </footer>
  )
}
