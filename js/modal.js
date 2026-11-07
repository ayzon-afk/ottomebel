/* Модалка товара: фото, примерка цвета фасада, характеристики, листание */
OTTO.modal = {
  list: [],
  index: 0,
  color: null,

  init() {
    this.el = OTTO.$('#productModal');
    OTTO.$$('[data-close]', this.el).forEach((b) => b.addEventListener('click', () => this.close()));
    OTTO.$('#mPrev').addEventListener('click', () => this.show(this.index - 1));
    OTTO.$('#mNext').addEventListener('click', () => this.show(this.index + 1));
    OTTO.$('#mFav').addEventListener('click', () => {
      const on = OTTO.favorites.toggle(this.current().id);
      OTTO.$('#mFav').classList.toggle('is-on', on);
    });
    OTTO.$('#mOrder').addEventListener('click', () => {
      const p = this.current();
      const colorName = OTTO.colors[this.color][OTTO.i18n.lang];
      OTTO.prefillLead('Кухня', `Модель «${p.name}», цвет фасада: ${colorName}`);
      this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('is-open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.show(this.index + 1);
      if (e.key === 'ArrowLeft') this.show(this.index - 1);
    });
    document.addEventListener('otto:lang', () => { if (this.el.classList.contains('is-open')) this.show(this.index); });
  },

  current() { return this.list[this.index]; },

  open(id, list) {
    this.list = list && list.length ? list : OTTO.products;
    this.lastFocus = document.activeElement;
    this.show(this.list.findIndex((p) => p.id === id));
    this.el.classList.add('is-open');
    this.el.setAttribute('aria-hidden', 'false');
    OTTO.lockScroll(true);
    setTimeout(() => OTTO.$('.modal__close', this.el).focus(), 50);
  },

  close() {
    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    OTTO.lockScroll(false);
    if (this.lastFocus) this.lastFocus.focus({ preventScroll: true });
  },

  show(i) {
    const n = this.list.length;
    this.index = (i + n) % n;
    const p = this.current();
    const lang = OTTO.i18n.lang;
    const img = OTTO.$('#mImg');

    img.style.opacity = 0;
    setTimeout(() => { img.src = p.img; img.alt = p.name; img.onload = () => (img.style.opacity = 1); }, 150);

    OTTO.$('#mTitle').textContent = p.name;
    OTTO.$('#mStyle').textContent = `${OTTO.styles[p.style][lang]} · ${OTTO.layouts[p.layout][lang]}`;
    OTTO.$('#mFav').classList.toggle('is-on', OTTO.favorites.has(p.id));

    // палитра: родной цвет модели + варианты из карточки на сайте OTTO
    const palette = [...new Set([p.color, 'white', 'oak', 'wood', 'grey', 'graphite', 'green'])];
    this.color = p.color;
    const wrap = OTTO.$('#mColors');
    wrap.innerHTML = palette.map((c) => `
      <button type="button" data-c="${c}" class="${c === p.color ? 'is-active' : ''}">
        <i style="background:${OTTO.colors[c].hex}"></i>${OTTO.colors[c][lang]}
      </button>`).join('');
    OTTO.$('.modal__media').style.setProperty('--tint', 'transparent');
    OTTO.$$('button', wrap).forEach((b) => b.addEventListener('click', () => {
      OTTO.$$('button', wrap).forEach((x) => x.classList.toggle('is-active', x === b));
      this.color = b.dataset.c;
      const tint = b.dataset.c === p.color ? 'transparent' : OTTO.colors[b.dataset.c].tint;
      OTTO.$('.modal__media').style.setProperty('--tint', tint);
    }));

    OTTO.$('#mSpecs').innerHTML = OTTO.specs[lang].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  }
};
