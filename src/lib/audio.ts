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

  // Crisp, tactile fountain pen signature sound for "patelprince" signature drawing
  playSignatureSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const duration = 2.0;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Textured pink/white paper friction noise
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

    // Resonant bandpass filter tuned to audible pen nib friction
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.Q.setValueAtTime(1.6, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    const now = ctx.currentTime;

    // Rhythm envelope simulating "Patel" + "Prince" + sharp underline flourish
    // 1. "Patel" loops (0.05s - 0.7s)
    gain.gain.linearRampToValueAtTime(0.5, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.22);
    gain.gain.linearRampToValueAtTime(0.55, now + 0.38);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.52);
    gain.gain.linearRampToValueAtTime(0.58, now + 0.65);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.75); // Pen lift between names

    // 2. "Prince" loops (0.8s - 1.4s)
    filter.frequency.setValueAtTime(2700, now + 0.8);
    gain.gain.linearRampToValueAtTime(0.55, now + 0.88);
    gain.gain.linearRampToValueAtTime(0.2, now + 1.02);
    gain.gain.linearRampToValueAtTime(0.6, now + 1.18);
    gain.gain.linearRampToValueAtTime(0.18, now + 1.32);
    gain.gain.linearRampToValueAtTime(0.04, now + 1.42); // Pen lift before slash

    // 3. Sharp underline slash (1.45s - 1.85s)
    filter.frequency.exponentialRampToValueAtTime(1800, now + 1.75);
    gain.gain.linearRampToValueAtTime(0.7, now + 1.55);
    gain.gain.linearRampToValueAtTime(0, now + 1.85);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Subtle paper pressure sub-tone to give tactile pen-to-paper depth
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 1.8);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    oscGain.gain.linearRampToValueAtTime(0.02, now + 0.7);
    oscGain.gain.linearRampToValueAtTime(0.08, now + 0.9);
    oscGain.gain.linearRampToValueAtTime(0.02, now + 1.4);
    oscGain.gain.linearRampToValueAtTime(0.1, now + 1.55);
    oscGain.gain.linearRampToValueAtTime(0, now + 1.85);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    try {
      noise.start(now);
      noise.stop(now + 1.9);
      osc.start(now);
      osc.stop(now + 1.9);
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
