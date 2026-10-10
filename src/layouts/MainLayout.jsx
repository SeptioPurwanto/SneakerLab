import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-sky-100 text-center text-sm text-slate-500 p-4">
        © 2026 SneakerLab | Prototipe SPA React — Web Programming Undiksha
      </footer>
    </div>
  );
}
