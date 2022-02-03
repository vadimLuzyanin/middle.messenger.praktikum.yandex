# Чат

## Что можно делать в приложении

- Работает логин, регистрация, изменение настроек пользователя, пароля, смена аватарки

- Можно создавать чаты, добавлять и удалять пользователей из них

- Отображается количество пользователей в чатах

- Сообщения сделаны через WebSocket

- При переходе на любой неизвестный роут происходит редирект на 404

- Есть валидация и отображение ошибок в модалках / попапах / прямо в интерфейсе

## Задеплоенный проект на Heroku

[Вот тут](https://hidden-mountain-01296.herokuapp.com/)

## Макет в figma

[Ссылка](<https://www.figma.com/file/Dq7Io7NldK2mhzEzs7F2Fx/Chat-(Copy)?node-id=0%3A1>)

## Команды

- `yarn start` — запуск `WDS` в development режиме
- `yarn wds-prod` — запуск `WDS` в production режиме
- `yarn build` — сборка проекта в /dist
- `yarn lint` — запуск tsc, eslint, stylelint, prettier (без write)
- `yarn fix` — фиксит все что фиксится
- `yarn test` — запускает тесты
- `yarn deploy` — собирает Docker контейнер и деплоит на Heroku

## Precommit

Настроен precommit: `yarn test && yarn fix && yarn lint && git add .`

## Разное

- Сборка через webpack

- Использована реализация блока с реактивным state

- Написано некое подобие redux store

- Сделано разделение скриптов и стилей на чанки, lazy-loading роутов в роутере

- Деплой происходит на Heroku в docker контейнере, статика раздается через `node.js`

[Ссылка на пул реквест](https://github.com/vadimLuzyanin/middle.messenger.praktikum.yandex/pull/6)
