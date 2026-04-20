/* 🔱 ORACLE TITAN BRAIN 3.5.2 🔱 */

// 1. АДРЕС ТВОЕГО НОВОГО МАКРОСА
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// 2. АВТОРИЗАЦИЯ И ПРИВЕТСТВИЕ (ИНТРИГА)
window.onload = () => {
    let user = localStorage.getItem('titan_name');
    
    if (!user) {
        user = prompt("Введи имя Титана для доступа к Штабу:");
        if(user) localStorage.setItem('titan_name', user);
    }

    if (user) {
        const welcome = document.getElementById('welcome-msg');
        welcome.style.opacity = "0";
        setTimeout(() => {
            welcome.innerHTML = `Привет, <b>${user}</b>!<br>Доступ к Сектору 3.5 открыт. Логи восстановлены. <br><br><b>Чем займемся?</b>`;
            welcome.style.opacity = "1";
        }, 500);
    }
};

// 3. ОТКРЫТИЕ / ЗАКРЫТИЕ ОКНА
function toggleOracle() {
    const win = document.getElementById('oracle-window');
    win.classList.toggle('active');
}

// 4. ЛОГИКА ОТПРАВКИ СООБЩЕНИЙ
async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return; // Если пусто — мамонты не пройдут

    const chat = document.getElementById('chat');
    
    // Добавляем сообщение пользователя на экран
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = ""; // Очищаем поле
    chat.scrollTop = chat.scrollHeight; // Скроллим вниз

    // ОТПРАВКА В GOOGLE ТАБЛИЦУ (ТВОЙ МАКРОС)
    try {
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Важно для работы с Google Apps Script
            body: JSON.stringify({
                type: "CHAT",
                userId: localStorage.getItem('titan_name') || "Unknown",
                message: text,
                mode: document.querySelector('.mode-tag.active').innerText
            })
        });
    } catch (e) {
        console.error("Ошибка связи с ЛМСХ-Клетками");
    }

    // ИНТРИГУЮЩИЙ ОТВЕТ ОРАКУЛА
    setTimeout(() => {
        chat.innerHTML += `<div class="bubble ai">Принято. Данные синхронизированы в Секторе 3.5. Жду приказа.</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 800);
}

// 5. ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ (БЫСТРАЯ / ДУМАЮЩАЯ)
function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

// 6. ПЛАВАЮЩЕЕ ОКНО (DRAG & DROP)
const card = document.getElementById('oracle-window');
const handle = document.getElementById('drag-handle');
let isMoving = false;
let offsetStartX, offsetStartY;

handle.onmousedown = (e) => {
    isMoving = true;
    // Считаем разницу между мышкой и краем окна
    offsetStartX = e.clientX - card.offsetLeft;
    offsetStartY = e.clientY - card.offsetTop;
    
    card.style.transition = 'none'; // Отключаем анимацию при движении
    card.style.cursor = 'grabbing';
};

document.onmousemove = (e) => {
    if (!isMoving) return;
    
    // Новые координаты
    let x = e.clientX - offsetStartX;
    let y = e.clientY - offsetStartY;
    
    // Применяем позицию
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.bottom = 'auto'; // Сбрасываем нижнюю привязку
    card.style.right = 'auto';  // Сбрасываем правую привязку
};

document.onmouseup = () => {
    isMoving = false;
    card.style.transition = '0.5s ease'; // Возвращаем плавность
    card.style.cursor = 'default';
};

// Обработка клавиши Enter
document.getElementById('ai-q').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') ask();
});

// Функция скрепки (заглушка)
function attachFile() {
    alert("Скрепка ЛМСХ: Выберите файл для передачи в Клетки.");
}
