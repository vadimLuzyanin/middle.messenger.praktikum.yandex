import { expect } from "chai";
import { getIsFormInvalid } from "../utils";

describe("getIsFormInvalid", () => {
  it("если нет notValid true - возвращает false", () => {
    const formValues = {
      a: { notValid: false, value: "qweqweqwe" },
      b: { notValid: false, value: "qweqweqwe" },
    };
    expect(getIsFormInvalid(formValues)).eq(false);
  });

  it("eсли хоть один notValid - возвращает true", () => {
    const formValues = {
      a: { notValid: true, value: "qweqweqwe" },
      b: { notValid: false, value: "qweqweqwe" },
    };
    expect(getIsFormInvalid(formValues)).eq(true);
  });
});
