import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personal } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/[0.05] mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: branding */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="font-semibold text-zinc-400 tracking-tight">
              {personal.name}
              <span className="text-accent-light">.</span>
            </span>
            <span className="hidden sm:block text-zinc-800">·</span>
            <span className="text-xs text-zinc-700 font-mono">
              © {year}. Built with React & Vite.
            </span>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-1">
            {[
              { href: personal.github, icon: Github, label: 'GitHub' },
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
