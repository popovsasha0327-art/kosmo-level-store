const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

window.onload = () => {
    let user = localStorage.getItem('titan_name');
    if (!user) { user = prompt("Имя Титана:"); if (user) localStorage.setItem('titan_name', user); }
    if (user) { setTimeout(() => { document.getElementById('welcome-msg').innerHTML = `Привет, <b>${user}</b>! Системы ЛМСХ в норме.`; }, 500); }
};

function toggleOracle() { document.getElementById('oracle-window').classList.toggle('active'); }

async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return;
    const chat = document.getElementById('chat');
    const isUltra = document.querySelector('.ultra').classList.contains('active');
    
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    if (isUltra) {
        const loadingId = "load-" + Date.now();
        chat.innerHTML += `<div class="bubble ai" id="${loadingId}"><i>Анализирую глубокие слои ЛМСХ...</i></div>`;
        chat.scrollTop = chat.scrollHeight;
        setTimeout(() => { document.getElementById(loadingId).innerHTML = "Глубокий анализ завершен. Данные синхронизированы."; chat.scrollTop = chat.scrollHeight; }, 2000);
    } else {
        setTimeout(() => { chat.innerHTML += `<div class="bubble ai">Принято!</div>`; chat.scrollTop = chat.scrollHeight; }, 600);
    }

    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ user: localStorage.getItem('titan_name'), message: text, mode: isUltra ? "ULTRA" : "FAST" }) });
}

function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

const card = document.getElementById('oracle-window');
const handle = document.getElementById('drag-handle');
let isMoving = false, startX, startY;

handle.onmousedown = (e) => { if (e.target.classList.contains('close-btn')) return; isMoving = true; startX = e.clientX - card.offsetLeft; startY = e.clientY - card.offsetTop; card.style.transition = 'none'; };
document.onmousemove = (e) => { if (!isMoving) return; card.style.left = (e.clientX - startX) + 'px'; card.style.top = (e.clientY - startY) + 'px'; card.style.bottom = 'auto'; card.style.right = 'auto'; };
document.onmouseup = () => { isMoving = false; card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; };
document.getElementById('ai-q').addEventListener('keypress', (e) => { if (e.key === 'Enter') ask(); });
