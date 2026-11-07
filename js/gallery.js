/* Портфолио: masonry-сетка и лайтбокс со свайпом */
OTTO.galleryUI = {
  index: 0,

  init() {
    const items = OTTO.gallery;
    const wrap = OTTO.$('#masonry');
    wrap.innerHTML = items.map((g, i) => `
      <button class="masonry__item reveal-up" data-i="${i}" data-cap="${g.cap}">
        <img src="${g.img}" alt="${g.cap}" loading="lazy">
      </button>`).join('');
    OTTO.$$('.masonry__item', wrap).forEach((b) => b.addEventListener('click', () => this.open(Number(b.dataset.i))));

    this.lb = OTTO.$('#lightbox');
    OTTO.$('[data-lb-close]', this.lb).addEventListener('click', () => this.close());
    OTTO.$('#lbPrev').addEventListener('click', () => this.show(this.index - 1));
    OTTO.$('#lbNext').addEventListener('click', () => this.show(this.index + 1));
    this.lb.addEventListener('click', (e) => { if (e.target === this.lb) this.close(); });

    document.addEventListener('keydown', (e) => {
      if (!this.lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.show(this.index + 1);
      if (e.key === 'ArrowLeft') this.show(this.index - 1);
    });

    let startX = 0;
    this.lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    this.lb.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) this.show(this.index + (dx < 0 ? 1 : -1));
    });
  },

  open(i) {
    this.show(i);
    this.lb.classList.add('is-open');
    this.lb.setAttribute('aria-hidden', 'false');
    OTTO.lockScroll(true);
  },

  close() {
    this.lb.classList.remove('is-open');
    this.lb.setAttribute('aria-hidden', 'true');
    OTTO.lockScroll(false);
  },

  show(i) {
    const n = OTTO.gallery.length;
    this.index = (i + n) % n;
    const g = OTTO.gallery[this.index];
    const img = OTTO.$('#lbImg');
    img.style.opacity = 0;
    setTimeout(() => { img.src = g.img; img.alt = g.cap; img.onload = () => (img.style.opacity = 1); }, 120);
    OTTO.$('#lbCap').textContent = `${g.cap} · ${this.index + 1} / ${n}`;
  }
};
