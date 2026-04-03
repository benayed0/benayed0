import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import Badge from '../components/ui/Badge'
import { projects } from '../data/portfolio'

function FeaturedProjectCard({ project }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Accent gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.accent}18 0%, transparent 60%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      <div className="relative p-8 md:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
                style={{
                  color: project.accent,
                  background: `${project.accent}15`,
                  borderColor: `${project.accent}30`,
                }}
              >
                Featured
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-2xl">
          {project.description}
        </p>

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
          {/* Decorative corner elements */}
          <div
            className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-40"
            style={{ background: project.accent }}
          />
          <div
            className="absolute top-3 left-7 w-2 h-2 rounded-full opacity-20"
            style={{ background: project.accent }}
          />
          <div
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${project.accent}, transparent)`,
              transform: 'translate(30%, 30%)',
            }}
          />
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.accent}12 0%, transparent 65%)`,
        }}
      />

      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 60%)` }}
      />

      <div className="relative p-6 flex flex-col flex-1">
        {/* Icon + links */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-8 h-8 rounded-lg opacity-80"
            style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}25` }}
          >
            <div
              className="w-full h-full rounded-lg"
              style={{ background: `${project.accent}30` }}
            />
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors"
                aria-label="Live"
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge>+{project.tech.length - 4}</Badge>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="projects">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <SectionLabel>Projects</SectionLabel>
          <SectionHeading>
            Things I've
            <br />
            <span className="text-zinc-500">built.</span>
          </SectionHeading>
        </div>
        <motion.a
          variants={itemVariants}
          href="https://github.com/azizbenayed"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 bg-white/5 hover:bg-white/8 rounded-xl border border-white/[0.07] hover:border-white/15 transition-all duration-200"
        >
          <Github size={15} />
          All repositories
          <ArrowUpRight size={14} />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  )
}
