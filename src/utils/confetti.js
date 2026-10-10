import confetti from 'canvas-confetti'

/**
 * إطلاق احتفالية فخمة متعددة المراحل (ألعاب نارية، قلوب، وورود ذهبية)
 */
export const launchGrandCelebration = () => {
  const duration = 4.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 9999 }

  const colors = ['#D4AF37', '#F4C2C2', '#FFF8F0', '#FFD700', '#FF85A2', '#FFFFFF']

  // مرحلة 1: انفجار فوري من المنتصف
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    zIndex: 9999
  })

  // مرحلة 2: مدافع جانبية وألعاب نارية مستمرة لمدة 4.5 ثوانٍ
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 45 * (timeLeft / duration)

    // مدفع من اليسار
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.1, y: Math.random() - 0.2 },
      colors: colors
    })

    // مدفع من اليمين
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.9, y: Math.random() - 0.2 },
      colors: colors
    })

    // قلوب وورود في المنتصف
    confetti({
      particleCount: 15,
      angle: 90,
      spread: 75,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#F4C2C2', '#FF69B4', '#D4AF37'],
      shapes: ['circle'],
      scalar: 1.2,
      zIndex: 9999
    })
  }, 350)
}

/**
 * إطلاق زخات خفيفة متكررة عند التفاعل
 */
export const launchSparkles = () => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#D4AF37', '#FFF8F0', '#F4C2C2'],
    zIndex: 9999
  })
}
