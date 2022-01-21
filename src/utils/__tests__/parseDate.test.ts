import { expect } from "chai";
import MockDate from "mockdate";
import { parseDate } from "../utils";

afterEach(() => {
  MockDate.reset();
});

describe("parseDate", () => {
  it("Парсит дату во время, если прошло в дате день не предыдующий", () => {
    MockDate.set("2022-01-21T15:07:30.065");

    const dateString = "2022-01-21T11:30:30.065";
    expect(parseDate(dateString)).eq("11:30");
  });

  it("Если с момента даты прошло не больше недели, парсит в день недели", () => {
    MockDate.set("2022-01-21T15:07:30.065");

    const dateString = "2022-01-20T11:30:30.065";
    expect(parseDate(dateString)).eq("Чт");
  });

  it("Иначе парсит в ДД.ММ.ГГГГ", () => {
    MockDate.set("2022-01-21T15:07:30.065");

    const dateString = "2022-01-10T11:30:30.065";
    expect(parseDate(dateString)).eq("10.01.2022");
  });

  it("Добавляет нули, если нужно", () => {
    MockDate.set("2022-01-21T15:07:30.065");

    const toTime = "2022-01-21T01:01:30.065";
    expect(parseDate(toTime)).eq("01:01");

    const toDate = "2022-01-01T01:01:30.065";
    expect(parseDate(toDate)).eq("01.01.2022");
  });
});
