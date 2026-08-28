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
  FiGlobe,
  FiTerminal
} from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import './Contact.css'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    
    // Direct mailto fallback or Formspree
    const mailtoUrl = `mailto:shubhanshu200425@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Engineering Inquiry'
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
        
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">04. Contact & Inquiries</span>
          <h2>Let's Build <span className="gradient-text">Something Extraordinary</span></h2>
          <p>
            Open for AI systems architecture, game engine development, high-performance systems engineering, 
            or consulting on scaling games to hundreds of thousands of active users.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Contact Matrix */}
        <div className="contact__grid">
          
          {/* Info Side */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact__info-card glass-card">
              <FiMapPin className="contact__info-icon" />
              <h4>Location</h4>
              <span>Udaipur, Rajasthan, India</span>
            </div>

            <div className="contact__info-card glass-card">
              <FiMail className="contact__info-icon" />
              <h4>Direct Email</h4>
              <a href="mailto:shubhanshu200425@gmail.com" className="mono">
                shubhanshu200425@gmail.com
              </a>
            </div>

            <div className="contact__info-card glass-card">
              <FiPhone className="contact__info-icon" />
              <h4>Direct Phone</h4>
              <a href="tel:+918290529725" className="mono">
                +91-8290529725
              </a>
            </div>

            {/* Social Grid */}
            <div className="contact__socials-box glass-card">
              <h4>Engineering Networks</h4>
              <div className="contact__social-links">
                <a
                  href="https://github.com/shubhanshushrimali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  title="GitHub"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/shubhanshushrimali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  title="LinkedIn"
                >
                  <FiLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://dev.to/shubhanshu_shrimali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  title="DEV.to"
                >
                  <SiDevdotto />
                  <span>DEV.to</span>
                </a>
                <a
                  href="https://medium.com/@shubhanshu200425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  title="Medium"
                >
                  <SiMedium />
                  <span>Medium</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.form
            className="contact__form glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="contact__form-header">
              <FiTerminal className="contact__form-icon" />
              <h3 className="font-heading">Dispatch Direct Message</h3>
            </div>

            {sent ? (
              <div className="contact__success">
                <span className="contact__success-emoji">🚀</span>
                <h3>Transmission Initiated!</h3>
                <p>Your default email client opened with the pre-filled dispatch to shubhanshu200425@gmail.com.</p>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name" className="mono">&gt; sender_name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name / Studio"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="email" className="mono">&gt; return_email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="subject" className="mono">&gt; subject_inquiry</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="AI Systems / Game Dev / Full-Time Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="message" className="mono">&gt; message_payload</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Describe your technical inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                  <FiSend />
                  <span>{sending ? 'Sending...' : 'Transmit Message'}</span>
                </button>
              </>
            )}
          </motion.form>

        </div>

      </div>
    </section>
  )
}
