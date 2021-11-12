import renderMain from "../main";
import { makeButton, makeInput, renderModal } from "../../components";
import { renderToString } from "../../render";
import tmpl from "./settings.hbs";
import * as cn from "./settings.module.scss";
import backIcon from "./assets/back.svg";
import avatar from "./assets/defaultAvatar.svg";
import { appendChilds, pushPathname, renderScreen } from "../../utils";

const changeDataButton = makeButton({
  text: "Изменить данные",
  type: "secondary",
  leftAlign: true,
  onClick: () => {
    renderEditData();
  },
});

const changePasswordButton = makeButton({
  text: "Изменить пароль",
  type: "secondary",
  leftAlign: true,
  onClick: () => {
    renderEditPassword();
  },
});

const logoutButton = makeButton({
  text: "Выйти",
  type: "warn",
  leftAlign: true,
  onClick: () => {
    renderMain();
  },
});

const saveButton = makeButton({
  text: "Сохранить",
  type: "primary",
  name: "save",
  onClick: () => {
    renderSettings()
  }
});

const viewScreen = renderToString(
  { tmpl, cn },
  {
    backIcon,
    avatar,
    name: "Иван",
    fields: [
      {
        name: "Почта",
        value: "pochta@yandex.ru",
      },
      {
        name: "Логин",
        value: "ivanivanov",
      },
      {
        name: "Имя",
        value: "Иван",
      },
      {
        name: "Фамилия",
        value: "Иванов",
      },
      {
        name: "Имя в чате",
        value: "Иван",
      },
      {
        name: "Телефон",
        value: "+7 (909) 967 30 30",
      },
    ],
  }
);

const inputEmail = makeInput({
  placeholder: "Почта",
  name: "email",
  type: "email",
});
const inputLogin = makeInput({
  placeholder: "Логин",
  name: "login",
  type: "text",
});
const inputName = makeInput({
  placeholder: "Имя",
  name: "first_name",
  type: "text",
});
const inputSecondName = makeInput({
  placeholder: "Фамилия",
  name: "second_name",
  type: "text",
});
const inputDisplayName = makeInput({
  placeholder: "Имя в чате",
  name: "display_name",
  type: "text",
});
const inputPhone = makeInput({
  placeholder: "Телефон",
  name: "phone",
  type: "tel",
});

const inputOldPassword = makeInput({
  placeholder: "Старый пароль",
  name: "oldPassword",
  type: "password",
});
const inputNewPassword = makeInput({
  placeholder: "Новый пароль",
  name: "newPassword",
  type: "password",
});
const inputNewPasswordAgain = makeInput({
  placeholder: "Повторите новый пароль",
  name: "newPassword",
  type: "password",
});

const renderEditData = () => {
  const fieldsContainer = document.querySelector(`.${cn.fields}`);
  fieldsContainer.innerHTML = "";
  appendChilds(fieldsContainer, [
    inputEmail,
    inputLogin,
    inputName,
    inputSecondName,
    inputDisplayName,
    inputPhone,
  ]);

  const buttonsContainer = document.querySelector(`.${cn.buttons}`);
  buttonsContainer.innerHTML = "";
  appendChilds(buttonsContainer, [saveButton]);
};

const renderEditPassword = () => {
  const fieldsContainer = document.querySelector(`.${cn.fields}`);
  fieldsContainer.innerHTML = "";
  appendChilds(fieldsContainer, [
    inputOldPassword,
    inputNewPassword,
    inputNewPasswordAgain,
  ]);

  const buttonsContainer = document.querySelector(`.${cn.buttons}`);
  buttonsContainer.innerHTML = "";
  appendChilds(buttonsContainer, [saveButton]);
};

const renderSettings = () => {
  pushPathname("/settings");
  renderScreen(viewScreen, (root) => {
    const backBtn = root.querySelector(`.${cn.back}`);
    backBtn.addEventListener("click", () => {
      renderMain();
    });

    const buttonsContainer = root.querySelector(`.${cn.buttons}`);
    appendChilds(buttonsContainer, [
      changeDataButton,
      changePasswordButton,
      logoutButton,
    ]);

    const avatar = root.querySelector(`.${cn.avatarContainer}`);
    avatar.addEventListener("click", () => {
      renderModal({ content: "текст модалки" });
    });
  });
};

export default renderSettings;
