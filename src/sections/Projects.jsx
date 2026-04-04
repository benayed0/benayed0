import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight, ChevronDown, X } from 'lucide-react'
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

// ─── Single project row ────────────────────────────────────────────────────────
function ProjectRow({ project, index, t, onEnter, onLeave, isExpanded, onToggle }) {
  const description = t(`projects.items.${project.id}.description`)

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
        onClick={onToggle}
      >
        {/* Index */}
        <span className="text-xs font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300 w-5 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Favicon */}
        <div className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <ProjectIcon project={project} size={20} />
        </div>

        {/* Title + badge */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-zinc-400 group-hover:text-white transition-colors duration-300 truncate">
            {project.title}
          </h3>
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

      {/* Expandable description */}
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
              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-2xl">
                {description}
              </p>
              {/* All tech tags */}
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
              {/* Live link */}
              {(project.url || project.live) && (
                <a
                  href={project.url || project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  style={{ background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}30` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} />
                  {t('projects.visitLive')}
                </a>
              )}
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

        <motion.div
          variants={itemVariants}
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0c0c0c', borderRadius: 20 }}
          className="overflow-hidden"
        >
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              t={t}
              onEnter={() => handleEnter(i)}
              onLeave={() => handleLeave(i)}
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
