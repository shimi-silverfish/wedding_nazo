// =========================
// 紙吹雪エフェクト
// =========================
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  const confettis = [];
  const duration = 4000; // 2秒でフェードアウト
  const startTime = performance.now();

  for (let i = 0; i < 100; i++) {
    confettis.push({
      x: Math.random() * w,
      y: Math.random() * h - h,
      r: Math.random() * 6 + 4,
      d: Math.random() * 0.8 + 0.5,
      color: `hsl(${Math.random() * 100 + 80}, 70%, 70%)`,
      alpha: 1 // 初期透明度
    });
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);

    const elapsed = now - startTime;
    const fade = 1 - Math.min(elapsed / duration, 1); // 0〜1のフェード値

    confettis.forEach(c => {
      ctx.fillStyle = `rgba(${hslToRgb(c.color)}, ${fade})`;
      ctx.fillRect(c.x, c.y, c.r, c.r);

      c.y += c.d * 4;
      c.x += Math.sin(c.y * 0.02);
      if (c.y > h) c.y = -10;
    });

    if (fade > 0) {
      requestAnimationFrame(draw); // α>0なら描画続行
    }
  }

  // HSL色をRGBに変換（rgba用）
  function hslToRgb(hsl) {
    const [h, s, l] = hsl.match(/\d+/g).map(Number);
    const a = s / 100 * Math.min(l / 100, 1 - l / 100);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l/100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(color * 255);
    };
    return `${f(0)},${f(8)},${f(4)}`;
  }

  requestAnimationFrame(draw);
}


// =========================
// ページロード時の処理
// =========================
document.addEventListener('DOMContentLoaded', () => {
  startConfetti(); // 紙吹雪開始

  // ヒントボタン
  const hintBtn = document.getElementById('hintButton');
  const hintText = document.getElementById('hintText');
  if (hintBtn && hintText) {
    hintBtn.addEventListener('click', () => {
      hintText.classList.toggle('hidden');
    });
  }
});
