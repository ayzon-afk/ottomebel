/* Первый экран: слайдер с Ken Burns и анимация заголовка по словам */
OTTO.hero = {
  index: 0,
  timer: null,
  DURATION: 6000,

  init() {
    this.slides = OTTO.$$('.hero__slide');
    this.num = OTTO.$('#heroNum');
    this.bar = OTTO.$('#heroBar');
    OTTO.$('#heroNext').addEventListener('click', () => this.go(this.index + 1));
    OTTO.$('#heroPrev').addEventListener('click', () => this.go(this.index - 1));

    this.splitTitle();
    document.addEventListener('otto:lang', () => this.splitTitle(true));
    document.addEventListener('otto:ready', () => this.play());

    // параллакс фона
    const hero = OTTO.$('#hero');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < hero.offsetHeight) OTTO.$('.hero__slides').style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  },

  splitTitle(instant) {
    OTTO.$$('.hero__title .split').forEach((line, li) => {
      const words = line.textContent.trim().split(/\s+/);
      line.innerHTML = words.map((w, i) => `<span class="word" style="--i:${li * 3 + i}">${w}</span>`).join(' ');
    });
    if (instant) document.body.classList.add('is-ready');
  },

  go(i) {
    const n = this.slides.length;
    this.slides[this.index].classList.remove('is-active');
    this.index = (i + n) % n;
    this.slides[this.index].classList.add('is-active');
    this.num.textContent = String(this.index + 1).padStart(2, '0');
    this.play();
  },

  play() {
    clearTimeout(this.timer);
    this.bar.classList.remove('is-run');
    void this.bar.offsetWidth; // перезапуск анимации полосы
    this.bar.classList.add('is-run');
    this.timer = setTimeout(() => this.go(this.index + 1), this.DURATION);
  }
};
