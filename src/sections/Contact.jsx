import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  itemVariants,
} from '../components/SectionWrapper'
import { personal } from '../data/portfolio'

const contactLinks = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
    description: 'Best for project inquiries',
    primary: true,
  },
  {
    label: 'GitHub',
    value: 'azizbenayed',
    href: personal.github,
    icon: Github,
    description: 'See what I\'m building',
    primary: false,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Aziz Ben Ayed',
    href: personal.linkedin,
    icon: Linkedin,
    description: 'Professional background',
    primary: false,
    external: true,
  },
]

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      {/* Background glow */}
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Contact</SectionLabel>

          <SectionHeading className="mb-6 text-center">
            Let's build
            <br />
            <span className="text-zinc-500">something great.</span>
          </SectionHeading>

          <motion.p variants={itemVariants} className="text-zinc-500 text-lg leading-relaxed">
            I'm always open to interesting projects, collaborations, and conversations. Whether
            you have a specific opportunity or just want to connect — reach out.
          </motion.p>
        </div>

        {/* Contact cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`group relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${
                link.primary
                  ? 'bg-accent hover:bg-accent/90 shadow-glow-sm hover:shadow-glow-md border border-accent/30'
                  : 'glass-light border border-white/[0.07] hover:border-white/15'
              }`}
            >
              {/* Top right arrow */}
              <ArrowUpRight
                size={16}
                className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  link.primary ? 'text-white/70' : 'text-zinc-500'
                }`}
              />

              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                  link.primary ? 'bg-white/15' : 'bg-white/5 border border-white/8'
                }`}
              >
                <link.icon size={16} className={link.primary ? 'text-white' : 'text-zinc-400'} />
              </div>

              <span
                className={`text-sm font-semibold mb-1 ${
                  link.primary ? 'text-white' : 'text-zinc-200'
                }`}
              >
                {link.label}
              </span>
              <span
                className={`text-xs font-mono mb-2 ${
                  link.primary ? 'text-white/70' : 'text-zinc-500'
                }`}
              >
                {link.value}
              </span>
              <span
                className={`text-xs mt-auto ${
                  link.primary ? 'text-white/50' : 'text-zinc-600'
                }`}
              >
                {link.description}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <MessageSquare size={14} className="text-zinc-700" />
          <p className="text-sm text-zinc-600">
            Typical response time:{' '}
            <span className="text-zinc-500 font-medium">24–48 hours</span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
