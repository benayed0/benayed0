import { motion } from 'framer-motion'
import { Layers, Cpu, Globe, Zap } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  SectionSubheading,
  itemVariants,
} from '../components/SectionWrapper'
import { useLanguage } from '../context/LanguageContext'

const cardIcons = [Globe, Layers, Cpu, Zap]

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

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.06]"
          >
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-zinc-100 tracking-tight">{stat.value}</span>
                <span className="text-xs text-zinc-500 leading-tight whitespace-pre-line">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Highlight cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = cardIcons[i]
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-5 rounded-2xl glass-light border border-white/[0.06] hover:border-accent/20 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/15 transition-colors duration-300">
                  <Icon size={16} className="text-accent-light" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">{card.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
