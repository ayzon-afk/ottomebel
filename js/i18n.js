/* Переключение языка RU / UZ */
OTTO.i18n = (() => {
  const ru = {};
  let lang = 'ru';

  function init() {
    OTTO.$$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!(key in ru)) ru[key] = el.innerHTML;
    });
    Object.assign(ru, OTTO.ruDyn);

    OTTO.$$('.lang__btn').forEach((btn) => btn.addEventListener('click', () => set(btn.dataset.lang)));

    const saved = OTTO.store.get('lang', 'ru');
    if (saved !== 'ru') set(saved, true);
  }

  function t(key) {
    const dict = lang === 'uz' ? OTTO.uz : ru;
    return dict[key] != null ? dict[key] : (ru[key] || key);
  }

  function set(next, silent) {
    if (next === lang) return;
    lang = next;
    document.documentElement.lang = lang;
    OTTO.$$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    OTTO.$$('.lang__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    OTTO.store.set('lang', lang);
    document.dispatchEvent(new CustomEvent('otto:lang', { detail: { lang, silent } }));
  }

  return { init, t, set, get lang() { return lang; } };
})();
