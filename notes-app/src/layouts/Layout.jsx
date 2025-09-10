import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React from 'react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto p-6">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-gray-400 text-sm">
        Notes App • Zustand + React + Tailwind
      </footer>
    </div>
  );
}
