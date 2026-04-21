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
});
