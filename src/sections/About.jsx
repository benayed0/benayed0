import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { Layers, Cpu, Globe, Zap } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  SectionSubheading,
  itemVariants,
} from '../components/SectionWrapper'
import { useLanguage } from '../context/LanguageContext'

const cardIcons = [Globe, Layers, Cpu, Zap]

// ─── Count-up animation for numeric stats ────────────────────────────────────
function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const numericPart = parseInt(value, 10)
  const isNumeric = !isNaN(numericPart)
  const suffix = isNumeric ? value.slice(String(numericPart).length) : ''

  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 55, damping: 14 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (inView && isNumeric) count.set(numericPart)
  }, [inView, isNumeric, numericPart, count])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-zinc-100 tracking-tight">
        {isNumeric ? (
          <>
            <motion.span>{display}</motion.span>
            {suffix}
          </>
        ) : (
          value
        )}
      </span>
      <span className="text-xs text-zinc-500 leading-tight whitespace-pre-line">{label}</span>
    </div>
  )
}

// ─── 3D-tilt card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 280, damping: 28 })
  const sry = useSpring(ry, { stiffness: 280, damping: 28 })

  const handleMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    rx.set(-ny * 10)
    ry.set(nx * 10)
  }
  const handleLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      variants={itemVariants}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 700 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const stats = t('about.stats')
  const cards = t('about.cards')

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: Text */}
        <div>
          <SectionLabel>{t('about.label')}</SectionLabel>
          <SectionHeading className="mb-6">
            {t('about.heading1')}
            <br />
            <span className="text-zinc-500">{t('about.heading2')}</span>
          </SectionHeading>
          <SectionSubheading className="mb-8">{t('about.sub')}</SectionSubheading>
          <motion.p variants={itemVariants} className="text-zinc-500 leading-relaxed mb-8">
            {t('about.body')}
          </motion.p>

          {/* Stats with count-up */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.06]"
          >
            {stats.map((stat) => (
              <AnimatedStat key={stat.value} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>

        {/* Right: 3D tilt cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = cardIcons[i]
            return (
              <TiltCard
                key={card.title}
                className="group p-5 rounded-2xl glass-light border border-white/[0.06] hover:border-accent/20 transition-colors duration-300 cursor-default"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon size={16} className="text-accent-light" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">{card.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
