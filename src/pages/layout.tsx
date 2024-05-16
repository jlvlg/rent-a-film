import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="bg-slate-900">
      <Outlet />
    </main>
  );
}
