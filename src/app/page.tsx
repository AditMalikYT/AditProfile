'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import {
  Bot,
  Zap,
  Clapperboard,
  Globe,
  Brain,
  Handshake,
  Smartphone,
  Palette,
  ChartLine
} from 'lucide-react'

// ============================================
// 🎨 ADIT — AI ARCHITECT & CREATOR PORTFOLIO
// Fully animated 3D with particle network
// Combined design with gold/cyan/blue palette
// ============================================

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="relative min-h-screen bg-[#020408] text-[#e8edf5] overflow-x-hidden selection:bg-[#38d9f5]/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38d9f5] to-[#4c8ef7] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Particle Network Background */}
      <ParticleNetwork />

      {/* Custom Glowing Cursor */}
      <CustomCursor />

      {/* Floating Ambient Orbs */}
      <FloatingOrbs />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Examples Section */}
        <ExamplesSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}


// ============================================
// 🧭 NAVIGATION
// ============================================
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-500">
      <div className={`w-full px-6 py-3 flex items-center justify-between rounded-full border transition-all duration-500 ${scrolled
          ? 'bg-[#020408]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-transparent'
        }`}>
        <div className="text-2xl font-extrabold bg-gradient-to-br from-[#f0c040] to-[#38d9f5] bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
          ADIT
        </div>
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#examples">Examples</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <MagneticButton>
          <a href="#pricing" className="px-5 py-2 rounded-full bg-gradient-to-br from-[#38d9f5] to-[#4c8ef7] text-black font-bold text-[11px] tracking-wider uppercase hover:shadow-[0_0_30px_rgba(56,217,245,0.4)] transition-all duration-300 block">
            Hire Me
          </a>
        </MagneticButton>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] hover:text-[#38d9f5] transition-all duration-300 relative group">
      <ScrambleText text={children} />
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#38d9f5] transition-all duration-300 group-hover:w-full" />
    </a>
  )
}

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const scramble = () => {
    let iterations = 0
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split('').map((char, index) => {
          if (index < iterations) return text[index]
          return characters[Math.floor(Math.random() * characters.length)]
        }).join('')
      )

      if (iterations >= text.length) clearInterval(interval)
      iterations += 1/3
    }, 30)
  }

  return (
    <span onMouseEnter={scramble}>
      {displayText}
    </span>
  )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.35, y: y * 0.35 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 🌌 PARTICLE NETWORK BACKGROUND
// Live particle network with 120 connected nodes
// ============================================

interface ParticleData {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  r: number
}

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: ParticleData[] = []
    const particleCount = 120
    const connectionDistance = 120

    function createParticle(): ParticleData {
      if (!canvas) return { x: 0, y: 0, z: 0, vx: 0, vy: 0, r: 0 }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      }
    }

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    function drawBg() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = 0.3 + p.z * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 217, 245, ${alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)

          if (d < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(56, 217, 245, ${(1 - d / connectionDistance) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(drawBg)
    }

    resize()
    init()
    drawBg()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-60"
    />
  )
}

