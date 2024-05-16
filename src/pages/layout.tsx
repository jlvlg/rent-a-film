import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-900">
        <Outlet />
      </main>
    </>
  );
}
