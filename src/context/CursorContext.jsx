import { createContext, useContext, useState } from 'react'

const CursorContext = createContext({ cursor: { text: '', type: 'default' }, setCursor: () => {} })

export function CursorProvider({ children }) {
  const [cursor, setCursor] = useState({ text: '', type: 'default' })
  return (
    <CursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => useContext(CursorContext)
