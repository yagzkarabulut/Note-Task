import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react'; // ikonlar için
import UseStore from '../store/UseStore';


export default function NotesList() {
  const { notes, removeNote } = UseStore();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg w-[400px] h-[400px] p-6 flex flex-col">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">My Notes</h1>

        <div className="flex justify-center mb-4">
          <Link
            to="/add"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transform transition no-underline inline-block text-center"
          >
            + Add Note
          </Link>
        </div>

        <ul className="flex-1 overflow-y-auto space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-xl shadow-sm"
            >
              <span className="truncate">{note.text}</span>
              <div className="flex gap-4">
              
                <Link
                  to={`/edit/${note.id}`}
                  className="flex items-center gap-1 px-3 py-1 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 hover:shadow-md transition"
                >
                  <Pencil size={16} /> Edit
                </Link>
            
                <button
                  onClick={() => removeNote(note.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:shadow-md transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
