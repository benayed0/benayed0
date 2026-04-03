export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-white/5 text-zinc-400 border border-white/8 ${className}`}
    >
      {children}
    </span>
  )
}
