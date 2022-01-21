const regexps = {
  login: /^((?!^\d+$)^\w{3,20})$/,
  email: /^\S+@\S+\.\S+$/,
  password: /^(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/,
  phone: /^(?:\d{10,15}|\+\d{9,14})$/,
  name: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/,
  message: /^(?:.+$)/,
};

const validations = {
  login: {
    errorMessage:
      "Логин должен быть от 3 до 20 символов, может включать латиницу, -, _ и цифры (но не состоять из цифр)",
    regexp: regexps.login,
  },
  email: {
    errorMessage: "Некорректный email",
    regexp: regexps.email,
  },
  password: {
    errorMessage:
      "Пароль дожен быть от 8 до 40 символов, включать хотя бы одну заглавную букву и цифру",
    regexp: regexps.password,
  },
  passwordAgain: {
    errorMessage: "Пароли не совпадают",
    regexp: regexps.password,
  },
  phone: {
    errorMessage:
      "Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинаться с плюса",
    regexp: regexps.phone,
  },
  firstName: {
    errorMessage:
      "Имя должно начинаться с заглавной буквы и не содержать спецсимволов",
    regexp: regexps.name,
  },
  secondName: {
    errorMessage:
      "Фамилия должна начинаться с заглавной буквы и не содержать спецсимволов",
    regexp: regexps.name,
  },
  message: {
    errorMessage: "Сообщение не должно быть пустым",
    regexp: regexps.message,
  },
};

export default validations;
