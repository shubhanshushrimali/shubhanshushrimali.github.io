import { useCallback } from 'react'

/* ═══════════════════════════════════════════════════════
   useGlassCardTilt — React-idiomatic mouse tracking for
   glass cards. Returns onMouseMove / onMouseLeave handlers.

   Adds --mouse-x, --mouse-y CSS custom properties for the
   radial gradient highlight, PLUS a subtle 3D tilt effect.

   Usage:
     const tilt = useGlassCardTilt()
     <div className="glass-card" {...tilt}>
   ═══════════════════════════════════════════════════════ */

export function useGlassCardTilt({ maxTilt = 4, glowOnly = false } = {}) {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.setProperty('--mouse-x', `${x}%`)
    el.style.setProperty('--mouse-y', `${y}%`)

    if (!glowOnly) {
      const rotateX = ((y - 50) / 50) * -maxTilt
      const rotateY = ((x - 50) / 50) * maxTilt
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    }
  }, [maxTilt, glowOnly])

  const onMouseLeave = useCallback((e) => {
    const el = e.currentTarget
    el.style.setProperty('--mouse-x', '50%')
    el.style.setProperty('--mouse-y', '50%')
    if (!glowOnly) {
      el.style.transform = ''
    }
  }, [glowOnly])

  return { onMouseMove, onMouseLeave }
}
