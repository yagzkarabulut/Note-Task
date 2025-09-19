import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import { useNoteStore } from "../store/noteStore";

const Home = () => {
  const notes = useNoteStore((state) => state.notes);
  const addNote = useNoteStore((state) => state.addNote);
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Notlar Uygulaması
      </h1>
      <div className=" bg-white shadow-xl rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Yeni Not</h2>
        <NoteForm onSubmit={addNote} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {notes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 italic">
            Henüz not eklenmedi
          </p>
        ) : (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        )}
      </div>
    </div>
  );
};

export default Home;
