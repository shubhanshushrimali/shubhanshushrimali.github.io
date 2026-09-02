import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiPlay,
  FiX,
  FiMonitor,
  FiSmartphone,
  FiFilter,
  FiExternalLink,
  FiAward
} from 'react-icons/fi'
import { soundFX } from '../utils/audio'
import './VideoShowcase.css'

/* ═══════════════════════════════════════════════════════
   YouTube Video Catalog — All 9 videos from the channel
   https://www.youtube.com/@shubhanshushrimali3843
   ═══════════════════════════════════════════════════════ */
const videoProjects = [
  {
    id: 'argon-assault',
    title: 'Argon Assault',
    subtitle: 'Rail Shooter Combat',
    category: 'action',
    description: 'Fast-paced rail shooter with dynamic environments, enemy waves, and cinematic camera systems built in Unity.',
    tech: ['Unity', 'C#', 'Particle FX', 'Rail Movement'],
    platform: 'desktop',
    badge: 'Action / Shooter',
    badgeColor: 'cyan',
    youtubeId: 'LB7eVXw9M8Q'
  },
  {
    id: 'blasterjack',
    title: 'BlasterJack',
    subtitle: 'Action Blaster Game',
    category: 'action',
    description: 'High-energy blaster game featuring power-ups, score multipliers, and explosive visual effects.',
    tech: ['Unity', 'C#', 'VFX Graph', 'Mobile'],
    platform: 'mobile',
    badge: 'Action / Mobile',
    badgeColor: 'emerald',
    youtubeId: '1_rwjcu4x8Y'
  },
  {
    id: 'gravity-manipulation',
    title: 'Gravity Manipulation',
    subtitle: 'Physics-Based Gameplay',
    category: 'action',
    description: 'Unique gameplay mechanic allowing players to manipulate gravity fields, alter projectile trajectories, and solve environmental puzzles.',
    tech: ['Unity', 'C#', 'Custom Physics', 'Shader Graph'],
    platform: 'desktop',
    badge: 'Physics / Action',
    badgeColor: 'gold',
    youtubeId: 'Ck1GaS469hA'
  },
  {
    id: 'civil-vr',
    title: 'Civil Engineering VR',
    subtitle: 'Immersive VR Simulation',
    category: 'vr',
    description: 'Virtual reality civil engineering simulator with interactive structural elements, measurement tools, and real-time physics.',
    tech: ['Unity VR', 'OpenXR', 'Meta Quest', 'C#'],
    platform: 'vr',
    badge: 'VR Simulation',
    badgeColor: 'purple',
    youtubeId: 'KD77qSzc5mo'
  },
  {
    id: 'electrical-vr',
    title: 'Electrical Simulator VR',
    subtitle: 'Industrial Training System',
    category: 'vr',
    description: 'VR-based electrical systems training simulator with circuit interactions, safety protocols, and hands-on component assembly.',
    tech: ['Unity VR', 'OpenXR', 'Meta Quest SDK', 'Haptics'],
    platform: 'vr',
    badge: 'VR Training',
    badgeColor: 'purple',
    youtubeId: 'f1vXLpE_Sto'
  },
  {
    id: 'escape-room-vr',
    title: 'Escape Room VR',
    subtitle: 'Puzzle-Based VR Experience',
    category: 'vr',
    description: 'Immersive VR escape room with physics-based puzzles, interactive objects, environmental storytelling, and timer mechanics.',
    tech: ['Unity VR', 'OpenXR', 'Meta Quest', 'Physics'],
    platform: 'vr',
    badge: 'VR Puzzle',
    badgeColor: 'purple',
    youtubeId: 'mX201VT2IIs'
  },
  {
    id: 'sih-2023',
    title: 'SIH 2023',
    subtitle: 'Smart India Hackathon',
    category: 'showcase',
    description: 'Smart India Hackathon 2023 project submission — a national-level innovation challenge entry showcasing technical problem-solving and team collaboration.',
    tech: ['Hackathon', 'Team Project', 'Problem Solving', 'Innovation'],
    platform: 'desktop',
    badge: 'Hackathon / Award',
    badgeColor: 'gold',
    youtubeId: 'elCmFlHpveA'
  },
  {
    id: 'multi-payline-slot',
    title: 'Multiple Payline Slot Machine',
    subtitle: 'Deterministic Slot Engine',
    category: 'casual',
    description: 'Multi-payline slot machine with deterministic payout engine, animated reels, win celebrations, and configurable payline patterns.',
    tech: ['C#', 'State Machines', 'Object Pooling', 'Math'],
    platform: 'mobile',
    badge: 'Casual / Slot',
    badgeColor: 'gold',
    youtubeId: 'Uo4CFmiurPA'
  },
  {
    id: 'single-slot',
    title: 'Single Line Slot Machine',
    subtitle: 'Classic Slot Engine',
    category: 'casual',
    description: 'Classic single-line slot machine with smooth reel spinning, win detection algorithms, and optimized memory management.',
    tech: ['C#', 'Game Loops', 'Memory Optimization', 'UI'],
    platform: 'mobile',
    badge: 'Casual / Slot',
    badgeColor: 'gold',
    youtubeId: 'mz8X3g7VicU'
  }
]

