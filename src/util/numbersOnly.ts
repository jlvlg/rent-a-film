export default function numbersOnly(
  value: string,
  positiveOnly: boolean = false,
) {
  value = value.replace(/\D/g, "");
  if (!value.length) value = "0";
  let valueAsNumber = parseInt(value);
  if (positiveOnly) valueAsNumber = Math.abs(valueAsNumber);
  return valueAsNumber.toString();
}
