import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function NoteCard({ note, onDelete, onEdit }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div
        className={`relative p-4 shadow-lg rounded-md ${note.color} transform transition hover:scale-105 hover:shadow-2xl`}
        style={{ transform: `rotate(${note.rotation}deg)` }}
      >
        <p className="text-gray-800 font-medium break-words whitespace-pre-wrap">
          {note.text}
        </p>

        {/* İkonlar */}
        <div className="absolute top-1 right-1 flex gap-1">
          <button
            onClick={() => onEdit(note)}
            className="p-1 text-xs text-gray-700 hover:text-indigo-600"
            title="Düzenle"
          >
            ✏️
          </button>
          <button2
            onClick={() => setShowConfirm(true)}
            className="p-1 text-xs text-gray-700 hover:text-red-600"
            title="Sil"
          >
            ✕
          </button2>
        </div>
      </div>

      {/* Onay Modalı */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => onDelete(note.id)}
      />
    </>
  );
}
