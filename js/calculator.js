/* Калькулятор кухни. ДЕМО-цены: в рабочей версии берутся из админ-панели */
OTTO.calculator = {
  PRICES: {
    perMeter: { mdf: 4200000, veneer: 6300000, solid: 8800000 },   // фасады + корпус, сум за пог. метр
    topPerMeter: { ldsp: 450000, quartz: 2600000 },                // столешница, сум за пог. метр
    layoutK: { straight: 1, corner: 1.12, u: 1.2, island: 1.15 },
    island: 9500000,                                                 // остров, фикс.
    led: 1200000,
    tall: 3800000,
    installmentMonths: 12
  },

  state: { layout: 'straight', len: 3.5, facade: 'mdf', top: 'ldsp', led: false, tall: false },

  init() {
    const form = OTTO.$('#calcForm');
    const range = OTTO.$('#lenRange');

    OTTO.$$('input[name="layout"]', form).forEach((r) => r.addEventListener('change', () => { this.state.layout = r.value; this.update(); }));
    range.addEventListener('input', () => { this.state.len = Number(range.value); this.update(); });
    OTTO.$$('.seg', form).forEach((seg) => {
      OTTO.$$('.seg__btn', seg).forEach((btn) => btn.addEventListener('click', () => {
        OTTO.$$('.seg__btn', seg).forEach((b) => b.classList.toggle('is-active', b === btn));
        this.state[seg.dataset.name] = btn.dataset.value;
        this.update();
      }));
    });
    OTTO.$('#optLed').addEventListener('change', (e) => { this.state.led = e.target.checked; this.update(); });
    OTTO.$('#optTall').addEventListener('change', (e) => { this.state.tall = e.target.checked; this.update(); });

    OTTO.$('#calcSend').addEventListener('click', () => {
      const s = this.state;
      const labels = { straight: 'прямая', corner: 'угловая', u: 'П-образная', island: 'с островом' };
      const fac = { mdf: 'МДФ', veneer: 'шпон', solid: 'массив' };
      const top = { ldsp: 'ЛДСП 38 мм', quartz: 'кварц 20 мм' };
      OTTO.prefillLead('Кухня', `Расчёт: ${labels[s.layout]}, ${s.len} м, фасады ${fac[s.facade]}, столешница ${top[s.top]}${s.led ? ', LED' : ''}${s.tall ? ', пенал' : ''} — ≈ ${OTTO.formatSum(this.total())} сум`);
    });

    this.update();
  },

  total() {
    const P = this.PRICES, s = this.state;
    let sum = s.len * (P.perMeter[s.facade] + P.topPerMeter[s.top]) * P.layoutK[s.layout];
    if (s.layout === 'island') sum += P.island;
    if (s.led) sum += P.led;
    if (s.tall) sum += P.tall;
    return Math.round(sum / 100000) * 100000;
  },

  update() {
    const range = OTTO.$('#lenRange');
    const pct = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty('--p', pct + '%');
    OTTO.$('#lenOut').textContent = `${this.state.len} м`;

    const total = this.total();
    OTTO.animateNumber(OTTO.$('#calcPrice'), total);
    OTTO.animateNumber(OTTO.$('#calcMonthly'), Math.round(total / this.PRICES.installmentMonths / 1000) * 1000);
  }
};
