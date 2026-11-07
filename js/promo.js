/* Таймер акции — до конца текущего месяца */
OTTO.promo = {
  init() {
    const box = OTTO.$('#countdown');
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
    const cells = { d: OTTO.$('[data-cd="d"]', box), h: OTTO.$('[data-cd="h"]', box), m: OTTO.$('[data-cd="m"]', box), s: OTTO.$('[data-cd="s"]', box) };
    const pad = (n) => String(n).padStart(2, '0');

    const tick = () => {
      let diff = Math.max(0, end - new Date());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      cells.d.textContent = pad(d); cells.h.textContent = pad(h); cells.m.textContent = pad(m); cells.s.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);

    OTTO.$$('[data-topic]').forEach((el) => el.addEventListener('click', () => OTTO.prefillLead(el.dataset.topic, el.dataset.topic.startsWith('Акция') ? el.dataset.topic : '')));
  }
};
