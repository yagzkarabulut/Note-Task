import { Link } from "react-router-dom";
import { useNoteStore } from "../store/noteStore";

const NoteItem = ({ note }) => {
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bu notu silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      deleteNote(note.id);
    }
  };
  return (
    <div className="flex flex-col gap-3 bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
      <p className="text-gray-600">{note.content}</p>
      <div className="flex justify-end gap-3 mt-2">
        <Link
          to={`/edit/${note.id}`}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-sm cursor-pointer"
        >
          Düzenle
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm cursor-pointer"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
