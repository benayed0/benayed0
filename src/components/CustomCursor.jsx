import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

// Only renders on real pointer devices (not touch)
function useIsPointerDevice() {
  const [is, setIs] = useState(false)
  useEffect(() => {
    setIs(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])
  return is
}

export default function CustomCursor() {
  const isPointer = useIsPointerDevice()
  const { cursor } = useCursor()
  const [visible, setVisible] = useState(false)
  const [isOverLink, setIsOverLink] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot — instant
  const dotX = useSpring(mx, { stiffness: 700, damping: 45 })
  const dotY = useSpring(my, { stiffness: 700, damping: 45 })

  // Ring — slight lag
  const ringX = useSpring(mx, { stiffness: 200, damping: 28 })
  const ringY = useSpring(my, { stiffness: 200, damping: 28 })

  useEffect(() => {
    if (!isPointer) return

    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setIsOverLink(!!el?.closest('a, button, [role="button"]'))
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [isPointer, mx, my])

  if (!isPointer) return null

  const isProjectHover = cursor.type === 'project'
  const ringSize = isProjectHover ? 0 : isOverLink ? 38 : 26

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dot */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              x: dotX,
              y: dotY,
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 99999,
              width: isOverLink ? 6 : 5,
              height: isOverLink ? 6 : 5,
              borderRadius: '50%',
              backgroundColor: isProjectHover ? 'transparent' : '#ffffff',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          />

          {/* Ring */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 99998,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
            animate={{
              width: ringSize,
              height: ringSize,
              opacity: ringSize === 0 ? 0 : 1,
              borderColor: isOverLink ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.2)',
            }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, width: 0, height: 0 }}
            exit={{ opacity: 0 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
