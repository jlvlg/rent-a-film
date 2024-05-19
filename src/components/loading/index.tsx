import classNames from "classnames";
import loading from "../../assets/loading.svg";

type Props = { className?: string };
export default function Loading({ className }: Props) {
  return (
    <img src={loading} className={classNames("animate-spin", className)} />
  );
}
