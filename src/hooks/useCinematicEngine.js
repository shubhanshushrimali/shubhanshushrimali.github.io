import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════
   CINEMATIC ANIMATION ENGINE
   
   World-class scroll-driven animations, magnetic cursor,
   parallax depth layers, text reveals, and film grain.
   
   Respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════ */

/* ─── Custom Magnetic Cursor with Glow Trail ─── */
export function useMagneticCursor() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('ontouchstart' in window) return  // No cursor on touch devices

    // Create cursor elements
    const cursor = document.createElement('div')
    cursor.className = 'cinematic-cursor'
    const cursorDot = document.createElement('div')
    cursorDot.className = 'cinematic-cursor__dot'
    const cursorRing = document.createElement('div')
    cursorRing.className = 'cinematic-cursor__ring'
    const cursorTrail = document.createElement('div')
    cursorTrail.className = 'cinematic-cursor__trail'

    cursor.appendChild(cursorDot)
    cursor.appendChild(cursorRing)
    cursor.appendChild(cursorTrail)
    document.body.appendChild(cursor)
    document.body.classList.add('has-custom-cursor')

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let trailX = 0, trailY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Dot follows mouse instantly
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

      // Ring follows with elastic delay
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`

      // Trail follows with heavy delay
      trailX += (mouseX - trailX) * 0.06
      trailY += (mouseY - trailY) * 0.06
      cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    requestAnimationFrame(animate)

    // Magnetic hover effect on interactive elements
    const magneticTargets = document.querySelectorAll('.btn, .navbar__link, .hero__social-link, .video-filter-btn, .glass-card')
    const handleEnter = () => {
      cursor.classList.add('cinematic-cursor--hover')
    }
    const handleLeave = () => {
      cursor.classList.remove('cinematic-cursor--hover')
    }

    magneticTargets.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cursor.remove()
      document.body.classList.remove('has-custom-cursor')
      magneticTargets.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])
}

/* ─── GSAP ScrollTrigger Parallax & Reveal System ─── */
export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      // 1. Parallax depth on background elements
      gsap.utils.toArray('section').forEach((section) => {
        const bg = section.querySelector('.section-header')
        if (!bg) return

        gsap.to(bg, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        })
      })

      // 2. Glass card stagger entrance (parallax-like)
      gsap.utils.toArray('.glass-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        })
      })

      // 3. Section lines: draw-in animation
      gsap.utils.toArray('.section-line').forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        })
      })

      // 4. Hero parallax depth effect
      const hero = document.querySelector('.hero')
      if (hero) {
        gsap.to('.hero__content', {
          yPercent: 30,
          opacity: 0.3,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        })
      }

      // 5. Metric cards: count-up animation
      gsap.utils.toArray('.hero__metric-num').forEach((num) => {
        gsap.from(num, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: num,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          snap: { textContent: 1 },
        })
      })

      // 6. HUD badges: slide-in from left
      gsap.utils.toArray('.hud-badge').forEach((badge, i) => {
        gsap.from(badge, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: badge,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        })
      })

      // 7. Tech tags: wave stagger
      gsap.utils.toArray('.project-tech-tag').forEach((tag) => {
        gsap.from(tag, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: tag,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        })
      })

      // 8. Video cards: cinematic stagger entrance
      const videoGrid = document.querySelector('.video-showcase__grid')
      if (videoGrid) {
        gsap.from('.video-card', {
          y: 80,
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          stagger: {
            each: 0.08,
            from: 'start',
          },
          ease: 'expo.out',
          scrollTrigger: {
            trigger: videoGrid,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        })
      }

    })

    return () => ctx.revert()
  }, [])
}

/* ─── Smooth Momentum Scroll (lightweight alternative to Lenis) ─── */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('ontouchstart' in window) return // native scroll on mobile

    // CSS smooth scroll is sufficient with our GSAP scrub timelines
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])
}

/* ─── Film Grain Overlay ─── */
export function useFilmGrain() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = document.createElement('canvas')
    canvas.className = 'film-grain-overlay'
    canvas.width = 256
    canvas.height = 256
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    let animId

    function renderGrain() {
      const imageData = ctx.createImageData(256, 256)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 12  // Very subtle opacity
      }
      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(renderGrain)
    }

    renderGrain()

    return () => {
      cancelAnimationFrame(animId)
      canvas.remove()
    }
  }, [])
}

/* ─── Magnetic Button Hover Effect ─── */
export function useMagneticButtons() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('ontouchstart' in window) return

    const buttons = document.querySelectorAll('.btn')
    
    const handlers = []
    buttons.forEach(btn => {
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        })
      }

      btn.addEventListener('mousemove', handleMove)
      btn.addEventListener('mouseleave', handleLeave)
      handlers.push({ btn, handleMove, handleLeave })
    })

    return () => {
      handlers.forEach(({ btn, handleMove, handleLeave }) => {
        btn.removeEventListener('mousemove', handleMove)
        btn.removeEventListener('mouseleave', handleLeave)
      })
    }
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

/* ─── Section Reveal: Clip-Path Wipe ─── */
export function useSectionReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('section:not(.hero)').forEach((section) => {
        gsap.from(section, {
          clipPath: 'inset(8% 0% 8% 0%)',
          opacity: 0.7,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
