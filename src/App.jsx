import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import AddNoteModal from "./components/AddNoteModal";
import useNotesStore from "./stores/useNotesStore";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const addNote = useNotesStore((s) => s.addNote);
  const updateNote = useNotesStore((s) => s.updateNote);

  const openAdd = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSave = (text) => {
    if (editingNote) {
      updateNote(editingNote.id, text);
    } else {
      addNote(text);
    }
    setIsModalOpen(false);
  };

  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-100">
      <Header search={search} setSearch={setSearch} onAdd={openAdd} />
      <Main search={search} onEdit={openEdit} />
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        defaultText={editingNote?.text}
      />
    </div>
  );
}
