/**
 * مولد موسيقى هادئة ورومانسية باستخدام Web Audio API
 * يعمل تلقائياً وبدون الحاجة لملفات خارجية أو إنترنت، مع نغمات قيثارة دافئة وألحان زفاف حالمة.
 */
class RomanticMusicSynth {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.timer = null
    this.tempo = 72 // إيقاع هادئ
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // عزف نغمة قيثارة / بيانو دافئة
  playTone(freq, time, duration, volume = 0.15) {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    // مزيج موجات ناعم ومخملي
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, time)

    gain.gain.setValueAtTime(0.001, time)
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(time)
    osc.stop(time + duration)
  }

  // تسلسل سلم موسيقي رومانسي دافئ (Eb Major / C minor pentatonic)
  start() {
    this.initContext()
    if (this.isPlaying) return
    this.isPlaying = true

    const notes = [
      // Eb Major Arpeggios (Eb, G, Bb, C, D, Eb)
      311.13, 392.00, 466.16, 523.25, 587.33, 622.25,
      523.25, 466.16, 392.00, 311.13, 261.63, 311.13,
      392.00, 466.16, 587.33, 523.25, 466.16, 392.00,
      349.23, 392.00, 440.00, 466.16, 523.25, 587.33
    ]

    let step = 0

    const scheduleNotes = () => {
      if (!this.isPlaying || !this.ctx) return
      const now = this.ctx.currentTime

      // نغمة التناغم الرئيسية
      const freq = notes[step % notes.length]
      this.playTone(freq, now, 1.8, 0.12)

      // إضافة نغمة قرار (باس دافئ) كل 4 خطوات
      if (step % 4 === 0) {
        const bassNotes = [155.56, 174.61, 196.00, 233.08]
        const bassFreq = bassNotes[Math.floor(step / 4) % bassNotes.length]
        this.playTone(bassFreq, now, 3.2, 0.09)
      }

      step++
      this.timer = setTimeout(scheduleNotes, (60 / this.tempo) * 1000 * 0.75)
    }

    scheduleNotes()
  }

  stop() {
    this.isPlaying = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.start()
      return true
    }
  }
}

export const musicSynth = new RomanticMusicSynth()
