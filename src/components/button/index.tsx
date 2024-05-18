import classNames from "classnames";

type Props = {
  className?: string;
  id?: string;
  aria?: { label?: string; controls?: string };
  onClick?: () => void;
  color?: keyof typeof colors;
  name?: string;
  value?: string;
  type?: "button" | "submit" | "reset";
  as?: React.ElementType | keyof React.ReactHTML;
};

const colors = {
  white: "bg-white hover:bg-slate-100 text-slate-600 active:bg-slate-200",
  red: "bg-red-600 hover:bg-red-700 text-slate-300 active:bg-red-800",
};

export default function Button({
  children,
  className,
  onClick,
  aria,
  id,
  color,
  value,
  name,
  type,
  as: Real = "button",
}: React.PropsWithChildren<Props>) {
  return (
    <Real
      id={id}
      type={type}
      onClick={onClick}
      name={name}
      value={value}
      aria-label={aria?.label}
      aria-controls={aria?.controls}
      className={classNames(
        "flex place-items-center px-4 py-2 transition duration-200",
        colors[color ?? "white"],
        className,
      )}
    >
      {children}
    </Real>
  );
}
