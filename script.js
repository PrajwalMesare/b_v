// =======================
// GLOBAL VARIABLES
// =======================
let currentStep = 1;
const totalSteps = 6;
const name = "Vaiduu"; // fixed name

// =======================
// STEP CONTROL
// =======================
function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
        const s = document.getElementById(`step${i}`);
        s.classList.remove("active");
    }
    document.getElementById(`step${step}`).classList.add("active");
    updateProgress(step);
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        if (currentStep === 3) createHearts(); // auto spawn hearts for step 3
        if (currentStep === 4) startTyping();  // start typing message for step 4
    }
}

function updateProgress(step) {
    const progress = document.getElementById("progressBar");
    const percent = (step / totalSteps) * 100;
    progress.style.width = percent + "%";
}

// =======================
// NAME DISPLAY
// =======================
document.getElementById("displayName").innerText = name;
document.getElementById("heartName").innerText = name;
document.getElementById("finalName").innerText = name;

// =======================
// FLOATING HEARTS
// =======================
function createHearts() {
    const container = document.getElementById("floatingHearts");
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 3 + Math.random() * 3 + "s";
        heart.style.fontSize = 20 + Math.random() * 20 + "px";
        container.appendChild(heart);

        setTimeout(() => container.removeChild(heart), 6000);
    }
}

// =======================
// PETALS
// ======
