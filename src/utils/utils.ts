type FormValues = { [k: string]: { notValid: boolean; value: string } };

export function getIsFormInvalid(formValues: FormValues) {
  const disabled = Object.values(formValues).some(
    (status) => status.notValid === true
  );
  return disabled;
}

type Extracted<F> = { [T in keyof F]: string };

export function extractFormValues<F = FormValues>(formValues: F) {
  const result = {} as Extracted<F>;
  Object.entries(formValues).forEach(([key, value]) => {
    result[key as keyof F] = value.value;
  });
  return result;
}

const WEEK_DAYS = {
  0: "Вс",
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
};

const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

function addTrailingZero(num: number) {
  const str = `${num}`;
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
}

export function parseDate(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    // сегодня, показываем время
    return `${addTrailingZero(date.getHours())}:${addTrailingZero(
      date.getMinutes()
    )}`;
  }
  if (currentDate.getTime() - date.getTime() < WEEK_MS) {
    // меньше недели назад, показываем день недели
    return WEEK_DAYS[date.getDay() as keyof typeof WEEK_DAYS];
  }
  return `${addTrailingZero(date.getDate())}.${addTrailingZero(
    date.getMonth() + 1
  )}.${addTrailingZero(date.getFullYear())}`;
}
