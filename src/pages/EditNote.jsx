import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteStore } from "../store/noteStore";
import NoteForm from "../components/NoteForm";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notes = useNoteStore((state) => state.notes);
  const updateNote = useNoteStore((state) => state.updateNote);
  const note = notes.find((n) => n.id === Number(id));
  if (!note)
    return (
      <p className="text-center py-30 text-gray-500 italic">Not Bulunamadı</p>
    );
  const handleUpdate = (data) => {
    updateNote(note.id, data);
    navigate("/");
  };
  return (
    <div className=" pt-10">
      <div className=" bg-white max-w-2xl mx-auto p-8 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Notu Düzenle</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-sm cursor-pointer"
          >
            {" "}
            ← Geri
          </button>
        </div>
        <NoteForm onSubmit={handleUpdate} defaultValues={note} />
      </div>
    </div>
  );
};

export default EditNote;
