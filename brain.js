let currentMode = 'fast';

function setMode(mode, btn) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Меняем цвет под режим
    const color = (mode === 'ultra') ? "#bc13fe" : "#00f2ff";
    document.documentElement.style.setProperty('--accent', color);
}

function handleEnter(e) { if (e.key === 'Enter') ask(); }

function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    const text = input.value.trim();
    if (!text) return;

    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";

    // Эффект "Думающего" режима
    let delay = (currentMode === 'ultra') ? 2000 : 500;
    
    setTimeout(() => {
        let reply = "Анализ завершен. Данные в логах не найдены.";
        
        if(text.toLowerCase().includes("привет")) reply = "Привет, Посейдон! Система активна.";
        if(text.toLowerCase().includes("3.2")) reply = "Вижу пакет 3.2. 12-й мир стабилен. Хотите пересказ?";
        
        if (currentMode === 'ultra') {
            reply = "🔮 [DEEP ANALYSIS]: " + reply + " (Обнаружены скрытые слои 12-й Империи)";
        }

        chat.innerHTML += `<div class="bubble ai">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, delay);
}

function takeSnapshot() {
    alert("Оракул: Делаю скриншот реальности... (Функция в разработке)");
}
