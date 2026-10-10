import { motion } from 'framer-motion'
import CelebrationButton from './CelebrationButton'
import { weddingData } from '../data'

export default function Hero({ onCelebrate, isCelebrated }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 20px 40px',
        position: 'relative',
        zIndex: 2
      }}
    >
      {/* شارة ترحيب علوية فخمة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(244, 194, 194, 0.12)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '999px',
          padding: '8px 24px',
          marginBottom: '28px',
          backdropFilter: 'blur(8px)'
        }}
      >
        <span style={{ fontSize: '18px' }}>🕊️</span>
        <span style={{ color: '#F4C2C2', fontSize: '15px', fontWeight: '600' }}>
          بمناسبة ليلة العمر وعقد القران الميمون
        </span>
        <span style={{ fontSize: '18px' }}>🤍</span>
      </motion.div>

      {/* اسم العروس بخط عربي ملكي متوهج */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ marginBottom: '18px' }}
      >
        <h1
          className="gold-text gold-glow"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
            fontWeight: '900',
            fontFamily: "'Amiri', serif",
            lineHeight: 1.25,
            padding: '0 10px'
          }}
        >
          {weddingData.brideName}
        </h1>
      </motion.div>

      {/* خط زخرفي فاخر */}
      <div className="ornament-divider">
        <span className="line" />
        <span className="diamond">✨ 💍 ✨</span>
        <span className="line" />
      </div>

      {/* الجملة التشويقية */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 'clamp(1.2rem, 3.2vw, 1.8rem)',
          color: '#FFF8F0',
          fontWeight: '700',
          marginBottom: '10px'
        }}
      >
        {weddingData.heroTeaser}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          fontSize: '15px',
          color: '#F4C2C2',
          maxWidth: '520px',
          marginBottom: '42px',
          fontWeight: '400'
        }}
      >
        {weddingData.heroSubtitle}
      </motion.p>

      {/* الزر النابض الكبير لبدء الاحتفالية */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <CelebrationButton
          text={isCelebrated ? weddingData.reCelebrateButtonText : weddingData.celebrateButtonText}
          onClick={onCelebrate}
          isCelebrated={isCelebrated}
        />
      </motion.div>

      {/* سهم إرشادي ناعم للتمرير بعد الضغط */}
      {isCelebrated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            marginTop: '45px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}
          onClick={() => {
            const msgEl = document.getElementById('message-section')
            if (msgEl) msgEl.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span style={{ fontSize: '13px', color: '#D4AF37', fontWeight: '600' }}>
            انزلي للأسفل لمشاهدة التهنئة والذكريات 👇
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ fontSize: '20px', color: '#D4AF37' }}
          >
            ↓
          </motion.span>
        </motion.div>
      )}
    </section>
  )
}
