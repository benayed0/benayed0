import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { personal } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

// ─── Letter-by-letter reveal with perspective flip ───────────────────────────
function SplitText({ text, delay = 0, stagger = 0.045, className }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-block', perspective: '600px' }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 70, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * stagger,
          }}
          style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Magnetic CTA button ──────────────────────────────────────────────────────
function MagneticButton({ href, onClick, className, children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })

  const handleMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href={href}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

// ─── Floating background tags ─────────────────────────────────────────────────
const TAGS = [
  { label: 'Angular', x: '76%', y: '14%', dur: 5.2, del: 0 },
  { label: 'NestJS',  x: '83%', y: '38%', dur: 6.1, del: 0.8 },
  { label: 'Yjs CRDT', x: '68%', y: '60%', dur: 5.5, del: 1.6 },
  { label: 'GPT-4o', x: '80%', y: '78%', dur: 4.9, del: 0.4 },
  { label: 'Flutter', x: '62%', y: '88%', dur: 6.4, del: 1.2 },
  { label: 'WhisperX', x: '87%', y: '55%', dur: 5.8, del: 2.0 },
  { label: 'Docker',  x: '70%', y: '28%', dur: 7.0, del: 0.6 },
  { label: 'PostgreSQL', x: '57%', y: '72%', dur: 5.3, del: 1.8 },
]

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType === 'touch') return
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`)
        e.currentTarget.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`)
      }}
    >

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">

        {/* Aurora orb 1 – top-right */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.32, 0.2], x: [0, 40, 0], y: [0, -24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-22%] right-[-12%] w-[750px] h-[750px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 68%)', filter: 'blur(50px)' }}
        />
        {/* Aurora orb 2 – bottom-left */}
        <motion.div
          animate={{ scale: [1.1, 1, 1.12], opacity: [0.1, 0.2, 0.1], x: [0, -28, 0], y: [0, 36, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-12%] left-[-18%] w-[650px] h-[650px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 68%)', filter: 'blur(60px)' }}
        />
        {/* Aurora orb 3 – center soft pulse */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[55%] left-[38%] w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)', filter: 'blur(70px)' }}
        />

        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: 'radial-gradient(500px circle at var(--sx, 50%) var(--sy, 50%), rgba(124,58,237,0.07), transparent 50%)' }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating tech tags – desktop only */}
        {TAGS.map((tag) => (
          <motion.div
            key={tag.label}
            className="absolute hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-mono text-zinc-600 border border-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.018)', left: tag.x, top: tag.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.65, 0.35], y: [0, -14, 0] }}
            transition={{ duration: tag.dur, repeat: Infinity, ease: 'easeInOut', delay: tag.del + 2 }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-10 inline-flex"
          >
            {personal.availableForWork && (
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/[0.08] text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-medium">{t('nav.openTo')}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500">{personal.location}</span>
              </div>
            )}
          </motion.div>

          {/* Name – letter by letter perspective flip */}
          <div className="mb-6 overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95]">
              <SplitText text="Aziz" className="text-zinc-100 block" delay={0.15} stagger={0.055} />
              <SplitText text="Ben Ayed" className="gradient-text block" delay={0.4} stagger={0.05} />
              <motion.span
                initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.95, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-accent-light inline-block"
              >
                .
              </motion.span>
            </h1>
          </div>

          {/* Tagline – word-by-word blur reveal */}
          <div className="mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-300 leading-snug tracking-tight max-w-2xl">
              {[
                { text: t('hero.tagline1'), accent: false },
                { text: t('hero.tagline2'), accent: true },
                { text: t('hero.tagline3'), accent: false },
              ].map(({ text, accent }, pi) =>
                text.split(' ').map((word, wi, arr) => (
                  <motion.span
                    key={`${pi}-${wi}`}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: 1.0 + pi * 0.18 + wi * 0.07 }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                    className={accent ? 'text-accent-light' : ''}
                  >
                    {word}
                  </motion.span>
                ))
              )}
            </p>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1.5 }}
            className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-xl mb-12"
          >
            {t('hero.bio')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <MagneticButton
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-colors duration-200 shadow-glow-sm hover:shadow-glow-md text-sm"
            >
              {t('hero.viewProjects')}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-zinc-100 font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-sm"
            >
              {t('hero.contactMe')}
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="flex items-center gap-5"
          >
            {[
              { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 1.9 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.25, y: -3, color: '#a78bfa' }}
                whileTap={{ scale: 0.9 }}
                className="text-zinc-500 transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.15, ease: 'easeOut' }}
              style={{ originX: 0 }}
              className="h-px w-12 bg-zinc-800 ml-1"
            />
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 2.25 }}
              className="text-zinc-600 text-xs font-mono tracking-wide"
            >
              {personal.email}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-7 bg-gradient-to-b from-transparent to-zinc-700" />
          <ChevronDown size={14} className="text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
