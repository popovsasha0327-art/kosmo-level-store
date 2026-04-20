const LMCH_CELLS_URL = "https://script.google.com/macros/s/AKfycbwxVlmcywub5xt-XpaUjYKRZEriMgQDsSBJgYbTw4aimCqvjStdNGUSwzXtTQvEM5iJCw/exec";

// 1. ЛОГИКА ОТПРАВКИ И ENTER
const input = document.getElementById('ai-q');
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') ask(); });

async function ask() {
    const chat = document.getElementById('chat');
    const text = input.value.trim();
    if (!text) return;

    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Отправка в ЛМСХ-Клетки
    sendToCells("Sasha_Admin", "Main_Chat", text);

    setTimeout(() => {
        let reply = "Анализ завершен. Данные в Клетках.";
        if(text.toLowerCase().includes("привет")) reply = "Привет, Посейдон! Система в твоей власти.";
        chat.innerHTML += `<div class="bubble ai">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
}

async function sendToCells(userId, chatId, message) {
    try {
        await fetch(LMCH_CELLS_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify({ type: "CHAT", userId: userId, chatId: chatId, message: message })
        });
    } catch (e) { console.error("ЛМСХ Ошибка"); }
}

// 2. ПЕРЕТАСКИВАНИЕ ОКНА (DRAG AND DROP)
const card = document.querySelector('.card');
const dragHandle = document.getElementById('drag-handle');

let isDragging = false;
let startX, startY, initialLeft, initialTop;

dragHandle.addEventListener('mousedown', startDragging);
dragHandle.addEventListener('touchstart', startDragging);

function startDragging(e) {
    isDragging = true;
    card.style.transform = 'none'; // Убираем начальное центрирование
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    startX = clientX;
    startY = clientY;
    initialLeft = card.offsetLeft;
    initialTop = card.offsetTop;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
}

function drag(e) {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    card.style.left = (initialLeft + dx) + 'px';
    card.style.top = (initialTop + dy) + 'px';
    card.style.margin = '0';
}

function stopDragging() { isDragging = false; }

function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

function takeSnapshot() { alert("📸 Камера активна!"); }
