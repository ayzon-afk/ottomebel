/* Шапка: фон при скролле, скрытие вниз, мобильное меню, активный пункт */
OTTO.header = {
  init() {
    const header = OTTO.$('#header');
    const burger = OTTO.$('#burger');
    const nav = OTTO.$('#nav');
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      const goingDown = y > lastY && y > 500;
      header.classList.toggle('is-hidden', goingDown && !nav.classList.contains('is-open'));
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const toggleMenu = (open) => {
      nav.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      header.classList.toggle('nav-open', open);
      OTTO.lockScroll(open);
    };
    burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('is-open')));
    OTTO.$$('a', nav).forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

    // подсветка текущего раздела
    const links = OTTO.$$('.nav__link');
    const sections = links.map((l) => OTTO.$(l.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }
};
