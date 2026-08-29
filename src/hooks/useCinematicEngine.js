import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════
   CINEMATIC ENGINE — Lightweight Edition
   
   Only scroll-driven effects that don't conflict with
   Framer Motion. No cursor, no film grain, no magnetic.
   
   Respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════ */

/* ─── GSAP ScrollTrigger: Hero Parallax Only ─── */
export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      // Hero content fades + parallax on scroll
      const hero = document.querySelector('.hero')
      if (hero) {
        gsap.to('.hero__content', {
          yPercent: 25,
          opacity: 0.2,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        })
      }

      // Section lines: draw-in
      gsap.utils.toArray('.section-line').forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        })
      })

    })

    return () => ctx.revert()
  }, [])
}

/* ─── Scroll Progress Bar ─── */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.createElement('div')
    bar.className = 'scroll-progress-bar'
    document.body.appendChild(bar)

    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      bar.remove()
    }
  }, [])
}

/* ─── Smooth Scroll ─── */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = '' }
  }, [])
}
