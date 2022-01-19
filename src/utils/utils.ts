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
