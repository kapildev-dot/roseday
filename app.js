// 1. Variables (Sirf ek baar define kiye hain)
let userName = "";
let currentLevel = 0;
let rejectCount = 0;
let fillValue = 0;

const shayaris = [
    "{name}, teri muskaan se meri duniya roshan ho jati hai 🌸❤️",
    "{name}, tu hai toh har pal Valentine jaisa lagta hai 💞",
    "Tere bina rose bhi adhoora sa lagta hai {name} 😔💔"
];

const mananeShayaris = [
    "{name}, please ek baar muskura do... ye dil ruk sa gaya hai 🌹😭",
    "Arre itna strict mat bano jaan... ek YES hi chahiye 💔→❤️",
    "Rose reject? Theek hai... par dil toh accept kar lo na 🥺💞",
    "{name}, main yahin baith ke wait kar raha hoon... maan jao na! 😭🌸",
    "Reject kiya? Ab toh aur zyada pyar aa raha hai 😍🔥"
];

const levels = [
    { 
        title: "Game 1: Rose Catch 🌹", 
        content: `<h3>Catch the Rose!</h3><p>Jab rose dikhe tab click karo!</p><div id="rose-target" style="font-size:6rem; cursor:pointer; display:inline-block; transition:0.3s; filter: drop-shadow(0 0 10px pink);">🌹</div><p id="result" style="font-size:1.5rem; margin-top:10px;"></p>`
    },
    { 
        title: "Game 2: Love Quiz 💖", 
        content: `<h3>Quick Quiz</h3><p style="font-size:1.4rem;">Mujhe sabse zyada pyara kya lagta hai?</p><button class="btn" onclick="quiz(false)">Chocolate</button><button class="btn primary" onclick="quiz(true)">Tu 😏</button><p id="result" class="status"></p>`
    },
    { 
        title: "Game 3: Broken Heart 🧩", 
        content: `<h3>Broken Heart Jodo</h3><p>Heart ko click karke jod do!</p><div style="font-size:5rem; margin:20px 0;"><span id="dragHeart" onclick="fixHeart()" style="cursor:pointer; display:inline-block;">💔</span> <span id="targetArea" style="margin-left:50px; border:2px dashed #ff4081; border-radius:15px; padding:15px; background:rgba(255,255,255,0.3);">?</span></div><p id="result" style="font-size:1.5rem;"></p>`
    },
    { 
        title: "Game 4: Love Meter 📈", 
        content: `<h3>Love Meter Bharo</h3><div id="meter" style="height:35px; background:#eee; border-radius:20px; overflow:hidden; margin:25px 0; border:2px solid #ff4d6d;"><div id="fill" style="width:0%; height:100%; background:linear-gradient(to right, #ff4081, #f50057); transition:width 0.3s;"></div></div><button class="btn primary" style="font-size:1.5rem;" onclick="fillMeter()">BOHOT PYAR ❤️</button><p id="result"></p>`
    }
];

