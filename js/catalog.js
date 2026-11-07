/* Каталог: фильтры по стилю и цвету, карточки */
OTTO.catalog = {
  style: 'all',
  color: 'all',
  visible: [],

  init() {
    this.grid = OTTO.$('#catalogGrid');

    OTTO.$$('#filters .chip').forEach((chip) => chip.addEventListener('click', () => {
      OTTO.$$('#filters .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      this.style = chip.dataset.filter;
      this.render();
    }));

    OTTO.$$('#colorFilters .swatch').forEach((sw) => sw.addEventListener('click', () => {
      OTTO.$$('#colorFilters .swatch').forEach((s) => s.classList.toggle('is-active', s === sw));
      this.color = sw.dataset.color;
      this.render();
    }));

    // клик по карточке → модалка, по сердцу → избранное
    this.grid.addEventListener('click', (e) => {
      const fav = e.target.closest('.card__fav');
      const card = e.target.closest('.card');
      if (!card) return;
      if (fav) {
        e.stopPropagation();
        fav.classList.toggle('is-on', OTTO.favorites.toggle(card.dataset.id));
        return;
      }
      OTTO.modal.open(card.dataset.id, this.visible);
    });
    this.grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('card')) OTTO.modal.open(e.target.dataset.id, this.visible);
    });

    document.addEventListener('otto:lang', () => this.render());
    document.addEventListener('otto:fav', (e) => {
      const btn = OTTO.$(`.card[data-id="${e.detail.id}"] .card__fav`);
      if (btn) btn.classList.toggle('is-on', e.detail.on);
    });
    this.render();
  },

  render() {
    const lang = OTTO.i18n.lang;
    const t = OTTO.i18n.t;
    this.visible = OTTO.products.filter((p) =>
      (this.style === 'all' || p.style === this.style) && (this.color === 'all' || p.color === this.color));
    OTTO.$('#catalogCount').textContent = this.visible.length;

    if (!this.visible.length) {
      this.grid.innerHTML = `<p class="grid__empty">${t('js.empty')}</p>`;
      return;
    }

    this.grid.innerHTML = this.visible.map((p, i) => `
      <article class="card" data-id="${p.id}" tabindex="0" style="--i:${i}">
        <div class="card__media">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <span class="card__badge ${p.hot ? 'card__badge--hot' : ''}">${p.hot ? t('js.hot') : OTTO.styles[p.style][lang]}</span>
          <button class="card__fav ${OTTO.favorites.has(p.id) ? 'is-on' : ''}" aria-label="${t('js.inFav')}">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>
          </button>
          <span class="card__quick">${t('js.more')}</span>
        </div>
        <div class="card__body">
          <div class="card__meta">
            <span>${OTTO.styles[p.style][lang]} · ${OTTO.layouts[p.layout][lang]}</span>
            <span class="card__dots"><i style="background:${OTTO.colors[p.color].hex}"></i></span>
          </div>
          <h3 class="card__title">${p.name}</h3>
          <div class="card__foot">
            <span class="card__price">${this.priceLabel(p.fromPrice)}</span>
            <span class="card__arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </div>
        </div>
      </article>`).join('');
  },

  priceLabel(price) {
    const t = OTTO.i18n.t;
    return OTTO.i18n.lang === 'uz'
      ? `<b>${OTTO.formatSum(price)}</b> ${t('js.perM')}${t('js.from')}`
      : `${t('js.from')} <b>${OTTO.formatSum(price)}</b> ${t('js.perM')}`;
  }
};
