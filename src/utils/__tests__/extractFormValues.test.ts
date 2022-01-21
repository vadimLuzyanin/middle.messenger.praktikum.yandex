import { extractFormValues } from "../utils";

describe("extractFormValues", () => {
  test("Достает объект со значениями формы из FormValues", () => {
    const formValues = {
      a: { notValid: false, value: "123" },
      b: { notValid: false, value: "456" },
    };
    expect(extractFormValues(formValues)).toStrictEqual({ a: "123", b: "456" });
  });
});
