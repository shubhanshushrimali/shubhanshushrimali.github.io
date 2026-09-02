import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiBookOpen } from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import { PROFILE, WRITING_FALLBACK, DEVTO_API, MEDIUM_RSS } from '../data/site'
import './Writing.css'

function decodeHtml(value) {
  if (!value) return ''
  const doc = new DOMParser().parseFromString(value, 'text/html')
  return doc.documentElement.textContent || value
}

function stripHtml(html) {
  return decodeHtml(html)
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeTitle(title) {
  return decodeHtml(title).replace(/\s+/g, ' ').trim()
}

function articleKey(title, url) {
  const slug = (url || '').split('?')[0].replace(/\/$/, '')
  return slug || normalizeTitle(title).toLowerCase()
}

function mergeArticles(mediumItems, devtoItems) {
  const seen = new Set()
  const merged = []

  for (const item of [...mediumItems, ...devtoItems]) {
    const key = articleKey(item.title, item.url)
    const titleKey = normalizeTitle(item.title).toLowerCase().slice(0, 48)
    if (seen.has(key) || seen.has(titleKey)) continue
    seen.add(key)
    seen.add(titleKey)
    merged.push(item)
  }

  merged.sort((a, b) => new Date(b.date) - new Date(a.date))
  return merged
}

function formatDate(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Writing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [posts, setPosts] = useState(WRITING_FALLBACK)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const mediumPromise = fetch(MEDIUM_RSS)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)

      const devtoPromise = fetch(DEVTO_API)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)

      const [mediumJson, devtoJson] = await Promise.all([mediumPromise, devtoPromise])
      if (cancelled) return

      const mediumItems = Array.isArray(mediumJson?.items)
        ? mediumJson.items.map((item) => ({
            title: normalizeTitle(item.title),
            excerpt: stripHtml(item.description || item.content).slice(0, 180),
            url: item.link,
            date: item.pubDate,
            source: 'Medium',
            tags: Array.isArray(item.categories) ? item.categories.slice(0, 3) : [],
          }))
        : []

      const devtoItems = Array.isArray(devtoJson)
        ? devtoJson.map((item) => ({
            title: normalizeTitle(item.title),
            excerpt: (item.description || '').slice(0, 180),
            url: item.url,
            date: item.published_at,
            source: 'DEV.to',
            tags: Array.isArray(item.tag_list) ? item.tag_list.slice(0, 3) : [],
          }))
        : []

      const merged = mergeArticles(mediumItems, devtoItems)
      if (merged.length > 0) {
        setPosts(merged.slice(0, 8))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="writing" id="writing" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">03. Writing</span>
          <h2>
            Notes from <span className="gradient-text">production agents</span>
          </h2>
          <p>
            Live from Medium and DEV.to — LangGraph daemons, vLLM hosting, Unity memory, and Eisen Engine.
          </p>
          <div className="section-line" />
        </motion.div>

        <div className="writing__grid">
          {posts.map((post, idx) => (
            <motion.a
              key={post.url || post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="writing__card glass-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div className="writing__card-top">
                <span className="writing__source mono">
                  {post.source === 'DEV.to' ? <SiDevdotto aria-hidden="true" /> : <SiMedium aria-hidden="true" />}
                  {post.source}
                </span>
                <span className="writing__date mono">{formatDate(post.date)}</span>
              </div>
              <h3 className="writing__title font-heading">{post.title}</h3>
              <p className="writing__excerpt">{post.excerpt}</p>
              {post.tags?.length > 0 && (
                <div className="writing__tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="writing__tag mono">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="writing__read mono">
                Read <FiExternalLink aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="writing__more">
          <a
            href={PROFILE.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <SiMedium aria-hidden="true" /> All Medium posts
          </a>
          <a
            href={PROFILE.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FiBookOpen aria-hidden="true" /> DEV.to
          </a>
        </div>
      </div>
    </section>
  )
}
