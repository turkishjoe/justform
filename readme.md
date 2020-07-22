# justfrom
Содержание
1. Внутренняя структура
2. Сборка, таски, подключение модулей и компонентов
3. Библиотеки
4. Компоненты и примечания

# Внутренняя структура
--------------------------------------------
Путь/Название файла  | Содержание папки/файла
---------------------|----------------------
build/                            | конфиги webpack и конвертера в .webp
dist/                             | скомпилированные файлы и ассеты
dist/img/svg                      | спрайт иконок
src/                              | исходные файлы
src/css/                          | скомпилированный css подключаемых модулей
src/fonts/                        | шрифты
src/img/                          | изображения
src/svg/                          | svg иконки (на выходе собираются в спрайт)
src/js/                           | пользовательские библиотеки и настройки (текущ.: иконка мобильного меню и сборка свг спрайта)
src/scss/utils/fonts.scss         | подключаемые шрифты
-----------------/libs.scss       | библиотеки css (текущ: сетка бутстрап 4)
-----------------/mixins.scss     | миксины
-----------------/typography.scss | общие типографские размеры и обертки заголовков
-----------------/vars.scss       | кастомизируемые переменные + переменные библиотек
-----------------/reset.scss      | кастомный reset
src/scss/main.scss                | общий файл подключения scss + общие правила
src/static                        | статичные файлы (robots, .htacess и т.д.)
src/views/                        | представления
-------------/components/         | компоненты (бол-во миксины)
-------------/pages/              | страницы
-------------/layout/             | шаблоны страниц
-------------/modules/            | сложные компоненты и кроссстраничные модули (шапка, футер и т.д.)
-------------/utils/              | утилиты (текщ.: миксины)

# Сборка, таски, подключение модулей и компонентов
Сборка осуществляется в `webpack`. Перед сборкой рекомендуется установить модули через `npm i`.

`npm run dev` - таск разработки

`npm run build` - таск компиляции

`npm run webp` - конвертация изображений в .webp

`npm run lint` - линтинг

`npm run lint:write` - линтинг + афтофикс


# Библиотеки
1) [bootstrap 4](https://www.npmjs.com/package/bootstrap) - `.scss` для компиляции кастомной сетки проекта. Выборочно подключены дополнительные `.scss` модули

2) [hamburges](https://www.npmjs.com/package/hamburgers) by Jonathan Suh

3) [swiper](https://swiperjs.com/api/) Swiper slider


# Компоненты, миксины и примечания

В `src/views/compontents/` содержатся компоненты, объединенные общим именем файлов. У каждого компонента есть отдельный `.pug` и `.scss` файл, `.js` - опционально.

-----------------------------------
mixins.pug
---
Файл подключения других миксинов. Опциональные миксины:

`wrapper` - рендерит контейнер бутстрапа с отдельной привязкой класса для кастомизации

`pic` - рендерит изображение в тег `<picture>`

`icon` - рендерит свг из спрайта

---

header.pug
---
Представляет собой миксин.

Принимает переменные:

`isToolbar` - режим тулбара, не актуально, тип: `bool`, по умолчанию `false`

`hasCart` - устанавливает, показывать ли иконку корзины и раздел в шапке, тип: `bool`, по умолчанию `false`

`isTransparent` - устанавливает прозрачность шапки по умолчанию, тип: `bool`, по умолчанию `false`

В зависимости от переменных, в шапку раздаются соответствующие классы для управления через `css` (для корзины, блок по умолчанию не отображается, но существует) и `js` (для прозрачности, например, смена логотипа при прозначности или цвета подложки при открытии категории).
Для мобильной версии шапки в компонент подлючается отдельно `menuMobile`.
Поиск подключается компонентом `search`

---

menuMobile.pug
---
Компонент мобильного меню.
Категории для меню устанавливаются миксином `accordion`

---

accordion.pug
---
Компонент-миксин для категорий.

Переменные:

`name` - имя категории, тип: `string`.

`additional` - доп информация. Выводится рядом с именем (пример на странице карточки товара в разделе размеров), тип: `bool`, по умолчанию `false`.

`isActive` - устанавливает, открыт ли раздел по умолчанию (через класс `is-active`), тип: `bool`, по умолчанию `false`.

Вложенный конент устанавливается путем наследования в миксин, может быть любого содержания

---

# Фильтры

`filter.pug` - миксин `filter`. Представляет собой селект, парсится через `js` в представление по макету.

Переменные:

`classname` - css или js класс для дополнительной кастомизации или логической привязки, тип: `string`, по умолчанию `''`.

`multiple` - атрибут для селекта, устанавливает множественный выбор, тип: `bool`, по умолчанию `false`.

`options` - массив объектов. Опции селекта. Обладает стандартными атрибутами опций селекта. Пример массива:
```js
[
  {
    'name':'Все кровати',
    'value': 'Все кровати',
    'default': true,
    'selected': true,
    'disabled': false,
    'hidden': false
  },
]
```

`name` - имя фильтра в представлении

---

`filterReset.pug` - компонент кнопки сброса фильтро

---

`filterSimple.pug` - миксин `filterSimple`. Компонент фильтра с радиокнопками. По умолчанию каждый отдельно обернут в `form` (при необходимости можно убрать, первоначально создавался для пагинации)

Принцип схож с `filter`. Переменные:

`name` - имя для радиокнопок

`descr` - имя фильтра в представлении

`items` - массив с опциями. Опция = объект

```js
[
  {
    value: 1,
    checked: false,
    disabled: true
  },
]
```

атрибут `disabled` нужен для установки плейсхолдера для фильтра. Элемент будет рендерится в меню, но иметь  `display: none;` . Во избежание багов вестки, указывать подобные элементы первыми в массиве

---

# Карточки

`item.pug` - карточка товара, миксин

Переменные:

`name` - имя товара

`descr` - описание товара

`price` - цена товара

`img` - адрес изображения (для миксина `pic`)

`isNew` - флажок нового товара, тип: `bool`, по умолчанию `false`. Если имеет данное значение, рендерит иконку.

___

`itemLink.pug` - миксин. Внешне похож на карточку товара, но представляет собой ссылку на категорию (находится на главной странице)

Переменные:

`name` - имя категории

`img` - адрес изображения (для миксина `pic`)

`submenu` - массив строк для меню категорий
___

`itemCart.pug` - миксин карточки товара. В разработке

___


news.pug
___

`news` - миксин новости. Опционален к расширению. Оборачивается в семантические теги


Переменные:

`banner`- адрес изображения (для миксина `pic`)

`date` - дата публикации (datetime устанавливать отдельно)

`heading` - заголовок (ссылку устанавливать отдельно)

`excerpt` - текст отрывка новости

___

P.S. быстрая связь - Telegram: `@skeev2709`
