import React, { useEffect, useMemo } from 'react'; // useMemo eklendi
import { useForm } from 'react-hook-form';
import useNoteStore from '../store/noteStore';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNote, updateNote, notes } = useNoteStore();
  const categories = useNoteStore((state) => state.categories);

  const editingNote = id ? notes.find(note => note.id === id) : null;

  // useMemo ile defaultValues
  const defaultValues = useMemo(() => {
    return editingNote || {
      title: '',
      content: '',
      category: categories[0] || 'Diğer'
    };
  }, [editingNote, categories]);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    defaultValues: defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    if (editingNote) {
      updateNote({ ...editingNote, ...data });
    } else {
      addNote(data);
      reset({ 
        title: '', 
        content: '', 
        category: categories[0] || 'Diğer' 
      }); 
    }
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        {editingNote ? 'Notu Düzenle' : 'Yeni Not Ekle'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Not Başlığı (Zorunlu)"
            {...register('title', { required: 'Başlık alanı zorunludur.' })}
            className="w-full rounded-lg p-3 border border-gray-300 outline-none transition duration-200 focus:border-blue-600"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Not İçeriği (Zorunlu)"
            {...register('content', { required: 'İçerik alanı zorunludur.' })}
            className="w-full rounded-lg p-3 border border-gray-300 outline-none transition duration-200 focus:border-blue-600"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <select 
            {...register("category", { required: true })}
            className="w-full rounded-lg p-3 border border-gray-300 bg-white outline-none transition duration-200 focus:border-blue-600"
          >
            <option value="" disabled>-- Kategori Seçin --</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold py-2 px-6 rounded-xl transition duration-200"
          >
            Geri
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-6 rounded-xl transition duration-200"
          >
            {editingNote ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
