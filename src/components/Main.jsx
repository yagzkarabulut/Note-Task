import { useMemo } from "react";
import useNotesStore from "../stores/useNotesStore";
import NoteCard from "./NoteCard";

export default function Main({ search, onEdit }) {
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const filtered = useMemo(() => {
    if (!search) return notes;
    return notes.filter((n) =>
      n.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  if (!filtered.length)
    return (
      <p className="text-center text-slate-500 mt-10">
        {search ? "Aramanıza uygun not yok." : "Henüz not yok."}
      </p>
    );

  return (
    <main className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onEdit={onEdit}
          />
        ))}
      </div>
    </main>
  );
}
