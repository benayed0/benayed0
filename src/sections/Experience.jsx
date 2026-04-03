import { motion } from 'framer-motion'
import { Briefcase, ArrowRight } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { experience } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Experience() {
  const { t } = useLanguage()
  const items = t('experience.items')

  return (
    <SectionWrapper id="experience">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
        {/* Left sticky label */}
        <div className="lg:sticky lg:top-28">
          <SectionLabel>{t('experience.label')}</SectionLabel>
          <SectionHeading className="mb-6">
            {t('experience.heading1')}
            <br />
            <span className="text-zinc-500">{t('experience.heading2')}</span>
          </SectionHeading>
          <motion.p variants={itemVariants} className="text-sm text-zinc-500 leading-relaxed">
            {t('experience.subtitle')}
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-accent/30 via-white/[0.05] to-transparent" />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => {
              const translated = items[i] || {}
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  custom={i}
                  className="group relative pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 flex items-center justify-center w-[22px] h-[22px]">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                        item.current
                          ? 'border-accent bg-accent shadow-glow-sm'
                          : 'border-zinc-700 bg-[#0a0a0a] group-hover:border-zinc-500'
                      }`}
                    />
                    {item.current && (
                      <div className="absolute w-5 h-5 rounded-full bg-accent/20 animate-ping" />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="relative p-6 rounded-2xl transition-all duration-300"
                    style={{
                      background: item.current ? 'rgba(124,58,237,0.05)' : '#111111',
                      border: item.current ? '1px solid rgba(124,58,237,0.2)' : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {item.current && (
                      <div
                        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                        style={{ background: 'linear-gradient(90deg, #7c3aed60, transparent)' }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-zinc-100">
                            {translated.role || item.role}
                          </h3>
                          {item.current && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/15 text-accent-light border border-accent/25">
                              {t('experience.current')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={12} className="text-zinc-600" />
                          <span className="text-zinc-400">{item.company}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-600 shrink-0">{item.period}</span>
                    </div>

                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                      {translated.description || item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(translated.highlights || item.highlights).map((h) => (
                        <span key={h} className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                          <ArrowRight size={10} className="text-zinc-700" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
