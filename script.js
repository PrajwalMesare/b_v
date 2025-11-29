const userName = "Vaiduu";
let currentStep = 1;
const totalSteps = 5;

// Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#ff4081" },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 6, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
        line_linked: { enable: true, distance: 150, color: "#f8bbd0", opacity: 0.4, width: 1.5 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 1 } }, push: { particles_nb: 6 } }
    },
    retina_detect: true
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('displayName').textContent = userName;
        document.getElementById('heartName').textContent = userName;
        document.getElementById('finalName').textContent = userName;

        // FIXED Heart Click
        document.getElementById('interactiveHeart').onclick = function(e) {
            e.stopPropagation();
            createHearts();
            document.getElementById('heartMessage').classList.add('show');
            return false;
        };

        showStep(currentStep);
        createPetals();
    }, 500);
});

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", {width: `${progressPercentage}%`, duration: 1, ease: "power2.out"});
    
    switch(step) {
        case 2: gsap.from("#interactiveHeart", {scale: 0.5, rotation: 180, duration: 1.2, ease: "elastic.out(1,0.5)"}); break;
        case 3: typeMessage(); gsap.from(".photo-frame", {y: 50, rotation: -10, opacity: 0, duration: 1.2, ease: "back.out(1.7)"}); break;
        case 4: gsap.from(".polaroid", {y: 100, opacity: 0, stagger: 0.2, duration: 1.2, ease: "back.out(1.7)"}); break;
        case 5: createFireworks(); break;
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#ff4081', '#f06292', '#d81b60', '#ff1744', '#ff80ab'];
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '💖';
        heart.style.cssText = `
            left: ${Math.random() * 90}% !important;
            top: 70% !important;
            color: ${colors[Math.floor(Math.random() * colors.length)]} !important;
            font-size: ${25 + Math.random() * 30}px !important;
            z-index: 25 !important;
            pointer-events: none !important;
            animation-duration: ${3.5 + Math.random() * 2.5}s !important;
            filter: drop-shadow(0 0 15px currentColor) !important;
        `;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
    
    const heartEl = document.getElementById('interactiveHeart');
    gsap.to(heartEl, {scale: 1.3, duration: 0.3, yoyo: true, repeat: 1});
}

function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.cssText = `
            position: absolute; width: ${12 + Math.random() * 15}px;
            height: ${12 + Math.random() * 15}px; left: ${Math.random() * 100}%;
            background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
            border-radius: 50% 0 50% 0; opacity: 0.8; top: -20px;
        `;
        container.appendChild(petal);
        gsap.to(petal, {
            y: window.innerHeight + 50, x: `+=${40 + Math.random() * 80}`,
            rotation: 720, duration: 12 + Math.random() * 8, ease: "none",
            repeat: -1, delay: Math.random() * 5
        });
    }
}

function typeMessage() {
    const messages = [
        `Dear ${userName},`, "On your special day, I want you to know...",
        "You are the most amazing person I've ever met 💕",
        "Your smile brightens my darkest days ✨", "Your laugh is my favorite sound 💖",
        "Your love gives me strength and happiness 🌟", "I'm so grateful to have you in my life 🥰",
        "May this year bring you all the joy you deserve 🎉",
        "You deserve the world and more 🌍", "Happy Birthday, my love! 💝"
    ];
    const typingText = document.getElementById('typingText');
    let msgIndex = 0, charIndex = 0, isDeleting = false, speed = 100;
    
    function type() {
        const currentMsg = messages[msgIndex];
        if (isDeleting) {
            typingText.innerHTML = currentMsg.substring(0, charIndex - 1);
            charIndex--; speed = 30;
        } else {
            typingText.innerHTML = currentMsg.substring(0, charIndex + 1);
            charIndex++; speed = 80;
        }
        if (!isDeleting && charIndex === currentMsg.length) {
            isDeleting = true; speed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; msgIndex = (msgIndex + 1) % messages.length; speed = 500;
        }
        setTimeout(type, speed);
    }
    setTimeout(() => { document.getElementById('typedMessage').classList.add('show'); type(); }, 500);
}

function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFirework(), i * 600);
    }
}

function createFirework() {
    const colors = ['#ff4081', '#f06292', '#d81b60', '#ff80ab'];
    const firework = document.createElement('div');
    firework.style.cssText = `
        position: fixed; width: 6px; height: 6px; background: ${colors[Math.floor(Math.random()*colors.length)]};
        left: ${Math.random()*98}vw; top: ${Math.random()*70}vh; border-radius: 50%;
        box-shadow: 0 0 20px currentColor; z-index: 50; pointer-events: none;
        animation: explode 1.5s ease-out forwards;
    `;
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
}

function shareOnSocial(platform) {
    const text = `Check out this beautiful birthday wish for ${userName}! 🎉💖 ${window.location.href}`;
    const urls = {
        facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
}
