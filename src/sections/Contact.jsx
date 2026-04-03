import { motion } from 'framer-motion'
import { Mail, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { personal } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const linkIcons = [Mail, Linkedin]
const linkHrefs = [
  `mailto:${personal.email}`,
  personal.linkedin,
]
const linkExternal = [false, true]
const linkValues = [personal.email, 'Aziz Ben Ayed']

export default function Contact() {
  const { t } = useLanguage()
  const links = t('contact.links')

  return (
    <SectionWrapper id="contact">
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>{t('contact.label')}</SectionLabel>
          <SectionHeading className="mb-6 text-center">
            {t('contact.heading1')}
            <br />
            <span className="text-zinc-500">{t('contact.heading2')}</span>
          </SectionHeading>
          <motion.p variants={itemVariants} className="text-zinc-500 text-lg leading-relaxed">
            {t('contact.bio')}
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
          {links.map((link, i) => {
            const Icon = linkIcons[i]
            const isPrimary = i === 0
            return (
              <motion.a
                key={link.label}
                href={linkHrefs[i]}
                target={linkExternal[i] ? '_blank' : undefined}
                rel={linkExternal[i] ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`group relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${
                  isPrimary
                    ? 'bg-accent hover:bg-accent/90 shadow-glow-sm hover:shadow-glow-md border border-accent/30'
                    : 'glass-light border border-white/[0.07] hover:border-white/15'
                }`}
              >
                <ArrowUpRight
                  size={16}
                  className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isPrimary ? 'text-white/70' : 'text-zinc-500'
                  }`}
                />
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                    isPrimary ? 'bg-white/15' : 'bg-white/5 border border-white/8'
                  }`}
                >
                  <Icon size={16} className={isPrimary ? 'text-white' : 'text-zinc-400'} />
                </div>
                <span className={`text-sm font-semibold mb-1 ${isPrimary ? 'text-white' : 'text-zinc-200'}`}>
                  {link.label}
                </span>
                <span className={`text-xs font-mono mb-2 ${isPrimary ? 'text-white/70' : 'text-zinc-500'}`}>
                  {link.value || linkValues[i]}
                </span>
                <span className={`text-xs mt-auto ${isPrimary ? 'text-white/50' : 'text-zinc-600'}`}>
                  {link.description}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <MessageSquare size={14} className="text-zinc-700" />
          <p className="text-sm text-zinc-600">
            {t('contact.responseTime')}{' '}
            <span className="text-zinc-500 font-medium">{t('contact.responseValue')}</span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
