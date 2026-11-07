/* Точка входа: порядок важен — язык первым */
document.addEventListener('DOMContentLoaded', () => {
  OTTO.i18n.init();
  OTTO.header.init();
  OTTO.hero.init();
  OTTO.galleryUI.init();   // до reveal — карточки галереи тоже анимируются
  OTTO.reveal.init();
  OTTO.counters.init();
  OTTO.favorites.init();
  OTTO.catalog.init();
  OTTO.modal.init();
  OTTO.calculator.init();
  OTTO.process.init();
  OTTO.promo.init();
  OTTO.form.init();
  OTTO.floating.init();
  OTTO.preloader.init();
});
