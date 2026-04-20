const URL = "https://script.google.com/macros/s/AKfycbwxVlmcywub5xt-XpaUjYKRZEriMgQDsSBJgYbTw4aimCqvjStdNGUSwzXtTQvEM5iJCw/exec";

// 1. ПЕРЕМЕЩЕНИЕ (DRAG & DROP)
const card = document.querySelector('.card');
const handle = document.getElementById('drag-handle');
let isMoving = false, px, py;

handle.onmousedown = (e) => {
    isMoving = true;
    card.style.transform = 'none';
    px = e.clientX - card.offsetLeft;
    py = e.clientY - card.offsetTop;
};

document.onmousemove = (e) => {
    if (!isMoving) return;
    card.style.left = (e.clientX - px) + 'px';
    card.style.top = (e.clientY - py) + 'px';
};

document.onmouseup = () => isMoving = false;

// 2. ОТПРАВКА СООБЩЕНИЙ
const input = document.getElementById('ai-q');
input.onkeypress = (e) => { if(e.key === 'Enter') ask(); };

async function ask() {
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // В Клетки
    fetch(URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({type:"CHAT", userId:"Sasha", message: text}) });

    setTimeout(() => {
        chat.innerHTML += `<div class="bubble ai">Принято. Клетки 3.2 обновлены.</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
}

function openLogin() {
    const pass = prompt("Введите пароль доступа к Оракулу:");
    if(pass === "123") { // Саня, тут твой секретный пароль!
        alert("О привет, Посейдон! Доступ разрешен.");
        document.getElementById('chat-title').innerText = "Админ: Саша";
    } else {
        alert("Доступ запрещен. Вы мамонт?");
    }
}

function setMode(m, el) {
    document.querySelectorAll('.mode-tag').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}
