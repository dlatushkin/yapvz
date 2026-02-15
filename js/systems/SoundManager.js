window.PVZ = window.PVZ || {};

PVZ.SoundManager = {
    _ctx: null,
    _initialized: false,

    init() {
        if (this._initialized) return;
        try {
            this._ctx = new (window.AudioContext || window.webkitAudioContext)();
            this._initialized = true;
        } catch (e) {
            console.warn('Web Audio not available');
        }
    },

    _ensureContext() {
        if (!this._ctx) this.init();
        if (this._ctx && this._ctx.state === 'suspended') {
            this._ctx.resume();
        }
        return this._ctx;
    },

    _playTone(freq, duration, type, volume) {
        const ctx = this._ensureContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume || 0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    },

    _playNoise(duration, volume) {
        const ctx = this._ensureContext();
        if (!ctx) return;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume || 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(ctx.currentTime);
    },

    play(key) {
        try {
            switch (key) {
                case 'pea_shoot':
                    this._playTone(800, 0.05, 'sine', 0.1);
                    break;
                case 'pea_hit':
                    this._playTone(200, 0.08, 'sine', 0.1);
                    break;
                case 'sun_collect':
                    this._playTone(523, 0.1, 'sine', 0.12);
                    setTimeout(() => this._playTone(659, 0.1, 'sine', 0.12), 70);
                    setTimeout(() => this._playTone(784, 0.15, 'sine', 0.12), 140);
                    break;
                case 'plant_place':
                    this._playTone(300, 0.1, 'triangle', 0.12);
                    break;
                case 'zombie_bite':
                    this._playNoise(0.06, 0.08);
                    break;
                case 'zombie_die':
                    this._playTone(400, 0.3, 'sine', 0.1);
                    const ctx1 = this._ensureContext();
                    if (ctx1) {
                        const osc = ctx1.createOscillator();
                        const gain = ctx1.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(400, ctx1.currentTime);
                        osc.frequency.linearRampToValueAtTime(100, ctx1.currentTime + 0.3);
                        gain.gain.setValueAtTime(0.1, ctx1.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx1.currentTime + 0.3);
                        osc.connect(gain);
                        gain.connect(ctx1.destination);
                        osc.start(ctx1.currentTime);
                        osc.stop(ctx1.currentTime + 0.3);
                    }
                    break;
                case 'cherry_explode':
                    this._playNoise(0.2, 0.15);
                    this._playTone(150, 0.2, 'sine', 0.12);
                    break;
                case 'win_jingle':
                    [523, 659, 784, 1047].forEach((f, i) => {
                        setTimeout(() => this._playTone(f, 0.2, 'sine', 0.15), i * 200);
                    });
                    break;
                case 'lose_sound':
                    [659, 523, 440, 349].forEach((f, i) => {
                        setTimeout(() => this._playTone(f, 0.25, 'sine', 0.15), i * 200);
                    });
                    break;
                case 'button_click':
                    this._playTone(1000, 0.03, 'sine', 0.08);
                    break;
                case 'wave_warning':
                    this._playTone(200, 0.5, 'sawtooth', 0.08);
                    setTimeout(() => this._playTone(250, 0.5, 'sawtooth', 0.08), 300);
                    break;
            }
        } catch (e) {
            // Silently fail if audio doesn't work
        }
    }
};
