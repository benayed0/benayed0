import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-accent hover:bg-accent/90 text-white shadow-glow-sm hover:shadow-glow-md border border-accent/20',
  secondary: 'bg-white/5 hover:bg-white/10 text-zinc-100 border border-white/10 hover:border-white/20',
  ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  size = 'md',
  external = false,
  ...props
}) {
  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm'

  const base = `inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${sizeClasses} ${variants[variant]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={base}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} className={base} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}