// --- Custom Large Popup Function (For Shayari & GIFs) ---
function showSweetMessage(title, message, type) {
    const existing = document.getElementById('custom-popup');
    if (existing) existing.remove();

    const gifMap = {
        'love': 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2FidnM1M2d2N3Q5cHhncGw4M2NxcjczOW5qaHBqeHU4eTNkZzY0eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kD62fyVdWl4UmtfLiA/giphy.webp',
        'wrong': 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmExdzJhdHA3ZTdqbWNhenh3Ym5kNGR3c3hkajBydXpneGZkYmp6YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zZbf6UpZslp3nvFjIR/giphy.webp',
        'success': 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmswcTczZHJyb2NtOGx4a3p6MmZ3MXVhdXI0dWFhdTRxMTVob2JleSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8Fxae36AvVFSpgOTFO/200.webp'
    };

    const overlay = document.createElement('div');
    overlay.id = 'custom-popup';
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:10000;";

    overlay.innerHTML = `
        <div style="background:white; padding:40px; border-radius:35px; width:92%; max-width:550px; text-align:center; box-shadow:0 0 40px #ff4d6d; animation: popBounce 0.5s forwards;">
            <img src="${gifMap[type] || gifMap['love']}" style="width:180px; margin-bottom:20px; border-radius:15px;">
            <h2 style="color:#c2185b; font-size:2.5rem; margin-bottom:15px;">${title}</h2>
            <p style="font-size:1.6rem; color:#444; line-height:1.5; font-weight:600; font-style:italic;">"${message}"</p>
            <button class="btn primary" style="margin-top:25px; width:100%; font-size:1.4rem;" onclick="this.parentElement.parentElement.remove()">Aage Badho ❤️</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

// --- Core Game Functions ---
function startGame() {
    userName = document.getElementById("userName").value.trim() || "Jaanu";
    document.getElementById("name-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("greeting").innerText = `Hey ${userName}! 🌹💕`;
    
    startFallingItems();
    loadLevel(0);
    playMusic();
}

function startFallingItems() {
    const container = document.getElementById("fallingItems") || document.body;
    setInterval(() => {
        const item = document.createElement("div");
        item.className = "fall-item";
        item.innerText = Math.random() > 0.5 ? "🌹" : "💖";
        item.style.left = Math.random() * 95 + "vw";
        item.style.position = "fixed";
        item.style.top = "-50px";
        item.style.zIndex = "1";
        item.style.animation = `fall ${Math.random() * 3 + 4}s linear forwards`;
        container.appendChild(item);
        setTimeout(() => item.remove(), 6000);
    }, 500);
}

function loadLevel(idx) {
    currentLevel = idx;
    const area = document.getElementById("mini-game-area");
    area.innerHTML = levels[idx].content;

    if (idx === 0) {
        const rose = document.getElementById("rose-target");
        rose.onclick = () => {
            rose.style.transform = "scale(2.5) rotate(360deg)";
            document.getElementById("result").innerText = "Pakad liya! 🌹 Hero!";
            setTimeout(nextLevel, 1200);
        };
    }
}

window.quiz = function(correct) {
    if (correct) {
        showSweetMessage("Sahi Kaha!", "Mujhe bhi tu hi sabse pyari lagti hai! 😘", "love");
        setTimeout(nextLevel, 2000);
    } else {
        showSweetMessage("Arre Yaar!", "Galat! Chocolate toh theek hai par mera sukoon toh tu hai na! 😉", "wrong");
    }
};

window.fixHeart = function() {
    const heart = document.getElementById("dragHeart");
    const target = document.getElementById("targetArea");
    heart.innerText = "❤️";
    heart.style.transform = "translateX(100px) scale(1.5)";
    heart.style.transition = "1s";
    target.style.background = "#ffcdd2";
    document.getElementById("result").innerText = "Dil Jud Gaya! 💞";
    setTimeout(nextLevel, 1500);
};

window.fillMeter = function() {
    fillValue += 25;
    const fill = document.getElementById("fill");
    if(fill) fill.style.width = fillValue + "%";
    
    if (fillValue >= 100) {
        showSweetMessage("Full Power!", "Mera pyar 100% sirf tumhare liye! 😍💖", "love");
        setTimeout(nextLevel, 2000);
    }
};

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        loadLevel(currentLevel + 1);
    } else {
        document.getElementById("status-msg").innerHTML = `<b style="font-size:1.8rem; color:#c2185b;">Secret unlocked: ${userName}, Tu meri puri duniya hai! ❤️</b>`;
        setTimeout(showFinalPopup, 2500);
    }
}

function showFinalPopup() {
    document.getElementById("final-msg").innerHTML = `Ab dil se batao ${userName},<br>kya mera 🌹 accept karogi?`;
    document.getElementById("final-popup").classList.remove("hidden");
}

function rejectRose() {
    rejectCount++;
    const noBtn = document.querySelector(".btn.no");
    if(noBtn) {
        noBtn.style.position = "absolute";
        noBtn.style.left = Math.random() * 80 + "%";
        noBtn.style.top = Math.random() * 80 + "%";
    }

    let idx = Math.min(rejectCount - 1, mananeShayaris.length - 1);
    let shayri = mananeShayaris[idx].replace("{name}", userName);
    
    // Show large message on every 2nd reject
    if (rejectCount % 2 === 0) {
        showSweetMessage("Maan jao na..", shayri, "wrong");
    }
    
    document.getElementById("manane-area").innerHTML = `<p style="font-size:1.4rem; color:#e91e63; font-weight:bold; animation:pulse 1s infinite;">${shayri}</p>`;
}

function yesClick() {
    confettiBurst();
    showSweetMessage("I LOVE YOU! 🌹", `Yayyy ${userName}! Tune mera din bana diya! ❤️ Happy Rose Day My Jaan!`, "success");
    
    // Change the final screen content
    document.getElementById("final-popup").innerHTML = `
        <div class="popup-content">
            <h1 style="font-size:4rem;">🌹💖</h1>
            <h2 style="font-size:2.5rem;">Forever Yours!</h2>
            <p style="font-size:1.4rem;">Ye screen mujhe bhej dena! 😍</p>
            <button class="btn primary" onclick="location.reload()">Reset</button>
        </div>
    `;
}

function confettiBurst() {
    for (let i = 0; i < 80; i++) {
        const c = document.createElement("div");
        c.innerText = ["🌸","❤️","🌹","✨"][Math.floor(Math.random()*4)];
        c.style.position = "fixed";
        c.style.left = Math.random() * 100 + "vw";
        c.style.top = "-30px";
        c.style.fontSize = Math.random() * 20 + 20 + "px";
        c.style.zIndex = "10000";
        c.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

function playMusic() {
    const audio = document.getElementById("bgMusic");
    if(audio) {
        audio.volume = 0.4;
        audio.play().catch(() => console.log("User interaction needed for audio"));
    }
}

function toggleMusic() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("muteBtn");
    if (audio.paused) { audio.play(); btn.innerText = "🔊"; }
    else { audio.pause(); btn.innerText = "🔇"; }
}