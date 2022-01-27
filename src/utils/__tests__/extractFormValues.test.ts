import { expect } from "chai";
import { extractFormValues } from "../utils";

describe("extractFormValues", () => {
  it("Достает объект со значениями формы из FormValues", () => {
    const formValues = {
      a: { notValid: false, value: "123" },
      b: { notValid: false, value: "456" },
    };
    expect(extractFormValues(formValues)).deep.eq({ a: "123", b: "456" });
  });
});
