// Fixed user name
const userName = "Vaiduu";
let currentStep = 1;
const totalSteps = 5;  // after removing name input step

// Initialize particles.js ...
// (Particles.js code unchanged)

// On DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
    createPetals();

    // Set fixed name in all relevant elements
    document.getElementById('displayName').textContent = userName;
    document.getElementById('heartName').textContent = userName;
    document.getElementById('finalName').textContent = userName;

    // Animate the heart message on heart click
    const heartMessage = document.getElementById('heartMessage');
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        createHearts();  // Create floating hearts on click
        setTimeout(() => {
            heartMessage.classList.add('show');
        }, 500);
    });
});

// Show steps with animations
function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const currentStepEl = document.getElementById(`step${step}`);
    currentStepEl.classList.add('active');

    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", {
        width: `${progressPercentage}%`,
        duration: 1,
        ease: "power2.out"
    });

    switch(step) {
        case 1:
            // Initial step animations if any
            break;
        case 2:
            // Animate heart with GSAP
            gsap.from("#interactiveHeart", {
                scale: 0.5,
                rotation: 180,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
            break;
        case 3:
            typeMessage();
            gsap.from(".photo-frame", {
                y: 50,
                rotation: -10,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 4:
            gsap.from(".polaroid", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 5:
            createFireworks();
            break;
    }
}

// Functions createHearts(), createPetals(), typeMessage(), createFireworks(), and shareOnSocial() remain unchanged.

// Removed saveName() as name is fixed.

// Function to create floating hearts on heart click (restored)
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

    gsap.to("#interactiveHeart", {
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}
