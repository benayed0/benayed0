import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { projects } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import { useCursor } from '../context/CursorContext'

const PREVIEW_W = 280
const PREVIEW_H = 90

// ─── Favicon or monogram fallback ─────────────────────────────────────────────
function ProjectIcon({ project, size = 20 }) {
  const [failed, setFailed] = useState(false)

  const monogram = (
    <div style={{
      width: size, height: size, borderRadius: 4, flexShrink: 0,
      background: `${project.accent}22`, border: `1px solid ${project.accent}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, fontWeight: 700, color: project.accent, fontFamily: 'monospace',
    }}>
      {project.title[0]}
    </div>
  )

  if (!project.favicon || failed) return monogram

  return (
    <img
      src={import.meta.env.BASE_URL.replace(/\/$/, '') + project.favicon}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: 4, objectFit: 'contain', flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  )
}

// ─── Sliding strip of all project previews ────────────────────────────────────
function PreviewStrip({ activeIndex, t }) {
  return (
    <div style={{ width: PREVIEW_W, height: PREVIEW_H, overflow: 'hidden', borderRadius: 14 }}>
      <motion.div
        animate={{ y: -activeIndex * PREVIEW_H }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: 'transform' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              width: PREVIEW_W,
              height: PREVIEW_H,
              background: `linear-gradient(120deg, #111 0%, ${project.accent}18 100%)`,
              border: `1px solid ${project.accent}28`,
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxSizing: 'border-box',
            }}
          >
            <ProjectIcon project={project} size={32} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {project.title}
              </div>
              <div style={{ fontSize: 11, color: '#71717a', lineHeight: 1.4 }}>
                {t(`projects.items.${project.id}.tagline`)}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Three cursor-following elements (Larose technique) ───────────────────────
function ProjectCursorElements({ active, activeIndex, t }) {
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)

  const previewX = useSpring(mx, { stiffness: 160, damping: 28 })
  const previewY = useSpring(my, { stiffness: 160, damping: 28 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const scaleAnim = {
    initial: { scale: 0, opacity: 0, filter: 'blur(6px)' },
    enter:   { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed:  { scale: 0, opacity: 0, filter: 'blur(6px)', transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } },
  }

  return createPortal(
    <>
      {/* Large preview card */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: previewX,
          y: previewY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9990,
        }}
        variants={scaleAnim}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        <PreviewStrip activeIndex={activeIndex} t={t} />
      </motion.div>


    </>,
    document.body
  )
}

// ─── Fullscreen lightbox ──────────────────────────────────────────────────────
function ScreenshotLightbox({ srcs, startIndex, accent, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  const count = srcs.length

  const prev = useCallback(() => setIdx(i => (i - 1 + count) % count), [count])
  const next = useCallback(() => setIdx(i => (i + 1) % count), [count])

  // Keyboard navigation + scroll lock
  useEffect(() => {
    const saved = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = saved
    }
  }, [onClose, prev, next])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'rgba(0,0,0,0.93)',
        backdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 18, right: 18, zIndex: 9999,
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
      >
        <X size={15} />
      </button>

      {/* Counter */}
      {count > 1 && (
        <div style={{
          position: 'fixed', top: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 9999,
          fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em',
        }}>
          {idx + 1} / {count}
        </div>
      )}

      {/* Image + side arrows */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          maxWidth: '92vw', maxHeight: '88vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Prev */}
        {count > 1 && (
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: -52, zIndex: 1,
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Screenshot */}
        <div style={{
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px ${accent}35`,
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={import.meta.env.BASE_URL.replace(/\/$/, '') + srcs[idx]}
              alt=""
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                display: 'block',
                maxWidth: '82vw',
                maxHeight: '82vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </AnimatePresence>
        </div>

        {/* Next */}
        {count > 1 && (
          <button
            onClick={next}
            style={{
              position: 'absolute', right: -52, zIndex: 1,
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              flexShrink: 0,
            }}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </motion.div>

      {/* Dot indicators */}
      {count > 1 && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 7, zIndex: 9999,
        }}>
          {srcs.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setIdx(i) }}
              style={{
                width: i === idx ? 22 : 7, height: 7, borderRadius: 4,
                background: i === idx ? accent : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  )
}

// ─── 3D Perspective Browser Showcase ─────────────────────────────────────────
//
// Full-width browser mockup with mouse-tracking 3D tilt, smooth slide
// transitions, auto-advancing progress, and accent glow. Designed to make
// screenshots readable at a glance — no fullscreen needed.
//
function ScreenshotShowcase({ screenshots, accent, url }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const paused = useRef(false)
  const containerRef = useRef(null)
  const srcs = screenshots.slice(0, 3)
  const count = srcs.length

  // Auto-advance with progress tracking
  const [progress, setProgress] = useState(0)
  const advance = useCallback(() => setActive(c => (c + 1) % count), [count])

  useEffect(() => {
    if (count <= 1) return
    let start = Date.now()
    const DURATION = 4500

    const tick = () => {
      if (!paused.current) {
        const elapsed = Date.now() - start
        const pct = Math.min(elapsed / DURATION, 1)
        setProgress(pct)
        if (pct >= 1) {
          advance()
          start = Date.now()
          setProgress(0)
        }
      } else {
        start = Date.now() - progress * DURATION // freeze progress
      }
      frame = requestAnimationFrame(tick)
    }
    let frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [count, advance, active]) // reset on manual navigation

  // 3D tilt — mouse-tracking with springs
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useTransform(my, [0, 1], [3, -3])
  const rotateY = useTransform(mx, [0, 1], [-3, 3])
  const springRX = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const springRY = useSpring(rotateY, { stiffness: 120, damping: 20 })

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); paused.current = false }
  const onMouseEnter = () => { paused.current = true }

  const displayUrl = (() => {
    try { return new URL(url).hostname } catch { return 'preview' }
  })()

  const goTo = (i) => { setActive(i); setProgress(0) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Perspective wrapper ── */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX: springRX,
            rotateY: springRY,
            transformStyle: 'preserve-3d',
            borderRadius: 14,
            overflow: 'hidden',
            border: `1px solid ${accent}30`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.65), 0 0 50px ${accent}10, 0 0 0 1px rgba(255,255,255,0.04)`,
            background: '#111',
            willChange: 'transform',
          }}
        >
          {/* ── Browser chrome ── */}
          <div style={{
            height: 40,
            background: 'linear-gradient(180deg, #1e1e1e 0%, #191919 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center',
            padding: '0 14px', gap: 10,
            userSelect: 'none',
          }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            </div>
            {/* URL bar */}
            <div style={{
              flex: 1, height: 24, borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 5, fontSize: 11, color: '#555', fontFamily: 'monospace',
            }}>
              <span style={{ fontSize: 9, opacity: 0.6 }}>🔒</span>
              {displayUrl}
            </div>
            {/* Expand to fullscreen */}
            <button
              onClick={() => setLightboxOpen(true)}
              style={{
                width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${accent}30`; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
              title="View fullscreen"
            >
              <Maximize2 size={11} />
            </button>
          </div>

          {/* ── Screenshot viewport ── */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9.5', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={import.meta.env.BASE_URL.replace(/\/$/, '') + srcs[active]}
                alt=""
                draggable={false}
                initial={{ opacity: 0, x: 50, scale: 1.02 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  display: 'block', userSelect: 'none',
                }}
              />
            </AnimatePresence>

            {/* Navigation arrows — visible on hover */}
            {count > 1 && (
              <>
                <button
                  onClick={() => goTo((active - 1 + count) % count)}
                  className="opacity-0 group-hover/showcase:opacity-100 transition-opacity duration-200"
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => goTo((active + 1) % count)}
                  className="opacity-0 group-hover/showcase:opacity-100 transition-opacity duration-200"
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ChevronRight size={15} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Progress dots ── */}
      {count > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {srcs.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                position: 'relative',
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? 'transparent' : 'rgba(255,255,255,0.12)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
              }}
            >
              {/* Track */}
              {i === active && (
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 4,
                  background: `${accent}40`,
                }} />
              )}
              {/* Fill — animated by progress */}
              {i === active && (
                <motion.div
                  style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    borderRadius: 4,
                    background: accent,
                    width: `${progress * 100}%`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <ScreenshotLightbox
            srcs={srcs}
            startIndex={active}
            accent={accent}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Featured showcase card ───────────────────────────────────────────────────
function FeaturedProjectCard({ project, index, t, isHero }) {
  const [showTechnical, setShowTechnical] = useState(false)
  const snippet   = t(`projects.items.${project.id}.snippet`)
  const technical = t(`projects.items.${project.id}.technical`)
  const techToShow = isHero ? project.tech : project.tech.slice(0, 4)
  const techOverflow = isHero ? 0 : project.tech.length - 4

  const hasScreenshots = isHero && project.screenshots?.length > 0

  const textContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, minWidth: 0 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <ProjectIcon project={project} size={isHero ? 48 : 40} />
        <span style={{
          color: project.accent,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}35`,
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>
          Featured
        </span>
      </div>

      {/* Title */}
      <div>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group/title"
            style={{ textDecoration: 'none' }}
          >
            <h3 style={{ fontSize: isHero ? 22 : 18, fontWeight: 700, color: '#e4e4e7', lineHeight: 1.2, transition: 'color 0.2s' }}
              className="group-hover/title:!text-white"
            >
              {project.title}
            </h3>
            <ArrowUpRight size={isHero ? 16 : 14} style={{ color: project.accent, opacity: 0.6, transition: 'opacity 0.2s, transform 0.2s', flexShrink: 0 }}
              className="group-hover/title:!opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5"
            />
          </a>
        ) : (
          <h3 style={{ fontSize: isHero ? 22 : 18, fontWeight: 700, color: '#e4e4e7', lineHeight: 1.2 }}>
            {project.title}
          </h3>
        )}
        <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.5, marginTop: 6 }}>
          {t(`projects.items.${project.id}.tagline`)}
        </p>
      </div>

      {/* Snippet */}
      <p style={{ fontSize: 13.5, color: '#a1a1aa', lineHeight: 1.65, flex: 1 }}>
        {snippet}
      </p>

      {/* Technical toggle */}
      <div>
        <button
          onClick={() => setShowTechnical(v => !v)}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono mb-3 transition-colors duration-200"
          style={{ color: showTechnical ? project.accent : '#52525b' }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: 10,
            padding: '1px 5px',
            borderRadius: 4,
            border: `1px solid ${showTechnical ? project.accent + '60' : '#3f3f46'}`,
            background: showTechnical ? `${project.accent}12` : 'transparent',
            transition: 'all 0.2s',
          }}>
            {'</>'}
          </span>
          {t('projects.technicalDetails')}
        </button>

        <AnimatePresence initial={false}>
          {showTechnical && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ color: '#71717a', borderLeft: `2px solid ${project.accent}40`, paddingLeft: 12, fontSize: 12.5, lineHeight: 1.7, marginBottom: 12 }}>
                {technical}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {techToShow.map(tech => (
          <span key={tech} style={{ fontSize: 11, fontFamily: 'monospace', padding: '3px 9px', borderRadius: 6, background: `${project.accent}12`, color: `${project.accent}cc`, border: `1px solid ${project.accent}22` }}>
            {tech}
          </span>
        ))}
        {techOverflow > 0 && (
          <span style={{ fontSize: 11, fontFamily: 'monospace', padding: '3px 9px', borderRadius: 6, color: '#52525b' }}>
            +{techOverflow}
          </span>
        )}
      </div>

    </div>
  )

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        boxShadow: `0 0 40px ${project.accent}25, 0 8px 40px rgba(0,0,0,0.5)`,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className="flex flex-col"
      style={{
        position: 'relative',
        background: `linear-gradient(135deg, #0f0f0f 0%, ${project.accent}16 100%)`,
        border: `1px solid ${project.accent}28`,
        borderRadius: 20,
        padding: isHero ? '28px' : '24px',
        gap: 14,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
        style={{
          transformOrigin: 'left',
          background: `linear-gradient(90deg, ${project.accent}90, transparent)`,
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          borderRadius: '20px 20px 0 0',
        }}
      />

      {textContent}

      {hasScreenshots && (
        <div className="group/showcase w-full mt-2">
          <ScreenshotShowcase screenshots={project.screenshots} accent={project.accent} url={project.live} />
        </div>
      )}
    </motion.div>
  )
}

// ─── Single project row ────────────────────────────────────────────────────────
function ProjectRow({ project, index, t, onEnter, onLeave, isExpanded, onToggle }) {
  const [showTechnical, setShowTechnical] = useState(false)
  const snippet   = t(`projects.items.${project.id}.snippet`)
  const technical = t(`projects.items.${project.id}.technical`)

  // Reset technical view when row collapses
  const handleToggle = () => {
    if (isExpanded) setShowTechnical(false)
    onToggle()
  }

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative border-b border-white/[0.05] last:border-0"
    >
      {/* Hover/active bg wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${project.accent}10 0%, transparent 70%)` }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: project.accent }}
      />

      {/* Clickable header row */}
      <div
        className="relative flex items-center gap-5 md:gap-8 py-4 md:py-5 px-5 md:px-6 select-none"
        onClick={handleToggle}
      >
        {/* Index */}
        <span className="text-xs font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300 w-5 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Favicon */}
        <div className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <ProjectIcon project={project} size={20} />
        </div>

        {/* Title + badge + live icon */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-zinc-400 group-hover:text-white transition-colors duration-300 truncate">
            {project.title}
          </h3>
          {(project.url || project.live) && (
            <a
              href={project.url || project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="hidden lg:inline-flex shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity duration-200"
              style={{ color: project.accent }}
              title={project.url || project.live}
            >
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.featured && (
            <span
              className="hidden sm:inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest border uppercase"
              style={{ color: project.accent, background: `${project.accent}14`, borderColor: `${project.accent}28` }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Tech stack — desktop */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs font-mono text-zinc-700">+{project.tech.length - 3}</span>
          )}
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300"
        >
          <ChevronDown size={15} />
        </motion.div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 md:px-6 pb-5 ml-10 md:ml-14">

              {/* Snippet — always visible */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-3 max-w-2xl">
                {snippet}
              </p>

              {/* Technical toggle button */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowTechnical((v) => !v) }}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono mb-4 transition-colors duration-200"
                style={{ color: showTechnical ? project.accent : '#52525b' }}
              >
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  padding: '1px 5px',
                  borderRadius: 4,
                  border: `1px solid ${showTechnical ? project.accent + '60' : '#3f3f46'}`,
                  background: showTechnical ? `${project.accent}12` : 'transparent',
                  transition: 'all 0.2s',
                }}>
                  {'</>'}
                </span>
                {t('projects.technicalDetails')}
              </button>

              {/* Technical details — collapsible */}
              <AnimatePresence initial={false}>
                {showTechnical && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="text-sm leading-relaxed mb-4 max-w-2xl"
                      style={{
                        color: '#71717a',
                        borderLeft: `2px solid ${project.accent}40`,
                        paddingLeft: 12,
                        marginBottom: 16,
                      }}
                    >
                      {technical}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md"
                    style={{ background: `${project.accent}12`, color: `${project.accent}cc`, border: `1px solid ${project.accent}22` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Projects section ─────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useLanguage()
  const { setCursor } = useCursor()
  const [modal, setModal] = useState({ active: false, index: 0 })
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isPointerDevice, setIsPointerDevice] = useState(false)

  const featuredProjects  = projects.filter(p => p.featured)
  const remainingProjects = projects.filter(p => !p.featured)

  useEffect(() => {
    setIsPointerDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const handleEnter = useCallback((i) => {
    setModal({ active: true, index: i })
    setCursor({ text: 'View', type: 'project' })
  }, [setCursor])

  const handleLeave = useCallback((i) => {
    setModal({ active: false, index: i })
    setCursor({ text: '', type: 'default' })
  }, [setCursor])

  const handleToggle = useCallback((i) => {
    setExpandedIndex((prev) => (prev === i ? null : i))
  }, [])

  return (
    <>
      <SectionWrapper id="projects">
        <div className="mb-10">
          <SectionLabel>{t('projects.label')}</SectionLabel>
          <SectionHeading>
            {t('projects.heading1')}
            <br />
            <span className="text-zinc-500">{t('projects.heading2')}</span>
          </SectionHeading>
        </div>

        {/* ── Featured showcase cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div className="md:col-span-2">
            <FeaturedProjectCard project={featuredProjects[0]} index={0} t={t} isHero={true} />
          </div>
          {featuredProjects[1] && (
            <FeaturedProjectCard project={featuredProjects[1]} index={1} t={t} isHero={false} />
          )}
          {featuredProjects[2] && (
            <FeaturedProjectCard project={featuredProjects[2]} index={2} t={t} isHero={false} />
          )}
        </div>

        {/* ── Divider ── */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/[0.05]" />
          <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">
            {t('projects.moreProjects')}
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        {/* ── Remaining projects accordion ── */}
        <motion.div
          variants={itemVariants}
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0c0c0c', borderRadius: 20 }}
          className="overflow-hidden"
        >
          {remainingProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              t={t}
              onEnter={() => handleEnter(i + featuredProjects.length)}
              onLeave={() => handleLeave(i + featuredProjects.length)}
              isExpanded={expandedIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Floating preview — portal, only on pointer devices */}
      {isPointerDevice && (
        <ProjectCursorElements
          active={modal.active && expandedIndex !== modal.index}
          activeIndex={modal.index}
          t={t}
        />
      )}
    </>
  )
}
