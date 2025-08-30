export default function Header({ search, setSearch, onAdd }) {
  return (
    <header className="bg-slate-800 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">NotesApp</h1>
        <button
          onClick={onAdd}
          className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition"
          aria-label="Yeni not ekle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <input
        type="text"
        placeholder="Notlarda ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-2 w-full px-3 py-2 rounded-md text-sm bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </header>
  );
}
