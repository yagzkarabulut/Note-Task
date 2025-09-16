import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UseStore from "../store/UseStore";

export default function EditNote() {
  const { id } = useParams();
  const { notes, updateNote } = UseStore();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === Number(id));
  const { register, handleSubmit, setValue } = useForm();

  if (note) setValue("text", note.text);

  const onSubmit = (data) => {
    updateNote(Number(id), data.text);
    navigate("/");
  };

  if (!note) return <p className="p-6 text-center">Note not found</p>;

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    
      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg w-[400px] h-[400px] p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Note</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("text", { required: true })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
