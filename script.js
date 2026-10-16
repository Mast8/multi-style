
        // State variables
        let currentTheme = 'frutiger-aero';
        let audioEnabled = false;
        let audioCtx = null;
        let counterValue = 42;

        // Theme metadata definitions for dynamic updates
        const themeDetails = {
            'frutiger-aero': {
                title: 'AESTHETIC ENGINE',
                subtitle: 'Skeuomorphic & Glossy Web Era',
                heroBadge: '✦ Glossy Glass & Water Spheres ✦',
                heroTitle: 'Frutiger Aero Aesthetics',
                heroDesc: 'Reflective glass, translucent light flares, optimistic sky-blue gradients, and bubbly skeumorphic user interfaces.',
            },
            'bungee-y2k': {
                title: 'Y2K POP-PUNK!',
                subtitle: 'Late 90s Cyber Optimism',
                heroBadge: '★ MAXIMUM NEON ENERGY ★',
                heroTitle: 'BUNGEE Y2K EXPLOSION',
                heroDesc: 'Thick chunky borders, vibrant neon palettes, playful sticker badges, and high-octane comic typography!',
            },
            'rococo': {
                title: 'Le Style Rococo',
                subtitle: 'Royal Ornamentation & Elegance',
                heroBadge: '❦ Imperial Gold & Silk Grandeur ❦',
                heroTitle: 'Ornate Baroque Elegance',
                heroDesc: 'Deep burgundy velvet backgrounds, intricate gold flourishes, wax seals, and timeless serif craftsmanship.',
            },
            'neobrutalism': {
                title: 'NEO-BRUTALISM',
                subtitle: 'Raw High-Contrast Geometry',
                heroBadge: '■ 100% UNFILTERED CONTRAST ■',
                heroTitle: 'HEAVY BORDERS & SHADOWS',
                heroDesc: 'Harsh 4px black borders, solid primary colors, flat asymmetrical depth, and zero subtle gradients.',
            },
            'cyberpunk': {
                title: 'CYBER//SYSTEM',
                subtitle: 'High Tech Low Life HUD',
                heroBadge: '⚡ SCANLINE MATRIX ACTIVE ⚡',
                heroTitle: 'NEON MATRIX FUTURISM',
                heroDesc: 'Glowing neon cyan and magenta terminals, scanline overlays, glitch-hover animations, and dark mode grid aesthetics.',
            },
            'newspaper': {
                title: 'The Daily Chronicle',
                subtitle: 'Established MCMXCIV - Vintage Print',
                heroBadge: '🗞 SPECIAL EVENING EDITION 🗞',
                heroTitle: 'Classic Vintage Gazette',
                heroDesc: 'Tactile newsprint grain, blackletter headlines, traditional serif columns, and timeless print aesthetics.',
            }
        };

        // Initialize Audio Context on user action
        function initAudio() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        // Toggle Audio SFX
        function toggleAudio() {
            initAudio();
            audioEnabled = !audioEnabled;
            const btnText = document.getElementById('sound-text');
            const btnIcon = document.getElementById('sound-icon');

            if (audioEnabled) {
                btnText.innerText = 'SFX ON';
                btnIcon.className = 'fa-solid fa-volume-high text-emerald-400';
                showToast('Audio SFX Synthesizer Activated');
                playStyleSound('switch');
            } else {
                btnText.innerText = 'SFX OFF';
                btnIcon.className = 'fa-solid fa-volume-xmark';
                showToast('Audio SFX Muted');
            }
        }

        // Web Audio Synthesizer tailored per theme
        function playStyleSound(type = 'click') {
            if (!audioEnabled || !audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (currentTheme === 'cyberpunk') {
                // Sci-fi metallic synth beep
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(type === 'switch' ? 880 : 440, now);
                osc.frequency.exponentialRampToValueAtTime(type === 'switch' ? 1760 : 220, now + 0.15);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (currentTheme === 'frutiger-aero') {
                // Soft glass drop chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(type === 'switch' ? 1200 : 800, now);
                osc.frequency.exponentialRampToValueAtTime(1600, now + 0.2);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (currentTheme === 'bungee-y2k' || currentTheme === 'neobrutalism') {
                // Punchy square wave retro pop
                osc.type = 'square';
                osc.frequency.setValueAtTime(type === 'switch' ? 300 : 200, now);
                osc.frequency.exponentialRampToValueAtTime(type === 'switch' ? 600 : 100, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (currentTheme === 'rococo') {
                // Elegant harpsichord/bell note
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(type === 'switch' ? 523.25 : 659.25, now); // C5 or E5
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
            } else {
                // Vintage newspaper typewriter click
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            }
        }

        // Switch active theme
        function setTheme(themeName) {
            currentTheme = themeName;
            document.documentElement.setAttribute('data-theme', themeName);

            // Update text content based on selected style
            const meta = themeDetails[themeName];
            if (meta) {
                document.getElementById('app-title').innerText = meta.title;
                document.getElementById('app-subtitle').innerText = meta.subtitle;
                document.getElementById('hero-badge').innerText = meta.heroBadge;
                document.getElementById('hero-title').innerText = meta.heroTitle;
                document.getElementById('hero-desc').innerText = meta.heroDesc;
            }

            // Play audio feedback
            playStyleSound('switch');

            // Update Inspector tokens monitor
            setTimeout(updateCSSInspector, 100);

            // Toast feedback
            showToast(`Theme switched to ${themeName.toUpperCase()}`);
        }

        // Update live CSS token viewer
        function updateCSSInspector() {
            const computed = getComputedStyle(document.documentElement);
            document.getElementById('token-font').innerText = computed.getPropertyValue('--font-heading').trim() || 'Space Grotesk';
            document.getElementById('token-radius').innerText = computed.getPropertyValue('--border-radius').trim() || '12px';
            document.getElementById('token-shadow').innerText = computed.getPropertyValue('--box-shadow').trim() || 'None';
            document.getElementById('token-blur').innerText = computed.getPropertyValue('--backdrop-blur').trim() || 'None';
        }

        // Copy active CSS variables to clipboard
        function copyCSSVariables() {
            const computed = getComputedStyle(document.documentElement);
            const cssText = `/* Active Aesthetic Theme Tokens: ${currentTheme} */
--bg-primary: ${computed.getPropertyValue('--bg-primary')};
--font-heading: ${computed.getPropertyValue('--font-heading')};
--border-radius: ${computed.getPropertyValue('--border-radius')};
--box-shadow: ${computed.getPropertyValue('--box-shadow')};
--border-style: ${computed.getPropertyValue('--border-style')};`;

            // Standard fallback copy method for iframe compatibility
            const textarea = document.createElement('textarea');
            textarea.value = cssText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            playStyleSound('click');
            showToast('CSS Tokens Copied to Clipboard!');
        }

        // Counter logic
        function adjustCounter(delta) {
            counterValue += delta;
            document.getElementById('counter-val').innerText = counterValue;
            playStyleSound('click');
        }

        // Modal Controls
        function openModal() {
            const backdrop = document.getElementById('modal-backdrop');
            const box = document.getElementById('modal-box');
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            box.classList.remove('scale-95');
            box.classList.add('scale-100');
            playStyleSound('click');
        }

        function closeModal() {
            const backdrop = document.getElementById('modal-backdrop');
            const box = document.getElementById('modal-box');
            backdrop.classList.add('opacity-0', 'pointer-events-none');
            box.classList.remove('scale-100');
            box.classList.add('scale-95');
            playStyleSound('click');
        }

        // Toast messaging function
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 2500);
        }

        // Trigger visual ripple / particles effect
        function triggerStyleRipple() {
            playStyleSound('switch');
            spawnParticles(30);
            showToast('Visual Energy Burst Synthesized!');
        }

        // Dynamic Canvas Particle Overlay for Aero Bubbles & Cyber Particles
        const canvas = document.getElementById('fx-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 12 + 4;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                if (this.y < -20) this.reset();
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                if (currentTheme === 'frutiger-aero') {
                    // Glossy Water Bubbles
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                } else if (currentTheme === 'cyberpunk') {
                    // Glowing Cyber Square Data Nodes
                    ctx.fillStyle = '#00f0ff';
                    ctx.fillRect(this.x, this.y, this.size / 2, this.size / 2);
                } else if (currentTheme === 'bungee-y2k') {
                    // Pop Art Stars / Circles
                    ctx.fillStyle = '#ff007f';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 25; i++) {
                particles.push(new Particle());
            }
        }

        function spawnParticles(count) {
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        }

        // Initialize on Window Load
        window.onload = function() {
            initParticles();
            animateCanvas();
            updateCSSInspector();
        };

        document.addEventListener('keydown', (e) => {
        // Ignore keypresses if user is typing in an input field
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        const themeMap = {
            '1': 'frutiger-aero',
            '2': 'bungee-y2k',
            '3': 'rococo',
            '4': 'neobrutalism',
            '5': 'cyberpunk',
            '6': 'newspaper'
        };

        if (themeMap[e.key]) {
            setTheme(themeMap[e.key]);
        }
    });