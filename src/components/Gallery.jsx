import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { weddingData } from '../data'

export default function Gallery() {
  const { photos } = weddingData
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const activePhoto = photos[currentIndex]

  return (
    <section
      id="gallery-section"
      style={{
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* رأس القسم */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontSize: '14px',
                color: '#F4C2C2',
                fontWeight: '600',
                letterSpacing: '1px'
              }}
            >
              ألبوم اللحظات الجميلة 📸
            </span>
            <h2
              className="gold-text"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontFamily: "'Amiri', serif",
                marginTop: '8px'
              }}
            >
              معرض الصور والذكريات
            </h2>
            <div className="ornament-divider" style={{ margin: '12px auto' }}>
              <span className="line" />
              <span className="diamond">✨ 💐 ✨</span>
              <span className="line" />
            </div>
            <p style={{ color: 'rgba(255, 248, 240, 0.75)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
              اضغطي على أي صورة لتكبيرها، أو استخدمي الأسهم للتنقل بين أجمل اللقطات
            </p>
          </motion.div>
        </div>

        {/* إطار السلايدر الرئيسي */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '28px'
          }}
        >
          {/* الصورة المعروضة الحالية */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              maxHeight: '480px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#1A0F1D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPhoto(activePhoto)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={activePhoto.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.45 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </AnimatePresence>

            {/* شريط معلومات الصورة في الأسفل */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 20px 16px',
                background: 'linear-gradient(to top, rgba(26, 15, 29, 0.95) 0%, rgba(26, 15, 29, 0) 100%)',
                textAlign: 'center'
              }}
            >
              <h4 style={{ color: '#D4AF37', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                {activePhoto.title}
              </h4>
              <p style={{ color: '#FFF8F0', fontSize: '14px', opacity: 0.9 }}>
                {activePhoto.caption}
              </p>
            </div>
          </div>

          {/* أزرار التنقل (يمين ويسار) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '18px',
              padding: '0 8px'
            }}
          >
            {/* زر السابق (باللغة العربية في الـ RTL، السابق يكون على اليمين أو حسب السهم) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              aria-label="الصورة السابقة"
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ➔
            </motion.button>

            {/* مؤشرات الصور (Dots) */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`الانتقال إلى الصورة ${idx + 1}`}
                  style={{
                    width: currentIndex === idx ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: currentIndex === idx ? '#D4AF37' : 'rgba(255, 248, 240, 0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* زر التالي */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              aria-label="الصورة التالية"
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ⬅
            </motion.button>
          </div>

          {/* مصغرات الصور السريعة (Thumbnails) */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingTop: '16px',
              marginTop: '12px',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)'
            }}
          >
            {photos.map((p, idx) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  flexShrink: 0,
                  width: '74px',
                  height: '52px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: currentIndex === idx ? '2px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
                  opacity: currentIndex === idx ? 1 : 0.6,
                  transition: 'opacity 0.2s, border 0.2s'
                }}
              >
                <img
                  src={p.url}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* نافذة التكبير الكامل (Lightbox Modal) */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 8, 17, 0.92)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '720px',
                  width: '100%',
                  background: '#2B1B2E',
                  border: '2px solid #D4AF37',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                  textAlign: 'center'
                }}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', background: '#1A0F1D' }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#D4AF37', fontSize: '20px', marginBottom: '8px' }}>
                    {selectedPhoto.title}
                  </h3>
                  <p style={{ color: '#FFF8F0', fontSize: '15px', marginBottom: '16px' }}>
                    {selectedPhoto.caption}
                  </p>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '8px 24px',
                      color: '#2B1B2E',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    إغلاق ✕
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
