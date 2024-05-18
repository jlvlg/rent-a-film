type Props = {
  values: { [key: string]: string | undefined; placeholder?: string };
  defaultValue?: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
};

export default function Select({
  values,
  defaultValue,
  onChange,
  style,
}: Props) {
  return (
    <select
      style={style}
      className=" border-white bg-transparent text-white"
      onChange={(e) => onChange(e.currentTarget.value)}
      defaultValue={defaultValue}
    >
      {Object.entries(values).map(([value, displayText]) => (
        <option
          key={value}
          value={value}
          disabled={value === "placeholder" ? true : undefined}
          hidden={value === "placeholder" ? true : undefined}
        >
          {displayText}
        </option>
      ))}
    </select>
  );
}
