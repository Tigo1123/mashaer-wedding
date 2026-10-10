import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Message from './components/Message'
import Wishes from './components/Wishes'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import FloatingParticles from './components/FloatingParticles'

export default function App() {
  const [isCelebrated, setIsCelebrated] = useState(false)

  const handleCelebrate = () => {
    setIsCelebrated(true)

    // تمرير سلس بعد بدء الألعاب النارية
    setTimeout(() => {
      const messageElement = document.getElementById('message-section')
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 850)
  }

  return (
    <div className="wedding-app" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* جزيئات خلفية عائمة رقيقة */}
      <FloatingParticles />

      {/* مشغل الموسيقى الهادئة الاختياري */}
      <MusicPlayer />

      {/* الصفحة الأولى / شاشة الهبوط */}
      <Hero onCelebrate={handleCelebrate} isCelebrated={isCelebrated} />

      {/* بقية أقسام الاحتفالية تظهر بسلاسة عند الضغط على الزر */}
      <AnimatePresence>
        {isCelebrated && (
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* رسالة التهنئة بتأثير الآلة الكاتبة */}
            <Message isCelebrated={isCelebrated} />

            {/* بطاقات الدعوات والأمنيات الثلاث */}
            <Wishes />

            {/* معرض الصور التفاعلي */}
            <Gallery />

            {/* التوقيع وخاتمة الإهداء */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
