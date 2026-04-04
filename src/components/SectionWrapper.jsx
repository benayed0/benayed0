import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

export function SectionLabel({ children }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
      <motion.span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-light bg-accent/10 border border-accent/20 tracking-widest uppercase"
        whileHover={{ scale: 1.05, borderColor: 'rgba(124,58,237,0.5)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}

export function SectionHeading({ children, className = '' }) {
  return (
    <motion.h2
      variants={itemVariants}
      className={`text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 ${className}`}
    >
      {children}
    </motion.h2>
  )
}

export function SectionSubheading({ children, className = '' }) {
  return (
    <motion.p
      variants={itemVariants}
      className={`text-zinc-400 text-lg leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  )
}

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={`section-padding max-w-6xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}
