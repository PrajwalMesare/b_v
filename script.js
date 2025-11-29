// Floating hearts function
function startFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (20 + Math.random() * 15) + 'px';
        heart.style.animationDuration = (2 + Math.random() * 3) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

// Typing effect for message
const messages = document.querySelectorAll('.typing-effect');
messages.forEach(msg => {
    const text = msg.textContent;
    msg.textContent = '';
    let index = 0;
    function type() {
        if (index < text.length) {
            msg.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    type();
});

// Optional: Add a simple click effect on heart
const heart = document.querySelector('.heart');
if (heart) {
    heart.addEventListener('click', startFloatingHearts);
}

// Optional: Initialize particles.js if you are using it
if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('Particles.js loaded.');
    });
}
