const deviceLabel = document.getElementById('deviceLabel');
const modeInfo = document.getElementById('modeInfo');
const playBtn = document.getElementById('playBtn');
const videoInput = document.getElementById('videoInput');
const playerFrame = document.getElementById('playerFrame');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function detectDevice() {
  const ua = navigator.userAgent.toLowerCase();
  const w = window.innerWidth;

  if (ua.includes('android tv') || ua.includes('smart-tv') || ua.includes('tizen')) {
    return 'tv';
  }
  if (/android|iphone|ipad|ipod/.test(ua) || w < 768) {
    return 'mobile';
  }
  return 'pc';
}

function applyLayout(device) {
  const app = document.getElementById('app');
  app.classList.remove('layout-pc', 'layout-mobile', 'layout-tv');

  if (device === 'tv') {
    app.classList.add('layout-tv');
    deviceLabel.textContent = 'TV Edition · Режим дивана';
    modeInfo.textContent = 'Режим: TV Edition · крупные кнопки · 480p Jacuzzi Mode';
  } else if (device === 'mobile') {
    app.classList.add('layout-mobile');
    deviceLabel.textContent = 'Mobile Edition';
    modeInfo.textContent = 'Режим: Mobile Edition · оптимизировано для деда 3.0';
  } else {
    app.classList.add('layout-pc');
    deviceLabel.textContent = 'PC Edition';
    modeInfo.textContent = 'Режим: PC Edition · 480p Jacuzzi Mode';
  }
}

function buildYoutubeUrl(input) {
  input = input.trim();
  if (!input) return '';

  // Если вставили полный URL
  if (input.includes('youtube.com') || input.includes('youtu.be')) {
    try {
      const url = new URL(input);
      if (url.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${url.pathname.slice(1)}?vq=medium`;
      }
      const id = url.searchParams.get('v');
      if (id) {
        return `https://www.youtube.com/embed/${id}?vq=medium`;
      }
    } catch (e) {
      console.warn('URL parse error', e);
    }
  }

  // Если вставили только ID
  return `https://www.youtube.com/embed/${input}?vq=medium`;
}

playBtn.addEventListener('click', () => {
  const url = buildYoutubeUrl(videoInput.value);
  if (!url) return;
  playerFrame.src = url;
});

videoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    playBtn.click();
  }
});

themeToggle.addEventListener('click', () => {
  const dark = body.classList.toggle('theme-dark');
  themeToggle.textContent = dark ? '🌙 Тёмная' : '☀ Светлая';
});

const device = detectDevice();
applyLayout(device);
