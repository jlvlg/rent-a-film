import styles from "./index.module.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className={`fixed z-50 flex h-12 w-full items-center justify-between px-8 py-4 text-xl text-slate-100 ${styles.navbar}`}
    >
      <Link to="/">Rent-a-Film</Link>
      <Link to="/cart">
        <span className="material-symbols-outlined">shopping_cart</span>
      </Link>
    </nav>
  );
}
