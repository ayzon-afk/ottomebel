/* «Как мы работаем»: линия заполняется по мере прокрутки, шаги загораются */
OTTO.process = {
  init() {
    const wrap = OTTO.$('#steps');
    const fill = OTTO.$('#stepsFill');
    const steps = OTTO.$$('.step', wrap);
    const vertical = () => window.matchMedia('(max-width: 900px)').matches;

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.2)));
      if (vertical()) { fill.style.height = progress * 100 + '%'; fill.style.width = '100%'; }
      else { fill.style.width = progress * 100 + '%'; fill.style.height = '100%'; }
      const active = Math.ceil(progress * steps.length);
      steps.forEach((s, i) => s.classList.toggle('is-active', i < active));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
};
