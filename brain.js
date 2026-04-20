/* 🧠 BRAIN.JS - СИСТЕМА УПРАВЛЕНИЯ ТИТАНОМ 3.5.3 */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// [АВТОРИЗАЦИЯ]
window.onload = () => {
    let user = localStorage.getItem('titan_name');
    if (!user) {
        user = prompt("Введите ваше имя для идентификации в Штабе:");
        if (user) localStorage.setItem('titan_name', user);
    }
    if (user) {
        const welcome = document.getElementById('welcome-msg');
        setTimeout(() => {
            welcome.innerHTML = `Привет, <b>${user}</b>!<br>Системы ЛМСХ активны. Чем займемся?`;
        }, 500);
    }
};

// [ОТКРЫТИЕ]
function toggleOracle() {
    document.getElementById('oracle-window').classList.toggle('active');
}

// [ОТПРАВКА]
async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById('chat');
    
    // Добавляем сообщение (Справа, Голубое)
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // В макрос
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            type: "CHAT",
            user: localStorage.getItem('titan_name'),
            message: text,
            mode: document.querySelector('.mode-tag.active').innerText
        })
    });

    // Ответ ИИ (Слева, Серое)
    setTimeout(() => {
        chat.innerHTML += `<div class="bubble ai">Принято. Данные отправлены в Клетки. Ожидаю новых команд.</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 800);
}

// [РЕЖИМЫ]
function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

// [ПЛАВАЮЩЕЕ ОКНО]
const card = document.getElementById('oracle-window');
const handle = document.getElementById('drag-handle');
let isDragging = false, startX, startY;

handle.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX - card.offsetLeft;
    startY = e.clientY - card.offsetTop;
    card.style.transition = 'none';
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    card.style.left = (e.clientX - startX) + 'px';
    card.style.top = (e.clientY - startY) + 'px';
    card.style.bottom = 'auto'; card.style.right = 'auto';
};

document.onmouseup = () => {
    isDragging = false;
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
};

// [ENTER]
document.getElementById('ai-q').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') ask();
});

function attachFile() { alert("Скрепка Титана: Готов к приему файлов для анализа."); }
