import { motion } from 'framer-motion'
import { Layers, Cpu, Globe, Zap } from 'lucide-react'
import SectionWrapper, {
  SectionLabel,
  SectionHeading,
  SectionSubheading,
  itemVariants,
} from '../components/SectionWrapper'
import { personal, stats } from '../data/portfolio'

const highlightCards = [
  {
    icon: Globe,
    title: 'Product-minded',
    description: 'I think about users first, systems second. Good software solves real problems.',
  },
  {
    icon: Layers,
    title: 'Full-stack depth',
    description: 'Comfortable from database schema to UI animation. No layer is someone else\'s problem.',
  },
  {
    icon: Cpu,
    title: 'AI-native builder',
    description: 'LLMs, embeddings, RAG pipelines — I build AI into products, not demos.',
  },
  {
    icon: Zap,
    title: 'Bias for shipping',
    description: 'Ideas are worthless without execution. I move fast without cutting corners.',
  },
]

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div>
          <SectionLabel>About</SectionLabel>
          <SectionHeading className="mb-6">
            Engineer. Builder.
            <br />
            <span className="text-zinc-500">Problem solver.</span>
          </SectionHeading>
          <SectionSubheading className="mb-8">
            I've spent the last several years building software that people actually use — from
            internal tools and APIs to full-stack SaaS products and AI integrations.
          </SectionSubheading>
          <motion.p variants={itemVariants} className="text-zinc-500 leading-relaxed mb-8">
            My approach is grounded in clarity: clean architecture, intentional abstractions,
            and code that the next engineer can reason about without a guide. I work best in
            small, focused teams where ownership is high and bureaucracy is low.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.06]">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-zinc-100 tracking-tight">{stat.value}</span>
                <span className="text-xs text-zinc-500 leading-tight whitespace-pre-line">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Highlight cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlightCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 rounded-2xl glass-light border border-white/[0.06] hover:border-accent/20 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/15 transition-colors duration-300">
                <card.icon size={16} className="text-accent-light" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">{card.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
