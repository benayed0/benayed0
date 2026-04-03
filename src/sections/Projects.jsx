import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import Badge from '../components/ui/Badge'
import { projects } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

function FeaturedProjectCard({ project, t }) {
  const description = t(`projects.items.${project.id}.description`)

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${project.accent}18 0%, transparent 60%)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      <div className="relative p-8 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
                style={{ color: project.accent, background: `${project.accent}15`, borderColor: `${project.accent}30` }}
              >
                {t('projects.featured')}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.live && (
              <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors" aria-label="Live demo">
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-2xl">{description}</p>

        {/* Placeholder visual */}
        <div
          className="relative w-full h-40 md:h-52 rounded-xl mb-8 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-20">
              <div className="w-16 h-1.5 rounded-full" style={{ background: project.accent }} />
              <div className="w-10 h-1.5 rounded-full" style={{ background: project.accent, opacity: 0.5 }} />
              <div className="w-14 h-1.5 rounded-full" style={{ background: project.accent, opacity: 0.3 }} />
            </div>
          </div>
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-40" style={{ background: project.accent }} />
          <div className="absolute top-3 left-7 w-2 h-2 rounded-full opacity-20" style={{ background: project.accent }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent)`, transform: 'translate(30%, 30%)' }} />
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, t }) {
  const description = t(`projects.items.${project.id}.description`)

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${project.accent}12 0%, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 60%)` }}
      />

      <div className="relative p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-8 h-8 rounded-lg opacity-80"
            style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}25` }}>
            <div className="w-full h-full rounded-lg" style={{ background: `${project.accent}30` }} />
          </div>
          {project.live && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors" aria-label="Live">
                <ExternalLink size={15} />
              </a>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-5">{description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.slice(0, 4).map((t) => <Badge key={t}>{t}</Badge>)}
          {project.tech.length > 4 && <Badge>+{project.tech.length - 4}</Badge>}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="projects">
      <div className="mb-12">
        <SectionLabel>{t('projects.label')}</SectionLabel>
        <SectionHeading>
          {t('projects.heading1')}
          <br />
          <span className="text-zinc-500">{t('projects.heading2')}</span>
        </SectionHeading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} t={t} />
        ))}
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>
    </SectionWrapper>
  )
}
