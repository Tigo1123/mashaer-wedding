import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function FloatingParticles() {
  // إنشاء جزيئات خلفية عشوائية وثابتة للحفاظ على الأداء
  const particles = useMemo(() => {
    const emojis = ['✨', '🤍', '💖', '💍', '🕊️', '💐', '🌸']
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 5.5 + Math.random() * 5) % 96}%`,
      size: 14 + (i % 4) * 6,
      duration: 14 + (i % 7) * 3,
      delay: (i % 5) * 2,
      opacity: 0.25 + (i % 3) * 0.15
    }))
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="floating-particle"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.3))'
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (p.id % 2 === 0 ? 35 : -35), 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}
