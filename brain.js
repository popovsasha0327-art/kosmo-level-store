const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// 1. ПРАВАЯ КНОПКА СИЛЫ
function handleRightClick(event) {
    event.preventDefault(); // Отменяем меню браузера
    const quickInput = document.getElementById('oracle-quick-input');
    const text = quickInput.value.trim();

    if (text) {
        openScene(text);
        quickInput.value = ""; // Очищаем поле
    } else {
        alert("Сначала введи вопрос, Архитектор!");
    }
}

// 2. ОТКРЫТИЕ СЦЕНЫ И ЗАПРОС
async function openScene(query) {
    const scene = document.getElementById('oracle-scene');
    const answerElem = document.getElementById('scene-answer');
    const titleElem = document.getElementById('scene-text');

    scene.classList.remove('scene-hidden');
    titleElem.innerText = "Оракул обрабатывает вопрос...";
    answerElem.innerText = "● ● ●";

    try {
        const res = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        titleElem.innerText = "Ответ Оракула:";
        answerElem.innerText = data.answer;
        
        // Автоматически сохраняем и в обычную историю чата
        saveToHistory('user', query);
        saveToHistory('ai', data.answer);
        
    } catch (err) {
        answerElem.innerText = "Связь со Сценой прервана.";
    }
}

function closeScene() {
    document.getElementById('oracle-scene').classList.add('scene-hidden');
}

// --- ОСТАЛЬНАЯ ЛОГИКА (Обычный чат) ---
function toggleAI() {
    document.getElementById('ai-interface').classList.toggle('ai-hidden');
}

// (Тут твои старые функции sendMessage, saveToHistory, loadChat и Drag&Drop)
// Обязательно оставь их, чтобы работал и обычный виджет!
