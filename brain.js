// URL твоего НОВОГО Макроса для связи с Google Таблицей
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

// ПРИВЕТСТВИЕ: Проверяет имя в памяти браузера или запрашивает новое
window.onload = () => {
    let user = localStorage.getItem('titan_name');
    if (!user) {
        user = prompt("Введи имя Титана для доступа к Штабу:");
        if(user) localStorage.setItem('titan_name', user);
    }
    if (user) {
        setTimeout(() => {
            document.getElementById('welcome-msg').innerHTML = 
            `Привет, <b>${user}</b>!<br>Доступ к Сектору 3.4.1 открыт. <br><br><b>Чем займемся?</b>`;
        }, 600);
    }
};

// Функция открытия/закрытия окна Оракула
function toggleOracle() {
    document.getElementById('oracle-window').classList.toggle('active');
}

// ГЛАВНАЯ ФУНКЦИЯ: Отправка сообщения и запись в Таблицу
async function ask() {
    const input = document.getElementById('ai-q');
    const text = input.value.trim();
    if (!text) return; // Если пусто, ничего не делаем

    const chat = document.getElementById('chat');
    chat.innerHTML += `<div class="bubble user">${text}</div>`; // Текст пользователя на экран
    input.value = ""; // Очистка поля
    chat.scrollTop = chat.scrollHeight; // Прокрутка чата вниз

    // ОТПРАВКА ДАННЫХ В КЛЕТКИ (Google Sheets)
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ type: "CHAT", userId: "Sasha_Admin", message: text })
    });

    // Имитация "думающего" процесса для интриги
    setTimeout(() => {
        chat.innerHTML += `<div class="bubble ai">Данные синхронизированы. Ожидаю следующей цели.</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 800);
}

// Переключение режимов (Быстрая / Думающая)
function setMode(mode, el) {
    document.querySelectorAll('.mode-tag').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}
