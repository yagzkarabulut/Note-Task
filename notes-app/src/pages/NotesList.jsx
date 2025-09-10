import { Link } from "react-router-dom";
import { useNotes } from "../store/useNotes";
import React from 'react';

export default function NotesList() {
  const { items, remove } = useNotes();

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Notes</h1>
        <Link to="/new" className="px-4 py-2 bg-black text-white rounded">+ New</Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 mt-10">No notes yet. Create one!</p>
      ) : (
        <div className="grid gap-4">
          {items.map((n) => (
            <div key={n.id} className="p-4 bg-white border rounded shadow-sm">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-gray-600 mt-1">{n.content.slice(0, 100)}...</p>
              <div className="flex justify-end gap-2 mt-3">
                <Link to={`/edit/${n.id}`} className="px-3 py-1 border rounded">Edit</Link>
                <button onClick={() => remove(n.id)} className="px-3 py-1 border border-red-300 text-red-600 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
