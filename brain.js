const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// АВТОРИЗАЦИЯ И ИНТРИГА
window.onload = () => {
    let user = prompt("Введи имя Титана для доступа к Штабу:");
    if (user) {
        document.getElementById('welcome-msg').innerHTML = 
        `Привет, <b>${user}</b>! Рад твоему возвращению. Восстанавливаю твои чаты из Клеток... <br><br><b>Чем займемся?</b>`;
        // Здесь можно добавить fetch для загрузки старых сообщений
    }
};

function toggleOracle() {
    document.getElementById('oracle-window').classList.toggle('active');
}

async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // НОВЫЙ МАКРОС САНИ
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ type: "CHAT", userId: "Sasha_Admin", message: text })
    });

    setTimeout(() => {
        chat.innerHTML += `<div class="bubble ai">Данные приняты. Клетки обновлены. Что дальше?</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 800);
}

function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}
