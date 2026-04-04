import { motion } from 'framer-motion'
import { Layout, Server, Brain, Smartphone, Cloud } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { skills } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const iconMap = { Layout, Server, Brain, Smartphone, Cloud }

const categoryAccents = {
  Frontend: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)' },
  Mobile:   { color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.18)' },
  Backend:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.18)' },
  'AI / ML': { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.18)' },
  'Cloud / DevOps': { color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.18)' },
}

const extraSkills = [
  'Stripe', 'Cloudflare R2', 'Yjs CRDT', 'Prisma RLS',
  'Factur-X', 'WordPress', 'FFmpeg', 'Mailjet', 'GitHub Actions', 'Linux',
]

// Card entrance: slide up + blur, then subtle hover glow
const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export default function Skills() {
  const { t } = useLanguage()
  const categories = t('skills.categories')

  return (
    <SectionWrapper id="skills">
      <div className="mb-12">
        <SectionLabel>{t('skills.label')}</SectionLabel>
        <SectionHeading>
          {t('skills.heading1')}
          <br />
          <span className="text-zinc-500">{t('skills.heading2')}</span>
        </SectionHeading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((group, groupIndex) => {
          const Icon = iconMap[group.icon] || Layout
          const accent = categoryAccents[group.category] || categoryAccents['Frontend']
          const categoryLabel = categories[group.category] || group.category

          return (
            <motion.div
              key={group.category}
              custom={groupIndex}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="group relative p-6 rounded-2xl transition-colors duration-300"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${accent.color}10 0%, transparent 70%)` }}
              />
              {/* Hover border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: `1px solid ${accent.border}` }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Scan-line reveal on enter */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIndex * 0.08 + 0.3 }}
              >
                <motion.div
                  className="absolute inset-x-0 top-0 h-full"
                  style={{ background: `linear-gradient(to bottom, ${accent.color}12, transparent)` }}
                  initial={{ y: '-100%' }}
                  whileInView={{ y: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.08 + 0.05, ease: 'easeIn' }}
                />
              </motion.div>

              {/* Icon */}
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
              >
                <Icon size={18} style={{ color: accent.color }} />
              </div>

              <h3 className="relative text-sm font-semibold text-zinc-300 mb-4 tracking-wide">
                {categoryLabel}
              </h3>

              <div className="relative flex flex-col gap-2.5">
                {group.items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.06 + i * 0.05 + 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex items-center gap-2.5"
                  >
                    <motion.div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: accent.color }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    />
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Extra skills strip */}
      <motion.div
        variants={itemVariants}
        className="mt-12 pt-8 border-t border-white/[0.05] flex flex-wrap gap-3 items-center"
      >
        <span className="text-xs text-zinc-600 font-mono tracking-wide">{t('skills.alsoFamiliarWith')}</span>
        {extraSkills.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.08, color: '#a1a1aa' }}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-zinc-600 transition-colors cursor-default"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
