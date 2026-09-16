import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ═══════════════════════════════════════════════════════
   ScrollReveal — single source of truth for scroll-triggered
   entrance animations. Replaces the copy-pasted pattern:

     const [ref, inView] = useInView(...)
     <motion.div initial={...} animate={inView ? ... : {}}>

   Usage:
     <ScrollReveal>              — default fade-up
     <ScrollReveal variant="fade-left" delay={0.2}>
     <ScrollReveal as="section" className="about" id="about">
   ═══════════════════════════════════════════════════════ */

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.08,
  triggerOnce = true,
  as = 'div',
  className = '',
  style,
  ...rest
}) {
  const [ref, inView] = useInView({ triggerOnce, threshold })
  const v = variants[variant] || variants['fade-up']

  const Component = motion[as] || motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  )
}

/* Stagger container — wrap children in this, then each
   child uses <ScrollReveal> with incremental delays.
   Or use this as a parent with framer-motion staggerChildren. */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delay = 0,
  threshold = 0.05,
  triggerOnce = true,
  as = 'div',
  className = '',
  ...rest
}) {
  const [ref, inView] = useInView({ triggerOnce, threshold })

  const Component = motion[as] || motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}

/* Individual stagger child — place inside a <StaggerContainer> */
export function StaggerItem({
  children,
  variant = 'fade-up',
  duration = 0.5,
  as = 'div',
  className = '',
  ...rest
}) {
  const v = variants[variant] || variants['fade-up']
  const Component = motion[as] || motion.div

  return (
    <Component
      variants={v}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
