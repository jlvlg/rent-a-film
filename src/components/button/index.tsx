type Props = {
  className?: string;
  id?: string;
  aria?: { label?: string; controls?: string };
  onClick: () => void;
};
export default function Button({
  children,
  className,
  onClick,
  aria,
  id,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={aria?.label}
      aria-controls={aria?.controls}
      className={` bg-white px-4 py-2 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