// ============================================
// ✨ CUSTOM GLOWING CURSOR
// Color-shift on hover interactive elements
// ============================================
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      if (!cursor || !ring) return
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`

      requestAnimationFrame(animate)
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const hoverEl = target.closest('a, button, .skill-card, .example-card, .pricing-card, [data-cursor-hover], [data-cursor-text]') as HTMLElement

      if (hoverEl) {
        setIsHovering(true)
        const text = hoverEl.getAttribute('data-cursor-text')
        if (text) setCursorText(text)
      }
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement
      const hoverEl = target.closest('a, button, .skill-card, .example-card, .pricing-card, [data-cursor-hover], [data-cursor-text]')
      if (hoverEl) {
        setIsHovering(false)
        setCursorText('')
      }
    }

    animate()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center mix-blend-screen overflow-hidden"
        style={{
          width: isHovering ? (cursorText ? '80px' : '20px') : '12px',
          height: isHovering ? (cursorText ? '80px' : '20px') : '12px',
          background: isHovering ? '#f0c040' : '#38d9f5',
          borderRadius: '50%',
          transition: 'width 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.2s',
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-black tracking-tighter text-black"
          >
            {cursorText}
          </motion.span>
        )}
      </div>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          width: isHovering ? '54px' : '36px',
          height: isHovering ? '54px' : '36px',
          border: '1.5px solid #38d9f5',
          borderRadius: '50%',
          opacity: 0.5,
          transition: 'width 0.15s, height 0.15s',
        }}
      />
    </>
  )
}

// ============================================
// 🔮 FLOATING AMBIENT ORBS
// Depth blur effect orbs
// ============================================
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Large cyan orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,217,245,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gold orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(240,192,64,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '-5%',
          right: '-8%',
        }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: -3,
        }}
      />

      {/* Blue orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(76,142,247,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '50%',
          left: '40%',
        }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: -5,
        }}
      />
    </div>
  )
}

// ============================================
// 🏠 HERO SECTION
// 3D tilt that responds to mouse movement
// ============================================
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateY(x * 6)
    setRotateX(-y * 4)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-24 pb-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
    >
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: rotateY * 20,
            y: rotateX * 20,
            rotate: [0, 10, 0]
          }}
          className="absolute top-[20%] left-[15%] w-12 h-12 border border-[#38d9f5]/20 rounded-lg"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          animate={{
            x: -rotateY * 15,
            y: -rotateX * 15,
            rotate: [0, -15, 0]
          }}
          className="absolute bottom-[25%] right-[20%] w-16 h-16 border border-[#f0c040]/20 rounded-full"
        />
        <motion.div
          animate={{
            x: rotateY * 10,
            y: -rotateX * 10,
          }}
          className="absolute top-[40%] right-[10%] w-8 h-8 bg-gradient-to-br from-[#38d9f5]/10 to-transparent blur-sm"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      </div>

      <motion.div
        ref={contentRef}
        className="text-center max-w-4xl"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s ease',
        }}
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center group"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0c040] to-[#38d9f5] blur-md opacity-60 animate-pulse group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" />
            <Image
              src="/logo.png"
              alt="Adit Profile"
              fill
              className="rounded-full object-cover relative z-10 border-2 border-[#38d9f5]/30"
              priority
            />
          </div>
        </motion.div>

        {/* Glowing badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(56,217,245,0.12)] bg-[rgba(56,217,245,0.05)] mb-8"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38d9f5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38d9f5]"></span>
          </span>
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#38d9f5]">Available for new projects</span>
        </motion.div>

        {/* Main Title with staggered reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-[-3px] mb-6"
          style={{ fontFamily: 'Syne, sans-serif', transform: 'translateZ(20px)' }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-[#f0c040] to-[#e8a020] bg-clip-text text-transparent inline-block"
          >
            AI
          </motion.span>{' '}
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-block"
          >
            Architect
          </motion.span>
          <br />
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-br from-[#38d9f5] to-[#4c8ef7] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,217,245,0.4)] inline-block"
          >
            &amp; Digital Creator
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-[#6b7c9a] mb-10 max-w-xl mx-auto leading-relaxed font-light"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* ✏️ EDIT TAGLINE BELOW */}
          I build intelligent digital systems — AI-powered websites, automation pipelines,
          and viral content engines that scale without limits.
          {/* END TAGLINE */}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ transform: 'translateZ(30px)' }}
        >
          <MagneticButton>
            <a
              href="#examples"
              data-cursor-hover
              className="px-8 py-3.5 rounded-full bg-gradient-to-br from-[#38d9f5] to-[#4c8ef7] text-black font-semibold text-sm hover:shadow-[0_0_50px_rgba(56,217,245,0.5)] transition-all duration-300 block"
            >
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#pricing"
              data-cursor-hover
              className="px-8 py-3.5 rounded-full border border-[rgba(99,179,237,0.12)] text-white font-medium text-sm hover:border-[#38d9f5] hover:text-[#38d9f5] hover:bg-[rgba(56,217,245,0.05)] transition-all duration-300 block"
            >
              Get a Quote
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b7c9a] text-[11px] tracking-[0.1em] uppercase"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-[#38d9f5] to-transparent"
          style={{ transformOrigin: 'top' }}
        />
        scroll
      </motion.div>
    </section>
  )
}

// ============================================
// 💪 SKILLS SECTION
// 9 skill cards with animated bars
// ============================================
function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skills = [
    { name: 'AI Automation', level: 'Advanced', percentage: 92 },
    { name: 'Prompt Engineering', level: 'Advanced', percentage: 90 },
    { name: 'YouTube Content', level: 'Intermediate', percentage: 78 },
    { name: 'Web Development', level: 'Intermediate', percentage: 72 },
    { name: 'AI/ML Fundamentals', level: 'Learning', percentage: 55 },
    { name: 'Influence Psychology', level: 'Learning', percentage: 50 },
    { name: 'Telegram Bot Dev', level: 'Intermediate', percentage: 68 },
    { name: 'Generative Art', level: 'Intermediate', percentage: 74 },
    { name: 'Viral Strategy', level: 'Advanced', percentage: 85 },
  ]

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto" ref={ref}>
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#38d9f5]">Capabilities</span>
          <span className="flex-1 max-w-[60px] h-px bg-[#38d9f5]/40" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold tracking-[-2px] mb-4 text-balance"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          What I<br />
          <span className="text-[#38d9f5]">Master</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#6b7c9a] text-base max-w-md leading-relaxed"
        >
          Tools and technologies I use to architect, automate, and scale digital systems.
        </motion.p>
      </div>

      {/* ✏️ EDIT SKILLS BELOW - Modify the skills array above */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            {...skill}
            isInView={isInView}
            delay={index * 0.06}
          />
        ))}
      </div>
      {/* END SKILLS */}
    </section>
  )
}

function SkillCard({
  name,
  level,
  percentage,
  isInView,
  delay
}: {
  name: string
  level: string
  percentage: number
  isInView: boolean
  delay: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Map skill names to icons
  const getIconComponent = (skillName: string) => {
    switch (skillName) {
      case 'AI Automation': return <Bot className="w-8 h-8" />
      case 'Prompt Engineering': return <Zap className="w-8 h-8" />
      case 'YouTube Content': return <Clapperboard className="w-8 h-8" />
      case 'Web Development': return <Globe className="w-8 h-8" />
      case 'AI/ML Fundamentals': return <Brain className="w-8 h-8" />
      case 'Influence Psychology': return <Handshake className="w-8 h-8" />
      case 'Telegram Bot Dev': return <Smartphone className="w-8 h-8" />
      case 'Generative Art': return <Palette className="w-8 h-8" />
      case 'Viral Strategy': return <ChartLine className="w-8 h-8" />
      default: return <Bot className="w-8 h-8" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="skill-card relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] overflow-hidden transition-all duration-500"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered ? 'rotateX(4deg)' : 'none',
      }}
      data-cursor-hover
    >
      {/* Top gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#38d9f5] to-[#4c8ef7]"
        style={{ transformOrigin: 'left' }}
      />

      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-br from-[rgba(56,217,245,0.05)] to-transparent pointer-events-none"
      />

      <div className="relative">
        <div className="text-3xl mb-3 flex justify-center">
          {getIconComponent(name)}
        </div>
        <div className="text-sm font-bold mb-1 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>{name}</div>
        <div className="text-[11px] text-[#6b7c9a] mb-3 text-center">{level}</div>

        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-white/[0.06] rounded overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: percentage / 100 } : {}}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
            className="h-full rounded bg-gradient-to-r from-[#38d9f5] to-[#4c8ef7]"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// 📁 EXAMPLES SECTION
// 3 example cards with live animated previews
// ============================================
function ExamplesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const examples = [
    {
      title: 'Local Business AI Site',
      tag: 'AI Website',
      description: 'AI-generated business landing page built with ChatGPT + Hostinger Horizons. Full SEO + design.',
      animationType: 'wave' as const,
      link: '#pricing',
    },
    {
      title: 'Rice & Plants Bot',
      tag: 'Telegram Bot',
      description: 'Daily planner bot for productivity, built in Telegram with smart AI-driven scheduling.',
      animationType: 'nodes' as const,
      link: '#pricing',
    },
    {
      title: 'YT SEO for Channel',
      tag: 'YouTube Channel',
      description: 'AI-generated SEO-optimized title, description, thumbnail, and videos with cultural relevance, automated end-to-end.',
      animationType: 'bars' as const,
      link: '#pricing',
    },
  ]

  return (
    <section id="examples" className="py-24 md:py-32 px-6 md:px-16" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#38d9f5]">Portfolio</span>
            <span className="flex-1 max-w-[60px] h-px bg-[#38d9f5]/40" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-[-2px] mb-4 text-balance"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Featured<br />
            <span className="text-[#f0c040]">Examples</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#6b7c9a] text-base max-w-md leading-relaxed"
          >
            Real projects delivered. Replace these with your own network and project examples.
          </motion.p>
        </div>

        {/* ✏️ EDIT EXAMPLES BELOW - Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          <ExampleCard
            {...examples[0]}
            isInView={isInView}
            delay={0}
            className="md:col-span-2 md:row-span-2"
          />
          <ExampleCard
            {...examples[1]}
            isInView={isInView}
            delay={0.1}
            className="md:col-span-2 md:row-span-1"
          />
          <ExampleCard
            {...examples[2]}
            isInView={isInView}
            delay={0.2}
            className="md:col-span-2 md:row-span-1"
          />
        </div>
        {/* END EXAMPLES */}
      </div>
    </section>
  )
}

function ExampleCard({
  title,
  tag,
  description,
  animationType,
  isInView,
  delay,
  link,
  className = ""
}: {
  title: string
  tag: string
  description: string
  animationType: 'wave' | 'nodes' | 'bars'
  isInView: boolean
  delay: number
  link: string
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateY(x * 10)
    setRotateX(-y * 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d121f] hover:border-[#38d9f5]/30 transition-all duration-500 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      data-cursor-text="VIEW"
    >
      {/* Animated Canvas Preview */}
      <div className="relative h-full w-full overflow-hidden flex flex-col">
        <div className="relative flex-1 bg-[#0a0f1a] overflow-hidden">
          <MiniCanvas type={animationType} />

          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 absolute bottom-0 left-0 right-0 z-10">
          <motion.div
            style={{ transform: 'translateZ(30px)' }}
            className="text-[10px] tracking-[0.2em] uppercase text-[#38d9f5] mb-3 font-bold opacity-80"
          >
            {tag}
          </motion.div>
          <h3
            style={{ transform: 'translateZ(50px)', fontFamily: 'Syne, sans-serif' }}
            className="text-2xl font-extrabold mb-4 group-hover:text-[#38d9f5] transition-colors leading-tight"
          >
            {title}
          </h3>
          <p
            style={{ transform: 'translateZ(20px)' }}
            className="text-[14px] text-[#6b7c9a] leading-relaxed line-clamp-2 mb-6 group-hover:text-[#e8edf5]/80 transition-colors"
          >
            {description}
          </p>
          <MagneticButton>
            <a
              href={link}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#38d9f5] group/btn"
            >
              Explore Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Highlight glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38d9f5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

// Mini Canvas Animations
function MiniCanvas({ type }: { type: 'wave' | 'nodes' | 'bars' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.parentElement?.getBoundingClientRect()
    canvas.width = (rect?.width || 400) * 2
    canvas.height = (rect?.height || 200) * 2
    ctx.scale(2, 2)

    let animationId: number
    const width = canvas.width / 2
    const height = canvas.height / 2
    let t = 0

    if (type === 'wave') {
      function drawWave() {
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)
        const grad = ctx.createLinearGradient(0, 0, width, height)
        grad.addColorStop(0, '#020408')
        grad.addColorStop(1, '#0a1428')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo(0, height / 2)
          for (let x = 0; x <= width; x += 4) {
            const y = height / 2 + Math.sin((x + t * 1.2 + i * 30) * 0.018) * (20 - i * 3) + Math.sin((x * 0.03 + t * 0.7 + i)) * (10 - i * 1.5)
            ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(56, 217, 245, ${0.15 - i * 0.025})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        ctx.font = '700 18px Syne, sans-serif'
        ctx.fillStyle = 'rgba(240, 192, 64, 0.9)'
        ctx.textAlign = 'center'
        ctx.fillText('AI Website', width / 2, height / 2 - 10)
        ctx.font = '300 12px DM Sans, sans-serif'
        ctx.fillStyle = 'rgba(200, 220, 240, 0.5)'
        ctx.fillText('ChatGPT + Hostinger Horizons', width / 2, height / 2 + 16)

        t++
        animationId = requestAnimationFrame(drawWave)
      }
      drawWave()
    } else if (type === 'nodes') {
      const nodes = [
        { x: width * 0.5, y: height * 0.5, r: 12 },
        { x: width * 0.2, y: height * 0.3, r: 7 },
        { x: width * 0.8, y: height * 0.3, r: 7 },
        { x: width * 0.25, y: height * 0.72, r: 7 },
        { x: width * 0.75, y: height * 0.72, r: 7 },
        { x: width * 0.5, y: height * 0.18, r: 6 },
      ]

      function drawNodes() {
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#060d18'
        ctx.fillRect(0, 0, width, height)

        nodes.forEach((n, i) => {
          if (i > 0) {
            ctx.beginPath()
            ctx.moveTo(nodes[0].x, nodes[0].y)
            ctx.lineTo(n.x, n.y)
            ctx.strokeStyle = 'rgba(56, 217, 245, 0.18)'
            ctx.lineWidth = 1
            ctx.stroke()
          }
          const pulse = Math.sin(t * 0.05 + i) * 0.4 + 0.6
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + (i === 0 ? 3 : 0), 0, Math.PI * 2)
          ctx.fillStyle = i === 0 ? `rgba(240, 192, 64, ${pulse})` : `rgba(56, 217, 245, ${pulse * 0.7})`
          ctx.fill()
        })

        ctx.font = '700 15px Syne, sans-serif'
        ctx.fillStyle = 'rgba(240, 192, 64, 0.9)'
        ctx.textAlign = 'center'
        ctx.fillText('Rice & Plants Bot', width / 2, height - 18)

        t++
        animationId = requestAnimationFrame(drawNodes)
      }
      drawNodes()
    } else if (type === 'bars') {
      const vals = [0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1.0, 0.85, 0.75, 0.95, 0.88, 0.92]

      function drawBars() {
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#06080f'
        ctx.fillRect(0, 0, width, height)

        const bars = 12
        const bw = width / bars - 6

        for (let i = 0; i < bars; i++) {
          const bh = (vals[i] + Math.sin(t * 0.03 + i * 0.5) * 0.06) * (height * 0.6)
          const x = i * (bw + 6) + 12
          const y = height - bh - 20

          const grad = ctx.createLinearGradient(x, y + bh, x, y)
          grad.addColorStop(0, 'rgba(56, 217, 245, 0.4)')
          grad.addColorStop(1, 'rgba(76, 142, 247, 0.9)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.roundRect(x, y, bw, bh, 4)
          ctx.fill()
        }

        ctx.font = '700 15px Syne, sans-serif'
        ctx.fillStyle = 'rgba(56, 217, 245, 0.9)'
        ctx.textAlign = 'center'
        ctx.fillText('Viral Facts Channel', width / 2, 22)

        t++
        animationId = requestAnimationFrame(drawBars)
      }
      drawBars()
    }

    return () => cancelAnimationFrame(animationId)
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// ============================================
// 💰 PRICING SECTION
// Video Automation + Automation Services
// ============================================
function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: 'Website Starter',
      price: '$99',
      period: '/one-time',
      description: 'Perfect for small businesses wanting a clean AI-generated web presence.',
      features: [
        { text: '1-Page AI Website', included: true },
        { text: 'Basic SEO Setup', included: true },
        { text: 'Mobile Responsive', included: true },
        { text: '3-day Delivery', included: true },
        { text: 'Custom Animations', included: false },
        { text: 'AI Chatbot', included: false },
      ],
      featured: false,
      cta: 'Contact Me',
    },
    {
      name: 'Video Automation',
      price: '$149',
      period: '/month',
      description: 'Automated YouTube content creation with AI-generated videos and optimization.',
      features: [
        { text: 'YT SEO Keyword & Intent Research', included: true },
        { text: 'SEO Optimization', included: true },
        { text: 'Thumbnail Design', included: true },
        { text: 'Auto-Uploading', included: true },
        { text: 'Analytics Dashboard', included: true },
        { text: 'Priority Support', included: false },
      ],
      featured: true,
      cta: 'Contact Me',
    },
    {
      name: 'AI Automation',
      price: '$249',
      period: '/month',
      description: 'Full automation suite — bots, workflows, and AI integrations for your business.',
      features: [
        { text: 'Custom Telegram Bot', included: true },
        { text: 'Workflow Automation', included: true },
        { text: 'API Integrations', included: true },
        { text: 'AI Chatbot Setup', included: true },
        { text: 'Content Pipelines', included: true },
        { text: 'Priority Support', included: true },
      ],
      featured: false,
      cta: 'Coming Soon',
    },
  ]

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-16" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#38d9f5]">Investment</span>
            <span className="flex-1 max-w-[60px] h-px bg-[#38d9f5]/40" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-[-2px] mb-4 text-balance"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Simple,<br />
            <span className="text-[#38d9f5]">Transparent</span> Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#6b7c9a] text-base max-w-md leading-relaxed"
          >
            Pick the plan that fits your project. All plans include fast delivery and AI-optimized output.
          </motion.p>
        </div>

        {/* ✏️ EDIT PRICING BELOW - Modify the plans array above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              {...plan}
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </div>
        {/* END PRICING */}
      </div>
    </section>
  )
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  featured,
  cta,
  isInView,
  delay
}: {
  name: string
  price: string
  period: string
  description: string
  features: { text: string; included: boolean }[]
  featured: boolean
  cta: string
  isInView: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -12, scale: 1.02 }}
      className={`relative rounded-3xl p-8 overflow-hidden transition-all duration-500 ${featured
        ? 'bg-gradient-to-br from-[#38d9f5]/10 to-[#4c8ef7]/10 border-2 border-[#38d9f5]/30 shadow-[0_0_60px_rgba(56,217,245,0.15)]'
        : 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08]'
        }`}
      data-cursor-hover
    >
      {/* Featured top glow line */}
      {featured && (
        <div className="absolute top-0 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-[#38d9f5] to-transparent" />
      )}

      {/* Badge */}
      {featured && (
        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-br from-[#f0c040] to-[#e8a020] text-black text-[10px] font-bold tracking-[0.1em] uppercase mb-5">
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <div className="text-sm font-bold text-[#6b7c9a] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
        {name}
      </div>

      {/* Price */}
      <div className="text-5xl font-extrabold tracking-[-2px] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
        {price}
        <span className="text-lg font-normal text-[#6b7c9a]">{period}</span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#6b7c9a] mt-3 mb-6 leading-relaxed">{description}</p>

      {/* Divider */}
      <div className="h-px bg-[rgba(99,179,237,0.12)] mb-6" />

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-[#e8edf5]' : 'text-[#6b7c9a]'}`}>
            <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${feature.included ? 'bg-[rgba(56,217,245,0.15)] text-[#38d9f5]' : 'bg-white/[0.04] text-[#6b7c9a]'
              }`}>
              {feature.included ? '✓' : '—'}
            </span>
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        data-cursor-hover
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${featured
          ? 'bg-gradient-to-br from-[#38d9f5] to-[#4c8ef7] text-black shadow-[0_8px_30px_rgba(56,217,245,0.3)] hover:shadow-[0_12px_40px_rgba(56,217,245,0.4)] hover:scale-[1.02]'
          : 'border border-[rgba(99,179,237,0.12)] text-[#e8edf5] hover:border-[#38d9f5] hover:text-[#38d9f5] hover:bg-[rgba(56,217,245,0.05)]'
          }`}
      >
        <a href="#contact" className="text-xs font-medium tracking-widest uppercase text-[#6b7c9a] hover:text-[#38d9f5] transition-colors relative group">
          {cta}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#38d9f5] transition-all duration-300 group-hover:w-full" />
        </a>
      </button>
    </motion.div>
  )
}

