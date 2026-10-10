import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '../data'

export default function Message({ isCelebrated }) {
  const { message } = weddingData
  const fullText = message.paragraphs.join('\n\n')

  const [displayedText, setDisplayedText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  // بدء الكتابة التدريجية عند تفعيل الاحتفال
  useEffect(() => {
    if (isCelebrated && !hasStartedTyping) {
      setHasStartedTyping(true)
    }
  }, [isCelebrated, hasStartedTyping])

  useEffect(() => {
    if (!hasStartedTyping || isTypingDone) return

    let currentIndex = 0
    // سرعة الكتابة: سريعة بما يكفي لعدم الملل وسلسة
    const interval = setInterval(() => {
      currentIndex += 2
      if (currentIndex >= fullText.length) {
        setDisplayedText(fullText)
        setIsTypingDone(true)
        clearInterval(interval)
      } else {
        setDisplayedText(fullText.slice(0, currentIndex))
      }
    }, 28)

    return () => clearInterval(interval)
  }, [hasStartedTyping, isTypingDone, fullText])

  const handleSkipTyping = () => {
    setDisplayedText(fullText)
    setIsTypingDone(true)
  }

  return (
    <section
      id="message-section"
      style={{
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container" style={{ maxWidth: '850px' }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* زخرفة زاوية ذهبية علوية */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontSize: '28px',
              opacity: 0.35,
              userSelect: 'none'
            }}
          >
            💍
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              fontSize: '28px',
              opacity: 0.35,
              userSelect: 'none'
            }}
          >
            💐
          </div>

          {/* شارة الرسالة */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '999px',
                padding: '6px 20px',
                fontSize: '14px',
                color: '#D4AF37',
                fontWeight: '600'
              }}
            >
              {message.badge}
            </span>
          </div>

          {/* عنوان الرسالة */}
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontFamily: "'Amiri', serif",
              color: '#FFF8F0',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: 1.4
            }}
          >
            {message.title}
          </h2>

          {/* نص الحديث الشريف / الدعاء المأثور بإطار مزخرف */}
          <div
            style={{
              background: 'rgba(244, 194, 194, 0.08)',
              borderRight: '4px solid #D4AF37',
              borderLeft: '4px solid #D4AF37',
              borderRadius: '12px',
              padding: '16px 24px',
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <p
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                color: '#D4AF37',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}
            >
              {message.hadith}
            </p>
          </div>

          {/* خط فاصل */}
          <div className="ornament-divider" style={{ margin: '16px auto 30px' }}>
            <span className="line" />
            <span className="diamond">🤍 ✨ 🤍</span>
            <span className="line" />
          </div>

          {/* نص الرسالة بتأثير الآلة الكاتبة Typewriter */}
          <div
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              lineHeight: 2.1,
              color: '#FFF8F0',
              whiteSpace: 'pre-line',
              textAlign: 'justify',
              minHeight: '180px'
            }}
          >
            {displayedText}
            {!isTypingDone && hasStartedTyping && (
              <span className="typewriter-cursor">|</span>
            )}
          </div>

          {/* زر تخطي الحركة في حال رغب القارئ في إظهار النص فوراً */}
          {!isTypingDone && hasStartedTyping && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={handleSkipTyping}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(212, 175, 55, 0.75)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                عرض الرسالة كاملة دفعة واحدة ⚡
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
