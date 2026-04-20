const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp1JFtNyqiy2-O4MSn0ZIowgGLURTg7MXefYuV2ev1YKRr4nv6yUNGuPd55Km9gFDy4g/exec";

window.onload = () => {
    const card = document.getElementById('oracle-window');
    // Сброс состояния, чтобы не открывалось само
    card.classList.remove('active');
    
    // Восстанавливаем позицию
    const x = localStorage.getItem('ox'), y = localStorage.getItem('oy');
    if (x && y) { 
        card.style.left = x; card.style.top = y; 
        card.style.bottom = 'auto'; card.style.right = 'auto'; 
    }
};

function toggleOracle() { 
    const card = document.getElementById('oracle-window');
    card.classList.toggle('active'); 
}

// ПЕРЕТАСКИВАНИЕ (РАБОЧЕЕ)
const card = document.getElementById('oracle-window');
const bar = document.querySelector('.top-bar');
let drag = false, sx, sy;

bar.onmousedown = (e) => {
    drag = true;
    sx = e.clientX - card.offsetLeft;
    sy = e.clientY - card.offsetTop;
    card.style.transition = 'none';
};

document.onmousemove = (e) => {
    if (!drag) return;
    let l = (e.clientX - sx) + 'px', t = (e.clientY - sy) + 'px';
    card.style.left = l; card.style.top = t;
    card.style.bottom = 'auto'; card.style.right = 'auto';
    localStorage.setItem('ox', l); localStorage.setItem('oy', t);
};

document.onmouseup = () => { drag = false; card.style.transition = '0.4s'; };
