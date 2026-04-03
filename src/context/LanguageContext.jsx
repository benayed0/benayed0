import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

function detectLanguage() {
  // 1. Check localStorage for saved preference
  const saved = localStorage.getItem('portfolio-lang')
  if (saved && ['en', 'fr'].includes(saved)) return saved
  // 2. Auto-detect from browser
  const browserLang = navigator.language?.split('-')[0]
  return browserLang === 'fr' ? 'fr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  const toggle = () => {
    const next = lang === 'en' ? 'fr' : 'en'
    setLang(next)
    localStorage.setItem('portfolio-lang', next)
  }

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    return value ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
