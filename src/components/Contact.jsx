import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin } from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Using Formspree for free form handling — replace with your ID
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
    } catch {
      alert('Error sending message. Please email me directly!')
    }
    setSending(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
          <span className="section-number">04. Contact</span>
          <h2>Get In <span className="gradient-text">Touch</span></h2>
          <p>Have a project idea, question, or just want to say hi? My inbox is always open.</p>
          <div className="section-line" />
        </motion.div>

        <motion.div
          className="contact__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Contact Info */}
          <motion.div className="contact__info" variants={itemVariants}>
            <div className="contact__info-card glass-card">
              <FiMail className="contact__info-icon" />
              <h4>Email</h4>
              <a href="mailto:shubhanshu200425@gmail.com">shubhanshu200425@gmail.com</a>
            </div>
            <div className="contact__info-card glass-card">
              <FiMapPin className="contact__info-icon" />
              <h4>Location</h4>
              <span>India</span>
            </div>
            <div className="contact__socials">
              <a href="https://github.com/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:shubhanshu200425@gmail.com" className="contact__social-link" aria-label="Email">
                <FiMail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="contact__form glass-card"
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            {sent ? (
              <div className="contact__success">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <span className="contact__success-emoji">🎉</span>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you soon!</p>
                </motion.div>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="What's on your mind?"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                  <FiSend />
                </button>
              </>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
