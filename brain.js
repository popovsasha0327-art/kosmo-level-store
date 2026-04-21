// ПРОВЕРКА ПАМЯТИ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-history');
    const savedChat = sessionStorage.getItem('prestige_chat');

    if (savedChat) {
        chatContainer.innerHTML = savedChat;
        console.log("ОТК Мурзик: Чат успешно восстановлен из памяти!");
    }
});

// ФУНКЦИЯ ОТПРАВКИ СООБЩЕНИЯ
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-history');
    
    if (input.value.trim() === "") return;

    // Добавляем сообщение пользователя
    const userMsg = `<div class="msg user">${input.value}</div>`;
    chatContainer.innerHTML += userMsg;

    // Имитация "раздумий" ИИ (Brain Power)
    const thinkingMsg = `<div class="msg ai thinking">Ламирка печатает...</div>`;
    chatContainer.innerHTML += thinkingMsg;

    const currentText = input.value;
    input.value = ""; // Очищаем поле

    setTimeout(() => {
        // Убираем анимацию раздумий
        const thinking = document.querySelector('.thinking');
        if (thinking) thinking.remove();

        // Ответ ИИ (здесь можно подключить реальное API)
        const aiMsg = `<div class="msg ai">Саня, как Главный Тестировщик, ты должен знать: код работает идеально!</div>`;
        chatContainer.innerHTML += aiMsg;

        // СОХРАНЯЕМ ЧАТ В СЕССИЮ (до перезагрузки)
        sessionStorage.setItem('prestige_chat', chatContainer.innerHTML);
        
        // Авто-скролл вниз
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
}
