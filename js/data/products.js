/* Каталог кухонь OTTO MEBEL — модели и фото с ottomebel.uz */
window.OTTO = window.OTTO || {};

OTTO.styles = {
  classic: { ru: 'Классика', uz: 'Klassika' },
  neo: { ru: 'Неоклассика', uz: 'Neoklassika' },
  modern: { ru: 'Модерн', uz: 'Zamonaviy' }
};

OTTO.layouts = {
  straight: { ru: 'Прямая', uz: "To'g'ri" },
  corner: { ru: 'Угловая', uz: 'Burchakli' },
  u: { ru: 'П-образная', uz: 'P-shaklli' },
  island: { ru: 'С островом', uz: 'Orolchali' }
};

OTTO.colors = {
  white: { hex: '#F4F1EA', ru: 'Белый', uz: 'Oq', tint: 'transparent' },
  beige: { hex: '#D8C7AD', ru: 'Бежевый', uz: 'Bej', tint: '#e2cfa8' },
  grey: { hex: '#B9BCBF', ru: 'Серый', uz: 'Kulrang', tint: '#9ea3a8' },
  graphite: { hex: '#4B4E52', ru: 'Графит', uz: 'Grafit', tint: '#3d4044' },
  wood: { hex: '#8A5A36', ru: 'Орех', uz: "Yong'oq", tint: '#9a6a44' },
  oak: { hex: '#C29B6D', ru: 'Дуб', uz: 'Eman', tint: '#c9a274' },
  green: { hex: '#1C5D47', ru: 'Изумруд', uz: 'Zumrad', tint: '#1c5d47' }
};

/* fromPrice — демо-цена «от», сум за погонный метр (в рабочей версии — из админки) */
OTTO.products = [
  { id: 'windsor',         name: 'Замок Виндзор',       style: 'classic', color: 'beige',    layout: 'island',   img: 'img/p-windsor.webp',         hot: true,  fromPrice: 7900000 },
  { id: 'english-comfort', name: 'Английский уют',      style: 'classic', color: 'beige',    layout: 'island',   img: 'img/p-english-comfort.webp', hot: false, fromPrice: 7500000 },
  { id: 'american-dream',  name: 'Американская мечта',  style: 'classic', color: 'white',    layout: 'corner',   img: 'img/p-american-dream.webp',  hot: true,  fromPrice: 6900000 },
  { id: 'helsinki',        name: 'Хельсинки',           style: 'modern',  color: 'grey',     layout: 'island',   img: 'img/p-helsinki.webp',        hot: false, fromPrice: 5200000 },
  { id: 'lisbon',          name: 'Лиссабон',            style: 'neo',     color: 'graphite', layout: 'u',        img: 'img/p-lisbon.webp',          hot: true,  fromPrice: 6200000 },
  { id: 'izmir',           name: 'Измир',               style: 'modern',  color: 'wood',     layout: 'straight', img: 'img/p-izmir.webp',           hot: false, fromPrice: 5400000 },
  { id: 'adana',           name: 'Адана',               style: 'classic', color: 'white',    layout: 'corner',   img: 'img/p-adana.webp',           hot: false, fromPrice: 6400000 },
  { id: 'tashkent',        name: 'Ташкент',             style: 'modern',  color: 'beige',    layout: 'straight', img: 'img/p-tashkent.webp',        hot: false, fromPrice: 4800000 },
  { id: 'greenland',       name: 'Ледники Гренландии',  style: 'neo',     color: 'white',    layout: 'corner',   img: 'img/p-greenland.webp',       hot: false, fromPrice: 5600000 },
  { id: 'amsterdam',       name: 'Амстердам',           style: 'modern',  color: 'grey',     layout: 'straight', img: 'img/p-amsterdam.webp',       hot: false, fromPrice: 5000000 },
  { id: 'samarkand',       name: 'Самарканд',           style: 'classic', color: 'white',    layout: 'corner',   img: 'img/p-samarkand.webp',       hot: false, fromPrice: 6100000 },
  { id: 'ankara',          name: 'Анкара',              style: 'neo',     color: 'white',    layout: 'straight', img: 'img/p-ankara.webp',          hot: false, fromPrice: 5300000 },
  { id: 'bodrum',          name: 'Бодрум',              style: 'neo',     color: 'white',    layout: 'straight', img: 'img/p-bodrum.webp',          hot: false, fromPrice: 5500000 },
  { id: 'bursa',           name: 'Бурса',               style: 'neo',     color: 'white',    layout: 'corner',   img: 'img/p-bursa.webp',           hot: false, fromPrice: 5700000 }
];

/* Характеристики из карточки товара на ottomebel.uz */
OTTO.specs = {
  ru: [
    ['Фасады', 'МДФ · Шпон · Массив'],
    ['Корпус', 'МДФ'],
    ['Столешница', 'Кварц 20 мм / ЛДСП 38 мм'],
    ['Ручки', 'Профильные или кнопки'],
    ['Фурнитура', 'Blum · Hettich, направляющие никель'],
    ['Размеры', 'Под ваше помещение']
  ],
  uz: [
    ['Fasadlar', 'MDF · Shpon · Massiv'],
    ['Korpus', 'MDF'],
    ['Stoleshnitsa', 'Kvars 20 mm / LDSP 38 mm'],
    ['Tutqichlar', 'Profilli yoki tugmali'],
    ['Furnitura', 'Blum · Hettich, nikel yo‘naltirgichlar'],
    ['O‘lchamlar', 'Xonangizga moslab']
  ]
};

/* Портфолио: фото проектов */
OTTO.gallery = [
  { img: 'img/banner-1.webp', cap: 'Кухня-гостиная в стиле модерн' },
  { img: 'img/p-windsor.webp', cap: 'Замок Виндзор' },
  { img: 'img/featured.webp', cap: 'Кухня с островом и витринами' },
  { img: 'img/p-lisbon.webp', cap: 'Лиссабон — графит' },
  { img: 'img/cat-commercial.webp', cap: 'Гостиная с ТВ-зоной' },
  { img: 'img/p-izmir.webp', cap: 'Измир — белый и орех' },
  { img: 'img/banner-2.webp', cap: 'Минимализм без ручек' },
  { img: 'img/p-english-comfort.webp', cap: 'Английский уют' },
  { img: 'img/cat-home.webp', cap: 'Спальня' },
  { img: 'img/cat-kitchen.webp', cap: 'Светлая кухня-столовая' },
  { img: 'img/p-american-dream.webp', cap: 'Американская мечта' },
  { img: 'img/p-helsinki.webp', cap: 'Хельсинки' }
];
