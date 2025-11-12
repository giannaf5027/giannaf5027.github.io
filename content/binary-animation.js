// binary background animation (vanilla JS port of binaryAnimation.tsx)
(function () {
  const canvas = document.getElementById('binaryCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Include original-language characters (Spanish/Greek) to showcase multilingual support
  const binary = [
    '0', '1'
  ];

  const themeColors = ['#31b3f0', ' #44dbb5', '#31b3f0', '#111f7a', '#38ccf9', '#4386e9']

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  let symbols = [];
  let frame = 0;
  // start in stopped state so startAnimation() will schedule the loop correctly
  let running = false;
  const MIN_WIDTH = 600; // below this width the animation will be disabled for performance/readability

  function resizeCanvas() {
    // compute size from parent container so images/content-driven height is respected
    const parent = canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;
    // defensive fallback to ensure non-zero dimensions
    canvas.width = Math.max(1, Math.floor(w));
    canvas.height = Math.max(1, Math.floor(h));
    console.debug('binaryAnim: resizeCanvas', { w: canvas.width, h: canvas.height, parentHeight: rect.height, innerWidth: window.innerWidth });
    // toggle running state based on available width
    if (window.innerWidth < MIN_WIDTH) {
      stopAnimation();
    } else {
      initSymbols();
      startAnimation();
    }
  }

  function startAnimation(){
    if (running) return; // already running
    running = true;
    frame = requestAnimationFrame(animate);
  }

  function stopAnimation(){
    running = false;
    cancelAnimationFrame(frame);
    // clear canvas so hidden remnants don't remain
    if (ctx) ctx.clearRect(0,0,canvas.width, canvas.height);
  }

  function initSymbols() {
    symbols = [];
    const count = Math.max(20, Math.floor(canvas.width / 5));
    console.debug('binaryAnim: initSymbols count', count);
    for (let i = 0; i < count; i++) {
      const color = themeColors[i % themeColors.length];
      symbols.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 14 + Math.random() * 24,
        symbol: binary[Math.floor(Math.random() * binary.length)],
        opacity: 0.12 + Math.random() * 0.5,
        speed: 0.25 + Math.random() * 1.25,
        color,
      });
    }
  }

  function animate() {
    if (!ctx || !running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    symbols.forEach((symbol) => {
      symbol.y += symbol.speed;
      symbol.rotation += symbol.rotationSpeed;
      if (symbol.y - symbol.size > canvas.height) {
        symbol.y = -symbol.size;
        symbol.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(symbol.x, symbol.y);
      ctx.rotate(symbol.rotation);
      ctx.font = `${symbol.size}px sans-serif`;
      ctx.fillStyle = `rgba(${hexToRgb(symbol.color)}, ${symbol.opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(symbol.symbol), 0, 0);
      ctx.restore();
    });

    frame = requestAnimationFrame(animate);
  }

  // init
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  // ensure canvas is sized after images and other resources load
  window.addEventListener('load', resizeCanvas);
  // fallback: sometimes images load after load or dynamically; re-resize shortly after init
  setTimeout(resizeCanvas, 350);
  // attach load listeners to images inside the same container (if present)
  try {
    const container = canvas.parentElement;
    if (container) {
      const imgs = container.querySelectorAll('img');
      imgs.forEach(img => {
        if (!img.complete) img.addEventListener('load', resizeCanvas);
      });
    }
  } catch (e) {
    // ignore
  }
  // listen for visibility change to pause animation when tab not visible
  document.addEventListener('visibilitychange', function(){
    if (document.hidden) stopAnimation(); else if (window.innerWidth >= MIN_WIDTH) startAnimation();
  });

  // cleanup on unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resizeCanvas);
  });
})();
