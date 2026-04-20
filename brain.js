const URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// 1. ПЕРЕКЛЮЧАТЕЛЬ ОКНА
function toggleOracle() {
    const win = document.getElementById('oracle-window');
    win.style.display = (win.style.display === 'none') ? 'flex' : 'none';
}

// 2. ENTER И ОТПРАВКА
document.getElementById('ai-q').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') ask();
});

async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return;

    document.getElementById('chat').innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";

    // В ТАБЛИЦУ
    fetch(URL, { method: 'POST', body: JSON.stringify({type:"CHAT", message:text}) })
    .catch(e => console.log("Клетки ждут..."));

    setTimeout(() => {
        document.getElementById('chat').innerHTML += `<div class="bubble ai">Принято. Навигация подтверждена.</div>`;
    }, 600);
}

// 3. ПЕРЕМЕЩЕНИЕ
const card = document.getElementById('oracle-window');
const handle = document.getElementById('drag-handle');
let move = false, ox, oy;

handle.onmousedown = (e) => {
    move = true; ox = e.clientX - card.offsetLeft; oy = e.clientY - card.offsetTop;
};
document.onmousemove = (e) => {
    if (!move) return;
    card.style.left = (e.clientX - ox) + 'px'; card.style.top = (e.clientY - oy) + 'px';
};
document.onmouseup = () => move = false;