const categories = [
  { id: 'all', label: 'All Projects', count: videoProjects.length },
  { id: 'vr', label: 'VR Simulations', count: videoProjects.filter(v => v.category === 'vr').length },
  { id: 'action', label: 'Action / Shooter', count: videoProjects.filter(v => v.category === 'action').length },
  { id: 'casual', label: 'Casual / Slot', count: videoProjects.filter(v => v.category === 'casual').length },
  { id: 'showcase', label: 'Hackathon', count: videoProjects.filter(v => v.category === 'showcase').length }
]

const platformIcons = {
  desktop: <FiMonitor />,
  mobile: <FiSmartphone />,
  vr: <FiAward />
}

export default function VideoShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxVideo, setLightboxVideo] = useState(null)

  const filtered = activeFilter === 'all'
    ? videoProjects
    : videoProjects.filter(v => v.category === activeFilter)

  const handleFilter = (id) => {
    soundFX.playClick()
    setActiveFilter(id)
  }

  const openLightbox = useCallback((video) => {
    soundFX.playSuccess()
    setLightboxVideo(video)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    soundFX.playClick()
    setLightboxVideo(null)
    document.body.style.overflow = ''
  }, [])

  return (
    <section className="video-showcase" id="video-showcase" ref={ref}>
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">Reel</span>
          <h2>Shipped Game <span className="gradient-text">Demo Reel</span></h2>
          <p>
            Production gameplay footage from VR simulations, action shooters, and casual titles — 
            shipped across Meta Quest, iOS, Android, and desktop platforms.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="video-showcase__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`video-filter-btn mono ${activeFilter === cat.id ? 'video-filter-btn--active' : ''}`}
              onClick={() => handleFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              <FiFilter className="filter-icon" />
              <span>{cat.label}</span>
              <span className="filter-count">{cat.count}</span>
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="video-showcase__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                index={idx}
                inView={inView}
                onPlay={openLightbox}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Fullscreen YouTube Lightbox */}
      <AnimatePresence>
        {lightboxVideo && (
          <motion.div
            className="video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="video-lightbox__content"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="video-lightbox__header">
                <div>
                  <h3 className="font-heading">{lightboxVideo.title}</h3>
                  <span className="mono video-lightbox__sub">{lightboxVideo.subtitle}</span>
                </div>
                <div className="video-lightbox__header-actions">
                  <a
                    href={`https://www.youtube.com/watch?v=${lightboxVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-lightbox__yt-link"
                    aria-label="Open on YouTube"
                  >
                    <FiExternalLink />
                    <span>YouTube</span>
                  </a>
                  <button className="video-lightbox__close" onClick={closeLightbox} aria-label="Close video">
                    <FiX />
                  </button>
                </div>
              </div>
              <div className="video-lightbox__player">
                <iframe
                  src={`https://www.youtube.com/embed/${lightboxVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={lightboxVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-lightbox__iframe"
                />
              </div>
              <div className="video-lightbox__meta">
                <div className="video-lightbox__tech">
                  {lightboxVideo.tech.map((t) => (
                    <span key={t} className="project-tech-tag mono">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* Individual Video Card — YouTube Thumbnail + Overlay */
function VideoCard({ video, index, inView, onPlay }) {
  const [isHovering, setIsHovering] = useState(false)

  /* YouTube thumbnail URLs — maxresdefault is highest quality */
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
  const thumbFallback = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <motion.div
      className="video-card glass-card"
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Thumbnail Preview Area */}
      <div className="video-card__preview" onClick={() => onPlay(video)}>
        <img
          src={thumbUrl}
          alt={`${video.title} gameplay screenshot`}
          className="video-card__thumb"
          loading="lazy"
          onError={(e) => { e.target.src = thumbFallback }}
        />
        
        {/* Play Overlay */}
        <div className={`video-card__overlay ${isHovering ? 'video-card__overlay--hovering' : ''}`}>
          <div className="video-card__play-btn">
            <FiPlay />
          </div>
          <span className="video-card__play-label mono">PLAY DEMO</span>
        </div>

        {/* Platform Badge */}
        <div className="video-card__platform-badge mono">
          {platformIcons[video.platform]}
          <span>{video.platform.toUpperCase()}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="video-card__info">
        <div className="video-card__top-row">
          <span className={`hud-badge hud-badge--${video.badgeColor} mono`}>
            {video.badge}
          </span>
        </div>

        <h3 className="video-card__title font-heading">{video.title}</h3>
        <h4 className="video-card__subtitle mono">{video.subtitle}</h4>
        <p className="video-card__desc">{video.description}</p>

        {/* Tech Tags */}
        <div className="video-card__tech">
          {video.tech.map((t) => (
            <span key={t} className="project-tech-tag mono">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
