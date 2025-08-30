import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddNoteModal({
  isOpen,
  onClose,
  onSave,
  defaultText = "",
}) {
  const { register, handleSubmit, reset, setValue } = useForm();

  // Modal açıldığında / defaultText değiştiğinde formu doldur
  useEffect(() => {
    setValue("text", defaultText);
  }, [defaultText, setValue]);

  const onSubmit = ({ text }) => {
    onSave(text);
    reset(); // formu temizle
    onClose(); // modalı kapat
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // arka plana tıklayınca kapansın
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()} // form alanına tıklayınca kapanmasın
      >
        <h2 className="text-xl font-bold mb-4">
          {defaultText ? "Notu Düzenle" : "Yeni Not"}
        </h2>

        <textarea
          {...register("text", { required: true })}
          rows={4}
          placeholder="Notunuzu yazın..."
          className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-slate-200 rounded-md hover:bg-slate-300"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            {defaultText ? "Kaydet" : "Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}
