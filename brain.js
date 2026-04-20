// [ORACLE CORE: PHOENIX EDITION]
const SCRIPT_URL = "ТВОЙ_URL_СКРИПТА"; // Вставь сюда ссылку на Google Script

// 1. ДАННЫЕ КАРТОЧЕК БОРДИНГА
const cardsData = [
    { title: "РАЗВИТЫЙ ИНТЕЛЛЕКТ", text: "Тебе не нужно повторять вопросы — Оракул понимает с полуслова.", color: "#00ff88" },
    { title: "БЕЗГРАНИЧНАЯ ПАМЯТЬ", text: "Оракул помнит контекст ваших идей, пока мамонты всё забывают.", color: "#FFD700" },
    { title: "ШТАБ В КАРМАНЕ", text: "Управляй кодом со смартфона, пока компьютер отдыхает.", color: "#bf00ff" },
    { title: "СКОРОСТЬ ТИТАНА", text: "Забудь про лаги — ответы прилетают быстрее мысли.", color: "#ff8800" }
];

let currentCard = 0;

window.onload = () => {
    const card = document.getElementById('oracle-window');
    const chat = document.getElementById('chat');
    const authWall = document.getElementById('auth-wall');

    // ПРОВЕРКА АВТОРИЗАЦИИ
    if (localStorage.getItem('is_auth') === 'true') {
        if(authWall) authWall.style.display = 'none';
        
        // Восстановление позиции и истории
        const x = localStorage.getItem('ox'), y = localStorage.getItem('oy');
        if (x && y) { card.style.left = x; card.style.top = y; card.style.bottom = 'auto'; card.style.right = 'auto'; }

        const savedHistory = localStorage.getItem('titan_chat');
        if (savedHistory) { chat.innerHTML = savedHistory; chat.scrollTop = chat.scrollHeight; }
        
        if (localStorage.getItem('is_open') === 'true') card.classList.add('active');
    } else {
        startCardSlider(); // Запуск карточек для гостей
    }
};

// 2. ЛОГИКА КАРТОЧЕК (7 СЕКУНД)
function startCardSlider() {
    const title = document.getElementById('card-title');
    const text = document.getElementById('card-text');
    const bar = document.getElementById('progress-bar');
    const content = document.getElementById('card-content');
    const wall = document.getElementById('auth-wall');

    function nextSlide() {
        bar.style.transition = 'none';
        bar.style.width = '0%';
        content.style.opacity = '0';
        content.style.transform = 'translateX(50px)';

        setTimeout(() => {
            currentCard = (currentCard + 1) % cardsData.length;
            title.innerText = cardsData[currentCard].title;
            text.innerText = cardsData[currentCard].text;
            wall.style.borderColor = cardsData[currentCard].color; // Меняем цвет рамки

            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                bar.style.transition = 'width 7s linear';
                bar.style.width = '100%';
            }, 50);
        }, 500);
    }

    nextSlide();
    setInterval(nextSlide, 7000);
}

// 3. ФУНКЦИИ ВХОДА И ЧАТА
function activateStaff() {
    const name = prompt("Введите ваше имя для входа в Штаб:");
    if (name) {
        localStorage.setItem('is_auth', 'true');
        localStorage.setItem('titan_name', name);
        location.reload(); // Перезагрузка для активации ИИ
    }
}

async function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    if (!input.value.trim()) return;

    const userMsg = input.value;
    chat.innerHTML += `<div class="bubble user">${userMsg}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
    
    localStorage.setItem('titan_chat', chat.innerHTML);

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ message: userMsg, user: localStorage.getItem('titan_name') })
        });
        const data = await response.json();
        chat.innerHTML += `<div class="bubble ai">${data.reply}</div>`;
        localStorage.setItem('titan_chat', chat.innerHTML);
        chat.scrollTop = chat.scrollHeight;
    } catch (e) {
        chat.innerHTML += `<div class="bubble ai">Ошибка связи. Оракул вне зоны доступа.</div>`;
    }
}

function toggleOracle() {
    const card = document.getElementById('oracle-window');
    card.classList.toggle('active');
    localStorage.setItem('is_open', card.classList.contains('active'));
}
