// Système d'effets visuels pour le jeu
export class VFXSystem {
    constructor() {
        this.particles = [];
        this.floatingNumbers = [];
        this.canvas = null;
        this.ctx = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Create canvas for VFX
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'vfxCanvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.initialized = true;
        this.animate();
    }

    // Floating numbers when earning money
    showFloatingNumber(value, x, y, color = '#ffd700') {
        this.floatingNumbers.push({
            value: value,
            x: x,
            y: y,
            alpha: 1,
            velocity: -2,
            color: color,
            scale: 1,
            lifetime: 0
        });
    }

    // Particle burst effect
    createParticleBurst(x, y, count = 20, colors = ['#ffd700', '#ffaa00', '#ff8800']) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2 + Math.random() * 3;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                radius: 2 + Math.random() * 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: 0.02 + Math.random() * 0.02,
                gravity: 0.1
            });
        }
    }

    // Confetti effect for achievements
    createConfetti(x, y, count = 50) {
        const colors = ['#ffd700', '#ff4444', '#4488ff', '#00ff88', '#ff88ff'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 3 + Math.random() * 5;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 5,
                width: 3 + Math.random() * 5,
                height: 6 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: 0.015,
                gravity: 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }

    // Ripple effect
    createRipple(x, y, color = 'rgba(255, 215, 0, 0.3)') {
        this.particles.push({
            type: 'ripple',
            x: x,
            y: y,
            radius: 0,
            maxRadius: 100,
            color: color,
            alpha: 0.5,
            decay: 0.02
        });
    }

    update() {
        // Update floating numbers
        this.floatingNumbers = this.floatingNumbers.filter(num => {
            num.y += num.velocity;
            num.alpha -= 0.02;
            num.lifetime += 1;

            if (num.lifetime < 10) {
                num.scale = 1 + (num.lifetime / 10) * 0.3;
            } else {
                num.scale = 1.3 - ((num.lifetime - 10) / 40) * 0.3;
            }

            return num.alpha > 0;
        });

        // Update particles
        this.particles = this.particles.filter(p => {
            if (p.type === 'ripple') {
                p.radius += 3;
                p.alpha -= p.decay;
                return p.alpha > 0 && p.radius < p.maxRadius;
            } else {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.alpha -= p.decay;

                if (p.rotation !== undefined) {
                    p.rotation += p.rotationSpeed;
                }

                return p.alpha > 0;
            }
        });
    }

    render() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render particles
        this.particles.forEach(p => {
            this.ctx.save();

            if (p.type === 'ripple') {
                this.ctx.strokeStyle = p.color;
                this.ctx.globalAlpha = p.alpha;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.stroke();
            } else if (p.width && p.height) {
                // Confetti
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
            } else {
                // Circle particles
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        });

        // Render floating numbers
        this.floatingNumbers.forEach(num => {
            this.ctx.save();
            this.ctx.globalAlpha = num.alpha;
            this.ctx.font = `bold ${20 * num.scale}px "Segoe UI"`;
            this.ctx.fillStyle = num.color;
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 3;
            this.ctx.textAlign = 'center';

            const text = `+${num.value}`;
            this.ctx.strokeText(text, num.x, num.y);
            this.ctx.fillText(text, num.x, num.y);

            this.ctx.restore();
        });
    }

    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }

    // Screen shake effect
    shakeScreen(intensity = 10, duration = 300) {
        const gameContainer = document.querySelector('.game-container');
        if (!gameContainer) return;

        let startTime = Date.now();

        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration) {
                gameContainer.style.transform = '';
                return;
            }

            const progress = elapsed / duration;
            const currentIntensity = intensity * (1 - progress);

            const x = (Math.random() - 0.5) * currentIntensity;
            const y = (Math.random() - 0.5) * currentIntensity;

            gameContainer.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(shake);
        };

        shake();
    }
}
