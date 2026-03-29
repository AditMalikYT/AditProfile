'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + Math.random() * 30 // Faster for testing but still feels natural
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020408]"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <span className="bg-gradient-to-br from-[#f0c040] to-[#38d9f5] bg-clip-text text-transparent">
                ADIT
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#38d9f5] to-[#4c8ef7]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.span
              className="mt-4 text-[10px] tracking-[0.3em] uppercase text-[#6b7c9a] font-bold"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#38d9f5]/5 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