// ============================================
// 📬 CONTACT SECTION
// Email contact form with EmailJS
// ============================================
function ContactSection() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        'service_4xybnrt',
        'template_y57nzjn',
        formRef.current,
        ' To update my kids Sl2-JFrsLmYHFVRMK'
      )
      setSubmitStatus('success')
      formRef.current.reset()
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-16" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#38d9f5]">Get in Touch</span>
            <span className="flex-1 max-w-[60px] h-px bg-[#38d9f5]/40" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-[-2px] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Let's Work<br />
            <span className="text-[#f0c040]">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#6b7c9a] text-base leading-relaxed"
          >
            Have a project in mind? Send me a message and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
          data-cursor-text="SEND"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] mb-4">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[#e8edf5] placeholder-[#6b7c9a]/30 focus:border-[#38d9f5]/50 focus:outline-none focus:ring-1 focus:ring-[#38d9f5]/30 transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] mb-4">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[#e8edf5] placeholder-[#6b7c9a]/30 focus:border-[#38d9f5]/50 focus:outline-none focus:ring-1 focus:ring-[#38d9f5]/30 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] mb-4">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[#e8edf5] placeholder-[#6b7c9a]/30 focus:border-[#38d9f5]/50 focus:outline-none focus:ring-1 focus:ring-[#38d9f5]/30 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#38d9f5] to-[#4c8ef7] text-black font-semibold text-sm hover:shadow-[0_0_40px_rgba(56,217,245,0.4)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <span className="text-[#38d9f5] text-sm">✓ Message sent successfully!</span>
            )}
            {submitStatus === 'error' && (
              <span className="text-red-400 text-sm">✗ Failed to send. Please try again.</span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}

// ============================================
// 📬 FOOTER SECTION
// Contact links and social
// ============================================
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-16 bg-[#020408]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-2xl font-extrabold bg-gradient-to-br from-[#f0c040] to-[#38d9f5] bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif' }}>
            ADIT
          </div>
          <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b7c9a]/60">
            Architecting the future of AI
          </div>
        </div>

        <div className="text-[12px] text-[#6b7c9a] font-medium">
          © {new Date().getFullYear()} — Designed & Built with passion
        </div>

        <div className="flex gap-8">
          {/* ✏️ EDIT CONTACT LINKS BELOW */}
          <a href="#" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] hover:text-[#38d9f5] transition-all duration-300">Telegram</a>
          <a href="#" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] hover:text-[#38d9f5] transition-all duration-300">YouTube</a>
          <a href="#" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6b7c9a] hover:text-[#38d9f5] transition-all duration-300">Email</a>
          {/* END CONTACT LINKS */}
        </div>
      </div>
    </footer>
  )
}
