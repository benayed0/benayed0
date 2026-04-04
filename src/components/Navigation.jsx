import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState(null)
  const { lang, toggle, t } = useLanguage()

  const navLinks = [
    { label: t('nav.about'),      href: '#about' },
    { label: t('nav.projects'),   href: '#projects' },
    { label: t('nav.skills'),     href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.contact'),    href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [navLinks.length])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-[rgba(10,10,10,0.88)] backdrop-blur-xl' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-semibold text-zinc-100 tracking-tight hover:text-accent-light transition-colors duration-200"
          >
            {personal.name.split(' ')[0]}
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent-light"
            >
              .
            </motion.span>
          </motion.a>

          {/* Desktop links with sliding indicator */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1)
              const isHovered = hoveredLink === link.href
              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.2, duration: 0.4, ease: 'easeOut' }}
                  onHoverStart={() => setHoveredLink(link.href)}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 z-10"
                  style={{ color: isActive ? '#e4e4e7' : '#71717a' }}
                >
                  {/* Hover/active background pill */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: isActive ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.05)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                  {link.label}
                  {/* Active underline dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center rounded-lg border border-white/[0.08] overflow-hidden"
            >
              <motion.button
                onClick={() => lang !== 'en' && toggle()}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 ${lang === 'en' ? 'bg-white/10 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'}`}
              >EN</motion.button>
              <div className="w-px h-3.5 bg-white/10" />
              <motion.button
                onClick={() => lang !== 'fr' && toggle()}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 ${lang === 'fr' ? 'bg-white/10 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'}`}
              >FR</motion.button>
            </motion.div>

            {personal.availableForWork && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-400 font-medium">{t('nav.available')}</span>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors duration-200 shadow-glow-sm hover:shadow-glow-md"
            >
              {t('nav.getInTouch')}
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-white/[0.08] overflow-hidden">
              <button
                onClick={() => lang !== 'en' && toggle()}
                className={`px-2.5 py-1 text-xs font-mono transition-all duration-200 ${lang === 'en' ? 'bg-white/10 text-zinc-100' : 'text-zinc-600'}`}
              >EN</button>
              <div className="w-px h-3 bg-white/10" />
              <button
                onClick={() => lang !== 'fr' && toggle()}
                className={`px-2.5 py-1 text-xs font-mono transition-all duration-200 ${lang === 'fr' ? 'bg-white/10 text-zinc-100' : 'text-zinc-600'}`}
              >FR</button>
            </div>
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden glass border-b border-white/[0.06]"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2 mt-2 border-t border-white/[0.06]">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  onClick={() => handleNavClick('#contact')}
                  className="w-full px-4 py-3 text-sm font-medium bg-accent text-white rounded-lg transition-colors"
                >
                  {t('nav.getInTouch')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
