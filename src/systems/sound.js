// Système de sons simple avec Web Audio API
export class SoundSystem {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.masterVolume = 0.3;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Resume audio context (needed for some browsers)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Play a beep sound with given frequency
    playBeep(frequency = 440, duration = 0.1, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        this.resume();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Click sound
    playClick() {
        this.playBeep(800, 0.05, 'square');
    }

    // Purchase sound
    playPurchase() {
        this.playBeep(523, 0.1, 'sine'); // C note
        setTimeout(() => this.playBeep(659, 0.15, 'sine'), 50); // E note
    }

    // Achievement unlock sound
    playAchievement() {
        this.playBeep(523, 0.1, 'sine');
        setTimeout(() => this.playBeep(659, 0.1, 'sine'), 100);
        setTimeout(() => this.playBeep(784, 0.2, 'sine'), 200);
    }

    // Money earn sound
    playMoneyEarn() {
        this.playBeep(700, 0.05, 'triangle');
    }

    // Error sound
    playError() {
        this.playBeep(200, 0.2, 'sawtooth');
    }

    // Event trigger sound
    playEvent() {
        this.playBeep(440, 0.15, 'sine');
        setTimeout(() => this.playBeep(550, 0.15, 'sine'), 75);
    }

    // Unlock sound
    playUnlock() {
        this.playBeep(392, 0.08, 'sine');
        setTimeout(() => this.playBeep(523, 0.08, 'sine'), 80);
        setTimeout(() => this.playBeep(659, 0.12, 'sine'), 160);
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }
}
