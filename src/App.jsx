import { LanguageProvider } from './context/LanguageContext'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const Divider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
)

export default function App() {
  return (
    <LanguageProvider>
      <div className="noise-overlay">
        <Navigation />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Experience />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
