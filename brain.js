// 1. КОНСТАНТЫ И НАСТРОЙКИ
const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// Элементы интерфейса
const ui = document.getElementById('ai-interface');
const header = document.getElementById('drag-header');
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const fileInput = document.getElementById('file-input');

// 2. ЗАГРУЗКА ИСТОРИИ ЧАТА (YouTube Studio Style)
window.addEventListener('DOMContentLoaded', () => {
    const savedChat = JSON.parse(sessionStorage.getItem('lmlsh_chat_history')) || [];
    
    if (savedChat.length === 0) {
        // Приветствие по умолчанию, если чат пуст
        renderMessage('ai', 'Система активирована. Я Оракул, твой персональный ИИ. О чем сегодня подумаем, Саня?');
    } else {
        // Восстанавливаем историю
        savedChat.forEach(msg => renderMessage(msg.role, msg.text, null, false));
    }
});

// 3. ФУНКЦИЯ ОТПРАВКИ СООБЩЕНИЯ
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Отображаем и сохраняем сообщение пользователя
    renderMessage('user', text);
    saveToHistory('user', text);
    userInput.value = "";

    // Индикатор "Думаю..."
    const thinkingId = "think-" + Date.now();
    renderMessage('ai', '●●●', thinkingId);

    try {
        const response = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await response.json();
        
        // Заменяем точки на реальный ответ
        const thinkingElem = document.getElementById(thinkingId);
        if (thinkingElem) {
            thinkingElem.innerText = data.answer;
            saveToHistory('ai', data.answer);
        }
    } catch (error) {
        const thinkingElem = document.getElementById(thinkingId);
        if (thinkingElem) thinkingElem.innerText = "Ошибка связи с базой данных ЛМЛСХ.";
        console.error("Ошибка Оракула:", error);
    }
}

// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ЧАТА
function renderMessage(role, text, id = null, scroll = true) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${role}`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    chatHistory.appendChild(msgDiv);
    
    if (scroll) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

function saveToHistory(role, text) {
    const history = JSON.parse(sessionStorage.getItem('lmlsh_chat_history')) || [];
    history.push({ role, text });
    sessionStorage.setItem('lmlsh_chat_history', JSON.stringify(history));
}

// 5. УПРАВЛЕНИЕ ОКНОМ (Открытие/Закрытие)
function toggleAI() {
    if (ui) {
        ui.classList.toggle('ai-hidden');
    }
}

// 6. ПЕРЕМЕЩЕНИЕ ОКНА (Drag & Drop)
if (header && ui) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = ui.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        ui.style.transition = 'none'; // Мгновенная реакция
        ui.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        ui.style.left = (initialX + dx) + 'px';
        ui.style.top = (initialY + dy) + 'px';
        ui.style.bottom = 'auto'; 
        ui.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        ui.style.cursor = 'default';
        ui.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    });
}

// 7. СЛУШАТЕЛИ СОБЫТИЙ (Enter, Кнопки, Скрепка)
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (fileInput) {
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            renderMessage('user', `📎 Прикреплен файл: ${this.files[0].name}`);
            saveToHistory('user', `📎 Прикреплен файл: ${this.files[0].name}`);
        }
    });
}
