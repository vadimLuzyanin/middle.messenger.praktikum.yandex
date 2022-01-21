import { getIsFormInvalid } from "../utils";

describe("getIsFormInvalid", () => {
  test("если нет notValid true - возвращает false", () => {
    const formValues = {
      a: { notValid: false, value: "qweqweqwe" },
      b: { notValid: false, value: "qweqweqwe" },
    };
    expect(getIsFormInvalid(formValues)).toBe(false);
  });

  test("eсли хоть один notValid - возвращает true", () => {
    const formValues = {
      a: { notValid: true, value: "qweqweqwe" },
      b: { notValid: false, value: "qweqweqwe" },
    };
    expect(getIsFormInvalid(formValues)).toBe(true);
  });
});
