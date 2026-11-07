/* Счётчики цифр на первом экране */
OTTO.counters = {
  init() {
    document.addEventListener('otto:ready', () => {
      OTTO.$$('.count').forEach((el, i) => {
        const to = Number(el.dataset.to);
        const start = performance.now() + i * 120;
        const dur = 1400;
        const tick = (now) => {
          const t = Math.max(0, Math.min(1, (now - start) / dur));
          el.textContent = Math.round(to * (1 - Math.pow(1 - t, 4)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
  }
};
