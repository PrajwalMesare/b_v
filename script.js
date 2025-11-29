// Initialize variables
const userName = "Vaiduu";  // Fixed name
let currentStep = 1;
const totalSteps = 5;  // Reduced from 6 to 5

// Initialize particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#f06292"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#f8bbd0",
            "opacity": 0.4,
            "width": 1.5
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 160,
                "line_linked": {
                    "opacity": 1
                }
            },
            "push": {
                "particles_nb": 6
            }
        }
    },
    "retina_detect": true
});

// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
    createPetals();
    
    // Set name everywhere
    document.getElementById('displayName').textContent = userName;
    document.getElementById('heartName').textContent = userName;
    document.getElementById('finalName').textContent = userName;
    
    // Animate the heart message
    const heartMessage = document.getElementById('heartMessage');
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        setTimeout(() => {
            heartMessage.classList.add('show');
        }, 500);
    });
});

// Function to show current step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    currentStepEl.classList.add('active');
    
    // Update progress bar
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", {
        width: `${progressPercentage}%`,
        duration: 1,
        ease: "power2.out"
    });
    
    // Special animations for each step
    switch(step) {
        case 1:
            break;
        case 2:
            // Animate heart
            gsap.from("#interactiveHeart", {
                scale: 0.5,
                rotation: 180,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
            break;
        case 3:
            // Type out message
            typeMessage();
            // Animate photo frame
            gsap.from(".photo-frame", {
                y: 50,
                rotation: -10,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 4:
            // Animate polaroids
            gsap.from(".polaroid", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 5:
            // Create fireworks
            createFireworks();
            break;
    }
}

// Function to go to next step
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

// [Rest of your functions remain exactly the same: createHearts, createPetals, typeMessage, createFireworks, shareOnSocial]
// Remove saveName() function completely - no longer needed
