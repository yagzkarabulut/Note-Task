import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UseStore from '../store/UseStore';

export default function AddNote() {
  const { register, handleSubmit, reset } = useForm();
  const { addNote } = UseStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addNote(data.text);
    reset();
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg w-[400px] h-[400px] p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-6">Add Note</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <input
            {...register('text', { required: true })}
            placeholder="Write your note..."
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
