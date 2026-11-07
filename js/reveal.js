/* Появление блоков при скролле с каскадной задержкой */
OTTO.reveal = {
  init() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // каскад для соседей в одном родителе
    const groups = new Map();
    OTTO.$$('.reveal-up').forEach((el) => {
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 6) * 0.08}s`)));

    // элементы первого экрана появляются после прелоадера
    const heroEls = OTTO.$$('.hero .reveal-up');
    document.addEventListener('otto:ready', () => heroEls.forEach((el) => el.classList.add('is-in')));

    OTTO.$$('.reveal-up').filter((el) => !heroEls.includes(el)).forEach((el) => io.observe(el));
  }
};
