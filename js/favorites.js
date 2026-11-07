/* Избранное: хранится в браузере, счётчик в шапке, боковая панель */
OTTO.favorites = {
  ids: [],

  init() {
    this.ids = OTTO.store.get('fav', []);
    this.drawer = OTTO.$('#favDrawer');
    OTTO.$('#favOpen').addEventListener('click', () => this.open(true));
    OTTO.$$('[data-fav-close]', this.drawer).forEach((b) => b.addEventListener('click', () => this.open(false)));
    OTTO.$('#favSend').addEventListener('click', () => {
      const names = this.ids.map((id) => OTTO.products.find((p) => p.id === id)?.name).filter(Boolean);
      OTTO.prefillLead('Кухня', names.length ? 'Интересуют модели: ' + names.join(', ') : '');
      this.open(false);
    });
    document.addEventListener('otto:lang', () => this.render());
    this.render();
  },

  has(id) { return this.ids.includes(id); },

  toggle(id) {
    const on = !this.has(id);
    this.ids = on ? [...this.ids, id] : this.ids.filter((x) => x !== id);
    OTTO.store.set('fav', this.ids);
    OTTO.toast(OTTO.i18n.t(on ? 'js.favAdd' : 'js.favDel'));
    const btn = OTTO.$('#favOpen');
    btn.classList.remove('is-bump'); void btn.offsetWidth; btn.classList.add('is-bump');
    this.render();
    document.dispatchEvent(new CustomEvent('otto:fav', { detail: { id, on } }));
    return on;
  },

  open(on) {
    this.drawer.classList.toggle('is-open', on);
    this.drawer.setAttribute('aria-hidden', String(!on));
    OTTO.lockScroll(on);
  },

  render() {
    const count = OTTO.$('#favCount');
    count.textContent = this.ids.length;
    count.classList.toggle('has-items', this.ids.length > 0);

    const list = OTTO.$('#favList');
    const items = this.ids.map((id) => OTTO.products.find((p) => p.id === id)).filter(Boolean);
    if (!items.length) {
      list.innerHTML = `<p class="drawer__empty">${OTTO.i18n.t('js.favEmpty')}</p>`;
      return;
    }
    const lang = OTTO.i18n.lang;
    list.innerHTML = items.map((p) => `
      <div class="fav-item">
        <img src="${p.img}" alt="${p.name}">
        <div><b>${p.name}</b><small>${OTTO.styles[p.style][lang]}</small></div>
        <button data-del="${p.id}" aria-label="Удалить">✕</button>
      </div>`).join('');
    OTTO.$$('[data-del]', list).forEach((b) => b.addEventListener('click', () => this.toggle(b.dataset.del)));
  }
};
