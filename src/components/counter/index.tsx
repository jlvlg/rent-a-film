import { useId } from "react";
import Button from "../button";

type Props = {
  defaultValue?: number;
  onChange?: (value: string) => void;
  name?: string;
};
export default function Counter({
  defaultValue,
  onChange: onChangeParent,
  name,
}: Props) {
  const counterId = useId();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.currentTarget.value.replace(/\D/g, "");
    if (!value.length) value = "0";
    if (onChangeParent) onChangeParent(value);
    e.currentTarget.value = Math.abs(parseInt(value)).toString();
  }

  function addToCounter(amount: number) {
    const counterEl = document.getElementById(counterId) as HTMLInputElement;
    counterEl.value = Math.max(0, +counterEl.value + amount).toString();
  }

  return (
    <div className="flex w-min overflow-hidden rounded-lg">
      <input
        id={counterId}
        name={name}
        className="w-12 appearance-none text-center focus-visible:outline-none"
        type="text"
        aria-label="Rent days"
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <Button
        type="button"
        aria={{ label: "Decrement rent days", controls: counterId }}
        onClick={() => addToCounter(-1)}
        className="-order-1"
      >
        -
      </Button>
      <Button
        type="button"
        onClick={() => addToCounter(1)}
        aria={{ label: "Increment rent days", controls: counterId }}
      >
        +
      </Button>
    </div>
  );
}
