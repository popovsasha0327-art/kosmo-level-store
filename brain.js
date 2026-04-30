const chatBox = document.getElementById('chat-box');
const oracleWindow = document.getElementById('oracle-window');
const statusBar = document.getElementById('status-bar');
const userInput = document.getElementById('user-input');

const brain = {
    "дом.": "№77933 Lahr Reichenbach\nДом 3, Моцартстрассе\nК тебе я еду 🏠",
    "скажи дом.": "№77933 Lahr Reichenbach\nДом 3, Моцартстрассе\nК тебе я еду 🏠",
    "я буду приколы делать дома": "О спасибо. Я уже быстрее разогнался",
    "сова": "Сова на связи. Чисто. 🦉",
    "архив": "Бро, 📂 Архив активирован. Жду команд."
};

function sendToOracle() {
    let val = userInput.value.trim();
    if (!val) return;

    // Активируем окно
    oracleWindow.classList.add('active');
    
    // Твое сообщение
    addMsg(val, 'user');
    statusBar.innerText = `🚀 В Эпицентр: ${val}`;

    // Ответ Оракула
    setTimeout(() => {
        let key = val.toLowerCase();
        let reply = brain[key] || "Запрос принят. Обрабатываю в Эпицентре... 🚀";
        addMsg(reply, 'oracle');
    }, 600);

    userInput.value = "";
}

function addMsg(text, type) {
    const d = document.createElement('div');
    d.className = `msg ${type}`;
    d.innerText = text;
    chatBox.appendChild(d);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleOracle() {
    oracleWindow.classList.toggle('active');
}
