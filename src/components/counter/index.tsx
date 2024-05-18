import { useId, useState } from "react";
import Button from "../button";

type Props = { initialState?: number };
export default function Counter({ initialState }: Props) {
  const [counter, setCounter] = useState(initialState ?? 0);
  const counterId = useId();

  function onChange(value: string) {
    value = value.replace(/\D/g, "");
    console.log(value);
    if (!value.length || value[0] === "-") value = "0";
    setCounter(parseInt(value));
  }

  return (
    <div className="flex w-min overflow-hidden rounded-lg">
      <Button
        aria={{ label: "Decrement rent days", controls: counterId }}
        onClick={() => setCounter((current) => current - 1)}
        className=""
      >
        -
      </Button>
      <input
        id={counterId}
        className="w-12 appearance-none text-center"
        type="text"
        aria-label="Rent days"
        value={counter}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <Button
        onClick={() => setCounter((current) => current + 1)}
        aria={{ label: "Increment rent days", controls: counterId }}
      >
        +
      </Button>
    </div>
  );
}
