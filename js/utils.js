/* Общие помощники */
window.OTTO = window.OTTO || {};

OTTO.$ = (sel, root = document) => root.querySelector(sel);
OTTO.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* 12500000 -> "12 500 000" */
OTTO.formatSum = (n) => Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');

OTTO.store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('otto:' + key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('otto:' + key, JSON.stringify(value)); } catch (e) { /* хранилище недоступно */ }
  }
};

OTTO.toast = (() => {
  let timer;
  return (text) => {
    const el = OTTO.$('#toast');
    if (!el) return;
    el.textContent = text;
    el.classList.add('is-show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('is-show'), 2200);
  };
})();

/* Плавно анимирует число в элементе */
OTTO.animateNumber = (el, to, duration = 600) => {
  const from = Number(el.dataset.current || 0);
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = OTTO.formatSum(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
    else el.dataset.current = to;
  };
  requestAnimationFrame(step);
};

/* Блокировка прокрутки для модалок */
OTTO.lockScroll = (on) => document.body.classList.toggle('is-locked', on);

/* Подставляет тему заявки в форму и скроллит к ней */
OTTO.prefillLead = (topic, comment) => {
  const select = OTTO.$('#lfTopic');
  const msg = OTTO.$('#lfMsg');
  if (select && topic) {
    const match = Array.from(select.options).find((o) => topic.toLowerCase().includes(o.textContent.toLowerCase().slice(0, 5)));
    if (match) select.value = match.value;
  }
  if (msg && comment) msg.value = comment;
};
