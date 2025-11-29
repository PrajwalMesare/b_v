// Initialize variables - FIXED
const userName = "Vaiduu";  // Fixed name
let currentStep = 1;
const totalSteps = 5;  // Reduced from 6 (removed name input step)

// Initialize particles.js (unchanged)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#f06292" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
        "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 6, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#f8bbd0", "opacity": 0.4, "width": 1.5 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 160, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 6 } }
    },
    "retina_detect": true
});

// Initialize GSAP animations - FIXED
document.addEventListener('DOMContentLoaded', function() {
    // Set Vaiduu name everywhere immediately
    document.getElementById('displayName').textContent = userName;
    document.getElementById('heartName').textContent = userName;
    document.getElementById('finalName').textContent = userName;
    
    showStep(currentStep);
    createPetals();
    
    // FIXED: Heart click calls createHearts() + shows message
    const heartMessage = document.getElementById('heartMessage');
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        createHearts();  // ADDED: Create floating hearts
        setTimeout(() => {
            heartMessage.classList.add('show');
        }, 500);
    });
});

// Function to show current step - FIXED step numbers
function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const currentStepEl = document.getElementById(`step${step}`);
    currentStepEl.classList.add('active');
    
    // FIXED: Progress bar for 5 steps
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", { width: `${progressPercentage}%`, duration: 1, ease: "power2.out" });
    
    // FIXED: Updated step animations (removed envelope/name-input references)
    switch(step) {
        case 1:
            break;
        case 2:  // Now heart step
            gsap.from("#interactiveHeart", { scale: 0.5, rotation: 180, duration: 1, ease: "elastic.out(1, 0.5)" });
            break;
        case 3:  // Message step
            typeMessage();
            gsap.from(".photo-frame", { y: 50, rotation: -10, opacity: 0, duration: 1, ease: "back.out(1.7)" });
            break;
        case 4:  // Memories step
            gsap.from(".polaroid", { y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" });
            break;
        case 5:  // Final step
            createFireworks();
            break;
    }
}

// Function to go to next step - FIXED (removed envelope code)
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

// REMOVED: saveName() function completely - no longer needed

// Function to create floating hearts - UNCHANGED but now properly called
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = `${3 + Math.random() * 3}s`;
        heart.style.fontSize = `${20 + Math.random() * 25}px`;
        heart.style.top = `${60 + Math.random() * 30}%`;
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
    
    gsap.to("#interactiveHeart", { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 });
}

// [Keep all other functions unchanged: createPetals, typeMessage, createFireworks, shareOnSocial]
// Note: Remove setCountdown() calls and references as HTML elements don't exist
