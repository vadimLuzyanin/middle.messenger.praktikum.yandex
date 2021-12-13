type FormValues = { [k: string]: { notValid: boolean } };

export function getIsFormInvalid(formValues: FormValues) {
  const disabled = Object.values(formValues).some(
    (status) => status.notValid === true
  );
  return disabled;
}
