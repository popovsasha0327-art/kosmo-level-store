// Ждем загрузки всей оболочки
document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.getElementById('cookie-popup');
    
    // Показываем Cookie через 2 секунды (плавно)
    setTimeout(() => {
        cookiePopup.classList.add('show');
    }, 2000);
});

// ПРИНЯТЬ COOKIES
function acceptCookies() {
    document.getElementById('cookie-popup').classList.remove('show');
    console.log("Посейдон запомнил тебя, Титан!");
    // Тут можно добавить сохранение в localStorage
}

// РЕЖИМ МАМОНТА
function triggerMammoth() {
    const lockScreen = document.getElementById('lock-screen');
    const cookiePopup = document.getElementById('cookie-popup');
    
    cookiePopup.classList.remove('show');
    lockScreen.classList.remove('hidden');
    
    // Выводим Котэ с Картошкой
    document.querySelector('.mammoth-content').innerHTML = `
        <h1 style="color: #ff3b30;">МАМОНТАМ ВХОД ЗАПРЕЩЕН</h1>
        <p>Докажи, что ты не мамонт. Почисти картошку с Мурзиком.</p>
        <img src="https://via.placeholder.com/200?text=КОТ+И+КАРТОШКА" style="margin-top:20px; border-radius:20px;">
    `;
}
