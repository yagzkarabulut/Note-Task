import { Link, NavLink } from "react-router-dom";
import React from 'react';

export default function Header() {
  const base = "px-3 py-2 rounded-md text-sm font-medium";
  const active = ({ isActive }) =>
    `${base} ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`;

  return (
    <header className="bg-[#E7F2EF] border-b sticky top-0">
      <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-lg font-semibold">📝 Notes</Link>
        <nav className="flex gap-2">
          <NavLink to="/" className={active}>All Notes</NavLink>
          <NavLink to="/new" className={active}>Add Note</NavLink>
        </nav>
      </div>
    </header>
  );
}
