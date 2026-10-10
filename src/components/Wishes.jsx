import { motion } from 'framer-motion'
import { weddingData } from '../data'

export default function Wishes() {
  const { wishes } = weddingData

  return (
    <section
      id="wishes-section"
      style={{
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        {/* رأس القسم */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontSize: '14px',
                color: '#D4AF37',
                fontWeight: '600',
                letterSpacing: '1px'
              }}
            >
              أصدق المشاعر والدعوات 🕊️
            </span>
            <h2
              className="gold-text"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontFamily: "'Amiri', serif",
                marginTop: '8px'
              }}
            >
              أمنيات ودعوات مباركة للعروسين
            </h2>
            <div className="ornament-divider" style={{ margin: '12px auto' }}>
              <span className="line" />
              <span className="diamond">✨ 🤍 ✨</span>
              <span className="line" />
            </div>
          </motion.div>
        </div>

        {/* شبكة الكروت الثلاثة */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              className="glass-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.18 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* أيقونة الكرت المتوهجة */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(244, 194, 194, 0.15) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
                }}
              >
                {wish.icon}
              </div>

              {/* عنوان الكرت */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: '#D4AF37',
                  fontWeight: '700',
                  marginBottom: '14px',
                  fontFamily: "'Cairo', sans-serif"
                }}
              >
                {wish.title}
              </h3>

              {/* وصف الدعوة */}
              <p
                style={{
                  color: 'rgba(255, 248, 240, 0.88)',
                  fontSize: '15px',
                  lineHeight: '1.9'
                }}
              >
                {wish.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
