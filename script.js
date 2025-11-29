// ------------------------------
// Fixed Name for the Surprise
// ------------------------------
let userName = "Vaiduu";

// ------------------------------
// Step Control Variables
// ------------------------------
let currentStep = 1;      // Tracks the current step
const totalSteps = 6;     // Total number of steps in the experience

// ------------------------------
// Initialize particles.js background
// ------------------------------
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#f06292" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1 } },
        "size": { "value": 6, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1 } },
        "line_linked": { "enable": true, "distance": 150, "color": "#f8bbd0", "opacity": 0.4, "width": 1.5 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": { 
        "detect_on": "canvas", 
        "events": { 
            "onhover": { "enable": true, "mode": "grab" }, 
            "onclick": { "enable": true, "mode": "push" }, 
            "resize": true 
        },
        "modes": { 
            "grab": { "distance": 160, "line_linked": { "opacity": 1 } }, 
            "push": { "particles_nb": 6 } 
        } 
    },
    "retina_detect": true
});

// ------------------------------
// Initialize animations and events
// ------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Set fixed name in Heart step
    document.getElementById('heartName').textContent = userName;

    // Show the first step
    showStep(currentStep);

    // Create falling petals
    createPetals();

    // Start countdown (if used)
    setCountdown();

    // Heart click triggers floating hearts + typing message
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        createHearts(); // floating hearts
        setTimeout(() => {
            document.getElementById('typedMessage').classList.add('show');
            typeMessage(); // start typing effect
            nextStep();    // move to next step
        }, 500);
    });
});

// ------------------------------
// Show a specific step
// ------------------------------
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    currentStepEl.classList.add('active');

    // Update progress bar
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", { width: `${progressPercentage}%`, duration: 1, ease: "power2.out" });

    // Step-specific animations
    switch(step) {
        case 1:
            gsap.from("#envelope", { y: 100, opacity: 0, duration: 1, ease: "back.out(1.7)" });
            break;
        case 2:
            gsap.from("#interactiveHeart", { scale: 0.5, rotation: 180, duration: 1, ease: "elastic.out(1, 0.5)" });
            break;
        case 4:
            gsap.from(".photo-frame", { y: 50, rotation: -10, opacity: 0, duration: 1, ease: "back.out(1.7)" });
            break;
        case 5:
            gsap.from(".polaroid", { y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" });
            break;
        case 6:
            createFireworks();
            break;
    }
}

// ------------------------------
// Move to next step
// ------------------------------
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

// ------------------------------
// Create floating hearts animation
// ------------------------------
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

        // Remove heart after animation
        setTimeout(() => heart.remove(), 4000);
    }
}

// ------------------------------
// Create falling petals animation
// ------------------------------
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];

    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const shapes = [
            "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0",
            "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0",
            "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0"
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        petal.innerHTML = `<svg viewBox="0 0 100 50" width="100%" height="100%"><path d="${shape}" fill="${petalColors[Math.floor(Math.random() * petalColors.length)]}" /></svg>`;
        petal.style.width = `${10 + Math.random() * 20}px`;
        petal.style.height = `${10 + Math.random() * 20}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `-20px`;
        container.appendChild(petal);

        gsap.to(petal, { y: window.innerHeight + 50, x: `+=${50 + Math.random() * 100}`, rotation: 360, duration: 10 + Math.random()*20, delay: Math.random()*15, ease: "none", onComplete: () => petal.remove() });
    }
}

// ------------------------------
// Typing message effect
// ------------------------------
function typeMessage() {
    const messages = [
        `Dear ${userName},`,
        "On your special day, I want you to know...",
        "You are the most amazing person I've ever met.",
        "Your smile brightens my darkest days.",
        "Your laugh is my favorite sound in the world.",
        "Your love gives me strength and happiness.",
        "I'm so grateful to have you in my life.",
        "May this year bring you all the joy you deserve.",
        "You deserve the world and more.",
        "Happy Birthday, my love! ❤"
    ];

    const typingText = document.getElementById('typingText');
    let messageIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

    function type() {
        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
            charIndex--; typingSpeed = 50;
        } else {
            typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
            charIndex++; typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) { 
            isDeleting = true; typingSpeed = 1500; 
        } else if (isDeleting && charIndex === 0) { 
            isDeleting = false; messageIndex = (messageIndex + 1) % messages.length; typingSpeed = 500; 
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ------------------------------
// Fireworks effect
// ------------------------------
function createFireworks() {
    for (let i=0;i<8;i++){setTimeout(createFirework,i*800);}
    setInterval(()=>{if(Math.random()>0.7) createFirework();},2000);
}

function createFirework() {
    const colors = ['#ff4081','#f06292','#f8bbd0','#d81b60','#ff80ab','#ffcdd2'];
    const firework=document.createElement('div'); 
    firework.classList.add('firework');
    firework.style.color=colors[Math.floor(Math.random()*colors.length)];
    firework.style.setProperty('--x',`${Math.random()*window.innerWidth}px`);
    firework.style.setProperty('--y',`${Math.random()*window.innerHeight*0.8}px`);
    firework.style.setProperty('--x-end',`${(Math.random()-0.5)*20}px`);
    firework.style.setProperty('--y-end',`${(Math.random()-0.5)*20}px`);
    document.body.appendChild(firework);

    setTimeout(()=>{
        for(let i=0;i<30;i++){
            const p=document.createElement('div'); 
            p.classList.add('firework-particle'); 
            p.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)]; 
            p.style.left=firework.style.getPropertyValue('--x'); 
            p.style.top=firework.style.getPropertyValue('--y'); 
            p.style.setProperty('--tx',`${Math.cos(i*0.2)*100}px`);
            p.style.setProperty('--ty',`${Math.sin(i*0.2)*100}px`);
            document.body.appendChild(p); 
            setTimeout(()=>p.remove(),1000);
        } 
        firework.remove();
    },1000);
}

// ------------------------------
// Countdown timer (optional)
// ------------------------------
function setCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1); // Example: next day
    function updateCountdown() {
        const now = new Date(); 
        const diff = targetDate - now;
        if(diff <= 0){return;}

        const days = Math.floor(diff/(1000*60*60*24));
        const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
        const seconds = Math.floor((diff%(1000*60))/1000);
    }
    updateCountdown(); 
    setInterval(updateCountdown,1000);
}
