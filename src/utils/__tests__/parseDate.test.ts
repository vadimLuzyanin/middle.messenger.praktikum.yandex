import { parseDate } from "../utils";

describe("parseDate", () => {
  test("Парсит дату во время, если прошло в дате день не предыдующий", () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date("2022-01-21T15:07:30.065").getTime());

    const dateString = "2022-01-21T11:30:30.065";
    expect(parseDate(dateString)).toBe("11:30");
  });

  test("Если с момента даты прошло не больше недели, парсит в день недели", () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date("2022-01-21T15:07:30.065").getTime());

    const dateString = "2022-01-20T11:30:30.065";
    expect(parseDate(dateString)).toBe("Чт");
  });

  test("Иначе парсит в ДД.ММ.ГГГГ", () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date("2022-01-21T15:07:30.065").getTime());

    const dateString = "2022-01-10T11:30:30.065";
    expect(parseDate(dateString)).toBe("10.01.2022");
  });

  test("Добавляет нули, если нужно", () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date("2022-01-21T15:07:30.065").getTime());

    const toTime = "2022-01-21T01:01:30.065";
    expect(parseDate(toTime)).toBe("01:01");

    const toDate = "2022-01-01T01:01:30.065";
    expect(parseDate(toDate)).toBe("01.01.2022");
  });
});
