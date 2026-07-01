// ========== CLOUD ANIMATION (SAMA DENGAN DEMON PS) ==========
(function() {
  const layer = document.querySelector('.cloud-layer');
  if (!layer) return;

  const MAX_ACTIVE = 2;
  const RESPAWN_MIN = 500;
  const RESPAWN_MAX = 1000;
  const WIDTH_MIN = 120;
  const WIDTH_MAX = 200;
  const SCALE_MIN = 0.75;
  const SCALE_MAX = 0.95;
  const DURATION_MIN = 32;
  const DURATION_MAX = 48;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawnCloud() {
    if (layer.querySelectorAll('.cloud').length >= MAX_ACTIVE) return;

    const el = document.createElement('div');
    el.className = 'cloud';

    const dir = Math.random() < 0.5 ? 'rtl' : 'ltr';
    el.classList.add(`cloud--${dir}`);

    const w = Math.round(rand(WIDTH_MIN, WIDTH_MAX));
    const scale = +rand(SCALE_MIN, SCALE_MAX).toFixed(2);
    el.style.width = w + 'px';
    el.style.setProperty('--scale', scale);
    el.style.opacity = rand(0.55, 0.85).toFixed(2);
    el.style.setProperty('--wx', Math.round(w * scale) + 'px');
    const top = Math.round(rand(20, 120));
    el.style.top = top + 'px';
    const dur = rand(DURATION_MIN, DURATION_MAX).toFixed(2);
    el.style.setProperty('--dur', dur + 's');

    layer.appendChild(el);

    el.addEventListener('animationend', () => {
      el.remove();
      setTimeout(spawnCloud, rand(RESPAWN_MIN, RESPAWN_MAX));
    });
  }

  for (let i = 0; i < MAX_ACTIVE; i++) {
    setTimeout(spawnCloud, i * 600);
  }

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      const need = MAX_ACTIVE - layer.querySelectorAll('.cloud').length;
      for (let i = 0; i < need; i++) setTimeout(spawnCloud, i * 300);
    }, 200);
  });
})();

// ========== NOTIFICATION ==========
function showNotification(msg, type = 'success') {
  const notif = document.getElementById('notification');
  notif.textContent = msg;
  notif.style.background = type === 'error' ? 'rgba(200,0,0,0.9)' : 'rgba(30,0,0,0.9)';
  notif.style.opacity = '1';
  notif.style.transform = 'translateY(0)';
  clearTimeout(window.notifTimer);
  window.notifTimer = setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transform = 'translateY(20px)';
  }, 2500);
}

// ========== FUNCTIONS ==========
function copyHost() {
  const hostText = `91.134.85.13 growtopia1.com
91.134.85.13 growtopia2.com
91.134.85.13 www.growtopia1.com
91.134.85.13 www.growtopia2.com`;

  navigator.clipboard.writeText(hostText)
    .then(() => showNotification('✅ IP & Domain disalin!'))
    .catch(() => showNotification('❌ Gagal menyalin', 'error'));
}

function downloadHost() {
  const text = document.getElementById('hostText').value.trim() + '\n';
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'host.txt';
  a.click();
  showNotification('📥 Host file terdownload');
}

function copyPowerTunnelURL() {
  const url = "https://soulps.vercel.app/ptunnel.txt";
  navigator.clipboard.writeText(url)
    .then(() => showNotification('🔗 PowerTunnel URL disalin!'))
    .catch(() => showNotification('Gagal', 'error'));
}

function copyIOS() {
  const url = "https://soulps.vercel.app/ios.txt";
  navigator.clipboard.writeText(url)
    .then(() => showNotification('🍎 iOS URL disalin!'))
    .catch(() => showNotification('Gagal', 'error'));
}
