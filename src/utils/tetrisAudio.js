// Lightweight Web Audio API synthesizer for retro arcade sound effects
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tetris_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tetris_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.1, decay = true) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      if (decay) {
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback fails gracefully if blocked by browser
    }
  }

  playMove() {
    this.playTone(280, 0.05, 'square', 0.04);
  }

  playRotate() {
    this.playTone(480, 0.07, 'triangle', 0.06);
  }

  playDrop() {
    this.playTone(160, 0.08, 'sawtooth', 0.08);
  }

  playHardDrop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playLineClear(lines = 1) {
    if (this.isMuted) return;
    const notes = lines >= 4 ? [440, 554, 659, 880] : [392, 523, 659];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.14, 'square', 0.07);
      }, idx * 60);
    });
  }

  playGameOver() {
    if (this.isMuted) return;
    const notes = [330, 311, 293, 277, 261];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'sawtooth', 0.08);
      }, idx * 100);
    });
  }

  playLevelUp() {
    if (this.isMuted) return;
    const notes = [523, 659, 784, 1046];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.16, 'sine', 0.09);
      }, idx * 75);
    });
  }
}

export const sound = new SoundController();
