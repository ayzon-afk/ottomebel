/* Прелоадер: прячется после загрузки страницы, но не раньше 1.4 с */
OTTO.preloader = {
  init() {
    const el = OTTO.$('#preloader');
    const minTime = new Promise((r) => setTimeout(r, 1400));
    const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r)));
    const maxWait = new Promise((r) => setTimeout(r, 3500));

    Promise.race([Promise.all([minTime, loaded]), maxWait]).then(() => {
      el.classList.add('is-done');
      document.body.classList.remove('is-loading');
      setTimeout(() => document.body.classList.add('is-ready'), 250);
      document.dispatchEvent(new Event('otto:ready'));
    });
  }
};
