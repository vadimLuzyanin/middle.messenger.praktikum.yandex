### Чат

---

## Сайт на netlify

[Вот тут](https://eloquent-fermat-d10e6a.netlify.app/)

## Макет в figma

[Ссылка](<https://www.figma.com/file/Dq7Io7NldK2mhzEzs7F2Fx/Chat-(Copy)?node-id=0%3A1>)

Будет дополняться

## Команды

- `yarn start` — запуск сервера на порту 3000 без HMR
- `yarn build` — билд проекта в /dist/
- `yarn dev` — запуск сервера на порту 3000 с HMR от парсела
- `yarn lint` — запуск tsc, eslint, stylelint, prettier (без write)
- `yarn type-scss` — генерирует *.d.ts для всех scss файлов

## Разное

В проекте используется самописный трансформер для parcel 2 и handlebars, ссылка на npm [тут](https://www.npmjs.com/package/parcel-transformer-hbs)

Вместо страницы с чатом пока что заглушка с кнопками, которые рендерят другие скрины

Инпут для аватарки в настройках пока что рендерит пустую модалку

При переходе на любой неизвестный роут происходит редирект на 404

Использована реализация блока с реактивным state