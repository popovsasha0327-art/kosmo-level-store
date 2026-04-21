// ГЕНЕРАЛЬНАЯ СВЯЗЬ С ТИТАНАМИ (АКТУАЛЬНАЯ ССЫЛКА)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz_1aF9h73lQAS8YbkPf34WshD_9H1YLuKNey5PzVQT86IAret_gJdbY5OBc4KVsKvyKw/exec";

// Функция отправки (проверь, чтобы она выглядела так)
async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-history');
    
    if (!input || input.value.trim() === "") return;

    const userText = input.value;
    chatContainer.innerHTML += `<div class="msg user">${userText}</div>`;
    input.value = ""; 

    // Создаем облачко "мыслей" ИИ
    const thinkingId = "think-" + Date.now();
    chatContainer.innerHTML += `<div class="msg ai" id="${thinkingId}">Оракул входит в транс...</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        // Отправляем запрос через прокси или напрямую (Гугл это любит)
        const response = await fetch(GOOGLE_SHEET_URL + "?q=" + encodeURIComponent(userText));
        const data = await response.json();
        
        document.getElementById(thinkingId).innerText = data.answer;
    } catch (error) {
        console.error("Ошибка:", error);
        document.getElementById(thinkingId).innerText = "Саня, я слышу тебя, но база данных под блюром! Проверь интернет или консоль.";
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
