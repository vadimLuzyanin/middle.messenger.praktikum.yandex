import { InputValidation } from "./types";

const validations: { [key: string]: InputValidation } = {
  login: {
    errorMessage:
      "Логин должен быть от 3 до 20 символов, может включать латиницу, -, _ и цифры (но не состоять из цифр)",
    regexp: /^((?!^\d+$)^\w{3,20})$/,
  },
  email: {
    errorMessage: "Некорректный email",
    regexp: /^\w+@\w+\.\w+$/,
  },
  password: {
    errorMessage:
      "Пароль дожен быть от 8 до 40 символов, включать хотя бы одну заглавную букву и цифру",
    regexp: /^(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/,
  },
  passwordAgain: {
    errorMessage: "Пароли не совпадают",
    regexp: /^(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/,
  },
  phone: {
    errorMessage:
      "Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинаться с плюса",
    regexp: /^(?:\d{10,15}|\+\d{9,14})$/,
  },
  firstName: {
    errorMessage:
      "Имя должно начинаться с заглавной буквы и не содержать спецсимволов",
    regexp: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/,
  },
  secondName: {
    errorMessage:
      "Фамилия должна начинаться с заглавной буквы и не содержать спецсимволов",
    regexp: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/,
  },
  message: {
    errorMessage: "Сообщение не должно быть пустым",
    regexp: /^(?:.+$)/,
  },
};

export default validations;
