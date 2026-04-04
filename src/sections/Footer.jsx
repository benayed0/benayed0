import { motion } from 'framer-motion'
import { Linkedin, Mail, ArrowUp, Zap } from 'lucide-react'
import { personal } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const STACK = [
  { name: 'React',          color: '#61dafb', desc: 'UI framework'      },
  { name: 'Vite',           color: '#a78bfa', desc: 'Build tool'        },
  { name: 'Tailwind CSS',   color: '#38bdf8', desc: 'Styling'           },
  { name: 'Framer Motion',  color: '#e879f9', desc: 'Animations'        },
  { name: 'Lucide',         color: '#fb923c', desc: 'Icons'             },
]

function StackPill({ name, color, desc }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-default"
      style={{
        background: `${color}08`,
        borderColor: `${color}20`,
      }}
    >
      {/* Dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}90` }}
      />
      <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200">
        {name}
      </span>
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap
                   text-[10px] font-mono px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 border"
        style={{ background: '#111', borderColor: `${color}30`, color }}
      >
        {desc}
      </span>
    </motion.div>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/[0.05]">
      {/* Glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 blur-sm"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed60, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8 space-y-8">

        {/* Built with */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-600">
            <Zap size={12} className="text-violet-500" />
            <span className="text-[11px] font-mono tracking-widest uppercase">Built with</span>
            <Zap size={12} className="text-violet-500" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {STACK.map((item) => (
              <StackPill key={item.name} {...item} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.04]" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-400 tracking-tight">
              {personal.name}<span className="text-violet-400">.</span>
            </span>
            <span className="text-zinc-800">·</span>
            <span className="text-xs text-zinc-700 font-mono">© {year}</span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-zinc-700 hover:text-zinc-400 transition-colors"
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <div className="w-px h-4 bg-zinc-800 mx-2" />
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-zinc-700 hover:text-zinc-400 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  )
}
