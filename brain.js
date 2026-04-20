const LMCH_CELLS_URL = "https://script.google.com/macros/s/AKfycbwxVlmcywub5xt-XpaUjYKRZEriMgQDsSBJgYbTw4aimCqvjStdNGUSwzXtTQvEM5iJCw/exec";

async function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    const text = input.value.trim();
    if (!text) return;

    // 1. Отображаем сообщение пользователя
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";

    // 2. ОТПРАВЛЯЕМ В ЛМСХ-КЛЕТКИ (Магия!)
    sendToCells("Sasha_Admin", "Main_Chat", text);

    // 3. Логика ответа Оракула
    setTimeout(() => {
        let reply = "Данные получены и зашифрованы в Клетках 3.2.";
        if(text.toLowerCase().includes("привет")) reply = "Привет, Посейдон! Вижу тебя в системе.";
        
        chat.innerHTML += `<div class="bubble ai">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
}

async function sendToCells(userId, chatId, message) {
    try {
        await fetch(LMCH_CELLS_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify({
                type: "CHAT",
                userId: userId,
                chatId: chatId,
                message: message
            })
        });
    } catch (e) { console.log("Ошибка связи с Клетками"); }
}
