import { useEffect } from 'react'

/* ═══════════════════════════════════════════════════════
   CINEMATIC ENGINE — GSAP-Free Edition

   Replaced GSAP ScrollTrigger with:
   - CSS scroll-driven animations for hero parallax
   - Intersection Observer for section-line draw-in
   - Vanilla scroll listener for progress bar

   Respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════ */

/* ─── Hero Parallax via CSS scroll-driven animation ─── */
export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hero parallax: fade + translate as user scrolls past
    const hero = document.querySelector('.hero')
    const heroContent = document.querySelector('.hero__content')
    if (!hero || !heroContent) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const heroHeight = hero.offsetHeight

        if (rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / heroHeight))
          const opacity = 1 - progress * 0.8
          const translateY = progress * 25
          const scale = 1 - progress * 0.04

          heroContent.style.opacity = opacity
          heroContent.style.transform = `translateY(${translateY}%) scale(${scale})`
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (heroContent) {
        heroContent.style.opacity = ''
        heroContent.style.transform = ''
      }
    }
  }, [])
}

/* ─── Section Line Draw-in via Intersection Observer ─── */
export function useSectionLineAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lines = document.querySelectorAll('.section-line')
    if (!lines.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-line--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    lines.forEach((line) => observer.observe(line))
    return () => observer.disconnect()
  }, [])
}

/* ─── Scroll Progress Bar ─── */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.createElement('div')
    bar.className = 'scroll-progress-bar'
    document.body.appendChild(bar)

    let ticking = false

    const update = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        const pct = total > 0 ? (scrolled / total) * 100 : 0
        bar.style.width = `${pct}%`
        ticking = false
      })
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
