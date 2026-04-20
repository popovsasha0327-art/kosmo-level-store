const SCRIPT_URL = "ТВОЙ_URL";

window.onload = () => {
    // Проверяем имя
    let user = localStorage.getItem('titan_name') || prompt("Имя оператора:");
    if (user) localStorage.setItem('titan_name', user);

    const card = document.getElementById('oracle-window');
    
    // Восстанавливаем позицию
    const x = localStorage.getItem('ox'), y = localStorage.getItem('oy');
    if (x && y) { 
        card.style.left = x; card.style.top = y; 
        card.style.bottom = 'auto'; card.style.right = 'auto'; 
    }

    // ВАЖНО: Окно закрыто по умолчанию, если не было открыто ранее
    if (localStorage.getItem('open') === 'true') card.classList.add('active');
};

function toggleOracle() {
    const card = document.getElementById('oracle-window');
    card.classList.toggle('active');
    localStorage.setItem('open', card.classList.contains('active'));
}

// ПЕРЕТАСКИВАНИЕ (ФИКС)
const card = document.getElementById('oracle-window');
const bar = document.querySelector('.top-bar');
let drag = false, ox, oy;

bar.onmousedown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    drag = true;
    ox = e.clientX - card.offsetLeft;
    oy = e.clientY - card.offsetTop;
    card.style.transition = 'none';
};

document.onmousemove = (e) => {
    if (!drag) return;
    let l = e.clientX - ox + 'px', t = e.clientY - oy + 'px';
    card.style.left = l; card.style.top = t;
    card.style.bottom = 'auto'; card.style.right = 'auto';
    localStorage.setItem('ox', l); localStorage.setItem('oy', t);
};

document.onmouseup = () => { drag = false; card.style.transition = '0.4s'; };
