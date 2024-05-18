import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 flex h-12 items-center justify-between bg-slate-950 px-3 text-xl text-slate-100 shadow-2xl">
      <Link to="/">Rent-a-Film</Link>
      <Link to="/cart">Carrinho</Link>
    </nav>
  );
}
