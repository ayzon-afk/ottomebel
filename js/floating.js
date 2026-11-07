/* Плавающие контакты, кнопка «наверх», нижняя панель на мобильных, магнитные кнопки */
OTTO.floating = {
  init() {
    const box = OTTO.$('#floatContacts');
    OTTO.$('#floatToggle').addEventListener('click', () => box.classList.toggle('is-open'));

    const toTop = OTTO.$('#toTop');
    const bar = OTTO.$('.mobile-bar');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      toTop.classList.toggle('is-show', y > 900);
      bar.classList.toggle('is-show', y > 500);
    }, { passive: true });

    // магнитный эффект на крупных кнопках (только мышь)
    if (window.matchMedia('(hover: hover)').matches) {
      OTTO.$$('.magnetic').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.18;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    }
  }
};
