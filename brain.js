const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxKenIhLwA01J2Wr2SG6BSc9wDx4FDz1uCxom9KXMBh7ghg5S2UYjCso3dC-mxe75z79A/exec";

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-history');
    
    if (!input || input.value.trim() === "") return;

    const userText = input.value;
    chatContainer.innerHTML += `<div class="msg user">${userText}</div>`;
    input.value = ""; // Очищаем поле сразу

    // Анимация раздумий
    const thinkingId = "think-" + Date.now();
    chatContainer.innerHTML += `<div class="msg ai" id="${thinkingId}">Оракул думает...</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        // ПОПЫТКА СВЯЗИ С ГУГЛОМ
        const response = await fetch(GOOGLE_SHEET_URL + "?q=" + encodeURIComponent(userText));
        const data = await response.json();
        
        document.getElementById(thinkingId).innerText = data.answer || "Я получил данные, но они странные...";
    } catch (error) {
        console.error("Ошибка связи:", error);
        // АВАРИЙНЫЙ ОТВЕТ (Если Гугл молчит)
        document.getElementById(thinkingId).innerHTML = 
            "<b>Автономный режим:</b> Саня, я вижу сообщение, но Гугл Таблица не отвечает! Проверь Deployment или CORS.";
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
