// Aya's Love Generator - Final Fixed Version

// Configuration
const YOUR_BIRTHDAY = {
    month: 6, // August (0-11) - Set your birth month
    day: 2   // Set your birth day
};

const SPECIAL_VIDEO_URL = "https://www.youtube.com/watch?v=HkAi3wf3A6g"; // REPLACE with your video

// DOM Elements
const messageElement = document.getElementById('message');
const buttonElement = document.getElementById('theButton');
const countElement = document.getElementById('count');
const giftElement = document.getElementById('birthday-gift');

// Hearts animation
function createHearts(count) {
    // Mobile-friendly SVG heart confetti
    const heartSVG = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ff1493" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
  
    // Adjust for mobile performance
    const isMobile = window.innerWidth < 768;
    const adjustedCount = isMobile ? Math.min(count, 10) : Math.min(count, 30);
  
    confetti({
      particleCount: adjustedCount,
      spread: 70,
      origin: { y: 0.6 }, // Launch from bottom
      shapes: ['svg'],
      shapeOptions: {
        svg: {
          svg: heartSVG,
          size: isMobile ? 10 : 15, // Smaller on mobile
        }
      },
      colors: ['#ff1493', '#ff69b4', '#ff8e8e'], // Your color scheme
      disableForReducedMotion: true // Respect accessibility
    });
}

// Messages data
const compliments = [
    "Aya, your eyes sparkle brighter than the stars in my sky",
    "Aya, your eyes sparkle brighter than the stars in my sky",
    "Every time I see you, my heart does somersaults",
    "You're the only dream I never want to wake up from",
    "Aya, your eyes sparkle brighter than the stars in my sky",
    "Every time I see you, my heart does somersaults",
    "You're the only dream I never want to wake up from",
    "Your voice is my favorite sound in the universe",
    "I'd cross oceans just to see your smile",
    "You have this magical way of making my soul feel at home",
    "Your beauty leaves me breathless every single time",
    "I fall for you more with every heartbeat",
    "You're my favorite 'what if' that came true",
    "The way you laugh makes my whole world stop",
    "You're the kind of beautiful that poets write about",
    "I could spend eternity getting lost in your eyes",
    "layn3el mok ",
    "You're my favorite kind of addiction",
    "Being with you feels like coming home",
    "You've ruined me for anyone else, and I love it",
    "Your lips were made for kissing mine",
    "I crave you like oxygen, Aya",
    "You're the human embodiment of everything good",
    "I want to memorize every curve of your body",
    "Your scent lingers in my mind like the sweetest perfume",
    "You make me believe in love at first sight every time I see you",
    "I'd give up all my tomorrows for one today with you",
    "Your beauty should be illegal - it's too distracting wlh",
    "I want to explore every inch of you like uncharted territory",
    "begraaaaaaaaaaa!"
];

const specialMessages = {
    3: "layn3el mok <3",
    5: "hbilaaaa",
};

let clickCount = 0;
const backgroundColors = [
    'rgba(255, 182, 193, 0.2)',
    'rgba(255, 192, 203, 0.2)',
    'rgba(255, 105, 180, 0.2)',
    'rgba(255, 20, 147, 0.2)',
    'rgba(219, 112, 147, 0.2)'
];

// Main button function
function newCompliment() {
    // Stop heartbeat animation
    buttonElement.classList.remove('heart-beat');
    
    // Update counter and UI
    clickCount++;
    countElement.textContent = clickCount;
    document.querySelector('.color').style.backgroundColor = 
        backgroundColors[clickCount % backgroundColors.length];
    
    // Show random compliment
    messageElement.innerHTML = `<p>${compliments[Math.floor(Math.random() * compliments.length)]}</p>`;
    
    // Check for special messages
    if (specialMessages[clickCount]) {
        setTimeout(() => {
            messageElement.innerHTML = `<p>${specialMessages[clickCount]}</p>`;
        }, 2000);
    }
    
    // Create hearts and button animation
    createHearts(Math.min(clickCount, 15));
    buttonElement.style.transform = 'scale(1.1)';
    setTimeout(() => buttonElement.style.transform = 'scale(1)', 200);

    // Show birthday prompt after 10 clicks
    if (clickCount === 5) {
        setTimeout(createBirthdayPrompt, 1000);
    }
}

// Birthday prompt functions
function createBirthdayPrompt() {
    const overlay = document.createElement('div');
    overlay.className = 'prompt-overlay';
    overlay.innerHTML = `
        <div class="birthday-prompt">
            <h3>-te quiero-, Aya ❤️</h3>
            <p>Do you remember my birthday?, soal sahel yak hhh .</p>
                        <p>YOU ONLY HAVE ONE CHANCE THOGH, DON'T SCREW IT ! .</p>

            <div class="input-group">
                <select id="birthday-month" class="birthday-select">
                    <option value="">Month</option>
                    ${Array.from({length: 12}, (_, i) => 
                        `<option value="${i}">${new Date(0, i).toLocaleString('default', {month: 'long'})}</option>`
                    ).join('')}
                </select>
                <select id="birthday-day" class="birthday-select">
                    <option value="">Day</option>
                    ${Array.from({length: 31}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
                </select>
            </div>
            <button id="submit-birthday" class="pure-button">Check Answer</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event listeners
    document.getElementById('submit-birthday').addEventListener('click', checkBirthdayAnswer);
    overlay.addEventListener('click', (e) => e.target === overlay && overlay.remove());
}

function checkBirthdayAnswer() {
    const month = parseInt(document.getElementById('birthday-month').value);
    const day = parseInt(document.getElementById('birthday-day').value);
    
    if (isNaN(month) || isNaN(day)) {
        showPromptMessage("Please select both month and day");
        return;
    }
    
    document.querySelector('.prompt-overlay').remove();
    
    if (month === YOUR_BIRTHDAY.month && day === YOUR_BIRTHDAY.day) {
        messageElement.innerHTML = `
            <p>knehmaq ela mok! ❤️</p>
            <p>${YOUR_BIRTHDAY.month + 1}/${YOUR_BIRTHDAY.day} wooiiii</p>
        `
        ;
        openGift();
        showBirthdayGift();
    } else {
        messageElement.innerHTML = `
            <p>wach nti begra wla mal mok,  My birthday is ${YOUR_BIRTHDAY.month + 1}/${YOUR_BIRTHDAY.day}</p>
            <p>But I love you anyway!, you missed the gift.</p>
        `;
    }
}

function showPromptMessage(msg) {
    let errorElement = document.querySelector('.prompt-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'prompt-error';
        document.querySelector('.birthday-prompt').appendChild(errorElement);
    }
    errorElement.textContent = msg;
}

function showBirthdayGift() {
    giftElement.style.display = 'block';
    createHearts(30);
}

// FINAL FIX FOR YOUTUBE OPENING
function openGift() {
    // Solution that works in all browsers:
    const videoWindow = window.open('', '_blank');
    if (videoWindow) {
        videoWindow.location.href = SPECIAL_VIDEO_URL;
        videoWindow.focus();
    } else {
        // Fallback for browsers blocking popups
        const link = document.createElement('a');
        link.href = SPECIAL_VIDEO_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Celebration
    giftElement.style.display = 'none';
    messageElement.innerHTML = `
        <p>Enjoy your surprise, my love! ❤️</p>
        <p>Check your new tab...</p>
    `;
    createHearts(50);
}

// Initialize
window.onload = function() {
    createHearts(3);
    
    // For testing only - uncomment next line
     setTimeout(() => { showBirthdayGift(); }, 1000);
};
