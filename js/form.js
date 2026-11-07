/* Форма заявки: маска +998, проверка, анимация успеха.
   В рабочей версии здесь отправка в Telegram-бот / CRM. */
OTTO.form = {
  init() {
    const form = OTTO.$('#leadForm');
    const phone = OTTO.$('#lfPhone');
    const name = OTTO.$('#lfName');

    phone.addEventListener('focus', () => { if (!phone.value) phone.value = '+998 '; });
    phone.addEventListener('input', () => {
      let d = phone.value.replace(/\D/g, '');
      if (!d.startsWith('998')) d = '998' + d;
      d = d.slice(0, 12);
      const p = [d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean);
      phone.value = '+998 ' + p.join(' ');
      if (d.length === 12) phone.closest('.field').classList.remove('is-error');
    });
    name.addEventListener('input', () => { if (name.value.trim().length > 1) name.closest('.field').classList.remove('is-error'); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const okName = name.value.trim().length > 1;
      const okPhone = phone.value.replace(/\D/g, '').length === 12;
      name.closest('.field').classList.toggle('is-error', !okName);
      phone.closest('.field').classList.toggle('is-error', !okPhone);
      if (!okName) return name.focus();
      if (!okPhone) return phone.focus();

      const btn = OTTO.$('button[type="submit"]', form);
      btn.classList.add('is-loading');
      setTimeout(() => {
        btn.classList.remove('is-loading');
        form.classList.add('is-sent');
      }, 900);
    });

    OTTO.$('#lfAgain').addEventListener('click', () => {
      form.reset();
      form.classList.remove('is-sent');
    });
  }
};
