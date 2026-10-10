import { useState } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '../data'
import { launchGrandCelebration } from '../utils/confetti'

export default function Footer() {
  const { signature } = weddingData
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <footer
      style={{
        padding: '70px 20px 40px',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(to top, rgba(18, 10, 19, 0.95) 0%, rgba(43, 27, 46, 0) 100%)',
        textAlign: 'center'
      }}
    >
      <div className="container" style={{ maxWidth: '750px' }}>
        {/* بطاقة التوقيع الفخمة */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: '40px 30px',
            marginBottom: '40px',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤍 💍 💐</div>

          <p style={{ color: '#F4C2C2', fontSize: '15px', marginBottom: '8px' }}>
            {signature.prefix}
          </p>

          <h3
            className="gold-text gold-glow"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              fontFamily: "'Amiri', serif",
              fontWeight: '900',
              marginBottom: '14px'
            }}
          >
            {signature.name}
          </h3>

          <p style={{ color: 'rgba(255, 248, 240, 0.8)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px' }}>
            {signature.note}
          </p>

          {/* أزرار تفاعلية في التذييل */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* زر إطلاق الاحتفالية مجدداً */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={launchGrandCelebration}
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 26px',
                color: '#2B1B2E',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
              }}
            >
              <span>ألعاب نارية وزغاريد 🎊</span>
            </motion.button>

            {/* زر نسخ الرابط */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              style={{
                background: 'rgba(255, 248, 240, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '999px',
                padding: '12px 24px',
                color: '#FFF8F0',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{copied ? 'تم نسخ الرابط بنجاح! ✓' : 'مشاركة الرابط مع مشاعر 📋'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* حقوق وتاريخ الإهداء */}
        <p style={{ color: 'rgba(255, 248, 240, 0.5)', fontSize: '13px' }}>
          صُنِع بكل حب واعتزاز • بارك الله للعروسين وأتم فرحتهما على خير ✨
        </p>
      </div>
    </footer>
  )
}
