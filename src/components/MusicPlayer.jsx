import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { musicSynth } from '../utils/audioSynthesizer'
import { weddingData } from '../data'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef(null)

  // إخفاء التلميح تلقائياً بعد 6 ثوانٍ
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  const toggleMusic = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      musicSynth.stop()
      setIsPlaying(false)
    } else {
      setShowTooltip(false)
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          return
        } catch (err) {
          console.warn('Custom audio playback failed, falling back to synthesizer:', err)
        }
      }
      musicSynth.start()
      setIsPlaying(true)
    }
  }

  return (
    <div style={{ position: 'fixed', top: '24px', left: '24px', zIndex: 1000 }}>
      {/* مشغل الصوت */}
      <audio
        ref={audioRef}
        src={weddingData.music?.src || "/wedding-music.mp3"}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{
                background: 'rgba(43, 27, 46, 0.9)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '12px',
                padding: '6px 14px',
                fontSize: '13px',
                color: '#FFF8F0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}
            >
              {weddingData.music?.title || 'موسيقى هادئة 🎵'}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: isPlaying
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(43, 27, 46, 0.9) 100%)'
              : 'rgba(43, 27, 46, 0.75)',
            border: isPlaying ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '999px',
            color: '#FFF8F0',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            boxShadow: isPlaying
              ? '0 0 20px rgba(212, 175, 55, 0.4)'
              : '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {isPlaying ? (
            <>
              {/* أعمدة تذبذب صوتي متحركة */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                <span className="equalizer-bar" style={{ animationDelay: '0s' }} />
                <span className="equalizer-bar" style={{ animationDelay: '0.2s' }} />
                <span className="equalizer-bar" style={{ animationDelay: '0.4s' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#D4AF37' }}>
                الموسيقى تعمل 🎵
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '16px' }}>🔇</span>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>
                تشغيل الموسيقى
              </span>
            </>
          )}
        </motion.button>
      </div>

      <style>{`
        .equalizer-bar {
          display: inline-block;
          width: 3px;
          background: #D4AF37;
          border-radius: 2px;
          animation: eqAnimation 1s ease-in-out infinite alternate;
          height: 14px;
        }
        @keyframes eqAnimation {
          0% { height: 4px; }
          100% { height: 16px; }
        }
      `}</style>
    </div>
  )
}
