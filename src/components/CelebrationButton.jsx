import { motion } from 'framer-motion'
import { launchGrandCelebration } from '../utils/confetti'

export default function CelebrationButton({ onClick, text = 'اضغطي هنا 🎉', isCelebrated = false }) {
  const handleClick = (e) => {
    launchGrandCelebration()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.div
      style={{ display: 'inline-block', position: 'relative' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* إشعاع خلفي متوهج */}
      <div
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '999px',
          background: 'linear-gradient(45deg, #D4AF37, #F4C2C2, #AA771C, #FFF8F0)',
          filter: 'blur(12px)',
          opacity: 0.7,
          zIndex: 0
        }}
      />

      <button
        onClick={handleClick}
        className={isCelebrated ? '' : 'pulse-button'}
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(135deg, #D4AF37 0%, #E6C663 50%, #B8861B 100%)',
          border: '2px solid #FFF8F0',
          borderRadius: '999px',
          padding: '18px 46px',
          fontSize: '22px',
          fontWeight: '800',
          fontFamily: "'Cairo', sans-serif",
          color: '#2B1B2E',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 12px 30px rgba(212, 175, 55, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.5px'
        }}
      >
        <span>✨</span>
        <span>{text}</span>
        <span>💍</span>
      </button>
    </motion.div>
  )
}
