type Props = {
  values: { [key: string]: string | undefined; placeholder?: string };
  selected?: string;
  onChange: (value: string, displayText?: string) => void;
  style?: React.CSSProperties;
};

export default function Select({ values, selected, onChange, style }: Props) {
  return (
    <select
      style={style}
      className=" border-white bg-transparent text-white"
      onChange={(e) => onChange(e.currentTarget.value)}
      value={selected}
    >
      {Object.entries(values).map(([value, displayText]) => (
        <option
          key={value}
          value={value}
          selected={selected === value ? true : undefined}
          disabled={value === "placeholder" ? true : undefined}
          hidden={value === "placeholder" ? true : undefined}
        >
          {displayText}
        </option>
      ))}
    </select>
  );
}
