const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbz_1aF9h73lQAS8YbkPf34WshD_9H1YLuKNey5PzVQT86IAret_gJdbY5OBc4KVsKvyKw/exec";

const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');
const history = document.getElementById('chat-history');

// 1. ОТПРАВКА ПО ENTER
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

btn.addEventListener('click', sendMessage);

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    history.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";
    history.scrollTop = history.scrollHeight;

    const thinkingId = "think-" + Date.now();
    history.innerHTML += `<div class="msg ai" id="${thinkingId}">●●●</div>`;

    try {
        const res = await fetch(GOOGLE_URL + "?q=" + encodeURIComponent(text));
        const data = await res.json();
        document.getElementById(thinkingId).innerText = data.answer;
    } catch {
        document.getElementById(thinkingId).innerText = "Ошибка связи, Саня. Проверь сеть.";
    }
    history.scrollTop = history.scrollHeight;
}

// ЛОГИКА СКРЕПКИ
document.getElementById('file-input').addEventListener('change', function() {
    if (this.files[0]) {
        history.innerHTML += `<div class="msg user">📎 Файл: ${this.files[0].name}</div>`;
        history.scrollTop = history.scrollHeight;
    }
}
// --- ЛОГИКА ПЕРЕМЕЩЕНИЯ (DRAG & DROP) ---
const widget = document.getElementById('ai-interface');
const header = document.querySelector('.ai-header');

if (header && widget) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        // Тащим только за заголовок
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        // Получаем текущие координаты окна
        const rect = widget.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        widget.style.transition = 'none'; // Отключаем анимацию во время движения
        widget.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        // Устанавливаем новые координаты
        widget.style.left = (initialX + dx) + 'px';
        widget.style.top = (initialY + dy) + 'px';
        widget.style.bottom = 'auto'; // Сбрасываем привязку к низу
        widget.style.right = 'auto'; // Сбрасываем привязку к правому краю
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            widget.style.cursor = 'default';
            widget.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        }
    });
});
