export class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private scribbleBuffer: AudioBuffer | null = null;
  private whooshBuffer: AudioBuffer | null = null;

  init() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio init warning - silent fallback
    }
  }

  private getScribbleBuffer(): AudioBuffer | null {
    if (this.scribbleBuffer) return this.scribbleBuffer;
    if (!this.ctx) return null;
    const ctx = this.ctx;
    const bufferSize = Math.floor(ctx.sampleRate * 2.0);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      data[i] = (b0 + b1 + b2 + white * 0.1) * 0.5;
    }
    this.scribbleBuffer = buffer;
    return buffer;
  }

  // Helper for crisp signature pen stroke accents ("us aavz ko")
  private triggerStrokeTick(time: number, freqStart = 880, freqEnd = 260, volume = 0.35) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    try {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freqStart, time);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, time + 0.035);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.006);
      gain.gain.linearRampToValueAtTime(0, time + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.04);
    } catch {
      // safe fallback
    }
  }

  // Crisp, tactile fountain pen signature sound for "patelprince" signature drawing
  playSignatureSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. Rhythmic tactile stroke accents ("us aavz ko" matching the pen paths of "Patel" and "Prince")
    // "Patel" letter loops
    this.triggerStrokeTick(now + 0.06, 920, 280, 0.45);
    this.triggerStrokeTick(now + 0.20, 860, 250, 0.35);
    this.triggerStrokeTick(now + 0.34, 940, 290, 0.4);
    this.triggerStrokeTick(now + 0.48, 880, 260, 0.35);
    this.triggerStrokeTick(now + 0.62, 820, 240, 0.4);

    // "Prince" letter loops
    this.triggerStrokeTick(now + 0.78, 930, 290, 0.45);
    this.triggerStrokeTick(now + 0.92, 870, 260, 0.35);
    this.triggerStrokeTick(now + 1.06, 950, 300, 0.4);
    this.triggerStrokeTick(now + 1.20, 890, 270, 0.35);
    this.triggerStrokeTick(now + 1.32, 830, 240, 0.4);

    // Final flourish underline slash
    this.triggerStrokeTick(now + 1.48, 1050, 320, 0.5);

    // 2. Textured paper friction noise underneath
    const duration = 1.9;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      data[i] = (b0 + b1 + b2 + white * 0.25) * 0.7;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.setValueAtTime(1.6, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);

    gain.gain.linearRampToValueAtTime(0.4, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.22);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.38);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.52);
    gain.gain.linearRampToValueAtTime(0.48, now + 0.65);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.74);

    gain.gain.linearRampToValueAtTime(0.45, now + 0.84);
    gain.gain.linearRampToValueAtTime(0.18, now + 1.0);
    gain.gain.linearRampToValueAtTime(0.5, now + 1.15);
    gain.gain.linearRampToValueAtTime(0.15, now + 1.3);
    gain.gain.linearRampToValueAtTime(0.04, now + 1.4);

    gain.gain.linearRampToValueAtTime(0.6, now + 1.52);
    gain.gain.linearRampToValueAtTime(0, now + 1.85);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    try {
      noise.start(now);
      noise.stop(now + 1.88);
    } catch {
      // safe fallback
    }
  }

  // Alias for backward compatibility
  playScribble() {
    this.playSignatureSound();
  }

  // Air swoosh for transitions
  playWhoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    if (!this.whooshBuffer) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.4);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.whooshBuffer = buffer;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = this.whooshBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    try {
      noise.start(ctx.currentTime);
    } catch {
      // safe fallback
    }
  }

  // Mechanical tick for interactions
  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.04);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.008);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    try {
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // safe fallback
    }
  }
}

export const soundEngine = new SoundEngine();
