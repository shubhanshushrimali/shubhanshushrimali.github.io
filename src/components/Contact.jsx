import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiPhone,
  FiTerminal,
} from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import { PROFILE } from '../data/site'
import './Contact.css'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formData.subject || 'Engineering inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    window.location.href = mailtoUrl
    setSent(true)
    setSending(false)
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">06. Contact</span>
          <h2>
            Build the next <span className="gradient-text">agent stack</span>
          </h2>
          <p>
            Open for AI systems roles, agent harness work, inference, and shipping products to real users.
          </p>
          <div className="section-line" />
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact__info-card glass-card">
              <FiMapPin className="contact__info-icon" aria-hidden="true" />
              <h4>Location</h4>
              <span>{PROFILE.location}</span>
            </div>

            <div className="contact__info-card glass-card">
              <FiMail className="contact__info-icon" aria-hidden="true" />
              <h4>Email</h4>
              <a href={`mailto:${PROFILE.email}`} className="mono">
                {PROFILE.email}
              </a>
            </div>

            <div className="contact__info-card glass-card">
              <FiPhone className="contact__info-icon" aria-hidden="true" />
              <h4>Phone</h4>
              <a href={PROFILE.phoneHref} className="mono">
                {PROFILE.phone}
              </a>
            </div>

            <div className="contact__socials-box glass-card">
              <h4>Networks</h4>
              <div className="contact__social-links">
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  <FiGithub aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  <FiLinkedin aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a href={PROFILE.devto} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  <SiDevdotto aria-hidden="true" />
                  <span>DEV.to</span>
                </a>
                <a href={PROFILE.medium} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  <SiMedium aria-hidden="true" />
                  <span>Medium</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact__form glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="contact__form-header">
              <FiTerminal className="contact__form-icon" aria-hidden="true" />
              <h3 className="font-heading">Send a message</h3>
            </div>

            {sent ? (
              <div className="contact__success">
                <h3>Email client opened</h3>
                <p>A draft to {PROFILE.email} should be in your mail app.</p>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name" className="mono">&gt; name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="email" className="mono">&gt; email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="subject" className="mono">&gt; subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="AI systems / agents / role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="message" className="mono">&gt; message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What should we build?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                  <FiSend aria-hidden="true" />
                  <span>{sending ? 'Opening…' : 'Send'}</span>
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
