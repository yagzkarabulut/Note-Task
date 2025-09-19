import React from "react";
import { useForm } from "react-hook-form";

const NoteForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="shadow-lg rounded-md p-6 space-y-4 border border-gray-200"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Başlık
        </label>
        <input
          {...register("title", { required: "Başlık zorunludur" })}
          placeholder="Not başlığı girin"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        <div className="h-5">
          {errors.title && (
            <p className="text-red-500 text-sm pt-0.5">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İçerik
        </label>
        <textarea
          {...register("content", { required: "İçerik boş bırakılamaz" })}
          placeholder="Not içeriğini girin"
          rows={3}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.content
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        <div className="h-5">
          {errors.content && (
            <p className="text-red-500 text-sm pt-0.5">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
      >
        {defaultValues ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
};

export default NoteForm;
