const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// [ЗАГРУЗКА СОСТОЯНИЯ]
window.onload = () => {
    let user = localStorage.getItem('titan_name');
    if (!user) {
        user = prompt("Введите имя:");
        if (user) localStorage.setItem('titan_name', user);
    }
    
    const card = document.getElementById('oracle-window');
    
    // Восстанавливаем имя
    if (user) {
        setTimeout(() => { document.getElementById('welcome-msg').innerHTML = `Привет, <b>${user}</b>! Системы синхронизированы.`; }, 500);
    }

    // Восстанавливаем позицию окна
    const savedLeft = localStorage.getItem('oracle_left');
    const savedTop = localStorage.getItem('oracle_top');
    if (savedLeft && savedTop) {
        card.style.left = savedLeft;
        card.style.top = savedTop;
        card.style.bottom = 'auto';
        card.style.right = 'auto';
    }

    // Восстанавливаем видимость
    const isOpen = localStorage.getItem('oracle_open') === 'true';
    if (isOpen) {
        card.classList.add('active');
    }
};

// [ПЕРЕКЛЮЧАТЕЛЬ С СОХРАНЕНИЕМ]
function toggleOracle() {
    const card = document.getElementById('oracle-window');
    card.classList.toggle('active');
    localStorage.setItem('oracle_open', card.classList.contains('active'));
}

// [ПЕРЕТАСКИВАНИЕ С ЗАПИСЬЮ КООРДИНАТ]
const card = document.getElementById('oracle-window');
const handle = document.getElementById('drag-handle');
let isDrag = false, sx, sy;

handle.onmousedown = (e) => { 
    if (e.target.classList.contains('close-btn')) return;
    isDrag = true; 
    sx = e.clientX - card.offsetLeft; 
    sy = e.clientY - card.offsetTop;
    card.style.transition = 'none'; 
};

document.onmousemove = (e) => { 
    if (!isDrag) return;
    let left = (e.clientX - sx) + 'px';
    let top = (e.clientY - sy) + 'px';
    card.style.left = left; 
    card.style.top = top;
    card.style.bottom = 'auto'; 
    card.style.right = 'auto';
    
    // Сохраняем координаты в память
    localStorage.setItem('oracle_left', left);
    localStorage.setItem('oracle_top', top);
};

document.onmouseup = () => { 
    isDrag = false; 
    card.style.transition = 'opacity 0.5s, transform 0.5s'; 
};

// Остальные функции без изменений
async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return;
    const chat = document.getElementById('chat');
    const isUltra = document.querySelector('.ultra').classList.contains('active');
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
    setTimeout(() => { chat.innerHTML += `<div class="bubble ai">Принято в Секторе!</div>`; chat.scrollTop = chat.scrollHeight; }, 600);
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ user: localStorage.getItem('titan_name'), message: text, mode: isUltra ? "ULTRA" : "FAST" }) });
}

function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}
document.getElementById('ai-q').addEventListener('keypress', (e) => { if (e.key === 'Enter') ask(); });
