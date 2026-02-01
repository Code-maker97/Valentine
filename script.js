/**
 * Scrapbook Interaction Logic
 */

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noText = document.getElementById('no-text');
const statusMsg = document.getElementById('status-msg');
const proposalContent = document.getElementById('proposal-content');
const successScreen = document.getElementById('success-screen');
const page = document.getElementById('scrapbook-page');
const bear = document.getElementById('easter-bear');
const cat = document.getElementById('cat-sticker');
const envelope = document.getElementById('envelope-sticker');
const modal = document.getElementById('note-modal');

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
let tapCount = 0;
let yesScale = 1;

/**
 * Initial Position Setup
 */
function initPosition() {
    const area = document.getElementById('button-area').getBoundingClientRect();
    const pageRect = page.getBoundingClientRect();
    
    // Position Yes relative to the page
    yesBtn.style.position = 'absolute';
    yesBtn.style.left = (area.left - pageRect.left + area.width/2 - 190) + 'px';
    yesBtn.style.top = (area.top - pageRect.top + area.height/2 - 75) + 'px';

    // Position No relative to the page
    noBtn.style.left = (area.left - pageRect.left + area.width/2 + 20) + 'px';
    noBtn.style.top = (area.top - pageRect.top + area.height/2 - 55) + 'px';
}

window.addEventListener('load', initPosition);
window.addEventListener('resize', initPosition);

/**
 * Yes Button - The Happy Path
 */
yesBtn.addEventListener('click', () => {
    proposalContent.style.display = 'none';
    successScreen.style.display = 'flex';
    createConfetti();
});

/**
 * No Button - Teleportation (Desktop)
 */
function teleportNo() {
    const pageRect = page.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 60;
    const maxX = pageRect.width - btnRect.width - padding;
    const maxY = pageRect.height - btnRect.height - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    const msgs = ["Nice try!", "Nope!", "Can't catch me!", "Try again!", "Calibration Error"];
    noText.innerText = msgs[Math.floor(Math.random() * msgs.length)];
}

if (!isTouchDevice) {
    noBtn.addEventListener('mouseover', teleportNo);
}

/**
 * No Button - Scaling (Mobile/Touch)
 */
noBtn.addEventListener('click', () => {
    if (isTouchDevice) {
        tapCount++;
        yesScale += 0.4;
        const noScale = Math.max(0.5, 1 - tapCount * 0.1);
        
        yesBtn.style.transform = `scale(${yesScale})`;
        noBtn.style.transform = `scale(${noScale})`;
        
        statusMsg.innerText = "The 'Yes' button is taking over!";
        if (tapCount > 5) noText.innerText = "Okay...";
    } else {
        teleportNo();
    }
});

/**
 * Easter Eggs & Sticker Events
 */
cat.addEventListener('click', () => {
    statusMsg.innerText = "🐱: Even the cat says YES!";
});

bear.addEventListener('click', () => {
    statusMsg.innerText = "🧸: *Hugs!* Now click the heart!";
    bear.style.transform = "scale(1.2) rotate(10deg)";
});

envelope.addEventListener('click', () => {
    modal.style.display = 'flex';
});

modal.addEventListener('click', () => {
    modal.style.display = 'none';
});

/**
 * Victory Celebration
 */
function createConfetti() {
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = i % 2 === 0 ? '❤️' : '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-20px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.transition = `all ${Math.random() * 2 + 2}s linear`;
        heart.style.zIndex = '100';
        page.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '110%';
            heart.style.transform = `rotate(${Math.random() * 720}deg)`;
        }, 50);
        
        setTimeout(() => heart.remove(), 4000);
    }
}