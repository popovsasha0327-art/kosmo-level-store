const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// 1. ЗАГРУЗКА ЧАТА ПРИ СТАРТЕ
window.onload = () => {
    const history = JSON.parse(sessionStorage.getItem('lmlsh_chat')) || [];
    const chatContainer = document.getElementById('chat-history');
    if (history.length === 0) {
        chatContainer.innerHTML = '<div class="msg ai">Система готова, Саня. О чем спросим Оракула?</div>';
    } else {
        history.forEach(msg => {
            chatContainer.innerHTML += `<div class="msg ${msg.role}">${msg.text}</div>`;
        });
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

// 2. ОТПРАВКА СООБЩЕНИЯ
async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    renderMsg('user', text);
    saveChat('user', text);
    input.value = "";

    const thinkingId = "think-" + Date.now();
    renderMsg('ai', '●●●', thinkingId);

    try {
        const res = await fetch(GOOGLE_URL + "?q=" + encodeURIComponent(text));
        const data = await res.json();
        document.getElementById(thinkingId).innerText = data.answer;
        saveChat('ai', data.answer);
    } catch {
        document.getElementById(thinkingId).innerText = "Сбой связи.";
    }
}

function renderMsg(role, text, id = "") {
    const chat = document.getElementById('chat-history');
    chat.innerHTML += `<div class="msg ${role}" ${id ? `id="${id}"` : ''}>${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}

function saveChat(role, text) {
    let history = JSON.parse(sessionStorage.getItem('lmlsh_chat')) || [];
    history.push({ role, text });
    sessionStorage.setItem('lmlsh_chat', JSON.stringify(history));
}

// 3. УПРАВЛЕНИЕ ОКНОМ (Drag & Drop)
const ui = document.getElementById('ai-interface');
const header = document.getElementById('drag-header');
let isDragging = false, startX, startY, initX, initY;

header.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX; startY = e.clientY;
    initX = ui.offsetLeft; initY = ui.offsetTop;
    ui.style.transition = 'none';
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    ui.style.left = (initX + e.clientX - startX) + 'px';
    ui.style.top = (initY + e.clientY - startY) + 'px';
    ui.style.bottom = 'auto'; ui.style.right = 'auto';
};

document.onmouseup = () => { isDragging = false; ui.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; };

function toggleAI() { ui.classList.toggle('ai-hidden'); }

document.getElementById('user-input').onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
document.getElementById('send-btn').onclick = sendMessage;
