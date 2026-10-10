import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-sky-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden bg-white shadow p-4 flex justify-between">
          <h1 className="font-bold text-sky-600">SneakerLab Admin</h1>
          <button className="p-2 border border-sky-200 rounded" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        </div>
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
        <footer className="bg-white border-t border-sky-100 p-4 text-center text-sm text-slate-500">© 2026 SneakerLab Admin — v2.0.0</footer>
      </div>
    </div>
  );
}
