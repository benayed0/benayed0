import { motion } from 'framer-motion'
import { Layout, Server, Brain, Cloud } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { skills } from '../data/portfolio'

const iconMap = { Layout, Server, Brain, Cloud }

const categoryAccents = {
  Frontend: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)' },
  Backend: { color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.18)' },
  'AI / ML': { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.18)' },
  'Cloud / DevOps': { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.18)' },
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="mb-12">
        <SectionLabel>Stack</SectionLabel>
        <SectionHeading>
          Tools of
          <br />
          <span className="text-zinc-500">the craft.</span>
        </SectionHeading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skills.map((group, groupIndex) => {
          const Icon = iconMap[group.icon] || Layout
          const accent = categoryAccents[group.category] || categoryAccents['Frontend']

          return (
            <motion.div
              key={group.category}
              variants={itemVariants}
              custom={groupIndex}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative p-6 rounded-2xl transition-all duration-300"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${accent.color}0d 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: `1px solid ${accent.border}` }}
              />

              {/* Icon */}
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
              >
                <Icon size={18} style={{ color: accent.color }} />
              </div>

              {/* Category */}
              <h3 className="relative text-sm font-semibold text-zinc-300 mb-4 tracking-wide">
                {group.category}
              </h3>

              {/* Skills list */}
              <div className="relative flex flex-col gap-2.5">
                {group.items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.05 + i * 0.04, duration: 0.4 }}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-60"
                      style={{ background: accent.color }}
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

      {/* Decorative bottom strip */}
      <motion.div
        variants={itemVariants}
        className="mt-12 pt-8 border-t border-white/[0.05] flex flex-wrap gap-3 items-center"
      >
        <span className="text-xs text-zinc-600 font-mono tracking-wide">Also familiar with:</span>
        {['Go', 'Rust (basics)', 'Prisma', 'tRPC', 'Zustand', 'Playwright', 'Stripe', 'WebSockets'].map((item) => (
          <span
            key={item}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors cursor-default"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
