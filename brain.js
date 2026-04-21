// НОВАЯ СВЯЗЬ С БАЗОЙ ТИТАНОВ
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxKenIhLwA01J2Wr2SG6BSc9wDx4FDz1uCxom9KXMBh7ghg5S2UYjCso3dC-mxe75z79A/exec"; // Саня, вставь сюда верный URL!

async function fetchBrainData() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        if (!response.ok) throw new Error('Связь с Таблицей разорвана!');
        const data = await response.json();
        console.log("ОТК Мурзик: Данные из Таблицы получены!");
        return data;
    } catch (error) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА:", error);
        // Резервный режим, если ссылка всё равно подведёт
        return { status: "offline", message: "Работаем на локальных нейронах" };
    }
}
